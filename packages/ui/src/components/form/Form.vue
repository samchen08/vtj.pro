<template>
  <ElForm
    ref="formRef"
    class="x-form"
    :inline="props.inline"
    :model="model"
    v-bind="$attrs">
    <slot></slot>
    <XField v-if="props.footer" editor="none" class="x-form__footer" label=" ">
      <template #editor>
        <ElButton v-if="props.submitText" type="primary" @click="submit">
          {{ props.submitText }}
        </ElButton>
        <ElButton v-if="props.resetText" type="default" @click="() => reset()">
          {{ props.resetText }}
        </ElButton>
      </template>
      <slot name="footer"></slot>
    </XField>
  </ElForm>
</template>
<script lang="ts" setup>
  import {
    provide,
    getCurrentInstance,
    watch,
    ref,
    reactive,
    toRaw
  } from 'vue';
  import { ElForm, ElFormItem, ElButton } from 'element-plus';
  import {
    formProps,
    formInstanceKey,
    FormEmits,
    FormModel,
    formModelKey
  } from './types';
  import { XField } from '../../';

  defineOptions({
    name: 'XForm'
  });

  const props = defineProps(formProps);
  const emit = defineEmits<FormEmits>();
  const instance = getCurrentInstance();
  const formRef = ref();
  const model = reactive<FormModel>(props.model || {});

  provide(formInstanceKey, instance);
  provide(formModelKey, model);

  watch(model, () => {
    emit('change', toRaw(model));
  });

  watch(
    () => props.model,
    (v) => {
      Object.assign(model, v);
    },
    { deep: true }
  );

  const submit = async () => {
    const ret = await formRef.value.validate().catch((e: any) => e);
    if (ret && props.model) {
      emit('submit', toRaw(model));
    }
  };

  const reset = (fields?: string[] | string) => {
    formRef.value.resetFields(fields);
    emit('reset');
  };

  defineExpose({
    formRef,
    model,
    submit,
    reset
  });
</script>
