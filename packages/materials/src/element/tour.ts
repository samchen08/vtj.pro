import type { MaterialDescription } from '@vtj/core';

const Tour: MaterialDescription = {
  name: 'ElTour',
  label: '漫游式引导',

  doc: 'https://element-plus.org/zh-CN/component/tour.html',
  categoryId: 'data',
  package: 'element-plus',
  props: [
    {
      name: 'showArrow',
      label: 'showArrow',
      title: '是否显示箭头',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'placement',
      label: 'placement',
      title: '引导卡片相对于目标元素的位置',
      setters: 'SelectSetter',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end'
      ],
      defaultValue: 'bottom'
    },
    {
      name: 'contentStyle',
      label: 'contentStyle',
      title: '为content自定义样式',
      setters: 'ObjectSetter'
    },
    {
      name: 'mask',
      label: 'mask',
      title: '是否启用遮罩，通过自定义属性改变遮罩样式以及填充的颜色',
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
      name: 'modelValue',
      label: 'modelValue',
      title: '打开引导',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'current',
      label: 'current',
      title: '当前值',
      setters: 'NumberSetter'
    },
    {
      name: 'scroll-into-view-options',
      label: 'scroll-into-view-options',
      title: '是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数',
      setters: ['BooleanSetter', 'ObjectSetter'],
      defaultValue: { block: 'center' }
    },
    {
      name: 'z-index',
      label: 'z-index',
      title: 'Tour 的层级',
      setters: 'NumberSetter',
      defaultValue: 2001
    },
    {
      name: 'show-close',
      label: 'show-close',
      title: '是否显示关闭按钮',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'close-icon',
      label: 'close-icon',
      title: '自定义关闭图标',
      setters: 'IconSetter',
      defaultValue: ''
    },
    {
      name: 'close-on-press-escape',
      label: 'close-on-press-escape',
      title: '是否可以通过按下 ESC 关闭引导',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'target-area-clickable',
      label: 'target-area-clickable',
      title: '启用蒙层时，target 元素区域是否可以点击。',
      setters: 'BooleanSetter',
      defaultValue: true
    }
  ],
  slots: [
    { name: 'default' },
    { name: 'indicators', params: ['current', 'total'] }
  ],
  events: ['close', 'finish', 'change', 'update:modelValue', 'update:current'],
  snippet: {
    props: {
      modelValue: true
    },
    children: [
      {
        name: 'ElTourStep',
        props: {
          title: 'Center',
          description: 'Displayed in the center of screen.'
        }
      },
      {
        name: 'ElTourStep',
        props: {
          title: 'Center',
          description: 'Displayed in the center of screen.'
        }
      },
      {
        name: 'ElTourStep',
        props: {
          title: 'Center',
          description: 'Displayed in the center of screen.'
        }
      }
    ]
  }
};

const TourStep: MaterialDescription = {
  name: 'ElTourStep',
  label: '漫游式引导步',
  parentIncludes: ['ElTour'],
  doc: 'https://element-plus.org/zh-CN/component/tour.html',
  categoryId: 'data',
  package: 'element-plus',
  props: [
    {
      name: 'target',
      label: 'target',
      title: '获取引导卡片指向的元素， 为空时居中于屏幕。',
      setters: ['StringSetter', 'FunctionSetter'] //??
    },
    {
      name: 'showArrow',
      label: 'showArrow',
      title: '是否显示箭头',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'title',
      label: 'title',
      title: '标题',
      setters: 'StringSetter',
      defaultValue: '*'
    },
    {
      name: 'description',
      label: 'description',
      title: '主要描述部分',
      setters: 'StringSetter'
    },
    {
      name: 'placement',
      label: 'placement',
      title: '引导卡片相对于目标元素的位置',
      setters: 'SelectSetter',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end'
      ],
      defaultValue: 'bottom'
    },
    {
      name: 'contentStyle',
      label: 'contentStyle',
      title: '为content自定义样式',
      setters: 'ObjectSetter'
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
      name: 'nextButtonProps',
      label: 'nextButtonProps',
      title: '“下一步”按钮的属性',
      setters: 'ObjectSetter'
    },
    {
      name: 'prev-button-props',
      label: 'prev-button-props',
      title: '“上一步”按钮的属性',
      setters: 'ObjectSetter'
    },
    {
      name: 'scrollIntoViewOptions',
      label: 'scrollIntoViewOptions',
      title: '是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数',
      setters: ['BooleanSetter', 'ObjectSetter'] //??
    },
    {
      name: 'showClose',
      label: 'showClose',
      title: '是否显示关闭按钮',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'closeIcon',
      label: 'closeIcon',
      title: '自定义关闭图标',
      setters: ['IconSetter']
    }
  ],
  slots: [{ name: 'default' }, { name: 'header' }],
  events: ['close'],
  snippet: {
    props: {
      title: 'Center',
      description: 'Displayed in the center of screen.'
    }
  }
};

export default [Tour, TourStep];
