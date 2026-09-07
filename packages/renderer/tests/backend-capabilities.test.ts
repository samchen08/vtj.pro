import { expect, test, vi } from 'vitest';
import { BaseService } from '../src/services/base';

test('backend reading is opt-in and does not call the file service', async () => {
  const send = vi.fn();
  const service = new BaseService({ send } as any);
  expect(await service.getBackendCapabilities('legacy')).toEqual({
    protocolVersions: [],
    operations: []
  });
  expect(send).not.toHaveBeenCalled();
});
