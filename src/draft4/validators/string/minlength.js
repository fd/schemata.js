import {typeOf, unicodeLength} from '../../../util';

const ERR = 'string.minLength';

export class MinLengthValidator {

  static include({ minLength }) {
    if (typeOf(minLength) === 'number') {
      return true;
    }

    return false;
  }

  constructor({ minLength }) {
    this.minLength = minLength;
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'string') return;

    if (unicodeLength(value) >= this.minLength) {
      return; // valid
    }

    ctx.addError(ERR);
  }

}
