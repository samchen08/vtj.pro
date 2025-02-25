import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Textarea',
  label: '多行输入框',
  categoryId: 'form',
  props: [
    {
      name: 'value',
      title: '输入框的内容',
      setters: 'StringSetter'
    },
    {
      name: 'placeholder',
      title: '输入框为空时占位符',
      setters: 'StringSetter'
    },
    {
      name: 'placeholder-style',
      title: '指定 placeholder 的样式',
      setters: 'StringSetter'
    },
    {
      name: 'placeholder-class',
      title: '指定 placeholder 的样式类',
      defaultValue: 'textarea-placeholder',
      setters: 'StringSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'maxlength',
      title: '最大输入长度，设置为 -1 的时候不限制最大长度',
      defaultValue: 140,
      setters: 'NumberSetter'
    },
    {
      name: 'focus',
      title: '获取焦点',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'auto-focus',
      title: '自动聚焦，拉起键盘',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'auto-height',
      title: '是否自动增高，设置auto-height时，style.height不生效',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'fixed',
      title:
        '如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'cursor-spacing',
      title: '指定光标与键盘的距离，单位 px',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'cursor',
      title: '指定focus时的光标位置',
      setters: 'NumberSetter'
    },
    {
      name: 'cursor-color',
      title: '光标颜色',
      setters: 'StringSetter'
    },
    {
      name: 'confirm-type',
      title: '设置键盘右下角按钮的文字',
      defaultValue: 'done',
      setters: 'SelectSetter',
      options: ['send', 'search', 'next', 'go', 'done']
    },
    {
      name: 'confirm-hold',
      title: '点击键盘右下角按钮时是否保持键盘不收起',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-confirm-bar',
      title: '是否显示键盘上方带有”完成“按钮那一栏',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'selection-start',
      title: '光标起始位置，自动聚焦时有效，需与selection-end搭配使用',
      defaultValue: -1,
      setters: 'NumberSetter'
    },
    {
      name: 'selection-end',
      title: '光标结束位置，自动聚焦时有效，需与selection-end搭配使用',
      defaultValue: -1,
      setters: 'NumberSetter'
    },
    {
      name: 'adjust-position',
      title: '键盘弹起时，是否自动上推页面',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'disable-default-padding',
      title: '是否去掉 iOS 下的默认内边距',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'hold-keyboard',
      title: 'focus时，点击页面的时候不收起键盘',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'auto-blur',
      title: '键盘收起时，是否自动失去焦点',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'ignoreCompositionEvent',
      title: '是否忽略组件内对文本合成系统事件的处理',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'inputmode',
      title: '提供了用户在编辑元素或其内容时可能输入的数据类型的提示',
      defaultValue: 'text',
      setters: 'SelectSetter',
      options: [
        'none',
        'text',
        'decimal',
        'numeric',
        'tel',
        'search',
        'email',
        'url'
      ]
    }
  ],
  events: ['confirm', 'input', 'linechange', 'blur', 'focus'],
  snippet: {
    props: {
      style: { backgroundColor: '#999' },
      placeholder: '输入区域'
    }
  }
};

export default desc;
