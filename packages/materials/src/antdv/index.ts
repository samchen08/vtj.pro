import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { version } from '../version';
import { setPackageName } from '../shared';
import button from './button';

const name = 'ant-design-vue';
const components: MaterialDescription[] = [...button];

const categories: MaterialCategory[] = [
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

const material: Material = {
  name,
  version: version,
  label: 'Antdv',
  library: 'AntdvMaterial',
  order: 2,
  categories,
  components: setPackageName(components, name)
};

export default material;
