<template>
  <div>
    <h3>storge</h3>
    <button @click="saveStorage">save</button>
    <button @click="getStorage">get</button>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { storage } from '@vtj/utils';

  const saveStorage = () => {
    storage.save('key', { value: 1 }, { type: 'local' });
  };

  const getStorage = () => {
    const value = storage.get('key', { type: 'local' });
    console.log('getStorage', value);
  };
</script>
