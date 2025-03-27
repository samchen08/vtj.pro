<template>
  <div>Client: {{ info }}</div>
</template>
<script lang="ts" setup>
  import { getClientInfo } from '@vtj/utils';

  const info = getClientInfo();
</script>
