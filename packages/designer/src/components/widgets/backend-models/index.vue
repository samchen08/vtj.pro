<template>
  <Panel
    title="后端模型"
    refresh
    :plus="canWrite"
    @refresh="backend?.refresh()"
    @plus="openEditor(true)">
    <div class="v-backend-models" aria-live="polite">
      <p v-if="backend?.loading.value" role="status">正在读取后端模型…</p>
      <div v-else-if="backend?.error.value" role="alert">
        <p>{{ backend.error.value }}</p>
        <ElButton size="small" @click="backend.refresh()">重试</ElButton>
      </div>
      <template v-else-if="draft">
        <p class="v-backend-models__version">
          草稿 v{{ draft.revision }} ·
          {{
            draft.appliedRevision === null
              ? '开发环境尚未同步'
              : `开发已应用 v${draft.appliedRevision}`
          }}
        </p>
        <ElInput
          v-model="keyword"
          size="small"
          clearable
          placeholder="搜索模型"
          aria-label="搜索后端模型" />
        <ElEmpty
          v-if="!models.length"
          description="暂无后端模型"
          :image-size="50">
          <ElButton v-if="canWrite" size="small" @click="openEditor(true)">
            新建模型
          </ElButton>
        </ElEmpty>
        <ElEmpty
          v-else-if="!filtered.length"
          description="没有匹配的模型"
          :image-size="50">
          <ElButton size="small" @click="keyword = ''">清空搜索</ElButton>
        </ElEmpty>
        <button
          v-for="model in filtered"
          v-else
          :key="model.id"
          class="v-backend-models__item"
          type="button"
          @click.stop="openEditor(false, model.id)">
          <strong>{{ model.label }}</strong>
          <span>{{ model.name }} · {{ model.fields.length }} 个字段</span>
        </button>
        <p v-if="!canWrite" class="v-backend-models__version">
          当前服务仅开放只读能力
        </p>
      </template>
      <ElEmpty v-else description="后端读取不可用" :image-size="50" />
    </div>
    <Editor
      v-if="editorVisible"
      v-model="editorVisible"
      :initial-model-id="initialModelId"
      :create-on-open="createOnOpen" />
  </Panel>
</template>
<script lang="ts" setup>
  import { computed, inject, ref } from 'vue';
  import { ElButton, ElEmpty, ElInput } from 'element-plus';
  import { Panel } from '../../shared';
  import { backendModelsKey } from '../../hooks/useBackendModels';
  import Editor from './editor.vue';

  defineOptions({ name: 'BackendModelsWidget' });
  const backend = inject(backendModelsKey);
  const draft = computed(() => backend?.draft.value);
  const models = computed(() => backend?.schema.value?.models || []);
  const canWrite = computed(() =>
    backend?.capabilities.value?.operations.includes('write')
  );
  const keyword = ref('');
  const filtered = computed(() => {
    const value = keyword.value.trim().toLowerCase();
    return value
      ? models.value.filter(
          (item) =>
            item.name.toLowerCase().includes(value) ||
            item.label.toLowerCase().includes(value)
        )
      : models.value;
  });
  const editorVisible = ref(false);
  const initialModelId = ref('');
  const createOnOpen = ref(false);
  const openEditor = (create: boolean, id = '') => {
    createOnOpen.value = create;
    initialModelId.value = id;
    editorVisible.value = true;
  };
</script>
<style lang="scss" scoped>
  .v-backend-models {
    padding: 12px;
    font-size: 12px;
    &__version {
      color: var(--el-text-color-secondary);
    }
    &__item {
      display: block;
      width: 100%;
      margin-top: 8px;
      padding: 9px 10px;
      border: 1px solid var(--el-border-color-lighter);
      border-radius: 4px;
      color: inherit;
      text-align: left;
      background: var(--el-fill-color-blank);
      cursor: pointer;
      &:hover,
      &:focus-visible {
        border-color: var(--el-color-primary);
      }
      span {
        display: block;
        margin-top: 3px;
        color: var(--el-text-color-secondary);
      }
    }
  }
</style>
