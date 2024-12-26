<template>
  <div>
    <config-table title="日期时间转换例子" :list="list"></config-table>
  </div>
</template>

<script setup lang="ts">
  import { dateFormat } from '@vtj/utils';

  import ConfigTable from '$/components/configTable.vue';

  const list = [
    {
      name: 'dateFormat',
      example: 'dateFormat(new Date())',
      return: dateFormat(new Date())
    },
    {
      name: 'dateFormat',
      example: 'dateFormat("2024-10-1")',
      return: dateFormat('2024-10-1')
    },
    {
      name: 'dateFormat',
      example: 'dateFormat("2024-10-1 8:8:8",  "YYYY-MM-DD")',
      return: dateFormat('2024-10-1 8:8:8', 'YYYY-MM-DD')
    },
    {
      name: 'dateFormat',
      example: 'dateFormat("2024-10-1 8:8:8",  "YYYY-MM-DD hh-mm")',
      return: dateFormat('2024-10-1 8:8:8', 'YYYY-MM-DD hh-mm')
    },
    {
      name: 'dateFormat',
      example: 'dateFormat(1722654892315)',
      return: dateFormat(1722654892315)
    }
  ];
</script>
