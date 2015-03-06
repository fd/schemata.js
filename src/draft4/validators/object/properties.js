import {typeOf, isSchema, isSchemaMap} from '../../../util';

const ERR = 'object.properties';

export class PropertiesValidator {

  static include({ properties, patternProperties, additionalProperties }) {
    let ok = false;

    if (isSchemaMap(properties)) {
      ok = true;
    }
    if (isSchemaMap(patternProperties)) {
      ok = true;
    }
    if (isSchema(additionalProperties) || (typeOf(additionalProperties) === 'boolean')) {
      ok = true;
    }

    return ok;
  }

  constructor({ properties, patternProperties, additionalProperties }) {
    if (isSchemaMap(properties)) {
      this.properties = properties;
    } else {
      this.properties = {};
    }

    if (isSchemaMap(patternProperties)) {
      this.patternProperties = [];
      let props = Object.keys(patternProperties);
      for (let i in props) {
        let k = props[i];
        let p = patternProperties[k];

        this.patternProperties.push({
          pattern: k,
          regexp:  new RegExp(k),
          schema:  p
        });
      }
    } else {
      this.patternProperties = [];
    }

    if (typeOf(additionalProperties) === 'boolean') {
      this.additionalProperties = additionalProperties;
    } else if (isSchema(additionalProperties)) {
      this.additionalProperties = additionalProperties;
    } else {
      this.additionalProperties = undefined;
    }
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'object') return;

    // validate self
    if (this.additionalProperties === false) {
      let s = Object.keys(value);
      let p = Object.keys(this.properties);

      // remove p
      for (var i in p) {
        i = s.indexOf(p[i]);
        s[i] = null;
      }

      // remove pp
      for (var i in this.patternProperties) {
        let pp = this.patternProperties[i];

        for (var j in s) {
          if (s[j] === null) continue;
          if (pp.regexp.test(s[j])) {
            s[j] = null;
          }
        }
      }

      for (var i in s) {
        let p = s[i];
        if (p === null) continue;
        ctx.addError(ERR, { property: p });
      }
    }

    // validate children
    var properties = Object.keys(value);
    var additionalProperties = Object.keys(value);

    for (var i in properties) {
      let k = properties[i];

      let schema = this.properties[k];
      if (schema) {
        ctx.validateChild(schema, k, value[k]);
        additionalProperties[i] = null;
      }
    }

    for (var j in properties) {
      let k = properties[j];

      for (var i in this.patternProperties) {
        let pp = this.patternProperties[i];
        if (pp.regexp.test(k)) {
          additionalProperties[j] = null;
          ctx.validateChild(pp.schema, k, value[k]);
        }
      }
    }

    if (typeOf(this.additionalProperties) === 'object') {
      let schema = this.additionalProperties;
      for (var i in additionalProperties) {
        let k = additionalProperties[i];
        if (k === null) continue;
        ctx.validateChild(schema, k, value[k]);
        properties[i] = null;
      }
    }
  }

}
