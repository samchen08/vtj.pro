<template>
  <div>
    <XForm
      ref="form"
      label-width="160px"
      :rules="rules"
      :model="model"
      required
      @submit="onSubmit">
      <XField
        name="name"
        label="ActivityName"
        editor="text"
        v-model="model.name"
        error="错误信息"
        :inline-message="true"
        :show-message="true"
        :tooltipMessage="true"
        tooltip-position="outer">
      </XField>

      <XField
        name="region"
        label="ActivityZone"
        editor="text"
        v-model="model.region"
        error="错误信息"
        :inline-message="true"
        :show-message="true"
        :tooltipMessage="true"
        tooltip-position="inner">
      </XField>

      <XField
        name="count"
        label="ActivityCount"
        editor="text"
        v-model="model.count"
        error="错误信息"
        :inline-message="true"
        :show-message="true"
        :tooltipMessage="false"
        tooltip-position="inner">
      </XField>

      <XField
        name="date"
        label="时间"
        editor="time"
        :inline-message="true"
        :show-message="true"
        :tooltipMessage="false"
        tooltip-position="inner">
      </XField>
    </XForm>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { XForm, XField } from '@vtj/ui';

  const model = ref({
    name: ''
  });

  const rules = reactive({
    name: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur'
      },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
    ],
    region: [
      {
        required: true,
        message: 'Please select Activity zone',
        trigger: ['blur', 'change']
      }
    ],
    count: [
      {
        required: true,
        message: 'Please select Activity count',
        trigger: ['blur', 'change']
      }
    ],
    date: [
      {
        required: true,
        message: 'Please select date',
        trigger: 'change'
      }
    ]
  });

  const onSubmit = (model: object) => {
    console.log('onSubmit', model);
  };
</script>

<style scoped></style>
