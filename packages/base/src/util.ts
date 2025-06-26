// 计数递增种子
let _incremental = 0;

export const toTypeString = (value: unknown) =>
  Object.prototype.toString.call(value);

/**
 * 获取原生数据类型
 * @param value
 * @returns
 */
export const toRawType = (value: unknown) => {
  return toTypeString(value).slice(8, -1);
};

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
 * 生成一个随机数
 * @param min
 * @param max
 * @returns
 */
export const random = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 唯一id
 * @returns
 */
export function uid(start: Date = new Date('2025/01/01')) {
  return (
    (++_incremental).toString(36) +
    Number(Date.now() - start.getTime()).toString(36)
  );
}

/**
 * 生成一个 UUID 或 GUID， 默认GUID
 * @param split true为GUID，fasle为UUID
 * @returns
 */
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

/**
 * 延时函数
 * @param val
 * @returns
 */
export async function delay(val: number = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, val);
  });
}
