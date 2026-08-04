<template>
  <article class="round-section" :class="{ latest: isLatest }">
    <div class="round-meta">{{ roundLabel }}</div>
    <div class="user-message">{{ round.userMessage }}</div>

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
        v-for="(step, idx) in round.editorResults"
        :key="idx"
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
  import type { ConversationRound } from './types/agent';

  import ArchitectPlanCard from './architect-plan.vue';
  import EditorStepCard from './editor-step.vue';
  import SummaryCard from './summary.vue';

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

  .step-list {
    margin: 10px 0 12px 29px;
    border-left: 1px solid var(--el-color-primary-light-7);
  }
</style>
