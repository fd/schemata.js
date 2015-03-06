import {typeOf, isSchema} from '../../util';

const ERR = 'object.dependencies';

export class DependenciesValidator {

  static include({ dependencies }) {
    if (typeOf(dependencies) !== 'object') {
      return false;
    }

    let keys = Object.keys(dependencies);
    for (let i in keys) {
      let k = keys[i];
      let v = dependencies[k];
      let ok = isSchema(v) || (typeOf(v) === 'array' && v.every(x => (typeOf(x) === 'string')));
      if (!ok) {
        return false
      }
    }

    return true;
  }

  constructor({ dependencies }) {
    this.dependencies = dependencies;
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'object') return;

    let keys = Object.keys(value);
    for (let k in value) {
      var d = this.dependencies[k];
      if (!d) continue;

      if (isSchema(d)) {
        if (!ctx.validateSelf(d).valid) {
          ctx.addError(ERR, { property: k });
        }

      } else {
        for (let i in d) {
          let idx = keys.indexOf(d[i]);
          if (idx < 0) {
            ctx.addError(ERR, { property: k, dependency: d[i] });
          }
        }

      }
    }
  }

}
