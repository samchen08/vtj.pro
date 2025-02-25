import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Picker',
  label: '选择器',
  categoryId: 'form',
  props: [
    {
      name: 'mode',
      title: '模式',
      defaultValue: 'selector',
      setters: 'SelectSetter',
      options: ['selector', 'multiSelector', 'time', 'date', 'region']
    },
    {
      name: 'range',
      title: 'mode为 selector 或 multiSelector 时，range 有效',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'range-key',
      title:
        '当 range 是一个 Array＜Object＞ 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容',
      setters: 'StringSetter'
    },
    {
      name: 'value',
      title: 'value 的值表示选择了 range 中的第几个（下标从 0 开始）',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'selector-type',
      title:
        'UI类型,仅大屏时该属性生效，支持 picker、select、auto，默认在 iPad 以 picker 样式展示而在 PC 以 select 样式展示',
      defaultValue: 'auto',
      setters: 'StringSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'start',
      title: '表示有效时间范围的开始，字符串格式为"hh:mm"',
      setters: 'StringSetter'
    },
    {
      name: 'end',
      title: '表示有效时间范围的结束，字符串格式为"hh:mm"',
      setters: 'StringSetter'
    },
    {
      name: 'fields',
      title:
        '有效值 year、month、day，表示选择器的粒度，默认为 day，App 端未配置此项时使用系统 UI',
      defaultValue: 'day',
      setters: 'SelectSetter',
      options: ['year', 'month', 'day']
    },
    {
      name: 'custom-item',
      title: '可为每一列的顶部添加一个自定义的项',
      setters: 'StringSetter'
    }
  ],
  events: ['change', 'cancel', 'columnchange'],
  snippet: {
    props: {
      mode: 'selector',
      range: ['中国', '美国', '巴西', '日本'],
      value: 0,
      children: [{ name: 'View', children: '中国' }]
    }
  }
};

export default desc;
