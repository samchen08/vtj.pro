<template>
  <div>
    <Editor dark v-model="content"></Editor>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Editor } from '@vtj/pro';

  const content = ref();

  setTimeout(() => {
    content.value = `(function(){})`;
  }, 3000);
</script>
