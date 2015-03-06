import {typeOf} from '../../util';

const ERR = 'any.type';

export class TypeValidator {

  static include({ type }) {
    if (typeOf(type) === 'array') {
      return true;
    }
    if (typeOf(type) === 'string') {
      return true;
    }

    return false;
  }

  constructor({ type }) {
    if (typeOf(type) === 'string') {
      type = [type];
    }

    if (type.indexOf('number') >= 0) {
      type = type.concat(['integer']);
    }

    this.type = type;
  }

  validate(value, ctx) {
    let type = typeOf(value);

    if (type === 'number' && (value%1.0 === 0.0)) {
      type = 'integer';
    }

    if (this.type.indexOf(type) < 0) {
      ctx.addError(ERR);
    }
  }

}
