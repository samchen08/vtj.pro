<template>
  <XDialog
    ref="dialogRef"
    :model-value="modelValue"
    title="后端模型 · 开发环境"
    width="1000px"
    height="640px"
    :before-close="beforeClose"
    maximizable
    @update:model-value="emit('update:modelValue', $event)">
    <div class="v-model-editor">
      <aside>
        <ElInput v-model="keyword" clearable placeholder="搜索模型" />
        <ElButton type="primary" plain @click="addModel">+ 新建模型</ElButton>
        <button
          v-for="model in filteredModels"
          :key="model.id"
          type="button"
          :class="{ active: model.id === selectedId }"
          @click="selectModel(model.id)">
          <strong>{{ model.label || '未命名模型' }}</strong>
          <span>{{ model.name || '未填写标识' }}</span>
        </button>
      </aside>
      <main v-if="current">
        <header>
          <div>
            <strong>{{ current.label || '未命名模型' }}</strong>
            <span>（{{ current.name || '未填写标识' }}）</span>
          </div>
          <div class="v-model-editor__status">
            <ElTag :type="backend.dirty.value ? 'warning' : 'success'">
              {{ backend.dirty.value ? '未保存修改' : '草稿已保存' }}
            </ElTag>
            <ElButton
              link
              type="danger"
              :disabled="modelApplied"
              @click="removeModel"
              >删除模型</ElButton
            >
          </div>
        </header>
        <ElAlert
          v-if="saveConflict"
          type="warning"
          :closable="false"
          title="草稿已被其他会话更新，本地修改尚未保存">
          <ElButton link type="primary" @click="copyLocalDraft"
            >复制本地草稿</ElButton
          >
          <ElButton link type="primary" @click="reloadDraft"
            >重新加载</ElButton
          >
        </ElAlert>
        <ElTabs v-model="tab" class="v-model-editor__tabs">
          <ElTabPane label="基本信息" name="base">
            <ElForm label-position="top">
              <ElFormItem label="显示名称">
                <ElInput
                  :model-value="current.label"
                  @update:model-value="patchModel('label', $event)" />
              </ElFormItem>
              <ElFormItem label="模型标识">
                <ElInput
                  :disabled="modelApplied"
                  :model-value="current.name"
                  placeholder="小写 snake_case"
                  @update:model-value="patchModel('name', $event)" />
              </ElFormItem>
              <ElFormItem label="说明">
                <ElInput
                  type="textarea"
                  :rows="4"
                  :model-value="current.description"
                  @update:model-value="patchModel('description', $event)" />
              </ElFormItem>
              <ElAlert
                v-if="modelApplied"
                type="info"
                :closable="false"
                title="已应用模型的标识不可修改；MVP 不自动删除物理表。" />
            </ElForm>
          </ElTabPane>
          <ElTabPane label="字段" name="fields">
            <FieldForm
              v-if="fieldDraft"
              :model="fieldDraft"
              :models="models"
              :locked="fieldLocked"
              @cancel="fieldDraft = null"
              @submit="completeField" />
            <template v-else>
              <ElButton type="primary" plain @click="addField"
                >+ 添加字段</ElButton
              >
              <ElTable :data="current.fields" empty-text="暂无字段">
                <ElTableColumn prop="label" label="字段" />
                <ElTableColumn prop="name" label="标识" />
                <ElTableColumn prop="type" label="类型" width="100" />
                <ElTableColumn label="约束" width="120">
                  <template #default="{ row }">{{
                    fieldConstraint(row)
                  }}</template>
                </ElTableColumn>
                <ElTableColumn label="操作" width="130">
                  <template #default="{ row }">
                    <ElButton link type="primary" @click="editField(row)"
                      >编辑</ElButton
                    >
                    <ElButton
                      link
                      type="danger"
                      :disabled="isAppliedField(row.id)"
                      @click="removeField(row.id)"
                      >删除</ElButton
                    >
                  </template>
                </ElTableColumn>
              </ElTable>
              <ElAlert
                type="info"
                :closable="false"
                title="系统字段：id、createdAt、updatedAt、version" />
            </template>
          </ElTabPane>
          <ElTabPane label="索引" name="indexes">
            <ElAlert
              v-if="modelApplied"
              type="info"
              :closable="false"
              title="MVP 不支持为已应用模型新增或修改索引。" />
            <div
              v-for="(index, position) in current.indexes"
              :key="index.id"
              class="v-model-editor__row">
              <ElInput
                v-model="index.id"
                :disabled="modelApplied"
                placeholder="索引标识"
                @change="commit" />
              <ElSelect
                v-model="index.fields"
                multiple
                :disabled="modelApplied"
                placeholder="按顺序选择字段"
                @change="commit">
                <ElOption
                  v-for="field in indexableFields"
                  :key="field.id"
                  :label="field.label || field.name"
                  :value="field.id" />
              </ElSelect>
              <ElCheckbox
                v-model="index.unique"
                :disabled="modelApplied"
                @change="commit"
                >唯一</ElCheckbox
              >
              <ElButton
                link
                type="danger"
                :disabled="modelApplied"
                @click="removeIndex(position)"
                >移除</ElButton
              >
            </div>
            <ElButton :disabled="modelApplied" @click="addIndex"
              >+ 添加索引</ElButton
            >
          </ElTabPane>
          <ElTabPane label="默认排序" name="sort">
            <p class="hint">
              仅影响列表查询；相同排序值自动用主键兜底，不创建索引。
            </p>
            <div
              v-for="(sort, position) in current.defaultSort"
              :key="position"
              class="v-model-editor__row v-model-editor__row--sort">
              <ElSelect v-model="sort.fieldId" @change="commit">
                <ElOption
                  v-for="field in sortableFields"
                  :key="field.id"
                  :label="field.label || field.name"
                  :value="field.id" />
              </ElSelect>
              <ElSelect v-model="sort.direction" @change="commit">
                <ElOption label="升序" value="asc" />
                <ElOption label="降序" value="desc" />
              </ElSelect>
              <ElButton link @click="moveSort(position, -1)">上移</ElButton>
              <ElButton link @click="moveSort(position, 1)">下移</ElButton>
              <ElButton link type="danger" @click="removeSort(position)"
                >移除</ElButton
              >
            </div>
            <ElButton @click="addSort">+ 添加排序</ElButton>
          </ElTabPane>
        </ElTabs>
        <div v-if="diagnostics.length" class="errors" role="alert">
          <p v-for="item in diagnostics" :key="`${item.path}:${item.code}`">
            {{ item.path }}：{{ item.message }}
          </p>
        </div>
      </main>
      <ElEmpty v-else description="请新建或选择模型" />
    </div>
    <template #footer>
      <div class="v-model-editor__footer">
        <span>
          草稿 v{{ backend.draft.value?.revision ?? 0 }} · 开发已应用 v{{
            backend.draft.value?.appliedRevision ?? '—'
          }}
        </span>
        <div>
          <ElButton @click="dialogRef?.cancel()">关闭</ElButton>
          <ElButton
            :loading="backend.saving.value"
            :disabled="!backend.dirty.value"
            type="primary"
            @click="save"
            >保存草稿</ElButton
          >
          <ElButton
            :loading="backend.syncing.value"
            :disabled="backend.dirty.value"
            type="success"
            @click="sync"
            >同步开发环境</ElButton
          >
        </div>
      </div>
    </template>
  </XDialog>
