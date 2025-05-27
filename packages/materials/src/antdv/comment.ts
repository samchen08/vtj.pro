import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AComment',
    alias: 'Comment',
    label: '评论',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/comment-cn',
    props: [
      {
        name: 'actions',
        label: 'actions',
        title: '在评论内容下面呈现的操作项列表',
        setters: 'ArraySetter'
      },
      {
        name: 'author',
        label: 'author',
        title: '要显示为注释作者的元素',
        setters: 'StringSetter'
      },
      {
        name: 'avatar',
        label: 'avatar',
        title: '要显示为评论头像的元素 - 通常是 antd Avatar 或者 src',
        setters: 'StringSetter'
      },
      {
        name: 'content',
        label: 'content',
        title: '评论的主要内容',
        setters: 'StringSetter'
      },
      {
        name: 'datetime',
        label: 'datetime',
        title: '展示时间描述',
        setters: 'StringSetter'
      }
    ],
    slots: ['default', 'actions', 'author', 'avatar', 'content', 'datetime'],
    snippet: {
      slot: 'actions',
      children: [
        // 图标
        // {
        //   name: 'span',
        //   slot: { name: 'actions' },
        //   props: { key: 'comment-basic-like' },
        //   children: [
        //     {
        //       name: 'ATooltip',
        //       props: { title: 'Like' },
        //       children: [
        //         {
        //           name: 'template',
        //           directives: [
        //             {
        //               name: 'vIf',
        //               value: {
        //                 type: 'JSExpression',
        //                 value: 'action === "liked"'
        //               }
        //             }
        //           ],
        //           children: [{ name: 'LikeFilled' }]
        //         },
        //         {
        //           name: 'template',
        //           directives: [
        //             {
        //               name: 'vElse',
        //               value: {
        //                 type: 'JSExpression',
        //                 value: 'action === "liked"'
        //               }
        //             }
        //           ],
        //           children: [{ name: 'LikeOutlined' }]
        //         }
        //       ]
        //     },
        //     {
        //       name: 'span',
        //       props: { style: { paddingLeft: '8px', cursor: 'auto' } },
        //       children: '0'
        //     }
        //   ]
        // },
        // {
        //   name: 'span',
        //   slot: { name: 'actions' },
        //   props: { key: 'comment-basic-dislike' },
        //   children: [
        //     {
        //       name: 'ATooltip',
        //       props: { title: 'Dislike' },
        //       children: [
        //         {
        //           name: 'template',
        //           directives: [
        //             {
        //               name: 'vIf',
        //               value: {
        //                 type: 'JSExpression',
        //                 value: 'action === "disliked"'
        //               }
        //             }
        //           ],
        //           children: [{ name: 'DislikeFilled' }]
        //         },
        //         {
        //           name: 'template',
        //           directives: [
        //             {
        //               name: 'vElse',
        //               value: {
        //                 type: 'JSExpression',
        //                 value: 'action === "disliked"'
        //               }
        //             }
        //           ],
        //           children: [{ name: 'DislikeOutlined' }]
        //         }
        //       ]
        //     },
        //     {
        //       name: 'span',
        //       props: { style: { paddingLeft: '8px', cursor: 'auto' } },
        //       children: '0'
        //     }
        //   ]
        // },
        {
          name: 'p',
          slot: { name: 'content' },
          children:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
        },
        { name: 'a', slot: { name: 'author' }, children: 'Han Solo' },
        {
          name: 'AAvatar',
          slot: { name: 'avatar' },
          props: {
            src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            alt: 'Han Solo'
          }
        },
        {
          name: 'ATooltip',
          slot: { name: 'datetime' },
          props: {
            title: 'dayjs().format("YYYY-MM-DD HH:mm:ss")'
          },
          children: [{ name: 'span', children: '几秒前' }]
        }
      ]
    }
  }
];
export default components;
