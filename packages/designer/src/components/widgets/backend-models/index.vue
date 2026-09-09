<template>
  <Panel title="后端模型" refresh @refresh="backend?.refresh()">
    <div class="v-backend-models" aria-live="polite">
      <p v-if="backend?.loading.value" role="status">正在读取后端模型…</p>
      <div v-else-if="backend?.error.value" role="alert">
        <p>{{ backend.error.value }}</p>
        <ElButton size="small" @click="backend.refresh()">重试</ElButton>
      </div>
      <template v-else-if="draft">
        <p class="v-backend-models__version">
          草稿版本 {{ draft.revision }} ·
          {{
            draft.appliedRevision === null
              ? '尚未应用'
              : `已应用版本 ${draft.appliedRevision}`
          }}
        </p>
        <p v-if="draft.appliedReleaseId">
          发布标识：{{ draft.appliedReleaseId }}
        </p>
        <ElEmpty
          v-if="!models.length"
          description="暂无后端模型"
          :image-size="50" />
        <template v-else>
          <label>
            模型
            <select v-model="selectedId" aria-label="选择后端模型">
              <option v-for="model in models" :key="model.id" :value="model.id">
                {{ model.label }}（{{ model.name }}）
              </option>
            </select>
          </label>
          <template v-if="selected">
            <h3>{{ selected.label }}</h3>
            <p>{{ selected.name }} · {{ selected.id }}</p>
            <p>开放操作：{{ selected.operations.join('、') || '无' }}</p>
            <h4>字段</h4>
            <p v-if="!selected.fields.length">暂无字段</p>
            <details v-for="field in selected.fields" :key="field.id" open>
              <summary>
                {{ field.label || field.name }} · {{ field.type }}
              </summary>
              <dl>
                <dt>名称 / 标识</dt>
                <dd>{{ field.name }} / {{ field.id }}</dd>
                <dt>必填</dt>
                <dd>{{ field.required ? '是' : '否' }}</dd>
                <dt>允许空值</dt>
                <dd>{{ field.nullable ? '是' : '否' }}</dd>
                <template
                  v-for="[key, value] in fieldOptions(field)"
                  :key="key">
                  <dt>{{ labels[key] || key }}</dt>
                  <dd>{{ display(value) }}</dd>
                </template>
                <template v-if="field.type === 'reference'">
                  <dt>关联模型</dt>
                  <dd>{{ modelName(field.targetModelId) }}</dd>
                </template>
              </dl>
            </details>
            <h4>索引</h4>
            <p v-if="!selected.indexes?.length">暂无索引</p>
            <p v-for="index in selected.indexes" :key="index.id">
              {{ index.id }} · {{ index.unique ? '唯一' : '普通' }} ·
              {{ fieldNames(index.fields) }}
            </p>
            <h4>权限策略</h4>
            <p v-if="!selected.policies.length">未配置，默认拒绝访问</p>
            <details
              v-for="(policy, index) in selected.policies"
              :key="index"
              open>
              <summary>
                {{ policy.role }} ·
                {{ policy.scope === 'owner' ? '本人数据' : '全部数据' }}
              </summary>
              <dl>
                <dt>操作</dt>
                <dd>{{ policy.actions.join('、') }}</dd>
                <dt>可读字段</dt>
                <dd>{{ fieldNames(policy.readFields) }}</dd>
                <dt>可写字段</dt>
                <dd>{{ fieldNames(policy.writeFields) }}</dd>
              </dl>
            </details>
          </template>
        </template>
      </template>
      <ElEmpty v-else description="后端读取不可用" :image-size="50" />
    </div>
  </Panel>
</template>
<script lang="ts" setup>
  import { computed, inject, ref, watch } from 'vue';
  import { ElButton, ElEmpty } from 'element-plus';
  import type { BackendFieldSchema } from '@vtj/core';
  import { Panel } from '../../shared';
  import { backendModelsKey } from '../../hooks/useBackendModels';

  defineOptions({ name: 'BackendModelsWidget' });
  const backend = inject(backendModelsKey);
  const draft = computed(() => backend?.draft.value);
  const models = computed(() => draft.value?.schema.models || []);
  const selectedId = ref('');
  watch(
    models,
    (items) => {
      if (!items.some((item) => item.id === selectedId.value)) {
        selectedId.value = items[0]?.id || '';
      }
    },
    { immediate: true }
  );
  const selected = computed(() =>
    models.value.find((item) => item.id === selectedId.value)
  );
  const modelName = (id: string) =>
    models.value.find((item) => item.id === id)?.label || id;
  const fieldNames = (ids: string[]) =>
    ids
      .map(
        (id) =>
          selected.value?.fields.find((field) => field.id === id)?.name || id
      )
      .join('、') || '无';
  const labels: Record<string, string> = {
    default: '默认值',
    minLength: '最小长度',
    maxLength: '最大长度',
    minimum: '最小值',
    maximum: '最大值',
    precision: '精度',
    scale: '小数位',
    values: '枚举值'
  };
  const fieldOptions = (field: BackendFieldSchema) =>
    Object.entries(field).filter(([key]) =>
      Object.prototype.hasOwnProperty.call(labels, key)
    );
  const display = (value: unknown) => JSON.stringify(value);
</script>
<style lang="scss" scoped>
  .v-backend-models {
    padding: 12px;
    overflow-wrap: anywhere;
    font-size: 12px;
    select {
      width: 100%;
      margin-top: 6px;
      padding: 6px;
    }
    details {
      margin: 8px 0;
      border-bottom: 1px solid var(--el-border-color-lighter);
    }
    summary {
      cursor: pointer;
      padding: 6px 0;
    }
    dl {
      display: grid;
      grid-template-columns: 76px minmax(0, 1fr);
      gap: 6px;
    }
    dd {
      margin: 0;
      white-space: pre-wrap;
    }
    dt,
    &__version {
      color: var(--el-text-color-secondary);
    }
  }
</style>
