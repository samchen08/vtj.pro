<template>
  <XForm
    ref="form"
    size="default"
    label-width="80px"
    :inline="inline"
    :inline-columns="2"
    :model="model"
    @submit="onSubmit"
    @change="onModelChange"
    sticky>
    <XField
      name="type"
      label="分类"
      editor="radio"
      :hidden="false"
      :props="{ button: true }"
      :options="options"></XField>
    <XField
      name="options"
      label="多选"
      editor="select"
      required
      :props="{ multiple: true, valueKey: 'id' }">
      <template #editor="{ editor }">
        <ElSelect v-bind="editor">
          <ElOption
            v-for="item in dataOptions"
            :key="item.id"
            :label="item.label"
            :value="item"></ElOption>
        </ElSelect>
      </template>
    </XField>

    <XField name="common" label="公共" readonly></XField>
    <XField name="type1" label="选项一" :visible="type1Visible"></XField>
    <XField name="type2" label="选项二" :visible="type2Visible"></XField>
    <XField name="type3" label="选项三" :visible="{ type: 3 }"></XField>
    <XField
      name="type4"
      editor="select"
      label="级联"
      :cascader="['type']"
      :options="optionsLoader">
    </XField>

    <XField name="file" editor="none" label="单文件">
      <template #editor>
        <XAttachment
          v-model="model.file"
          :uploader="uploader"
          :multiple="false"
          :limit="1"></XAttachment>
      </template>
    </XField>

    <XField name="ck" editor="none" label="富文本">
      <template #editor>
        <CkEditor v-model="model.ck" height="500px"></CkEditor>
      </template>
    </XField>

    <XField
      v-for="(_item, index) of model.items"
      :name="`items.${index}.title`"
      :label="`项目${index + 1}`">
      <ElButton style="margin-left: 10px" @click="onDelItem(index)">
        删除
      </ElButton>
    </XField>

    <template #action>
      <ElButton @click="onAddItem">增加</ElButton>
    </template>
  </XForm>
</template>
<script lang="ts" setup>
  import { ElButton, ElSelect, ElOption } from 'element-plus';
  import { reactive, ref } from 'vue';
  import { XField, XForm, XAttachment } from '@vtj/web';
  import { plugin as CkEditor } from '@vtj/plugin-ckeditor';
  import '@vtj/plugin-ckeditor/dist/@vtj__plugin-ckeditor.css';

  const form = ref();
  const inline = ref(false);

  const dataOptions = [
    {
      id: 'a1bde999-ff98-4671-b5be-bc2e0f9858cf',
      createdAt: '2024-11-15T06:55:38.328Z',
      updatedAt: '2024-11-21T06:58:02.661Z',
      name: 'Normal',
      label: '普通会员',
      order: 0,
      isDefault: true,
      isSuper: true,
      notes: '默认普通会员'
    },
    {
      id: '1022f0ea-06aa-4b53-b010-446bd6d48e42',
      createdAt: '2024-11-21T03:34:54.999Z',
      updatedAt: '2024-11-21T03:36:10.000Z',
      name: 'VIP',
      label: '订阅用户',
      order: 1,
      isDefault: false,
      isSuper: false,
      notes: '付费订阅用户'
    },
    {
      id: '7e62d270-43ad-423f-94ce-13262e4b7ea2',
      createdAt: '2024-11-21T03:30:44.422Z',
      updatedAt: '2024-11-21T03:33:31.000Z',
      name: 'App',
      label: '应用管理员',
      order: 1,
      isDefault: false,
      isSuper: false,
      notes: '能管理自己的应用'
    },
    {
      id: 'b3cc97c8-3478-4982-b3cf-710146ebf299',
      createdAt: '2024-11-21T02:38:28.663Z',
      updatedAt: '2024-11-21T03:34:01.000Z',
      name: 'Admin',
      label: '系统管理员',
      order: 1,
      isDefault: false,
      isSuper: false,
      notes: '系统基础数据管理'
    },
    {
      id: '666fa227-2d76-4713-bdde-4bfcfe6167ac',
      createdAt: '2024-11-21T02:37:06.379Z',
      updatedAt: '2024-11-21T03:32:14.000Z',
      name: 'Super',
      label: '超级管理员',
      order: 2,
      isDefault: false,
      isSuper: true,
      notes: '最高权限，不能删除'
    }
  ];

  const options = [
    {
      label: '选项一',
      value: 1
    },
    {
      label: '选项二',
      value: 2
    },
    {
      label: '选项三',
      value: 3
    }
  ];

  const model = reactive({
    type: 1,
    common: 'ABC',
    file: [
      {
        url: 'https://oss.newpearl.com/newpearl/image/2024-07-15/acd6ff3e0bf8fce74d795a870c9069e6.png'
      }
    ],
    items: [
      {
        title: 'ABC'
      }
    ],
    ck: `<p>tests</p>`
  });

  const onSubmit = (m: any) => {
    console.log('submit model', m);
    // form.value.reset();
  };

  const type1Visible = (m: any) => {
    return m.type === 1;
  };

  const type2Visible = (m: any) => {
    return m.type === 2;
  };

  const optionsLoader = (m: any) => {
    const val = m?.type;
    const result: any[] = [];
    for (let i = 0; i < 5; i++) {
      result.push({
        label: `类型_${val}_${i}`,
        value: `${val}_${i}`
      });
    }
    return result;
  };

  const onModelChange = (m: any) => {
    console.log('onModelChange', m);
  };

  const onAddItem = () => {
    model.items.push({
      title: ''
    });
  };

  const onDelItem = (index: number) => {
    model.items.splice(index, 1);
  };

  const uploader: any = async () => {
    // return null;
    return 'https://oss.newpearl.com/newpearl/image/2024-07-15/acd6ff3e0bf8fce74d795a870c9069e6.png';
  };
</script>

<style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
</style>
