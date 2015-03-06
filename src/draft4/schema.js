
export var schema = {
  "id": "http://json-schema.org/draft-04/schema#",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "Core schema meta-schema",
  "definitions": {
    "schemaArray": {
      "type": "array",
      "minItems": 1,
      "items": { "$ref": "#" }
    },
    "positiveInteger": {
      "type": "integer",
      "minimum": 0
    },
    "positiveIntegerDefault0": {
      "allOf": [ { "$ref": "#/definitions/positiveInteger" }, { "default": 0 } ]
    },
    "simpleTypes": {
      "enum": [ "array", "boolean", "integer", "null", "number", "object", "string" ]
    },
    "stringArray": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1,
      "uniqueItems": true
    }
  },
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "format": "uri-reference" // make sure references are allowed
    },
    "$schema": {
      "type": "string",
      "format": "uri"
    },
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "default": {},
    "multipleOf": {
      "type": "number",
      "minimum": 0,
      "exclusiveMinimum": true
    },
    "maximum": {
      "type": "number"
    },
    "exclusiveMaximum": {
      "type": "boolean",
      "default": false
    },
    "minimum": {
      "type": "number"
    },
    "exclusiveMinimum": {
      "type": "boolean",
      "default": false
    },
    "maxLength": { "$ref": "#/definitions/positiveInteger" },
    "minLength": { "$ref": "#/definitions/positiveIntegerDefault0" },
    "pattern": {
      "type": "string",
      "format": "regex"
    },
    "additionalItems": {
      "anyOf": [
        { "type": "boolean" },
        { "$ref": "#" }
      ],
      "default": {}
    },
    "items": {
      "anyOf": [
        { "$ref": "#" },
        { "$ref": "#/definitions/schemaArray" }
      ],
      "default": {}
    },
    "maxItems": { "$ref": "#/definitions/positiveInteger" },
    "minItems": { "$ref": "#/definitions/positiveIntegerDefault0" },
    "uniqueItems": {
      "type": "boolean",
      "default": false
    },
    "maxProperties": { "$ref": "#/definitions/positiveInteger" },
    "minProperties": { "$ref": "#/definitions/positiveIntegerDefault0" },
    "required": { "$ref": "#/definitions/stringArray" },
    "additionalProperties": {
      "anyOf": [
        { "type": "boolean" },
        { "$ref": "#" }
      ],
      "default": {}
    },
    "definitions": {
      "type": "object",
      "additionalProperties": { "$ref": "#" },
      "default": {}
    },
    "properties": {
      "type": "object",
      "additionalProperties": { "$ref": "#" },
      "default": {}
    },
    "patternProperties": {
      "type": "object",
      "additionalProperties": { "$ref": "#" },
      "default": {}
    },
    "dependencies": {
      "type": "object",
      "additionalProperties": {
        "anyOf": [
          { "$ref": "#" },
          { "$ref": "#/definitions/stringArray" }
        ]
      }
    },
    "enum": {
      "type": "array",
      "minItems": 1,
      "uniqueItems": true
    },
    "type": {
      "anyOf": [
        { "$ref": "#/definitions/simpleTypes" },
        {
          "type": "array",
          "items": { "$ref": "#/definitions/simpleTypes" },
          "minItems": 1,
          "uniqueItems": true
        }
      ]
    },
    "allOf": { "$ref": "#/definitions/schemaArray" },
    "anyOf": { "$ref": "#/definitions/schemaArray" },
    "oneOf": { "$ref": "#/definitions/schemaArray" },
    "not": { "$ref": "#" }
  },
  "dependencies": {
    "exclusiveMaximum": [ "maximum" ],
    "exclusiveMinimum": [ "minimum" ]
  },
  "default": {}
};

import {AllOfValidator}         from './validators/any/allof';
import {AnyOfValidator}         from './validators/any/anyof';
import {OneOfValidator}         from './validators/any/oneof';
import {NotValidator}           from './validators/any/not';
import {EnumValidator}          from './validators/any/enum';
import {TypeValidator}          from './validators/any/type';

import {ItemsValidator}         from './validators/array/items';
import {MaxItemsValidator}      from './validators/array/maxitems';
import {MinItemsValidator}      from './validators/array/minitems';
import {UniqueItemsValidator}   from './validators/array/uniqueitems';

import {MaximumValidator}       from './validators/number/maximum';
import {MinimumValidator}       from './validators/number/minimum';
import {MultipleOfValidator}    from './validators/number/multipleof';

import {DependenciesValidator}  from './validators/object/dependencies';
import {MaxPropertiesValidator} from './validators/object/maxproperties';
import {MinPropertiesValidator} from './validators/object/minproperties';
import {PropertiesValidator}    from './validators/object/properties';
import {RequiredValidator}      from './validators/object/required';

import {MaxLengthValidator}     from './validators/string/maxlength';
import {MinLengthValidator}     from './validators/string/minlength';
import {PatternValidator}       from './validators/string/pattern';
import {FormatValidator}        from './validators/string/format';

export var validators = [
  // Any
  AllOfValidator,
  AnyOfValidator,
  OneOfValidator,
  NotValidator,
  EnumValidator,
  TypeValidator,

  // Array
  ItemsValidator,
  MaxItemsValidator,
  MinItemsValidator,
  UniqueItemsValidator,

  // Number
  MaximumValidator,
  MinimumValidator,
  MultipleOfValidator,

  // Object
  DependenciesValidator,
  MaxPropertiesValidator,
  MinPropertiesValidator,
  PropertiesValidator,
  RequiredValidator,

  // String
  MaxLengthValidator,
  MinLengthValidator,
  PatternValidator,
  FormatValidator,
];
