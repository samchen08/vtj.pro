<template>
  <ElForm label-position="top" class="v-field-form">
    <div class="v-field-form__section-title">
      <strong>字段身份</strong>
      <span>名称面向页面展示，标识用于接口请求。</span>
    </div>
    <div class="v-field-form__grid">
      <ElFormItem label="显示名称">
        <ElInput v-model="draft.label" />
      </ElFormItem>
      <ElFormItem label="字段标识">
        <ElInput
          v-model="draft.name"
          :disabled="locked"
          placeholder="小写 snake_case" />
      </ElFormItem>
      <ElFormItem label="字段类型">
        <ElSelect
          v-model="draft.type"
          :disabled="locked"
          @change="onTypeChange">
          <ElOption
            v-for="item in types"
            :key="item"
            :label="item"
            :value="item" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="约束">
        <div class="v-field-form__checks">
          <ElCheckbox v-model="draft.required" :disabled="locked">
            创建时必填
          </ElCheckbox>
          <ElCheckbox v-model="draft.nullable" :disabled="locked">
            允许 NULL
          </ElCheckbox>
        </div>
      </ElFormItem>
    </div>
    <div class="v-field-form__section-title">
      <strong>{{
        draft.type === 'reference' ? '关联配置' : '类型配置'
      }}</strong>
      <span>仅显示当前字段类型支持的配置项。</span>
    </div>
    <div class="v-field-form__grid">
      <ElFormItem v-if="draft.type === 'string'" label="最大长度">
        <ElInputNumber
          v-model="draft.maxLength"
          :disabled="locked"
          :min="1"
          :max="16383" />
      </ElFormItem>
      <ElFormItem
        v-if="draft.type === 'string' || draft.type === 'text'"
        label="最小长度">
        <ElInputNumber v-model="draft.minLength" :disabled="locked" :min="0" />
      </ElFormItem>
      <template v-if="draft.type === 'integer'">
        <ElFormItem label="最小值"
          ><ElInputNumber v-model="draft.minimum" :disabled="locked"
        /></ElFormItem>
        <ElFormItem label="最大值"
          ><ElInputNumber v-model="draft.maximum" :disabled="locked"
        /></ElFormItem>
      </template>
      <template v-if="draft.type === 'decimal'">
        <ElFormItem label="精度"
          ><ElInputNumber
            v-model="draft.precision"
            :disabled="locked"
            :min="1"
            :max="65"
        /></ElFormItem>
        <ElFormItem label="小数位"
          ><ElInputNumber
            v-model="draft.scale"
            :disabled="locked"
            :min="0"
            :max="30"
        /></ElFormItem>
        <ElFormItem label="最小值"
          ><ElInput v-model="draft.minimum" :disabled="locked"
        /></ElFormItem>
        <ElFormItem label="最大值"
          ><ElInput v-model="draft.maximum" :disabled="locked"
        /></ElFormItem>
      </template>
      <ElFormItem v-if="draft.type === 'enum'" label="枚举值（每行一个）">
        <ElInput
          v-model="enumText"
          type="textarea"
          :disabled="locked"
          :rows="4" />
      </ElFormItem>
      <ElFormItem v-if="draft.type === 'reference'" label="关联模型">
        <ElSelect v-model="draft.targetModelId" :disabled="locked" filterable>
          <ElOption
            v-for="item in models"
            :key="item.id"
            :label="`${item.label}（${item.name}）`"
            :value="item.id" />
        </ElSelect>
        <small>引用目标记录 ID，可按本字段反向查询；不级联写入。</small>
      </ElFormItem>
      <ElFormItem v-if="draft.type !== 'reference'" label="默认值">
        <ElSelect
          v-model="defaultMode"
          :disabled="locked"
          @change="onDefaultMode">
          <ElOption label="不设置" value="none" />
          <ElOption label="指定值" value="value" />
          <ElOption v-if="draft.nullable" label="NULL" value="null" />
        </ElSelect>
        <ElSelect
          v-if="defaultMode === 'value' && draft.type === 'boolean'"
          v-model="defaultText"
          :disabled="locked">
          <ElOption label="true" value="true" />
          <ElOption label="false" value="false" />
        </ElSelect>
        <ElInput
          v-else-if="defaultMode === 'value'"
          v-model="defaultText"
          :disabled="locked"
          :type="draft.type === 'json' ? 'textarea' : 'text'"
          :placeholder="defaultPlaceholder" />
      </ElFormItem>
    </div>
    <ElAlert
      v-if="locked"
      type="info"
      :closable="false"
      title="字段已应用：仅显示名称可修改，结构配置保持只读。" />
    <ElAlert v-if="error" type="error" :closable="false" :title="error" />
    <div class="v-field-form__actions">
      <ElButton @click="$emit('cancel')">取消</ElButton>
      <ElButton type="primary" @click="submit">完成</ElButton>
    </div>
  </ElForm>
