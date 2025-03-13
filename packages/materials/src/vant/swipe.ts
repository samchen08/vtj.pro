import type { MaterialDescription } from '@vtj/core';

const Swipe: MaterialDescription[] = [
  {
    name: 'VanSwipe',
    alias: 'Swipe',
    label: '轮播',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/swipe',
    props: [
      {
        name: 'autoplay',
        title: '自动轮播间隔，单位为 ms',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'duration',
        title: '动画时长，单位为 ms',
        defaultValue: 500,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'initial-swipe',
        title: '初始位置索引值',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'width',
        title: '滑块宽度，单位为 px',
        defaultValue: 'auto',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'height',
        title: '滑块高度，单位为 px',
        defaultValue: 'auto',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'loop',
        title: '是否开启循环播放',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-indicators',
        title: '是否显示指示器',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'vertical',
        title: '是否为纵向滚动',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'touchable',
        title: '是否可以通过手势滑动',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'stop-propagation',
        title: '是否阻止滑动事件冒泡',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy-render',
        title: '是否延迟渲染未展示的轮播',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'indicator-color',
        title: '指示器颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      }
    ],
    events: [
      { name: 'change', params: ['index'] },
      { name: 'dragStart', params: ['data'] },
      { name: 'dragEnd', params: ['data'] }
    ],
    snippet: {
      props: {
        autoplay: '3000',
        'indicator-color': 'white',
        style: {
          color: '#fff',
          fontSize: '20px',
          lineHeight: '150px',
          textAlign: 'center',
          backgroundColor: '#39a9ed'
        }
      },
      children: [
        { name: 'VanSwipeItem', children: '1' },
        { name: 'VanSwipeItem', children: '2' },
        { name: 'VanSwipeItem', children: '3' }
      ]
    }
  },
  {
    name: 'VanSwipeItem',
    alias: 'SwipeItem',
    label: '轮播项',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/swipe',
    snippet: {
      props: {
        style: {
          color: '#fff',
          fontSize: '20px',
          lineHeight: '150px',
          textAlign: 'center',
          backgroundColor: '#39a9ed'
        }
      },
      children: '1'
    }
  }
];

export default Swipe;
