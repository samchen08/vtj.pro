import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription[] = [
  {
    name: 'AAnchor',
    alias: 'Anchor',
    label: '锚点',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/anchor-cn',
    props: [
      {
        name: 'affix',
        label: 'affix',
        title: '固定模式',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'bounds',
        label: 'bounds',
        title: '锚点区域边界',
        setters: 'NumberSetter',
        defaultValue: 5
      },
      {
        name: 'getContainer',
        label: 'getContainer',
        title: '指定滚动的容器',
        setters: 'FunctionSetter',
        defaultValue: {
          type: 'Function',
          value: '() => window'
        }
      },
      {
        name: 'getCurrentAnchor',
        label: 'getCurrentAnchor',
        title: '自定义高亮的锚点',
        setters: 'FunctionSetter'
      },
      {
        name: 'offsetBottom',
        label: 'offsetBottom',
        title: '距离窗口底部达到指定偏移量后触发',
        setters: 'NumberSetter'
      },
      {
        name: 'offsetTop',
        label: 'offsetTop',
        title: '距离窗口顶部达到指定偏移量后触发',
        setters: 'NumberSetter'
      },
      {
        name: 'showInkInFixed',
        label: 'showInkInFixed',
        title: ':affix="false" 时是否显示小方块',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'targetOffset',
        label: 'targetOffset',
        title: '锚点滚动偏移量，默认与 offsetTop 相同',
        setters: 'NumberSetter'
      },
      {
        name: 'wrapperClass',
        label: 'wrapperClass',
        title: '容器的类名',
        setters: 'StringSetter'
      },
      {
        name: 'wrapperStyle',
        label: 'wrapperStyle',
        title: '容器样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'items',
        label: 'items',
        title: '数据化配置选项内容，支持通过 children 嵌套',
        setters: 'ArraySetter'
      },
      {
        name: 'direction',
        label: 'direction',
        title: '设置导航方向',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal'],
        defaultValue: 'vertical'
      }
    ],
    slots: ['default', 'customTitle'],
    snippet: {
      props: {
        direction: 'horizontal',
        items: [
          {
            key: 'horizontally-part-1',
            href: '#horizontally-part-1',
            title: 'Part 1'
          },
          {
            key: 'horizontally-part-2',
            href: '#horizontally-part-2',
            title: 'Part 2'
          },
          {
            key: 'horizontally-part-3',
            href: '#horizontally-part-3',
            title: 'Part 3'
          },
          {
            key: 'horizontally-part-4',
            href: '#horizontally-part-4',
            title: 'Part 4'
          },
          {
            key: 'horizontally-part-5',
            href: '#horizontally-part-5',
            title: 'Part 5'
          },
          {
            key: 'horizontally-part-6',
            href: '#horizontally-part-6',
            title: 'Part 6'
          }
        ]
      }
    }
  }
];
export default components;
