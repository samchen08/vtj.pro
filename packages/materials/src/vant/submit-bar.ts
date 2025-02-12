import type { MaterialDescription } from '@vtj/core';

const SubmitBar: MaterialDescription = {
  name: 'VanSubmitBar',
  alias: 'SubmitBar',
  label: '提交订单栏',
  categoryId: 'business',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/submit-bar',
  props: [
    {
      name: 'price',
      title: '金额（单位分）',
      setters: 'NumberSetter'
    },
    {
      name: 'decimal-length',
      title: '金额小数点位数',
      defaultValue: 2,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'label',
      title: '金额左侧文案',
      defaultValue: '	合计：',
      setters: 'StringSetter'
    },
    {
      name: 'suffix-label',
      title: '金额右侧文案',
      setters: 'StringSetter'
    },
    {
      name: 'text-align',
      title: '金额文案对齐方向，可选值为 left',
      defaultValue: 'right',
      setters: 'SelectSetter',
      options: ['left', 'right']
    },
    {
      name: 'button-text',
      title: '按钮文字',
      setters: 'StringSetter'
    },
    {
      name: 'button-type',
      title: '按钮类型',
      defaultValue: 'danger',
      setters: 'StringSetter'
    },
    {
      name: 'button-color',
      title: '自定义按钮颜色',
      setters: 'StringSetter'
    },
    {
      name: 'tip-icon',
      title: '提示文案左侧的图标名称或图片链接，等同于 Icon 组件的 name 属性',
      setters: ['VanIconSetter', 'StringSetter']
    },
    {
      name: 'currency',
      title: '货币符号',
      defaultValue: '￥',
      setters: 'StringSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'loading',
      title: '是否显示将按钮显示为加载中状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'safe-area-inset-bottom',
      title: '是否开启底部安全区适配',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'placeholder',
      title: '是否在标签位置生成一个等高的占位元素',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: ['submit'],
  slots: ['default', 'button', 'top', 'tip'],
  snippet: {
    props: {
      price: 3050,
      'button-text': '提交订单'
    }
  }
};

export default SubmitBar;
