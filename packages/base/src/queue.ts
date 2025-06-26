export class Queue {
  private queue: Array<{
    key: string | symbol;
    task: () => Promise<any>;
    resolve: (value: any) => void;
    reject: (reason: any) => void;
  }> = [];

  private isProcessing = false;
  private results: Array<{
    key: string | symbol;
    status: 'fulfilled' | 'rejected';
    value?: any;
    reason?: any;
  }> = [];

  // 缓存存储：键 -> 任务结果
  private cache = new Map<
    string | symbol,
    {
      status: 'fulfilled' | 'rejected';
      value?: any;
      reason?: any;
    }
  >();

  // 等待中的任务映射：键 -> Promise
  private pendingTasks = new Map<string | symbol, Promise<any>>();

  /**
   * 添加任务到队列
   * @param key 任务唯一标识符（用于缓存）
   * @param task 要执行的任务函数
   * @returns 任务结果的Promise
   */
  add<T>(key: string | symbol, task: () => Promise<T>): Promise<T> {
    // 检查缓存中是否有结果
    const cachedResult = this.cache.get(key);
    if (cachedResult) {
      if (cachedResult.status === 'fulfilled') {
        return Promise.resolve(cachedResult.value);
      } else {
        return Promise.reject(cachedResult.reason);
      }
    }

    // 检查是否已有相同任务在执行中
    const pendingTask = this.pendingTasks.get(key);
    if (pendingTask) {
      return pendingTask;
    }

    // 创建新任务
    const promise = new Promise<T>((resolve, reject) => {
      this.queue.push({ key, task, resolve, reject });

      if (!this.isProcessing) {
        this.processQueue();
      }
    });

    // 记录正在等待的任务
    this.pendingTasks.set(key, promise);

    return promise;
  }

  /**
   * 获取所有已完成任务的结果
   * @returns 所有任务结果的副本
   */
  getAllResults() {
    return [...this.results];
  }

  /**
   * 获取特定任务的结果
   * @param key 任务键
   * @returns 任务结果或undefined
   */
  getResult(key: string | symbol) {
    return this.cache.get(key);
  }

  /**
   * 清除特定任务的缓存
   * @param key 要清除的任务键
   */
  clearCacheForKey(key: string | symbol) {
    this.cache.delete(key);
  }

  /**
   * 清除所有缓存
   */
  clearAllCache() {
    this.cache.clear();
  }

  // 处理队列中的任务
  private async processQueue() {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const { key, task, resolve, reject } = this.queue.shift()!;

    try {
      // 再次检查缓存（可能在等待期间已缓存）
      const cachedResult = this.cache.get(key);
      if (cachedResult) {
        if (cachedResult.status === 'fulfilled') {
          resolve(cachedResult.value);
        } else {
          reject(cachedResult.reason);
        }
        this.pendingTasks.delete(key);
        this.processQueue();
        return;
      }

      // 执行任务
      const result = await task();

      // 存储结果
      const resultEntry = { key, status: 'fulfilled', value: result };
      this.results.push(resultEntry as any);
      this.cache.set(key, resultEntry as any);

      // 解析Promise并清理
      resolve(result);
      this.pendingTasks.delete(key);
    } catch (error) {
      // 存储错误
      const resultEntry = { key, status: 'rejected', reason: error };
      this.results.push(resultEntry as any);
      this.cache.set(key, resultEntry as any);

      // 拒绝Promise并清理
      reject(error);
      this.pendingTasks.delete(key);
    } finally {
      // 继续处理下一个任务
      this.processQueue();
    }
  }
}
