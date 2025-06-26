import type { MaterialDescription } from '@vtj/core';

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1
  });
}

const components: MaterialDescription[] = [
  {
    name: 'ATransfer',
    alias: 'Transfer',
    label: '穿梭框',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/transfer-cn',
    props: [
      {
        name: 'dataSource',
        label: 'dataSource',
        title:
          '数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外',
        setters: 'ArraySetter',
        defaultValue: []
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '是否禁用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'filterOption',
        label: 'filterOption',
        title:
          '接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false',
        setters: 'FunctionSetter'
      },
      {
        name: 'footer',
        label: 'footer',
        title: '可以设置为一个 作用域插槽'
      },
      {
        name: 'listStyle',
        label: 'listStyle',
        title: '两个穿梭框的自定义样式',
        setters: 'ObjectSetter' //?? 	CSSProperties
      },
      {
        name: 'locale',
        label: 'locale',
        title: '各种语言',
        setters: 'ObjectSetter',
        defaultValue: {
          itemUnit: '项',
          itemsUnit: '项',
          notFoundContent: '列表为空',
          searchPlaceholder: '请输入搜索内容'
        }
      },
      {
        name: 'oneWay',
        label: 'oneWay',
        title: '展示为单向样式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'operations',
        label: 'operations',
        title: '操作文案集合，顺序从上至下',
        setters: 'ArraySetter',
        defaultValue: ['>', '<']
      },
      {
        name: 'operationStyle',
        label: 'operationStyle',
        title: '操作栏的自定义样式',
        setters: 'ObjectSetter' //?? 	CSSProperties
      },
      {
        name: 'pagination',
        label: 'pagination',
        title: '使用分页样式，自定义渲染列表下无效',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'render',
        label: 'render',
        title:
          '每行数据渲染函数，该函数的入参为 dataSource 中的项，返回值为 element。或者返回一个普通对象，其中 label 字段为 element，value 字段为 title',
        setters: 'FunctionSetter'
      },
      {
        name: 'selectAllLabels',
        label: 'selectAllLabels',
        title: '自定义顶部多选框标题的集合',
        setters: 'FunctionSetter' //??	VueNode | ((info: { selectedCount: number; totalCount: number }) => VueNode);
      },
      {
        name: 'selectedKeys',
        label: 'selectedKeys',
        title: '设置哪些项应该被选中',
        setters: 'ArraySetter', //??	string[]
        defaultValue: []
      },
      {
        name: 'showSearch',
        label: 'showSearch',
        title: '是否显示搜索框',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'showSelectAll',
        label: 'showSelectAll',
        title: '是否展示全选勾选框',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'status',
        label: 'status',
        title: '设置校验状态',
        setters: 'SelectSetter',
        options: ['error', 'warning']
      },
      {
        name: 'targetKeys',
        label: 'targetKeys',
        title: '显示在右侧框数据的 key 集合',
        setters: 'ArraySetter',
        defaultValue: []
      },
      {
        name: 'titles',
        label: 'titles',
        title: '标题集合，顺序从左至右',
        setters: 'ArraySetter',
        defaultValue: ['', '']
      }
    ],
    events: [
      'change',
      'scroll',
      'search',
      'selectChange',
      'update:selectedKeys',
      'update:targetKeys'
    ],
    slots: ['default', 'footer', 'render', 'selectAllLabels'],
    snippet: {
      props: {
        dataSource: mockData,
        titles: "['Source', 'Target']"
      }
    }
  }
];
export default components;
