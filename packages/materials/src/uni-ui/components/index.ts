import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { version } from '../../version';
import { setPackageName } from '../../shared';
import badge from './badge';
import breadcrumb from './breadcrumb';
import calendar from './calendar';
import card from './card';
import collapse from './collapse';
import combox from './combox';
import countdown from './countdown';
import dataCheckbox from './dataCheckbox';
import dataPicker from './dataPicker';
import dataSelect from './dataSelect';
import dateformat from './dateformat';
import datetimePicker from './datetimePicker';
import drawer from './drawer';
import easyinput from './easyinput';
import fab from './fab';
import fav from './fav';
import filePicker from './filePicker';
import forms from './forms';
import goodsNav from './goodsNav';
import grid from './grid';
import group from './group';
import icons from './icons';
import indexedList from './indexedList';
import link from './link';
import list from './list';
import loadMore from './loadMore';
import navbar from './navbar';
import noticeBar from './noticeBar';
import numberbox from './numberbox';
import pagination from './pagination';
import popup from './popup';
import rate from './rate';
import row from './row';
import searchBar from './searchBar';
import section from './section';
import segmentedControl from './segmentedControl';
import steps from './steps';
// import swipeAction from './swipeAction';
// import swiperDot from './swiperDot';
import table from './table';
import tag from './tag';
import title from './title';
import tooltip from './tooltip';
import transition from './transition';

const name = '@dcloudio/uni-ui';
const components: MaterialDescription[] = [
  badge,
  breadcrumb,
  calendar,
  card,
  collapse,
  combox,
  countdown,
  dataCheckbox,
  dataPicker,
  dataSelect,
  dateformat,
  datetimePicker,
  drawer,
  easyinput,
  fab,
  fav,
  filePicker,
  forms,
  goodsNav,
  grid,
  group,
  icons,
  indexedList,
  link,
  list,
  loadMore,
  navbar,
  noticeBar,
  numberbox,
  pagination,
  popup,
  rate,
  row,
  searchBar,
  section,
  segmentedControl,
  steps,
  // swipeAction,
  // swiperDot,
  table,
  tag,
  title,
  tooltip,
  transition
].flat();

const categories: MaterialCategory[] = [
  {
    id: 'ext',
    category: '扩展组件'
  }
];

const material: Material = {
  name,
  version,
  label: 'UniUI',
  library: 'UniUIMaterial',
  order: 5,
  categories,
  components: setPackageName(components, name)
};

export default material;
