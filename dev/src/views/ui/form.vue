<template>
  <XForm
    ref="form"
    size="default"
    label-width="80px"
    :inline="inline"
    :inline-columns="2"
    :model="model"
    @submit="onSubmit"
    @change="onModelChange">
    <XField
      name="type"
      label="分类"
      editor="radio"
      :hidden="false"
      :props="{ button: true }"
      :options="options"></XField>
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
  import { ElButton } from 'element-plus';
  import { reactive, ref } from 'vue';
  import { XField, XForm } from '@vtj/web';

  const form = ref();
  const inline = ref(true);

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
