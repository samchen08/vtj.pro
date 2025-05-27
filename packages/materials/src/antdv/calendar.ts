import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ACalendar',
    alias: 'Calendar',
    label: '日历',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/calandar-cn',
    props: [
      {
        name: 'disabledDate',
        label: 'disabledDate',
        title: '不可选择的日期',
        setters: 'FunctionSetter' //?? (currentDate: dayjs) => boolean
      },
      {
        name: 'fullscreen',
        label: 'fullscreen',
        title: '是否全屏显示',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'locale',
        label: 'locale',
        title: '国际化配置',
        setters: 'ObjectSetter'
      },
      {
        name: 'mode',
        label: 'mode',
        title: '初始模式，month/year',
        setters: 'SelectSetter',
        options: ['month', 'year'],
        defaultValue: 'month'
      },
      {
        name: 'validRange',
        label: 'validRange',
        title: '设置可以显示的日期',
        setters: 'ArraySetter' //?? 	[dayjs, dayjs]
      },
      {
        name: 'value',
        label: 'value',
        title: '展示日期',
        setters: 'FunctionSetter' //?? dayjs
      },
      {
        name: 'valueFormat',
        label: 'valueFormat',
        title:
          '可选，绑定值的格式，对 value、defaultValue 起作用。不指定则绑定值为 dayjs 对象',
        setters: 'StringSetter'
      }
    ],
    events: ['change', 'panelChange', 'select', 'update:value'],
    slots: [
      'default',
      'dateCellRender',
      'dateFullCellRender',
      'headerRender',
      'monthCellRender',
      'monthFullCellRender'
    ]
  }
];
export default components;
