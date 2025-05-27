import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AAutoComplete',
    alias: 'AutoComplete',
    label: '自动补全输入框',

    categoryId: 'input',
    doc: 'https://www.antdv.com/components/auto-complete-cn',
    props: [
      {
        name: 'allowClear',
        label: 'allowClear',
        title: '支持清除, 单选模式有效',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'backfill',
        label: 'backfill',
        title: '使用键盘选择选项的时候把选中项回填到输入框中',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'bordered',
        label: 'bordered',
        title: '是否有边框',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'defaultActiveFirstOption',
        label: 'defaultActiveFirstOption',
        title: '是否默认高亮第一个选项。',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'defaultOpen',
        label: 'defaultOpen',
        title: '是否默认展开下拉菜单',
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '是否禁用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'popupClassName',
        label: 'popupClassName',
        title: '下拉菜单的 className 属性',
        setters: 'StringSetter'
      },
      {
        name: 'dropdownMatchSelectWidth',
        label: 'dropdownMatchSelectWidth',
        title:
          '下拉菜单和选择器同宽。默认将设置 min-width，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动',
        setters: ['BooleanSetter', 'NumberSetter'],
        defaultValue: true
      },
      {
        name: 'dropdownMenuStyle',
        label: 'dropdownMenuStyle',
        title: 'dropdown 菜单自定义样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'filterOption',
        label: 'filterOption',
        title:
          '是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。',
        setters: ['BooleanSetter', 'FunctionSetter'],
        defaultValue: true
      },
      {
        name: 'open',
        label: 'open',
        title: '是否展开下拉菜单',
        setters: 'BooleanSetter'
      },
      {
        name: 'options',
        label: 'options',
        title: '自动完成的数据源',
        setters: 'ArraySetter'
      },
      {
        name: 'placeholder',
        label: 'placeholder',
        title: '输入框提示',
        setters: 'StringSetter'
      },
      {
        name: 'status',
        label: 'status',
        title: '设置校验状态',
        setters: 'SelectSetter',
        options: ['error', 'warning']
      },
      {
        name: 'value',
        label: 'value',
        title: '指定当前选中的条目',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      }
    ],
    events: [
      'blur',
      'change',
      'dropdownVisibleChange',
      'focus',
      'search',
      'select',
      'clear',
      'update:value'
    ],
    // slots: ['clearIcon', 'default', 'option', 'placeholder'],
    slots: [
      { name: 'default' },
      { name: 'clearIcon' },
      { name: 'default' },
      { name: 'option', params: ['value', 'label', 'array'] }, //?? value, label, [disabled, key, title]
      { name: 'placeholder' }
    ],
    snippet: {
      props: {
        placeholder: 'input here',
        style: { width: '200px' }
      }
    }
  }
];
export default components;
