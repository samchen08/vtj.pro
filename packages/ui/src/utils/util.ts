export function getSizeValue(value: string | number) {
  return typeof value === 'string' ? value : `${value}px`;
}

export function parseSize(size: string | number = 0, max: number) {
  if (typeof size === 'number') {
    return size;
  }
  const regex = /(%|vh|vw)$/i;
  if (regex.test(size)) {
    const value = Number.parseInt(size);
    return Math.floor((max * value) / 100);
  }
  return Number.parseInt(size);
}

export function omit<
  T extends Record<string, any>,
  K extends Record<string, any>
>(target: T, keys: string[]): K {
  const result: Record<string, any> = {};
  Object.keys(target).forEach((k) => {
    if (!keys.includes(k)) {
      result[k] = target[k];
    }
  });
  return result as K;
}

export function pick<
  T extends Record<string, any>,
  K extends Record<string, any>
>(target: T, keys: string[]): K {
  const result: Record<string, any> = {};
  Object.keys(target).forEach((k) => {
    if (keys.includes(k)) {
      result[k] = target[k];
    }
  });
  return result as K;
}

export const NOOP = () => {};
