<template>
  <div>
    <XCaptcha
      v-model="value"
      :src="src"
      :validate="validate"
      placeholder="1234"></XCaptcha>
    <XCaptcha :src="src" size="large"></XCaptcha>
    <XCaptcha :src="src" size="small"></XCaptcha>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { XCaptcha } from '@vtj/ui';

  const value = ref('');

  const src = () => {
    return (
      'https://sso-sit.newpearl.com/api/user/verifyImage.jpg?uuid=' + Date.now()
    );
  };

  const validate = () => {
    if (value.value === '1234') {
      return true;
    }
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
