import type { MaterialDescription } from '@vtj/core';

const TreeSelect: MaterialDescription = {
  name: 'ElTreeSelect',
  label: '树形选择',

  doc: 'https://element-plus.org/zh-CN/component/tree-select.html',
  categoryId: 'data',
  package: 'element-plus',
  props: [
    {
      name: 'cacheData',
      label: 'cacheData',
      title: '懒加载节点的缓存数据，结构与数据相同，用于获取未加载数据的标签',
      setters: 'ArraySetter',
      defaultValue: []
    },
    // tree
    {
      name: 'data',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'empty-text',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'node-key',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'props',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'render-after-expand',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'load',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'render-content',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'highlight-current',
      defaultValue: false,
      label: '高亮当前节点',
      setters: 'BooleanSetter'
    },
    {
      name: 'default-expand-all',
      defaultValue: false,
      label: '展开所有节点',
      setters: 'BooleanSetter'
    },
    {
      name: 'expand-on-click-node',
      defaultValue: true,
      title:
        '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
      label: '点击展开',
      setters: 'BooleanSetter'
    },
    {
      name: 'check-on-click-node',
      defaultValue: false,
      title:
        '是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。',
      label: '点击选中',
      setters: 'BooleanSetter'
    },
    {
      name: 'auto-expand-parent',
      defaultValue: true,
      title: '展开子节点的时候是否自动展开父节点',
      label: '自动展开',
      setters: 'BooleanSetter'
    },
    {
      name: 'default-expanded-keys',
      defaultValue: '',
      title: '默认展开的节点的 key 的数组',
      label: '默认展开',
      setters: 'JSONSetter'
    },
    {
      name: 'show-checkbox',
      defaultValue: false,
      label: '显示checkbox',
      setters: 'BooleanSetter'
    },
    {
      name: 'check-strictly',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'default-checked-keys',
      defaultValue: '',
      title: '默认勾选的节点的 key 的数组',
      label: '默认勾选',
      setters: 'JSONSetter'
    },
    {
      name: 'current-node-key',
      defaultValue: '',
      label: '当前节点key',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'filter-node-method',
      defaultValue: '',
      title:
        'filter-node-method 对树节点进行筛选时执行的方法， 返回 false 则表示这个节点会被隐藏',
      label: '筛选节点函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'accordion',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'indent',
      defaultValue: 16,
      setters: 'NumberSetter'
    },
    {
      name: 'icon',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'lazy',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'draggable',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'allow-drag',
      defaultValue: '',
      title: '判断节点能否被拖拽 如果返回 false ，节点不能被拖动',
      setters: 'FunctionSetter'
    },
    {
      name: 'allow-drop',
      defaultValue: '',
      title:
        '拖拽时判定目标节点能否成为拖动目标位置。 如果返回 false ，拖动节点不能被拖放到目标节点。 type 参数有三种情况：prev、inner 和 next，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后',
      setters: 'FunctionSetter'
    },
    // select
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
    // tree
    'node-click',
    'node-contextmenu',
    'check-change',
    'check',
    'current-change',
    'node-expand',
    'node-collapse',
    'node-drag-start',
    'node-drag-enter',
    'node-drag-leave',
    'node-drag-over',
    'node-drop',
    'node-drag-end',
    // select
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
      params: ['node', 'data']
    },
    {
      name: 'empty'
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
    props: {
      data: [
        {
          value: '1',
          label: 'Level one 1',
          children: [
            {
              value: '1-1',
              label: 'Level two 1-1',
              children: [
                {
                  value: '1-1-1',
                  label: 'Level three 1-1-1'
                }
              ]
            }
          ]
        },
        {
          value: '2',
          label: 'Level one 2',
          children: [
            {
              value: '2-1',
              label: 'Level two 2-1',
              children: [
                {
                  value: '2-1-1',
                  label: 'Level three 2-1-1'
                }
              ]
            },
            {
              value: '2-2',
              label: 'Level two 2-2',
              children: [
                {
                  value: '2-2-1',
                  label: 'Level three 2-2-1'
                }
              ]
            }
          ]
        },
        {
          value: '3',
          label: 'Level one 3',
          children: [
            {
              value: '3-1',
              label: 'Level two 3-1',
              children: [
                {
                  value: '3-1-1',
                  label: 'Level three 3-1-1'
                }
              ]
            },
            {
              value: '3-2',
              label: 'Level two 3-2',
              children: [
                {
                  value: '3-2-1',
                  label: 'Level three 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      renderAfterExpand: false,
      style: {
        width: '240px'
      }
    }
  }
};

export default TreeSelect;
