import type { MaterialDescription } from '@vtj/core';

const Calendar: MaterialDescription = {
  name: 'VanCalendar',
  alias: 'Calendar',
  label: '日历',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/calendar',
  props: [
    {
      name: 'type',
      title: '选择类型',
      defaultValue: 'single',
      setters: 'SelectSetter',
      options: ['single', 'multiple', 'range']
    },
    {
      name: 'switch-mode',
      title: '切换模式',
      defaultValue: 'none',
      setters: 'SelectSetter',
      options: ['none', 'month', 'year-month']
    },
    {
      name: 'title',
      title: '日历标题',
      defaultValue: '日期选择',
      setters: 'StringSetter'
    },
    {
      name: 'color',
      title: '主题色，对底部按钮和选中日期生效',
      defaultValue: '#1989fa',
      setters: 'StringSetter'
    },
    {
      name: 'min-date',
      title: '可选择的最小日期',
      defaultValue: '',
      setters: 'ExpressionSetter'
    },
    {
      name: 'max-date',
      title: '可选择的最大日期',
      defaultValue: '',
      setters: 'ExpressionSetter'
    },
    {
      name: 'default-date',
      title:
        '默认选中的日期，type 为 multiple 或 range 时为数组，传入 null 表示默认不选择',
      setters: ['ExpressionSetter', 'ArraySetter', 'StringSetter']
    },
    {
      name: 'row-height',
      title: '日期行高',
      defaultValue: 64,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'formatter',
      title: '日期格式化函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'poppable',
      title: '是否以弹层的形式展示日历',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'lazy-render',
      title: '是否只渲染可视区域的内容',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-mark',
      title: '是否显示月份背景水印',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-title',
      title: '是否展示日历标题',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-subtitle',
      title: '是否展示日历副标题（年月）',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-confirm',
      title: '是否展示确认按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'readonly',
      title: '是否为只读状态，只读状态下不能选择日期',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'confirmText',
      title: '确认按钮的文字',
      defaultValue: '确定',
      setters: 'StringSetter'
    },
    {
      name: 'confirm-disabled-text',
      title: '确认按钮处于禁用状态时的文字',
      defaultValue: '确定',
      setters: 'StringSetter'
    },
    {
      name: 'first-day-of-week',
      title: '设置周起始日',
      defaultValue: 0,
      setters: 'SelectSetter',
      options: [
        {
          label: '0',
          value: 0
        },
        {
          label: '1',
          value: 1
        },
        {
          label: '2',
          value: 2
        },
        {
          label: '3',
          value: 3
        },
        {
          label: '4',
          value: 4
        },
        {
          label: '5',
          value: 5
        },
        {
          label: '6',
          value: 6
        }
      ]
    },
    //当 Calendar 的 poppable 为 true 时，支持以下 props:
    {
      name: 'show',
      title: '是否显示日历弹窗',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'position',
      title: '弹出位置',
      defaultValue: 'bottom',
      setters: 'SelectSetter',
      options: ['top', 'bottom', 'right', 'left']
    },
    {
      name: 'round',
      title: '是否显示圆角弹窗',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-on-popstate',
      title: '是否在页面回退时自动关闭',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-on-click-overlay',
      title: '是否在点击遮罩层后关闭',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'safe-area-inset-top',
      title: '是否开启顶部安全区适配',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'safe-area-inset-bottom',
      title: '是否开启顶部安全区适配',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'teleport',
      title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
      setters: ['StringSetter', 'ExpressionSetter']
    },
    // 当 Calendar 的 type 为 range 时，支持以下 props:
    // 当 Calendar 的 type 为 multiple 时，支持以下 props:
    {
      name: 'max-range',
      title: '日期区间最多可选天数',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'range-prompt',
      title: '范围选择超过最多可选天数时的提示文案',
      defaultValue: '	最多选择 xx 天',
      setters: 'StringSetter'
    },
    // 当 Calendar 的 type 为 range 时，支持以下 props:
    {
      name: 'show-range-prompt',
      title: '范围选择超过最多可选天数时，是否展示提示文案',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'allow-same-day',
      title: '是否允许日期范围的起止时间为同一天',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
    // 当 Calendar 的 type 为 multiple 时，支持以下 props:
  ],
  events: [
    'update:show',
    'select',
    'confirm',
    'open',
    'close',
    'opened',
    'closed',
    'unselect',
    'monthShow',
    'overRange',
    'clickSubtitle',
    'clickDisabledDate',
    'panelChange'
  ],
  slots: [
    'title',
    'subtitle',
    'month-title',
    'footer',
    'confirm-text',
    'top-info',
    'bottom-info',
    'prev-month',
    'prev-year',
    'next-month',
    'next-year'
  ],
  snippet: {
    props: {
      show: true,
      switchMode: 'month'
    }
  }
};

export default Calendar;
