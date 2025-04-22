<template>
  <div>
    <textarea v-model="content" :rows="20" style="width: 100%"></textarea>
    <button @click="onParser">Parser</button>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { parseVue } from '@vtj/parser';

  const content = ref('');

  const onParser = async () => {
    const result = await parseVue({
      id: 'test',
      name: 'test',
      source: content.value
    });

    console.log(result);
  };
</script>
