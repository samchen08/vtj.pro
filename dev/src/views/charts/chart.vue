<template>
  <div>
    <XChart :option="option" ref="chart"></XChart>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
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

  const chart = ref();

  setTimeout(() => {
    option.series[0].type = 'bar';
    console.log(chart);
  }, 5000);
</script>
