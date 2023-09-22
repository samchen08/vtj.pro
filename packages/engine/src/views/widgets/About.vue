<template>
  <div class="vtj-about">
    <div class="vtj-about__logo">
      <ElBadge :value="version">
        <img :src="logo" />
      </ElBadge>
    </div>
    <div class="vtj-about__name">
      <h3>VTJEngine</h3>
    </div>
    <div class="vtj-about__footer">
      <ElLink href="http://vtj.pro" type="primary" target="_blank">
        http://vtj.pro
      </ElLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
  // import { version } from '../../../package.json';
  import logo from '../../config/logo.png';
  import { ElBadge, ElLink } from 'element-plus';
  import { version } from '../../version';
</script>
<style lang="scss">
  .vtj-about {
    padding: 10px;
    text-align: center;
  }
  .vtj-about__logo {
    width: 120px;
    height: 120px;
    margin: auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .vtj-about__name {
    margin-top: 10px;
    h3 {
      padding: 0 10px;
      margin: 0;
      font-size: 20px;
    }
  }
  .vtj-about__footer {
    text-align: center;
    border-top: 1px solid #eee;
    padding-top: 10px;
    margin-top: 20px;
  }
</style>
