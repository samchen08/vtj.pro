import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ATreeSelect',
    alias: 'TreeSelect',
    label: '树选择',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/tree-select-cn',
    props: [
      {
        name: 'allowClear',
        label: 'allowClear',
        title: '显示清除按钮',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'defaultValue',
        label: 'defaultValue',
        title: '指定默认选中的条目',
        setters: ['StringSetter', 'ArraySetter']
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
        setters: ['BooleanSetter', 'NumberSetter'],
        defaultValue: true
      },
      {
        name: 'dropdownStyle',
        label: 'dropdownStyle',
        title: '下拉菜单的样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'fieldNames',
        label: 'fieldNames',
        title:
          '替换 treeNode 中 label,value,children 字段为 treeData 中对应的字段',
        setters: 'ObjectSetter',
        defaultValue: { children: 'children', label: 'title', value: 'value' }
      },
      {
        name: 'filterTreeNode',
        label: 'filterTreeNode',
        title:
          '是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值',
        setters: ['BooleanSetter', 'FunctionSetter']
      },
      {
        name: 'getPopupContainer',
        label: 'getPopupContainer',
        title:
          '菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位',
        setters: 'FunctionSetter'
      },
      {
        name: 'labelInValue',
        label: 'labelInValue',
        title:
          '是否把每个选项的 label 包装到 value 中，会把 value 类型从 string 变为 {value: string, label: VNode, halfChecked(treeCheckStrictly 时有效): string[] } 的格式',
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
        name: 'loadData',
        label: 'loadData',
        title: '异步加载数据',
        setters: 'FunctionSetter'
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
        setters: 'FunctionSetter'
      },
      {
        name: 'multiple',
        label: 'multiple',
        title: '支持多选（当设置 treeCheckable 时自动变为 true）',
        setters: 'BooleanSetter',
        defaultValue: false
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
        name: 'replaceFields',
        label: 'replaceFields',
        title:
          '替换 treeNode 中 label,value,key,children 字段为 treeData 中对应的字段',
        setters: 'ObjectSetter',
        defaultValue: {
          children: 'children',
          label: 'title',
          key: 'key',
          value: 'value'
        }
      },
      {
        name: 'searchPlaceholder',
        label: 'searchPlaceholder',
        title: '搜索框默认文字',
        setters: 'StringSetter'
      },
      {
        name: 'searchValue',
        label: 'searchValue',
        title: '搜索框的值，可以通过 search 事件获取用户输入',
        setters: 'StringSetter'
      },
      {
        name: 'showCheckedStrategy',
        label: 'showCheckedStrategy',
        title:
          '定义选中项回填的方式。TreeSelect.SHOW_ALL: 显示所有选中节点(包括父节点). TreeSelect.SHOW_PARENT: 只显示父节点(当父节点下所有子节点都选中时). 默认只显示子节点',
        setters: 'SelectSetter',
        options: [
          'TreeSelect.SHOW_ALL',
          'TreeSelect.SHOW_PARENT',
          'TreeSelect.SHOW_CHILD'
        ],
        defaultValue: 'TreeSelect.SHOW_CHILD'
      },
      {
        name: 'showSearch',
        label: 'showSearch',
        title: '在下拉中显示搜索框(仅在单选模式下生效)',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'size',
        label: 'size',
        title: '选择框大小，可选 large small',
        setters: 'SelectSetter',
        options: ['larger', 'small'],
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
        name: 'treeCheckable',
        label: 'treeCheckable',
        title: '显示 checkbox',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'treeCheckStrictly',
        label: 'treeCheckStrictly',
        title:
          'checkable 状态下节点选择完全受控（父子节点选中状态不再关联），会使得 labelInValue 强制为 true',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'treeData',
        label: 'treeData',
        title:
          'treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（value 在整个树范围内唯一）',
        setters: 'ArraySetter', //?? array<{value, label, children, [disabled, disableCheckbox, selectable]}>
        defaultValue: []
      },
      {
        name: 'treeDataSimpleMode',
        label: 'treeDataSimpleMode',
        title:
          '使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: [{id:1, pId:0, value:"1", label:"test1",...},...], pId 是父节点的 id)',
        setters: ['BooleanSetter', 'ArraySetter'], //?? false|Array<{ id: string, pId: string, rootPId: null }>
        defaultValue: false
      },
      {
        name: 'treeDefaultExpandAll',
        label: 'treeDefaultExpandAll',
        title: '默认展开所有树节点',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'treeDefaultExpandedKeys',
        label: 'treeDefaultExpandedKeys',
        title: '默认展开的树节点',
        setters: 'ArraySetter'
      },
      {
        name: 'treeExpandedKeys',
        label: 'treeExpandedKeys',
        title: '设置展开的树节点',
        setters: 'ArraySetter'
      },
      {
        name: 'treeIcon',
        label: 'treeIcon',
        title:
          '是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'treeLine',
        label: 'treeLine',
        title: '是否展示线条样式',
        setters: ['BooleanSetter', 'ObjectSetter'], //?? boolean | object
        defaultValue: false
      },
      {
        name: 'treeLoadedKeys',
        label: 'treeLoadedKeys',
        title: '（受控）已经加载的节点，需要配合 loadData 使用',
        setters: 'ArraySetter', //?? string[]
        defaultValue: []
      },
      {
        name: 'treeNodeFilterProp',
        label: 'treeNodeFilterProp',
        title: '输入项过滤对应的 treeNode 属性',
        setters: 'StringSetter',
        defaultValue: 'value'
      },
      {
        name: 'treeNodeLabelProp',
        label: 'treeNodeLabelProp',
        title: '作为显示的 prop 设置',
        setters: 'StringSetter',
        defaultValue: 'title'
      },
      {
        name: 'value',
        label: 'value',
        title: '指定当前选中的条目',
        setters: ['StringSetter', 'ArraySetter']
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
      'change',
      'dropdownVisibleChange',
      'search',
      'select',
      'treeExpand',
      'update:searchValue',
      'update:treeExpandedKeys',
      'update:value'
    ],
    slots: [
      'default',
      'maxTagPlaceholder',
      'notFoundContent',
      'placeholder',
      'searchPlaceholder',
      'suffixIcon',
      'tagRender',
      'title'
    ],
    snippet: {
      //  ! 选中没值
      props: {
        value: '',
        showSearch: true,
        dropdownStyle: { maxHeight: '400px', overflow: 'auto' },
        placeholder: 'please select',
        treeDefaultExpandAll: true,
        allowClear: true,
        style: {
          width: '100%'
        },
        treeData: [
          {
            label: 'root 1',
            value: 'root 1',
            children: [
              {
                label: 'parent 1',
                value: 'parent 1',
                children: [
                  {
                    label: 'parent 1-0',
                    value: 'parent 1-0',
                    children: [
                      {
                        label: 'my leaf',
                        value: 'leaf1'
                      },
                      {
                        label: 'your leaf',
                        value: 'leaf2'
                      }
                    ]
                  },
                  {
                    label: 'parent 1-1',
                    value: 'parent 1-1'
                  }
                ]
              },
              {
                label: 'parent 2',
                value: 'parent 2'
              }
            ]
          }
        ],
        treeNodeFilterProp: 'label'
      }
    }
  }
];
export default components;
