import { upperFirst, camelCase } from 'lodash-es';

export {
  get,
  set,
  isPlainObject,
  cloneDeep,
  merge,
  debounce,
  throttle,
  isEqual,
  template,
  lowerFirst,
  kebabCase
} from 'lodash-es';

export { upperFirst, camelCase };

/**
 * 是否浏览器环境
 */
export const isClient = typeof window !== 'undefined';

/**
 * 已定义
 * @param val
 * @returns
 */
export const isDef = (val: unknown) => typeof val !== 'undefined';

/**
 * 当前时间
 * @returns
 */
 export const now = () => Date.now();

/**
 * 时间戳
 * @returns
 */
 export const timestamp = () => +Date.now();

/**
 * 随机数
 * @param min
 * @param max
 * @returns
 */
 export const rand = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function uid() {
  return Number(Math.random().toString().substring(2, 5) + Date.now()).toString(
    36
  );
}

export function uuid(split = true) {
  const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
  return split ? id.toLowerCase() : id.replace(/-/gi, '');
}

export function isFunction(val: any): val is (...args: any[]) => any {
  return typeof val === 'function';
}

export function isObject(value: any): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isUndefined(value: any): boolean {
  return typeof value === 'undefined' || value === null;
}

export function upperFirstCamelCase(name: string) {
  return upperFirst(camelCase(name));
}

/**
 * 对象排除属性
 * @param target 需要处理的对象
 * @param keys 需要排除的属性名称
 * @returns
 */
export function omit<
  T extends Record<string, any>,
  K extends Record<string, any>
>(target: T, keys: string[] | ((k: string, v: any) => boolean)): K {
  const result: Record<string, any> = {};
  if (Array.isArray(keys)) {
    Object.keys(target).forEach((k) => {
      if (!keys.includes(k)) {
        result[k] = target[k];
      }
    });
  } else {
    const filter = keys;
    Object.entries(target).forEach(([k, v]) => {
      if (!filter(k, v)) {
        result[k] = v;
      }
    });
  }
  return result as K;
}

/**
 * 对象提取属性
 * @param target
 * @param keys
 * @returns
 */
export function pick<
  T extends Record<string, any>,
  K extends Record<string, any>
>(target: T, keys: string[] | ((k: string, v: any) => boolean)): K {
  const result: Record<string, any> = {};
  if (Array.isArray(keys)) {
    Object.keys(target).forEach((k) => {
      if (keys.includes(k)) {
        result[k] = target[k];
      }
    });
  } else {
    const filter = keys;
    Object.entries(target).forEach(([k, v]) => {
      if (filter(k, v)) {
        result[k] = v;
      }
    });
  }
  return result as K;
}

/**
 * 递归对象或数组清除文本类型值的两边空格
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
export function trim(obj: any): any {
  const type = typeof obj;
  if (type === 'string') {
    return obj.trim();
  }
  if (Array.isArray(obj)) {
    return obj.map((n: any) => trim(n));
  }
  if (obj && type === 'object') {
    Object.entries(obj).forEach(([k, v]) => {
      obj[k] = trim(v);
    });
    return obj;
  }
  return obj;
}

/**
 * 截取几位小数
 */
export function toFixed(value: number, number = 2, round: boolean) {
  const method = round ? Math.round : Math.floor;
  return method(Math.pow(10, number) * value) / Math.pow(10, number);
}

export async function delay(val: number = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, val);
  });
}

export function arrayToMap<T>(data: T[], prop: keyof T) {
  return data.reduce((prev, current) => {
    const value = current[prop];
    prev.set(value, current);
    return prev;
  }, new Map<any, T>());
}

export function mapToObject<V = any>(map: Map<any, V>) {
  return [...map.entries()].reduce(
    (obj, [key, value]) => ((obj[key] = value), obj),
    {} as Record<any, V>
  );
}

export function dedupArray<T>(array: any[], prop?: keyof T) {
  if (prop) {
    const map = arrayToMap<T>(array, prop);
    return Array.from(map.values());
  } else {
    return Array.from(new Set(array));
  }
}
