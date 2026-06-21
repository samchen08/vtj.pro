<template>
  <div class="qr-code-demo">
    <h3>基础二维码</h3>
    <div class="demo-row">
      <XQrCode content="https://www.example.com"></XQrCode>
    </div>

    <h3>自定义尺寸与带过期</h3>
    <div class="demo-row">
      <XQrCode :content="dynamicContent" :size="150" :expired="10000" tip="二维码已失效，点击刷新"></XQrCode>
    </div>

    <h3>自定义二维码配置</h3>
    <div class="demo-row">
      <XQrCode
        content="https://github.com"
        :size="180"
        @draw="onDraw"
        @expired="onExpired"></XQrCode>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XQrCode } from '@vtj/ui';

  const dynamicContent = ref('https://www.example.com');
  setTimeout(() => {
    dynamicContent.value = 'https://vuejs.org';
  }, 5000);

  const onDraw = (url: string) => {
    console.log('二维码已生成:', url);
  };

  const onExpired = () => {
    console.log('二维码已过期');
  };
</script>
<style lang="scss" scoped>
  .qr-code-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .demo-row {
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
  }
</style>
