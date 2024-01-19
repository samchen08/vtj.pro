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
      label="事件名称"
      required
      :disabled="!!props.item"
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
    name: 'DefinedEventsDialog'
  });

  const props = defineProps<Props>();
  const title = computed(() => (props.item ? '编辑定义事件' : '新增定义事件'));
  const model = ref({
    name: props.item
  });

  const submit = async (data: any) => {
    if (props.item) {
      props.current.removeEmit(props.item, true);
    }
    props.current.setEmit(data.name);
    return true;
  };
</script>
