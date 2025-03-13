import type { MaterialDescription } from '@vtj/core';

const PickerGroup: MaterialDescription = {
  name: 'VanPickerGroup',
  alias: 'PickerGroup',
  label: '选择器组',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/picker-group',
  props: [
    {
      name: 'active-tab',
      title: '设置当前选中的标签',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'tabs',
      title: '设置标签页的标题',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'title',
      title: '顶部栏标题',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'show-toolbar',
      title: '是否显示顶部栏',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'next-step-text',
      title: '下一步按钮的文字',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'confirm-button-text',
      title: '确认按钮的文字',
      defaultValue: '确认',
      setters: 'StringSetter'
    },
    {
      name: 'cancel-button-text',
      title: '取消按钮的文字',
      defaultValue: '取消',
      setters: 'StringSetter'
    }
  ],
  events: ['confirm', 'cancel', 'update:activeTab'],
  slots: ['default', 'toolbar', 'title', 'confirm', 'cancel'],
  snippet: {
    props: {
      title: '预约日期',
      tabs: ['选择日期', '选择时间']
    },
    children: [{ name: 'VanDatePicker' }, { name: 'VanTimePicker' }]
  }
};

export default PickerGroup;
