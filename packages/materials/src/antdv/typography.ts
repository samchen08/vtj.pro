import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ATypography',
    alias: 'Typography',
    label: '排版',
    childIncludes: [
      'ATypographyText',
      'ATypographyTitle',
      'ATypographyParagraph'
    ],
    categoryId: 'base',
    doc: 'https://www.antdv.com/components/typography-cn',
    slots: [
      'copyableIcon',
      'copyableTooltip',
      'editableIcon',
      'editableTooltip',
      'ellipsisSymbol',
      'ellipsisTooltip',
      'enterEnterIcon'
    ],
    snippet: {
      children: [
        { name: 'ATypographyTitle', children: 'Introduction' },
        {
          name: 'ATypographyParagraph',
          children:
            'In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development'
        },
        {
          name: 'ATypographyParagraph',
          children: [
            {
              name: 'ATypographyText',
              children:
                'uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development.'
            }
          ]
        }
      ]
    }
  },
  {
    name: 'ATypographyText',
    alias: 'Text',
    parent: 'Typography',
    label: '文本内容',
    categoryId: 'base',
    doc: 'https://www.antdv.com/components/button-cn',
    props: [
      {
        name: 'code',
        label: 'code',
        title: '添加代码样式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'content',
        label: 'content',
        title: '当使用 ellipsis 或 editable 时，使用 content 代替 children',
        setters: 'StringSetter'
      },
      {
        name: 'copyable',
        label: 'copyable',
        title: '是否可拷贝，为对象时可进行各种自定义',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'delete',
        label: 'delete',
        title: '添加删除线样式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '禁用文本',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'editable',
        label: 'editable',
        title: '是否可编辑，为对象时可对编辑进行控制',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'ellipsis',
        label: 'ellipsis',
        title: '自动溢出省略，为对象时可设置省略行数、是否可展开、添加后缀等',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'keyboard',
        label: 'keyboard',
        title: '添加键盘样式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'mark',
        label: 'mark',
        title: '添加标记样式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'strong',
        label: 'strong',
        title: '是否加粗',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'type',
        label: 'type',
        title: '文本类型',
        setters: 'SelectSetter',
        options: ['secondary', 'success', 'warning', 'danger']
      },
      {
        name: 'underline',
        label: 'underline',
        title: '添加下划线样式',
        setters: 'BooleanSetter',
        defaultValue: false
      }
    ],
    snippet: {
      children:
        'uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development.'
    },
    events: ['update:content']
  },
  {
    name: 'ATypographyTitle',
    alias: 'Title',
    parent: 'Typography',
    label: '文本标题',
    categoryId: 'base',
    doc: 'https://www.antdv.com/components/button-cn',
    props: [
      {
        name: 'code',
        label: 'code',
        title: '添加代码样式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'content',
        label: 'content',
        title: '当使用 ellipsis 或 editable 时，使用 content 代替 children',
        setters: 'StringSetter'
      },
      {
        name: 'copyable',
        label: 'copyable',
        title: '是否可拷贝，为对象时可进行各种自定义',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'delete',
        label: 'delete',
        title: '添加删除线样式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '禁用文本',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'editable',
        label: 'editable',
        title: '是否可编辑，为对象时可对编辑进行控制',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'ellipsis',
        label: 'ellipsis',
        title: '自动溢出省略，为对象时可设置省略行数、是否可展开、添加后缀等',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'level',
        label: 'level',
        title: '重要程度，相当于 h1、h2、h3、h4、h5',
        setters: ['SelectSetter', 'NumberSetter'],
        //?? number: 1, 2, 3, 4, 5
        options: [
          { label: 'H1', value: 1 },
          { label: 'H2', value: 2 },
          { label: 'H3', value: 3 },
          { label: 'H4', value: 4 },
          { label: 'H5', value: 5 }
        ],
        defaultValue: 1
      },
      {
        name: 'mark',
        label: 'mark',
        title: '添加标记样式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'type',
        label: 'type',
        title: '文本类型',
        setters: 'SelectSetter',
        options: ['secondary', 'success', 'warning', 'danger']
      },
      {
        name: 'underline',
        label: 'underline',
        title: '添加下划线样式',
        setters: 'BooleanSetter',
        defaultValue: false
      }
    ],
    snippet: {
      children: 'Introduction'
    },
    events: ['update:content']
  },
  {
    name: 'ATypographyParagraph',
    alias: 'Paragraph',
    parent: 'Typography',
    label: '文本段落',
    categoryId: 'base',
    doc: 'https://www.antdv.com/components/button-cn',
    props: [
      {
        name: 'code',
        label: 'code',
        title: '添加代码样式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'content',
        label: 'content',
        title: '当使用 ellipsis 或 editable 时，使用 content 代替 children',
        setters: 'StringSetter'
      },
      {
        name: 'copyable',
        label: 'copyable',
        title: '是否可拷贝，为对象时可进行各种自定义',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'delete',
        label: 'delete',
        title: '添加删除线样式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '禁用文本',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'editable',
        label: 'editable',
        title: '是否可编辑，为对象时可对编辑进行控制',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'ellipsis',
        label: 'ellipsis',
        title: '自动溢出省略，为对象时可设置省略行数、是否可展开、添加后缀等',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'mark',
        label: 'mark',
        title: '添加标记样式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'strong',
        label: 'strong',
        title: '是否加粗',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'type',
        label: 'type',
        title: '文本类型',
        setters: 'SelectSetter',
        options: ['secondary', 'success', 'warning', 'danger']
      },
      {
        name: 'underline',
        label: 'underline',
        title: '添加下划线样式',
        setters: 'BooleanSetter',
        defaultValue: false
      }
    ],
    snippet: {
      children: [
        {
          name: 'ATypographyParagraph',
          children:
            'In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development'
        },
        {
          name: 'ATypographyParagraph',
          children: [
            {
              name: 'ATypographyText',
              children:
                'uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development.'
            }
          ]
        }
      ]
    },
    events: ['update:content'],
    slots: [
      'copyableIcon',
      'copyableTooltip',
      'editableIcon',
      'editableTooltip',
      'ellipsisSymbol',
      'ellipsisTooltip',
      'enterEnterIcon'
    ]
  },
  {
    name: 'ATypographyLink',
    alias: 'Paragraph',
    parent: 'Typography',
    label: '超链接',
    categoryId: 'base',
    doc: 'https://www.antdv.com/components/button-cn',
    props: [
      {
        name: 'href',
        label: '超链接',
        setters: 'string',
        defaultValue: ''
      },
      {
        name: 'target',
        label: '目标',
        setters: 'string',
        defaultValue: ''
      }
    ]
  }
];

export default components;
