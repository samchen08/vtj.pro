import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniDataSelect',
  label: '下拉框',
  categoryId: 'ext',
  props: [
    {
      name: 'modelValue',
      title: '已选择数据的 value 值（当其值为0时不进行初始化赋值）',
      defaultValue: '',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'localdata',
      title: '本地渲染数据',
      setters: 'ArraySetter'
    },
    {
      name: 'clear',
      title: '是否可以清空已选项',
      setters: 'BooleanSetter'
    },
    {
      name: 'label',
      title: '左侧标题',
      setters: 'StringSetter'
    },
    {
      name: 'placeholder',
      title: '输入框的提示文字',
      defaultValue: '请选择',
      setters: 'StringSetter'
    },
    {
      name: 'emptyTips',
      title: '没有数据时显示的文字 ，本地数据无效',
      defaultValue: '暂无数据',
      setters: 'StringSetter'
    },
    {
      name: 'placement',
      title: '弹出时位置',
      defaultValue: 'bottom',
      setters: 'SelectSetter',
      options: ['bottom', 'top']
    },
    {
      name: 'page-size',
      title: '返回的数据量',
      defaultValue: 20,
      setters: 'NumberSetter'
    }
  ],
  events: ['change', 'update:modelValue'],
  snippet: {
    props: {
      localdata: [
        { value: 0, text: '篮球' },
        { value: 1, text: '足球' },
        { value: 2, text: '游泳' }
      ],
      modelValue: 1
    }
  }
};

export default desc;