</template>
<script lang="ts" setup>
  import {
    computed,
    inject,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    toRaw
  } from 'vue';
  import type { BackendFieldSchema, BackendModelSchema } from '@vtj/core';
  import { uid } from '@vtj/utils';
  import { XDialog } from '@vtj/ui';
  import {
    ElAlert,
    ElButton,
    ElCheckbox,
    ElEmpty,
    ElForm,
    ElFormItem,
    ElInput,
    ElMessage,
    ElMessageBox,
    ElOption,
    ElSelect,
    ElTable,
    ElTableColumn,
    ElTabPane,
    ElTabs,
    ElTag
  } from 'element-plus';
  import { backendModelsKey } from '../../hooks/useBackendModels';
  import FieldForm from './field-form.vue';

  const props = defineProps<{
    modelValue: boolean;
    initialModelId?: string;
    createOnOpen?: boolean;
  }>();
  const emit = defineEmits<{
    'update:modelValue': [value: boolean];
  }>();
  const backend = inject(backendModelsKey)!;
  const dialogRef = ref();
  const keyword = ref('');
  const selectedId = ref(props.initialModelId || '');
  const tab = ref('base');
  const fieldDraft = ref<BackendFieldSchema | null>(null);
  const fieldLocked = ref(false);
  const saveConflict = ref(false);
  const models = computed(() => backend.schema.value?.models || []);
  const current = computed(() =>
    models.value.find((item) => item.id === selectedId.value)
  );
  const appliedModel = computed(() =>
    backend.draft.value?.appliedSchema?.models.find(
      (item) => item.id === current.value?.id
    )
  );
  const modelApplied = computed(() => Boolean(appliedModel.value));
  const diagnostics = computed(() => backend.diagnostics.value);
  const filteredModels = computed(() => {
    const value = keyword.value.trim().toLowerCase();
    return value
      ? models.value.filter((item) =>
          `${item.name} ${item.label}`.toLowerCase().includes(value)
        )
      : models.value;
  });
  const indexableFields = computed(() =>
    current.value?.fields.filter(
      (field) => field.type !== 'text' && field.type !== 'json'
    )
  );
  const sortableFields = indexableFields;

  const commit = () => {
    if (backend.schema.value)
      backend.updateSchema(structuredClone(toRaw(backend.schema.value)));
  };
  const addModel = () => {
    const model: BackendModelSchema = {
      id: uid(),
      name: '',
      label: '',
      description: '',
      fields: [],
      indexes: [],
      defaultSort: [],
      operations: ['list', 'get', 'create', 'update', 'delete'],
      policies: []
    };
    backend.schema.value?.models.push(model);
    selectedId.value = model.id;
    tab.value = 'base';
    commit();
  };
  const selectModel = (id: string) => {
    if (fieldDraft.value) return ElMessage.warning('请先完成或取消字段编辑');
    selectedId.value = id;
  };
  const patchModel = (key: string, value: unknown) => {
    if (!current.value) return;
    (current.value as any)[key] = value;
    commit();
  };
  const removeModel = async () => {
    if (!current.value || modelApplied.value) return;
    await ElMessageBox.confirm(
      `删除模型“${current.value.label || current.value.name || '未命名模型'}”？`,
      '删除模型'
    );
    const position = models.value.findIndex(
      (item) => item.id === current.value?.id
    );
    backend.schema.value!.models.splice(position, 1);
    selectedId.value =
      models.value[position]?.id ||
      models.value[models.value.length - 1]?.id ||
      '';
    fieldDraft.value = null;
    commit();
  };
  const isAppliedField = (id: string) =>
    Boolean(appliedModel.value?.fields.some((field) => field.id === id));
  const addField = () => {
    fieldLocked.value = false;
    fieldDraft.value = {
      id: uid(),
      name: '',
      label: '',
      type: 'string',
      maxLength: 100,
      required: false,
      nullable: true
    };
  };
  const editField = (field: BackendFieldSchema) => {
    fieldLocked.value = isAppliedField(field.id);
    fieldDraft.value = structuredClone(toRaw(field));
  };
  const completeField = (field: BackendFieldSchema) => {
    if (!current.value) return;
    const index = current.value.fields.findIndex(
      (item) => item.id === field.id
    );
    if (index < 0) current.value.fields.push(field);
    else current.value.fields[index] = field;
    fieldDraft.value = null;
    commit();
  };
  const removeField = async (id: string) => {
    if (!current.value) return;
    await ElMessageBox.confirm(
      '字段将从未应用草稿中移除，是否继续？',
      '删除字段'
    );
    current.value.fields = current.value.fields.filter(
      (item) => item.id !== id
    );
    commit();
  };
  const fieldConstraint = (field: BackendFieldSchema) =>
    [field.required ? '必填' : '', field.nullable ? '可空' : '非空']
      .filter(Boolean)
      .join(' · ');
  const addIndex = () => {
    current.value?.indexes?.push({ id: uid(), fields: [], unique: false });
    commit();
  };
  const removeIndex = (position: number) => {
    current.value?.indexes?.splice(position, 1);
    commit();
  };
  const addSort = () => {
    const fieldId = sortableFields.value?.[0]?.id;
    if (!fieldId) return ElMessage.warning('没有可排序字段');
    current.value?.defaultSort?.push({ fieldId, direction: 'asc' });
    commit();
  };
  const removeSort = (position: number) => {
    current.value?.defaultSort?.splice(position, 1);
    commit();
  };
  const moveSort = (position: number, offset: number) => {
    const target = position + offset;
    const items = current.value?.defaultSort;
    if (!items || target < 0 || target >= items.length) return;
    [items[position], items[target]] = [items[target], items[position]];
    commit();
  };
  const save = async () => {
    if (fieldDraft.value) return ElMessage.warning('请先完成或取消字段编辑');
    try {
      if (await backend.save())
        ElMessage.success('草稿已保存，尚未同步开发环境');
      saveConflict.value = false;
    } catch (cause) {
      saveConflict.value = JSON.stringify(cause).includes('409');
      ElMessage.error(
        saveConflict.value
          ? '草稿已被其他会话更新，本地修改尚未保存'
          : '草稿保存失败，本地修改尚未保存'
      );
    }
  };
  const copyLocalDraft = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify(backend.schema.value, null, 2)
    );
    ElMessage.success('本地草稿已复制');
  };
  const reloadDraft = async () => {
    await ElMessageBox.confirm('重新加载将放弃本地未保存修改。', '重新加载');
    await backend.refresh();
    saveConflict.value = false;
  };
  const beforeClose = async () => {
    if (!backend.dirty.value) return true;
    return ElMessageBox.confirm('尚有未保存修改，确定放弃并关闭？', '关闭')
      .then(() => true)
      .catch(() => false);
  };
  const beforeUnload = (event: BeforeUnloadEvent) => {
    if (!backend.dirty.value) return;
    event.preventDefault();
    event.returnValue = '';
  };
  const sync = async () => {
    try {
      const plan = await backend.loadPlan();
      if (!plan) return;
      if (plan.diagnostics.some((item) => item.severity === 'error')) {
        return ElMessage.error('变更计划包含阻断项，请先修正模型');
      }
      if (!plan.changes.length) return ElMessage.info('开发环境已同步');
      await ElMessageBox.confirm(
        `${plan.changes.map((item) => item.summary).join('；')}。目标仅为开发环境，不修改生产数据。`,
        '确认同步开发环境'
      );
      const task = await backend.sync();
      if (task?.status === 'succeeded') ElMessage.success('开发环境同步完成');
      else if (task?.error) ElMessage.error(task.error.message);
    } catch {
      ElMessage.warning('暂时无法确认同步结果，请刷新后查看任务');
    }
  };

  if (props.createOnOpen) nextTick(addModel);
  else if (!selectedId.value) selectedId.value = models.value[0]?.id || '';
  onMounted(() => window.addEventListener('beforeunload', beforeUnload));
  onBeforeUnmount(() => window.removeEventListener('beforeunload', beforeUnload));
