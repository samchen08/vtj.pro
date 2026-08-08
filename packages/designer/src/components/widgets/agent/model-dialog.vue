<template>
  <XDialogForm
    :title="title"
    width="500px"
    height="350px"
    :z-index="3000"
    :form-props="{ labelWidth: '60px' }"
    :model="model"
    :submit-method="submit">
    <ElAlert :closable="false" type="warning" class="alert">
      模型信息存储到浏览器缓存，VTJ.PRO不存储模型相关数据
    </ElAlert>
    <XField
      name="label"
      label="名称"
      placeholder="示例：Claude Sonnet 4"
      required></XField>
    <XField
      name="baseURL"
      label="服务"
      placeholder="示例：https://openrouter.ai/api/v1"
      required></XField>
    <XField
      name="model"
      label="模型"
      placeholder="示例：anthropic/claude-sonnet-4"
      required></XField>
    <XField
      name="apiKey"
      label="Key"
      placeholder="示例：sk-***********"
      required></XField>
  </XDialogForm>
</template>

<script lang="ts" setup>
  import { XDialogForm, XField } from '@vtj/ui';
  import { ElAlert } from 'element-plus';
  import { reactive, computed } from 'vue';

  import type { LLM } from '../../../framework';

  export interface Props {
    item?: LLM | null;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    save: [item: LLM];
  }>();

  const title = computed(() => {
    return props.item?.id ? '更改模型' : '新增模型';
  });

  const model = reactive(props.item || {});

  const submit = async (data: any) => {
    emit('save', data);
    return true;
  };
</script>

<style lang="scss" scoped>
  .alert {
    margin-bottom: 20px;
  }
</style>
