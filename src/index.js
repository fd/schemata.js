import {registerMetaSchema} from './builder';
import './context';
import './loader';
import './schema';
import './util';

import './vendor/ipaddr';
import './vendor/url';

import * as Draft4 from './draft4/schema';
import './draft4/validators/any/allof';
import './draft4/validators/any/anyof';
import './draft4/validators/any/oneof';
import './draft4/validators/any/not';
import './draft4/validators/any/enum';
import './draft4/validators/any/type';
import './draft4/validators/array/items';
import './draft4/validators/array/maxitems';
import './draft4/validators/array/minitems';
import './draft4/validators/array/uniqueitems';
import './draft4/validators/number/maximum';
import './draft4/validators/number/minimum';
import './draft4/validators/number/multipleof';
import './draft4/validators/object/dependencies';
import './draft4/validators/object/maxproperties';
import './draft4/validators/object/minproperties';
import './draft4/validators/object/properties';
import './draft4/validators/object/required';
import './draft4/validators/string/maxlength';
import './draft4/validators/string/minlength';
import './draft4/validators/string/pattern';
import './draft4/validators/string/format';

export {Schema, Loader} from './schema';

registerMetaSchema(Draft4);
