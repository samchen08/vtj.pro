import { ComponentDescription } from '@vtj/engine';
const Carousel: ComponentDescription[] = [
  {
    name: 'ElCarousel',
    title: '走马灯',

    categoryId: 'data',
    doc: 'https://element-plus.org/zh-CN/component/carousel.html',
    childIncludes: ['ElCarouselItem'],
    package: 'element-plus',
    props: [
      {
        name: 'height',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'initialIndex',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'trigger',
        defaultValue: 'hover',
        options: ['hover', 'click'],
        setters: 'SelectSetter'
      },
      {
        name: 'autoplay',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'interval',
        defaultValue: 3000,
        setters: 'NumberSetter'
      },
      {
        name: 'indicatorPosition',
        defaultValue: '',
        options: ['outside', 'none'],
        label: '指示器',
        setters: 'InputSetter'
      },
      {
        name: 'arrow',
        defaultValue: 'hover',
        options: ['always', 'hover', 'never'],
        setters: 'SelectSetter'
      },
      {
        name: 'type',
        defaultValue: '',
        options: ['', 'card'],
        setters: 'SelectSetter'
      },
      {
        name: 'loop',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'direction',
        defaultValue: 'horizontal',
        options: ['horizontal', 'vertical'],
        setters: 'SelectSetter'
      },
      {
        name: 'pauseOnHover',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: ['change'],
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
    title: '走马灯子项',

    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'label',
        defaultValue: '',
        setters: 'InputSetter'
      }
    ],
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
