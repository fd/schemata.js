import {typeOf} from '../../util';

const ERR = 'object.maxProperties';

export class MaxPropertiesValidator {

  static include({ maxProperties }) {
    if (typeOf(maxProperties) === 'number') {
      return true;
    }

    return false;
  }

  constructor({ maxProperties }) {
    this.maxProperties = maxProperties;
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'object') return;

    if (Object.keys(value).length <= this.maxProperties) {
      return; // valid
    }

    ctx.addError(ERR);
  }

}
