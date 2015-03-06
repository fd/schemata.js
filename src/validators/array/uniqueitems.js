import {typeOf, isEqual} from '../../util';

const ERR = 'array.uniqueItems';

export class UniqueItemsValidator {

  static include({ uniqueItems }) {
    if (typeOf(uniqueItems) === 'boolean') {
      return true;
    }

    return false;
  }

  constructor({ uniqueItems }) {
    this.uniqueItems = uniqueItems;
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'array') return;
    if (!this.uniqueItems)        return;

    for (let i = 0; i < value.length - 1; i++) {
      let a = value[i];
      for (let j = i + 1; j < value.length; j++) {
        let b = value[j];
        if (isEqual(a, b)) {
          ctx.addError(ERR);
          return;
        }
      }
    }
  }

}
