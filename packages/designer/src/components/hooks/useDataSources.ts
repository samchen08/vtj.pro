import { computed } from 'vue';
import { useProject } from './useProject';

export function useDataSources() {
  const { engine, project } = useProject();

  const apis = computed(() => project.value?.apis || []);
  const meta = computed(() => project.value?.meta || []);

  return {
    engine,
    project,
    apis,
    meta
  };
}
