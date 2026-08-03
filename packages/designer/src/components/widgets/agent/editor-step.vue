<template>
  <section class="editor-step" :class="stepStatus">
    <header class="step-header">
      <span class="step-chevron">›</span>
      <span class="step-index">{{ step.stepIdx + 1 }}</span>
      <span class="step-title">{{ step.step?.description }}</span>
      <span class="step-status">{{ stepStatusLabel }}</span>
    </header>

    <div v-if="step.error" class="error-block">{{ step.error }}</div>

    <el-collapse
      v-if="step.turns?.length"
      v-model="activeTurns"
      class="turn-list">
      <el-collapse-item
        v-for="(turn, tIdx) in step.turns"
        :key="tIdx"
        :name="tIdx">
        <template #title>
          <div class="turn-title">
            <span class="turn-kind">{{ turnTypeLabel(turn.type) }}</span>
            <code v-if="turn.toolAction">{{ turn.toolAction }}</code>
            <span v-else>第 {{ turn.turn + 1 }} 次响应</span>
            <span class="turn-spacer" />
            <span
              v-if="turn.toolResult"
              :class="turn.toolResult.success ? 'success' : 'failure'">
              {{ turn.toolResult.success ? '完成' : '失败' }}
              <template v-if="turn.toolResult.duration">
                · {{ turn.toolResult.duration }}ms</template
              >
            </span>
            <span
              v-else-if="turn.approval?.status === 'pending'"
              class="pending">
              待批准
            </span>
          </div>
        </template>

        <div class="turn-details">
          <details v-if="turn.reasoning" :open="!step.done && !step.error">
            <summary>分析过程</summary>
            <pre>{{ turn.reasoning }}</pre>
          </details>

          <details v-if="turn.content" :open="!step.done && !step.error">
            <summary>AI 输出</summary>
            <pre>{{ turn.content }}</pre>
          </details>

          <div v-if="turn.toolParams" class="tool-data">
            <span>参数</span>
            <pre>{{ JSON.stringify(turn.toolParams, null, 2) }}</pre>
          </div>

          <div v-if="turn.toolResult" class="tool-data">
            <span>结果</span>
            <pre>{{
              JSON.stringify(
                turn.toolResult.result ?? turn.toolResult.error,
                null,
                2
              )
            }}</pre>
          </div>

          <div
            v-if="turn.approval?.status === 'pending'"
            class="approval-box"
            :class="turn.approval.risk">
            <strong>
              {{
                turn.approval.risk === 'destructive'
                  ? '确认高风险操作'
                  : '允许更新当前设计？'
              }}
            </strong>
            <p>
              Agent 请求执行 <code>{{ turn.approval.action }}</code>
            </p>
            <div class="approval-actions">
              <el-button
                size="small"
                type="primary"
                @click="$emit('resolveApproval', turn.approval.id, true)">
                批准
              </el-button>
              <el-button
                size="small"
                @click="$emit('resolveApproval', turn.approval.id, false)">
                拒绝
              </el-button>
            </div>
          </div>

          <div v-else-if="turn.approval" class="approval-result">
            {{ approvalFeedback(turn) }}
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { ElButton, ElCollapse, ElCollapseItem } from 'element-plus';
  import type { EditorStepResult, EditorTurn } from './types/agent';

  const props = defineProps<{
    step: EditorStepResult;
  }>();

  defineEmits<{
    resolveApproval: [id: string, approved: boolean];
  }>();

  const stepStatus = computed(() =>
    props.step.error ? 'failed' : props.step.done ? 'completed' : 'running'
  );

  const stepStatusLabel = computed(() => {
    if (props.step.error) return '失败';
    if (props.step.done) return '完成';
    if (props.step.turns.some((turn) => turn.approval?.status === 'pending'))
      return '待批准';
    return '执行中';
  });

  const activeTurns = ref<number[]>([]);
  watch(
    () => [props.step.done, props.step.error, props.step.turns.length] as const,
    ([done, error, turnCount]) => {
      activeTurns.value = done || error || !turnCount ? [] : [turnCount - 1];
    },
    { immediate: true }
  );

  function turnTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      tool_call: '工具',
      vue_code: 'Vue',
      code: '代码',
      diff: 'Diff',
      text: '回复',
      unknown: '输出'
    };
    return labels[type] || '响应';
  }

  function approvalFeedback(turn: EditorTurn): string {
    if (turn.approval?.status === 'rejected') return '× 已拒绝，操作未执行';
    if (!turn.toolResult) return '✓ 已批准，正在执行…';
    return turn.toolResult.success ? '✓ 已执行' : '! 已批准，但执行失败';
  }
