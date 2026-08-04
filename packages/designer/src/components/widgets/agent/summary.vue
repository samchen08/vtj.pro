<template>
  <section v-if="text || error" class="summary-message">
    <div class="summary-head">
      <span class="assistant-avatar">AI</span>
      <strong>任务总结</strong>
      <span v-if="error" class="summary-error">生成失败</span>
      <span v-else class="summary-success">完成</span>
    </div>
    <div class="assistant-content">
      <div v-if="error" class="error-block">总结生成失败：{{ error }}</div>
      <details
        v-if="reasoning"
        :key="detailsCommand"
        class="reasoning"
        :open="detailsCommand > 0">
        <summary>查看总结分析</summary>
        <pre ref="reasoningPreRef">{{ reasoning }}</pre>
      </details>
      <StreamMarkdown
        v-if="text"
        class="answer-content"
        :content="text"
        :code="code"
        @click="(...args) => $emit('view', ...args)"></StreamMarkdown>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref, toRef, onUnmounted } from 'vue';
  import StreamMarkdown from './stream-markdown.vue';
  import { useContentAutoScroll } from './composables/useAutoScroll';

  const props = defineProps<{
    text: string;
    reasoning: string;
    error: string;
    code: boolean;
    detailsCommand: number;
  }>();
  defineEmits<{
    view: [source: string, language: string];
  }>();

  // ── 流式内容自动滚到底部 ──
  const reasoningPreRef = ref<HTMLElement>();
  const { dispose } = useContentAutoScroll(
    toRef(props, 'reasoning'),
    reasoningPreRef
  );
  onUnmounted(() => dispose());
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
    font-size: 12px;
  }

  .assistant-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-8);
    font-size: 9px;
    font-weight: 600;
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

  .assistant-content {
    margin-left: 31px;
    padding: 9px 10px;
    border-radius: var(--el-border-radius-base);
    background: var(--el-color-success-light-9);
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
      border: 1px solid var(--el-border-color-lighter);
      border-radius: var(--el-border-radius-base);
      color: var(--el-text-color-regular);
      background: var(--el-bg-color);
      white-space: pre-wrap;
      margin-top: 10px;
    }
  }

  .answer-content {
    color: var(--el-text-color-primary);
    font-size: 12px;
    line-height: 1.65;
  }
</style>
