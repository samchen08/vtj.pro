<template>
  <div class="page">
    <XField
      label="字段名称"
      error="错误信息"
      label-width="120px"
      editor="select"
      :options="options"
      tooltip-position="inner">
      <template #option="{ option }">
        <div>-- {{ option.label }}</div>
      </template>
    </XField>

    <XField
      label="字段名称-多选"
      error="错误信息"
      label-width="120px"
      editor="select"
      :props="{ multiple: true }"
      :options="options"
      tooltip-position="outer">
      <template #option="{ option }">
        <div>-- {{ option.label }}</div>
      </template>
    </XField>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { XField } from '@vtj/ui';

  const options: any = ref([
    { label: '选项一', value: 1 },
    { label: '选项二', value: 2, disabled: true },
    { label: '选项三', value: 3 },
    { label: '选项四', value: 4 }
  ]);
</script>
