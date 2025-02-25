import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniCalendar',
  label: '日历',
  categoryId: 'ext',
  props: [
    {
      name: 'date',
      title: '自定义当前时间，默认为今天',
      setters: 'StringSetter'
    },
    {
      name: 'lunar',
      title: '显示农历',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'startDate',
      title: '日期选择范围-开始日期',
      setters: 'StringSetter'
    },
    {
      name: 'endDate',
      title: '日期选择范围-结束日期',
      setters: 'StringSetter'
    },
    {
      name: 'range',
      title: '范围选择',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'insert',
      title: '插入模式,可选值',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'clearDate',
      title: '弹窗模式是否清空上次选择内容',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'selected',
      title: '打点',
      setters: 'ArraySetter'
    },
    {
      name: 'showMonth',
      title: '是否显示月份为背景',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: ['change', 'confirm', 'monthSwitch', 'open'],
  snippet: {}
};

export default desc;
