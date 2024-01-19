import { type BlockState } from '@vtj/core';
import { parseValue } from '../utils';

export function parseState(state: BlockState = {}) {
  return Object.entries(state).map(([name, val]) => {
    const value = parseValue(val, false);
    return `${name}:${value}`;
  });
}
