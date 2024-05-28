import type { MaterialDescription } from '@vtj/core';
import elTabs from '../element/tabs';
import { omitPropItem } from '../shared';
const desc: MaterialDescription = {
  name: 'XTabs',
  label: '选项卡',
  categoryId: 'layout',
  props: [
    {
      name: 'items',
      setters: 'ArraySetter'
    },
    {
      name: 'border',
      setters: 'BooleanSetter'
    },
    {
      name: 'fit',
      setters: 'BooleanSetter'
    },
    {
      name: 'align',
      setters: 'SelectSetter',
      options: ['left', 'center', 'right']
    },
    ...omitPropItem(elTabs[0].props, [])
  ],
  events: [...(elTabs[0].events || []), 'actionClick', 'actionCommand'],
  slots: ['label', 'default'],
  snippet: {
    props: {
      modelValue: '1',
      items: [
        {
          label: 'Tab 1',
          value: '1'
        },
        {
          label: 'Tab 2',
          value: '2'
        },
        {
          label: 'Tab 3',
          value: '3'
        }
      ]
    }
  }
};

export default desc;
