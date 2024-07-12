<template>
  <div class="container">
    <XGrid
      ref="gridRef"
      id="demo"
      size="small"
      :columns="columns"
      :rowSortable="true"
      @row-sort="onRowSort"
      @column-sort="onColSort"
      columnSortable
      :filter-renders="{ name: 'XInput' }"
      :toolbar-config="{}"
      :cell-renders="{ sex: 'XTag' }"
      @resizable-change="onResize"
      :customable="true"
      :getCustom="getCustom"
      :saveCustom="saveCustom"
      :border="true"
      :stripe="false"
      :loader="loader"
      :page="page"
      :pager="true"
      :auto="true"
      :resizable="true"
      :virtual="true"
      :sumFields="['age', 'month']"
      :avgFields="['age', 'year']"
      :sumAllFields="{ age: 23232 }">
    </XGrid>
  </div>
</template>
<script lang="ts" setup>
  import { ref, type Ref } from 'vue';
  import { XGrid, type GridColumns } from '@vtj/ui';
  import { request, storage, numberFormat } from '@vtj/utils';
  const gridRef = ref<InstanceType<typeof XGrid>>();
  const page = ref(1);
  const fetchData = (data: any) => {
    return request({
      url: '/mock-api/list',
      method: 'get',
      data,
      settings: {
        originResponse: false
      }
    });
  };

  const columns: Ref<GridColumns> = ref([]);
  setTimeout(() => {
    columns.value = [
      { type: 'checkbox', title: '', width: 60, fixed: 'left' },
      { type: 'seq', title: '序号', width: 60, fixed: 'left' },
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
        field: 'avatar',
        title: '头像',
        showOverflow: false,
        visible: true
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
        field: 'birth',
        title: '出生日期',
        children: [
          { field: 'year', title: '年' },
          { field: 'month', title: '月' },
          { field: 'date', title: '日' }
        ]
      },
      {
        field: 'address',
        title: '地址',
        children: [
          { field: 'province', title: '省' },
          { field: 'city', title: '市' },
          { field: 'county', title: '区' }
        ]
      },
      {
        field: 'salary',
        title: '工资',
        formatter: (e: any) => `￥${numberFormat(e.cellValue, '0.00')}`
      },
      {
        field: 'intro',
        title: '简介'
      },
      {
        field: 'join',
        title: '入职日期',
        filters: [{ value: '' }],
        filterRender: {
          name: 'DateFilter'
        }
      },
      {
        field: 'create',
        title: '创建时间'
      },
      {
        field: 'actions',
        title: '操作',
        width: '150px'
      }
    ] as GridColumns;
  }, 100);

  setTimeout(() => {
    columns.value = [
      { type: 'checkbox', title: '', width: 60, fixed: 'left' },
      { type: 'seq', title: '序号', width: 60, fixed: 'left' },
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
        field: 'avatar',
        title: '头像',
        showOverflow: false,
        visible: true
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
        field: 'birth',
        title: '出生日期',
        children: [
          { field: 'year', title: '年' },
          { field: 'month', title: '月' },
          { field: 'date', title: '日' }
        ]
      },
      {
        field: 'address',
        title: '地址',
        children: [
          { field: 'province', title: '省' },
          { field: 'city', title: '市' },
          { field: 'county', title: '区' }
        ]
      },
      {
        field: 'salary',
        title: '工资',
        formatter: (e: any) => `￥${numberFormat(e.cellValue, '0.00')}`
      },
      {
        field: 'intro',
        title: '简介'
      },
      {
        field: 'join',
        title: '入职日期',
        filters: [{ value: '' }],
        filterRender: {
          name: 'DateFilter'
        }
      },
      {
        field: 'create',
        title: '创建时间'
      },
      {
        field: 'actions',
        title: '操作',
        width: '150px'
      }
    ] as GridColumns;

    // console.log(gridRef.value?.vxeRef?.getTableColumn());
  }, 1000);

  const onRowSort = (e: any) => {
    console.log('onRowSort', e);
  };
  const onColSort = (e: any) => {
    console.log('onColSort', e);
  };

  const onResize = (e: any) => {
    console.log('onResize', e);
  };

  const getCustom = async (id: string) => {
    return storage.get(id, { type: 'local' });
  };
  const saveCustom = async (info: any) => {
    storage.save(info.id, info, { type: 'local' });
  };

  const loader: any = async (params: any) => {
    const { page, pageSize = 50 } = params || {};
    console.log('query', params);
    return await fetchData({
      currentPage: page,
      pageSize,
      total: 1000
    });
  };
</script>

<style lang="scss" scope>
  .container {
    height: 100%;
  }
</style>
