<template>
  <div>
    <ElForm>
      <XField
        label="字段名称"
        label-width="100px"
        required
        error="错误信息"
        :inline-message="true"
        :show-message="true">
        <ElInput></ElInput>
      </XField>
    </ElForm>
  </div>
</template>
<script lang="ts" setup>
  import { XField } from '@vtj/ui';
  import { ElInput, ElForm } from 'element-plus';
</script>
