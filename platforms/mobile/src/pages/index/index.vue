<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }} </text>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { callExampleApi } from '@/api';
  import { ref } from 'vue';
  const title = ref('Hello');

  callExampleApi({
    id: 1
  })
    .then((res) => {
      console.log('success', res);
    })
    .catch((err) => {
      console.log('error', err);
    });
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
