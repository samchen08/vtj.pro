<template>
  <XDialog
    ref="dialogRef"
    class="x-dialog-form"
    :model-value="props.modelValue"
    :submit="submitText"
    :cancel="cancelText"
    :size="props.size"
    @submit="onSubmit"
    @close="onClose"
    :minimizable="false"
    :maximizable="false"
    v-bind="$attrs">
    <XForm
      ref="formRef"
      class="x-dialog-form__form"
      :footer="false"
      label-width="80px"
      :size="props.size"
      :model="props.model"
      :rules="props.rules"
      :submit-method="handleSubmit"
      v-bind="props.formProps">
      <slot></slot>
    </XForm>
    <template v-if="$slots.extra" #extra>
      <slot name="extra"></slot>
    </template>
    <template v-if="$slots.handle" #handle>
      <slot name="handle"></slot>
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </XDialog>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { XDialog, XForm } from '../';
  import { dialogFormProps, type DialogFormEmits } from './types';

  defineOptions({
    name: 'XDialogForm'
  });

  const props = defineProps(dialogFormProps);
  const emit = defineEmits<DialogFormEmits>();
  const formRef = ref();
  const dialogRef = ref();
  const $vtjEl = computed(() => dialogRef.value?.$vtjEl);

  const onSubmit = () => {
    formRef.value?.submit();
  };

  const onClose = () => {
    emit('update:modelValue', false);
    emit('close');
  };

  const handleSubmit = async (model: any) => {
    emit('submit', model);
    if (props.submitMethod) {
      const ret = await props.submitMethod(model);
      if (ret) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const submitText = computed(() =>
    props.formProps?.disabled ? false : props.submit
  );

  const cancelText = computed(() =>
    props.formProps?.disabled ? false : props.cancel
  );

  defineExpose({
    $vtjEl,
    formRef,
    dialogRef
  });
</script>
