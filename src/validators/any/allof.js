import {typeOf, isSchema} from '../../util';

const ERR = 'any.allOf';

export class AllOfValidator {

  static include({ allOf }) {
    if (typeOf(allOf) === 'array' && allOf.every(isSchema)) {
      return true;
    }

    return false;
  }

  constructor({ allOf }) {
    this.allOf = allOf;
  }

  validate(value, ctx) {
    let failed = false;

    for (let i in this.allOf) {
      let schema = this.allOf[i];
      if (!ctx.validateSelf(schema).valid) {
        failed = true;
      }
    }

    if (failed) {
      ctx.addError(ERR);
    }
  }

}
