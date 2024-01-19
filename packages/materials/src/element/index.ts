import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { version } from '../version';
import { setPackageName } from '../shared';
import affix from './affix';
import alert from './alert';
import autodcomplete from './autodcomplete';
import avatar from './avatar';
import backtop from './backtop';
import badge from './badge';
import breadcrumb from './breadcrumb';
import button from './button';
import calendar from './calendar';
import card from './card';
import carousel from './carousel';
import cascader from './cascader';
import checkbox from './checkbox';
import collapse from './collapse';
import colorPicker from './colorPicker';
import container from './container';
import datePicker from './datePicker';
import descriptions from './descriptions';
import dialog from './dialog';
import divider from './divider';
import drawer from './drawer';
import dropdown from './dropdown';
import empty from './empty';
import image from './image';
import input from './input';
import inputNumber from './inputNumber';
import layout from './layout';
import link from './link';
import menu from './menu';
import pageHeader from './pageHeader';
import pagination from './pagination';
import popconfirm from './popconfirm';
import popover from './popover';
import progress from './progress';
import radio from './radio';
import rate from './rate';
import result from './result';
import scrollbar from './scrollbar';
import select from './select';
import selectV2 from './selectV2';
import skeleton from './skeleton';
import slider from './slider';
import space from './space';
import steps from './steps';
import Switch from './switch';
import table from './table';
import tabs from './tabs';
import tag from './tag';
import timeline from './timeline';
import timePicker from './timePicker';
import timeSelect from './timeSelect';
import tooltip from './tooltip';
import transfer from './transfer';
import tree from './tree';
import treeV2 from './treeV2';
import upload from './upload';
import virtualizedTable from './virtualizedTable';

const name = 'element-plus';
const components: MaterialDescription[] = [
  affix,
  alert,
  autodcomplete,
  avatar,
  backtop,
  badge,
  breadcrumb,
  button,
  calendar,
  card,
  carousel,
  cascader,
  checkbox,
  collapse,
  colorPicker,
  container,
  datePicker,
  descriptions,
  dialog,
  divider,
  drawer,
  dropdown,
  empty,
  image,
  input,
  inputNumber,
  layout,
  link,
  menu,
  pageHeader,
  pagination,
  popconfirm,
  popover,
  progress,
  radio,
  rate,
  result,
  scrollbar,
  select,
  selectV2,
  skeleton,
  slider,
  space,
  steps,
  Switch,
  table,
  tabs,
  tag,
  timeline,
  timePicker,
  timeSelect,
  tooltip,
  transfer,
  tree,
  treeV2,
  upload,
  virtualizedTable
].flat();

const categories: MaterialCategory[] = [
  {
    id: 'base',
    category: '基础组件'
  },
  {
    id: 'layout',
    category: '排版布局'
  },
  {
    id: 'form',
    category: '表单组件'
  },
  {
    id: 'data',
    category: '数据展示'
  },
  {
    id: 'nav',
    category: '导航'
  },
  {
    id: 'other',
    category: '其他'
  }
];

const material: Material = {
  name,
  version: version,
  label: 'Element+',
  library: 'ElementPlusMaterial',
  order: 2,
  categories,
  components: setPackageName(components, name)
};

export default material;
