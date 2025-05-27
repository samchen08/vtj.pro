import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AList',
    alias: 'List',
    label: '列表',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/list-cn',
    props: [
      {
        name: 'bordered',
        label: 'bordered',
        title: '是否展示边框',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'dataSource',
        label: 'dataSource',
        title: '列表数据源',
        setters: 'ArraySetter'
      },
      {
        name: 'footer',
        label: 'footer',
        title: '列表底部',
        setters: 'StringSetter'
      },
      {
        name: 'grid',
        label: 'grid',
        title: '列表栅格配置',
        setters: 'ObjectSetter'
      },
      {
        name: 'header',
        label: 'header',
        title: '列表头部',
        setters: 'StringSetter'
      },
      {
        name: 'itemLayout',
        label: 'itemLayout',
        title: '设置 List.Item 布局, 设置成 vertical 则竖直样式显示, 默认横排',
        setters: 'StringSetter'
      },
      {
        name: 'loading',
        label: 'loading',
        title: '当卡片内容还在加载中时，可以用 loading 展示一个占位',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'loadMore',
        label: 'loadMore',
        title: '加载更多',
        setters: 'StringSetter'
      },
      {
        name: 'locale',
        label: 'locale',
        title: '默认文案设置，目前包括空数据文案',
        setters: 'ObjectSetter',
        defaultValue: { emptyText: '暂无数据' }
      },
      {
        name: 'pagination',
        label: 'pagination',
        title: '对应的 pagination 配置, 设置 false 不显示',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'renderItem',
        label: 'renderItem',
        title: '自定义Item函数，也可使用 #renderItem="{item, index}"',
        setters: 'FunctionSetter'
      },
      {
        name: 'rowKey',
        label: 'rowKey',
        title: '各项 key 的取值，可以是字符串或一个函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'size',
        label: 'size',
        title: 'list 的尺寸',
        setters: 'SelectSetter',
        options: ['default', 'middle', 'small'],
        defaultValue: 'default'
      },
      {
        name: 'split',
        label: 'split',
        title: '是否展示分割线',
        setters: 'BooleanSetter',
        defaultValue: true
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'footer'
      },
      {
        name: 'header'
      },
      {
        name: 'loadMore'
      },
      {
        name: 'renderItem',
        params: ['item', 'index']
      }
    ],
    snippet: {
      props: {
        itemLayout: 'horizontal',
        dataSource: [
          {
            title: 'Ant Design Title 1'
          },
          {
            title: 'Ant Design Title 2'
          },
          {
            title: 'Ant Design Title 3'
          },
          {
            title: 'Ant Design Title 4'
          }
        ]
      },
      slot: 'renderItem',
      children: [
        {
          name: 'span',
          slot: { name: 'renderItem', params: ['item', 'index'] },
          children: [
            {
              name: 'AListItem',
              children: [
                {
                  name: 'AListItemMeta',
                  props: {
                    description:
                      'Ant Design, a design language for background applications, is refined by Ant UED Team'
                  },
                  children: [
                    {
                      name: 'a',
                      slot: { name: 'title' },
                      props: { href: 'https://www.antdv.com/' }
                    },
                    {
                      name: 'AAvatar',
                      slot: { name: 'avatar' },
                      props: { href: 'https://joeschmoe.io/api/v1/random' }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    name: 'AListItem',
    alias: 'Item',
    parent: 'List',
    label: '列表项',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/list-cn',
    props: [
      {
        name: 'actions',
        label: 'actions',
        title: '列表操作组，根据 itemLayout 的不同, 位置在卡片底部或者最右侧',
        setters: 'StringSetter'
      },
      {
        name: 'extra',
        label: 'extra',
        title:
          '额外内容, 通常用在 itemLayout 为 vertical 的情况下, 展示右侧内容; horizontal 展示在列表元素最右侧',
        setters: 'StringSetter'
      }
    ],
    slots: ['default', 'actions', 'extra'],
    snippet: {
      children: [
        {
          name: 'AListItemMeta',
          props: {
            description:
              'Ant Design, a design language for background applications, is refined by Ant UED Team'
          },
          children: [
            {
              name: 'a',
              slot: { name: 'title' },
              props: { href: 'https://www.antdv.com/' },
              children: 'itemTitle'
            },
            {
              name: 'AAvatar',
              slot: { name: 'avatar' },
              props: { href: 'https://joeschmoe.io/api/v1/random' }
            }
          ]
        }
      ]
    }
  },
  {
    name: 'AListItemMeta',
    alias: 'Meta',
    parent: 'ListItem',
    label: '列表项meta',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/list-cn',
    props: [
      {
        name: 'avatar',
        label: 'avatar',
        title: '列表元素的图标',
        setters: 'StringSetter'
      },
      {
        name: 'description',
        label: 'description',
        title: '列表元素的描述内容',
        setters: 'StringSetter'
      },
      {
        name: 'title',
        label: 'title',
        title: '列表元素的标题',
        setters: 'StringSetter'
      }
    ],
    slots: ['default', 'avatar', 'description', 'title'],
    snippet: {
      props: {
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team'
      }
    }
  }
];
export default components;
