import { ref } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import { useReplayChat } from '../src/components/widgets/agent/composables/useReplayChat';
import type { ConversationRound } from '../src/components/widgets/agent/types/agent';

describe('useReplayChat', () => {
  it('clears the previous conversation before loading an empty topic', async () => {
    const rounds = ref([{ id: 'old' }] as ConversationRound[]);
    const statusText = ref('');
    const statusType = ref<'info' | 'warning' | 'success' | 'danger'>('info');
    const { loadChatHistory } = useReplayChat(
      { getChats: vi.fn(async () => []), statusText, statusType },
      rounds
    );

    await loadChatHistory('empty-topic');

    expect(rounds.value).toEqual([]);
    expect(statusType.value).toBe('warning');
  });

  it('restores tool parameters, result metadata and approval', async () => {
    const rounds = ref<ConversationRound[]>([]);
    const statusText = ref('');
    const statusType = ref<'info' | 'warning' | 'success' | 'danger'>('info');
    const chats = [
      {
        id: 'architect',
        agentRole: 'architect',
        prompt: '创建页面',
        content: '{"intent":"创建页面","steps":[]}',
        reasoning: ''
      },
      {
        id: 'editor',
        agentRole: 'editor',
        stepId: 'step_1',
        attempt: 1,
        prompt: '步骤 step_1: 更新页面\n类型: tool_call',
        content:
          '```json\n{"action":"setDataSources","parameters":[{"name":"users"}]}\n```',
        reasoning: '分析',
        status: 'Success',
        toolCallId: 'step_1_setDataSources',
        toolContent: JSON.stringify({
          action: 'setDataSources',
          parameters: [{ name: 'users' }],
          result: true,
          success: true,
          duration: 12,
          approval: {
            id: 'approval_1',
            action: 'setDataSources',
            risk: 'write',
            status: 'approved'
          }
        })
      }
    ];
    const { loadChatHistory } = useReplayChat(
      { getChats: vi.fn(async () => chats) as any, statusText, statusType },
      rounds
    );

    await loadChatHistory('topic');

    const turn = rounds.value[0].editorResults[0].turns[0];
    expect(turn.toolParams).toEqual([{ name: 'users' }]);
    expect(turn.toolResult).toMatchObject({ success: true, duration: 12 });
    expect(turn.approval?.status).toBe('approved');
  });

  it('uses the latest step and summary attempts after retry', async () => {
    const rounds = ref<ConversationRound[]>([]);
    const statusText = ref('');
    const statusType = ref<'info' | 'warning' | 'success' | 'danger'>('info');
    const chats = [
      {
        id: 'architect',
        agentRole: 'architect',
        prompt: '创建页面',
        content:
          '{"intent":"创建页面","safety":"write","steps":[{"id":"step_1","type":"text","description":"生成代码"}]}',
        reasoning: ''
      },
      {
        id: 'failed-step',
        agentRole: 'editor',
        stepId: 'step_1',
        attempt: 1,
        prompt: '步骤 step_1: 生成代码\n类型: text',
        content: '',
        reasoning: '',
        status: 'Error',
        message: '请求失败'
      },
      {
        id: 'retried-step',
        agentRole: 'editor',
        stepId: 'step_1',
        attempt: 2,
        prompt: '步骤 step_1: 生成代码\n类型: text',
        content: '生成成功',
        reasoning: '',
        status: 'Success'
      },
      {
        id: 'failed-summary',
        agentRole: 'editor',
        stepId: 'summary',
        attempt: 1,
        content: '',
        reasoning: '',
        status: 'Error',
        message: '总结失败'
      },
      {
        id: 'retried-summary',
        agentRole: 'editor',
        stepId: 'summary',
        attempt: 2,
        content: '最新总结',
        reasoning: '',
        status: 'Success'
      }
    ];
    const { loadChatHistory } = useReplayChat(
      { getChats: vi.fn(async () => chats) as any, statusText, statusType },
      rounds
    );

    await loadChatHistory('topic');

    expect(rounds.value[0].editorResults[0].error).toBeNull();
    expect(rounds.value[0].editorResults[0].turns).toHaveLength(2);
    expect(rounds.value[0].summaryText).toBe('最新总结');
    expect(rounds.value[0].summaryAttempt).toBe(2);
  });
});
