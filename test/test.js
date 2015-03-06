import {Schema, Loader} from '../src/index';

var featureURLs = [
  "test/draft4/additionalItems.json!",
  "test/draft4/additionalProperties.json!",
  "test/draft4/allOf.json!",
  "test/draft4/anyOf.json!",
  "test/draft4/default.json!",
  "test/draft4/definitions.json!",
  "test/draft4/dependencies.json!",
  "test/draft4/enum.json!",
  "test/draft4/items.json!",
  "test/draft4/maximum.json!",
  "test/draft4/maxItems.json!",
  "test/draft4/maxLength.json!",
  "test/draft4/maxProperties.json!",
  "test/draft4/minimum.json!",
  "test/draft4/minItems.json!",
  "test/draft4/minLength.json!",
  "test/draft4/minProperties.json!",
  "test/draft4/multipleOf.json!",
  "test/draft4/not.json!",
  "test/draft4/oneOf.json!",
  "test/draft4/pattern.json!",
  "test/draft4/patternProperties.json!",
  "test/draft4/properties.json!",
  "test/draft4/ref.json!",
  "test/draft4/refRemote.json!",
  "test/draft4/required.json!",
  "test/draft4/type.json!",
  "test/draft4/uniqueItems.json!",

  "test/draft4/optional/bignum.json!",
  "test/draft4/optional/format.json!"
];


// rewrite URLs
var loaderFetch = Loader.fetch;
Loader.fetch = function fetch(url) {
  url = url.replace('http://localhost:1234/', '/base/test/remotes/');
  url = url.replace(/\/\//g, '/');
  return loaderFetch.call(this, url);
};


export function setup() {
  return Promise.all(featureURLs.map(loadTest))
    .then(describeSuite);

  function loadTest(url) {
    return System.import(url).then(json => ({ name: url, scenarios: json }));
  }

  function describeSuite(suite) {
    describe("Suite", function(){
      suite.forEach((feature) => {
        describe(feature.name, function(){
          feature.scenarios.forEach((scenario) => {
            describe(scenario.description, function(){
              var schema;

              beforeAll(function(done) {
                Schema.build(scenario.schema)
                  .then(x => { schema = x; })
                  .catch(err => { expect(err).toBeUndefined(); })
                  .then(done);
              });

              it("should build the schema", function(){
                expect(schema).not.toBeUndefined();
              })

              scenario.tests.forEach((test) => {
                it(test.description, function(){
                  let info = schema.validate(test.data);

                  if (test.valid) {
                    expect(info.valid).toBe(true);
                    expect(info.errors.length).toBe(0);
                  } else {
                    expect(info.errors.length).not.toBe(0);
                    expect(info.valid).toBe(false);
                  }

                });
              });

            });
          });
        });
      });
    });
  }
}
