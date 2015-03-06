import {typeOf, unicodeLength} from '../../util';

const ERR = 'string.maxLength';

export class MaxLengthValidator {

  static include({ maxLength }) {
    if (typeOf(maxLength) === 'number') {
      return true;
    }

    return false;
  }

  constructor({ maxLength }) {
    this.maxLength = maxLength;
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'string') return;

    if (unicodeLength(value) <= this.maxLength) {
      return; // valid
    }

    ctx.addError(ERR);
  }

}
