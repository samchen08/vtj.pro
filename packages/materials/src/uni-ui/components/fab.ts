import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniFab',
  label: '悬浮按钮',
  categoryId: 'ext',
  props: [
    {
      name: 'pattern',
      title: '可选样式配置项',
      setters: 'ObjectSetter'
    },
    {
      name: 'horizontal',
      title: '水平对齐方式',
      defaultValue: 'left',
      setters: 'SelectSetter',
      options: ['left', 'right']
    },
    {
      name: 'vertical',
      title: '垂直对齐方式',
      defaultValue: 'bottom',
      setters: 'SelectSetter',
      options: ['bottom', 'top']
    },
    {
      name: 'direction',
      title: '展开菜单显示方式',
      defaultValue: 'horizontal',
      setters: 'SelectSetter',
      options: ['horizontal', 'vertical']
    },
    {
      name: 'popMenu',
      title: '是否使用弹出菜单',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'content',
      title: '展开菜单内容配置项',
      setters: 'ArraySetter'
    }
  ],
  events: ['trigger', 'fabClick'],
  snippet: {
    props: {
      horizontal: 'left',
      vertical: 'bottom',
      direction: 'horizontal',
      pattern: {
        color: '#7A7E83',
        backgroundColor: '#fff',
        selectedColor: '#007AFF',
        buttonColor: '#007AFF',
        iconColor: '#fff'
      },
      content: [
        {
          iconPath:
            'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          selectedIconPath:
            'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          text: '相册',
          active: false
        },
        {
          iconPath:
            'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          selectedIconPath:
            'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          text: '首页',
          active: false
        },
        {
          iconPath:
            'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          selectedIconPath:
            'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          text: '收藏',
          active: false
        }
      ]
    }
  }
};

export default desc;
