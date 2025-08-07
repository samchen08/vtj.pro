<template>
  <ElTour v-model="engine.state.tour">
    <ElTourStep
      target=".x-header__actions"
      title="创建页面"
      description="点击添加按钮可以新增页面"></ElTourStep>

    <ElTourStep
      target=".v-apps-region__top"
      title="应用级功能"
      placement="right"
      description="左侧应用功能模块依次有 页面管理、区块管理、组件库、模版库、大纲树、历史记录、API管理、应用设置、AI助手等辅助功能"></ElTourStep>

    <ElTourStep
      target=".v-apps-region-AI"
      title="AI助手"
      placement="right"
      description="AI辅助工具在此进入，支持文本、图片、设计稿生成代码"></ElTourStep>

    <ElTourStep
      target=".v-settings-region"
      title="组件设置区"
      placement="left"
      description="在这里可以对选中的页面或组件进行个性化设置"></ElTourStep>

    <ElTourStep
      target=".v-toolbar-region"
      title="工具区"
      placement="bottom"
      description="工具区可对设计视口进行更换和快捷操控历史记录等辅助工具"></ElTourStep>

    <ElTourStep
      target=".v-tabs__actions"
      title="视图切换"
      placement="bottom"
      description="可切换当前页面显示设计视图、DSL视图、源码视图"></ElTourStep>

    <ElTourStep
      target=".v-actions-widget"
      title="操作区"
      placement="bottom"
      description="操作区支持锁定、预览、刷新、设置快捷入口、AI助手快捷入口、出码等操作"></ElTourStep>

    <ElTourStep
      target=".v-switcher-widget"
      title="应用预览"
      placement="bottom"
      description="制作完成后可点击此按钮点击此处预览应用真实效果"></ElTourStep>
  </ElTour>
</template>
<script lang="ts" setup>
  import { ElTour, ElTourStep } from 'element-plus';
  import { useEngine } from '../framework';
  const engine = useEngine();
</script>
