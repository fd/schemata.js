
import {createContext} from './context';
import {Loader as LoaderClass} from './loader';

import {
  decodePointerComponent,
  resolveReference,
  normalizeId,
  typeOf,
  isSchema
} from './util';

export var $validators = Symbol("$validators");
export var $schema     = Symbol("$schema");
export var $ref        = Symbol("$ref");
export var $id         = Symbol("$id");
export var $validate   = Symbol("$validate");
export var $rescoped   = Symbol("$rescoped");
export var $guard      = Symbol("$guard");
var $getChildSchema    = Symbol("$getChildSchema");

export var Loader = new LoaderClass();

export class Schema {

  static import(opts) {
    return Loader.import(opts);
  }

  static build(definition, id) {
    return Loader.build(definition, id);
  }

  static register(schema, id) {
    return Loader.register(schema, id);
  }

  constructor(id, guard) {
    if (guard !== $guard) {
      throw Error("please use Schema.import() to get schemas");
    }

    this[$id] = id;
  }

  get(id) {
    id = normalizeId(id);
    id = resolveReference(this[$id], id);


    let rootId   = id.slice(0, id.indexOf('#')+1);
    let fragment = id.slice(id.indexOf('#')+2);
    let context  = this;

    if (rootId !== this[$id]) {
      context = this[$rescoped][rootId];
    }

    if (context === undefined) {
      return null;
    }

    return context[$getChildSchema](fragment);
  }

  [$getChildSchema](fragment) {
    if (this[$schema]) {
      return this[$schema][$getChildSchema](fragment);
    }

    if (fragment === '') {
      return this;
    }

    let slashIdx  = fragment.indexOf('/');
    let component = fragment;
    let remainder = null;
    if (slashIdx >= 0) {
      component = fragment.slice(0, slashIdx);
      remainder = fragment.slice(slashIdx+1)
    }
    component = decodePointerComponent(component);

    let child = this[component];

    if (child === undefined) {
      return null;
    }

    if (!remainder) {
      return child;
    }

    if (typeOf(child) === 'array') {
      return this[$getChildSchema].call(child, remainder);
    }

    if (!isSchema(child)) {
      return null;
    }

    return child[$getChildSchema](remainder);
  }

  validate(value) {
    if (this[$schema]) {
      return this[$schema].validate(value);
    }

    var ctx = createContext(this, value);
    return this[$validate](value, ctx);
  }

  [$validate](value, ctx) {
    if (this[$schema]) {
      return this[$schema][$validate](value, ctx);
    }

    if (this[$validators]) {
      this[$validators].forEach(v => v.validate(value, ctx));
    }

    ctx.valid = (ctx.errors.length === 0);

    return ctx;
  }

}
