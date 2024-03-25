import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ADivider',
    alias: 'Divider',
    label: '分割线',
    categoryId: 'layout',
    doc: 'https://www.antdv.com/components/divider-cn',
    props: [
      {
        name: 'dashed',
        label: 'dashed',
        title: '是否虚线',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'orientation',
        label: 'orientation',
        title: '分割线标题的位置',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'orientationMargin	',
        label: 'orientationMargin	',
        title:
          '标题和最近 left/right 边框之间的距离，去除了分割线，同时 orientation 必须为 left 或 right',
        setters: 'SelectSetter',
        options: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'plain',
        label: 'plain',
        title: '文字是否显示为普通正文样式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'type',
        label: 'type',
        title: '水平还是垂直类型',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal'],
        defaultValue: 'horizontal'
      }
    ],
    snippet: {
      props: {
        style: {
          width: '100%',
          height: '2px',
          backgroundColor: '#7cb305'
        }
      }
    }
  }
];

export default components;
