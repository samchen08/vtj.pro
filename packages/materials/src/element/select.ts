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
        title: '选中项绑定值',
        defaultValue: '',
        setters: ['NumberSetter', 'InputSetter', 'BooleanSetter']
      },
      {
        name: 'multiple',
        title: '是否多选',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'options',
        title: '选项的数据源',
        setters: 'ArraySetter'
      },
      {
        name: 'props',
        title: 'options 的配置',
        setters: 'ObjectSetter'
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
        title: '分组的名称',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'disabled',
        title: '是否将该分组下所有选项置为禁用',
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

    categoryId: 'form',
    package: 'element-plus',
    parentIncludes: ['ElSelect', 'ElOptionGroup'],
    props: [
      {
        name: 'value',
        title: '选项的值',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter', 'JSONSetter']
      },
      {
        name: 'label',
        title: '选项的标签，若不设置则默认与value相同',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'disabled',
        title: '是否禁用该选项',
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
