import { AssetsCategory, ComponentDescription } from '@vtj/engine';
import Button from './ant-design-vue/Button';

const categories: AssetsCategory[] = [
  {
    id: 'base',
    category: '通用'
  },
  {
    id: 'layout',
    category: '布局'
  },
  {
    id: 'nav',
    category: '导航'
  },
  {
    id: 'input',
    category: '数据录入'
  },
  {
    id: 'data',
    category: '数据展示'
  },
  {
    id: 'feedback',
    category: '反馈'
  },
  {
    id: 'other',
    category: '其他'
  }
];

const components: ComponentDescription[] = [...Button];

export default {
  name: 'ant-design-vue',
  label: 'Antd',
  categories,
  components,
  order: 2
};
