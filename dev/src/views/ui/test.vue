<template>
  <XTest v-model="v1" v-model:sync-prop="v2"></XTest>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XTest } from '@vtj/web';

  const v1 = ref('v1');
  const v2 = ref('v2');
</script>
