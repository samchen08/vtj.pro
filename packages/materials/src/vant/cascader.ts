import type { MaterialDescription } from '@vtj/core';

const Cascader: MaterialDescription = {
  name: 'VanCascader',
  alias: 'Cascader',
  label: '级联选择',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/cascader',
  props: [
    {
      name: 'modelValue',
      title: '选中项的值',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'title',
      title: '顶部标题',
      setters: 'StringSetter'
    },
    {
      name: 'options',
      title: '可选项数据源',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'placeholder',
      title: '未选中时的提示文案',
      defaultValue: '请选择',
      setters: 'StringSetter'
    },
    {
      name: 'active-color',
      title: '选中状态的高亮颜色',
      defaultValue: '#1989fa',
      setters: 'StringSetter'
    },
    {
      name: 'swipeable',
      title: '是否开启手势左右滑动切换',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'closeable',
      title: '是否显示关闭图标',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-header',
      title: '是否展示标题栏',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-icon',
      title: '关闭图标名称或图片链接，等同于 Icon 组件的 name 属性',
      defaultValue: 'cross',
      setters: ['VanIconSetter', 'StringSetter']
    },
    {
      name: 'field-names',
      title: '自定义 options 结构中的字段',
      defaultValue: { text: 'text', value: 'value', children: 'children' },
      setters: 'ObjectSetter'
    }
  ],
  events: ['update:modelValue', 'change', 'finish', 'close', 'clickTab'],
  slots: ['title', 'option', 'options-top', 'options-bottom'],
  snippet: {
    props: {
      modelValue: '',
      title: '请选择所在地区',
      options: [
        {
          text: '浙江省',
          value: '330000',
          children: [{ text: '杭州市', value: '330100' }]
        },
        {
          text: '江苏省',
          value: '320000',
          children: [{ text: '南京市', value: '320100' }]
        }
      ]
    }
  }
};

export default Cascader;