</template>
<script lang="ts" setup>
  import { computed, ref, toRaw } from 'vue';
  import type { BackendFieldSchema, BackendModelSchema } from '@vtj/core';
  import {
    ElAlert,
    ElButton,
    ElCheckbox,
    ElForm,
    ElFormItem,
    ElInput,
    ElInputNumber,
    ElOption,
    ElSelect
  } from 'element-plus';

  const props = defineProps<{
    model: BackendFieldSchema;
    models: BackendModelSchema[];
    locked?: boolean;
  }>();
  const emit = defineEmits<{
    cancel: [];
    submit: [field: BackendFieldSchema];
  }>();
  const types = [
    'string',
    'text',
    'integer',
    'decimal',
    'boolean',
    'date',
    'datetime',
    'enum',
    'json',
    'reference'
  ];
  const draft = ref<any>(structuredClone(toRaw(props.model)));
  const enumText = ref((draft.value.values || []).join('\n'));
  const defaultMode = ref(
    !Object.prototype.hasOwnProperty.call(draft.value, 'default')
      ? 'none'
      : draft.value.default === null
        ? 'null'
        : 'value'
  );
  const defaultText = ref(
    draft.value.default === undefined || draft.value.default === null
      ? ''
      : typeof draft.value.default === 'object'
        ? JSON.stringify(draft.value.default)
        : String(draft.value.default)
  );
  const error = ref('');
  const defaultPlaceholder = computed(() => {
    if (draft.value.type === 'datetime') return '2026-09-29T10:00:00+08:00';
    if (draft.value.type === 'date') return '2026-09-29';
    if (draft.value.type === 'json') return '{"key":"value"}';
    return '';
  });
  const onDefaultMode = () => {
    if (defaultMode.value !== 'value') defaultText.value = '';
  };
  const onTypeChange = () => {
    const common = {
      id: draft.value.id,
      name: draft.value.name,
      label: draft.value.label,
      type: draft.value.type,
      required: draft.value.required,
      nullable: draft.value.nullable
    };
    draft.value = Object.assign(common, defaults[draft.value.type] || {});
    defaultMode.value = 'none';
    defaultText.value = '';
    enumText.value = '';
  };
  const defaults: Record<string, object> = {
    string: { maxLength: 100 },
    decimal: { precision: 10, scale: 2 },
    enum: { values: [] },
    reference: { targetModelId: '' }
  };
  const parseDefault = () => {
    if (defaultMode.value === 'none') return undefined;
    if (defaultMode.value === 'null') return null;
    if (draft.value.type === 'integer') {
      const value = Number(defaultText.value);
      if (!Number.isInteger(value)) throw new Error('整数默认值格式不正确');
      return value;
    }
    if (draft.value.type === 'boolean') return defaultText.value === 'true';
    if (draft.value.type === 'json') return JSON.parse(defaultText.value);
    return defaultText.value;
  };
  const submit = () => {
    error.value = '';
    try {
      if (!draft.value.name || !draft.value.label) {
        throw new Error('请填写显示名称和字段标识');
      }
      if (!/^[a-z][a-z0-9_]{0,47}$/.test(draft.value.name)) {
        throw new Error('字段标识须以小写字母开头，仅含字母、数字和下划线');
      }
      if (draft.value.type === 'enum') {
        draft.value.values = enumText.value
          .split('\n')
          .map((item: string) => item.trim())
          .filter(Boolean);
      }
      if (draft.value.type !== 'reference') {
        const value = parseDefault();
        if (value === undefined) delete draft.value.default;
        else draft.value.default = value;
      }
      emit('submit', structuredClone(toRaw(draft.value)));
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : '字段配置无效';
    }
  };
</script>
<style lang="scss" scoped>
  .v-field-form {
    max-width: 820px;
    padding: 18px;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 6px;
    background: var(--el-fill-color-blank);
    &__section-title {
      display: flex;
      align-items: baseline;
      gap: 10px;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--el-border-color-lighter);
      span {
        color: var(--el-text-color-secondary);
        font-size: 12px;
      }
      &:not(:first-child) {
        margin-top: 8px;
      }
    }
    &__grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 16px;
    }
    &__checks {
      display: flex;
      min-height: 32px;
      align-items: center;
    }
    &__actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 18px;
      padding-top: 14px;
      border-top: 1px solid var(--el-border-color-lighter);
    }
    :deep(.el-textarea__inner) {
      resize: none;
    }
  }
  @media (max-width: 760px) {
    .v-field-form__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
