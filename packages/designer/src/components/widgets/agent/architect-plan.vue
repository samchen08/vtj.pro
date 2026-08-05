<template>
  <section
    v-if="plan || streamText || reasoningText || answer || error"
    class="architect-message">
    <div class="assistant-head">
      <span class="assistant-avatar">AI</span>
      <strong>{{
        answer
          ? 'Architect 回复'
          : plan
            ? '执行计划'
            : error
              ? '规划失败'
              : '正在分析'
      }}</strong>
      <span v-if="plan" class="safety" :class="plan.safety">
        {{ safetyLabel }}
      </span>
    </div>

    <div class="assistant-content">
      <div v-if="error" class="error-block">
        <span>规划失败：{{ error }}</span>
        <ElButton
          v-if="retryable"
          link
          type="primary"
          size="small"
          @click="$emit('retry')">
          重新规划
        </ElButton>
      </div>

      <StreamMarkdown
        v-if="answer"
        class="answer-content"
        :content="answer"
        :code="code"
        @click="(...args) => $emit('view', ...args)"></StreamMarkdown>

      <template v-else>
        <StreamMarkdown
          v-if="plan"
          class="intent"
          :content="plan.intent"
          :code="code"
          @click="(...args) => $emit('view', ...args)"></StreamMarkdown>

        <ol v-if="plan?.steps?.length" class="plan-steps">
          <li v-for="step in plan.steps" :key="step.id">
            <StreamMarkdown
              :content="step.description"
              :code="code"
              @click="(...args) => $emit('view', ...args)"></StreamMarkdown>
          </li>
        </ol>

        <el-collapse
          v-if="reasoningText || streamText"
          v-model="activeDetails"
          class="details-collapse">
          <el-collapse-item
            :title="
              plan ? '查看分析详情' : error ? '查看原始输出' : '正在生成规划…'
            "
            name="details">
            <pre
              ref="reasoningContentRef"
              v-if="reasoningText"
              class="reasoning-content"
              >{{ reasoningText }}</pre
            >
            <div
              ref="streamContentRef"
              v-if="streamText"
              class="stream-content">
              <StreamMarkdown
                :content="streamText"
                :code="code"
                @click="(...args) => $emit('view', ...args)"></StreamMarkdown>
            </div>
          </el-collapse-item>
        </el-collapse>
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { computed, ref, watch, toRef, onUnmounted } from 'vue';
  import { ElButton, ElCollapse, ElCollapseItem } from 'element-plus';
  import type { PlanResult } from './types/agent';
  import StreamMarkdown from './stream-markdown.vue';
  import { useContentAutoScroll } from './composables/useAutoScroll';

  const props = defineProps<{
    plan: PlanResult | null;
    answer: string;
    streamText: string;
    reasoningText: string;
    error: string;
    code: boolean;
    detailsCommand: number;
    retryable: boolean;
  }>();
  defineEmits<{
    view: [source: string, language: string];
    retry: [];
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

  // ── 流式内容自动滚到底部 ──
  const reasoningContentRef = ref<HTMLElement>();
  const streamContentRef = ref<HTMLElement>();
  const { dispose: disposeReasoningScroll } = useContentAutoScroll(
    toRef(props, 'reasoningText'),
    reasoningContentRef
  );
  const { dispose: disposeStreamScroll } = useContentAutoScroll(
    toRef(props, 'streamText'),
    streamContentRef
  );
  onUnmounted(() => {
    disposeReasoningScroll();
    disposeStreamScroll();
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

  .error-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
    color: var(--el-color-danger);
    font-size: 12px;
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
