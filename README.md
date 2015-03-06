# schemata.js

```js
import {Schema} from 'shemata.js';

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
