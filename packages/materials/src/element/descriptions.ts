import type { MaterialDescription } from '@vtj/core';
const Descriptions: MaterialDescription[] = [
  {
    name: 'ElDescriptions',
    label: '描述列表',

    categoryId: 'data',
    package: 'element-plus',
    doc: 'https://element-plus.org/zh-CN/component/descriptions.html',
    props: [
      {
        name: 'border',
        title: '是否带有边框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'column',
        title: '一行 Descriptions Item 的数量',
        defaultValue: 3,
        setters: 'NumberSetter'
      },
      {
        name: 'direction',
        title: '排列的方向',
        defaultValue: 'horizontal',
        options: ['vertical', 'horizontal'],
        setters: 'SelectSetter'
      },
      {
        name: 'size',
        title: '列表的尺寸',
        defaultValue: '',
        options: ['', 'large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'title',
        title: '标题文本，显示在左上方',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'extra',
        title: '操作区文本，显示在右上方',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'labelWidth',
        title: '每一列的标签宽度',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter']
      }
    ],
    slots: ['default', 'title', 'extra'],
    snippet: {
      props: {
        border: true
      },
      children: [
        {
          name: 'ElDescriptionsItem',
          children: 'kooriookami',
          props: {
            label: 'Username'
          }
        },
        {
          name: 'ElDescriptionsItem',
          children: '18100000000',
          props: {
            label: 'Telephone'
          }
        },
        {
          name: 'ElDescriptionsItem',
          children: 'Suzhou',
          props: {
            label: 'Place'
          }
        },
        {
          name: 'ElDescriptionsItem',
          children:
            'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangs Province',
          props: {
            label: 'Address'
          }
        }
      ]
    }
  },
  {
    name: 'ElDescriptionsItem',
    label: '描述列表子项',

    categoryId: 'data',
    parentIncludes: ['ElDescriptions'],
    package: 'element-plus',
    props: [
      {
        name: 'label',
        title: '标签文本',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'span',
        title: '列的数量',
        defaultValue: 1,
        setters: 'NumberSetter'
      },
      {
        name: 'rowspan',
        title: '单元格应该跨越的行数',
        defaultValue: 1,
        setters: 'NumberSetter'
      },
      {
        name: 'width',
        title: '列的宽度，不同行相同列的宽度按最大值设定（如无 border ，宽度包含标签与内容）',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'min-width',
        title: '列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列（如无 border，宽度包含标签与内容）',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'labelWidth',
        title: '列标签宽，如果未设置，它将与列宽度相同。 比 Descriptions 的 label-width 优先级高',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'align',
        title: '列的内容对齐方式（如无 border，对标签和内容均生效）',
        defaultValue: 'left',
        options: ['left', 'center', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'label-align',
        title: '列的标签对齐方式，若不设置该项，则使用内容的对齐方式（如无 border，请使用 align 参数）',
        defaultValue: '',
        options: ['left', 'center', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'class-name',
        title: '列的内容自定义类名',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'label-class-name',
        title: 'column label custom class name',
        defaultValue: '',
        label: '标题类名',
        setters: 'InputSetter'
      }
    ],
    slots: ['default', 'label'],
    snippet: {
      children: '内容',
      props: {
        label: '标题'
      }
    }
  }
];

export default Descriptions;
