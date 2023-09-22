<template>
  <div>
    <XActionBar
      :items="items"
      mode="button"
      :disabled="disabled"
      @command="onCommand"></XActionBar>
  </div>
</template>
<script lang="ts" setup>
  import { XActionBar, ActionBarItems } from '@vtj/ui';
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
      label: '按钮一',
      icon: VtjIconPlus,
      tooltip: '提示信息内容'
    },
    {
      label: '按钮二',
      icon: VtjIconBug,
      menus,
      onCommand(item) {
        console.log('onCommand', item);
      }
    },
    '|',
    {
      label: '按钮三',
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

  const onCommand = (action, menu) => {
    console.log('onCommand', action, menu);
  };
</script>
