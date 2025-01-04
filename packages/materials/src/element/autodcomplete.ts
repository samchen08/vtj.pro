import type { MaterialDescription } from '@vtj/core';
const Autodcomplete: MaterialDescription = {
  name: 'ElAutocomplete',
  label: '自动补全输入框',

  categoryId: 'form',
  doc: 'https://element-plus.org/zh-CN/component/autocomplete.html',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      defaultValue: '',
      title: '选中项绑定值',
      setters: 'StringSetter'
    },
    {
      name: 'placeholder',
      title: '占位文本',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'clearable',
      title: '是否可清空',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '自动补全组件是否被禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'valueKey',
      title: '输入建议对象中用于显示的键名',
      defaultValue: 'value',
      setters: 'StringSetter'
    },
    {
      name: 'debounce',
      defaultValue: 300,
      title: '获取输入建议的防抖延时',
      setters: 'NumberSetter'
    },
    {
      name: 'placement',
      defaultValue: 'bottom-start',
      title: '菜单弹出位置',
      options: [
        'top ',
        'top-start',
        'top-end',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end'
      ],
      setters: 'SelectSetter'
    },
    {
      name: 'fetchSuggestions',
      defaultValue: '',
      title: '获取输入建议的方法',
      setters: ['ArraySetter', 'FunctionSetter']
    },
    {
      name: 'triggerOnFocus',
      defaultValue: true,
      title: '是否在输入框focus时显示建议列表',
      setters: 'BooleanSetter'
    },
    {
      name: 'selectWhenUnmatched',
      defaultValue: false,
      title: '在输入没有任何匹配建议的情况下，按下回车是否触发select事件',
      setters: 'BooleanSetter'
    },
    {
      name: 'name',
      title: '等价于原生 input name 属性',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'aria-label',
      defaultValue: '',
      title: '原生 aria-label属性',
      setters: 'StringSetter'
    },
    {
      name: 'hideLoading',
      title: '是否隐藏远程加载时的加载图标',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'popperClass',
      defaultValue: '',
      title: '下拉列表的类名',
      setters: 'StringSetter'
    },
    {
      name: 'teleported',
      title: '是否将下拉列表元素插入 append-to 指向的元素下',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'highlightFirstItem',
      defaultValue: false,
      title: '是否默认突出显示远程搜索建议中的第一项',
      setters: 'BooleanSetter'
    },
    {
      name: 'fit-input-width',
      defaultValue: false,
      title: '下拉框是否与输入框同宽',
      setters: 'BooleanSetter'
    },
    {
      name: 'popperAppendToBody',
      defaultValue: false,
      title: '是否将下拉列表插入至body元素',
      setters: 'BooleanSetter'
    }
  ],
  slots: [
    {
      name: 'default',
      params: ['item']
    },
    {
      name: 'prefix'
    },
    {
      name: 'suffix'
    },
    {
      name: 'prepend'
    },
    {
      name: 'append'
    },
    {
      name: 'loading'
    }
  ],
  events: [
    {
      name: 'update:modelValue'
    },
    {
      name: 'select'
    },
    {
      name: 'change'
    }
  ],
  snippet: {
    props: {
      fetchSuggestions: {
        type: 'JSFunction',
        value:
          "(function (queryString, cb) {\r\n\r\n    const list = [\r\n        { value: 'vue', link: 'https://github.com/vuejs/vue' },\r\n        { value: 'element', link: 'https://github.com/ElemeFE/element' },\r\n        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },\r\n        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },\r\n        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },\r\n        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },\r\n        { value: 'babel', link: 'https://github.com/babel/babel' }\r\n    ];\r\n\r\n    const results = list.filter(n => n.value.startsWith(queryString));\r\n\r\n    cb(results);\r\n\r\n})"
      }
    }
  }
};

export default Autodcomplete;
