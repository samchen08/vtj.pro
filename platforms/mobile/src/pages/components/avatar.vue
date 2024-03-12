<template>
  <view>
    <uni-section title="基础用法" type="line">
      <uni-card>
        <view>
          <XAvatar
            label="用户名称"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            :size="40"></XAvatar>
          <XAvatar label="用户名称" :size="40" background="blue"></XAvatar>
          <XAvatar
            circle
            label="用户名称"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            :size="40"></XAvatar>
          <XAvatar
            circle
            label="用户名称"
            :size="40"
            background="blue"></XAvatar>

          <XAvatar
            label="用户名称"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            :size="40"
            :badge="70"></XAvatar>

          <XAvatar
            label="用户名称"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            :size="40"
            :badge="{ text: 1, isDot: true }"></XAvatar>
        </view>
      </uni-card>
    </uni-section>
  </view>
</template>
<script lang="ts" setup>
  //   import { ref } from 'vue';
  import { XAvatar } from '@/mui';

  // https://img.yzcdn.cn/vant/cat.jpeg
</script>
