import { ref, shallowRef, watch, onScopeDispose, type InjectionKey } from 'vue';
import type {
  Service,
  BackendCapabilities,
  BackendDraftView,
  BackendPlanView,
  BackendSchema,
  BackendTaskView,
  BackendValidationResult
} from '@vtj/core';

/** State belongs to one Apps region, never to the global widget manager. */
export function useBackendModels(
  getService: () => Service,
  getProjectId: () => string | undefined
) {
  const visible = ref(false);
  const loading = ref(false);
  const error = ref('');
  const draft = shallowRef<BackendDraftView | null>(null);
  const capabilities = shallowRef<BackendCapabilities | null>(null);
  const schema = shallowRef<BackendSchema | null>(null);
  const dirty = ref(false);
  const saving = ref(false);
  const syncing = ref(false);
  const diagnostics = ref<BackendValidationResult['diagnostics']>([]);
  const plan = shallowRef<BackendPlanView | null>(null);
  const task = shallowRef<BackendTaskView | null>(null);
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
      const capability = await service.getBackendCapabilities(projectId);
      if (current !== requestId) return;
      capabilities.value = capability;
      if (!capability.operations.includes('read')) {
        visible.value = false;
        return;
      }
      visible.value = true;
      if (!capability.protocolVersions.includes('1.0')) {
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
      schema.value = structuredClone(result.schema);
      dirty.value = false;
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

  const updateSchema = (value: BackendSchema) => {
    schema.value = value;
    dirty.value = true;
    diagnostics.value = [];
    plan.value = null;
  };

  const save = async () => {
    const service = getService();
    const projectId = getProjectId();
    if (!projectId || !schema.value || !draft.value) return false;
    if (!service.validateBackendDraft || !service.saveBackendDraft) {
      throw new Error('后端服务未实现草稿写入');
    }
    saving.value = true;
    try {
      const validate = service.validateBackendDraft as (
        projectId: string,
        schema: BackendSchema
      ) => Promise<BackendValidationResult>;
      const validation = await validate(
        projectId,
        structuredClone(schema.value) as BackendSchema
      );
      diagnostics.value = validation.diagnostics;
      if (!validation.valid) return false;
      const result = await service.saveBackendDraft(
        projectId,
        validation.normalized,
        draft.value.revision
      );
      draft.value = result;
      schema.value = structuredClone(result.schema);
      dirty.value = false;
      return true;
    } finally {
      saving.value = false;
    }
  };

  const loadPlan = async () => {
    const service = getService();
    const projectId = getProjectId();
    if (!projectId || !draft.value || !service.getBackendPlan) return null;
    plan.value = await service.getBackendPlan(
      projectId,
      draft.value.revision,
      'dev'
    );
    return plan.value;
  };

  const sync = async () => {
    const service = getService();
    const projectId = getProjectId();
    if (!projectId || !draft.value || !service.syncBackendDraft) return null;
    syncing.value = true;
    try {
      task.value = await service.syncBackendDraft(
        projectId,
        draft.value.revision,
        crypto.randomUUID()
      );
      await refresh();
      return task.value;
    } finally {
      syncing.value = false;
    }
  };

  const retry = async () => {
    const service = getService();
    const projectId = getProjectId();
    if (!projectId || !task.value || !service.retryBackendTask) return null;
    task.value = await service.retryBackendTask(projectId, task.value.id);
    await refresh();
    return task.value;
  };

  return {
    visible,
    loading,
    error,
    draft,
    capabilities,
    schema,
    dirty,
    saving,
    syncing,
    diagnostics,
    plan,
    task,
    refresh,
    updateSchema,
    save,
    loadPlan,
    sync,
    retry
  };
}

export const backendModelsKey: InjectionKey<
  ReturnType<typeof useBackendModels>
> = Symbol('backendModels');
