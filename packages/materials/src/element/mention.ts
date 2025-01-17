import type { MaterialDescription } from '@vtj/core';
import { size } from '../shared';

const Mention: MaterialDescription = {
  name: 'ElMention',
  label: '提及',
  categoryId: 'form',
  doc: 'https://element-plus.org/zh-CN/component/mention.html#api',
  props: [
    {
      name: 'options',
      title: '提及选项列表',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'prefix',
      title: '触发字段的前缀。 字符串长度必须且只能为 1',
      defaultValue: '@',
      setters: ['StringSetter', 'ArraySetter']
    },
    {
      name: 'split',
      title: '用于拆分提及的字符。 字符串长度必须且只能为 1	',
      defaultValue: ' ',
      setters: 'StringSetter'
    },
    {
      name: 'filterOption',
      title: '定制筛选器选项逻辑',
      setters: ['BooleanSetter', 'FunctionSetter']
    },
    {
      name: 'placement',
      title: '设置弹出位置',
      defaultValue: 'bottom',
      options: ['top', 'bottom'],
      setters: 'SelectSetter'
    },
    {
      name: 'showArrow',
      title: '下拉菜单的内容是否有箭头',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'offset',
      title: '下拉面板偏移量',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'whole',
      title: '当退格键被按下做删除操作时，是否将提及部分作为整体删除',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'checkIsWhole',
      title: '当退格键被按下做删除操作时，检查是否将提及部分作为整体删除',
      setters: 'FunctionSetter'
    },
    {
      name: 'loading',
      title: '提及的下拉面板是否处于加载状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'modelValue',
      title: '输入值',
      setters: 'StringSetter'
    },
    {
      name: 'popperClass',
      title: '自定义浮层类名',
      setters: 'StringSetter'
    },
    {
      name: 'popperOptions',
      title: '参数',
      setters: ['ObjectSetter', 'JSONSetter']
    },
    //
    {
      name: 'type',
      defaultValue: 'text',
      options: ['text', 'textarea'],
      setters: ['SelectSetter', 'InputSetter']
    },
    {
      name: 'maxlength',
      defaultValue: '',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'minlength',
      defaultValue: '',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'showWordLimit',
      defaultValue: false,
      title:
        '是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效',
      label: '字数统计',
      setters: 'BooleanSetter'
    },
    {
      name: 'placeholder',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'clearable',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'formatter',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'parser',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'showPassword',
      defaultValue: false,
      title: '是否显示切换密码图标',
      label: '密码图标',
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    size('size'),
    {
      name: 'prefix-icon',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'suffix-icon',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'rows',
      defaultValue: 2,
      setters: 'NumberSetter'
    },
    {
      name: 'autosize',
      defaultValue: false,
      setters: ['BooleanSetter', 'JSONStter']
    },
    {
      name: 'autocomplete',
      defaultValue: 'off',
      setters: 'InputSetter'
    },
    {
      name: 'name',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'readonly',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'max',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'min',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'step',
      defaultValue: '',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'resize',
      defaultValue: '',
      options: ['none', 'both', 'horizontal', 'vertical'],
      setters: 'InputSetter'
    },
    {
      name: 'autofocus',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'form',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'aria-label',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'tabindex',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'validateEvent',
      defaultValue: true,
      title: '输入时是否触发表单的校验',
      label: '表单校验',
      setters: 'BooleanSetter'
    },
    {
      name: 'inputStyle',
      defaultValue: {},
      setters: ['JSONSetter']
    }
  ],
  events: [
    {
      name: 'update:modelValue'
    },
    {
      name: 'search'
    },
    {
      name: 'select'
    },
    {
      name: 'input'
    },
    {
      name: 'blur'
    },
    {
      name: 'focus'
    },
    {
      name: 'change'
    },
    {
      name: 'clear'
    }
  ],
  slots: [
    'label',
    'loading',
    'header',
    'footer',
    'prefix',
    'suffix',
    'prepend',
    'append'
  ],
  snippet: {
    props: {
      options: [
        {
          label: 'Fuphoenixes',
          value: 'Fuphoenixes'
        },
        {
          label: 'kooriookami',
          value: 'kooriookami'
        },
        {
          label: 'Jeremy',
          value: 'Jeremy'
        },
        {
          label: 'btea',
          value: 'btea'
        }
      ],
      modelValue: '@'
    }
  }
};

export default Mention;
