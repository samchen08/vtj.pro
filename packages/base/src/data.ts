/**
 * 数组转Map
 * @param data
 * @param prop
 * @returns
 */
export function arrayToMap<T>(data: T[], prop: keyof T) {
  return data.reduce((prev, current) => {
    const value = current[prop];
    prev.set(value, current);
    return prev;
  }, new Map<any, T>());
}

/**
 * Map转键值对
 * @param map
 * @returns
 */
export function mapToObject<V = any>(map: Map<any, V>) {
  return [...map.entries()].reduce(
    (obj, [key, value]) => ((obj[key] = value), obj),
    {} as Record<any, V>
  );
}

/**
 * 数组转键值对
 * @param data
 * @param key
 * @param value
 * @returns
 */
export function arrayToKv(
  data: Record<string, any>[] = [],
  key: string = 'key',
  value: string = 'value'
) {
  const result: Record<string, any> = {};
  for (const item of data) {
    result[item[key]] = item[item[value]];
  }
  return result;
}

/**
 * 键值对转数组
 * @param data
 * @param key
 * @param value
 * @returns
 */
export function kvToArray(
  data: Record<string, any> = {},
  key: string = 'key',
  value: string = 'value'
) {
  const entries = Object.entries(data);
  return entries.map((k, v) => {
    return {
      [key]: k,
      [value]: v
    };
  });
}

/**
 * 数组去重
 * @param array
 * @param prop
 * @returns
 */
export function dedupArray<T = any>(array: T[], prop?: keyof T): T[] {
  if (prop) {
    const map = arrayToMap<T>(array, prop);
    return Array.from(map.values());
  } else {
    return Array.from(new Set(array));
  }
}

/**
 * 转换数组
 * @param maybeArray
 * @returns
 */
export function toArray<T = any>(maybeArray?: T | T[]): T[] {
  return maybeArray ? [].concat(maybeArray as any) : [];
}

/**
 * 压缩对称，清除值为undefined或null的属性
 * @param obj
 * @returns
 */
export function zipObject(obj: Record<string, any>) {
  return Object.keys(obj).reduce(
    (prev, current) => {
      const value = obj[current];
      if (value !== undefined && value !== null) {
        prev[current] = value;
      }
      return prev;
    },
    {} as Record<string, any>
  );
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
 * 求合计
 * @param list
 * @param field
 * @returns
 */
export function sum<T = any>(list: T[] = [], field?: keyof T) {
  if (field) {
    return list.reduce((prev: number, cur: T) => {
      return prev + Number(cur[field]);
    }, 0);
  } else {
    return list.reduce((prev: number, cur: T) => {
      return prev + Number(cur);
    }, 0);
  }
}

/**
 * 求平均值
 * @param list
 * @param field
 * @returns
 */
export function avg<T = any>(list: T[] = [], field?: keyof T) {
  const total = sum(list, field);
  return list.length ? total / list.length : 0;
}
