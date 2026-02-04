import type { MaterialDescription } from '@vtj/core';
import { effect, size } from '../shared';
const SelectV2: MaterialDescription = {
  name: 'ElSelectV2',
  label: '虚拟列表选择器',

  doc: 'https://element-plus.org/zh-CN/component/select-v2.html',
  categoryId: 'data',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      title: '选中项绑定值',
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
      title: '配置选项',
      setters: 'ObjectSetter'
    },
    {
      name: 'multiple',
      title: '是否多选',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'valueKey',
      title: '作为 value 唯一标识的键名，绑定值为对象类型时必填',
      defaultValue: 'value',
      setters: 'InputSetter'
    },
    size('size'),
    {
      name: 'clearable',
      title: '是否可以清空选项',
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
      title: '多选时是否将选中值按文字的形式展示',
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
      name: 'id',
      title: '原生 input 的 id',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'name',
      title: '选择器的原生name属性',
      defaultValue: '',
      setters: 'InputSetter'
    },
    effect('effect'),
    {
      name: 'autocomplete',
      title: '自动完成选择输入',
      defaultValue: 'off',
      setters: 'InputSetter'
    },
    {
      name: 'placeholder',
      title: '占位文字',
      defaultValue: 'Please select',
      setters: 'InputSetter'
    },
    {
      name: 'filterable',
      title: 'Select 组件是否可筛选',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'allowCreate',
      title: '是否允许创建新条目， 当使用该属性时，filterable必须设置为true',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'filterMethod',
      label: 'filterMethod',
      title: '自定义筛选方法的第一个参数是当前输入的值。 当filterable设置为 true 时才会生效',
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
      name: 'popperStyle',
      title: 'Select 下拉菜单和标签提示的自定义样式',
      setters: ['StringSetter', 'ObjectSetter'],
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
      title: '当下拉选择器未被激活并且persistent设置为false，选择器会被删除',
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
      title: '对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'fitInputWidth',
      title: '无论下拉框的宽度是否与输入框相同，如果值为number，则宽度是固定的',
      defaultValue: true,
      setters: ['BooleanSetter', 'NumberSetter']
    },
    {
      name: 'suffixIcon',
      title: '自定义后缀图标组件',
      setters: 'StringSetter'
    },
    {
      name: 'height',
      title: '下拉菜单的高度',
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
      title: '是否总是展示滚动条',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'remote',
      title: '是否从服务器获取数据',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'debounce',
      title: '远程搜索时的防抖延迟（以毫秒为单位）',
      defaultValue: 300,
      setters: 'NumberSetter'
    },
    {
      name: 'remoteMethod',
      title: '当输入值发生变化时触发的函数。 它的参数就是当前的输入值。 当filterable设置为 true 时才会生效',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'validateEvent',
      title: '是否触发表单验证',
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
      title: 'dropdown 可用的 positions',
      setters: 'ArraySetter',
      defaultValue: ['bottom-start', 'top-start', 'right', 'left']
    },
    {
      name: 'collapseTagsTooltip',
      title: '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此功能，collapse-tags的值必须为true',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'maxCollapseTags',
      title: '需要显示的 Tag 的最大数量。 只有当 collapse-tags 设置为 true 时才会生效',
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
      name: 'default',
      params: ['item']
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
