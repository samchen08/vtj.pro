import { computed } from 'vue';
import { isBlock } from '@vtj/core';
import { useEngine, Designer } from '../../framework';

export function useSelected() {
  const engine = useEngine();
  const designer = computed<Designer | null>(
    () => engine.simulator.designer.value
  );
  const selected = computed(() => designer.value?.selected.value);
  const isSelectBlock = computed(() => isBlock(selected.value?.model));

  return {
    engine,
    designer,
    selected,
    isSelectBlock
  };
}
