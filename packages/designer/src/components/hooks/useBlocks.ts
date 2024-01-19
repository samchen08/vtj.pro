import { computed } from 'vue';
import { useEngine } from '../../framework';

export function useBlocks() {
  const engine = useEngine();

  const blocks = computed(() => engine.project.value?.blocks ?? []);

  return {
    engine,
    blocks
  };
}
