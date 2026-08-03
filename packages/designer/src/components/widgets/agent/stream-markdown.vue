<template>
  <AIStreamMarkdown
    class="v-agent-stream-markdown"
    :content="props.content"
    :code="true"></AIStreamMarkdown>
</template>

<script lang="ts" setup>
  import AIStreamMarkdown from '../ai/stream-markdown.vue';

  const props = defineProps<{
    content?: string;
  }>();

  defineOptions({ name: 'AgentStreamMarkdown' });
</script>

<style lang="scss" scoped>
  .v-agent-stream-markdown {
    min-width: 0;
    color: var(--el-text-color-primary);
    font-size: 12px;
    line-height: 1.6;
    word-break: break-word;

    :deep(p) {
      margin: 0 0 6px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    :deep(pre) {
      max-width: 100%;
      overflow-x: auto;
    }
  }
</style>
