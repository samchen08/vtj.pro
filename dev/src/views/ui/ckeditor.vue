<template>
  <div style="height: 100%">
    <XCKEditor
      v-model="content"
      :uploader="uploader"
      :border="false"></XCKEditor>
    <hr />
    <XCKEditor v-model="content" :editable="false"></XCKEditor>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XCKEditor } from '@vtj/web';
  const content = ref('');

  const uploader = async (file: File) => {
    console.log('file', file);
    return 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';
  };
</script>

<style></style>
