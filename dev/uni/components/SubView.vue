<template>
  <button>button-text</button>
  <Button>ButtonText</Button>
</template>
<script lang="ts" setup>
  import { getCurrentInstance, onMounted } from 'vue';
  const instance = getCurrentInstance();

  console.log('instance', instance?.appContext.app);
</script>
