<template>
  <XContainer fit>
    <ElButton @click="onBack">返回</ElButton>
    <XMapChart
      :option="option"
      :geo-json="currentFile"
      :name="currentName"
      ref="chart"
      height="100%"
      @click="onClick"></XMapChart>
  </XContainer>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue';
  import { XMapChart, XContainer } from '@vtj/web';
  import { ElButton } from 'element-plus';

  const currentName = ref('100000');
  const basePath = 'https://unpkg.com/vtj-geojson@0.1.3/geo/';

  const currentFile = computed(() => {
    return basePath + currentName.value + '.geoJson';
  });

  const option: any = reactive({
    series: [
      {
        type: 'map'
      }
    ]
  });
  const chart = ref<InstanceType<typeof XMapChart>>();

  const onClick = (params: any) => {
    const { features = [] } = chart.value?.geoJSON || {};
    if (features.length && params?.name) {
      const item = features.find(
        (n: any) => n.properties.name === params?.name
      );
      if (item) {
        const arr = currentName.value.split('/');
        if (arr.length < 3) {
          currentName.value += `/${item.properties.adcode}`;
        }
      }
      console.log('click', params, item);
    }
  };

  const onBack = () => {
    currentName.value = '100000';
  };
</script>
