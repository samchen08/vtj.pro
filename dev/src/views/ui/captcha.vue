<template>
  <div class="captcha-demo">
    <h3>基础用法</h3>
    <div class="demo-row">
      <XCaptcha :src="getCaptchaImage" v-model="value1"></XCaptcha>
    </div>

    <h3>自定义长度与占位符</h3>
    <div class="demo-row">
      <XCaptcha
        :src="getCaptchaImage"
        v-model="value2"
        :maxlength="6"
        placeholder="请输入6位验证码"></XCaptcha>
    </div>

    <h3>自定义验证图片源</h3>
    <div class="demo-row">
      <XCaptcha
        v-model="value3"
        :src="getCaptchaImage"
        :validate="validateCaptcha"></XCaptcha>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XCaptcha } from '@vtj/ui';

  const value1 = ref('');
  const value2 = ref('');
  const value3 = ref('');

  const getCaptchaImage = async () => {
    return `https://picsum.photos/100/40?t=${Date.now()}`;
  };

  const validateCaptcha = async (value: string) => {
    return value === '1234';
  };
</script>
<style lang="scss" scoped>
  .captcha-demo {
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
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 10px;
      max-width: 400px;
    }
  }
</style>
