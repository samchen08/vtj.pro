import type { MaterialDescription } from '@vtj/core';
const Calendar: MaterialDescription = {
  name: 'ElCalendar',
  label: '日历',

  categoryId: 'data',
  doc: 'https://element-plus.org/zh-CN/component/calendar.html',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      defaultValue: '',
      setters: ['StringSetter', 'ExpressionSetter']
    },
    {
      name: 'range',
      title: '时间范围，包括开始时间与结束时间。 开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月',
      defaultValue: '',
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'controllerType',
      title: '日历头部的控制器类型',
      defaultValue: 'button',
      setters: 'SelectSetter',
      options: ['button', 'select']
    },
    {
      name: 'formatter',
      title: '当 controller-type 为“select”时的格式标签',
      defaultValue: '',
      setters: 'FunctionSetter' // (value: number, type: 'year' | 'month') => string | number
    }
  ],
  events: ['update:modelValue'],
  slots: [
    {
      name: 'date-cell'
    },
    {
      name: 'header'
    }
  ]
};

export default Calendar;
