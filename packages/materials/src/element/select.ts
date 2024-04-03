import type { MaterialDescription } from '@vtj/core';
const Select: MaterialDescription[] = [
  {
    name: 'ElSelect',
    label: '选择器',

    doc: 'https://element-plus.org/zh-CN/component/select.html',
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: '',
        setters: ['NumberSetter', 'InputSetter', 'BooleanSetter']
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
        label: 'Tooltip',
        title:
          '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true',
        defaultValue: false,
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
        setters: 'InputSetter'
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
        setters: 'InputSetter'
      },
      {
        name: 'placeholder',
        defaultValue: 'Select',
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
        defaultValue: '',
        setters: 'FunctionSetter'
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
        name: 'loading',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loadingText',
        defaultValue: 'Loading',
        setters: 'InputSetter'
      },
      {
        name: 'noMatchText',
        defaultValue: 'No matching data',
        setters: 'InputSetter'
      },
      {
        name: 'noDataText',
        defaultValue: 'No data',
        setters: 'InputSetter'
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
        name: 'defaultFirstOption',
        defaultValue: false,
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
        name: 'fitInputWidth',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'suffixIcon',
        defaultValue: 'ArrowUp',
        setters: 'InputSetter'
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
        label: 'fallbackPlacements',
        title: 'dropdown 可用的 positions',
        setters: 'ArraySetter',
        defaultValue: ['bottom-start', 'top-start', 'right', 'left']
      },
      {
        name: 'maxCollapseTags',
        label: 'maxCollapseTags',
        title:
          '需要显示的 Tag 的最大数量 只有当 collapse-tags 设置为 true 时才会生效。',
        setters: 'NumberSetter',
        defaultValue: 1
      },
      {
        name: 'popperOptions',
        label: 'popperOptions',
        title: 'popper.js 参数',
        setters: 'ObjectSetter',
        defaultValue: {}
      },
      {
        name: 'ariaLabel',
        label: 'ariaLabel',
        title: '等价于原生 input aria-label 属性',
        setters: 'StringSetter'
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
      }
    ],
    snippet: {
      children: [
        {
          name: 'ElOption',
          props: {
            label: {
              type: 'JSExpression',
              value: '`选项${this.context.item}`'
            }
          },
          directives: [
            {
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value: '6'
              }
            }
          ]
        }
      ]
    }
  },
  {
    name: 'ElOptionGroup',
    label: '选择器选项组',

    categoryId: 'form',
    package: 'element-plus',
    parentIncludes: ['ElSelect'],
    props: [
      {
        name: 'label',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        label: '分组'
      }
    }
  },
  {
    name: 'ElOption',
    label: '选择器选项',

    childIncludes: false,
    categoryId: 'form',
    package: 'element-plus',
    parentIncludes: ['ElSelect', 'ElOptionGroup'],
    props: [
      {
        name: 'value',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter', 'JSONSetter']
      },
      {
        name: 'label',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        label: '选项'
      }
    }
  }
];

export default Select;
