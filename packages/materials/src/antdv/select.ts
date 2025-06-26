import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ASelect',
    alias: 'Select',
    label: '选择器',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/select-cn',
    props: [
      {
        name: 'allowClear',
        label: 'allowClear',
        title: '支持清除',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'autoClearSearchValue',
        label: 'autoClearSearchValue',
        title: '是否在选中项后清空搜索框，只在 mode 为 multiple 或 tags 时有效',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'autofocus',
        label: 'autofocus',
        title: '默认获取焦点',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'bordered',
        label: 'bordered',
        title: '是否有边框',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'defaultActiveFirstOption',
        label: 'defaultActiveFirstOption',
        title: '是否默认高亮第一个选项',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'defaultOpen',
        label: 'defaultOpen',
        title: '是否默认展开下拉菜单',
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '是否禁用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'popupClassName',
        label: 'popupClassName',
        title: '下拉菜单的 className 属性',
        setters: 'StringSetter'
      },
      {
        name: 'dropdownMatchSelectWidth',
        label: 'dropdownMatchSelectWidth',
        title:
          '下拉菜单和选择器同宽。默认将设置 min-width，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动',
        setters: ['BooleanSetter', 'StringSetter'],
        defaultValue: true
      },
      {
        name: 'dropdownMenuStyle',
        label: 'dropdownMenuStyle',
        title: 'dropdown 菜单自定义样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'dropdownRender',
        label: 'dropdownRender',
        title: '自定义下拉框内容',
        setters: 'FunctionSetter'
      },
      {
        name: 'fieldNames',
        label: 'fieldNames',
        title: '自定义节点 label、value、options 的字段',
        setters: 'ObjectSetter',
        defaultValue: { label: 'label', value: 'value', options: 'options' }
      },
      {
        name: 'filterOption',
        label: 'filterOption',
        title:
          '是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false',
        setters: ['BooleanSetter', 'FunctionSetter'], //?? boolean | function(inputValue, option)
        defaultValue: true
      },
      {
        name: 'filterSort',
        label: 'filterSort',
        title:
          '搜索时对筛选结果项的排序函数, 类似Array.sort里的 compareFunction',
        setters: 'FunctionSetter' //?? 	(optionA: Option, optionB: Option) => number
      },
      {
        name: 'firstActiveValue',
        label: 'firstActiveValue',
        title: '默认高亮的选项',
        setters: ['StringSetter', 'ArraySetter']
      },
      {
        name: 'getPopupContainer',
        label: 'getPopupContainer',
        title:
          '菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位',
        setters: 'FunctionSetter' //?? 	function(triggerNode)
      },
      {
        name: 'labelInValue',
        label: 'labelInValue',
        title:
          '是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 {key: string, label: vNodes, originLabel: any} 的格式, originLabel（3.1） 保持原始类型，如果通过 a-select-option children 构造的节点，该值是是个函数（即 a-select-option 的默认插槽）',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'listHeight',
        label: 'listHeight',
        title: '设置弹窗滚动高度',
        setters: 'NumberSetter',
        defaultValue: 256
      },
      {
        name: 'loading',
        label: 'loading',
        title: '是否显示加载中状态',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'maxTagCount',
        label: 'maxTagCount',
        title: '最多显示多少个 tag',
        setters: 'NumberSetter'
      },
      {
        name: 'maxTagPlaceholder',
        label: 'maxTagPlaceholder',
        title: '隐藏 tag 时显示的内容',
        setters: 'FunctionSetter' //?? slot | function(omittedValues)
      },
      {
        name: 'maxTagTextLength',
        label: 'maxTagTextLength',
        title: '最大显示的 tag 文本长度',
        setters: 'NumberSetter'
      },
      {
        name: 'mode',
        label: 'mode',
        title: '设置 Select 的模式为多选或标签',
        setters: 'SelectSetter',
        options: ['multiple', 'tags', 'combobox']
      },
      {
        name: 'notFoundContent',
        label: 'notFoundContent',
        title: '当下拉列表为空时显示的内容',
        setters: 'StringSetter', //?? string|slot
        defaultValue: 'Not Found'
      },
      {
        name: 'open',
        label: 'open',
        title: '是否展开下拉菜单',
        setters: 'BooleanSetter'
      },
      {
        name: 'optionFilterProp',
        label: 'optionFilterProp',
        title: '搜索时过滤对应的 option 属性，不支持 children',
        setters: 'StringSetter',
        defaultValue: 'value'
      },
      {
        name: 'optionLabelProp',
        label: 'optionLabelProp',
        title:
          '回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 value',
        setters: 'StringSetter',
        defaultValue: 'children' //?? children | label(设置 options 时)
      },
      {
        name: 'options',
        label: 'options',
        title: 'options 数据，如果设置则不需要手动构造 selectOption 节点',
        setters: 'ArraySetter',
        defaultValue: []
      },
      {
        name: 'placeholder',
        label: 'placeholder',
        title: '选择框默认文字',
        setters: 'StringSetter' //?? 	string|slot
      },
      {
        name: 'placement',
        label: 'placement',
        title: '选择框弹出的位置',
        setters: 'SelectSetter',
        options: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'],
        defaultValue: 'bottomLeft'
      },
      {
        name: 'searchValue',
        label: 'searchValue',
        title: '控制搜索文本',
        setters: 'StringSetter'
      },
      {
        name: 'showArrow',
        label: 'showArrow',
        title: '是否显示下拉小箭头',
        setters: 'BooleanSetter'
        // defaultValue: true //??  单选为 true,多选为 false
      },
      {
        name: 'showSearch',
        label: 'showSearch',
        title: '配置是否可搜索',
        setters: 'BooleanSetter'
        // defaultValue: false //?? 	单选为 false,多选为 true
      },
      {
        name: 'size',
        label: 'size',
        title: '选择框大小，可选 large small',
        setters: 'SelectSetter',
        options: ['large', 'default', 'small'],
        defaultValue: 'default'
      },
      {
        name: 'status',
        label: 'status',
        title: '设置校验状态',
        setters: 'SelectSetter',
        options: ['error', 'warning']
      },
      {
        name: 'tagRender',
        label: 'tagRender',
        title: '自定义 tag 内容 render，仅在 mode 为 multiple 或 tags 时生效',
        setters: 'FunctionSetter' //?? slot | (props) => any
      },
      {
        name: 'tokenSeparators',
        label: 'tokenSeparators',
        title: '自动分词的分隔符，仅在 mode="tags" 时生效',
        setters: 'ArraySetter' //??  string[]
      },
      {
        name: 'value',
        label: 'value',
        title: '指定当前选中的条目',
        setters: ['StringSetter', 'NumberSetter', 'ArraySetter'] //?? 	string|string[]|number|number[]
      },
      {
        name: 'virtual',
        label: 'virtual',
        title: '设置 false 时关闭虚拟滚动',
        setters: 'BooleanSetter',
        defaultValue: true
      }
    ],
    events: [
      'blur',
      'change',
      'deselect',
      'dropdownVisibleChange',
      'focus',
      'inputKeyDown',
      'mouseenter',
      'mouseleave',
      'popupScroll',
      'search',
      'select',
      'update:value'
    ],
    // slots: [
    //   'clearIcon',
    //   'maxTagPlaceholder',
    //   'menuItemSelectedIcon',
    //   'notFoundContent',
    //   'option',
    //   'placeholder',
    //   'removeIcon',
    //   'suffixIcon',
    //   'tagRender'
    // ],
    slots: [
      { name: 'default' },
      { name: 'clearIcon' },
      { name: 'maxTagPlaceholder' },
      { name: 'menuItemSelectedIcon' },
      { name: 'notFoundContent' },
      {
        name: 'option',
        params: ['value', 'label', 'array'] //! {value, label, [disabled, key, title]}
      },
      { name: 'placeholder' },
      { name: 'removeIcon' },
      { name: 'suffixIcon' },
      { name: 'tagRender' }
    ],
    snippet: {
      props: { style: { width: '120px' }, value: 'lucy' },
      children: [
        {
          name: 'ASelectOption',
          children: 'Jack',
          props: { value: 'jack' }
        },
        {
          name: 'ASelectOption',
          children: 'Lucy',
          props: { value: 'lucy' }
        },
        {
          name: 'ASelectOption',
          children: 'Disabled',
          props: { value: 'disabled', disabled: true }
        },
        {
          name: 'ASelectOption',
          children: 'Wendy',
          props: { value: 'wendy' }
        }
      ]
    }
  },
  {
    name: 'ASelectOption',
    alias: 'SelectOption',
    parentIncludes: ['ASelect', 'ASelectOptGroup'],
    parent: 'Select',
    label: '选择器项',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/select-cn',
    props: [
      {
        name: 'class',
        label: 'class',
        title: 'Option 器类名',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '是否禁用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'key',
        label: 'key',
        title:
          '和 value 含义一致。如果 Vue 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置',
        setters: 'StringSetter'
      },
      {
        name: 'title',
        label: 'title',
        title: '选中该 Option 后，Select 的 title',
        setters: 'StringSetter'
      },
      {
        name: 'value',
        label: 'value',
        title: '默认根据此属性值进行筛选',
        setters: ['StringSetter', 'NumberSetter']
      }
    ],
    snippet: {
      children: 'SelectOption',
      props: { value: 'SelectOption' }
    }
  },
  {
    name: 'ASelectOptGroup',
    alias: 'SelectOptGroup',
    parentIncludes: ['ASelect'],
    parent: 'Select',
    label: '选择器组',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/select-cn',
    props: [
      {
        name: 'key',
        label: 'key',
        setters: 'StringSetter'
      },
      {
        name: 'label',
        label: 'label',
        title: '组名',
        setters: ['StringSetter', 'FunctionSetter'] //?? string|function(h)|slot
        // defaultValue: '' //?? 无
      }
    ],
    slots: ['label'],
    snippet: {
      slot: 'label',
      children: [
        {
          name: 'span',
          slot: { name: 'label' },
          children: 'Manager'
        },
        { name: 'ASelectOption', children: 'Jack', props: { value: 'jack' } },
        { name: 'ASelectOption', children: 'Lucy', props: { value: 'lucy' } }
      ]
    }
  }
];
export default components;
