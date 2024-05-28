import { ref, computed, useAttrs, inject } from 'vue';
import { delay } from '@vtj/utils';
import type { QueryFormProps, QueryFormEmits } from './types';
import type { Emits } from '../shared';
import { GridInstanceKey } from '../grid/props';

export function useCollapsed(
  props: QueryFormProps,
  emit: Emits<QueryFormEmits>
) {
  const collapsed = ref(!!props.collapsible);
  const attrs = useAttrs() as Record<string, any>;
  const grid = inject(GridInstanceKey, null);
  const sizeMap: Record<string, number> = {
    large: 40 + 5,
    default: 32 + 5,
    small: 24 + 5
  };

  const toggleCollapsed = async () => {
    if (!props.collapsible) return;
    collapsed.value = !collapsed.value;
    emit('collapsed', collapsed.value);
    if (grid && grid.exposeProxy) {
      await delay(100);
      grid.exposeProxy.vxeRef.recalculate(true);
    }
  };

  const collapsedClass = computed(() => {
    return {
      'is-collapsed': collapsed.value
    };
  });

  const collapsedStyle = computed(() => {
    const currentSize = sizeMap[attrs.size || 'default'] ?? sizeMap.default;
    return collapsed.value
      ? {
          height: `${currentSize}px`
        }
      : null;
  });

  return {
    collapsed,
    toggleCollapsed,
    collapsedClass,
    collapsedStyle
  };
}
