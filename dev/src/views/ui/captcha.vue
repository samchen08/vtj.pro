<template>
  <div>
    <XCaptcha v-model="value" :src="src" :validate="validate"></XCaptcha>
    <XCaptcha :src="src" size="large"></XCaptcha>
    <XCaptcha :src="src" size="small"></XCaptcha>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { XCaptcha } from '@vtj/web';

  const value = ref('');

  const src = () => {
    return (
      'https://sso-sit.newpearl.com/api/user/verifyImage.jpg?uuid=' + Date.now()
    );
  };

  const validate = () => {
    return false;
  };

  watch(value, (v) => {
    console.log('change', v);
  });
</script>

<style lang="scss" scoped>
  .x-captcha {
    margin-top: 20px;
  }
</style>
