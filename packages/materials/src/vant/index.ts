import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { setPackageName } from '../shared';
import { version } from '../version';

// base 基础组件
import Button from './button';
import Cell from './cell';
import Icon from './icon';
import Image from './image';
import Layout from './layout';
import Popup from './popup';
import Space from './space';
import Toast from './toast';
// form 表单组件
import Calendar from './calendar';
import Cascader from './cascader';
import Checkbox from './checkbox';
import DatePicker from './datePicker';
import Field from './field';
import Form from './form';
import NumberKeyboard from './number-keyboard';
import PasswordInput from './password-input';
import Picker from './picker';
import PickerGroup from './picker-group';
import Radio from './radio';
import Rate from './rate';
import Search from './search';
import Slider from './slider';
import Signature from './signature';
import Stepper from './stepper';
import Switch from './switch';
import TimePicker from './time-picker';
import Uploader from './uploader';
// feedback 反馈组件
import ActionSheet from './action-sheet';
import Barrage from './barrage';
import Dialog from './dialog';
import DropdownMenu from './dropdown-menu';
import FloatingPanel from './floating-panel';
import FloatingBubble from './floating-bubble';
import Loading from './loading';
import Notify from './notify';
import Overlay from './overlay';
import PullRefresh from './pull-refresh';
import ShareSheet from './share-sheet';
import SwipeCell from './swipe-cell';
// view 展示组件
import Badge from './badge';
import Circle from './circle';
import Collapse from './collapse';
import CountDown from './count-down';
import Divider from './divider';
import Empty from './empty';
import Highlight from './highlight';
import ImagePreview from './image-preview';
import Lazyload from './lazyload';
import List from './list';
import NoticeBar from './notice-bar';
import Popover from './popover';
import Progress from './progress';
import RollingText from './rolling-text';
import Skeleton from './skeleton';
import Steps from './steps';
import Sticky from './sticky';
import Swipe from './swipe';
import Tag from './tag';
import TextEllipsis from './text-ellipsis';
import Watermark from './watermark';
// nav 导航组件
import ActionBar from './action-bar';
import BackTop from './back-top';
import Grid from './grid';
import IndexBar from './index-bar';
import NavBar from './nav-bar';
import Pagination from './pagination';
import Sidebar from './sidebar';
import Tab from './tab';
import Tabbar from './tabbar';
import TreeSelect from './tree-select';
import AddressEdit from './address-edit';
import AddressList from './address-list';
import Area from './area';
import Card from './card';
import ContactCard from './contact-card';
import ContactEdit from './contact-edit';
import ContactList from './contact-list';
import Coupon from './coupon-list';
import SubmitBar from './submit-bar';
// business 业务组件

const name = 'vant';
const components: MaterialDescription[] = [
  // base 基础组件
  Button,
  Cell,
  Icon,
  Image,
  Layout,
  Popup,
  Space,
  Toast,
  // form 表单组件
  Calendar,
  Cascader,
  Checkbox,
  DatePicker,
  Field,
  Form,
  NumberKeyboard,
  PasswordInput,
  Picker,
  PickerGroup,
  Radio,
  Rate,
  Search,
  Slider,
  Signature,
  Stepper,
  Switch,
  TimePicker,
  Uploader,
  // feedback 反馈组件
  ActionSheet,
  Barrage,
  Dialog,
  DropdownMenu,
  FloatingPanel,
  FloatingBubble,
  Loading,
  Notify,
  Overlay,
  PullRefresh,
  ShareSheet,
  SwipeCell,
  // view 展示组件
  Badge,
  Circle,
  Collapse,
  CountDown,
  Divider,
  Empty,
  Highlight,
  ImagePreview,
  Lazyload,
  List,
  NoticeBar,
  Popover,
  Progress,
  RollingText,
  Skeleton,
  Steps,
  Sticky,
  Swipe,
  Tag,
  TextEllipsis,
  Watermark,
  // nav 导航组件
  ActionBar,
  BackTop,
  Grid,
  IndexBar,
  NavBar,
  Pagination,
  Sidebar,
  Tab,
  Tabbar,
  TreeSelect,
  // business 业务组件
  AddressEdit,
  AddressList,
  Area,
  Card,
  ContactCard,
  ContactEdit,
  ContactList,
  Coupon,
  SubmitBar
].flat();

const categories: MaterialCategory[] = [
  {
    id: 'base',
    category: '基础组件'
  },
  {
    id: 'form',
    category: '表单组件'
  },
  {
    id: 'feedback',
    category: '反馈组件'
  },
  {
    id: 'view',
    category: '展示组件'
  },
  {
    id: 'nav',
    category: '导航组件'
  },
  {
    id: 'business',
    category: '业务组件'
  }
];

const material: Material = {
  name: 'vant',
  version,
  label: 'Vant',
  library: 'VantMaterial',
  order: 5,
  categories,
  components: setPackageName(components, name)
};

export default material;
