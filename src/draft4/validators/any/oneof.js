import {typeOf, isSchema} from '../../../util';

const ERR = 'any.oneOf';

export class OneOfValidator {

  static include({ oneOf }) {
    if (typeOf(oneOf) === 'array' && oneOf.every(isSchema)) {
      return true;
    }

    return false;
  }

  constructor({ oneOf }) {
    this.oneOf = oneOf;
  }

  validate(value, ctx) {
    let c = 0;

    for (let i in this.oneOf) {
      let schema = this.oneOf[i];
      if (ctx.validateSelf(schema, { report: false }).valid) {
        c++;
      }
    }

    if (c > 1) {
      ctx.addError(ERR, { reason: "more than one valid schema" });
    } else if (c < 1) {
      ctx.addError(ERR, { reason: "no valid schema" });
    }
  }

}
