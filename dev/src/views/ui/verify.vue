<template>
  <div>
    <XVerify :api="api" size="large"></XVerify>
    <XVerify :api="api"></XVerify>
    <XVerify :api="api" size="small"></XVerify>
  </div>
</template>
<script lang="ts" setup>
  import { XVerify } from '@vtj/web';

  const api = async () => {
    return true;
  };
</script>
