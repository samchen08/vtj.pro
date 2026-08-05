import { watch, nextTick, type Ref } from 'vue';

/**
 * 监听内容变化，自动将关联的 DOM 元素滚动到底部
 * 适用于流式输出场景（reasoning-content、stream-content、turn 内容等）
 * @param contentRef 内容源（字符串或派生数组，变化时触发滚动）
 * @param elRef 目标元素或元素数组
 * @param options.deep 内容为嵌套结构（如数组内对象字段）时开启
 */
export function useContentAutoScroll(
  contentRef: Ref<unknown>,
  elRef: Ref<HTMLElement | HTMLElement[] | undefined>,
  options?: { deep?: boolean }
) {
  let scrollFrame = 0;

  watch(
    contentRef,
    () => {
      cancelAnimationFrame(scrollFrame);
      nextTick(() => {
        scrollFrame = requestAnimationFrame(() => {
          const el = elRef.value;
          const els = Array.isArray(el) ? el : [el];
          els.forEach((item) => {
            if (item) item.scrollTop = item.scrollHeight;
          });
        });
      });
    },
    { flush: 'post', deep: options?.deep }
  );

  function dispose() {
    cancelAnimationFrame(scrollFrame);
  }

  return { dispose };
}
