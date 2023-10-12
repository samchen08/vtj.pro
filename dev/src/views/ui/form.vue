<template>
  <XForm
    ref="form"
    size="default"
    label-width="80px"
    :inline="inline"
    :inline-columns="3"
    :model="model"
    @submit="onSubmit"
    @change="onModelChange">
    <XField
      name="type"
      label="分类"
      editor="radio"
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
      :options="optionsLoader"></XField>

    <XField name="file" label="上传" editor="none">
      <template #editor>
        <ElUpload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <ElIcon v-else class="avatar-uploader-icon"><Plus /></ElIcon>
        </ElUpload>
      </template>
    </XField>
  </XForm>
</template>
<script lang="ts" setup>
  import { ElUpload, ElButton, ElMessage, ElIcon } from 'element-plus';
  import { reactive, ref } from 'vue';
  import { XField, XForm } from '@vtj/ui';

  import { Plus } from '@element-plus/icons-vue';

  import type { UploadProps } from 'element-plus';

  const imageUrl = ref('');

  const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
  ) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
      ElMessage.error('Avatar picture must be JPG format!');
      return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('Avatar picture size can not exceed 2MB!');
      return false;
    }
    return true;
  };

  const form = ref();
  const inline = ref(false);

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
    common: 'ABC'
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
