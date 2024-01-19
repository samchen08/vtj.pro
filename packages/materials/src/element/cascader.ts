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
        setters: 'JSONSetter'
      },
      {
        name: 'options',
        defaultValue: [],
        setters: 'JSONSetter'
      },
      {
        name: 'props',
        defaultValue: '',
        setters: 'JSONSetter'
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
        defaultValue: 'Select',
        setters: 'InputSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'clearable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'showAllLevels',
        defaultValue: true,
        title: '输入框中是否显示选中值的完整路径',
        label: '完整路径',
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
          '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapseTags属性必须设定为 true',
        label: '显示所有',
        setters: 'BooleanSetter'
      },
      {
        name: 'separator',
        defaultValue: '/',
        setters: 'InputSetter'
      },
      {
        name: 'filterable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'filterMethod',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'debounce',
        defaultValue: 300,
        setters: 'NumberSetter'
      },
      {
        name: 'beforeFilter',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'popperClass',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'teleported',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'popperAppendToBody',
        defaultValue: true,
        title:
          '是否将弹出的内容直接插入到 body 元素。 在弹出内容的边框定位出现问题时，可将该属性设置为 false',
        label: 'popperAppend',
        setters: 'BooleanSetter'
      },
      {
        name: 'tagType',
        defaultValue: 'info',
        options: ['success', 'info', 'warning', 'danger'],
        setters: 'SelectSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
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
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'options',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'props',
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
      }
    ],
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
