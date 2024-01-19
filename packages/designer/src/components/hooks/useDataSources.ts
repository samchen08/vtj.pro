import { computed } from 'vue';
import { useProject } from './useProject';

export function useDataSources() {
  const { engine, project } = useProject();

  const apis = computed(() => project.value?.apis || []);


  return {
    engine,
    project,
    apis
  };
}
