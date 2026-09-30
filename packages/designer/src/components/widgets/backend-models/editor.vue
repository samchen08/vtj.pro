<template>
  <XDialog
    ref="dialogRef"
    class="v-model-editor-dialog"
    :model-value="modelValue"
    title="后端模型 · 开发环境"
    width="1120px"
    height="720px"
    :body-padding="false"
    :before-close="beforeClose"
    maximizable
    @update:model-value="emit('update:modelValue', $event)">
    <div class="v-model-editor">
      <aside class="v-model-editor__rail">
        <div class="v-model-editor__rail-heading">
          <div>
            <strong>模型</strong><span>{{ models.length }}</span>
          </div>
          <small>当前应用的开发草稿</small>
        </div>
        <ElInput
          v-model="keyword"
          clearable
          placeholder="搜索名称或标识"
          aria-label="搜索模型" />
        <ElButton type="primary" @click="addModel">新建模型</ElButton>
        <div v-if="filteredModels.length" class="v-model-editor__model-list">
          <button
            v-for="model in filteredModels"
            :key="model.id"
            type="button"
            :class="{ active: model.id === selectedId }"
            :aria-current="model.id === selectedId ? 'true' : undefined"
            @click="selectModel(model.id)">
            <span class="v-model-editor__model-copy">
              <strong>{{ model.label || '未命名模型' }}</strong>
              <span>{{ model.name || '未填写标识' }}</span>
            </span>
            <small>{{ model.fields.length }} 字段</small>
          </button>
        </div>
        <ElEmpty
          v-else
          :image-size="44"
          :description="keyword ? '没有匹配的模型' : '暂无模型'">
          <ElButton v-if="keyword" link type="primary" @click="keyword = ''">
            清空搜索
          </ElButton>
        </ElEmpty>
      </aside>

      <main v-if="current">
        <header class="v-model-editor__header">
          <div class="v-model-editor__identity">
            <div>
              <strong>{{ current.label || '未命名模型' }}</strong>
              <code>{{ current.name || '未填写标识' }}</code>
            </div>
            <span>
              {{ current.fields.length }} 个业务字段 ·
              {{ current.indexes?.length || 0 }} 个索引
            </span>
          </div>
          <div class="v-model-editor__status">
            <ElTag
              :type="backend.dirty.value ? 'warning' : 'success'"
              effect="light">
              {{ backend.dirty.value ? '未保存修改' : '草稿已保存' }}
            </ElTag>
            <ElTag v-if="modelApplied" type="info" effect="plain">
              已应用
            </ElTag>
            <ElButton
              v-if="!modelApplied"
              link
              type="danger"
              @click="removeModel">
              删除模型
            </ElButton>
          </div>
        </header>

        <ElAlert
          v-if="saveConflict"
          type="warning"
          :closable="false"
          title="草稿已被其他会话更新，本地修改尚未保存">
          <ElButton link type="primary" @click="copyLocalDraft">
            复制本地草稿
          </ElButton>
          <ElButton link type="primary" @click="reloadDraft">
            重新加载
          </ElButton>
        </ElAlert>

        <ElTabs v-model="tab" class="v-model-editor__tabs">
          <ElTabPane name="base">
            <template #label>基本信息</template>
            <section class="v-model-editor__panel">
              <div class="v-model-editor__section-heading">
                <div>
                  <h3>模型身份</h3>
                  <p>显示名称可随时修改，模型标识用于 API 与物理映射。</p>
                </div>
              </div>
              <ElForm label-position="top" class="v-model-editor__form">
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
                  <small>以字母开头，仅使用小写字母、数字和下划线。</small>
                </ElFormItem>
                <ElFormItem label="说明" class="v-model-editor__wide-field">
                  <ElInput
                    type="textarea"
                    :rows="4"
                    :model-value="current.description"
                    @update:model-value="patchModel('description', $event)" />
                </ElFormItem>
                <ElAlert
                  v-if="modelApplied"
                  class="v-model-editor__wide-field"
                  type="info"
                  :closable="false"
                  title="模型已应用：标识与物理表不可修改或删除。" />
              </ElForm>
            </section>
          </ElTabPane>

          <ElTabPane name="fields">
            <template #label>
              字段
              <span class="v-model-editor__count">{{
                current.fields.length
              }}</span>
            </template>
            <section class="v-model-editor__panel">
              <template v-if="fieldDraft">
                <div class="v-model-editor__section-heading">
                  <div>
                    <h3>{{ fieldEditorTitle }}</h3>
                    <p>完成后仅更新本地草稿，仍需在底部保存。</p>
                  </div>
                  <ElButton @click="fieldDraft = null">返回字段列表</ElButton>
                </div>
                <FieldForm
                  :model="fieldDraft"
                  :models="models"
                  :locked="fieldLocked"
                  @cancel="fieldDraft = null"
                  @submit="completeField" />
              </template>
              <template v-else>
                <div class="v-model-editor__section-heading">
                  <div>
                    <h3>业务字段</h3>
                    <p>系统自动维护 id、createdAt、updatedAt、version。</p>
                  </div>
                  <ElButton type="primary" @click="addField">
                    添加字段
                  </ElButton>
                </div>
                <ElTable :data="current.fields" empty-text="暂无字段">
                  <ElTableColumn label="字段" min-width="180">
                    <template #default="{ row }">
                      <div class="v-model-editor__field-name">
                        <strong>{{
                          row.label || row.name || '未命名字段'
                        }}</strong>
                        <code>{{ row.name || '未填写标识' }}</code>
                      </div>
                    </template>
                  </ElTableColumn>
                  <ElTableColumn label="类型" width="120">
                    <template #default="{ row }">
                      <ElTag effect="plain" type="info">{{ row.type }}</ElTag>
                    </template>
                  </ElTableColumn>
                  <ElTableColumn label="约束" width="130">
                    <template #default="{ row }">
                      {{ fieldConstraint(row) }}
                    </template>
                  </ElTableColumn>
                  <ElTableColumn label="操作" width="116" align="right">
                    <template #default="{ row }">
                      <ElButton link type="primary" @click="editField(row)">
                        编辑
                      </ElButton>
                      <ElButton
                        v-if="!isAppliedField(row.id)"
                        link
                        type="danger"
                        @click="removeField(row.id)">
                        删除
                      </ElButton>
                    </template>
                  </ElTableColumn>
                </ElTable>
              </template>
            </section>
          </ElTabPane>

          <ElTabPane name="indexes">
            <template #label>
              索引
              <span class="v-model-editor__count">{{
                current.indexes?.length || 0
              }}</span>
            </template>
            <section class="v-model-editor__panel">
              <div class="v-model-editor__section-heading">
                <div>
                  <h3>查询索引</h3>
                  <p>联合索引按字段选择顺序生效；唯一索引由数据库保证。</p>
                </div>
                <ElButton v-if="!modelApplied" type="primary" @click="addIndex">
                  添加索引
                </ElButton>
              </div>
              <ElAlert
                v-if="modelApplied"
                type="info"
                :closable="false"
                title="索引已随开发版本应用，MVP 暂不支持修改已应用索引。" />
              <ElEmpty
                v-if="!current.indexes?.length"
                :image-size="52"
                description="暂无索引" />
              <div
                v-for="(index, position) in current.indexes"
                :key="index.id"
                class="v-model-editor__config-row">
                <span class="v-model-editor__order">{{ position + 1 }}</span>
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
                  @change="commit">
                  唯一
                </ElCheckbox>
                <ElButton
                  v-if="!modelApplied"
                  link
                  type="danger"
                  @click="removeIndex(position)">
                  移除
                </ElButton>
              </div>
            </section>
          </ElTabPane>

          <ElTabPane name="sort">
            <template #label>
              默认排序
              <span class="v-model-editor__count">{{
                current.defaultSort?.length || 0
              }}</span>
            </template>
            <section class="v-model-editor__panel">
              <div class="v-model-editor__section-heading">
                <div>
                  <h3>列表默认排序</h3>
                  <p>仅影响列表查询；相同值自动以主键兜底，不创建索引。</p>
                </div>
                <ElButton type="primary" @click="addSort">添加排序</ElButton>
              </div>
              <ElEmpty
                v-if="!current.defaultSort?.length"
                :image-size="52"
                description="暂无默认排序" />
              <div
                v-for="(sort, position) in current.defaultSort"
                :key="position"
                class="v-model-editor__config-row v-model-editor__config-row--sort">
                <span class="v-model-editor__order">{{ position + 1 }}</span>
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
                <ElButton
                  link
                  :disabled="position === 0"
                  @click="moveSort(position, -1)">
                  上移
                </ElButton>
                <ElButton
                  link
                  :disabled="
                    position === (current.defaultSort?.length || 0) - 1
                  "
                  @click="moveSort(position, 1)">
                  下移
                </ElButton>
                <ElButton link type="danger" @click="removeSort(position)">
                  移除
                </ElButton>
              </div>
            </section>
          </ElTabPane>
        </ElTabs>

        <div
          v-if="diagnostics.length"
          class="v-model-editor__errors"
          role="alert">
          <strong>请修正以下问题</strong>
          <p v-for="item in diagnostics" :key="`${item.path}:${item.code}`">
            {{ item.path }}：{{ item.message }}
          </p>
        </div>
      </main>
      <ElEmpty v-else description="请新建或选择模型" />
    </div>

    <template #footer>
      <div class="v-model-editor__footer">
        <div class="v-model-editor__revision">
          <strong>草稿 v{{ backend.draft.value?.revision ?? 0 }}</strong>
          <span>{{ appliedVersionLabel }}</span>
          <small>保存只更新草稿，同步才会修改开发库。</small>
        </div>
        <div class="v-model-editor__footer-actions">
          <ElButton @click="dialogRef?.cancel()">关闭</ElButton>
          <ElButton
            :loading="backend.saving.value"
            :disabled="!backend.dirty.value"
            type="primary"
            @click="save">
            保存全部修改
          </ElButton>
          <ElButton
            :loading="backend.syncing.value"
            :disabled="backend.dirty.value"
            type="success"
            @click="sync">
            同步开发环境
          </ElButton>
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
  const fieldEditorTitle = computed(() =>
    fieldLocked.value
      ? `编辑字段 · ${
          fieldDraft.value?.label || fieldDraft.value?.name || '未命名字段'
        }`
      : '添加字段'
  );
  const appliedVersionLabel = computed(() => {
    const revision = backend.draft.value?.appliedRevision;
    return revision === null || revision === undefined
      ? '开发环境尚未同步'
      : `开发已应用 v${revision}`;
  });

  const commit = () => {
    if (backend.schema.value)
      backend.updateSchema(structuredClone(toRaw(backend.schema.value)));
  };
  const addModel = () => {
    const model: BackendModelSchema = {
      id: `model_${uid()}`,
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
    fieldDraft.value = null;
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
    const referencedBy = models.value.filter((model) =>
      model.fields.some(
        (field) =>
          field.type === 'reference' &&
          field.targetModelId === current.value?.id
      )
    );
    if (referencedBy.length) {
      return ElMessage.warning(
        `请先移除以下模型中的关联字段：${referencedBy
          .map((item) => item.label || item.name)
          .join('、')}`
      );
    }
    await ElMessageBox.confirm(
      `删除模型“${current.value.label || current.value.name || '未命名模型'}”？此操作仅影响未应用草稿。`,
      '删除模型',
      { confirmButtonText: '删除模型', type: 'warning' }
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
    const duplicate = current.value.fields.some(
      (item) => item.id !== field.id && item.name === field.name
    );
    if (duplicate) return ElMessage.warning('字段标识不能重复');
    const index = current.value.fields.findIndex(
      (item) => item.id === field.id
    );
    if (index < 0) current.value.fields.push(field);
    else current.value.fields[index] = field;
    fieldDraft.value = null;
    commit();
  };
  const removeField = async (id: string) => {
    if (!current.value || isAppliedField(id)) return;
    const dependencies = [
      ...(current.value.indexes || [])
        .filter((item) => item.fields.includes(id))
        .map((item) => `索引 ${item.id}`),
      ...(current.value.defaultSort || [])
        .filter((item) => item.fieldId === id)
        .map(() => '默认排序')
    ];
    if (dependencies.length) {
      return ElMessage.warning(`请先移除字段依赖：${dependencies.join('、')}`);
    }
    const field = current.value.fields.find((item) => item.id === id);
    await ElMessageBox.confirm(
      `删除字段“${field?.label || field?.name}”？此操作仅影响未应用草稿。`,
      '删除字段',
      { confirmButtonText: '删除字段', type: 'warning' }
    );
    current.value.fields = current.value.fields.filter(
      (item) => item.id !== id
    );
    commit();
  };
  const fieldConstraint = (field: BackendFieldSchema) =>
    [field.required ? '必填' : '选填', field.nullable ? '可空' : '非空'].join(
      ' · '
    );
  const addIndex = () => {
    if (!current.value) return;
    current.value.indexes ||= [];
    current.value.indexes.push({ id: uid(), fields: [], unique: false });
    commit();
  };
  const removeIndex = (position: number) => {
    current.value?.indexes?.splice(position, 1);
    commit();
  };
  const addSort = () => {
    const used = new Set(
      current.value?.defaultSort?.map((item) => item.fieldId) || []
    );
    const fieldId = sortableFields.value?.find(
      (item) => !used.has(item.id)
    )?.id;
    if (!fieldId) return ElMessage.warning('没有更多可排序字段');
    current.value!.defaultSort ||= [];
    current.value!.defaultSort.push({ fieldId, direction: 'asc' });
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
      if (
        !plan.changes.length &&
        backend.draft.value?.appliedRevision === plan.revision
      ) {
        return ElMessage.info('开发环境已同步');
      }
      if (plan.changes.length) {
        await ElMessageBox.confirm(
          `${plan.changes.map((item) => item.summary).join('；')}。目标仅为开发环境，不修改生产数据。`,
          '确认同步开发环境',
          { confirmButtonText: '同步开发环境', type: 'warning' }
        );
      }
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
  onBeforeUnmount(() =>
    window.removeEventListener('beforeunload', beforeUnload)
  );
</script>

<style lang="scss" scoped>
  :deep(.v-model-editor-dialog) {
    max-width: calc(100vw - 24px);
    max-height: calc(100vh - 24px);
  }

  .v-model-editor {
    display: grid;
    grid-template-columns: 240px minmax(0, 1fr);
    height: 100%;
    min-height: 0;
    background: var(--el-bg-color);
    &__rail {
      display: flex;
      min-height: 0;
      flex-direction: column;
      gap: 10px;
      padding: 18px 14px;
      overflow: hidden;
      border-right: 1px solid var(--el-border-color-lighter);
      background: var(--el-fill-color-extra-light);
    }
    &__rail-heading {
      padding: 0 2px 4px;
      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      strong {
        font-size: 15px;
      }
      span {
        min-width: 24px;
        padding: 1px 7px;
        border-radius: 10px;
        color: var(--el-text-color-secondary);
        text-align: center;
        background: var(--el-fill-color);
      }
      small {
        display: block;
        margin-top: 4px;
        color: var(--el-text-color-secondary);
      }
    }
    &__model-list {
      display: flex;
      min-height: 0;
      flex: 1;
      flex-direction: column;
      gap: 6px;
      overflow: auto;
      scrollbar-gutter: stable;
      > button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 56px;
        padding: 9px 10px;
        border: 1px solid transparent;
        border-radius: 6px;
        color: inherit;
        text-align: left;
        background: transparent;
        cursor: pointer;
        &:hover,
        &:focus-visible {
          border-color: var(--el-border-color);
          background: var(--el-fill-color-light);
        }
        &.active {
          border-color: var(--el-color-primary-light-5);
          background: var(--el-color-primary-light-9);
          box-shadow: inset 3px 0 var(--el-color-primary);
        }
        > small {
          flex: none;
          color: var(--el-text-color-secondary);
        }
      }
    }
    &__model-copy {
      min-width: 0;
      strong,
      span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span {
        margin-top: 3px;
        color: var(--el-text-color-secondary);
        font-size: 12px;
      }
    }
    > main {
      display: flex;
      min-width: 0;
      min-height: 0;
      flex-direction: column;
      overflow: hidden;
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 74px;
      padding: 12px 22px;
      border-bottom: 1px solid var(--el-border-color-lighter);
    }
    &__identity {
      min-width: 0;
      > div {
        display: flex;
        gap: 10px;
        align-items: baseline;
      }
      strong {
        font-size: 18px;
      }
      code {
        color: var(--el-text-color-secondary);
        font-family: var(--el-font-family);
      }
      > span {
        display: block;
        margin-top: 5px;
        color: var(--el-text-color-secondary);
        font-size: 12px;
      }
    }
    &__status,
    &__footer-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    &__tabs {
      min-height: 0;
      flex: 1;
      :deep(.el-tabs__header) {
        margin: 0;
        padding: 0 22px;
        background: var(--el-bg-color);
      }
      :deep(.el-tabs__nav-wrap::after) {
        height: 1px;
      }
      :deep(.el-tabs__content) {
        height: calc(100% - 40px);
        overflow: auto;
        scrollbar-gutter: stable;
      }
    }
    &__count {
      display: inline-block;
      min-width: 20px;
      margin-left: 4px;
      padding: 0 5px;
      border-radius: 9px;
      color: var(--el-text-color-secondary);
      font-size: 11px;
      line-height: 18px;
      text-align: center;
      background: var(--el-fill-color);
    }
    &__panel {
      padding: 22px;
    }
    &__section-heading {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 18px;
      h3,
      p {
        margin: 0;
      }
      h3 {
        color: var(--el-text-color-primary);
        font-size: 15px;
      }
      p {
        margin-top: 5px;
        color: var(--el-text-color-secondary);
        font-size: 12px;
      }
    }
    &__form {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 18px;
      max-width: 820px;
      padding: 18px;
      border: 1px solid var(--el-border-color-lighter);
      border-radius: 6px;
      background: var(--el-fill-color-blank);
    }
    &__wide-field {
      grid-column: 1 / -1;
    }
    &__field-name {
      strong,
      code {
        display: block;
      }
      code {
        margin-top: 3px;
        color: var(--el-text-color-secondary);
        font-family: var(--el-font-family);
        font-size: 12px;
      }
    }
    &__config-row {
      display: grid;
      grid-template-columns: 28px 180px minmax(240px, 1fr) 76px 44px;
      gap: 10px;
      align-items: center;
      margin-top: 10px;
      padding: 12px;
      border: 1px solid var(--el-border-color-lighter);
      border-radius: 6px;
      background: var(--el-fill-color-blank);
      &--sort {
        grid-template-columns: 28px minmax(220px, 1fr) 110px 44px 44px 44px;
      }
    }
    &__order {
      display: grid;
      width: 24px;
      height: 24px;
      place-items: center;
      border-radius: 50%;
      color: var(--el-text-color-secondary);
      font-size: 12px;
      background: var(--el-fill-color);
    }
    &__errors {
      margin: 0 22px 16px;
      padding: 10px 12px;
      border-left: 3px solid var(--el-color-danger);
      color: var(--el-color-danger);
      background: var(--el-color-danger-light-9);
      font-size: 12px;
      p {
        margin: 4px 0 0;
      }
    }
    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: 20px;
    }
    &__revision {
      display: grid;
      grid-template-columns: auto auto;
      gap: 2px 8px;
      align-items: baseline;
      span,
      small {
        color: var(--el-text-color-secondary);
      }
      small {
        grid-column: 1 / -1;
      }
    }
  }

  :deep(.el-textarea__inner) {
    resize: none;
  }

  @media (max-width: 760px) {
    .v-model-editor {
      display: flex;
      flex-direction: column;
      &__rail {
        max-height: 190px;
        border-right: 0;
        border-bottom: 1px solid var(--el-border-color-lighter);
      }
      &__model-list {
        flex-direction: row;
        overflow-x: auto;
        > button {
          min-width: 180px;
        }
      }
      &__header,
      &__section-heading,
      &__footer {
        align-items: stretch;
        flex-direction: column;
      }
      &__form,
      &__config-row,
      &__config-row--sort {
        grid-template-columns: 1fr;
      }
      &__wide-field {
        grid-column: auto;
      }
    }
  }
</style>
