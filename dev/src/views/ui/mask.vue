<template>
  <XMask
    :menus="menus"
    :favorites="favorites"
    :menuAdapter="menuAdapter"
    home="/ui/mask"
    :tabs="20"
    :actions="actions"
    :disabled="false"
    theme
    @action-click="onActionClick">
    <div>ABC</div>
  </XMask>
</template>
<script lang="ts" setup>
  import { reactive, markRaw } from 'vue';
  import { XMask, type MenuDataItem, type ActionBarItems } from '@vtj/web';
  import { request } from '@vtj/web';
  import {
    Lock,
    SwitchButton,
    Bell,
    QuestionFilled
  } from '@element-plus/icons-vue';

  const menus = async () => {
    return await request({
      url: '/mock/menus.json'
    }).then((res) => res.data);
  };

  const favorites = async () => {
    return await request({
      url: '/mock/favorites.json'
    }).then((res) => res.data);
  };

  const menuAdapter = (menu: MenuDataItem) => {
    return {
      ...menu,
      url:
        !menu.type || menu.type === 'route'
          ? `/ui/mask/page?id=${menu.id}`
          : menu.url
    };
  };

  const actions: ActionBarItems = reactive([
    {
      icon: markRaw(Bell),
      badge: 0
    },
    {
      icon: markRaw(QuestionFilled)
    },
    {
      icon: markRaw(Lock)
    },
    {
      icon: markRaw(SwitchButton)
    }
  ]);

  setTimeout(() => {
    (actions[0] as any).badge = 100;
  }, 3000);

  const onActionClick = (action: any) => {
    console.log('onActionClick', action);
  };
</script>
