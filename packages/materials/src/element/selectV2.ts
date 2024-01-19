import type { MaterialDescription } from '@vtj/core';
const SelectV2: MaterialDescription = {
  name: 'ElSelectV2',
  label: '虚拟列表选择器',

  doc: 'https://element-plus.org/zh-CN/component/select-v2.html',
  categoryId: 'data',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      defaultValue: '',
      setters: ['InputerSetter', 'NumberSetter', 'JSONSetter']
    },
    {
      name: 'multiple',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'valueKey',
      defaultValue: 'value',
      setters: 'InputerSetter'
    },
    {
      name: 'size',
      defaultValue: 'default',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
    },
    {
      name: 'clearable',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'collapseTags',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'collapseTagsTooltip',
      defaultValue: false,
      title:
        '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 只有当 collapse-tags 设置为 true 时才会生效。',
      label: 'Tooltip',
      setters: 'BooleanSetter'
    },
    {
      name: 'multipleLimit',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'name',
      defaultValue: '',
      setters: 'InputerSetter'
    },
    {
      name: 'effect',
      defaultValue: 'light',
      options: ['dark', 'light'],
      setters: 'SelectSetter'
    },
    {
      name: 'autocomplete',
      defaultValue: 'off',
      setters: 'InputerSetter'
    },
    {
      name: 'placeholder',
      defaultValue: 'Select',
      setters: 'InputerSetter'
    },
    {
      name: 'filterable',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'allowCreate',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'remote',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'remoteMethod',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'popperClass',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'reserveKeyword',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'popperAppendToBody',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'teleported',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'persistent',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'automaticDropdown',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'clearIcon',
      defaultValue: 'CircleClose',
      setters: 'InputSetter'
    },
    {
      name: 'height',
      defaultValue: 170,
      setters: 'NumberSetter'
    },
    {
      name: 'scrollbarAlwaysOn',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'validateEvent',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: [
    'change',
    'visible-change',
    'remove-tag',
    'clear',
    'blur',
    'focus',
    'update:modelValue'
  ],
  slots: [
    {
      name: 'default'
    },
    {
      name: 'prefix'
    },
    {
      name: 'empty'
    }
  ]
};

export default SelectV2;
