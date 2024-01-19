import { computed } from 'vue';
import { useEngine } from '../../framework';

export function useColSpan() {
  const engine = useEngine();
  const span = computed(() => {
    const iconBar = 50;
    const grid = 24;
    const width = engine.skeleton?.skeletonRef.leftWidth || 400;
    const count = Math.min(Math.floor((width - iconBar) / 120), grid);
    return Math.floor(grid / count);
  });
  return {
    span,
    engine
  };
}
