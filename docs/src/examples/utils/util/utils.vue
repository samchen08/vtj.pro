<template>
  <div>
    <XAction label="isClient" type="primary" @click="onClick"></XAction>

    <XAction
      label="fileToBase64"
      type="primary"
      @click="onClickFileToBase64"></XAction>

    <XAction
      label="formDataToJson"
      type="success"
      @click="onClickFormDataToJson"></XAction>

    <XAction
      label="dataURLtoBlob"
      type="warning"
      @click="onClickDataURLtoBlob"></XAction>

    <XAction
      label="blobToFile"
      type="danger"
      @click="onClickBlobToFile"></XAction>
  </div>
</template>

<script setup lang="ts">
  import { XAction } from '@vtj/ui';

  import {
    isClient,
    fileToBase64,
    formDataToJson,
    dataURLtoBlob,
    blobToFile
  } from '@vtj/utils';

  const onClick = () => {
    console.log('isClient', isClient);
  };

  const onClickFileToBase64 = async () => {
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain'
    });
    const FileToBase64 = await fileToBase64(file);

    console.log('FileToBase64', FileToBase64);
    // FileToBase64 data:text/plain;base64,Zm9v
  };

  const onClickFormDataToJson = async () => {
    const formData = new FormData(); // 当前为空
    formData.append('username', 'admin');
    const FormDataToJson = formDataToJson(formData);
    console.log('FormDataToJson', FormDataToJson);
    // FormDataToJson {username: 'admin'}
  };

  const onClickDataURLtoBlob = () => {
    const imgUrl =
      'data:image/gif;base64,R0lGODlhAwADAIAAAP///8zMzCH5BAAAAAAALAAAAAADAAMAAAIEBHIJBQA7';

    const DataURLtoBlob = dataURLtoBlob(imgUrl);
    console.log('DataURLtoBlob', DataURLtoBlob);
    // DataURLtoBlob Blob {size: 45, type: 'image/gif'}
  };

  const onClickBlobToFile = () => {
    const blobParts = ['<q id="a"><span id="b">hey!</span></q>']; // 一个包含单个字符串的数组
    const blob = new Blob(blobParts, { type: 'text/html' }); // 得到 blob

    const BlobToFile = blobToFile(blob, 'vtj.text');
    console.log('BlobToFile', BlobToFile);
    // DataURLtoBlob => Blob对象
  };
</script>

<style scoped></style>
