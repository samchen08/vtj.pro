import type { MaterialDescription } from '@vtj/core';
import container from './container';
import { omitPropItem } from '../shared';

const desc: MaterialDescription = {
  name: 'XDataItem',
  label: '数据项',
  categoryId: 'data',
  props: [
    {
      name: 'direction',
      title: '排版方向',
      setters: 'SelectSetter',
      options: ['row', 'column'],
      defaultValue: 'column'
    },
    {
      name: 'imageSrc',
      title: '图片URL',
      setters: 'StringSetter'
    },
    {
      name: 'imageWidth',
      title: '图片宽度',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'imageHeight',
      title: '图片高度',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'icon',
      title: '图片高度',
      setters: ['IconSetter']
    },
    {
      name: 'title',
      setters: ['StringSetter']
    },
    {
      name: 'description',
      setters: ['StringSetter']
    },
    {
      name: 'actions',
      title: '动作按钮 ActionBarItems',
      setters: ['ArraySetter']
    },
    {
      name: 'actionBarProps',
      title: '动作条组件配置 ActionBarProps',
      setters: ['ObjectSetter']
    },
    {
      name: 'split',
      setters: ['BooleanSetter']
    },
    {
      name: 'active',
      setters: ['BooleanSetter']
    },
    {
      name: 'hover',
      setters: ['BooleanSetter']
    },
    {
      name: 'padding',
      setters: ['BooleanSetter']
    },
    ...omitPropItem(container.props, ['direction'])
  ],
  events: [
    {
      name: 'imageClick'
    },
    {
      name: 'titleClick'
    },
    {
      name: 'actionClick',
      params: ['action']
    },
    {
      name: 'actionCommand',
      params: ['action', 'menu']
    }
  ],
  slots: [
    {
      name: 'image'
    },
    {
      name: 'title'
    },
    {
      name: 'description'
    },
    {
      name: 'actions'
    },
    {
      name: 'default'
    }
  ],
  snippet: {
    props: {
      title: '标题文本',
      description: '描述文本示例内容'
    }
  }
};

export default desc;
