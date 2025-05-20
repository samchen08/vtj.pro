import { reactive } from 'vue';
import { kebabCase, camelCase } from '@vtj/utils';

export function useListeners(attrs: Record<string, any>) {
  const listeners = reactive<Record<string, (...args: any) => void>>({});

  for (const [prop, handler] of Object.entries(attrs)) {
    const [on, ...args] = kebabCase(prop).split('-');
    if (on === 'on' && typeof handler === 'function') {
      const name = camelCase(args.join('-'));
      listeners[name] = handler;
    }
  }

  return listeners;
}
