<template>
  <view>
    <XImageViewer v-model="visible" :src="src"></XImageViewer>
  </view>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XImageViewer } from '@/mui';
  const visible = ref(true);
  const src = 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg';
</script>
