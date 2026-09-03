import { describe, expect, it } from 'vitest';
import { TOOL_CONFIGS } from '../src/managers/built-in/tools';

describe('getPageTreeValidation', () => {
  const tool = TOOL_CONFIGS.find(
    (item) => item.name === 'getPageTreeValidation'
  )!;

  it('fails when an expected child is not mounted under the parent', async () => {
    const handler = tool.createHandler!({
      project: {
        getPage: () => ({ children: [{ id: 'dashboard' }] })
      }
    } as any);

    await expect(handler('layout', ['dashboard'])).resolves.toBe(true);
    await expect(handler('layout', ['missing'])).rejects.toThrow(
      '页面树验证失败'
    );
  });
});
