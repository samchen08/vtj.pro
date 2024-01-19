import { computed } from 'vue';
import { useEngine } from '../../framework';

export function useDeps() {
  const engine = useEngine();
  const dependencies = computed(() => engine.project.value?.dependencies ?? []);

  return {
    engine,
    dependencies
  };
}
