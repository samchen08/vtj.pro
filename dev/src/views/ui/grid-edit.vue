<template>
  <div>
    <XForm :model="model" @submit="onSubmit" @reset="onReset">
      <XField label="子列表" name="children" required>
        <template #editor>
          <XGrid
            ref="gridRef"
            size="small"
            height="200px"
            row-sortable
            column-sortable
            :editable="editable"
            :columns="columns"
            :loader="loader"
            :editRules="editRules"
            :cellRenders="cellRenders"
            :editRenders="editRenders"
            :pager="false"
            @edit-change="onEditChange">
            <template #toolbar__buttons>
              <ElButton @click="onAdd">Add</ElButton>
              <ElButton type="warning" @click="onRemove">Remove</ElButton>
            </template>
          </XGrid>
        </template>
      </XField>
    </XForm>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElButton } from 'element-plus';
  import { XGrid, XForm, XField, type GridColumns } from '@vtj/ui';
  import { request } from '@vtj/utils';

  const editable = ref(true);
  const gridRef = ref();

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

  const pickerLoader: any = async (params: any) => {
    console.log('do load', params);
    const { page, pageSize = 50, form } = params || {};
    // console.log('query', { ...params, ...model, tab: tabValue.value });
    return await fetchData({
      ...form,
      currentPage: page,
      pageSize,
      total: 1000
    });
  };

  const pickerColumns = [
    {
      field: 'id',
      title: 'ID'
    },
    {
      field: 'name',
      title: '姓名'
    },

    {
      field: 'sex',
      title: '性别'
    },
    {
      field: 'age',
      title: '年龄'
    },
    {
      field: 'intro',
      title: '简介'
    },
    {
      field: 'join',
      title: '入职日期'
    },
    {
      field: 'create',
      title: '创建时间'
    }
  ];

  const model = ref({
    children: [
      {
        input: 'abc',
        select: 1,
        date: '2004-03-13',
        link: 'https://www.baidu.com',
        image:
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
      }
    ]
  });

  const loader = () => {
    console.log('loader');
    return {
      list: [
        {
          input: 'abc',
          select: 1,
          date: '2004-03-13',
          link: 'https://www.baidu.com',
          picker: 'abc',
          image:
            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
        }
      ],
      total: 1
    };
  };

  // console.log(model.value);

  const columns: GridColumns = [
    {
      type: 'checkbox',
      width: 40
    },
    {
      type: 'seq',
      title: '#',
      width: 50
    },
    {
      field: 'group',
      title: 'Group',
      children: [
        {
          field: 'input',
          title: 'Input'
        },
        {
          field: 'number',
          title: 'Number'
        }
      ]
    },

    {
      field: 'select',
      title: 'Select'
    },
    {
      field: 'date',
      title: 'Date'
    },
    {
      field: 'link',
      title: 'Link'
    },
    {
      field: 'picker',
      title: 'Picker'
    },
    {
      field: 'grider',
      title: 'Grider'
    },
    {
      field: 'actions',
      title: 'Actions'
    }
  ];

  const cellRenders = {
    // link: 'XLink',
    actions: {
      name: 'XActions',
      props: {
        mode: 'icon',
        items: [
          {
            label: '编辑',
            type: 'primary',
            value: 'edit'
          },
          {
            label: '删除',
            type: 'warning',
            value: 'delete'
          }
        ]
      },
      events: {
        click: (data: any, action: any) => {
          if (action.value === 'delete') {
            gridRef.value.remove(data.row);
          }
          if (action.value === 'edit') {
            gridRef.value.setActived(data.row);
          }
        }
      }
    }
  };

  const editRenders = {
    input: {
      name: 'XInput'
    },
    number: 'XNumber',
    select: {
      name: 'XSelect',
      props: {
        options: [
          {
            label: 'One',
            value: 1
          },
          {
            label: 'Two',
            value: 2
          }
        ]
      }
    },
    date: {
      name: 'XDate',
      props: {
        valueFormat: 'YYYY-MM-DD hh:mm:ss',
        type: 'datetime'
      }
    },
    link: 'XLink',
    picker: {
      name: 'XPicker',
      props: {
        loader: pickerLoader,
        columns: pickerColumns,
        valueKey: 'id',
        onPicked(data: any, params: any) {
          console.log(data, params);
          params.row.input = '333333';
        }
      }
    },
    grider: {
      name: 'XGrider',
      props: {
        title: '键值对',
        columns: [
          {
            type: 'checkbox',
            title: '',
            width: 60
          },
          {
            type: 'seq',
            title: '序号',
            width: 60
          },
          {
            field: 'key',
            title: '键',
            editRender: {
              name: 'XInput'
            }
          },
          {
            field: 'value',
            title: '值',
            editRender: {
              name: 'XInput'
            }
          }
        ],
        formatter: (data: any) => JSON.parse(data || '[]'),
        valueFormatter: (data: any) => JSON.stringify(data)
      }
    }
  };

  // const filterRenders = {
  //   input: 'XInput',
  //   select: {
  //     name: 'XSelect',
  //     props: {
  //       options: [
  //         {
  //           label: 'One',
  //           value: 1
  //         },
  //         {
  //           label: 'Two',
  //           value: 2
  //         }
  //       ]
  //     }
  //   },
  //   date: 'XDate',
  //   link: 'XInput'
  // };

  const editRules = {
    input: [
      {
        required: true,
        message: '必填项'
      }
    ]
  };

  const onEditChange = (rows: any) => {
    console.log('change', rows);
    model.value.children = rows;
  };

  const onSubmit = async (m: any) => {
    const error = await gridRef.value.validate();
    if (error) {
      console.log('error', error);
    } else {
      console.log('submit', m);
      const records = gridRef.value.getRecords();
      console.log('records', records);
    }
  };

  const onAdd = () => {
    gridRef.value.insertActived({});
  };

  const onRemove = () => {
    const rows = gridRef.value.getSelected();
    gridRef.value.remove(rows);
  };

  const onReset = () => {
    gridRef.value.load(true);
  };

  // setTimeout(() => {
  //   editable.value = true;
  // }, 2000);
</script>
