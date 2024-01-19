import { computed } from 'vue';
import { useEngine } from '../../framework';
export function useProject() {
  const engine = useEngine();
  const project = computed(() => engine.project.value);

  return {
    engine,
    project
  };
}
