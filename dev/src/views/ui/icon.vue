<template>
  <div>
    <hr />
    <div class="my-block" direction="row" :grow="false" border>
      <XIcon :icon="Menu" @click="handleClick"></XIcon>
      <XIcon :icon="Setting" @click="handleClick"></XIcon>
      <XIcon icon="vtj-icon-user"></XIcon>
      <XIcon :src="Logo"></XIcon>
      <XIcon :icon="Fixed"></XIcon>
    </div>
    <hr />
    <div class="my-block" direction="row" :grow="false" border>
      <XIcon size="small" :icon="Menu" @click="handleClick"></XIcon>
      <XIcon size="small" :icon="Setting" @click="handleClick"></XIcon>
      <XIcon size="small" icon="vtj-icon-user"></XIcon>
      <XIcon size="small" :src="Logo"></XIcon>
    </div>
    <hr />
    <div class="my-block" direction="row" :grow="false" border>
      <XIcon size="large" :icon="Menu" @click="handleClick"></XIcon>
      <XIcon size="large" :icon="Setting" @click="handleClick"></XIcon>
      <XIcon size="large" icon="vtj-icon-user"></XIcon>
      <XIcon size="large" :src="Logo"></XIcon>
    </div>
    <hr />
    <div class="my-block" direction="row" :grow="false" border>
      <XIcon :size="40" :icon="Menu" @click="handleClick"></XIcon>
      <XIcon :size="40" :icon="Setting" @click="handleClick"></XIcon>
      <XIcon :size="40" icon="vtj-icon-user"></XIcon>
      <XIcon :size="40" :src="Logo"></XIcon>
      <XIcon :size="40" :icon="vnodeIcon"></XIcon>
    </div>
    <hr />
  </div>
</template>
<script lang="ts" setup>
  import { h } from 'vue';
  import { XIcon, useIcon } from '@vtj/ui';
  import { Menu, Setting } from '@element-plus/icons-vue';
  import Logo from '@/assets/logo.png';
  import { Fixed } from '@vtj/icons';

  const vnodeIcon = h('span', { class: 'vnode-icon' });

  const handleClick = () => {
    console.log('clicked!');
  };
</script>

<style lang="scss" scoped>
  .my-block {
    color: cadetblue;
  }

  .vnode-icon {
    width: 12px;
    height: 12px;
    display: inline-block;
    background-color: aqua;
  }
</style>

<style lang="scss">
  .vnode-icon {
    width: 12px;
    height: 12px;
    display: inline-block;
    background-color: aqua;
    vertical-align: middle;
  }
</style>
