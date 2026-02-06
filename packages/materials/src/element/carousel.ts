import type { MaterialDescription } from '@vtj/core';
const Carousel: MaterialDescription[] = [
  {
    name: 'ElCarousel',
    label: '走马灯',

    categoryId: 'data',
    doc: 'https://element-plus.org/zh-CN/component/carousel.html',
    childIncludes: ['ElCarouselItem'],
    package: 'element-plus',
    props: [
      {
        name: 'height',
        title: 'carousel 的高度',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'initialIndex',
        title: '初始状态激活的幻灯片的索引，从 0 开始',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'trigger',
        title: '指示器的触发方式',
        defaultValue: 'hover',
        options: ['hover', 'click'],
        setters: 'SelectSetter'
      },
      {
        name: 'autoplay',
        title: '是否自动切换',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'interval',
        title: '自动切换的时间间隔，单位为毫秒',
        defaultValue: 3000,
        setters: 'NumberSetter'
      },
      {
        name: 'indicatorPosition',
        title: '指示器的位置',
        defaultValue: '',
        options: ['', 'outside', 'none'],
        label: '指示器',
        setters: 'InputSetter'
      },
      {
        name: 'arrow',
        title: '切换箭头的显示时机',
        defaultValue: 'hover',
        options: ['always', 'hover', 'never'],
        setters: 'SelectSetter'
      },
      {
        name: 'type',
        title: 'carousel 的类型',
        defaultValue: '',
        options: ['', 'card'],
        setters: 'SelectSetter'
      },
      {
        name: 'cardScale',
        title: '当 type 为 card时，二级卡的缩放大小',
        defaultValue: 0.83,
        setters: 'NumberSetter'
      },
      {
        name: 'loop',
        title: '是否循环显示',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'direction',
        title: '展示的方向',
        defaultValue: 'horizontal',
        options: ['horizontal', 'vertical'],
        setters: 'SelectSetter'
      },
      {
        name: 'pauseOnHover',
        title: '鼠标悬浮时暂停自动切换',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'motionBlur',
        title: '添加动态模糊以给走马灯注入活力和流畅性',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['change'],
    slots: ['default'],
    snippet: {
      props: {
        height: '300px',
        style: {
          width: '100%'
        }
      },
      children: [
        {
          name: 'ElCarouselItem',
          props: {
            style: {
              width: '100%'
            }
          },
          children: [
            {
              name: 'component',
              props: {
                is: 'img',
                style: {
                  width: '100%',
                  height: '300px'
                },
                src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              }
            }
          ],
          directives: [
            {
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value: '3'
              }
            }
          ]
        }
      ]
    }
  },
  {
    name: 'ElCarouselItem',
    label: '走马灯子项',

    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'name',
        title: '幻灯片的名字',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'label',
        title: '该幻灯片所对应指示器的文本',
        defaultValue: '',
        setters: 'InputSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        style: {
          width: '100%'
        }
      },
      children: [
        {
          name: 'component',
          props: {
            is: 'img',
            style: {
              width: '100%',
              height: '300px'
            },
            src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          }
        }
      ]
    }
  }
];

export default Carousel;
