import {Schema, Loader} from '../index';

var definition = {
  "title": "Example Schema",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "age": {
      "description": "Age in years",
      "type": "integer",
      "minimum": 0
    },
    "schema-items": { "$ref": "http://json-schema.org/draft-04/schema#/properties/items" }
  },
  "required": ["firstName", "lastName"],

  "definitions": {
    "test": {
      "id": "http://mrhenry.be#/hello/cool",
      "title": "Example Schema",
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "age": {
          "description": "Age in years",
          "type": "integer",
          "minimum": 0
        }
      },
      "required": ["firstName", "lastName"]
    }
  }
};

var example = {
  firstName: "Simon",
  lastName:  'Menke',
  age: -28
};

time('import 1', Schema.build(definition))
  .then(schema => {console.log(schema); return schema;})
  .then(schema => console.log(schema.validate(example)));

function time(label, v) {
  console.time(label);
  return Promise.resolve(v).then(
    (r) => {
      console.timeEnd(label);
      return r;
    });
}

var loaderFetch = Loader.fetch;
Loader.fetch = function fetch(url) {
  url = url.replace('http://localhost:1234/', '/test/remotes/');
  return loaderFetch.call(this, url);
};


// if (false)
Promise.all([
  loadTest("test/draft4/additionalItems.json!"),
  loadTest("test/draft4/additionalProperties.json!"),
  loadTest("test/draft4/allOf.json!"),
  loadTest("test/draft4/anyOf.json!"),
  loadTest("test/draft4/default.json!"),
  loadTest("test/draft4/definitions.json!"),
  loadTest("test/draft4/dependencies.json!"),
  loadTest("test/draft4/enum.json!"),
  loadTest("test/draft4/items.json!"),
  loadTest("test/draft4/maximum.json!"),
  loadTest("test/draft4/maxItems.json!"),
  loadTest("test/draft4/maxLength.json!"),
  loadTest("test/draft4/maxProperties.json!"),
  loadTest("test/draft4/minimum.json!"),
  loadTest("test/draft4/minItems.json!"),
  loadTest("test/draft4/minLength.json!"),
  loadTest("test/draft4/minProperties.json!"),
  loadTest("test/draft4/multipleOf.json!"),
  loadTest("test/draft4/not.json!"),
  loadTest("test/draft4/oneOf.json!"),
  loadTest("test/draft4/pattern.json!"),
  loadTest("test/draft4/patternProperties.json!"),
  loadTest("test/draft4/properties.json!"),
  loadTest("test/draft4/ref.json!"),
  loadTest("test/draft4/refRemote.json!"),
  loadTest("test/draft4/required.json!"),
  loadTest("test/draft4/type.json!"),
  loadTest("test/draft4/uniqueItems.json!"),

  loadTest("test/draft4/optional/bignum.json!"),
  loadTest("test/draft4/optional/format.json!")
])
.then(suite => {
  var all = [];
  suite.forEach((feature) => {
    feature.scenarios.forEach((scenario) => {
      let p = Schema.build(scenario.schema)
        .then(s => scenario.$schema = s)
        .catch(err => {
          scenario.error = err
          feature.failed = true;
          scenario.failed = true;
        })
        .then(() => {
          if (!scenario.$schema) return;

          let schema = scenario.$schema;
          scenario.tests.forEach((test) => {
            let info = schema.validate(test.data);

            if (info.valid !== test.valid) {
              test.failed     = true;
              test.info       = info;
              scenario.failed = (scenario.failed || true);
              feature.failed  = (feature.failed  || true);
            }
          });
        });
      all.push(p);
    });
  });

  return Promise.all(all).then(() => suite);
})
.then(suite => {
  suite.forEach((feature) => {
    if (feature.failed) {
      console.group(feature.name);
    } else {
      console.groupCollapsed(feature.name);
    }
    feature.scenarios.forEach((scenario) => {
      if (scenario.failed || scenario.error) {
        console.group(scenario.description);
      } else {
        console.groupCollapsed(scenario.description);
      }
      console.log("schema: %o", scenario.schema);

      if (scenario.error) {
        console.error("failed to import: %o", scenario.error);
      }

      scenario.tests.forEach((test) => {
        if (scenario.error) {
          console.warn(test.description);
          return;
        }

        if (!test.failed) {
          console.info(test.description);
          return;
        }

        console.group(test.description);
        console.log(  "data:  %o", test.data);
        console.log(  "valid: %o", test.valid);
        console.error("info:  %o", test.info);
        console.groupEnd();
      });
      console.groupEnd();
    });
    console.groupEnd();
  });
});


function loadTest(url) {
  return System.import(url).then(json => ({ name: url, scenarios: json }));
}
