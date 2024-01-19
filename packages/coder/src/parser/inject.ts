import { type BlockInject } from '@vtj/core';
import { parseValue } from '../utils';

export function parseInject(inject: BlockInject[] = []) {
  return inject.map((n) => {
    return `${n.name}: {
            from: '${n.from || n.name}',
            default: ${parseValue(n.default, true, false)}
        }`;
  });
}
