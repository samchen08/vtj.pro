<template>
  <article class="round-section" :class="{ latest: isLatest }">
    <div class="round-meta">{{ roundLabel }}</div>
    <div v-if="round.userMessage" class="user-message">
      {{ round.userMessage }}
      <div v-if="round.attachments?.length" class="attachment-list">
        <div v-for="f in round.attachments" :key="f.id" class="attachment-item">
          <ElImage
            v-if="f.type === 'image' && f.url"
            :src="getAttachmentUrl(f.url)!"
            :preview-src-list="[getAttachmentUrl(f.url)!]"
            fit="cover"
            preview-teleported
            class="attachment-thumb"
            :alt="f.name" />
          <span v-else class="attachment-icon">{ }</span>
          <span class="attachment-name">{{ f.name }}</span>
        </div>
      </div>
    </div>

    <ArchitectPlanCard
      :plan="round.architectPlan"
      :answer="round.architectAnswer"
      :stream-text="round.architectStreamText"
      :reasoning-text="round.reasoningText"
      :code="code"
      :details-command="detailsCommand"
      @view="(...args) => $emit('view', ...args)" />

    <div v-if="round.editorResults.length" class="step-list">
      <EditorStepCard
        v-for="step in round.editorResults"
        :key="step.stepIdx"
        :step="step"
        :retryable="retryable"
        :code="code"
        :details-command="detailsCommand"
        @view="(...args) => $emit('view', ...args)"
        @apply="(dsl) => $emit('apply', dsl)"
        @retry="$emit('retryStep', step.stepIdx)"
        @resolve-approval="
          (id, approved) => $emit('resolveApproval', id, approved)
        " />
    </div>

    <SummaryCard
      :text="round.summaryText"
      :reasoning="round.summaryReasoning"
      :error="round.summaryError"
      :retryable="retryable"
      :code="code"
      :details-command="detailsCommand"
      @retry="$emit('retrySummary')"
      @view="(...args) => $emit('view', ...args)" />
  </article>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElImage } from 'element-plus';
  import { useOpenApi } from '../../hooks';
  import type { ConversationRound } from './types/agent';

  import ArchitectPlanCard from './architect-plan.vue';
  import EditorStepCard from './editor-step.vue';
  import SummaryCard from './summary.vue';

  const { getOssFile } = useOpenApi();

  /**
   * 从附件 url 中截取文件名，再拼接 OSS 完整访问地址
   * 例：http://localhost:8000/api/oss/file/gitcode_1m6kgbk8.png → gitcode_1m6kgbk8.png
   */
  const getAttachmentUrl = (url?: string) => {
    if (!url) return undefined;
    // 去掉 query / hash 后取路径最后一段作为文件名
    const fileName = url.split(/[?#]/)[0].split('/').pop();
    return getOssFile(fileName || url);
  };

  const props = defineProps<{
    round: ConversationRound;
    roundNumber: number;
    isLatest: boolean;
    retryable: boolean;
    code: boolean;
    detailsCommand: number;
  }>();

  const roundLabel = computed(() => `第 ${props.roundNumber} 轮`);

  defineEmits<{
    resolveApproval: [id: string, approved: boolean];
    view: [source: string, language: string, dsl?: Record<string, any>];
    apply: [dsl: Record<string, any>];
    retryStep: [stepIndex: number];
    retrySummary: [];
  }>();
</script>

<style lang="scss" scoped>
  .round-section {
    padding-bottom: 10px;

    & + & {
      padding-top: 10px;
    }
  }

  .round-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    color: var(--el-text-color-placeholder);
    font-size: 11px;

    &::before,
    &::after {
      content: '';
      height: 1px;
      flex: 1;
      background: var(--el-border-color-lighter);
    }
  }

  .user-message {
    width: fit-content;
    max-width: 88%;
    margin: 0 0 14px auto;
    padding: 8px 10px;
    border-radius: 6px 6px 2px 6px;
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-9);
    font-size: 12px;
    line-height: 1.6;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .attachment-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }

  .attachment-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    max-width: 180px;
    padding: 3px 6px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 5px;
    background: var(--el-bg-color);
    font-size: 12px;

    .attachment-thumb,
    .attachment-icon {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      border-radius: 3px;
    }

    .attachment-thumb {
      cursor: pointer;
    }

    .attachment-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--el-color-primary);
      background: var(--el-color-primary-light-9);
    }

    .attachment-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .step-list {
    margin: 10px 0 12px 29px;
    border-left: 1px solid var(--el-color-primary-light-7);
  }
</style>
