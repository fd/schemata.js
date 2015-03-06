
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

export default [
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
