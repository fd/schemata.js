import {typeOf} from '../../util';

const ERR = 'array.maxItems';

export class MaxItemsValidator {

  static include({ maxItems }) {
    if (typeOf(maxItems) === 'number') {
      return true;
    }

    return false;
  }

  constructor({ maxItems }) {
    this.maxItems = maxItems;
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'array') return;

    if (value.length <= this.maxItems) {
      return; // valid
    }

    ctx.addError(ERR);
  }

}
