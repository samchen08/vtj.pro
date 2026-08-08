import { describe, expect, it } from 'vitest';
import { effect } from 'vue';
import {
  createEditorTurn,
  getApprovalRisk
} from '../src/components/widgets/agent/utils/approval';

describe('getApprovalRisk', () => {
  it('separates read, write and destructive tools', () => {
    expect(getApprovalRisk('getCurrentFile')).toBeNull();
    expect(getApprovalRisk('refresh')).toBeNull();
    expect(getApprovalRisk('updateBlock')).toBe('write');
    expect(getApprovalRisk('removePage')).toBe('destructive');
  });

  it('keeps approval status reactive', () => {
    const turn = createEditorTurn(0);
    let renderedStatus = '';
    effect(() => {
      renderedStatus = turn.approval?.status || '';
    });

    turn.approval = {
      id: 'approval_1',
      action: 'removePage',
      risk: 'destructive',
      status: 'pending'
    };
    expect(renderedStatus).toBe('pending');

    turn.approval.status = 'approved';
    expect(renderedStatus).toBe('approved');
  });
});
