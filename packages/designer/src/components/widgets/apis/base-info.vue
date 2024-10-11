<template>
  <div>
    <XField
      name="method"
      label="请求类型"
      required
      editor="radio"
      :options="methods"></XField>
    <XField
      name="name"
      label="接口名称"
      required
      :rules="{ pattern: NAME_REGEX, message: '名称格式不正确' }">
    </XField>
    <XField name="label" label="备注说明" required></XField>
    <XField name="url" label="接口URL" required></XField>
    <XField
      name="category"
      label="分组"
      editor="select"
      :props="categoryProps"
      :options="options"></XField>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { XField } from '@vtj/ui';
  import { NAME_REGEX, API_METHOD_TYPES } from '../../../constants';
  export interface Props {
    categories?: string[];
  }
  const props = defineProps<Props>();
  const methods = API_METHOD_TYPES.map((n) => {
    return {
      label: n,
      value: n.toLowerCase()
    };
  });

  const categoryProps = {
    filterable: true,
    allowCreate: true,
    defaultFirstOption: true
  };

  const options = computed(() => {
    return props.categories?.map((n) => {
      return {
        label: n,
        value: n
      };
    });
  });
</script>
