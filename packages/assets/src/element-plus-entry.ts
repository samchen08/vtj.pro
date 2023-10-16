import Button from './element-plus/Button';
import Container from './element-plus/Container';
import Layout from './element-plus/Layout';
import Link from './element-plus/Link';
import Scrollbar from './element-plus/Scrollbar';
import Autodcomplete from './element-plus/Autodcomplete';
import Space from './element-plus/Space';
import Cascader from './element-plus/Cascader';
import Checkbox from './element-plus/Checkbox';
import ColorPicker from './element-plus/ColorPicker';
import DatePicker from './element-plus/DatePicker';
import From from './element-plus/From';
import Input from './element-plus/Input';
import InputNumber from './element-plus/InputNumber';
import Radio from './element-plus/Radio';
import Rate from './element-plus/Rate';
import Select from './element-plus/Select';
import Slider from './element-plus/Slider';
import Switch from './element-plus/Switch';
import TimePicker from './element-plus/TimePicker';
import TimeSelect from './element-plus/TimeSelect';
import Transfer from './element-plus/Transfer';
import Upload from './element-plus/Upload';
import Affix from './element-plus/Affix';
import Backtop from './element-plus/Backtop';
import Breadcrumb from './element-plus/Breadcrumb';
import Dropdown from './element-plus/Dropdown';
import Avatar from './element-plus/Avatar';
import Badge from './element-plus/Badge';
import Calendar from './element-plus/Calendar';
import Card from './element-plus/Card';
import Carousel from './element-plus/Carousel';
import Collapse from './element-plus/Collapse';
import Empty from './element-plus/Empty';
import Image from './element-plus/Image';
import Pagination from './element-plus/Pagination';
import Menu from './element-plus/Menu';
import Steps from './element-plus/Steps';
import Alert from './element-plus/Alert';
import Dialog from './element-plus/Dialog';
import Drawer from './element-plus/Drawer';
import Popconfirm from './element-plus/Popconfirm';
import Popover from './element-plus/Popover';
import PageHeader from './element-plus/PageHeader';
import Tabs from './element-plus/Tabs';
import Divider from './element-plus/Divider';
import Progress from './element-plus/Progress';
import Result from './element-plus/Result';
import Skeleton from './element-plus/Skeleton';
import Table from './element-plus/Table';
import Tag from './element-plus/Tag';
import Tree from './element-plus/Tree';
import Descriptions from './element-plus/Descriptions';
import Timeline from './element-plus/Timeline';

import { AssetsCategory } from '@vtj/engine';

const categories: AssetsCategory[] = [
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
const components = [
  ...Button,
  ...Timeline,
  ...Container,
  ...Layout,
  ...Cascader,
  ...Checkbox,
  ...From,
  ...Radio,
  ...Select,
  ...Carousel,
  ...Collapse,
  ...Table,
  ...Tag,
  ...Descriptions,
  Tree,
  TimeSelect,
  Result,
  Skeleton,
  Progress,
  Pagination,
  Image,
  Empty,
  Avatar,
  Badge,
  Card,
  Calendar,
  Upload,
  Transfer,
  TimePicker,
  Switch,
  Slider,
  Rate,
  ColorPicker,
  Input,
  InputNumber,
  DatePicker,
  Scrollbar,
  Autodcomplete,
  Link,
  Space,
  Affix,
  Backtop,
  ...Breadcrumb,
  ...Dropdown,
  ...Menu,
  ...Steps,
  Alert,
  Dialog,
  Drawer,
  Popconfirm,
  Popover,
  PageHeader,
  ...Tabs,
  Divider
];

export default {
  name: 'element-plus',
  label: 'Element+',
  categories,
  components,
  order: 1
};
