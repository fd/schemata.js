var browsers = [

  ['chrome', '35'],
  ['chrome', '36'],
  ['chrome', '37'],
  ['chrome', '38'],
  ['chrome', '39'],
  ['chrome', '40'],

  ['firefox', '30'],
  ['firefox', '31'],
  ['firefox', '32'],
  ['firefox', '33'],
  ['firefox', '34'],
  ['firefox', '35'],

  ['internet explorer', '9'],
  ['internet explorer', '10'],
  ['internet explorer', '11'],

  ['safari', '6.0'],
  ['safari', '7.0'],
  ['safari', '8.0']

];

module.exports = (function(){
  var l = [];
  var b = null;

  for (var i in browsers) {
    if (i%3 === 0) {
      b = {};
      l.push(b);
    }

    var spec = browsers[i];

    b["sl_"+spec[0]+"_"+spec[1]] = {
      base:        'SauceLabs',
      browserName: spec[0],
      version:     spec[1]
    };
  }

  return l;
})();
