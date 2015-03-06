import {typeOf} from '../../../util';

const ERR = 'string.pattern';

export class PatternValidator {

  static include({ pattern }) {
    if (typeOf(pattern) === 'string') {
      return true;
    }

    return false;
  }

  constructor({ pattern }) {
    this.pattern = pattern;
    this.regexp  = new RegExp(pattern);
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'string') return;

    if (this.regexp.test(value)) {
      return; // valid
    }

    ctx.addError(ERR);
  }

}
