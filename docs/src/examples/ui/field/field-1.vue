<template>
  <div class="page">
    <XField
      ref="fieldRef"
      v-model="fieldValue"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange">
    </XField>

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
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { XField } from '@vtj/ui';

  const fieldValue = ref('');
  const fieldRef = ref();
  const disabled = ref(false);

  const onChange = (val: any) => {
    console.log('onChange', val);
  };

  const onFocus = () => {
    console.log('onFocus');
  };

  const onBlur = () => {
    console.log('onBlur');
  };
</script>
