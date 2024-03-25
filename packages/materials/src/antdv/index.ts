import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { version } from '../version';
import { setPackageName } from '../shared';
// * base
import button from './button';
import typography from './typography';
// * layout
import divider from './divider';
import flex from './flex';
import grid from './grid';
import layout from './layout';
import space from './space';
// * nav
import anchor from './anchor';
import breadcrumb from './breadcrumb';
import dropdown from './dropdown';
import menu from './menu'; // todo 错误
import pageHeader from './pageHeader';
import pagination from './pagination';
import steps from './steps';
// * input
import autocomplete from './autocomplete';
import cascader from './cascader';
import checkbox from './checkbox';
import datePicker from './datePicker';
import form from './form'; //todo  ?? 错误
import input from './input';
import inputNumber from './inputNumber';
import mentions from './mentions';
import radio from './radio';
import rate from './rate';
import select from './select'; // todo
import slider from './slider';
import Switch from './switch';
import timePicker from './timePicker';
import transfer from './transfer';
import treeSelect from './treeSelect'; // todo
import upload from './upload'; // todo template > slot 多了一层
// * data
import avatar from './avatar';
import badge from './badge';
import calendar from './calendar';
import card from './card'; // todo template > slot 多了一层
import carousel from './carousel';
import collapse from './collapse';
import comment from './comment'; //todo  template
import descriptions from './description';
import empty from './empty';
import image from './image';
import list from './list'; // todo template > slot 多了一层
import popover from './popover'; //todo todo template > slot 多了一层
import qrCode from './qrCode';
import segmented from './segmented';
import statistic from './statistic';
import table from './table';
import tabs from './tabs';
import tag from './tag';
import timeline from './timeline';
import tooltip from './tooltip'; //todo template
import tour from './tour'; //todo  错误
import tree from './tree';
//  * feedback
import alert from './alert';
import drawer from './drawer';
// import message from './message'; //?? 信息提示
import modal from './modal';
// import notification from './notification'; //?? 信息提示
import popconfirm from './popconfirm';
import progress from './progress';
import result from './result';
import skeleton from './skeleton';
import spin from './spin';
// * other
import affix from './affix';
import configProvider from './configProvider';
import floatButton from './floatButton';
import waterMark from './watermark';
// * other
import app from './app';

const name = 'ant-design-vue';
const components: MaterialDescription[] = [
  ...button,
  ...divider,
  ...flex,
  ...typography,
  ...grid,
  ...layout,
  ...space,
  ...anchor,
  ...breadcrumb,
  ...dropdown,
  ...menu,
  ...pageHeader,
  ...pagination,
  ...steps,
  ...autocomplete,
  ...cascader,
  ...checkbox,
  ...datePicker,
  ...form,
  ...input,
  ...inputNumber,
  ...mentions,
  ...radio,
  ...rate,
  ...select,
  ...slider,
  ...Switch,
  ...timePicker,
  ...transfer,
  ...treeSelect,
  ...upload,
  ...avatar,
  ...badge,
  ...calendar,
  ...card,
  ...carousel,
  ...collapse,
  ...comment,
  ...descriptions,
  ...empty,
  ...image,
  ...list,
  ...popover,
  ...qrCode,
  ...segmented,
  ...statistic,
  ...table,
  ...tabs,
  ...tag,
  ...timeline,
  ...tooltip,
  ...tour,
  ...tree,
  ...alert,
  ...drawer,
  // ...message, //??
  ...modal,
  // ...notification, //??
  ...popconfirm,
  ...progress,
  ...result,
  ...skeleton,
  ...spin,
  ...affix,
  ...configProvider,
  ...floatButton,
  ...waterMark,
  ...app
];

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
