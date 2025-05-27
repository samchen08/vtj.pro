import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'APopover',
    alias: 'Popover',
    label: '气泡卡片',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/popover-cn',
    props: [
      {
        name: 'content',
        label: 'content',
        title: '卡片内容',
        setters: 'StringSetter' //?? string|slot|VNode
      },
      {
        name: 'title',
        label: 'title',
        title: '卡片标题',
        setters: 'StringSetter' //?? string|slot|VNode
      },
      // 以下 API 为 Tooltip、Popconfirm、Popover 共享的 API。
      {
        name: 'align',
        label: 'align',
        title: '该值将合并到 placement 的配置中，设置参考 dom-align',
        setters: 'ObjectSetter'
      },
      {
        name: 'arrowPointAtCenter',
        label: 'arrowPointAtCenter',
        title: '箭头是否指向目标元素中心',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'autoAdjustOverflow',
        label: 'autoAdjustOverflow',
        title: '气泡被遮挡时自动调整位置',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'color',
        label: 'color',
        title: '背景颜色',
        setters: 'StringSetter'
      },
      {
        name: 'destroyTooltipOnHide',
        label: 'destroyTooltipOnHide',
        title: '隐藏后是否销毁 tooltip',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'getPopupContainer',
        label: 'getPopupContainer',
        title: '浮层渲染父节点，默认渲染到 body 上',
        setters: 'FunctionSetter' //?? 	(triggerNode: HTMLElement) => HTMLElement
      },
      {
        name: 'mouseEnterDelay',
        label: 'mouseEnterDelay',
        title: '鼠标移入后延时多少才显示 Tooltip，单位：秒',
        setters: 'NumberSetter',
        defaultValue: 0.1
      },
      {
        name: 'mouseLeaveDelayy',
        label: 'mouseLeaveDelayy',
        title: '鼠标移出后延时多少才显示 Tooltip，单位：秒',
        setters: 'NumberSetter',
        defaultValue: 0.1
      },
      {
        name: 'overlayClassName',
        label: 'overlayClassName',
        title: '卡片类名',
        setters: 'StringSetter'
      },
      {
        name: 'overlayStyle',
        label: 'overlayStyle',
        title: '卡片样式',
        setters: 'ObjectSetter' //?? object
      },
      {
        name: 'overlayInnerStyle',
        label: 'overlayInnerStyle',
        title: '卡片内容区域样式',
        setters: 'ObjectSetter' //?? object
      },
      {
        name: 'placement',
        label: 'placement',
        title: '气泡框位置',
        setters: 'SelectSetter',
        options: [
          'top',
          'left',
          'right',
          'bottom',
          'topLeft',
          'topRight',
          'bottomLeft',
          'bottomRight',
          'leftTop',
          'leftBottom',
          'rightTop',
          'rightBottom'
        ],
        defaultValue: 'top'
      },
      {
        name: 'trigger',
        label: 'trigger',
        title: '触发行为',
        setters: 'SelectSetter',
        options: ['hover', 'focus', 'click', 'contextmenu'],
        defaultValue: 'hover'
      },
      {
        name: 'open',
        label: 'open',
        title: '用于手动控制浮层显隐',
        setters: 'BooleanSetter',
        defaultValue: false
      }
    ],
    slots: ['default', 'content', 'title'],
    snippet: {
      props: {
        title: 'Title'
      },
      slot: 'content',
      children: [
        {
          name: 'p',
          slot: {
            name: 'content'
          },
          children: 'content'
        },
        {
          name: 'p',
          slot: {
            name: 'content'
          },
          children: 'content'
        },
        { name: 'AButton', props: { type: 'primary' }, children: 'Hover me' }
      ]
    }
  }
];
export default components;
