import { upperFirst, camelCase } from 'lodash-es';

/**
 * 导出常用的lodash工具函数
 *
 * 每个函数的说明和示例:
 *
 * isString(value: any): boolean - 检查值是否为字符串
 *  示例: isString('hello') // => true
 *
 * isFunction(value: any): boolean - 检查值是否为函数
 *  示例: isFunction(() => {}) // => true
 *
 * isArray(value: any): boolean - 检查值是否为数组
 *  示例: isArray([1, 2, 3]) // => true
 *
 * isObject(value: any): boolean - 检查值是否为对象(非null)
 *  示例: isObject({}) // => true
 *
 * isBoolean(value: any): boolean - 检查值是否为布尔值
 *  示例: isBoolean(true) // => true
 *
 * isBuffer(value: any): boolean - 检查值是否为Buffer
 *  示例: isBuffer(Buffer.from('hello')) // => true
 *
 * isArrayBuffer(value: any): boolean - 检查值是否为ArrayBuffer
 *  示例: isArrayBuffer(new ArrayBuffer(8)) // => true
 *
 * isDate(value: any): boolean - 检查值是否为Date对象
 *  示例: isDate(new Date()) // => true
 *
 * isUndefined(value: any): boolean - 检查值是否为undefined
 *  示例: isUndefined(undefined) // => true
 *
 * isNaN(value: any): boolean - 检查值是否为NaN
 *  示例: isNaN(NaN) // => true
 *
 * isNull(value: any): boolean - 检查值是否为null
 *  示例: isNull(null) // => true
 *
 * isNumber(value: any): boolean - 检查值是否为数字
 *  示例: isNumber(42) // => true
 *
 * isSymbol(value: any): boolean - 检查值是否为Symbol
 *  示例: isSymbol(Symbol('foo')) // => true
 *
 * isPlainObject(value: any): boolean - 检查值是否为纯对象
 *  示例: isPlainObject({}) // => true
 *
 * isEqual(value: any, other: any): boolean - 深度比较两个值是否相等
 *  示例: isEqual({a: 1}, {a: 1}) // => true
 *
 * noop(): void - 空操作函数
 *  示例: noop() // => undefined
 *
 * upperFirst(string: string): string - 首字母大写
 *  示例: upperFirst('hello') // => 'Hello'
 *
 * camelCase(string: string): string - 转换为驼峰命名
 *  示例: camelCase('hello-world') // => 'helloWorld'
 *
 * get(object: Object, path: string, defaultValue: any): any - 获取对象属性值
 *  示例: get({a: {b: 1}}, 'a.b') // => 1
 *
 * set(object: Object, path: string, value: any): Object - 设置对象属性值
 *  示例: set({}, 'a.b', 1) // => {a: {b: 1}}
 *
 * cloneDeep(value: any): any - 深拷贝
 *  示例: cloneDeep({a: 1}) // => {a: 1}
 *
 * merge(object: Object, ...sources: Object[]): Object - 深度合并对象
 *  示例: merge({a: 1}, {b: 2}) // => {a: 1, b: 2}
 *
 * debounce(func: Function, wait: number, options: Object): Function - 防抖函数
 *  示例: const debounced = debounce(() => console.log('hello'), 100)
 *
 * throttle(func: Function, wait: number, options: Object): Function - 节流函数
 *  示例: const throttled = throttle(() => console.log('hello'), 100)
 *
 * template(string: string, options: Object): Function - 模板函数
 *  示例: const compiled = template('hello <%= user %>!')
 *        compiled({user: 'world'}) // => 'hello world!'
 *
 * lowerFirst(string: string): string - 首字母小写
 *  示例: lowerFirst('Hello') // => 'hello'
 *
 * kebabCase(string: string): string - 转换为短横线命名(kebab-case)
 *  示例: kebabCase('helloWorld') // => 'hello-world'
 *
 * snakeCase(string: string): string - 转换为蛇形命名(snake_case)
 *  示例: snakeCase('helloWorld') // => 'hello_world'
 *
 * groupBy(collection: Array|Object, iteratee: Function|string): Object - 根据条件分组
 *  示例: groupBy([1.1, 1.2, 2.3], Math.floor) // => {1: [1.1, 1.2], 2: [2.3]}
 */
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

/**
 * 将字符串转换为首字母大写的驼峰命名形式
 * @param name - 需要转换的字符串
 * @returns 转换后的字符串
 *
 * 示例:
 *   upperFirstCamelCase('hello-world') // => 'HelloWorld'
 *   upperFirstCamelCase('hello_world') // => 'HelloWorld'
 *   upperFirstCamelCase('hello world') // => 'HelloWorld'
 */
export function upperFirstCamelCase(name: string) {
  return upperFirst(camelCase(name));
}
