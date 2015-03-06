import {typeOf} from '../../../util';

const ERR = 'object.required';

export class RequiredValidator {

  static include({ required }) {
    if (typeOf(required) === 'array') {
      return true;
    }

    return false;
  }

  constructor({ required }) {
    this.required = required;
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'object') return;

    for (var i in this.required) {
      var k = this.required[i];

      if (!value.hasOwnProperty(k)) {
        ctx.addError(ERR, { property: k });
      }
    }
  }

}
