import { upperFirst, camelCase } from 'lodash-es';
export {
  isString,
  isFunction,
  isArray,
  isObject,
  isBoolean,
  isBuffer,
  isArrayBuffer,
  isDate,
  isUndefined,
  isNaN,
  isNull,
  isNumber,
  isSymbol,
  isPlainObject,
  isEqual,
  noop,
  upperFirst,
  camelCase,
  get,
  set,
  cloneDeep,
  merge,
  debounce,
  throttle,
  template,
  lowerFirst,
  kebabCase,
  snakeCase,
  groupBy
} from 'lodash-es';

export function upperFirstCamelCase(name: string) {
  return upperFirst(camelCase(name));
}
