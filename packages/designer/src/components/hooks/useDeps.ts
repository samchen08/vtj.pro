import { computed } from 'vue';
import { useEngine } from '../../framework';

export function useDeps() {
  const engine = useEngine();
  const dependencies = computed(() => engine.project.value?.dependencies ?? []);
  const apis = computed(() => engine.project.value?.apis ?? []);
  return {
    engine,
    dependencies,
    apis
  };
}
