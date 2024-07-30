<template>
  <div class="page">
    <XImportButton
      multiple
      :uploader="uploaderJSON"
      parser="json"
      type="success"
      size="large">
      导入JSON</XImportButton
    >

    <XImportButton
      multiple
      :uploader="uploaderText"
      parser="text"
      type="danger">
      导入Text</XImportButton
    >

    <XImportButton
      multiple
      :uploader="uploaderBase64"
      parser="base64"
      type="primary"
      size="small">
      导入Base64</XImportButton
    >
  </div>
</template>

<script setup lang="ts">
  import { XImportButton } from '@vtj/ui';

  import { downloadJson, downloadBlob, downloadUrl } from '@vtj/utils';

  const uploaderJSON = async (content: any) => {
    console.log('uploaderJSON', content);

    downloadJson(content, 'vtj.json');
    return true;
  };

  const uploaderText = async (content: any) => {
    console.log('uploaderText', content);

    downloadBlob(content, 'vtj.text');
    return true;
  };

  const uploaderBase64 = async (content: any) => {
    console.log('uploaderBase64', content);

    downloadUrl(content, 'vtj.jpg');
    return true;
  };
</script>

<style scoped>
  .page {
    display: flex;
    gap: 20px;
  }
</style>
