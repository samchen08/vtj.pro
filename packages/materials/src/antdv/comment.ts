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
        setters: ['ArraySetter', 'StringSetter'] //?? 	Array|slot
      },
      {
        name: 'author',
        label: 'author',
        title: '要显示为注释作者的元素',
        setters: ['StringSetter'] //?? 	string|slot
      },
      {
        name: 'avatar',
        label: 'avatar',
        title: '要显示为评论头像的元素 - 通常是 antd Avatar 或者 src',
        setters: ['StringSetter'] //?? 	string|slot
      },
      {
        name: 'content',
        label: 'content',
        title: '评论的主要内容',
        setters: ['StringSetter'] //?? 	string|slot
      },
      {
        name: 'datetime',
        label: 'datetime',
        title: '展示时间描述',
        setters: ['StringSetter'] //?? 	string|slot
      }
    ],
    slots: ['actions', 'author', 'avatar', 'content', 'datetime']
  }
];
export default components;
