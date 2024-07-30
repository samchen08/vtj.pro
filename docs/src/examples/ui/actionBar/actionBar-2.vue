<template>
  <XActionBar
    :items="items"
    mode="icon"
    :disabled="disabled"
    @command="onCommand"></XActionBar>
</template>

<script setup lang="ts">
  import { XActionBar, type ActionBarItems } from '@vtj/ui';
  import { VtjIconBug, VtjIconApi, VtjIconPlus } from '@vtj/icons';

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

  const items: ActionBarItems = [
    {
      icon: VtjIconPlus,
      tooltip: '提示信息内容',
      draggable: true,
      onDragstart: (d: any, e: any) => {
        console.log(d, e);
      }
    },
    {
      icon: VtjIconBug,
      menus,
      onCommand(item: any) {
        console.log('onCommand', item);
      }
    },
    '|',
    {
      icon: VtjIconApi,
      badge: 1,
      onClick() {
        // alert('clicked!');
      }
    }
  ];

  const disabled = () => {
    return false;
  };

  const onCommand = (action: any, menu: any) => {
    console.log('onCommand', action, menu);
  };
</script>

<style scoped></style>