</script>

<style lang="scss" scoped>
  .editor-step {
    position: relative;
    border-bottom: 1px solid var(--el-border-color-lighter);

    &::before {
      content: '';
      position: absolute;
      top: 15px;
      left: -4px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--el-color-warning);
    }

    &.completed::before {
      background: var(--el-color-success);
    }

    &.failed::before {
      background: var(--el-color-danger);
    }
  }

  .step-header {
    display: flex;
    align-items: center;
    gap: 7px;
    min-height: 38px;
    padding: 6px 8px 6px 12px;
    font-size: 12px;
  }

  .step-chevron,
  .step-index,
  .step-status {
    color: var(--el-text-color-secondary);
  }

  .step-index {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    background: var(--el-fill-color-light);
  }

  .step-title {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .running .step-status,
  .pending {
    color: var(--el-color-warning);
  }

  .failed .step-status,
  .failure {
    color: var(--el-color-danger);
  }

  .completed .step-status,
  .success {
    color: var(--el-color-success);
  }

  .turn-list {
    margin-left: 12px;
    border-top: 0;

    :deep(.el-collapse-item__header) {
      min-height: 34px;
      height: auto;
      border-top: 1px solid var(--el-border-color-lighter);
      border-bottom: 0;
      color: var(--el-text-color-regular);
      font-size: 11px;
    }

    :deep(.el-collapse-item__wrap) {
      border-bottom: 0;
    }

    :deep(.el-collapse-item__content) {
      padding-bottom: 10px;
    }
  }

  .turn-title {
    display: flex;
    align-items: center;
    gap: 7px;
    width: 100%;
    min-width: 0;
    padding-right: 8px;

    code {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .turn-kind {
    padding: 1px 5px;
    border-radius: 3px;
    color: var(--el-text-color-secondary);
    background: var(--el-fill-color-light);
  }

  .turn-spacer {
    flex: 1;
  }

  .turn-details {
    padding: 0 8px 0 4px;
    color: var(--el-text-color-regular);
    font-size: 11px;

    details + details,
    .tool-data {
      margin-top: 7px;
    }

    summary {
      cursor: pointer;
      color: var(--el-text-color-secondary);
    }

    pre {
      max-height: 240px;
      margin: 5px 0 0;
      padding: 8px;
      overflow: auto;
      border-radius: 4px;
      color: var(--el-text-color-regular);
      background: var(--el-fill-color-light);
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 11px;
      line-height: 1.45;
      white-space: pre-wrap;
    }
  }

  .tool-data > span {
    color: var(--el-text-color-secondary);
  }

  .approval-box {
    margin-top: 9px;
    padding: 10px;
    border: 1px solid var(--el-color-warning-light-5);
    border-radius: 5px;
    background: var(--el-color-warning-light-9);

    &.destructive {
      border-color: var(--el-color-danger-light-5);
      background: var(--el-color-danger-light-9);
    }

    p {
      margin: 5px 0 9px;
    }
  }

  .approval-actions {
    display: flex;
    gap: 6px;
  }

  .approval-result {
    margin-top: 7px;
    color: var(--el-text-color-secondary);
  }
</style>
