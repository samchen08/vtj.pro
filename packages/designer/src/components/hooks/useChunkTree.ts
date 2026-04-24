import {
  ref,
  computed,
  watch,
  onUnmounted,
  type Ref,
  type ComputedRef
} from 'vue';

export interface ChunkTreeOptions {
  /**
   * 每批渲染数量，默认 50
   */
  chunkSize?: number;
  /**
   * 是否初始加载第一批，默认 true
   */
  initialLoad?: boolean;
}

/**
 * 数据分片 Hook
 * 用于大数据量场景下，将数据分批渲染，避免一次性渲染大量 DOM 导致卡顿。
 * 初始化先渲染第一批，然后在浏览器空闲时（requestIdleCallback）逐步加载剩余数据。
 */
export function useChunkTree<T>(
  source: ComputedRef<T[]> | Ref<T[]>,
  options: ChunkTreeOptions = {}
) {
  const { chunkSize = 50, initialLoad = true } = options;

  const loadedCount = ref(initialLoad ? chunkSize : 0);
  const isFullyLoaded = ref(
    initialLoad ? source.value.length <= chunkSize : false
  );
  const isLoading = ref(false);

  let idleCallbackId: number | null = null;

  // 分片后的数据
  const chunkedData = computed(() => {
    const data = source.value;
    return data.slice(0, loadedCount.value);
  });

  // 是否还有更多数据
  const hasMore = computed(() => {
    return loadedCount.value < source.value.length;
  });

  // 加载下一批数据
  const loadMore = () => {
    if (!hasMore.value || isLoading.value) return;

    isLoading.value = true;
    loadedCount.value += chunkSize;

    if (!hasMore.value) {
      isFullyLoaded.value = true;
    }
    isLoading.value = false;
  };

  // 使用 requestIdleCallback 在空闲时逐步加载
  const startIdleLoading = () => {
    stopIdleLoading();

    if (isFullyLoaded.value || !hasMore.value) return;

    const scheduleNext = () => {
      if (!hasMore.value) {
        isFullyLoaded.value = true;
        return;
      }

      const win = window as any;
      if (typeof win !== 'undefined' && 'requestIdleCallback' in win) {
        idleCallbackId = win.requestIdleCallback(
          () => {
            loadMore();
            scheduleNext();
          },
          { timeout: 1000 }
        );
      } else {
        // 降级方案：使用 setTimeout
        idleCallbackId = win.setTimeout(() => {
          loadMore();
          scheduleNext();
        }, 0) as unknown as number;
      }
    };

    scheduleNext();
  };

  const stopIdleLoading = () => {
    if (idleCallbackId !== null) {
      const win = window as any;
      if (typeof win !== 'undefined' && 'cancelIdleCallback' in win) {
        win.cancelIdleCallback(idleCallbackId);
      } else {
        win.clearTimeout(idleCallbackId);
      }
      idleCallbackId = null;
    }
  };

  // 重置
  const reset = () => {
    stopIdleLoading();
    loadedCount.value = initialLoad ? chunkSize : 0;
    isFullyLoaded.value = source.value.length <= chunkSize;
    isLoading.value = false;
    startIdleLoading();
  };

  // 当源数据变化时，如果新数据更少，调整 loadedCount
  watch(
    () => source.value.length,
    (newLen) => {
      if (loadedCount.value > newLen) {
        loadedCount.value = newLen;
        if (loadedCount.value >= newLen) {
          isFullyLoaded.value = true;
        }
      }
    }
  );

  // 当源数据引用变化时重置（增删改拖拽等操作）
  watch(
    () => source.value,
    () => {
      reset();
    },
    { deep: false }
  );

  // 启动空闲加载
  startIdleLoading();

  // 清理
  onUnmounted(() => {
    stopIdleLoading();
  });

  return {
    /** 分片后的数据 */
    chunkedData,
    /** 是否还有更多数据 */
    hasMore,
    /** 是否已全部加载 */
    isFullyLoaded,
    /** 当前已加载数量 */
    loadedCount,
    /** 是否正在加载 */
    isLoading,
    /** 手动加载下一批 */
    loadMore,
    /** 重置分片 */
    reset
  };
}
