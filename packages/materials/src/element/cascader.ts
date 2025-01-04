import type { MaterialDescription } from '@vtj/core';
import { mockTreeData } from '../shared';
const Cascader: MaterialDescription[] = [
  {
    name: 'ElCascader',
    label: '级联选择器',

    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/cascader.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '选中项绑定值',
        setters: ['StringSetter', 'NumberSetter', 'ObjectSetter']
      },
      {
        name: 'options',
        title: '选项的数据源， value 和 label 可以通过 CascaderProps 自定义',
        defaultValue: [],
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'props',
        title: '配置选项',
        setters: ['ObjectSetter', 'JSONSetter']
      },
      {
        name: 'size',
        defaultValue: '',
        title: '尺寸',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'placeholder',
        title: '输入框占位文本',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'clearable',
        title: '是否支持清空选项',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'showAllLevels',
        defaultValue: true,
        title: '输入框中是否显示选中值的完整路径',
        setters: 'BooleanSetter'
      },
      {
        name: 'collapseTags',
        title: '多选模式下是否折叠Tag',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'collapseTagsTooltip',
        defaultValue: false,
        title:
          '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapseTags属性必须设定为 true',
        setters: 'BooleanSetter'
      },
      {
        name: 'separator',
        title: '用于分隔选项的字符',
        defaultValue: '/',
        setters: 'StringSetter'
      },
      {
        name: 'filterable',
        title: '该选项是否可以被搜索',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'filterMethod',
        title:
          '自定义搜索逻辑，第一个参数是node，第二个参数是keyword，返回的布尔值表示是否保留该选项',
        defaultValue: '',
        setters: ['FunctionSetter', 'ExpressionSetter']
      },
      {
        name: 'debounce',
        title: '搜索关键词正在输入时的去抖延迟，单位为毫秒',
        defaultValue: 300,
        setters: 'NumberSetter'
      },
      {
        name: 'beforeFilter',
        title:
          '过滤函数调用前，所要调用的钩子函数，该函数接收要过滤的值作为参数。 如果该函数的返回值是 false 或者是一个被拒绝的 Promise，那么接下来的过滤逻辑便不会执行',
        defaultValue: '',
        setters: ['FunctionSetter', 'ExpressionSetter']
      },
      {
        name: 'popperClass',
        title: '弹出内容的自定义类名',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'teleported',
        title: '弹层是否使用 teleport',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'tagType',
        title: '标签类型',
        defaultValue: 'info',
        options: ['success', 'info', 'warning', 'danger'],
        setters: 'SelectSetter'
      },
      {
        name: 'tag-effect',
        title: 'tag effect',
        defaultValue: 'light',
        options: ['light', 'dark', 'plain'],
        setters: 'SelectSetter'
      },
      {
        name: 'validateEvent',
        title: '输入时是否触发表单的校验',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'maxCollapseTags',
        title:
          '需要显示的 Tag 的最大数量 只有当 collapse-tags 设置为 true 时才会生效。',
        setters: 'NumberSetter',
        defaultValue: 1
      },
      {
        name: 'empty-values',
        title: '组件的空值配置',
        setters: 'ArraySetter'
      },
      {
        name: 'value-on-clear',
        title: '清空选项的值',
        setters: [
          'StringSetter',
          'NumberSetter',
          'BooleanSetter',
          'ArraySetter'
        ]
      },
      {
        name: 'persistent',
        title:
          '当下拉框未被激活并且persistent设置为false，下拉框容器会被删除。',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'fallback-placements',
        title: 'Tooltip 可用的 positions',
        setters: 'ArraySetter'
      },
      {
        name: 'placement',
        title: '下拉框出现的位置',
        defaultValue: 'bottom-start',
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
        setters: 'SelectSetter'
      },
      {
        name: 'popperAppendToBody',
        defaultValue: true,
        title:
          '是否将弹出的内容直接插入到 body 元素。 在弹出内容的边框定位出现问题时，可将该属性设置为 false',
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'expand-change'
      },
      {
        name: 'blur'
      },
      {
        name: 'focus'
      },
      {
        name: 'clear'
      },
      {
        name: 'visible-change'
      },
      {
        name: 'remove-tag'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'empty'
      }
    ],
    snippet: {
      props: {
        options: mockTreeData(),
        props: {},
        modelValue: []
      }
    }
  },
  {
    name: 'ElCascaderPanel',
    label: '级联面板',

    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '选中项绑定值',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter', 'JSONSetter']
      },
      {
        name: 'options',
        title: '选项的数据源',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'props',
        title: '配置选项',
        defaultValue: '',
        setters: 'JSONSetter'
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'expand-change'
      },
      {
        name: 'close'
      }
    ],
    slots: ['default', 'empty'],
    snippet: {
      props: {
        options: mockTreeData(),
        props: {},
        modelValue: []
      }
    }
  }
];

export default Cascader;
