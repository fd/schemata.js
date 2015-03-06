import {typeOf} from '../../util';

const ERR = 'number.multipleOf';

export class MultipleOfValidator {

  static include({ multipleOf }) {
    if (typeOf(multipleOf) === 'number') {
      return true;
    }

    return false;
  }

  constructor({ multipleOf }) {
    this.multipleOf = multipleOf;
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'number') return;

    if (((value/this.multipleOf)%1) === 0) {
      return; // valid
    }

    ctx.addError(ERR);
  }

}
