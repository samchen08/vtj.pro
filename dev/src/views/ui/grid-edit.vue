<template>
  <div>
    <XGrid
      height="200px"
      :editable="false"
      :columns="columns"
      :data="data"
      :virtual="false"
      :editRules="editRules"
      :editRenders="editRenders"
      :cellRenders="cellRenders"
      :filterRenders="filterRenders"></XGrid>

    <ElButton @click="onAdd">Add</ElButton>
    <hr />
    <XForm :model="model" @submit="onSubmit">
      <XField label="子列表" name="children">
        <template #editor>
          <XGrid
            ref="gridRef"
            height="200px"
            :editable="editable"
            :columns="columns"
            :data="model.children"
            :editRules="editRules"
            :editRenders="editRenders"
            :cellRenders="cellRenders"
            :filterRenders="filterRenders"
            @edit-change="onEditChange"></XGrid>
        </template>
      </XField>
    </XForm>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElButton } from 'element-plus';
  import { XGrid, XForm, XField } from '@vtj/ui';

  const editable = ref(false);
  const gridRef = ref();

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

  const columns = [
    {
      field: 'input',
      title: 'Input'
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
      field: 'image',
      title: 'Image',
      showOverflow: false
    },
    {
      field: 'actions',
      title: 'Actions'
    }
  ];

  const data = [
    {
      input: 'parent',
      select: 1,
      date: '2004-03-13',
      link: 'https://www.baidu.com',
      image:
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    }
  ];

  const cellRenders = {
    input: {
      name: 'XText',
      props: {
        type: 'success'
      }
    },
    link: 'XLink',
    select: 'XText',
    image: 'XImage',
    actions: {
      name: 'XActions',
      props: {
        mode: 'icon',
        items: [
          {
            label: '编辑',
            type: 'primary'
          },
          {
            label: '删除',
            type: 'warning'
          }
        ]
      }
    }
  };

  const editRenders = {
    input: {
      name: 'XText',
      props: {
        type: 'success'
      }
    },
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
    image: 'XImage'
  };

  const filterRenders = {
    input: 'XInput',
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
    date: 'XDate',
    link: 'XInput'
  };

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

  const onSubmit = (m: any) => {
    console.log('submit', m);
  };

  const onAdd = () => {
    gridRef.value.insertActived({});
  };

  setTimeout(() => {
    editable.value = true;
  }, 2000);
</script>
