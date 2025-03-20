<template>
  <view class="container">
    <Startup class="starup"></Startup>
  </view>
</template>
<script lang="ts" setup>
  import { useProvider } from '@vtj/uni-app';
  import Startup from '../components/startup.vue';
  const provider = useProvider();

  console.log(provider);
</script>
<style lang="scss" scoped>
  .container {
    height: 100%;
    padding: 20px;
  }
</style>
