import { describe, it, expect } from 'vitest';
import { getApprovalRisk } from '../../src/components/widgets/agent/utils/approval';

describe('getApprovalRisk', () => {
  it('工具显式声明的风险等级优先', () => {
    expect(getApprovalRisk('getPage', 'destructive')).toBe('destructive');
    expect(getApprovalRisk('updatePage', 'write')).toBe('write');
    expect(getApprovalRisk('createPage', 'destructive')).toBe('destructive');
  });

  it('get 开头或 refresh 默认免审批', () => {
    expect(getApprovalRisk('getPage')).toBeNull();
    expect(getApprovalRisk('getCurrentFileContent')).toBeNull();
    expect(getApprovalRisk('refresh')).toBeNull();
  });

  it('remove/delete 前缀推断为 destructive', () => {
    expect(getApprovalRisk('removePage')).toBe('destructive');
    expect(getApprovalRisk('deleteBlock')).toBe('destructive');
    expect(getApprovalRisk('RemovePage')).toBe('destructive');
  });

  it('其余写操作推断为 write', () => {
    expect(getApprovalRisk('updatePage')).toBe('write');
    expect(getApprovalRisk('createBlock')).toBe('write');
    expect(getApprovalRisk('applyVue')).toBe('write');
  });

  it('兜底写操作不因大小写误判为只读', () => {
    expect(getApprovalRisk('GetPage')).toBe('write');
  });
});
