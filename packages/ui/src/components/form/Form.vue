<template>
  <ElForm
    ref="formRef"
    class="x-form"
    :class="classes"
    :inline="props.inline"
    :model="model"
    @keyup.enter="onEnter"
    @submit.stop.prevent
    v-bind="$attrs">
    <slot></slot>
    <XField
      v-if="props.footer"
      editor="none"
      class="x-form__footer"
      :class="footerClasses"
      label=" ">
      <template #editor>
        <slot name="footer">
          <ElButton
            v-if="props.submitText"
            :loading="loading"
            type="primary"
            @click="submit">
            {{ props.submitText }}
          </ElButton>
          <ElButton
            v-if="props.resetText"
            type="default"
            @click="() => reset()">
            {{ props.resetText }}
          </ElButton>
          <slot name="action"></slot>
        </slot>
      </template>
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
    toRaw,
    computed
  } from 'vue';
  import { ElForm, ElButton } from 'element-plus';
  import {
    formProps,
    formInstanceKey,
    type FormEmits,
    type FormModel,
    formModelKey
  } from './types';
  import { XField } from '../../';

  defineOptions({
    inheritAttrs: false,
    name: 'XForm'
  });

  const props = defineProps(formProps);
  const emit = defineEmits<FormEmits>();
  const instance = getCurrentInstance();
  const formRef = ref();
  const model = reactive<FormModel>(props.model || {});
  const loading = ref(false);
  const classes = computed(() => {
    return {
      'is-sticky': !!props.sticky
    };
  });

  const footerClasses = computed(() => {
    return {
      [`is-algin-${props.footerAlign}`]: true
    };
  });

  provide(formInstanceKey, instance);
  provide(formModelKey, model);

  watch(
    () => props.model,
    (v) => {
      Object.assign(model, v);
    },
    { deep: true }
  );

  watch(model, () => {
    emit('change', toRaw(model));
  });

  const validate = async () => {
    return await formRef.value.validate().catch(() => false);
  };

  const clearValidate = () => {
    formRef.value.clearValidate();
  };

  const submit = async () => {
    const ret = await validate();
    if (ret) {
      emit('submit', toRaw(model));
      if (props.submitMethod) {
        loading.value = true;
        await props.submitMethod(toRaw(model));
        loading.value = false;
      }
    }
  };

  const onEnter = () => {
    if (props.enterSubmit) {
      submit();
    }
  };

  const reset = (fields?: string[] | string) => {
    formRef.value?.resetFields(fields);
    emit('reset');
  };

  defineExpose({
    formRef,
    model,
    submit,
    reset,
    validate,
    clearValidate
  });
</script>
