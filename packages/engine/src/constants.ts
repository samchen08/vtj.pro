// Vue library name

export * from './version';

export const VUE = 'Vue';
export const VUE_ROUTER = 'VueRouter';

// 上下文名称
export const CONTEXT_NAME = 'vtj';

// 组件生命周期
export const LIFE_CYCLES_LIST = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeUnmount',
  'unmounted',
  'errorCaptured',
  'renderTracked',
  'renderTriggered',
  'activated',
  'deactivated'
];

// vue 组件实例提供的属性名
export const CONTEXT_HOST = [
  '$el',
  '$emit',
  '$nextTick',
  '$parent',
  '$root',
  '$attrs',
  '$slots',
  '$watch',
  '$props',
  '$options',
  '$forceUpdate'
];

// 内置指令
export const BUILDIN_DIRECTIVES = ['vIf', 'vShow', 'vModel', 'vFor', 'vBind'];

// 鼠标事件列表
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

// 键盘事件
export const KEYBOARD_EVENT_LIST = ['keydown', 'keyup', 'keypress'];

// 事件修饰符
export const EVENT_MODIFIERS = [
  'stop',
  'prevent',
  'capture',
  'self',
  'once',
  'passive'
];

// 数据类型
export const DATA_TYPES = ['String', 'Number', 'Boolean', 'Array', 'Object'];

// api请求方法
export const API_METHOD_TYPES = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'JSONP'
];
