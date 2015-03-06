
import {$validate} from './schema';

export function createContext(schema, value) {
  return new Context(schema, null, value, null);
}

class Context {

  constructor(schema, key, value, parent) {
    this.schema = schema;
    this.key    = key;
    this.value  = value;
    this.parent = parent;
    this.errors = [];
  }

  validateSelf(schema, { report }={}) {
    var ctx = new Context(schema, this.key, this.value, this);
    ctx.schema[$validate](ctx.value, ctx);

    if (report !== false) {
      this.applyErrorsFrom(ctx);
    }

    return ctx;
  }

  validateChild(schema, key, value) {
    var ctx = new Context(schema, key, value, this);
    ctx.schema[$validate](ctx.value, ctx);

    this.applyErrorsFrom(ctx);

    return ctx;
  }

  applyErrorsFrom(ctx) {
    for (let i in ctx.errors) {
      let err = ctx.errors[i];
      err.path.unshift(this.key);
      this.errors.push(err);
    }
  }

  addError(error, info) {
    var err = {
      schema: this.schema,
      path: [this.key],
      value: this.value,
      error: error,
      info: info
    };

    this.errors.push(err);
  }

}
