<template>
  <div>
    <XChart :option="option" height="800px"></XChart>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { XChart } from '@vtj/web';

  const option: any = reactive({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  });

  setTimeout(() => {
    option.series[0].type = 'bar';
  }, 5000);
</script>
