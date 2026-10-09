import { ref, watch, type Ref } from 'vue';
import { isBlock, type BlockModel, type NodeModel } from '@vtj/core';
import type { Designer } from '../../framework';

// 只判断当前目标的添加能力，不扫描其他节点。
export function useCanAddComponent(
  model: () => BlockModel | NodeModel | undefined,
  designer: Ref<Designer | null | undefined>,
  changed: Ref<unknown>
) {
  const canAddComponent = ref(false);
  watch(
    [model, designer, changed],
    async ([node, instance], _, onCleanup) => {
      let active = true;
      onCleanup(() => (active = false));
      canAddComponent.value = !!node && isBlock(node);
      if (!node || isBlock(node) || !instance) return;
      try {
        const allowed = await instance.canAddComponent(node);
        if (active) canAddComponent.value = allowed;
      } catch {
        if (active) canAddComponent.value = false;
      }
    },
    { immediate: true, flush: 'post' }
  );
  return canAddComponent;
}
