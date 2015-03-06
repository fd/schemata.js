import {isSchema} from '../../../util';

const ERR = 'any.not';

export class NotValidator {

  static include({ not }) {
    if (isSchema(not)) {
      return true;
    }

    return false;
  }

  constructor({ not }) {
    this.not = not;
  }

  validate(value, ctx) {
    if (ctx.validateSelf(this.not, { report: false }).valid) {
      ctx.addError(ERR);
    }
  }

}
