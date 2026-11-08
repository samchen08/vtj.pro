import { beforeEach, describe, expect, test, vi } from 'vitest';
import { clearLoaderCache, createLoader } from '../src/render/loader';

describe('createLoader 区块别名', () => {
  beforeEach(() => {
    clearLoaderCache();
  });

  test('不污染 getDsl 返回的共享 DSL 对象', async () => {
    const shared = {
      id: 'shared-block',
      name: '原始名称',
      nodes: [{ id: 'n1', name: 'div' }]
    } as any;
    const getDsl = vi.fn(async () => shared);
    const loader = createLoader({
      getDsl,
      getDslByUrl: vi.fn(),
      options: {}
    });

    const aliasA = loader('node-a_0', 'AliasA', {
      type: 'Schema',
      id: 'shared-block'
    }) as any;
    const aliasB = loader('node-b_0', 'AliasB', {
      type: 'Schema',
      id: 'shared-block'
    }) as any;

    const compA = await aliasA.__asyncLoader();
    const compB = await aliasB.__asyncLoader();

    // 共享对象保持原样，两个别名各自拿到正确的组件名
    expect(shared.name).toBe('原始名称');
    expect(compA.name).toBe('AliasA');
    expect(compB.name).toBe('AliasB');
    expect(getDsl).toHaveBeenCalledOnce();
  });
});
