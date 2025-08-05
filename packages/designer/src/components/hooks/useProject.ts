import { computed } from 'vue';
import { useEngine } from '../../framework';
export function useProject() {
  const engine = useEngine();
  const project = computed(() => engine.project.value);
  const activeFiles = computed(() => {
    const model = project.value;
    if (model) {
      const ids = model.activeFiles || [];
      return ids
        .map((id: string) => {
          return model.getPage(id) || model.getBlock(id) || null;
        })
        .filter((n) => !!n);
    }
    return [];
  });

  return {
    engine,
    project,
    activeFiles
  };
}
