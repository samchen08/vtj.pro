import { type BlockWatch, type JSFunction } from '@vtj/core';
import { parseFunctionMap } from './functions';
import { isJSFunction, replaceFunctionTag } from '../utils';

export function parseWatch(
  watch: BlockWatch[] = [],
  computedKeys: string[] = []
) {
  const watchers = watch.reduce(
    (prev, current) => {
      if (current.id && isJSFunction(current.source)) {
        prev[`watcher_${current.id}`] = current.source;
      }
      return prev;
    },
    {} as Record<string, JSFunction>
  );
  const computed = parseFunctionMap(watchers, computedKeys);

  const watches = watch.map((n) => {
    return `watcher_${n.id}: {
        deep: ${n.deep},
        immediate:${n.immediate},
        handler${replaceFunctionTag(n.handler.value)}
      }`;
  });
  return {
    computed,
    watches
  };
}
