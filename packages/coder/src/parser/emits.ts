import type { BlockEmit } from '@vtj/core';

export function parseEmits(emits: Array<string | BlockEmit> = []) {
  return emits.map((n) => {
    const name = typeof n === 'string' ? n : n.name;
    return `'${name}'`;
  });
}
