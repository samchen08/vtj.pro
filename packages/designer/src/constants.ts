export const MOBILE_SIZE = {
  width: 390,
  height: 844
};

export const PAD_SIZE = {
  width: 1024,
  height: 768
};

/**
 * 名称正则表达式
 */
export const NAME_REGEX = /^[A-Za-z_$][\:\w_-]*$/;

/**
 * 版本号表达式
 */
export const VERSION_REGEX = /(\d+)\.(\d+)\.(\d+)/;

/**
 * 鼠标事件列表
 */
export const MOUSE_EVENT_LIST = [
  'click',
  'dblclick',
  'mouseenter',
  'mouseleave',
  'mousedown',
  'mouseup',
  'mouseover',
  'contextmenu'
];

/**
 * 键盘事件
 */
export const KEYBOARD_EVENT_LIST = ['keydown', 'keyup', 'keypress'];

/**
 * api请求方法
 */
export const API_METHOD_TYPES = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'JSONP'
];

/**
 * 事件修饰符
 */
export const EVENT_MODIFIERS = [
  'stop',
  'prevent',
  'capture',
  'self',
  'once',
  'passive'
];

/**
 * vue-devtools 状态缓存key
 */
export const VUE_DEVTOOLS_FRAME_STATE_KEY = '__vue-devtools-frame-state__';

/**
 * vue-devtools 文件路径
 */
export const VUE_DEVTOOLS_PATH = '@id/virtual:vue-devtools-path:overlay.js';

/**
 * vue-devtools overlay path
 */
export const VUE_DEVTOOLS_OVERLAY_PATH =
  '@id/virtual:vue-devtools-path:overlay/devtools-overlay.mjs';

export const NPM_REGISTRY_URL = [
  'h',
  't',
  't',
  'p',
  's',
  ':',
  '/',
  '/',
  'r',
  'e',
  'g',
  'i',
  's',
  't',
  'r',
  'y',
  '.',
  'n',
  'p',
  'm',
  'm',
  'i',
  'r',
  'r',
  'o',
  'r',
  '.',
  'c',
  'o',
  'm',
  '/',
  '@',
  'v',
  't',
  'j',
  '/',
  'p',
  'r',
  'o'
].join('');

export const REPORT_API = [
  '/',
  'a',
  'p',
  'i',
  '/',
  'o',
  'p',
  'e',
  'n',
  '/',
  'r',
  'e',
  'p',
  'o',
  'r',
  't'
].join('');

export const SESSION_ID_KEY = 'SESSION_ID__';

export const STATE_KEY = 'ENGINE_STATE__';

export const MAX_TOKENS = 8 * 1024;
