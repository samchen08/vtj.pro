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

    <div v-if="answer" class="answer-content">{{ answer }}</div>

    <template v-else>
      <p v-if="plan" class="intent">{{ plan.intent }}</p>

      <ol v-if="plan?.steps?.length" class="plan-steps">
        <li v-for="step in plan.steps" :key="step.id">
          {{ step.description }}
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
          <pre v-if="streamText" class="stream-content">{{ streamText }}</pre>
        </el-collapse-item>
      </el-collapse>
    </template>
  </section>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { ElCollapse, ElCollapseItem } from 'element-plus';
  import type { PlanResult } from './types/agent';

  const props = defineProps<{
    plan: PlanResult | null;
    answer: string;
    streamText: string;
    reasoningText: string;
  }>();

  const activeDetails = ref<string[]>([]);
  watch(
    () => props.plan,
    (plan) => {
      activeDetails.value = plan ? [] : ['details'];
    },
    { immediate: true }
  );

  const safetyLabel = computed(() => {
    const labels = { readonly: '只读', write: '会修改', destructive: '高风险' };
    return labels[props.plan?.safety || 'readonly'];
  });
</script>

<style lang="scss" scoped>
  .architect-message {
    margin-bottom: 10px;
  }

  .assistant-head {
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

  .safety {
    margin-left: auto;
    color: var(--el-text-color-secondary);
    font-size: 11px;

    &.write {
      color: var(--el-color-warning);
    }

    &.destructive {
      color: var(--el-color-danger);
    }
  }

  .intent,
  .answer-content {
    margin: 0 0 8px 28px;
    color: var(--el-text-color-primary);
    font-size: 13px;
    line-height: 1.65;
    white-space: pre-wrap;
  }

  .plan-steps {
    margin: 8px 0 10px 47px;
    padding: 0;
    color: var(--el-text-color-regular);
    font-size: 12px;
    line-height: 1.75;
  }

  .details-collapse {
    margin-left: 28px;
    border-top: 0;

    :deep(.el-collapse-item__header) {
      height: 32px;
      border: 0;
      color: var(--el-text-color-secondary);
      font-size: 12px;
    }

    :deep(.el-collapse-item__wrap) {
      border: 0;
    }
  }

  .reasoning-content,
  .stream-content {
    max-height: 260px;
    margin: 0 0 7px;
    padding: 8px 10px;
    overflow: auto;
    border-radius: 4px;
    color: var(--el-text-color-regular);
    background: var(--el-fill-color-light);
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: 11px;
    line-height: 1.5;
    white-space: pre-wrap;
  }
</style>
