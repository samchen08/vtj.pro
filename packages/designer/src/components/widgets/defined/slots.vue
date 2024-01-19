<template>
  <XDialogForm
    :title="title"
    width="600px"
    height="200px"
    :model="model"
    :form-props="{ tooltipMessage: false }"
    :submit-method="submit">
    <XField
      name="name"
      label="插槽名称"
      :disabled="!!props.item"
      required
      :rules="{
        message: '名称格式错误',
        pattern: NAME_REGEX
      }"></XField>
  </XDialogForm>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { XDialogForm, XField } from '@vtj/ui';
  import { type Context } from '@vtj/renderer';
  import { type BlockModel } from '@vtj/core';
  import { NAME_REGEX } from '../../../constants';

  export interface Props {
    item?: string;
    current: BlockModel;
    context: Context;
  }

  defineOptions({
    name: 'DefinedSlotsDialog'
  });

  const props = defineProps<Props>();
  const title = computed(() => (props.item ? '编辑定义插槽' : '新增定义插槽'));
  const model = ref({
    name: props.item
  });

  const submit = async (data: any) => {
    if (props.item) {
      props.current.removeSlot(props.item, true);
    }
    props.current.setSlot(data.name);
    return true;
  };
</script>
