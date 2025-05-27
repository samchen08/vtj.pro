import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ATimePicker',
    alias: 'TimePicker',
    label: '时间选择框',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/time-picker-cn',
    props: [
      {
        name: 'allowClear',
        label: 'allowClear',
        title: '是否展示清除按钮',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'autofocus',
        label: 'autofocus',
        title: '自动获取焦点',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'bordered',
        label: 'bordered',
        title: '是否有边框',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'clearText',
        label: 'clearText',
        title: '清除按钮的提示文案',
        setters: 'StringSetter',
        defaultValue: 'clear'
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '禁用全部操作',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'disabledTime',
        label: 'disabledTime',
        title: '不可选择的时间',
        setters: 'FunctionSetter' //?? DisabledTime
      },
      {
        name: 'format',
        label: 'format',
        title: '展示的时间格式',
        setters: 'StringSetter',
        defaultValue: 'HH:mm:ss'
      },
      {
        name: 'getPopupContainer',
        label: 'getPopupContainer',
        title: '定义浮层的容器，默认为 body 上新建 div',
        setters: 'FunctionSetter' //?? 	function(trigger)
      },
      {
        name: 'hideDisabledOptions',
        label: 'hideDisabledOptions',
        title: '隐藏禁止选择的选项',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'hourStep',
        label: 'hourStep',
        title: '小时选项间隔',
        setters: 'NumberSetter',
        defaultValue: 1
      },
      {
        name: 'inputReadOnly',
        label: 'inputReadOnly',
        title: '设置输入框为只读',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'minuteStep',
        label: 'minuteStep',
        title: '分钟选项间隔',
        setters: 'NumberSetter',
        defaultValue: 1
      },
      {
        name: 'open',
        label: 'open',
        title: '面板是否打开',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'placeholder',
        label: 'placeholder',
        title: '没有值的时候显示的内容',
        setters: ['StringSetter', 'ArraySetter'],
        defaultValue: '请选择时间'
      },
      {
        name: 'placement',
        label: 'placement',
        title: '选择框弹出的位置',
        setters: 'SelectSetter',
        options: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'],
        defaultValue: 'bottomLeft'
      },
      {
        name: 'popupClassName',
        label: 'popupClassName',
        title: '弹出层类名',
        setters: 'StringSetter'
      },
      {
        name: 'popupStyle',
        label: 'popupStyle',
        title: '弹出层样式对象',
        setters: 'ObjectSetter' //?? object
      },
      {
        name: 'secondStep',
        label: 'secondStep',
        title: '秒选项间隔',
        setters: 'NumberSetter',
        defaultValue: 1
      },
      {
        name: 'showNow',
        label: 'showNow',
        title: '面板是否显示“此刻”按钮',
        setters: 'BooleanSetter'
      },
      {
        name: 'status',
        label: 'status',
        title: '设置校验状态',
        setters: 'SelectSetter',
        options: ['error', 'warning']
      },
      {
        name: 'use12Hours',
        label: 'use12Hours',
        title: '使用 12 小时制，为 true 时 format 默认为 h:mm:ss a',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'value',
        label: 'value',
        title: '当前时间',
        setters: 'StringSetter'
      },
      {
        name: 'valueFormat',
        label: 'valueFormat',
        title:
          '可选，绑定值的格式，对 value、defaultValue 起作用。不指定则绑定值为 dayjs 对象',
        setters: ['StringSetter', 'ObjectSetter'] //??
      }
    ],
    events: ['change', 'openChange', 'update:open', 'update:value'],
    slots: ['default', 'clearIcon', 'renderExtraFooter', 'suffixIcon']
  },
  {
    name: 'ATimeRangePicker',
    alias: 'TimeRangePicker',
    parent: 'TimePicker',
    label: '时间范围选择框',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/time-picker-cn',
    props: [
      {
        name: 'allowClear',
        label: 'allowClear',
        title: '是否显示清除按钮',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'autofocus',
        label: 'autofocus',
        title: '自动获取焦点',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'bordered',
        label: 'bordered',
        title: '是否有边框',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'dateRender',
        label: 'dateRender',
        title: '自定义日期单元格的内容'
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '禁用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'disabledDate',
        label: 'disabledDate',
        title: '不可选择的日期',
        setters: 'FunctionSetter'
      },
      {
        name: 'format',
        label: 'format',
        title: '设置日期格式，为数组时支持多格式匹配，展示以第一个为准',
        setters: 'StringSetter',
        defaultValue: 'YYYY-MM-DD'
      },
      {
        name: 'dropdownClassName',
        label: 'dropdownClassName',
        title: '额外的弹出日历 className',
        setters: 'StringSetter'
      },
      {
        name: 'getPopupContainer',
        label: 'getPopupContainer',
        title: '定义浮层的容器，默认为 body 上新建 div',
        setters: 'FunctionSetter'
      },
      {
        name: 'inputReadOnly',
        label: 'inputReadOnly',
        title: '设置输入框为只读（避免在移动设备上打开虚拟键盘）',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'local',
        label: 'local',
        title: '国际化配置',
        setters: 'ObjectSetter'
      },
      {
        name: 'mode',
        label: 'mode',
        title: '日期面板的状态',
        setters: 'SelectSetter',
        options: ['time', 'date', 'month', 'year', 'decade']
      },
      {
        name: 'open',
        label: 'open',
        title: '控制弹层是否展开',
        setters: 'BooleanSetter'
      },
      {
        name: 'picker',
        label: 'picker',
        title: '设置选择器类型',
        setters: 'SelectSetter',
        options: ['date', 'week', 'month', 'quarter', 'year'],
        defaultValue: 'date'
      },
      {
        name: 'placeholder',
        label: 'placeholder',
        title: '输入框提示文字',
        setters: ['StringSetter', 'ArraySetter']
      },
      {
        name: 'placement',
        label: 'placement',
        title: '选择框弹出的位置',
        setters: 'SelectSetter',
        options: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'],
        defaultValue: 'bottomLeft'
      },
      {
        name: 'popupStyle',
        label: 'popupStyle',
        title: '额外的弹出日历样式',
        setters: 'ObjectSetter',
        defaultValue: {}
      },
      {
        name: 'presets',
        label: 'presets',
        title: '预设时间范围快捷选择',
        setters: 'ArraySetter'
      },
      {
        name: 'size',
        label: 'size',
        title: '输入框大小，large 高度为 40px，small 为 24px，默认是 32px',
        setters: 'SelectSetter',
        options: ['large', 'middle', 'small']
      },
      {
        name: 'status',
        label: 'status',
        title: '设置校验状态',
        setters: 'SelectSetter',
        options: ['error', 'warning']
      },
      {
        name: 'valueFormat',
        label: 'valueFormat',
        title:
          '可选，绑定值的格式，对 value、defaultValue、defaultPickerValue 起作用。不指定则绑定值为 dayjs 对象',
        setters: 'StringSetter'
      },
      {
        name: 'order',
        label: 'order',
        title: '始末时间是否自动排序',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'disabledTime',
        label: 'disabledTime',
        title: '不可选择的时间',
        setters: 'FunctionSetter'
      }
    ],
    events: ['change', 'openChange'],
    slots: [
      'default',
      'dateRender',
      'nextIcon',
      'prevIcon',
      'suffixIcon',
      'superNextIcon',
      'superPrevIcon'
    ]
  }
];
export default components;
