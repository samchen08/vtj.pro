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
      setters: 'ExpressionSetter'
    },
    {
      name: 'range',
      defaultValue: '',
      setters: 'JSONSetter'
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
