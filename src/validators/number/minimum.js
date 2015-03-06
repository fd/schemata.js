import {typeOf} from '../../util';

const ERR = 'number.minimum';

export class MinimumValidator {

  static include({ minimum }) {
    if (typeOf(minimum) === 'number') {
      return true;
    }

    return false;
  }

  constructor({ minimum, exclusiveMinimum }) {
    this.minimum          = minimum
    this.exclusiveMinimum = exclusiveMinimum;
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'number') return;

    if (!this.exclusiveMinimum && (this.minimum <= value)) {
      return; // valid
    }

    if (this.exclusiveMinimum && (this.minimum < value)) {
      return; // valid
    }

    ctx.addError(ERR);
  }

}
