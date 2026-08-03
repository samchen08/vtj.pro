<template>
  <article class="round-section" :class="{ latest: isLatest }">
    <div class="round-meta">{{ roundLabel }}</div>
    <div class="user-message">{{ round.userMessage }}</div>

    <ArchitectPlanCard
      :plan="round.architectPlan"
      :answer="round.architectAnswer"
      :stream-text="round.architectStreamText"
      :reasoning-text="round.reasoningText" />

    <div v-if="round.editorResults.length" class="step-list">
      <EditorStepCard
        v-for="(step, idx) in round.editorResults"
        :key="idx"
        :step="step"
        @resolve-approval="
          (id, approved) => $emit('resolveApproval', id, approved)
        " />
    </div>

    <SummaryCard
      :text="round.summaryText"
      :reasoning="round.summaryReasoning"
      :error="round.summaryError" />
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
  }>();

  const roundLabel = computed(() => `第 ${props.roundNumber} 轮`);

  defineEmits<{
    resolveApproval: [id: string, approved: boolean];
  }>();
</script>

<style lang="scss" scoped>
  .round-section {
    padding-bottom: 20px;

    & + & {
      padding-top: 18px;
      border-top: 1px solid var(--el-border-color-lighter);
    }
  }

  .round-meta {
    margin-bottom: 6px;
    color: var(--el-text-color-placeholder);
    font-size: 11px;
    text-align: right;
  }

  .user-message {
    width: fit-content;
    max-width: 88%;
    margin: 0 0 16px auto;
    padding: 9px 11px;
    border-radius: 8px 8px 2px 8px;
    color: var(--el-text-color-primary);
    background: var(--el-fill-color-light);
    font-size: 13px;
    line-height: 1.55;
    white-space: pre-wrap;
  }

  .step-list {
    margin: 8px 0 12px 28px;
    border-left: 1px solid var(--el-border-color);
  }
</style>
