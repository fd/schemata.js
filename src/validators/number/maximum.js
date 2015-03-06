import {typeOf} from '../../util';

const ERR = 'number.maximum';

export class MaximumValidator {

  static include({ maximum }) {
    if (typeOf(maximum) === 'number') {
      return true;
    }

    return false;
  }

  constructor({ maximum, exclusiveMaximum }) {
    this.maximum          = maximum
    this.exclusiveMaximum = exclusiveMaximum;
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'number') return;

    if (!this.exclusiveMaximum && (value <= this.maximum)) {
      return; // valid
    }

    if (this.exclusiveMaximum && (value < this.maximum)) {
      return; // valid
    }

    ctx.addError(ERR);
  }

}
