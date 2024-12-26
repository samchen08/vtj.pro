<template>
  <div>
    <XAction label="set" type="primary" @click="onCookieSet"> </XAction>
    <XAction label="get" type="primary" @click="onCookieGet"> </XAction>
    <XAction label="remover" type="primary" @click="onCookieRemove"> </XAction>
  </div>
</template>

<script setup lang="ts">
  import { XAction } from '@vtj/ui';
  import { cookie } from '@vtj/utils';

  const onCookieSet = () => {
    cookie.set('cookie-test', 'cookie-test-测试');
  };

  const onCookieGet = () => {
    const getValue = cookie.get('cookie-test');
    console.log('onCookieGet', getValue);
  };

  const onCookieRemove = () => {
    cookie.remove('cookie-test');
  };
</script>

<style scoped></style>
