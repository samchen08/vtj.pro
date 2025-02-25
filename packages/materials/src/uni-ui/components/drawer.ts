import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniDrawer',
  label: '抽屉侧滑菜单',
  categoryId: 'ext',
  props: [
    {
      name: 'mask',
      title: '是否显示遮罩',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'maskClick',
      title: '点击遮罩是否可以关闭抽屉',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'mode',
      title: 'Drawer滑出位置',
      defaultValue: 'left',
      setters: 'SelectSetter',
      options: ['left', 'right']
    },
    {
      name: 'width',
      title: 'Drawer 宽度',
      defaultValue: 220,
      setters: 'NumberSetter'
    }
  ],
  events: ['change'],
  snippet: {}
};

export default desc;
