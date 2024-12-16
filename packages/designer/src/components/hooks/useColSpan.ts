import { computed } from 'vue';
import { useEngine } from '../../framework';

export function useColSpan(size: number = 160) {
  const engine = useEngine();
  const span = computed(() => {
    const iconBar = 50;
    const grid = 24;
    const width = engine.skeleton?.skeletonRef.leftWidth || 400 - iconBar;
    const column = Math.max(Math.floor(width / size), 1);
    return Math.floor(grid / column);
  });
  return {
    span,
    engine
  };
}
