import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { version } from '../version';
import { setPackageName } from '../shared';

// * base 基础组件
import button from './button';
import container from './container';
import layout from './layout';
import link from './link';
import text from './text';
import scrollbar from './scrollbar';
import space from './space';

// * form 表单组件
import autodcomplete from './autodcomplete';
import cascader from './cascader';
import checkbox from './checkbox';
import colorPicker from './colorPicker';
import datePicker from './datePicker';
import dateTime from './dateTime';
import form from './form';
import input from './input';
import inputNumber from './inputNumber';
import inputTag from './inputTag';
import Mention from './mention';
import radio from './radio';
import rate from './rate';
import select from './select';
import selectV2 from './selectV2';
import slider from './slider';
import Switch from './switch';
import timePicker from './timePicker';
import timeSelect from './timeSelect';
import transfer from './transfer';
import upload from './upload';

// * data 数据展示
import avatar from './avatar';
import badge from './badge';
import calendar from './calendar';
import card from './card';
import carousel from './carousel';
import collapse from './collapse';
import descriptions from './descriptions';
import empty from './empty';
import image from './image';
import pagination from './pagination';
import progress from './progress';
import result from './result';
import skeleton from './skeleton';
import table from './table';
import virtualizedTable from './virtualizedTable';
import tag from './tag';
import timeline from './timeline';
import tour from './tour';
import tree from './tree';
import treeSelect from './treeSelect';
import treeV2 from './treeV2';
import statistic from './statistic';
import Segmented from './segmented';

// * nav 导航
import affix from './affix';
import anchor from './anchor';
import backtop from './backtop';
import breadcrumb from './breadcrumb';
import dropdown from './dropdown';
import menu from './menu';
import pageHeader from './pageHeader';
import steps from './steps';
import tabs from './tabs';

// * Feedback 反馈组件
import alert from './alert';
import dialog from './dialog';
import drawer from './drawer';
import popconfirm from './popconfirm';
import popover from './popover';
import tooltip from './tooltip';

// * other
import divider from './divider';
import watermark from './watermark';

import configProvider from './configProvider';

const name = 'element-plus';
const components: MaterialDescription[] = [
  affix,
  alert,
  anchor,
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
  configProvider,
  container,
  datePicker,
  dateTime,
  descriptions,
  dialog,
  divider,
  drawer,
  dropdown,
  empty,
  form,
  image,
  input,
  inputNumber,
  inputTag,
  Mention,
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
  statistic,
  Segmented,
  steps,
  Switch,
  table,
  tabs,
  tag,
  text,
  timeline,
  timePicker,
  timeSelect,
  tooltip,
  tour,
  transfer,
  tree,
  treeSelect,
  treeV2,
  upload,
  virtualizedTable,
  watermark
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
