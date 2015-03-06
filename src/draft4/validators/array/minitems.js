import {typeOf} from '../../../util';

const ERR = 'array.minItems';

export class MinItemsValidator {

  static include({ minItems }) {
    if (typeOf(minItems) === 'number') {
      return true;
    }

    return false;
  }

  constructor({ minItems }) {
    this.minItems = minItems;
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'array') return;

    if (value.length >= this.minItems) {
      return; // valid
    }

    ctx.addError(ERR);
  }

}
