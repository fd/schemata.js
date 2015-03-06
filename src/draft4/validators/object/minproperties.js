import {typeOf} from '../../../util';

const ERR = 'object.minProperties';

export class MinPropertiesValidator {

  static include({ minProperties }) {
    if (typeOf(minProperties) === 'number') {
      return true;
    }

    return false;
  }

  constructor({ minProperties }) {
    this.minProperties = minProperties;
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'object') return;

    if (Object.keys(value).length >= this.minProperties) {
      return; // valid
    }

    ctx.addError(ERR);
  }

}
