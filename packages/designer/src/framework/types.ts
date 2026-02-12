import type { VNode, DefineComponent, Ref } from 'vue';
import type { ProjectModel, Service, BlockPropDataType } from '@vtj/core';
import type { ToolRegistry, ToolParameter } from './ToolRegistry';
import type { Engine } from './engine';

export type VueComponent =
  | Record<string, any>
  | VNode
  | DefineComponent<any, any, any, any>;

/**
 * 器件分组
 */
export enum WidgetGroup {
  Block = 'block',
  Node = 'node',
  Left = 'left',
  Right = 'right'
}

/**
 * 区域类型
 */
export enum RegionType {
  // 品牌区
  Brand = 'Brand',
  // 工具区
  Toolbar = 'Toolbar',
  // 动作区
  Actions = 'Actions',
  // 应用区
  Apps = 'Apps',
  // 工作区
  Workspace = 'Workspace',
  // 设置区
  Settings = 'Settings',
  // 状态区
  Status = 'Status',
  // 预览区
  Preview = 'Preview'
}
/**
 * 基础器件
 */
export interface Widget {
  /**
   * 器件名称
   */
  name: string;
  /**
   * 放置区域
   */
  region: keyof typeof RegionType;
  /**
   * Vue组件
   */
  component: VueComponent;

  /**
   * 组件默认参数
   */
  props?: Record<string, any>;

  /**
   * 不可见，停用
   */
  invisible?: boolean;

  /**
   * 分组名称
   */
  group?: string;

  /**
   * 排序
   */
  order?: number;

  /**
   * 需要remote支持
   */
  remote?: boolean;
}

/**
 * App类型器件
 */
export interface AppWidget extends Widget {
  /**
   * 标识app
   */
  type: 'app';
  /**
   *  应用图标
   */
  icon: VueComponent;
  /**
   * 应用名称
   */
  label?: string;
  /**
   * 应用打开方式
   */
  openType?: 'panel' | 'link' | 'dialog';

  /**
   * 链接url，openType 为 link 时有效
   */
  url?: string;

  /**
   * 是否加缓存，openType 为 panel 有效
   */
  cache?: boolean;
}

/**
 * 选项卡类型器件
 */
export interface TabWidget extends Widget {
  /**
   * 标识tab
   */
  type: 'tab';
  /**
   * tab名称
   */
  label: string;
  /**
   * tab图标
   */
  icon?: VueComponent;
  /**
   * 能关闭的
   */
  closable?: boolean;

  /**
   * 操作按钮
   */
  actions?: any[];
}

/**
 * 设置器配置
 */
export interface Setter {
  /**
   * 设置器名称
   */
  name: string;
  /**
   * 设置器组件
   */
  component: VueComponent;
  /**
   * 设置器数据类型
   */
  type: BlockPropDataType;

  /**
   * 设计器参数
   */
  props?: Record<string, any>;
}

export type TopicType = 'text' | 'image' | 'json';

export type TopicDataType = 'sketch' | 'figma' | 'mastergo' | 'unknown';

export interface AITopic {
  id: string;
  appId: string;
  createAt: string;
  fileId: string;
  isHot: boolean;
  model: string;
  platform: string;
  projectId: string;
  title: string;
  prompt: string;
  dependencies: string;
  dsl: any;
  image?: string;
  json?: string;
  type?: TopicType;
  dataType?: TopicDataType;
}

export interface AIChat {
  id: string;
  content: string;
  createdAt: string;
  dsl: any;
  message: string;
  source?: string;
  prompt: string;
  reasoning: string;
  status: 'Pending' | 'Success' | 'Failed' | 'Error' | 'Canceled';
  tokens: number;
  topicId: string;
  userId: string;
  userName: string;
  thinking: number;
  vue: string;
  collapsed?: boolean;
  image?: string;
  json?: string;
  type?: TopicType;
  dataType?: TopicDataType;
  toolCallId?: string;
  toolContent?: string;
}

export interface AgentConfig {
  activeDelayMs?: number;
  currentTopic: Ref<AITopic | null>;
}

export interface ParseResult {
  type: 'vue' | 'diff' | 'json' | 'error';
  label: string;
  content: any;
}

export type ParseRule =
  | {
      type: 'vue';
      label: string;
      regex: RegExp;
      validate: (content: string) => boolean;
    }
  | {
      type: 'diff';
      label: string;
      regex: RegExp;
      validate: (content: string) => boolean;
    }
  | {
      type: 'json';
      label: string;
      regex: RegExp;
      parse: (content: string) => any;
    };

export interface ToolCall {
  action: string;
  parameters: any[];
}

export interface ToolContext {
  engine: Engine;
  project: ProjectModel;
  service: Service;
  toolRegistry: ToolRegistry;
  config: AgentConfig & { activeDelayMs: number };
}

export interface ToolConfig {
  name: string;
  description: string;
  parameters: ToolParameter[];
  createHandler: (context: ToolContext) => (...args: any[]) => Promise<any>;
}
