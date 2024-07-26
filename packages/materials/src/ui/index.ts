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
import qrCode from './qr-code';
import panel from './panel';
import dataItem from './data-item';
import dialog from './dialog';
import dialogForm from './dialog-form';
import field from './field';
import form from './form';
import grid from './grid';
import header from './header';
import list from './list';
import queryForm from './query-form';
import tabs from './tabs';
import picker from './picker';
import importButton from './import-button';
import dialogGrid from './dialog-grid';
import captcha from './captcha';
import verify from './verify';

const name = '@vtj/ui';
const components: MaterialDescription[] = [
  test,
  icon,
  container,
  action,
  actionBar,
  qrCode,
  panel,
  attachment,
  dataItem,
  dialog,
  dialogForm,
  field,
  form,
  grid,
  header,
  list,
  queryForm,
  tabs,
  picker,
  importButton,
  dialogGrid,
  captcha,
  verify
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
