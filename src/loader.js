import {typeOf, isSchema, normalizeId} from './util';
import {build} from './builder';
import {Schema, $id} from './schema';
import * as Draft4 from './draft4/schema';

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

    if (id === Draft4.schema.id) {
      p = Promise.resolve(Draft4.schema);
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

    if (schema.id !== Draft4.schema.id) {
      // validate definition
      p = p
        .then(() => this.import(Draft4.schema.id))
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

    if (schema.id === Draft4.schema.id) {
      // validate definition
      p = p.then((s) => {
        let info = s.validate(Draft4.schema);
        if (!info.valid) {
          let err = Error("Invalid schema: "+Draft4.schema.id);
          err.info = info;
          throw err;
        }
        return s;
      });
    }

    return p;
  }

}
