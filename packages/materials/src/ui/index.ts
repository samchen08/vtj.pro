import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { version } from '../version';
import { setPackageName } from '../shared';
import test from './test';
import icon from './icon';
import container from './container';
import action from './action';
import actionBar from './action-bar';
import attachment from './attachment';
import qrcode from './qrcode';
import panel from './panel';

const name = '@vtj/ui';
const components: MaterialDescription[] = [
  test,
  icon,
  container,
  action,
  actionBar,
  qrcode,
  panel,
  attachment
].flat();

const categories: MaterialCategory[] = [
  {
    id: 'base',
    category: '基础元件'
  },
  {
    id: 'layout',
    category: '布局排版'
  },
  {
    id: 'form',
    category: '表单'
  },
  {
    id: 'data',
    category: '数据展示'
  },
  {
    id: 'test',
    category: '测试套件'
  }
];

const material: Material = {
  name: '@vtj/ui',
  version,
  label: 'UI',
  library: 'VtjUIMaterial',
  order: 1,
  categories,
  components: setPackageName(components, name)
};

export default material;
