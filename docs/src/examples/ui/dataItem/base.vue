<template>
  <div class="page">
    <XDataItem title="应用名称" :icon="icon"></XDataItem>

    <XDataItem
      @imageClick="onClick"
      @title-click="onTitleClick"
      :icon="Setting"
      image-src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
      image-height="100px"
      image-width="100%"
      title="占位内容加载失败"
      description="可通过lazy开启懒加载功能， 当图片滚动到可视范围内才会加载。 可通过 scroll-container 来设置滚动容器， 若未定义，则为最近一个 overflow 值为 auto 或 scroll 的父元素。"
      :action-bar-props="actionBarProps"
      @actionClick="onActionClick"
      @action-command="onActionCommand"
      split>
    </XDataItem>
  </div>
</template>
<script lang="ts" setup>
  import { Setting } from '@element-plus/icons-vue';
  import { XDataItem, type ActionBarItems } from '@vtj/ui';
  import { VtjIconPlus, VtjIconBug, VtjIconApi } from '@vtj/icons';

  const icon = {
    icon: Setting,
    color: '#fff',
    background: '#409eff',
    padding: 2,
    radius: 4,
    size: 30
  };

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
      tooltip: '提示信息内容',
      draggable: true,
      onDragstart: (d: any, e: any) => {
        console.log(d, e);
      }
    },
    {
      label: '按钮二',
      icon: VtjIconBug,
      menus,
      onCommand(item: any) {
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

  const actionBarProps = {
    items: items,
    mode: 'button'
  };

  const onClick = () => {
    console.log('clicked!');
  };

  const onTitleClick = () => {
    console.log('onTitleClick');
  };

  const onActionClick = (e: any) => {
    console.log('onActionClick', e);
  };

  const onActionCommand = (action: any, menu: any) => {
    console.log('onActionCommand', action, menu);
  };
</script>

<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
