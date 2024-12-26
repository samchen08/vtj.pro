<template>
  <div>
    <XForm
      ref="form"
      size="default"
      label-width="80px"
      :inline="inline"
      :model="model"
      @submit="onSubmit"
      @change="onModelChange"
      @reset="onReset">
      <XField ref="fieldRef" label="字段名称" v-model="model.fieldValue1">
      </XField>
      <XField
        label="字段名称"
        editor="textarea"
        v-model="model.fieldValue2"
        placeholder="多行文本">
      </XField>
    </XForm>

    <XForm
      ref="form"
      size="large"
      label-width="80px"
      :inline="!inline"
      :inline-columns="2"
      :model="model"
      :submitMethod="onSubmitMethod"
      :tooltipMessage="true"
      @submit="onSubmit"
      @change="onModelChange"
      @reset="onReset">
      <XField ref="fieldRef" label="label1" v-model="model.fieldValue2">
      </XField>
      <XField ref="fieldRef" label="label2" v-model="model.fieldValue3">
      </XField>
      <XField ref="fieldRef" label="label3" v-model="model.fieldValue4">
      </XField>
      <XField ref="fieldRef" label="label4" v-model="model.fieldValue5">
      </XField>
    </XForm>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { XForm, XField } from '@vtj/ui';

  const inline = ref(false);

  const model = reactive({
    fieldValue1: '',
    fieldValue2: '',
    fieldValue3: '',
    fieldValue4: '',
    fieldValue5: ''
  });

  const onSubmit = (model: object) => {
    console.log('onSubmit', model);
  };

  const onModelChange = (model: object) => {
    console.log('onModelChange', model);
  };

  const onReset = () => {
    console.log('onReset');
  };

  const onSubmitMethod = (model: object) => {
    console.log('onSubmitMethod', model);
  };
</script>

<style scoped></style>
