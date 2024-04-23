export const MOBILE_SIZE = {
  width: 390,
  height: 844
};

export const PAD_SIZE = {
  width: 1180,
  height: 820
};

/**
 * 名称正则表达式
 */
export const NAME_REGEX = /^[A-Za-z_$][\:\w_-]*$/;

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
