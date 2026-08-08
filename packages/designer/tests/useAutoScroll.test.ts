import { describe, expect, it, vi, afterEach } from 'vitest';
import { ref, nextTick } from 'vue';
import { useContentAutoScroll } from '../src/components/widgets/agent/composables/useAutoScroll';

type RafCallback = (time: number) => void;

describe('useContentAutoScroll', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('scrolls the element to bottom when content changes', async () => {
    let rafCb: RafCallback | null = null;
    vi.stubGlobal('requestAnimationFrame', (cb: RafCallback) => {
      rafCb = cb;
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());

    const content = ref('');
    const el = { scrollTop: 0, scrollHeight: 100 };
    const elRef = ref<HTMLElement | undefined>(el as any);
    useContentAutoScroll(content, elRef);

    content.value = 'new content';
    // 第一次 nextTick 触发 watch 回调，回调内部再 nextTick 注册 rAF
    await nextTick();
    await nextTick();
    expect(rafCb).not.toBeNull();
    rafCb?.(0);
    expect(el.scrollTop).toBe(100);
  });

  it('does not throw when the element is not mounted', async () => {
    let rafCb: RafCallback | null = null;
    vi.stubGlobal('requestAnimationFrame', (cb: RafCallback) => {
      rafCb = cb;
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());

    const content = ref('');
    const elRef = ref<HTMLElement | undefined>(undefined);
    useContentAutoScroll(content, elRef);

    content.value = 'text';
    await nextTick();
    expect(() => rafCb?.(0)).not.toThrow();
  });

  it('dispose cancels the pending animation frame', async () => {
    const cancel = vi.fn();
    vi.stubGlobal('requestAnimationFrame', () => 42);
    vi.stubGlobal('cancelAnimationFrame', cancel);

    const content = ref('');
    const elRef = ref<HTMLElement | undefined>(undefined);
    const { dispose } = useContentAutoScroll(content, elRef);

    content.value = 'text';
    await nextTick();
    await nextTick();
    dispose();
    expect(cancel).toHaveBeenCalledWith(42);
  });
});
