import {
  Schema,
  $id,
  $ref,
  $schema,
  $validators,
  $rescoped,
  $guard
} from './schema';

import {
  typeOf,
  encodePointerComponent,
  decodePointerComponent,
  resolveReference,
  normalizeId
} from './util';

var metaSchemas = {};
export function registerMetaSchema(m) {
  metaSchemas[m.schema.id] = m;
}

export function build({ schema, id }) {
  var builder = new Builder();

  builder.meta = (metaSchemas[schema.$schema] || metaSchemas['http://json-schema.org/draft-04/schema#']);

  builder.build(schema, (id || schema.id || '#'), true);
  return builder.bind().then(() => builder.root);
}

class Builder {

  constructor() {
    this.unresolvedRefs = [];
    this.rescoped = {};
    this.root = undefined;
  }

  build(definition, id, isRoot) {
    id = normalizeId(id);

    let definitionType = typeOf(definition);

    // visit array children;
    // then return result (arrays are not Schemas)
    if (definitionType === 'array') {
      return definition.map((x, i) => {
        return this.build(x, id + '/' + i);
      });
    }

    // return non-object values verbatim;
    if (definitionType !== 'object') {
      return definition;
    }

    // normalize the id;
    let rescoped = false;
    if (typeOf(definition.id) === 'string') {
      let newId = normalizeId(definition.id);
      newId = resolveReference(id, definition.id);

      // register with root;
      if (id !== newId) {
        rescoped = true;
      }

      id = newId;
    }

    // visit
    let schema = new Schema(id, $guard);
    if (isRoot)   { this.root = schema; }
    if (rescoped) { this.registerRescopedSchema(schema); }

    // apply properties
    for (let k in definition) {
      let v = definition[k];
      schema[k] = this.build(v, id + '/' + encodePointerComponent(k));
    }

    // handle a $ref.
    if (schema.$ref && typeOf(schema.$ref)) {
      schema[$ref] = schema.$ref;
      this.unresolvedRefs.push(schema);
      return schema;
    }

    // make validators;
    let validators = this.meta.validators
      .filter(v => v.include(schema))
      .map(v => new v(schema));
    if (validators.length > 0) {
      schema[$validators] = validators;
    }

    return schema;
  }

  registerRescopedSchema(schema) {
    let rescoped   = this.rescoped;
    let id         = schema[$id];
    let rootId     = id.slice(0, id.indexOf('#')+1);
    let fragment   = id.slice(id.indexOf('#')+2).split('/').map(decodePointerComponent);
    let components = [rootId].concat(fragment);
    let context    = rescoped;
    let lastIdx    = components.length - 1;

    for (let i in components) {
      let component = components[i];

      if (lastIdx == i) {
        context[component] = schema;
        break;
      }

      if (!context[component]) {
        let id = context[$id];
        if (id) {
          id += '/' + encodePointerComponent(component);
        } else {
          id = rootId;
        }
        context = context[component] = new Schema(id, $guard);
      } else {
        context = context[component];
      }
    }
  }

  bind() {
    this.root[$rescoped] = this.rescoped;

    let queue = this.unresolvedRefs
      .map((ref) => {
        let target = resolveReference(ref[$id], ref[$ref]);
        let schema = this.root.get(target);
        if (schema) { ref[$schema] = schema; }
        return ref;
      })
      .filter(ref => !ref[$schema])
      .map((ref) => {
        let target = resolveReference(ref[$id], ref[$ref]);
        return Schema.import(target).then(x => {
          if (x) { ref[$schema] = x; }
          return ref;
        });
      });

    return Promise.all(queue).then(() => {
      this.unresolvedRefs = this.unresolvedRefs
        .filter(ref => !ref[$schema]);
      if (this.unresolvedRefs.length > 0) {
        let ref    = this.unresolvedRefs[0];
        let target = resolveReference(ref[$id], ref[$ref]);
        throw Error("unable to resolve { $ref: \""+target+"\" }");
      }
    });
  }

}

