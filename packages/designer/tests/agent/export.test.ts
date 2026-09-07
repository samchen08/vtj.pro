import { afterEach, expect, it, vi } from 'vitest';
import { exportConversation } from '../../src/components/widgets/agent/utils/export';
import type { ConversationRound } from '../../src/components/widgets/agent/types/agent';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

it('exports all architect attempts and preflight results', () => {
  let exported = '';
  vi.useFakeTimers();
  vi.stubGlobal(
    'Blob',
    class {
      constructor(parts: string[]) {
        exported = parts.join('');
      }
    }
  );
  vi.stubGlobal('URL', {
    createObjectURL: () => 'blob:export',
    revokeObjectURL: vi.fn()
  });
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  const records = [
    { stepId: 'architect_attempt_1', content: 'invalid', error: 'parameters' },
    { stepId: 'architect_preflight', content: '{"needsContext":{}}' },
    { stepId: 'architect_context', content: 'tool docs' }
  ];
  exportConversation('topic', 'model', [
    {
      userMessage: '修改 label',
      architectRecords: records,
      editorResults: [],
      architectStreamText: '{"needsContext":{}}',
      architectError: '预检失败'
    } as unknown as ConversationRound
  ]);
  expect(JSON.parse(exported).rounds[0].architectRecords).toEqual(records);
  vi.runAllTimers();
});
