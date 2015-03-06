import {typeOf, isSchema, normalizeId} from './util';
import {build, isMetaSchema, getMetaSchema, determineMetaSchema} from './builder';
import {Schema, $id} from './schema';
import './vendor/fetch';

export class Loader {

  constructor() {
    this.registry = {};
  }

  fetch(url) {
    return window.fetch(url).then((resp) => resp.json());
  }

  import(id) {
    if (typeOf(id) !== 'string') {
      throw TypeError("Loader.import() expects a single string argument.");
    }

    id = normalizeId(id);
    let src = id.slice(0, id.indexOf('#'));

    // import non-root schemas;
    if (!id.endsWith('#')) {
      return this.import(src)
        .then(schema => schema.get(id))
        .then(schema => {
          if (!schema) {
            throw Error("unknown schema: "+id);
          }
          return schema;
        });
    }

    // import root schemas;
    let p = this.registry[id];
    if (p) { return Promise.resolve(p); }

    if (isMetaSchema(id)) {
      p = Promise.resolve(getMetaSchema(id).schema);
    } else {
      p = this.fetch(src);
    }

    p = p.then(defn => this.register(defn, id));
    this.registry[id] = p;

    return p;
  }

  register(schema, id) {
    if (isSchema(schema)) {
      if (id && schema[$id] !== id) {
        throw Error("id and Schema[$id] must match");
      }

      let old = this.registry[schema[$id]];
      if (old && (isSchema(old))) {
        throw Error("Schema is already registered. "+id);
      }

      this.registry[schema[$id]] = schema;
      return Promise.resolve(schema);
    }

    return this.build(schema, id).then(schema => this.register(schema));
  }

  build(schema, id) {
    let p = Promise.resolve(null);

    if (!isMetaSchema(schema.id)) {
      var metaSchema = determineMetaSchema(schema);

      // validate definition
      p = p
        .then(() => this.import(metaSchema))
        .then((s) => {
          let info = s.validate(schema);
          if (!info.valid) {
            let err = Error("Invalid schema: "+schema.id);
            err.info = info;
            throw err;
          }
          return s;
        });
    }

    p = p.then(() => build({ schema, id }));

    if (isMetaSchema(schema.id)) {
      // validate definition
      var metaSchema = determineMetaSchema(schema);

      p = p.then((s) => {
        let info = s.validate(getMetaSchema(metaSchema).schema);
        if (!info.valid) {
          let err = Error("Invalid schema: "+metaSchema);
          err.info = info;
          throw err;
        }
        return s;
      });
    }

    return p;
  }

}
