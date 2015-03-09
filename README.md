# schemata.js

[![Sauce Test Status](https://saucelabs.com/browser-matrix/schematajs.svg)](https://saucelabs.com/u/schematajs)


```js
import {Schema} from 'schemata.js';

Schema.import('http://json-schema.org/card')
  .then(schema => {
    var info = schema.validate({
      "familyName": "Menke",
      "givenName": "Simon",
    });

    if (!info.valid) {
      console.log(info.errors);
    }
  });
```
