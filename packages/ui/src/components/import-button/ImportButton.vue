<template>
  <ElUpload
    class="x-import-button"
    :multiple="props.multiple"
    :accept="props.accept"
    :before-upload="onBeforeUpload">
    <ElButton v-bind="$attrs">
      <slot>导入</slot>
    </ElButton>
  </ElUpload>
</template>

<script lang="ts" setup>
  import {
    ElUpload,
    ElButton,
    ElMessage,
    type UploadRawFile
  } from 'element-plus';
  import { importButtonProps } from './props';
  import type { ImportButtonEmits } from './types';
  const props = defineProps(importButtonProps);
  const emit = defineEmits<ImportButtonEmits>();

  const parseFile = async (file: UploadRawFile) => {
    const { parser } = props;
    if (!parser) {
      return file;
    }
    if (typeof parser === 'function') {
      return await parser(file);
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (parser === 'text' || parser === 'json') {
        reader.readAsText(file);
      } else if (parser === 'base64') {
        reader.readAsDataURL(file);
      }

      reader.onload = () => {
        if (parser === 'json' && typeof reader.result === 'string') {
          let json: any;
          try {
            json = JSON.parse(reader.result);
          } catch (e) {
            reject(e);
          }
          if (json) {
            resolve(json);
          }
        } else {
          resolve(reader.result);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onBeforeUpload = async (rawFile: UploadRawFile) => {
    const { uploader } = props;
    const content = await parseFile(rawFile).catch((e) => {
      ElMessage.error({
        message: '导入失败:' + e.message
      });
      emit('fail', e);
    });
    if (content && uploader) {
      const ret = await uploader(content).catch((e: any) => {
        ElMessage.error({
          message: '导入失败' + e?.message
        });
        emit('fail', e);
        return false;
      });
      if (ret) {
        ElMessage.success({
          message: '导入成功'
        });
        emit('success', content);
      }
    }
    return false;
  };

  defineOptions({
    name: 'XImportButton',
    inheritAttrs: false
  });
</script>
