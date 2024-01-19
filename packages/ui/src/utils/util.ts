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

export function toObjectProps<T extends Record<string, any>>(
  value?: boolean | T,
  defaultValue = {} as T
) {
  const result = { ...defaultValue } as T;
  if (typeof value === 'boolean') {
    return result;
  }
  return Object.assign(result, value || {}) as T;
}
