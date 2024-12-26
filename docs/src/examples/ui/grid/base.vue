<template>
  <div style="height: 200px">
    <XGrid
      ref="gridRef"
      id="demo"
      size="small"
      :columns="columns"
      :loader="loader">
    </XGrid>
  </div>
</template>

<script lang="ts" setup>
  import { ref, type Ref } from 'vue';
  import { XGrid, type GridColumns } from '@vtj/ui';
  import { numberFormat } from '@vtj/utils';
  import { data as tableData } from './data';

  const columns: Ref<GridColumns> = ref([]);

  setTimeout(() => {
    columns.value = [
      { type: 'checkbox', title: '', fixed: 'left' },
      { type: 'seq', title: '序号', fixed: 'left' },
      {
        field: 'id',
        title: 'ID'
      },
      {
        field: 'name',
        title: '姓名',
        filters: [{ value: null }],
        cellRender: {
          name: 'LinkCell',
          events: {
            click(value: any, e: any) {
              console.log(value, e);
            }
          }
        }
      },
      {
        field: 'sex',
        title: '性别',
        filters: [
          { label: '男', value: 1 },
          { label: '女', value: 0 }
        ],
        formatter: (data: any) => {
          const { row } = data;
          const map: Record<number, any> = {
            1: '男',
            0: '女'
          };
          return map[row.sex];
        }
      },
      {
        field: 'age',
        title: '年龄',
        sortable: true
      },
      {
        field: 'salary',
        title: '工资',
        formatter: (e: any) => `￥${numberFormat(e.cellValue, '0.00')}`
      }
    ] as GridColumns;
  }, 1000);

  const loader = () => {
    return tableData;
  };
</script>
