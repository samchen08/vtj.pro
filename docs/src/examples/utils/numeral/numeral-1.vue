<template>
  <div>
    <config-table title="数字格式化例子" :list="list"></config-table>
  </div>
</template>

<script setup lang="ts">
  import { numberFormat, toFixed } from '@vtj/utils';

  import ConfigTable from '$/components/configTable.vue';

  const list = [
    {
      name: 'numberFormat',
      example: 'numberFormat(123.456)',
      return: numberFormat(123.456)
    },
    {
      name: 'numberFormat',
      example: 'numberFormat(123.444)',
      return: numberFormat(123.444)
    },
    {
      name: 'numberFormat',
      example: "numberFormat(124.123, '0.0')",
      return: numberFormat(124.123, '0.0')
    },
    {
      name: 'numberFormat',
      example: "numberFormat(124.123, '0.00')",
      return: numberFormat(124.123, '0.00')
    },
    {
      name: 'toFixed',
      example: 'toFixed(12.166, 2, true)',
      return: toFixed(12.166, 2, true)
    },
    {
      name: 'toFixed',
      example: 'toFixed(12.166, 2, false)',
      return: toFixed(12.166, 2, false)
    }
  ];
</script>
