<template>
  <div></div>
</template>
<script lang="ts" setup>
  import { Queue } from '@vtj/utils';
  // 创建队列实例
  const queue = new Queue();

  // 模拟异步任务
  function delay(ms: number, value: any) {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log(`[${new Date().toISOString()}] 任务执行: ${value}`);
        resolve(value);
      }, ms)
    );
  }

  // 添加任务到队列
  async function addTask(key: string, task: () => Promise<any>) {
    try {
      console.log(`[${new Date().toISOString()}] 添加任务: ${key}`);
      const result = await queue.add(key, task);
      console.log(`[${new Date().toISOString()}] 任务完成: ${key} =>`, result);
    } catch (error) {
      console.log(`[${new Date().toISOString()}] 任务失败: ${key} =>`, error);
    }
  }

  // 添加任务
  addTask('task1', () => delay(1000, '结果1'));
  addTask('task2', () => delay(500, '结果2'));
  addTask('task3', () => Promise.reject('错误3'));

  // 添加相同的任务（应使用缓存）
  setTimeout(() => {
    addTask('task1', () => {
      console.log('这个任务不应执行，应使用缓存');
      return delay(1000, '新结果1');
    });

    addTask('task3', () => {
      console.log('这个任务不应执行，应使用缓存');
      return Promise.reject('新错误3');
    });
  }, 1500);

  // 获取缓存结果
  setTimeout(() => {
    const task1Result = queue.getResult('task1');
    console.log('task1缓存结果:', task1Result);

    const task3Result = queue.getResult('task3');
    console.log('task3缓存结果:', task3Result);

    const allResults = queue.getAllResults();
    console.log('所有任务结果:', allResults);
  }, 2000);

  /* 预期输出：
[时间] 添加任务: task1
[时间] 添加任务: task2
[时间] 添加任务: task3

[+1秒] 任务执行: 结果1
[+1秒] 任务完成: task1 => 结果1

[+0.5秒] 任务执行: 结果2
[+1.5秒] 任务完成: task2 => 结果2

[立即] 任务失败: task3 => 错误3

[+1.5秒] 添加任务: task1
[+1.5秒] 添加任务: task3
[+1.5秒] 任务完成: task1 => 结果1 (使用缓存)
[+1.5秒] 任务失败: task3 => 错误3 (使用缓存)

[+2秒] task1缓存结果: { key: 'task1', status: 'fulfilled', value: '结果1' }
[+2秒] task3缓存结果: { key: 'task3', status: 'rejected', reason: '错误3' }
[+2秒] 所有任务结果: [...] (包含所有4个结果)
*/
</script>
