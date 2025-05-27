import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'APopconfirm',
    alias: 'Popconfirm',
    label: '气泡确认框',
    categoryId: 'feedback',
    doc: 'https://www.antdv.com/components/popconfirm-cn',
    props: [
      {
        name: 'cancelButtonProps',
        label: 'cancelButtonProps',
        title: 'cancel 按钮 props',
        setters: 'ObjectSetter' //?? ButtonProps
      },
      {
        name: 'cancelText',
        label: 'cancelText',
        title: '取消按钮文字',
        setters: 'StringSetter', //?? string|slot
        defaultValue: '取消'
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '点击 Popconfirm 子元素是否弹出气泡确认框',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'okButtonProps',
        label: 'okButtonProps',
        title: 'ok 按钮 props',
        setters: 'ObjectSetter' //?? ButtonProps
      },
      {
        name: 'okText',
        label: 'okText',
        title: '确认按钮文字',
        setters: 'StringSetter', //?? string|slot
        defaultValue: '确认'
      },
      {
        name: 'okType',
        label: 'okType',
        title: '确认按钮类型',
        setters: 'StringSetter',
        defaultValue: 'primary'
      },
      {
        name: 'showCancel',
        label: 'showCancel',
        title: '是否显示取消按钮',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'title',
        label: 'title',
        title: '确认框的描述',
        setters: 'StringSetter'
      },
      {
        name: 'description',
        label: 'description',
        title: '确认内容的详细描述',
        setters: 'StringSetter' //?? 	string|slot
      },
      {
        name: 'open ',
        label: 'open ',
        title: '是否显示',
        setters: 'BooleanSetter'
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
    events: ['cancel', 'confirm', 'openChange', 'update:open'],
    slots: [
      'default',
      'cancelButton',
      'cancelText',
      'icon',
      'okButton',
      'okText',
      'title',
      'description'
    ],
    snippet: {
      props: {
        title: 'Are you sure delete this task?',
        okText: 'yes',
        cancelText: 'No'
      },
      children: [{ name: 'a', children: '气泡确认框' }]
    }
  }
];
export default components;
