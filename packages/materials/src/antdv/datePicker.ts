import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ADatePicker',
    alias: 'DatePicker',
    label: '日期选择框',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/date-picker-cn',
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
        name: 'defaultPickerValue',
        label: 'defaultPickerValue',
        title: '默认面板日期',
        setters: 'FunctionSetter' //?? dayjs
      },
      {
        name: 'disabledTime',
        label: 'disabledTime',
        title: '不可选择的时间',
        setters: 'FunctionSetter'
      },
      {
        name: 'format',
        label: 'format',
        title: '展示的日期格式，配置参考 dayjs',
        setters: 'StringSetter', //?? 	formatType
        defaultValue: 'YYYY-MM-DD'
      },
      {
        name: 'showNow',
        label: 'showNow',
        title: '当设定了 showTime 的时候，面板是否显示“此刻”按钮',
        setters: 'BooleanSetter'
      },
      {
        name: 'showTime',
        label: 'showTime',
        title: '增加时间选择功能',
        setters: ['ObjectSetter', 'BooleanSetter']
        // defaultValue: '' //?? TimePicker Options
      },
      {
        name: 'showTime.defaultValue',
        label: 'showTime.defaultValue',
        title: '设置用户选择日期时默认的时分秒',
        setters: 'FunctionSetter' //?? 	dayjs
      },
      {
        name: 'showToday',
        label: 'showToday',
        title: '是否展示“今天”按钮',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'value',
        label: 'value',
        title: '日期',
        setters: 'FunctionSetter' //?? 	dayjs
      }
    ],
    events: ['openChange', 'panelChange', 'change', 'ok', 'update:value'],
    slots: [
      'default',
      'dateRender',
      'nextIcon',
      'prevIcon',
      'suffixIcon',
      'superNextIcon',
      'superPrevIcon',
      'renderExtraFooter'
    ]
  },
  {
    name: 'ARangePicker',
    alias: 'RangePicker',
    label: '日期选择框',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/date-picker-cn',
    props: [
      // 以下 API 为 DatePicker、 RangePicker 共享的 API。
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
      //  以下是 rangePicker
      {
        name: 'allowEmpty',
        label: 'allowEmpty',
        title: '允许起始项部分为空',
        setters: ['BooleanSetter', 'BooleanSetter'],
        defaultValue: [false, false]
      },
      {
        name: 'defaultPickerValue',
        label: 'defaultPickerValue',
        title: '默认面板日期',
        setters: 'ArraySetter' //?? 	dayjs[]
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '禁用起始项',
        setters: ['BooleanSetter', 'BooleanSetter']
      },
      {
        name: 'disabledTime',
        label: 'disabledTime',
        title: '不可选择的时间',
        setters: 'FunctionSetter' //?? 	function(date: dayjs, partial: start | end)
      },
      {
        name: 'format',
        label: 'format',
        title: '展示的日期格式',
        setters: 'StringSetter', //??  formatType
        defaultValue: 'YYYY-MM-DD HH:mm:ss'
      },
      {
        name: 'presets',
        label: 'presets',
        title: '预设时间范围快捷选择',
        setters: 'ArraySetter' //??  { label: slot, value: dayjs[] }[]
      },
      {
        name: 'ranges',
        label: 'ranges',
        title: '预设时间范围快捷选择',
        setters: 'ObjectSetter' //??  	{ [range: string]: dayjs[] } | { [range: string]: () => dayjs[] }
      },
      {
        name: 'separator',
        label: 'separator',
        title: '设置分隔符',
        setters: 'StringSetter' //??  	string | v-slot:separator,
        // defaultValue: '<SwapRightOutlined />' //?? 组件
      },
      {
        name: 'showTime',
        label: 'showTime',
        title: '增加时间选择功能',
        setters: ['ObjectSetter', 'BooleanSetter']
        // defaultValue: '' //??	TimePicker Options
      },
      {
        name: 'showTime.defaultValue',
        label: 'showTime.defaultValue',
        title: '设置用户选择日期时默认的时分秒',
        setters: 'ArraySetter' //?? 	dayjs[]
        // defaultValue: [dayjs(), dayjs()] //?? [dayjs(), dayjs()],
      },
      {
        name: 'value',
        label: 'value',
        title: '日期',
        setters: 'ArraySetter' //?? 	dayjs[]
      }
    ],
    events: [
      'openChange',
      'panelChange',
      'calendarChange',
      'change',
      'ok',
      'update:value'
    ],
    slots: [
      'default',
      'dateRender',
      'nextIcon',
      'prevIcon',
      'suffixIcon',
      'superNextIcon',
      'superPrevIcon',
      'dateRender',
      'renderExtraFooter'
    ]
  }
];
export default components;
