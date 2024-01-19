<template>
  <div>
    <h3>storge</h3>
    <button @click="saveStorage">save</button>
    <button @click="getStorage">get</button>
  </div>
</template>
<script lang="ts" setup>
  import { storage } from '@vtj/web';

  const saveStorage = () => {
    storage.save('key', { value: 1 }, { type: 'local' });
  };

  const getStorage = () => {
    const value = storage.get('key', { type: 'local' });
    console.log('getStorage', value);
  };
</script>
