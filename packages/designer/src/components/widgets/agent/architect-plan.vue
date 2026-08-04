<template>
  <section
    v-if="plan || streamText || reasoningText || answer"
    class="architect-message">
    <div class="assistant-head">
      <span class="assistant-avatar">AI</span>
      <strong>{{
        answer ? 'Architect 回复' : plan ? '执行计划' : '正在分析'
      }}</strong>
      <span v-if="plan" class="safety" :class="plan.safety">
        {{ safetyLabel }}
      </span>
    </div>

    <div class="assistant-content">
      <StreamMarkdown
        v-if="answer"
        class="answer-content"
        :content="answer"
        :code="code"></StreamMarkdown>

      <template v-else>
        <StreamMarkdown
          v-if="plan"
          class="intent"
          :content="plan.intent"
          :code="code"></StreamMarkdown>

        <ol v-if="plan?.steps?.length" class="plan-steps">
          <li v-for="step in plan.steps" :key="step.id">
            <StreamMarkdown
              :content="step.description"
              :code="code"></StreamMarkdown>
          </li>
        </ol>

        <el-collapse
          v-if="reasoningText || streamText"
          v-model="activeDetails"
          class="details-collapse">
          <el-collapse-item
            :title="plan ? '查看分析详情' : '正在生成规划…'"
            name="details">
            <pre v-if="reasoningText" class="reasoning-content">{{
              reasoningText
            }}</pre>
            <StreamMarkdown
              v-if="streamText"
              class="stream-content"
              :content="streamText"
              :code="code"></StreamMarkdown>
          </el-collapse-item>
        </el-collapse>
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { ElCollapse, ElCollapseItem } from 'element-plus';
  import type { PlanResult } from './types/agent';
  import StreamMarkdown from './stream-markdown.vue';

  const props = defineProps<{
    plan: PlanResult | null;
    answer: string;
    streamText: string;
    reasoningText: string;
    code: boolean;
    detailsCommand: number;
  }>();

  const activeDetails = ref<string[]>([]);
  watch(
    () => [props.plan, props.detailsCommand] as const,
    ([plan, command]) => {
      activeDetails.value = command
        ? command > 0
          ? ['details']
          : []
        : plan
          ? []
          : ['details'];
    },
    { immediate: true }
  );

  const safetyLabel = computed(() => {
    const labels = { readonly: '安全', write: '风险', destructive: '高危' };
    return labels[props.plan?.safety || 'readonly'];
  });
</script>

<style lang="scss" scoped>
  .architect-message {
    margin-bottom: 12px;
  }

  .assistant-head {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 7px;
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

  .safety {
    margin-left: auto;
    padding: 1px 6px;
    border-radius: 8px;
    color: var(--el-text-color-secondary);
    background: var(--el-fill-color);
    font-size: 11px;

    &.write {
      color: var(--el-color-warning);
      background: var(--el-color-warning-light-9);
    }

    &.destructive {
      color: var(--el-color-danger);
      background: var(--el-color-danger-light-9);
    }
  }

  .intent,
  .answer-content {
    margin: 0 0 8px;
    color: var(--el-text-color-primary);
    font-size: 12px;
    line-height: 1.65;
  }

  .plan-steps {
    margin: 8px 0 10px 18px;
    padding: 0;
    color: var(--el-text-color-regular);
    font-size: 12px;
    line-height: 1.75;
  }

  .details-collapse {
    border-top: 0;
    --el-collapse-header-height: 30px;

    :deep(.el-collapse-item__header) {
      height: 30px;
      background: transparent;
      border: 0;
      color: var(--el-text-color-secondary);
      font-size: 12px;
    }

    :deep(.el-collapse-item__wrap) {
      border: 0;
      background: transparent;
    }
    :deep(.el-collapse-item__content) {
      padding-bottom: 0;
    }
  }

  .assistant-content {
    margin-left: 31px;
    padding: 9px 10px;
    border-radius: var(--el-border-radius-base);
    background: var(--el-color-info-light-9);

    > :last-child {
      margin-bottom: 0;
    }
  }

  .reasoning-content,
  .stream-content {
    max-height: 260px;
    margin: 0 0 7px;
    padding: 8px 10px;
    overflow: auto;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: var(--el-border-radius-base);
    color: var(--el-text-color-regular);
    background: var(--el-bg-color);
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: 11px;
    line-height: 1.5;
    white-space: pre-wrap;
  }
</style>
