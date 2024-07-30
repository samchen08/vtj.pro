<template>
  <XAction
    :icon="VtjIconBug"
    badge="33"
    label="操作按钮"
    type="primary"
    :menus="menus"
    @command="onCommand">
  </XAction>

  <XAction
    :icon="VtjIconBug"
    badge="22"
    label="操作按钮"
    size="large"
    :menus="menus"
    @command="onCommand">
  </XAction>

  <XAction
    mode="icon"
    :icon="VtjIconBug"
    type="primary"
    badge="11"
    :menus="menus"
    @command="onCommand">
  </XAction>

  <XAction
    mode="icon"
    :icon="VtjIconBug"
    type="danger"
    :menus="menus"
    @command="onCommand">
  </XAction>
</template>

<script setup lang="ts">
  import { XAction } from '@vtj/ui';
  import { VtjIconBug } from '@vtj/icons';

  const menus = [
    {
      command: 'a',
      label: '菜单 一'
    },
    {
      command: 'a1',
      label: '菜单 二'
    },
    {
      command: 'b',
      label: '菜单 三',
      divided: true,
      icon: VtjIconBug
    }
  ];

  const onCommand = (item: any) => {
    console.log('command item', item);
  };
</script>

<style scoped></style>
