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

export const REMOTE = [
  'h',
  't',
  't',
  'p',
  's',
  ':',
  '/',
  '/',
  'l',
  'c',
  'd',
  'p',
  '.',
  'v',
  't',
  'j',
  '.',
  'p',
  'r',
  'o'
].join('');

export const ACCESS = {
  auth: [
    'h',
    't',
    't',
    'p',
    's',
    ':',
    '/',
    '/',
    'l',
    'c',
    'd',
    'p',
    '.',
    'v',
    't',
    'j',
    '.',
    'p',
    'r',
    'o',
    '/',
    'a',
    'u',
    't',
    'h',
    '.',
    'h',
    't',
    'm',
    'l'
  ].join(''),
  storageKey: [
    'R',
    'R',
    'O',
    '_',
    'I',
    'D',
    'E',
    '_',
    'A',
    'C',
    'C',
    'E',
    'S',
    'S',
    '_',
    'S',
    'T',
    'O',
    'R',
    'A',
    'G',
    'E',
    '_',
    '_'
  ].join(''),
  privateKey:
    'MIIBOgIBAAJBAKoIzmn1FYQ1YOhOBw9EhABxZ+PySAIaydI+zdhoKflrdgJ4A5E4/5gbQmRpk09hPWG8nvX7h+l/QLU8kXxAIBECAwEAAQJAAlgpxQY6sByLsXqzJcthC8LSGsLf2JEJkHwlnpwFqlEV8UCkoINpuZ2Wzl+aftURu5rIfAzRCQBvHmeOTW9/zQIhAO5ufWDmnSLyfAAsNo5JRNpVuLFCFodR8Xm+ulDlosR/AiEAtpAltyP9wmCABKG/v/hrtTr3mcvFNGCjoGa9bUAok28CIHbrVs9w1ijrBlvTsXYwJw46uP539uKRRT4ymZzlm9QjAiB+1KH/G9f9pEEL9rtaSOG7JF5D0JcOjlze4MGVFs+ZrQIhALKOUFBNr2zEsyJIjw2PlvEucdlG77UniszjXTROHSPd'
};

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
