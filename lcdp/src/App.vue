<template>
  <ElConfigProvider :locale="zhCn">
    <Suspense>
      <XMask
        :title="title"
        :logo="logo"
        :menus="menus"
        :disabled="disabled"
        :actions="actions"
        @action-click="onActionClick"
        theme></XMask>
    </Suspense>
  </ElConfigProvider>
</template>
<script setup lang="ts">
  //@ts-ignore
  import { Suspense } from 'vue';
  import { ElConfigProvider, ElMessage } from 'element-plus';
  import {
    XMask,
    useMask,
    Bell,
    Lock,
    SwitchButton,
    type ActionBarItems,
    type ActionProps
  } from '@vtj/web';
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
  import logo from './assets/logo.svg';
  const { disabled, title, menus } = useMask();

  const actions: ActionBarItems = [
    {
      name: 'message',
      icon: Bell,
      badge: 1
    },
    {
      name: 'lock',
      icon: Lock
    },
    {
      name: 'logout',
      icon: SwitchButton
    }
  ];

  const onActionClick = (action: ActionProps) => {
    ElMessage.success(`click: ${action.name}`);
  };
</script>
