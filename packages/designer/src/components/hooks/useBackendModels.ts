import { ref, shallowRef, watch, onScopeDispose, type InjectionKey } from 'vue';
import type { Service, BackendDraftView } from '@vtj/core';

/** State belongs to one Apps region, never to the global widget manager. */
export function useBackendModels(
  getService: () => Service,
  getProjectId: () => string | undefined
) {
  const visible = ref(false);
  const loading = ref(false);
  const error = ref('');
  const draft = shallowRef<BackendDraftView | null>(null);
  let requestId = 0;

  const refresh = async () => {
    const current = ++requestId;
    const service = getService();
    const projectId = getProjectId();
    loading.value = false;
    error.value = '';
    draft.value = null;
    if (!projectId || !service.getBackendCapabilities) return;
    loading.value = true;
    try {
      const capabilities = await service.getBackendCapabilities(projectId);
      if (current !== requestId) return;
      if (!capabilities.operations.includes('read')) {
        visible.value = false;
        return;
      }
      visible.value = true;
      if (!capabilities.protocolVersions.includes('1.0')) {
        throw new Error('当前服务不支持后端协议 1.0');
      }
      if (!service.getBackendDraft) {
        throw new Error('后端服务未实现草稿读取');
      }
      const result = await service.getBackendDraft(projectId);
      if (current !== requestId) return;
      if (result.schema.dslVersion !== '1.0') {
        throw new Error('无法读取此版本的后端协议');
      }
      draft.value = result;
    } catch (cause) {
      if (current !== requestId) return;
      visible.value = true;
      error.value = cause instanceof Error ? cause.message : '后端模型读取失败';
    } finally {
      if (current === requestId) loading.value = false;
    }
  };

  watch(
    [getService, getProjectId],
    () => {
      visible.value = false;
      void refresh();
    },
    { immediate: true, flush: 'sync' }
  );
  onScopeDispose(() => {
    ++requestId;
  });
  return { visible, loading, error, draft, refresh };
}

export const backendModelsKey: InjectionKey<
  ReturnType<typeof useBackendModels>
> = Symbol('backendModels');
