import type { MaterialDescription } from '@vtj/core';
import { mockTreeData } from '../shared';
const components: MaterialDescription[] = [
  {
    name: 'ACascader',
    alias: 'Cascader',
    label: '级联选择器',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/cascader-cn',
    props: [
      {
        name: 'allowClear',
        label: 'allowClear',
        title: '是否支持清除',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'autofocus',
        label: 'autofocus',
        title: '自动获取焦点',
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
        name: 'changeOnSelect',
        label: 'changeOnSelect',
        title:
          '（单选时生效）当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'defaultValue',
        label: 'defaultValue',
        title: '默认的选中项',
        setters: 'ArraySetter',
        defaultValue: []
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '禁用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'displayRender',
        label: 'displayRender',
        title:
          '选择后展示的渲染函数,可使用 #displayRender="{labels, selectedOptions}"',
        setters: 'FunctionSetter' //?? ({labels, selectedOptions}) => VNode
      },
      {
        name: 'popupClassName',
        label: 'popupClassName',
        title: '自定义浮层类名',
        setters: 'StringSetter'
      },
      {
        name: 'dropdownStyle',
        label: 'dropdownStyle',
        title: '自定义浮层样式',
        setters: 'ObjectSetter',
        defaultValue: {}
      },
      {
        name: 'expandTrigger',
        label: 'expandTrigger',
        title: '次级菜单的展开方式',
        setters: 'SelectSetter',
        options: ['click', 'hover'],
        defaultValue: 'click'
      },
      {
        name: 'fieldNames',
        label: 'fieldNames',
        title: '自定义 options 中 label value children 的字段',
        setters: 'ObjectSetter',
        defaultValue: { label: 'label', value: 'value', children: 'children' }
      },
      {
        name: 'getPopupContainer',
        label: 'getPopupContainer',
        title:
          '菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位',
        setters: 'FunctionSetter'
      },
      {
        name: 'loadData',
        label: 'loadData',
        title: '用于动态加载选项，无法与 showSearch 一起使用',
        setters: 'FunctionSetter'
      },
      {
        name: 'maxTagCount',
        label: 'maxTagCount',
        title: '最多显示多少个 tag，响应式模式会对性能产生损耗',
        setters: ['NumberSetter', 'SelectSetter'], //??		number | responsive
        options: ['responsive']
      },
      {
        name: 'maxTagPlaceholder',
        label: 'maxTagPlaceholder',
        title: '隐藏 tag 时显示的内容',
        setters: 'FunctionSetter'
      },
      {
        name: 'multiple',
        label: 'multiple',
        title: '支持多选节点',
        setters: 'BooleanSetter'
      },
      {
        name: 'notFoundContent',
        label: 'notFoundContent',
        title: '当下拉列表为空时显示的内容',
        setters: 'StringSetter',
        defaultValue: 'Not Found'
      },
      {
        name: 'open',
        label: 'open',
        title: '控制浮层显隐',
        setters: 'BooleanSetter'
      },
      {
        name: 'options',
        label: 'options',
        title: '可选项数据源',
        setters: 'ArraySetter'
      },
      {
        name: 'placeholder',
        label: 'placeholder',
        title: '输入框占位文本',
        setters: 'StringSetter',
        defaultValue: '请选择'
      },
      {
        name: 'placement',
        label: 'placement',
        title: '浮层预设位置',
        setters: 'SelectSetter',
        options: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'],
        defaultValue: 'bottomLeft'
      },
      {
        name: 'showCheckedStrategy',
        label: 'showCheckedStrategy',
        title:
          '定义选中项回填的方式。Cascader.SHOW_CHILD: 只显示选中的子节点。Cascader.SHOW_PARENT: 只显示父节点（当父节点下所有子节点都选中时）',
        setters: 'SelectSetter',
        options: ['Cascader.SHOW_PARENT', 'Cascader.SHOW_PARENT'],
        defaultValue: 'Cascader.SHOW_PARENT'
      },
      {
        name: 'searchValue',
        label: 'searchValue',
        title: '设置搜索的值，需要与 showSearch 配合使用',
        setters: 'StringSetter'
      },
      {
        name: 'showSearch',
        label: 'showSearch',
        title: '在选择框中显示搜索框',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'status',
        label: 'status',
        title: '设置校验状态',
        setters: 'SelectSetter',
        options: ['error', 'warning']
      },
      {
        name: 'size',
        label: 'size',
        title: '输入框大小',
        setters: 'SelectSetter',
        options: ['larger', 'default', 'small'],
        defaultValue: 'default'
      },
      {
        name: 'suffixIcon',
        label: 'suffixIcon',
        title: '自定义的选择框后缀图标',
        setters: 'StringSetter'
      },
      {
        name: 'value',
        label: 'value',
        title: '指定选中项',
        setters: 'ArraySetter'
      }
    ],
    events: ['change', 'dropdownVisibleChange', 'search', 'update:value'],
    slots: [
      'default',
      'clearIcon',
      'expandIcon',
      'maxTagPlaceholder',
      'notFoundContent',
      'removeIcon',
      'suffixIcon',
      'tagRender'
    ],
    snippet: {
      props: {
        options: mockTreeData(),
        props: {},
        value: []
      }
    }
  }
];
export default components;
