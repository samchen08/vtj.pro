import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniDataCheckbox',
  label: '数据选择器',
  categoryId: 'ext',
  props: [
    {
      name: 'modelValue',
      title: '默认值，multiple=true时为 Array类型，否则为 String或Number类型',
      setters: ['ArraySetter', 'StringSetter', 'NumberSetter']
    },
    {
      name: 'localdata',
      title: '本地渲染数据',
      setters: 'ArraySetter'
    },
    {
      name: 'mode',
      title: '显示模式',
      defaultValue: 'default',
      setters: 'SelectSetter',
      options: ['default', 'list', 'button', 'tag']
    },
    {
      name: 'multiple',
      title: '是否多选',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'min',
      title: '最小选择个数 ，multiple为true时生效',
      defaultValue: '',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'max',
      title: '最大选择个数 ，multiple为true时生效',
      defaultValue: '',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'wrap',
      title: '是否换行显示',
      defaultValue: '',
      setters: 'BooleanSetter'
    },
    {
      name: 'icon',
      title: 'list 列表模式下 icon 显示的位置',
      defaultValue: 'left',
      setters: 'SelectSetter',
      options: ['left', 'right']
    },
    {
      name: 'selectedColor',
      title: '选中颜色',
      defaultValue: '#007aff',
      setters: ['ColorSetter', 'StringSetter']
    },
    {
      name: 'selectedTextColor',
      title: '选中文本颜色，如不填写则自动显示',
      defaultValue: '#333',
      setters: ['ColorSetter', 'StringSetter']
    },
    {
      name: 'emptyText',
      title: '没有数据时显示的文字 ，本地数据无效',
      defaultValue: '暂无数据',
      setters: 'StringSetter'
    },
    {
      name: 'map',
      title: '字段映射，将text/value映射到数据中的其他字段',
      defaultValue: { text: 'text', value: 'value' },
      setters: 'ObjectSetter'
    }
  ],
  events: ['change', 'update:modelValue'],
  snippet: {
    props: {
      localdata: [
        {
          text: '男',
          value: 0
        },
        {
          text: '女',
          value: 1,
          disable: true
        },
        {
          text: '未知',
          value: 2
        }
      ],
      modelValue: 0
    }
  }
};

export default desc;
