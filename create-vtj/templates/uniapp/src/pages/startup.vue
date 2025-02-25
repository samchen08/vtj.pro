<template>
  <view class="container">
    <Startup class="starup"></Startup>
  </view>
</template>
<script lang="ts" setup>
  import { Startup, useProvider } from '@vtj/uni-app';
  const provider = useProvider();

  console.log(provider);
</script>
<style lang="scss" scoped>
  .container {
    height: 100%;
    padding: 20px;
  }
</style>
