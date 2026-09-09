import { describe, expect, it, vi } from 'vitest';
import { effectScope, ref, nextTick } from 'vue';
import type { BackendDraftView, Service } from '@vtj/core';
import { useBackendModels } from '../src/components/hooks/useBackendModels';

const draft = (revision: number): BackendDraftView => ({
  schema: { dslVersion: '1.0', models: [] },
  revision,
  appliedRevision: null,
  appliedReleaseId: null
});
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
function setup(service: Partial<Service>) {
  const projectId = ref('a');
  const scope = effectScope();
  const state = scope.run(() =>
    useBackendModels(
      () => service as Service,
      () => projectId.value
    )
  )!;
  return { state, projectId, stop: () => scope.stop() };
}
const capabilities = () =>
  Promise.resolve({ protocolVersions: ['1.0'], operations: ['read' as const] });
const flush = async () => {
  await nextTick();
  await Promise.resolve();
  await nextTick();
};

describe('backend read capability', () => {
  it('does not apply draft responses after disposal', async () => {
    const pending = deferred<BackendDraftView>();
    const { state, stop } = setup({
      getBackendCapabilities: capabilities,
      getBackendDraft: () => pending.promise
    });
    await flush();
    stop();
    pending.resolve(draft(9));
    await flush();
    expect(state.draft.value).toBeNull();
  });
  it('rejects unsupported protocol versions before requesting a draft', async () => {
    const read = vi.fn();
    const { state, stop } = setup({
      getBackendCapabilities: async () => ({
        protocolVersions: ['2.0'],
        operations: ['read']
      }),
      getBackendDraft: read
    });
    await flush();
    expect(state.error.value).toContain('不支持');
    expect(read).not.toHaveBeenCalled();
    stop();
  });

  it('keeps legacy services unavailable without making requests', async () => {
    const { state, stop } = setup({});
    await flush();
    expect(state.visible.value).toBe(false);
    expect(state.draft.value).toBeNull();
    stop();
  });
  it('does not read when capability is absent', async () => {
    const read = vi.fn();
    const { state, stop } = setup({
      getBackendCapabilities: async () => ({
        protocolVersions: ['1.0'],
        operations: []
      }),
      getBackendDraft: read
    });
    await flush();
    expect(state.visible.value).toBe(false);
    expect(read).not.toHaveBeenCalled();
    stop();
  });
  it('loads a draft without mutating the service result', async () => {
    const source = draft(2);
    const read = vi.fn(async () => source);
    const { state, stop } = setup({
      getBackendCapabilities: capabilities,
      getBackendDraft: read
    });
    await flush();
    expect(read).toHaveBeenCalledWith('a');
    expect(state.visible.value).toBe(true);
    expect(state.draft.value).toBe(source);
    expect(source).toEqual(draft(2));
    stop();
  });
  it('exposes failures and supports retry', async () => {
    const read = vi
      .fn()
      .mockRejectedValueOnce(new Error('没有读取权限'))
      .mockResolvedValue(draft(3));
    const { state, stop } = setup({
      getBackendCapabilities: capabilities,
      getBackendDraft: read
    });
    await flush();
    expect(state.error.value).toBe('没有读取权限');
    expect(state.visible.value).toBe(true);
    await state.refresh();
    expect(state.error.value).toBe('');
    expect(state.draft.value?.revision).toBe(3);
    stop();
  });
  it('reports missing implementations', async () => {
    const { state, stop } = setup({ getBackendCapabilities: capabilities });
    await flush();
    expect(state.error.value).toContain('未实现');
    stop();
  });
  it('ignores late draft responses after project changes', async () => {
    const first = deferred<BackendDraftView>();
    const { state, projectId, stop } = setup({
      getBackendCapabilities: capabilities,
      getBackendDraft: (id) =>
        id === 'a' ? first.promise : Promise.resolve(draft(2))
    });
    await flush();
    projectId.value = 'b';
    await flush();
    first.resolve(draft(1));
    await flush();
    expect(state.draft.value?.revision).toBe(2);
    stop();
  });
  it('ignores late capability responses and disposal', async () => {
    const first = deferred<Awaited<ReturnType<typeof capabilities>>>();
    const read = vi.fn(async () => draft(1));
    const { state, projectId, stop } = setup({
      getBackendCapabilities: (id) =>
        id === 'a' ? first.promise : capabilities(),
      getBackendDraft: read
    });
    projectId.value = 'b';
    await flush();
    stop();
    first.resolve(await capabilities());
    await flush();
    expect(read).toHaveBeenCalledTimes(1);
    expect(read).toHaveBeenCalledWith('b');
    expect(state.draft.value?.revision).toBe(1);
  });
});
