import { ComponentDescription } from '@vtj/engine';
import ElTabs from '../element-plus/Tabs';
const component: ComponentDescription = {
  name: 'XTabs',
  title: '选项卡',
  categoryId: 'base',
  package: '@vtj/ui',
  props: [
    {
      name: 'items',
      label: '标签项数据',
      setters: 'JSONSetter'
    },
    {
      name: 'border',
      label: '边框',
      setters: 'BooleanSetter'
    },
    ...(ElTabs[0].props || [])
  ],
  events: [
    {
      name: 'tab-click'
    },
    {
      name: 'tab-change'
    },
    {
      name: 'tab-remove'
    },
    {
      name: 'tab-add'
    },
    {
      name: 'edit'
    },
    {
      name: 'update:modelValue'
    }
  ],
  slots: ['label', 'default'],
  snippet: {
    props: {
      items: [
        {
          label: '选项卡一',
          value: 1
        },
        {
          label: '选项卡二',
          value: 2
        },
        {
          label: '选项卡三',
          value: 3
        }
      ]
    }
  }
};

export default component;
