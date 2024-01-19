import { type JSFunction } from '@vtj/core';
import { replaceFunctionTag, parseValue, replaceComputedValue } from '../utils';

export function parseFunctionMap(
  map: Record<string, JSFunction> = {},
  computedKeys: string[] = []
) {
  return Object.entries(map).map(([name, val]) => {
    let handler = replaceFunctionTag(parseValue(val, false, false) as string);
    handler = replaceComputedValue(handler, computedKeys);
    if (handler.startsWith('async')) {
      return `async ${name}${handler.replace(/^async/, '')}`;
    }
    return `${name}${handler}`;
  });
}
