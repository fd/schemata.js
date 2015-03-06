import {typeOf, isSchema, isSchemaArray} from '../../util';

const ERR = 'array.items';

export class ItemsValidator {

  static include({ items, additionalItems }) {
    let itemsOk = isSchema(items)
      || isSchemaArray(items);

    let additionalItemsOk = isSchema(additionalItems)
      || (typeOf(additionalItems) === 'boolean')
      || (additionalItems === undefined);

    return itemsOk && additionalItemsOk;
  }

  constructor({ items, additionalItems }) {
    this.items = items;
    this.additionalItems = additionalItems;
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'array') return;

    if (isSchema(this.items)) {
      for (var idx in value) {
        var child = value[idx];
        ctx.validateChild(this.items, idx, child);
      }
      return; // valid
    }

    // this.items is now an array
    if (this.additionalItems === false && value.length > this.items.length) {
      ctx.addError(ERR);
      return; // invalid
    }

    for (var i = 0; i < this.items.length && i < value.length; i++) {
      var child = value[i];
      ctx.validateChild(this.items[i], idx, child);
    }

    if (this.additionalItems === undefined || this.additionalItems === true) {
      return; // valid
    }

    if (isSchema(this.additionalItems) && value.length > this.items.length) {
      for (var i = this.items.length; i < value.length; i++) {
        var child = value[i];
        ctx.validateChild(this.additionalItems, idx, child);
      }
    }
  }

}
