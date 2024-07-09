<template>
  <div>
    <XAction></XAction>
    <XImportButton multiple :uploader="uploader" parser="json" type="primary">
      导入文件</XImportButton
    >
    <XAction></XAction>
    <XAction></XAction>
  </div>
</template>
<script lang="ts" setup>
  import { XImportButton, XAction } from '@vtj/ui';
  import { downloadJson } from '@vtj/utils';

  const uploader = async (content: any) => {
    console.log('uploader', content);

    downloadJson(content, 'file.json');
    return true;
  };
</script>
