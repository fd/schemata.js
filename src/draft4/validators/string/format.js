import {typeOf} from '../../../util';
import ipaddr from '../../../vendor/ipaddr';

if (!window.URL) {
  throw Error("please include a URL polyfill");
}

const ERR = 'string.format';

export class FormatValidator {

  static include({ format }) {
    if (typeOf(format) === 'string') {
      return true;
    }

    return false;
  }

  constructor({ format }) {
    this.format = format;
  }

  validate(value, ctx) {
    if (typeOf(value) !== 'string') return;

    let test = FormatValidator.formats[this.format];
    if (!test || test(value)) return;

    ctx.addError(ERR);
  }

}

var re_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var re_hostname = /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*\.?$/
var re_datetime = /^(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)?(:)?(\d\d)?([\.,]\d+)?($|Z|([+-])(\d\d)(:)?(\d\d)?)$/i;

FormatValidator.formats = {

  hostname(s) {
    return re_hostname.test(s);
  },

  ["date-time"](s) {
    return !!parseRFC3339DateTime(s);
  },

  ["uri-reference"](s) {
    var ok = true;
    // try url
    try { new URL(s); } catch (e) {
      // url reference
      try { new URL("http://test/"+s); } catch (e) {
        ok = false;
      }
    }
    return ok;
  },

  uri(s) {
    var ok = true;
    // try url
    try { new URL(s); } catch (e) {
      ok = false;
    }
    return ok;
  },

  email(s) {
    return re_email.test(s);
  },

  ipv4(s) {
    if (s.split('.').length !== 4) return false;
    return ipaddr.IPv4.isValid(s);
  },

  ipv6(s) {
    if (s.split(':').length > 8) return false;
    return ipaddr.IPv6.isValid(s);
  }

}

function parseRFC3339DateTime(dString){
  if (typeof dString != 'string') return;
  var result;
  var d = dString.match(re_datetime);
  if (d) {
    var year = parseInt(d[1],10);
    var mon = parseInt(d[3],10) - 1;
    var day = parseInt(d[5],10);
    var hour = parseInt(d[7],10);
    var mins = ( d[9] ? parseInt(d[9],10) : 0 );
    var secs = ( d[11] ? parseInt(d[11],10) : 0 );
    var millis = ( d[12] ? parseFloat(String(1.5).charAt(1) + d[12].slice(1)) * 1000 : 0 );
    if (d[13]) {
      result = new Date(0);
      result.setUTCFullYear(year);
      result.setUTCMonth(mon);
      result.setUTCDate(day);
      result.setUTCHours(hour);
      result.setUTCMinutes(mins);
      result.setUTCSeconds(secs);
      result.setUTCMilliseconds(millis);
      if (d[13] && d[14]) {
        var offset = (d[15] * 60)
        if (d[17]) offset += parseInt(d[17],10);
        offset *= ((d[14] == '-') ? -1 : 1);
        result.setTime(result.getTime() - offset * 60 * 1000);
      }
    } else {
      result = new Date(year,mon,day,hour,mins,secs,millis);
    }
  }
  return result;
}
