import {Schema} from './schema';

if (!window.URL) {
  throw Error("please include a URL polyfill");
}

export function typeOf(v) {
  if (v === undefined) return 'null';
  if (v === null)      return 'null';

  let type = typeof v;
  if (type !== 'object') return type;

  if (v instanceof Boolean) { return 'boolean'; }
  if (v instanceof Number)  { return 'number'; }
  if (v instanceof String)  { return 'string'; }
  if (v instanceof Array)   { return 'array'; }

  return type;
}

export function isSchema(v) {
  return (typeOf(v) === 'object') && (v instanceof Schema);
}

export function isSchemaArray(v) {
  return (typeOf(v) === 'array') && v.every(isSchema);
}

export function isSchemaMap(v) {
  if (typeOf(v) !== 'object') return false;

  let props = Object.keys(v);
  for (let i in props) {
    let k = props[i];
    if (!isSchema(v[k])) return false;
  }

  return true;
}

export function isEqual(a, b) {
  if (a === b) return true;

  let ta = typeOf(a);
  let tb = typeOf(b);
  if (ta !== tb) return false;

  if (ta === 'array') {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false;
    }

    return true;
  }

  if (ta === 'object') {
    let ka = Object.keys(a);
    let kb = Object.keys(b);
    if (ka.length !== kb.length) return false;

    // compare all keys from a with b
    for (let i = 0; i < ka.length; i++) {
      let k  = ka[i];
      let ib = kb.indexOf(k);
      if (ib < 0) return false;
      kb[ib] = null;

      if (!isEqual(a[k], b[k])) return false;
    }

    // detect leftover keys in b
    for (let i in kb) {
      let k = kb[i];
      if (k !== null) return false;
    }

    return true;
  }

  return a === b;
}

export function encodePointerComponent(component) {
  component = component.replace('~', '~0');
  component = component.replace('/', '~1');
  component = window.encodeURIComponent(component);
  return component;
}

export function decodePointerComponent(component) {
  component = window.decodeURIComponent(component);
  component = component.replace('~1', '/');
  component = component.replace('~0', '~');
  return component;
}

export function resolveReference(base, target) {
  if (base.startsWith('#')) {
    return target;
  }

  return new URL(target, base).toString();
}

export function normalizeId(id) {
  if (id.indexOf('#') < 0) {
    id += '#';
  }
  return id;
}

export function unicodeLength(str) {
  var length = str.length;
  var count  = 0;

  for (var i = 0; i<length; i++) {
    var code = str.charCodeAt(i);
    // don't count high surogates
    if (code < 0xD800 || 0xDBFF < code) {
      count++;
    }
  }

  return count;
}
