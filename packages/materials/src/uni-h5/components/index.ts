import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { version } from '../../version';
import { setPackageName } from '../../shared';
// container 视图容器
import view from './view';
import scrollView from './scrollView';
import swiper from './swiper';
import matchMedia from './matchMedia';
import matchArea from './movableArea';
import movableView from './movableView';
import coverView from './coverView';
import coverImage from './coverImage';

// basic 基础内容
import icon from './icon';
import text from './text';
import richText from './richText';
import progress from './progress';

//form 表单组件
import button from './button';
import checkbox from './checkbox';
import editor from './editor';
import form from './form';
import input from './input';
import label from './label';
import picker from './picker';
import pickerView from './pickerView';
import radio from './radio';
import slider from './slider';
import Switch from './Switch';
import textarea from './textarea';

// nav
import navigator from './navigator';
import audio from './audio';
import image from './image';
import video from './video';
import map from './map';
import canvas from './canvas';
import webView from './webView';

const name = '@dcloudio/uni-h5';

const components: MaterialDescription[] = [
  // container
  view,
  scrollView,
  swiper,
  matchMedia,
  matchArea,
  movableView,
  coverView,
  coverImage,
  // basic
  icon,
  text,
  richText,
  progress,
  // form
  button,
  checkbox,
  editor,
  form,
  input,
  label,
  picker,
  pickerView,
  radio,
  slider,
  Switch,
  textarea,
  //nav
  navigator,
  audio,
  image,
  video,
  map,
  canvas,
  webView,
  {
    name: 'component',
    label: '动态组件',
    categoryId: 'elements',
    doc: 'https://cn.vuejs.org/api/built-in-special-elements.html#component',
    props: [
      {
        name: 'is',
        label: '组件名',
        setters: 'InputSetter'
      }
    ],
    snippet: {
      children: '组件文本内容示例',
      props: {
        is: 'view'
      }
    }
  },
  {
    name: 'slot',
    label: '插槽',
    categoryId: 'elements',
    doc: 'https://cn.vuejs.org/api/built-in-special-elements.html#slot',
    props: [
      {
        name: 'name',
        label: '名称',
        defaultValue: 'default',
        setters: 'InputSetter'
      }
    ],
    snippet: {
      children: '默认插槽内容'
    }
  }
].flat();

const categories: MaterialCategory[] = [
  {
    id: 'container',
    category: '视图组件'
  },
  {
    id: 'basic',
    category: '基础内容'
  },
  {
    id: 'form',
    category: '表单'
  },
  {
    id: 'nav',
    category: '路由与页面跳转'
  },
  {
    id: 'media',
    category: '媒体'
  },
  {
    id: 'elements',
    category: '特殊元素'
  }
];

const material: Material = {
  name,
  version,
  label: '内置',
  library: 'UniH5Material',
  order: 4,
  categories,
  components: setPackageName(components, name)
};

export default material;
