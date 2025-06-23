import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ATour',
    alias: 'Tour',
    label: '漫游式引导',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/tour-cn',
    props: [
      {
        name: 'arrow',
        label: 'arrow',
        title: '是否显示箭头，包含是否指向元素中心的配置',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: true
      },
      {
        name: 'placement',
        label: 'placement',
        title: '引导卡片相对于目标元素的位置',
        setters: 'SelectSetter',
        options: [
          'left',
          'leftTop',
          'leftBottom',
          'right',
          'rightTop',
          'rightBottom',
          'top',
          'topLeft',
          'topRight',
          'bottom',
          'bottomLeft',
          'bottomRight'
        ],
        defaultValue: 'bottom	'
      },
      {
        name: 'mask',
        label: 'mask',
        title: '是否启用蒙层，也可传入配置改变蒙层样式和填充色',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: true
      },
      {
        name: 'type',
        label: 'type',
        title: '类型，影响底色与文字颜色',
        setters: 'SelectSetter',
        options: ['default', 'primary'],
        defaultValue: 'default'
      },
      {
        name: 'open',
        label: 'open',
        title: '打开引导',
        setters: 'BooleanSetter'
      },
      {
        name: 'current',
        label: 'current',
        title: '当前处于哪一步',
        setters: 'NumberSetter'
      },
      {
        name: 'scrollIntoViewOptions',
        label: 'scrollIntoViewOptions',
        title:
          '是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数',
        setters: ['BooleanSetter', 'SelectSetter'], //?? boolean | ScrollIntoViewOptions
        options: ['ScrollIntoViewOptions'],
        defaultValue: true
      },
      {
        name: 'zIndex',
        label: 'zIndex',
        title: 'Tour 的层级',
        setters: 'NumberSetter',
        defaultValue: 1001
      },
      {
        name: 'steps',
        label: 'steps',
        title: 'Tour 的数据',
        setters: 'ArraySetter'
      }
    ],
    events: ['close', 'finish', 'change', 'update:current'],
    slots: ['default', 'indicatorsRender'],
    snippet: {
      props: {
        open: true,
        current: 1,
        steps: [
          {
            title: 'Center',
            description: 'Displayed in the center of screen.',
            target: null
          },
          {
            title: 'Center',
            description: 'On the right of target.',
            target: null
          },
          {
            title: 'Center',
            description: 'On the top of target.',
            target: null
          }
        ]
      }
    }
  },
  {
    name: 'ATourSteps ',
    alias: 'TourSteps',
    label: '漫游式引导步',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/tour-cn',
    props: [
      {
        name: 'target',
        label: 'target',
        title: '获取引导卡片指向的元素，为空时居中于屏幕',
        setters: ['FunctionSetter', 'StringSetter']
      },
      {
        name: 'arrow',
        label: 'arrow',
        title: '是否显示箭头，包含是否指向元素中心的配置',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: true
      },
      {
        name: 'placement',
        label: 'placement',
        title: '引导卡片相对于目标元素的位置',
        setters: 'SelectSetter',
        options: [
          'left',
          'leftTop',
          'leftBottom',
          'right',
          'rightTop',
          'rightBottom',
          'top',
          'topLeft',
          'topRight',
          'bottom',
          'bottomLeft',
          'bottomRight',
          'bottom'
        ]
      },
      {
        name: 'mask',
        label: 'mask',
        title:
          '是否启用蒙层，也可传入配置改变蒙层样式和填充色，默认跟随 Tour 的 mask 属性',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: true
      },
      {
        name: 'type',
        label: 'type',
        title: '类型，影响底色与文字颜色',
        setters: 'SelectSetter',
        options: ['default', 'primary'],
        defaultValue: 'default'
      },
      {
        name: 'nextButtonProps',
        label: 'nextButtonProps',
        title: '下一步按钮的属性',
        setters: 'ObjectSetter'
      },
      {
        name: 'prevButtonProps',
        label: 'prevButtonProps',
        title: '上一步按钮的属性',
        setters: 'ObjectSetter'
      },
      {
        name: 'scrollIntoViewOptions',
        label: 'scrollIntoViewOptions',
        title:
          '是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数，默认跟随 Tour 的 scrollIntoViewOptions 属性',
        setters: ['BooleanSetter', 'SelectSetter'], //?? boolean | ScrollIntoViewOptions
        options: ['ScrollIntoViewOptions'],
        defaultValue: true
      }
    ],
    events: ['close'],
    slots: ['default', 'cover', 'title', 'description']
  }
];
export default components;
