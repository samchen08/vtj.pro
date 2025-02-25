import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription[] = [
  {
    name: 'Swiper',
    label: '滑块视图容器',
    categoryId: 'container',
    props: [
      {
        name: 'indicator-dots',
        title: '是否显示面板指示点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'indicator-color',
        title: '指示点颜色',
        defaultValue: 'rgba(0, 0, 0, .3)',
        setters: 'ColorSetter'
      },
      {
        name: 'indicator-active-color',
        title: '当前选中的指示点颜色',
        defaultValue: '#000000',
        setters: 'ColorSetter'
      },
      {
        name: 'active-class',
        title: 'swiper-item 可见时的 class',
        setters: 'StringSetter'
      },
      {
        name: 'changing-class',
        title:
          'acceleration 设置为 true 时且处于滑动过程中，中间若干屏处于可见时的class',
        setters: 'StringSetter'
      },
      {
        name: 'autoplay',
        title: '是否自动切换',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'current',
        title: '当前所在滑块的 index',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'current-item-id',
        title: '当前所在滑块的 item-id ，不能与 current 被同时指定',
        setters: 'StringSetter'
      },
      {
        name: 'interval',
        title: '自动切换时间间隔',
        defaultValue: 5000,
        setters: 'NumberSetter'
      },
      {
        name: 'duration',
        title: '滑动动画时长',
        defaultValue: 500,
        setters: 'NumberSetter'
      },
      {
        name: 'circular',
        title: '是否采用衔接滑动，即播放到末尾后重新回到开头',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'vertical',
        title: '滑动方向是否为纵向',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'previous-margin',
        title: '前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值',
        defaultValue: '0px',
        setters: 'StringSetter'
      },
      {
        name: 'next-margin',
        title: '后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值',
        defaultValue: '0px',
        setters: 'StringSetter'
      },
      {
        name: 'acceleration',
        title: '当开启时，会根据滑动速度，连续滑动多屏',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disable-programmatic-animation',
        title: '是否禁用代码变动触发 swiper 切换时使用动画',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'display-multiple-items',
        title: '同时显示的滑块数量',
        defaultValue: 1,
        setters: 'NumberSetter'
      },
      {
        name: 'skip-hidden-item-layout',
        title:
          '是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disable-touch',
        title: '是否禁止用户 touch 操作',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'touchable',
        title: '是否监听用户的触摸事件，只在初始化时有效，不能动态变更',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'easing-function',
        title: '指定 swiper 切换缓动动画类型',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: [
          'default',
          'linear',
          'easeInCubic',
          'easeOutCubic',
          'easeInOutCubic'
        ]
      }
    ],
    events: ['change', 'transition', 'animationfinish'],
    snippet: {
      props: {
        autoplay: true,
        indicatorDots: true,
        circular: true,
        style: {
          color: '#fff',
          height: '200px'
        }
      },
      children: [
        {
          name: 'SwiperItem',
          props: {
            style: {
              background: '#f76260',
              textAlign: 'center',
              color: '#fff',
              height: '200px',
              lineHeight: '200px'
            }
          },
          children: 'A'
        },
        {
          name: 'SwiperItem',
          props: {
            style: {
              background: '#09bb07',
              textAlign: 'center',
              color: '#fff',
              height: '200px',
              lineHeight: '200px'
            }
          },
          children: 'B'
        },
        {
          name: 'SwiperItem',
          props: {
            style: {
              background: '#007aff',
              textAlign: 'center',
              color: '#fff',
              height: '200px',
              lineHeight: '200px'
            }
          },
          children: 'C'
        }
      ]
    }
  },
  {
    name: 'SwiperItem',
    label: '滑块视图容器',
    parentIncludes: ['Swiper'],
    categoryId: 'container',
    props: [
      {
        name: 'item-id',
        title: '该 swiper-item 的标识符',
        setters: 'InputSetter'
      }
    ],
    snippet: {
      children: [
        {
          name: 'View',
          props: { style: { height: '300px', background: 'green' } },
          children: 'A'
        }
      ]
    }
  }
];

export default desc;
