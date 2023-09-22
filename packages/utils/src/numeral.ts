import numeral from 'numeral';

export function numberFormat(value: number, format: string) {
  return numeral(value).format(format);
}

export { numeral };
