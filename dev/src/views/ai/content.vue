<template>
  <div>
    <Editor dark :model-value="code" lang="html" height="800px"></Editor>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Editor } from '@vtj/pro';
  import res from './response.json';

  const code = ref('');

  code.value = res.data.choices[0].message.content;
</script>
