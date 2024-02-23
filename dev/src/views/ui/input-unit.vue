<template>
  <div>
    <XInputUnit
      v-model="value"
      :unit="unit"
      size="small"
      :with-unit="!!unit"
      :units="units"
      :format="format"
      @change="onChange"
      @unit-change="onUnitChange"></XInputUnit>
    <XInputUnit
      v-model="value"
      :unit="unit"
      size="small"
      :with-unit="!!unit"
      @change="onChange"
      @unit-change="onUnitChange"></XInputUnit>
  </div>
  <div>{{ value }}, {{ unit }}</div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { XInputUnit } from '@vtj/web';

  const value = ref('20');
  const isAuto = ref(false);
  const unit = computed(() => (isAuto.value ? undefined : 'px'));
  const format = computed(() => {
    return !isAuto.value ? '0.00' : undefined;
  });

  const onChange = (v: string | number) => {
    isAuto.value = v === 'auto';
    console.log('value change', v);
  };

  const onUnitChange = (v: string) => {
    console.log('onUnitChange', v);
  };

  // const units = ['px', '%'];
  const units = [
    {
      label: '像素',
      value: 'px'
    },
    {
      label: '百分比',
      value: '%'
    }
  ];
</script>
