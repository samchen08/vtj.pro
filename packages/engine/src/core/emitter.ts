import mitt from 'mitt';

export type Emitter = {
  on(type: string, listener: (...args: any[]) => void): void;
  off(type: string, listener: (...args: any[]) => void): void;
  emit(type: string, ...args: any[]): void;
  all: {
    clear(): void;
  };
};

export const emitter = mitt();

/**
 * 布局框架左侧折叠发生改变时触发事件名
 */
export const EVENT_SKELETON_LEFT_COLLAPSED_CHANGE =
  'EVENT_SKELETON_LEFT_COLLAPSED_CHANGE';

/**
 * 更新项目信息
 */
export const EVENT_PROJECT_UPDATE = 'EVENT_PROJECT_UPDATE';

/**
 * 切换页面
 */
export const EVENT_PROJECT_ACTIVE_FILE = 'EVENT_PROJECT_ACTIVE_FILE';

/**
 * 新建文件
 */
export const EVENT_FILE_CREATE = 'EVENT_FILE_CREATE';

/**
 * 更新文件
 */
export const EVENT_FILE_UPDATE = 'EVENT_FILE_UPDATE';

/**
 * 删除文件
 */
export const EVENT_FILE_REMOVE = 'EVENT_FILE_REMOVE';

/**
 * 资产加载完成
 */
export const EVENT_ASSETS_LOADED = 'EVENT_ASSETS_LOADED';

/**
 * 模拟器开启时
 */
export const EVENT_SIMULATOR_OPEN = 'EVENT_SIMULATOR_OPEN';

/**
 * 模拟器准备就绪
 */
export const EVENT_SIMULATOR_READY = 'EVENT_SIMULATOR_READY';

/**
 * 组件面板开始拖拽组件
 */
export const EVENT_COMPONENETS_DRAG_START = 'EVENT_COMPONENETS_DRAG_START';

/**
 * 组件面板结束拖拽
 */
export const EVENT_COMPONENETS_DRAG_END = 'EVENT_COMPONENETS_DRAG_END';

/**
 * 页面节点发生改变
 */
export const EVENT_NODE_CHANGE = 'EVENT_NODE_CHANGE';

/**
 * Viewport 切换
 */
export const EVENT_VIEWPORT_MODE_CHANGE = 'EVENT_VIEWPORT_MODE_CHANGE';

export const EVENT_OUTLINE_SELECTED = 'EVENT_OUTLINE_SELECTED';

export const EVENT_OUTLINE_HOVER = 'EVENT_OUTLINE_HOVER';

export const EVENT_OUTLINE_CHANGE = 'EVENT_OUTLINE_CHANGE';

export const EVENT_DESIGNER_ACTIVE_CHANGE = 'EVENT_DESIGNER_ACTIVE_CHANGE';

export const EVENT_ACTION_PREVIEW = 'EVENT_ACTION_PREVIEW';
export const EVENT_ACTION_HOME = 'EVENT_ACTION_HOME';
export const EVENT_ACTION_CODER = 'EVENT_ACTION_CODER';

export const EVENT_HISTORY_GO = 'EVENT_HISTORY_GO';
export const EVENT_HISTORY_BACK = 'EVENT_HISTORY_BACK';
export const EVENT_HISTORY_CHANGE = 'EVENT_HISTORY_CHANGE';
export const EVENT_HISTORY_PUSH = 'EVENT_HISTORY_PUSH';
export const EVENT_HISTORY_REMOVE = 'EVENT_HISTORY_REMOVE';
export const EVENT_HISTORY_SAVE = 'EVENT_HISTORY_SAVE';
