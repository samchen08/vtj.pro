import type { MaterialDescription } from '@vtj/core';

const NavBar: MaterialDescription = {
  name: 'VanNavBar',
  alias: 'NavBar',
  label: '导航栏',
  categoryId: 'nav',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/nav-bar',
  props: [
    {
      name: 'title',
      title: '标题',
      defaultValue: '""',
      setters: 'StringSetter'
    },
    {
      name: 'left-text',
      title: '左侧文案',
      defaultValue: '""',
      setters: 'StringSetter'
    },
    {
      name: 'right-text',
      title: '右侧文案',
      defaultValue: '""',
      setters: 'StringSetter'
    },
    {
      name: 'left-disabled',
      title: '是否禁用左侧按钮，禁用时透明度降低，且无法点击',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'right-disabled',
      title: '是否禁用右侧按钮，禁用时透明度降低，且无法点击',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'left-arrow',
      title: '是否显示左侧箭头',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'border',
      title: '是否显示下边框',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'fixed',
      title: '是否固定在顶部',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'placeholder',
      title: '固定在顶部时，是否在标签位置生成一个等高的占位元素',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'z-index',
      title: '导航栏 z-index',
      defaultValue: 1,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'safe-area-inset-top',
      title: '是否开启顶部安全区适配',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'clickable',
      title: '是否开启两侧按钮的点击反馈',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: [
    { name: 'clickLeft', params: ['event'] },
    { name: 'clickRight', params: ['event'] }
  ],
  slots: ['title', 'left', 'right'],
  snippet: {
    props: {
      title: ' 标题'
    }
  }
};

export default NavBar;
