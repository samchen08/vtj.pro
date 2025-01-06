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
      setters: ['InputSetter', 'NumberSetter', 'BooleanSetter', 'JSONSetter']
    },
    {
      name: 'options',
      label: 'options',
      title: '选项的数据源， value 的 key 和 label 可以通过 props自定义.',
      setters: 'ArraySetter'
    },
    {
      name: 'props',
      label: 'props',
      title: '配置选项，具体看下表',
      setters: 'ObjectSetter'
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
      setters: 'InputSetter'
    },
    {
      name: 'size',
      defaultValue: '',
      options: ['', 'large', 'default', 'small'],
      setters: 'SelectSetter'
    },
    {
      name: 'clearable',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'clearIcon',
      label: 'clearIcon',
      title: '自定义清除图标',
      setters: ['StringSetter', 'ObjectSetter'],
      defaultValue: 'CircleClose'
    },
    {
      name: 'collapseTags',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'multipleLimit',
      label: 'multipleLimit',
      title: '多选时可被选择的最大数目。 当被设置为0时，可被选择的数目不设限。',
      setters: 'NumberSetter',
      defaultValue: 0
    },
    {
      name: 'name',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'effect',
      defaultValue: 'light',
      options: ['dark', 'light'],
      setters: ['SelectSetter', 'StringSetter']
    },
    {
      name: 'autocomplete',
      defaultValue: 'off',
      setters: 'InputSetter'
    },
    {
      name: 'placeholder',
      defaultValue: 'Please select',
      setters: 'InputSetter'
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
      name: 'filterMethod',
      label: 'filterMethod',
      title: '自定义筛选方法',
      setters: 'FunctionSetter'
    },
    {
      name: 'loading',
      label: 'loading',
      title: '是否从远程加载数据',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'loadingText',
      label: 'loadingText',
      title: '从服务器加载数据时显示的文本，默认为“Loading”',
      setters: 'StringSetter',
      defaultValue: 'Loading'
    },
    {
      name: 'reserveKeyword',
      label: 'reserveKeyword',
      title: '筛选时，是否在选择选项后保留关键字',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'noMatchText',
      label: 'noMatchText',
      title:
        '搜索条件无匹配时显示的文字，也可以使用 empty 插槽设置，默认是 “No matching data“',
      setters: 'StringSetter'
    },
    {
      name: 'noDataText',
      label: 'noDataText',
      title: '当在没有数据时显示的文字，你同时可以使用empty插槽进行设置。',
      setters: 'StringSetter',
      defaultValue: 'No Data'
    },
    {
      name: 'popperClass',
      label: 'popperClass',
      title: '选择器下拉菜单的自定义类名',
      setters: 'StringSetter',
      defaultValue: ''
    },
    {
      name: 'teleported',
      label: 'teleported',
      title: '是否将下拉列表元素插入 append-to 指向的元素下',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'appendTo',
      title: '下拉框挂载到哪个 DOM 元素',
      setters: 'StringSetter'
    },
    {
      name: 'persistent',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'popperOptions',
      label: 'popperOptions',
      setters: 'ObjectSetter',
      defaultValue: {}
    },
    {
      name: 'automaticDropdown',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'fitInputWidth',
      defaultValue: true,
      setters: ['BooleanSetter', 'NumberSetter']
    },
    {
      name: 'height',
      defaultValue: 274,
      setters: 'NumberSetter'
    },
    {
      name: 'itemHeight',
      label: 'itemHeight',
      title: '下拉项的高度',
      setters: 'NumberSetter',
      defaultValue: 34
    },
    {
      name: 'scrollbarAlwaysOn',
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
      name: 'validateEvent',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'offset',
      title: '下拉面板偏移量',
      defaultValue: 12,
      setters: 'NumberSetter'
    },
    {
      name: 'showArrow',
      title: '下拉菜单的内容是否有箭头',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'placement',
      label: 'placement',
      title: '下拉框出现的位置',
      setters: 'SelectSetter',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end'
      ],
      defaultValue: 'bottom-start'
    },
    {
      name: 'fallbackPlacements',
      setters: 'ArraySetter',
      defaultValue: ['bottom-start', 'top-start', 'right', 'left']
    },
    {
      name: 'collapseTagsTooltip',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'maxCollapseTags',
      setters: 'NumberSetter',
      defaultValue: 1
    },
    {
      name: 'tagType',
      label: 'tagType',
      title: '标签类型',
      setters: 'SelectSetter',
      options: ['', 'success', 'info', 'warning', 'danger'],
      defaultValue: 'info'
    },
    {
      name: 'tagEffect',
      title: '标签效果',
      defaultValue: 'light',
      options: ['', 'light', 'dark', 'plain'],
      setters: 'SelectSetter'
    },
    {
      name: 'ariaLabel',
      label: 'ariaLabel',
      title: '等价于原生 input aria-label 属性',
      setters: 'StringSetter'
    },
    {
      name: 'emptyValues',
      title: '组件的空值配置',
      setters: 'ArraySetter'
    },
    {
      name: 'valueOnClear',
      title: '清空选项的值 ',
      setters: [
        'StringSetter',
        'NumberSetter',
        'BooleanSetter',
        'FunctionSetter'
      ]
    },
    {
      name: 'popperAppendToBody',
      title:
        '是否将弹出框插入至 body 元素 当弹出框的位置出现问题时，你可以尝试将该属性设置为false。',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'tabindex',
      title: 'input 的 tabindex',
      setters: ['StringSetter', 'NumberSetter']
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
      name: 'header'
    },
    {
      name: 'footer'
    },
    {
      name: 'prefix'
    },
    {
      name: 'empty'
    },
    {
      name: 'tag'
    },
    {
      name: 'loading'
    },
    {
      name: 'label'
    }
  ]
};

export default SelectV2;
