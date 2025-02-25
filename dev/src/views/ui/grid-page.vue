<template>
  <XContainer fit direction="column">
    <XGrid
      id="grid__page"
      ref="gridRef"
      :columns="columns"
      :loader="loader"
      pager
      customable
      virtual
      resizable
      column-sortable
      row-sortable
      show-footer
      :sum-fields="['age']"
      :avg-fields="['age']"
      :sum-all-fields="{ age: 92323 }">
      <template #toolbar__buttons>
        <XActionBar :items="buttons" @click="onToolbarClick"></XActionBar>
      </template>
      <template #form>
        <XQueryForm :items="fields" :model="model"></XQueryForm>
      </template>
      <template #top>
        <XTabs
          v-model="tabValue"
          :items="tabs"
          type="card"
          @tab-change="onTabChange"></XTabs>
      </template>
      <template #pager__left>
        <span>数据统计区</span>
      </template>
    </XGrid>
  </XContainer>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import {
    XContainer,
    XActionBar,
    XGrid,
    XQueryForm,
    XTabs,
    type ActionBarItems,
    type GridColumns,
    type TabsItem,
    type QueryFormItems
  } from '@vtj/ui';
  import { request, numberFormat, sum, avg, dateFormat } from '@vtj/utils';

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

  const buttons: ActionBarItems = [
    {
      label: '查询',
      value: 'search'
    },
    {
      label: '导出'
    },
    {
      label: '打印'
    },
    {
      label: '删除',
      type: 'danger',
      value: 'delete'
    }
  ];

  const fields: QueryFormItems = [
    {
      label: '姓名',
      name: 'name',
      editor: 'text',
      props: {}
    },
    {
      label: '姓别',
      name: 'sex',
      editor: 'select'
    },
    {
      label: '入职时间开始',
      name: 'join-start',
      editor: 'date',
      props: {
        valueFormat: 'YYYY-MM-DD'
      }
    },
    {
      label: '入职时间结束',
      name: 'join-end',
      editor: 'date'
    },
    {
      label: '年龄大于',
      name: 'age-start',
      editor: 'number'
    },
    {
      label: '年龄小于',
      name: 'age-end',
      editor: 'number'
    }
  ];

  const tabs: TabsItem[] = [
    {
      label: '全部',
      value: 0
    },
    {
      label: '待审批',
      value: 1
    },
    {
      label: '已审批',
      value: 2
    }
  ];

  const columns: GridColumns = [
    { type: 'checkbox', title: '', width: 60, field: 'checkbox' },
    { type: 'seq', title: '序号', width: 60 },
    {
      field: 'id',
      title: 'ID'
    },
    {
      field: 'name',
      title: '姓名',
      filters: [{ value: null }],
      filterRender: {
        name: 'XInput'
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
        name: 'XDate'
      }
    },
    {
      field: 'create',
      title: '创建时间'
    }
  ];

  const gridRef = ref();
  const tabValue = ref(0);
  const model = reactive({
    'join-start': dateFormat(new Date(), 'YYYY-MM-DD')
  });

  const loader: any = async (params: any) => {
    const { page, pageSize = 50 } = params || {};
    console.log('query', { ...params, ...model, tab: tabValue.value });
    return await fetchData({
      ...model,
      currentPage: page,
      pageSize,
      total: 1000
    });
  };

  const onToolbarClick = (action: any) => {
    if (action.value === 'search') {
      gridRef.value?.search();
    }
    if (action.value === 'delete') {
      const rows = gridRef.value?.getSelected();
      gridRef.value?.remove(rows);
      console.log('remove', rows);
    }
  };

  const onTabChange = () => {
    gridRef.value?.search();
  };

  // const sumNum = (list: any[], field: string) => {
  //   let count = 0;
  //   list.forEach((item) => {
  //     count += Number(item[field]);
  //   });
  //   return count;
  // };

  //@ts-ignore
  const footerMethod = (e: any) => {
    const { columns, data } = e;
    return [
      columns.map((column: any, index: any) => {
        if (index === 0) {
          return '合计';
        }
        if (column.field === 'age') {
          return sum(data, column.field);
        }
        return null;
      }),
      columns.map((column: any, index: any) => {
        if (index === 0) {
          return '平均';
        }
        if (column.field === 'age') {
          return avg(data, column.field);
        }
        return null;
      })
    ];
  };
</script>
