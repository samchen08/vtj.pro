import { ref, onMounted, onUnmounted } from 'vue';
import { rAF, cAF } from '@vtj/utils';
/**
 * 延时渲染
 * @param maxFrameCount
 * @returns
 *
 * @example
 * const defer = useDefer();
 * v-if="defer(10)" // 在第10帧开始渲染
 *
 */
export function useDefer(maxFrameCount: number = 1000) {
  const frameCount = ref(0);
  let id: number;
  const refreshFrameCount = () => {
    id = rAF(() => {
      ++frameCount.value;
      if (frameCount.value < maxFrameCount) {
        refreshFrameCount();
      }
    });
  };
  onMounted(refreshFrameCount);
  onUnmounted(() => {
    if (id) {
      cAF(id);
    }
  });
  return (showInFrameCount: number) => {
    return frameCount.value >= showInFrameCount;
  };
}
