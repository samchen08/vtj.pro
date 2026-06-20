<template>
  <div class="icon-demo">
    <h3>基础图标（默认尺寸 inherit）</h3>
    <div class="demo-row">
      <XIcon :icon="VtjIconBug"></XIcon>
      <XIcon :icon="VtjIconSetting"></XIcon>
      <XIcon :icon="VtjIconUser"></XIcon>
      <XIcon :icon="VtjIconSearch"></XIcon>
      <XIcon :icon="VtjIconPlus"></XIcon>
      <XIcon :icon="VtjIconEdit"></XIcon>
    </div>

    <h3>尺寸</h3>
    <div class="demo-row">
      <XIcon :icon="VtjIconBug" size="small"></XIcon>
      <XIcon :icon="VtjIconBug" size="default"></XIcon>
      <XIcon :icon="VtjIconBug" size="large"></XIcon>
      <XIcon :icon="VtjIconBug" :size="32"></XIcon>
    </div>

    <h3>颜色</h3>
    <div class="demo-row">
      <XIcon :icon="VtjIconBug" color="#409EFF"></XIcon>
      <XIcon :icon="VtjIconBug" color="#67C23A"></XIcon>
      <XIcon :icon="VtjIconBug" color="#E6A23C"></XIcon>
      <XIcon :icon="VtjIconBug" color="#F56C6C"></XIcon>
    </div>

    <h3>图片图标</h3>
    <div class="demo-row">
      <XIcon :src="Logo"></XIcon>
    </div>

    <h3>背景色与圆角</h3>
    <div class="demo-row">
      <XIcon :icon="VtjIconBug" background="#ecf5ff" :padding="6" :radius="4"></XIcon>
      <XIcon :icon="VtjIconSetting" background="#fef0f0" :padding="6" :radius="4"></XIcon>
    </div>

    <h3>hover 效果</h3>
    <div class="demo-row">
      <XIcon :icon="VtjIconBug" hover-effect color="#409EFF"></XIcon>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { XIcon } from '@vtj/ui';
  import { VtjIconBug, VtjIconSetting, VtjIconUser, VtjIconSearch, VtjIconPlus, VtjIconEdit } from '@vtj/icons';
  import Logo from '@/assets/logo.png';
</script>
<style lang="scss" scoped>
  .icon-demo {
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
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
  }
</style>
