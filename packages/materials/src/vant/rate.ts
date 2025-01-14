import type { MaterialDescription } from '@vtj/core';

const Rate: MaterialDescription = {
  name: 'VanRate',
  alias: 'Rate',
  label: '评分',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/rate',
  props: [
    {
      name: 'modelValue',
      title: '当前分值',
      setters: 'NumberSetter'
    },
    {
      name: 'count',
      title: '图标总数',
      defaultValue: 5,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'size',
      title: '图标大小，默认单位为px',
      defaultValue: 20,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'gutter',
      title: '图标间距，默认单位为px',
      defaultValue: 4,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'color',
      title: '选中时的颜色',
      defaultValue: '#ee0a24',
      setters: 'StringSetter'
    },
    {
      name: 'void-color',
      title: '未选中时的颜色',
      defaultValue: '#c8c9cc',
      setters: 'StringSetter'
    },
    {
      name: 'disabled-color',
      title: '禁用时的颜色',
      defaultValue: '#c8c9cc',
      setters: 'StringSetter'
    },
    {
      name: 'icon',
      title: '选中时的图标名称或图片链接，等同于 Icon 组件的 name 属性',
      defaultValue: 'start',
      setters: 'StringSetter'
    },
    {
      name: 'void-icon',
      title: '未选中时的图标名称或图片链接，等同于 Icon 组件的 name 属性',
      defaultValue: 'star-o',
      setters: 'StringSetter'
    },
    {
      name: 'icon-prefix',
      title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
      defaultValue: 'van-icon',
      setters: 'StringSetter'
    },
    {
      name: 'allow-half',
      title: '是否允许半选',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'clearable',
      title: '是否允许再次点击后清除',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'readonly',
      title: '是否为只读状态，只读状态下无法修改评分',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用评分',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'touchable',
      title: '是否可以通过滑动手势选择评分',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: ['update:modelValue', 'change'],
  snippet: {
    props: {
      modelValue: 3
    }
  }
};

export default Rate;
