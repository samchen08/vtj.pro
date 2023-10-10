<template>
  <div>
    <ElForm size="default">
      <XField label="字段名称" label-width="100px"> </XField>

      <XField
        label="字段名称"
        label-width="100px"
        editor="text"
        required
        error="错误信息"
        :inline-message="true"
        :show-message="true"
        @change="onChange"
        :tooltipMessage="true"
        tooltip-position="outer">
      </XField>

      <XField
        label="字段名称"
        label-width="100px"
        editor="textarea"
        placeholder="多行文本"
        :disabled="disabled">
      </XField>

      <XField label="字段名称" label-width="100px" editor="select"></XField>
    </ElForm>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XField } from '@vtj/ui';
  import { ElInput, ElForm } from 'element-plus';

  const fieldValue = ref('');

  const disabled = ref(false);

  const onChange = (val: any) => {
    console.log('onChange', val);
  };

  setTimeout(() => {
    disabled.value = true;
  }, 3000);
</script>
