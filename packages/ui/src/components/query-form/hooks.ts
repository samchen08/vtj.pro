import { ref, computed, useAttrs, inject, nextTick } from 'vue';
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

  const showCollapsible = computed(() => {
    if (props.items) {
      return (
        props.collapsible && props.items.length > (props.inlineColumns || 0)
      );
    } else {
      return props.collapsible;
    }
  });

  const toggleCollapsed = async () => {
    if (!props.collapsible) return;
    collapsed.value = !collapsed.value;
    emit('collapsed', collapsed.value);
    if (grid && grid) {
      await nextTick();
      grid.exposed?.doLayout();
    }
  };

  const collapsedClass = computed(() => {
    return {
      'is-collapsed': showCollapsible.value && collapsed.value
    };
  });

  const collapsedStyle = computed(() => {
    const currentSize = sizeMap[attrs.size || 'default'] ?? sizeMap.default;
    return showCollapsible.value && collapsed.value
      ? {
          height: `${currentSize}px`
        }
      : null;
  });

  return {
    collapsed,
    toggleCollapsed,
    collapsedClass,
    collapsedStyle,
    showCollapsible
  };
}
