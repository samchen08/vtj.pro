import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ACarousel',
    alias: 'Carousel',
    label: '走马灯',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/carousel-cn',
    props: [
      {
        name: 'autoplay',
        label: 'autoplay',
        title: '是否自动切换',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'dotPosition',
        label: 'dotPosition',
        title: '面板指示点位置，可选 top bottom left right',
        setters: 'SelectSetter',
        options: ['top', 'bottom', 'left', 'right'],
        defaultValue: 'bottom'
      },
      {
        name: 'dots',
        label: 'dots',
        title: '是否显示面板指示点',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'dotsClass',
        label: 'dotsClass',
        title: '面板指示点类名',
        setters: 'StringSetter',
        defaultValue: 'slick-dots'
      },
      {
        name: 'easing',
        label: 'easing',
        title: '动画效果',
        setters: 'StringSetter',
        defaultValue: 'linear'
      },
      {
        name: 'effect',
        label: 'effect',
        title: '动画效果函数',
        setters: 'SelectSetter',
        options: ['scrollx', 'fade'],
        defaultValue: 'scrollx'
      },
      {
        name: 'afterChange',
        label: 'afterChange',
        title: '切换面板的回调',
        setters: 'FunctionSetter'
      },
      {
        name: 'beforeChange',
        label: 'beforeChange',
        title: '切换面板的回调',
        setters: 'FunctionSetter'
      },
      {
        name: 'arrows',
        label: 'arrows',
        setters: 'BooleanSetter',
        defaultValue: false
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'customPaging'
      },
      {
        name: 'prevArrow'
      },
      {
        name: 'nextArrow'
      }
    ],
    snippet: {
      props: {
        autoplay: true
      },
      children: [
        {
          name: 'div',
          children: [
            {
              name: 'h1',
              children: '1',
              props: {
                style: {
                  backgroundColor: '#364d79',
                  height: '200px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }
              }
            }
          ]
        },
        {
          name: 'div',
          children: [
            {
              name: 'h1',
              children: '2',
              props: {
                style: {
                  backgroundColor: '#364d79',
                  height: '200px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }
              }
            }
          ]
        },
        {
          name: 'div',
          children: [
            {
              name: 'h1',
              children: '3',
              props: {
                style: {
                  backgroundColor: '#364d79',
                  height: '200px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }
              }
            }
          ]
        },
        {
          name: 'div',
          children: [
            {
              name: 'h1',
              children: '4',
              props: {
                style: {
                  backgroundColor: '#364d79',
                  height: '200px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }
              }
            }
          ]
        }
      ]
    }
  }
];
export default components;
