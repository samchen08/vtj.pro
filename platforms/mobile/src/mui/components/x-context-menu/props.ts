import type { PropType } from 'vue';
import type { ContextMenuItem, contextMenuPosition } from './types';

export const contextMenuProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array as PropType<ContextMenuItem[]>,
    default() {
      return [] as ContextMenuItem[];
    }
  },
  position: {
    type: Object as PropType<contextMenuPosition>,
    default() {
      return { x: 0, y: 0 };
    }
  }
};
