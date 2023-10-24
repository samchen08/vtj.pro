import { ComponentDescription } from '@vtj/engine';
import Container from './Container';
const component: ComponentDescription = {
  name: 'XDataItem',
  title: '数据项',
  categoryId: 'base',
  package: '@vtj/ui',
  props: [
    {
      name: 'imageSrc',
      label: '图片地址',
      setters: 'InputSetter'
    },
    {
      name: 'imageWidth',
      label: '图片宽度',
      setters: 'InputSetter'
    },
    {
      name: 'imageHeight',
      label: '图片高度',
      setters: 'InputSetter'
    },
    {
      name: 'icon',
      label: '图标',
      setters: 'IconSetter'
    },
    {
      name: 'title',
      label: '标题文本',
      setters: 'InputSetter'
    },
    {
      name: 'description',
      label: '描述文本',
      setters: 'InputSetter'
    },
    {
      name: 'actions',
      label: '操作按钮',
      setters: 'JSONSetter'
    },
    {
      name: 'actionBarProps',
      label: '操作组件参数',
      setters: 'JSONSetter'
    },
    {
      name: 'split',
      label: '分隔线',
      setters: 'BooleanSetter'
    },
    ...(Container.props || [])
  ],
  events: ['imageClick', 'titleClick', 'actionClick', 'actionCommand'],
  slots: ['image', 'title', 'description', 'actions', 'default'],
  snippet: {
    props: {
      imageSrc:
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      title: '这里是标题文本',
      description: '这里是对数据的描述说明文本',
      width: '100%',
      height: '100px'
    }
  }
};

export default component;
