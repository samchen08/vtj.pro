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
      title: '展示数据',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'empty-text',
      title: '内容为空的时候展示的文本',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'node-key',
      title: '每个树节点用来作为唯一标识的属性，整棵树应该是唯一的',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'props',
      title: '配置选项',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'renderAfterExpand',
      title: '是否在第一次展开某个树节点后才渲染其子节点',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'load',
      title: '加载子树数据的方法，仅当 lazy 属性为true 时生效',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'renderContent',
      title: '树节点的内容区的渲染 Function',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'highlightCurrent',
      title: '是否高亮当前选中节点',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'defaultExpandAll',
      title: '是否默认展开所有节点',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'expandOnClickNode',
      defaultValue: true,
      title:
        '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
      setters: 'BooleanSetter'
    },
    {
      name: 'checkOnClickNode',
      defaultValue: false,
      title:
        '是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。',
      setters: 'BooleanSetter'
    },
    {
      name: 'autoExpandParent',
      defaultValue: true,
      title: '展开子节点的时候是否自动展开父节点',
      setters: 'BooleanSetter'
    },
    {
      name: 'defaultExpandedKeys',
      defaultValue: '',
      title: '默认展开的节点的 key 的数组',
      label: '默认展开',
      setters: 'JSONSetter'
    },
    {
      name: 'showCheckbox',
      title: '节点是否可被选择',
      defaultValue: false,
      label: '显示checkbox',
      setters: 'BooleanSetter'
    },
    {
      name: 'checkStrictly',
      title: '在显示复选框的情况下，是否严格的遵循父子不互相关联的做法',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'defaultCheckedKeys',
      defaultValue: '',
      title: '默认勾选的节点的 key 的数组',
      label: '默认勾选',
      setters: 'JSONSetter'
    },
    {
      name: 'currentNodeKey',
      title: '当前选中的节点',
      defaultValue: '',
      label: '当前节点key',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'filterNodeMethod',
      defaultValue: '',
      title:
        'filter-node-method 对树节点进行筛选时执行的方法， 返回 false 则表示这个节点会被隐藏',
      label: '筛选节点函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'accordion',
      title: '是否每次只打开一个同级树节点展开',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'indent',
      title: '相邻级节点间的水平缩进，单位为像素',
      defaultValue: 16,
      setters: 'NumberSetter'
    },
    {
      name: 'icon',
      title: '自定义树节点图标组件',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'lazy',
      title: '是否懒加载子节点，需与 load 方法结合使用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'draggable',
      title: '是否开启拖拽节点功能',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'allowDrag',
      defaultValue: '',
      title: '判断节点能否被拖拽 如果返回 false ，节点不能被拖动',
      setters: 'FunctionSetter'
    },
    {
      name: 'allowDrop',
      defaultValue: '',
      title:
        '拖拽时判定目标节点能否成为拖动目标位置。 如果返回 false ，拖动节点不能被拖放到目标节点。 type 参数有三种情况：prev、inner 和 next，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后',
      setters: 'FunctionSetter'
    },
    // select
    {
      name: 'modelValue',
      title: '选中项绑定值',
      defaultValue: '',
      setters: [
        'StringSetter',
        'NumberSetter',
        'BooleanSetter',
        'ObjectSetter',
        'ArraySetter'
      ]
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
    {
      name: 'size',
      title: '输入框尺寸',
      defaultValue: 'default',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
    },
    {
      name: 'clearable',
      title: '是否可以清空选项',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'collapseTags',
      title: '多选时是否将选中值按文字的形式展示',
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
      title: 'multiple 属性设置为 true 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'id',
      title: '原生 input 的 id',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'name',
      title: 'Select 输入框的原生 name 属性',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'effect',
      title: 'tooltip 主题',
      defaultValue: 'light',
      options: ['dark', 'light'],
      setters: 'SelectSetter'
    },
    {
      name: 'autocomplete',
      title: 'Select 输入框的原生 autocomplete 属性',
      defaultValue: 'off',
      setters: 'InputSetter'
    },
    {
      name: 'placeholder',
      title: '占位符',
      defaultValue: 'Select',
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
      title: '是否允许用户创建新条目， 只有当 filterable 设置为 true 时才会生效',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'filterMethod',
      title: '自定义筛选方法的第一个参数是当前输入的值。 当filterable设置为 true 时才会生效',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'remote',
      title: '其中的选项是否从服务器远程加载',
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
      name: 'remoteShowSuffix',
      title: '远程搜索方法显示后缀图标',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'loading',
      title: '是否正在从远程获取数据',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'loadingText',
      title: '从服务器加载数据时显示的文本',
      defaultValue: 'Loading',
      setters: 'InputSetter'
    },
    {
      name: 'noMatchText',
      title: '搜索条件无匹配时显示的文字',
      defaultValue: 'No matching data',
      setters: 'InputSetter'
    },
    {
      name: 'noDataText',
      title: '无选项时显示的文字',
      defaultValue: 'No data',
      setters: 'InputSetter'
    },
    {
      name: 'popperClass',
      title: '为 Select 下拉菜单和标签提示设置自定义类名',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'popperStyle',
      title: '为 Select 下拉菜单和标签提示设置自定义样式',
      defaultValue: '',
      setters: ['StringSetter', 'ObjectSetter']
    },
    {
      name: 'reserveKeyword',
      title: '当 multiple 和 filterable被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'defaultFirstOption',
      title: '是否在输入框按下回车时，选择第一个匹配项。 需配合 filterable 或 remote 使用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'teleported',
      title: '是否使用 teleport。设置成 true则会被追加到 append-to 的位置',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'appendTo',
      title: '下拉框挂载到哪个 DOM 元素',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'persistent',
      title: '当下拉选择器未被激活并且persistent设置为false，选择器会被删除',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'automaticDropdown',
      title: '对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'clearIcon',
      title: '自定义清除图标',
      defaultValue: 'CircleClose',
      setters: 'InputSetter'
    },
    {
      name: 'fitInputWidth',
      title: '下拉框的宽度是否与输入框相同',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'suffixIcon',
      title: '自定义后缀图标组件',
      defaultValue: 'ArrowUp',
      setters: 'InputSetter'
    },
    {
      name: 'tagType',
      title: '标签类型',
      defaultValue: 'info',
      options: ['success', 'info', 'warning', 'danger'],
      setters: 'SelectSetter'
    },
    {
      name: 'tagEffect',
      title: '标签效果',
      defaultValue: 'light',
      options: ['', 'light', 'dark', 'plain'],
      setters: 'SelectSetter'
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
      name: 'suffixTransition',
      title: '下拉菜单显示/消失时后缀图标的动画',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'tabindex',
      title: 'input 的 tabindex',
      setters: ['StringSetter', 'NumberSetter']
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
    'popup-scroll',
    'update:modelValue'
  ],
  slots: [
    // tree
    {
      name: 'default',
      params: ['node', 'data']
    },
    {
      name: 'empty'
    },
    // select
    {
      name: 'header'
    },
    {
      name: 'footer'
    },
    {
      name: 'prefix'
    },
    // {
    //   name: 'empty'
    // },
    {
      name: 'tag'
    },
    {
      name: 'loading'
    },
    {
      name: 'label'
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
