import {typeOf, isSchema} from '../../../util';

const ERR = 'any.anyOf';

export class AnyOfValidator {

  static include({ anyOf }) {
    if (typeOf(anyOf) === 'array' && anyOf.every(isSchema)) {
      return true;
    }

    return false;
  }

  constructor({ anyOf }) {
    this.anyOf = anyOf;
  }

  validate(value, ctx) {
    let ctxs = [];

    for (let i in this.anyOf) {
      let schema = this.anyOf[i];
      let childCtx = ctx.validateSelf(schema, { report: false });
      if (childCtx.valid) {
        return;
      } else {
        ctxs.push(childCtx);
      }
    }

    ctx.addError(ERR);
    ctxs.forEach(c => ctx.applyErrorsFrom(c));
  }

}
