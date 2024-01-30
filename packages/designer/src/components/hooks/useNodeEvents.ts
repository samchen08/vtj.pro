import { type ComputedRef, computed, ref, watch } from 'vue';
import {
  isBlock,
  type MaterialDescription,
  type NodeEvents,
  type NodeEvent
} from '@vtj/core';
import { type DesignHelper, useEngine } from '../../framework';
import { MOUSE_EVENT_LIST, KEYBOARD_EVENT_LIST } from '../../constants';

export function useNodeEvents(
  selected: ComputedRef<DesignHelper | null | undefined>
) {
  const engine = useEngine();

  const node = computed(() => {
    const model = selected.value?.model || null;
    return !model || isBlock(model) ? null : model;
  });

  const blockMaterial = ref<MaterialDescription>();

  watch(node, async (v) => {
    if (v?.from) {
      blockMaterial.value =
        (await engine.assets.getBlockMaterial(v.from)) || undefined;
    } else {
      blockMaterial.value = undefined;
    }
  });

  const mouseEventList = computed(() => {
    if (isBlock(node.value)) return [];
    const events: NodeEvents = node.value?.events || {};
    return MOUSE_EVENT_LIST.map((name) => {
      return {
        name,
        event: events[name] as NodeEvent
      };
    });
  });

  const keyboardEventList = computed(() => {
    if (isBlock(node.value)) return [];
    const events: NodeEvents = node.value?.events || {};
    return KEYBOARD_EVENT_LIST.map((name) => {
      return {
        name,
        event: events[name] as NodeEvent
      };
    });
  });

  const componentEventList = computed(() => {
    if (!node.value || isBlock(node.value)) return [];

    const events: NodeEvents = node.value.events || {};
    const defineEvents =
      blockMaterial.value?.events ||
      engine.assets.componentMap.get(node.value.name)?.events ||
      [];
    return defineEvents.map((item) => {
      const name = typeof item === 'string' ? item : item.name;
      return {
        name: name,
        event: events[name] as NodeEvent
      };
    });
  });

  return {
    mouseEventList,
    keyboardEventList,
    componentEventList
  };
}
