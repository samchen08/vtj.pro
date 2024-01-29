<template>
  <XPanel>{{ title }} this is a example</XPanel>
</template>
<script lang="ts" setup>
  import { XPanel } from '@vtj/ui';
  import { ref } from 'vue';
  const title = ref('hello! ');
</script>
