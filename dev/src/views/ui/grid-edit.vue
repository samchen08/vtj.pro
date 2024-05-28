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

    <XForm :model="model" @submit="onSubmit">
      <XField label="子表格" name="children">
        <template #editor>
          <XGrid
            :auto-resize="false"
            height="200px"
            :editable="editable"
            :columns="columns"
            :data="model.children"
            :editRules="editRules"
            :editRenders="editRenders"
            :cellRenders="cellRenders"
            :filterRenders="filterRenders"
            @edit-closed="onEditClosed"></XGrid>
        </template>
      </XField>
    </XForm>
  </div>
</template>
<script lang="ts" setup>
  import { ref, toValue } from 'vue';
  import { XGrid, XForm, XField } from '@vtj/ui';

  const editable = ref(false);

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
    date: 'XDate',
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

  const onEditClosed = (e: any) => {
    const data = e.$grid.getData().map((n: any) => toValue(n));
    console.log('onEditClosed', e, data);
    model.value.children = data;
  };

  const onSubmit = (m: any) => {
    console.log('submit', m);
  };

  setTimeout(() => {
    editable.value = true;
  }, 2000);
</script>
