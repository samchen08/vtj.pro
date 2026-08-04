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
              <!-- {{ turn.toolResult.success ? '完成' : '失败' }}
              <template v-if="turn.toolResult.duration">
                · {{ turn.toolResult.duration }}ms
              </template> -->
            </span>
            <span
              v-else-if="turn.approval?.status === 'pending'"
              class="pending">
              待批准
            </span>
            <span v-if="isCodeTurn(turn)" class="turn-actions">
              <XAction
                mode="icon"
                size="small"
                type="primary"
                :icon="View"
                tooltip="查看生成内容"
                :disabled="!hasArtifact(turn)"
                @click.stop="
                  $emit('view', turn.vue!, 'vue', turn.dsl)
                "></XAction>
              <XAction
                mode="icon"
                size="small"
                type="primary"
                :icon="Download"
                tooltip="应用到页面"
                :disabled="!hasArtifact(turn)"
                @click.stop="$emit('apply', turn.dsl!)"></XAction>
            </span>
          </div>
        </template>

        <div class="turn-details">
          <details
            v-if="turn.reasoning"
            :key="`reasoning-${detailsCommand}`"
            :open="
              detailsCommand ? detailsCommand > 0 : !step.done && !step.error
            ">
            <summary>深度思考</summary>
            <pre ref="turnContentRefs">{{ turn.reasoning }}</pre>
          </details>

          <details
            v-if="turn.content"
            :key="`output-${detailsCommand}`"
            :open="
              detailsCommand ? detailsCommand > 0 : !step.done && !step.error
            ">
            <summary>输出</summary>
            <div ref="turnContentRefs">
              <StreamMarkdown
                :content="turn.content"
                :code="code"
                @click="(...args) => $emit('view', ...args)"></StreamMarkdown>
            </div>
          </details>

          <div v-if="turn.toolParams" class="tool-data">
            <span>工具参数</span>
            <pre>{{ JSON.stringify(turn.toolParams, null, 2) }}</pre>
          </div>

          <div v-if="turn.toolResult" class="tool-data">
            <span>执行结果</span>
            <pre>{{
              formatMarkdownContent(
                turn.toolResult.result ?? turn.toolResult.error
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
  import { computed, ref, watch, nextTick, onUnmounted } from 'vue';
  import { ElButton, ElCollapse, ElCollapseItem } from 'element-plus';
  import { View, Download } from '@vtj/icons';
  import { XAction } from '@vtj/ui';
  import type { EditorStepResult, EditorTurn } from './types/agent';
  import StreamMarkdown from './stream-markdown.vue';
  import { formatMarkdownContent } from './utils/markdown';

  const props = defineProps<{
    step: EditorStepResult;
    code: boolean;
    detailsCommand: number;
  }>();

  defineEmits<{
    resolveApproval: [id: string, approved: boolean];
    view: [source: string, language: string, dsl?: Record<string, any>];
    apply: [dsl: Record<string, any>];
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
    () =>
      [
        props.step.done,
        props.step.error,
        props.step.turns.length,
        props.detailsCommand
      ] as const,
    ([done, error, turnCount, command]) => {
      activeTurns.value = command
        ? command > 0
          ? Array.from({ length: turnCount }, (_, index) => index)
          : []
        : done || error || !turnCount
          ? []
          : [turnCount - 1];
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
    if (turn.type === 'vue_code' || turn.type === 'diff') return '✓ 已应用';
    if (!turn.toolResult) return '✓ 已批准，正在执行…';
    return turn.toolResult.success ? '✓ 已执行' : '! 已批准，但执行失败';
  }

  const isCodeTurn = (turn: EditorTurn) =>
    turn.type === 'vue_code' || turn.type === 'diff';
  const hasArtifact = (turn: EditorTurn) =>
    !!turn.vue && !!turn.dsl && turn.approval?.status !== 'pending';

  // ── 流式内容自动滚到底部 ──
  const turnContentRefs = ref<HTMLElement[]>([]);
  let scrollFrame = 0;
  watch(
    () => props.step.turns.map((t) => [t.reasoning, t.content]),
    () => {
      cancelAnimationFrame(scrollFrame);
      nextTick(() => {
        scrollFrame = requestAnimationFrame(() => {
          turnContentRefs.value.forEach((el) => {
            if (el) el.scrollTop = el.scrollHeight;
          });
        });
      });
    },
    { deep: true, flush: 'post' }
  );
  onUnmounted(() => cancelAnimationFrame(scrollFrame));
</script>

<style lang="scss" scoped>
  .editor-step {
    position: relative;
    margin: 0 0 8px 10px;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: var(--el-border-radius-base);
    background: var(--el-bg-color);

    &::before {
      content: '';
      position: absolute;
      top: 16px;
      left: -15px;
      width: 8px;
      height: 8px;
      box-shadow: 0 0 0 3px var(--el-bg-color);
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
    min-height: 40px;
    padding: 6px 9px;
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
    border-radius: 50%;
    background: var(--el-color-primary-light-9);
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

  .step-status {
    padding: 1px 6px;
    border-radius: 8px;
    background: var(--el-fill-color-light);
    white-space: nowrap;
  }

  .error-block {
    margin: 0 9px 9px;
    padding: 7px 9px;
    border-radius: var(--el-border-radius-base);
    color: var(--el-color-danger);
    background: var(--el-color-danger-light-9);
    font-size: 11px;
    line-height: 1.5;
  }

  .turn-list {
    margin: 0 7px;
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
    height: 30px;

    code {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .turn-kind {
    padding: 1px 5px;
    border-radius: 8px;
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-9);
    height: 24px;
    line-height: 24px;
  }

  .turn-spacer {
    flex: 1;
  }

  .turn-details {
    padding: 5px;
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
      border: 1px solid var(--el-border-color-lighter);
      border-radius: var(--el-border-radius-base);
      color: var(--el-text-color-regular);
      background: var(--el-fill-color-lighter);
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 11px;
      line-height: 1.45;
      white-space: pre-wrap;
    }

    .v-agent-stream-markdown {
      max-height: 240px;
      margin-top: 5px;
      padding: 8px;
      overflow: auto;
      border: 1px solid var(--el-border-color-lighter);
      border-radius: var(--el-border-radius-base);
      background: var(--el-fill-color-lighter);
    }
  }

  .tool-data > span {
    color: var(--el-text-color-secondary);
  }

  .approval-box {
    margin-top: 9px;
    padding: 10px;
    border: 1px solid var(--el-color-warning-light-5);
    border-radius: var(--el-border-radius-base);
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

  .turn-actions {
    display: inline-flex;
    gap: 4px;
  }
</style>
