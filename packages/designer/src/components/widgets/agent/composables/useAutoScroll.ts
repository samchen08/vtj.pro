import { watch, nextTick, type Ref } from 'vue';

/**
 * 监听文本内容变化，自动将关联的 DOM 元素滚动到底部
 * 适用于流式输出场景（reasoning-content、stream-content 等）
 */
export function useContentAutoScroll(
  contentRef: Ref<string>,
  elRef: Ref<HTMLElement | undefined>
) {
  let scrollFrame = 0;

  watch(
    contentRef,
    () => {
      cancelAnimationFrame(scrollFrame);
      nextTick(() => {
        scrollFrame = requestAnimationFrame(() => {
          const el = elRef.value;
          if (el) el.scrollTop = el.scrollHeight;
        });
      });
    },
    { flush: 'post' }
  );

  function dispose() {
    cancelAnimationFrame(scrollFrame);
  }

  return { dispose };
}