</script>
<style lang="scss" scoped>
  .v-model-editor {
    display: grid;
    grid-template-columns: 200px minmax(0, 1fr);
    height: 100%;
    min-height: 0;
    > aside {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px;
      overflow: auto;
      border-right: 1px solid var(--el-border-color-lighter);
      > button:not(.el-button) {
        padding: 8px;
        border: 0;
        border-radius: 4px;
        color: inherit;
        text-align: left;
        background: transparent;
        cursor: pointer;
        &.active,
        &:hover {
          background: var(--el-fill-color-light);
        }
        span {
          display: block;
          color: var(--el-text-color-secondary);
        }
      }
    }
    > main {
      display: flex;
      min-width: 0;
      flex-direction: column;
      padding: 12px 16px;
      overflow: auto;
      > header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    &__status {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    &__tabs {
      min-height: 0;
      flex: 1;
    }
    &__row {
      display: grid;
      grid-template-columns: 150px minmax(200px, 1fr) 70px 50px;
      gap: 8px;
      align-items: center;
      margin-bottom: 10px;
      &--sort {
        grid-template-columns: minmax(180px, 1fr) 100px 44px 44px 44px;
      }
    }
    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    &__footer > span,
    .hint {
      color: var(--el-text-color-secondary);
    }
    .errors {
      color: var(--el-color-danger);
      font-size: 12px;
    }
  }
  @media (max-width: 760px) {
    .v-model-editor {
      display: flex;
      flex-direction: column;
      > aside {
        max-height: 150px;
        border-right: 0;
        border-bottom: 1px solid var(--el-border-color-lighter);
      }
      &__row,
      &__row--sort {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
