import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ATree',
    alias: 'Tree',
    label: '树形控件',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/tree-cn',
    props: [
      {
        name: 'allowDrop',
        label: 'allowDrop',
        title: '是否允许拖拽时放置在该节点',
        setters: 'FunctionSetter' //?? 	({ dropNode, dropPosition }) => boolean
      },
      {
        name: 'autoExpandParent',
        label: 'autoExpandParent',
        title: '是否自动展开父节点',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'blockNode',
        label: 'blockNode',
        title: '是否节点占据一行',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'checkable',
        label: 'checkable',
        title: '节点前添加 Checkbox 复选框',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'checkedKeys',
        label: 'checkedKeys',
        title:
          '（受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置checkable和checkStrictly，它是一个有checked和halfChecked属性的对象，并且父子节点的选中与否不再关联',
        setters: ['ArraySetter', 'ObjectSetter'], //??  string[] | number[] | {checked: string[] | number[], halfChecked: string[] | number[]}
        defaultValue: []
      },
      {
        name: 'checkStrictly',
        label: 'checkStrictly',
        title: 'checkable 状态下节点选择完全受控（父子节点选中状态不再关联）',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'defaultExpandAll',
        label: 'defaultExpandAll',
        title:
          '默认展开所有树节点, 如果是异步数据，需要在数据返回后再实例化，建议用 v-if="data.length"；当有 expandedKeys 时，defaultExpandAll 将失效',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '将树禁用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'draggable',
        label: 'draggable',
        title: '设置节点可拖拽',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'expandedKeys',
        label: 'expandedKeys',
        title: '（受控）展开指定的树节点',
        setters: 'ArraySetter',
        defaultValue: []
      },
      {
        name: 'fieldNames',
        label: 'fieldNames',
        title:
          '替换 treeNode 中 title,key,children 字段为 treeData 中对应的字段',
        setters: 'ObjectSetter',
        defaultValue: { children: 'children', title: 'title', key: 'key' }
      },
      {
        name: 'filterTreeNode',
        label: 'filterTreeNode',
        title: '按需筛选树节点（高亮），返回 true',
        setters: 'FunctionSetter' //?? 	function(node)
      },
      {
        name: 'height',
        label: 'height',
        title: '设置虚拟滚动容器高度，设置后内部节点不再支持横向滚动',
        setters: 'NumberSetter'
      },
      {
        name: 'loadData',
        label: 'loadData',
        title: '异步加载数据',
        setters: 'FunctionSetter' //?? 	function(node)
      },
      {
        name: 'loadedKeys',
        label: 'loadedKeys',
        title: '（受控）已经加载的节点，需要配合 loadData 使用',
        setters: 'ArraySetter',
        defaultValue: []
      },
      {
        name: 'multiple',
        label: 'multiple',
        title: '支持点选多个节点（节点本身）',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'selectable',
        label: 'selectable',
        title: '是否可选中',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'selectedKeys',
        label: 'selectedKeys',
        title: '（受控）设置选中的树节点',
        setters: 'ArraySetter'
      },
      {
        name: 'showIcon',
        label: 'showIcon',
        title:
          '是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'showLine',
        label: 'showLine',
        title: '是否展示连接线',
        setters: ['BooleanSetter', 'ObjectSetter'], //?? boolean | {showLeafIcon: boolean}
        defaultValue: false
      },
      {
        name: 'treeData',
        label: 'treeData',
        title:
          'treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一）',
        setters: 'ArraySetter' //?? TreeNode[]
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
      'check',
      'dragend',
      'dragenter',
      'dragleave',
      'dragover',
      'dragstart',
      'drop',
      'expand',
      'load',
      'rightClick',
      'select',
      'update:checkedKeys',
      'update:expandedKeys',
      'update:selectedKeys'
    ],
    slots: ['default', 'switcherIcon', 'title'],
    snippet: {
      props: {
        expandedKeys: ['0-0-0', '0-0-1'],
        selectedKeys: ['0-0-0', '0-0-1'],
        checkedKeys: ['0-0-0', '0-0-1'],
        checkable: true,
        treeData: [
          {
            title: 'parent 1',
            key: '0-0',
            children: [
              {
                title: 'parent 1-0',
                key: '0-0-0',
                disabled: true,
                children: [
                  { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
                  { title: 'leaf', key: '0-0-0-1' }
                ]
              },
              {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [{ key: '0-0-1-0', title: 'sss' }]
              }
            ]
          }
        ]
      }
    }
  }
];
export default components;
