<template>
  <div class="v-about-widget">
    <div class="v-about-widget__logo">
      <img :src="logo" />
    </div>
    <div class="v-about-widget__name">VTJ.PRO</div>
    <div class="v-about-widget__version">版本：{{ version }}</div>
  </div>
</template>
<script lang="ts" setup>
  import logo from '../logo/logo.png';
  import { version } from '../../../version';

  defineOptions({
    name: 'AboutWidget'
  });
</script>
