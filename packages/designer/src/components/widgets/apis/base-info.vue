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
  </div>
</template>
<script lang="ts" setup>
  import { XField } from '@vtj/ui';
  import { NAME_REGEX, API_METHOD_TYPES } from '../../../constants';
  const methods = API_METHOD_TYPES.map((n) => {
    return {
      label: n,
      value: n.toLowerCase()
    };
  });
</script>
