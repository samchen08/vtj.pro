<template>
  <div>
    <XAction
      label="downloadUrl"
      type="primary"
      @click="onDownloadUrl"></XAction>

    <XAction
      label="downloadBlob"
      type="success"
      @click="onDownloadBlob"></XAction>

    <XAction
      label="downloadRemoteFile"
      type="warning"
      @click="onDownloadRemoteFile"></XAction>

    <XAction
      label="downloadJson"
      type="danger"
      @click="onDownloadJson"></XAction>
  </div>
</template>

<script setup lang="ts">
  import { XAction } from '@vtj/ui';

  import {
    downloadUrl,
    downloadBlob,
    downloadRemoteFile,
    downloadJson
  } from '@vtj/utils';

  import { fileToBase64 } from '@vtj/utils';

  const onDownloadUrl = () => {
    downloadUrl(
      'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      'elementUI.jpeg'
    );
  };

  const onDownloadBlob = async () => {
    const blobParts = ['<q id="a"><span id="b">hey!</span></q>']; // 一个包含单个字符串的数组
    const blob = new Blob(blobParts, { type: 'text/html' }); // 得到 blob
    downloadBlob(blob);
  };

  const onDownloadRemoteFile = async () => {
    downloadRemoteFile('./background.jpg', 'background.jpg', 'image/jpg');
  };

  const onDownloadJson = () => {
    downloadJson('{name:"aa",age:"22"}', 'a.json');
  };
</script>

<style scoped></style>
