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
        setters: ['NumberSetter', 'InputerSetter', 'BooleanSetter']
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
        setters: 'InputSetter'
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
    ],
    snippet: {
      children: [
        {
          name: 'ElOption',
          props: {
            label: {
              type: 'JSExpression',
              value: "`选项${this.context.item}`"
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
        setters: 'InputerSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
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
        setters: [
          'InputerSetter',
          'NumberSetter',
          'BooleanSetter',
          'JSONSetter'
        ]
      },
      {
        name: 'label',
        defaultValue: '',
        setters: ['InputerSetter', 'NumberSetter']
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    snippet: {
      props: {
        label: '选项'
      }
    }
  }
];

export default Select;
