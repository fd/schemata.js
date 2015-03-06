import {typeOf, isEqual} from '../../../util';

const ERR = 'any.enum';

export class EnumValidator {

  static include(defn) {
    if (typeOf(defn.enum) === 'array') {
      return true;
    }

    return false;
  }

  constructor(defn) {
    this.enum = defn.enum;
  }

  validate(value, ctx) {
    for (let i in this.enum) {
      let v = this.enum[i];
      if (isEqual(v, value)) {
        return; // valid
      }
    }

    ctx.addError(ERR);
  }

}
