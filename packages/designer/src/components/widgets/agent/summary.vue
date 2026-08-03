<template>
  <section v-if="text || error" class="summary-message">
    <div class="summary-head">
      <span class="assistant-avatar">AI</span>
      <strong>任务总结</strong>
      <span v-if="error" class="summary-error">生成失败</span>
      <span v-else class="summary-success">完成</span>
    </div>
    <div v-if="error" class="error-block">总结生成失败：{{ error }}</div>
    <details v-if="reasoning" class="reasoning">
      <summary>查看总结分析</summary>
      <pre>{{ reasoning }}</pre>
    </details>
    <div v-if="text" class="answer-content">{{ text }}</div>
  </section>
</template>

<script lang="ts" setup>
  defineProps<{
    text: string;
    reasoning: string;
    error: string;
  }>();
</script>

<style lang="scss" scoped>
  .summary-message {
    margin: 14px 0 0;
  }

  .summary-head {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 8px;
    font-size: 13px;
  }

  .assistant-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 21px;
    height: 21px;
    border-radius: 4px;
    color: #fff;
    background: var(--el-color-primary);
    font-size: 9px;
  }

  .summary-success,
  .summary-error {
    margin-left: auto;
    color: var(--el-color-success);
    font-size: 11px;
  }

  .summary-error {
    color: var(--el-color-danger);
  }

  .error-block,
  .answer-content,
  .reasoning {
    margin-left: 28px;
  }

  .error-block {
    margin-bottom: 8px;
    color: var(--el-color-danger);
  }

  .reasoning {
    margin-bottom: 8px;
    color: var(--el-text-color-secondary);
    font-size: 11px;

    summary {
      cursor: pointer;
    }

    pre {
      max-height: 220px;
      padding: 8px;
      overflow: auto;
      border-radius: 4px;
      color: var(--el-text-color-regular);
      background: var(--el-fill-color-light);
      white-space: pre-wrap;
    }
  }

  .answer-content {
    color: var(--el-text-color-primary);
    font-size: 13px;
    line-height: 1.65;
    white-space: pre-wrap;
  }
</style>
