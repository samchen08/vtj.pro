import type { PlatformType, BlockSchema } from '@vtj/core';
export interface TemplateDto {
  id: string;
  name: string;
  label: string;
  vip: boolean;
  share: boolean;
  cover: string;
  author: string;
  userId: string;
  category: string;
  latest: string;
  platform: string;
}

export interface DictOption {
  label: string;
  value: string;
}

export interface PublishTemplateDto {
  name: string;
  label: string;
  category: string;
  cover: Blob;
  share: boolean;
  version: string;
  platform: string;
  latest?: string;
  dsl: string;
  id?: string;
}

export interface TopicDto {
  model: string;
  project: string;
  dsl: string;
  source: string;
  prompt?: string;
  file?: File;
}

export type TopicType = 'text' | 'image' | 'json';

export type TopicDataType = 'sketch' | 'figma' | 'unknown';

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
}

export interface ChatDto {
  topicId: string;
  prompt: string;
}

export interface ResponseWrapper<T = any> {
  code: number;
  success: boolean;
  message?: string;
  data: T;
}

export interface Settings {
  limit: number;
  max: number;
  mode: number;
  price: number;
  payQr: string;
  contactQr: string;
  groupQr: string;
  invited: boolean;
  paid: boolean;
  free: boolean;
}

export abstract class OpenApi {
  /**
   * 签名登录
   */
  public abstract loginBySign?: () => Promise<string[]>;
  /**
   * 判断用户是否登录
   */
  public abstract isLogined?: () => Promise<boolean>;
  /**
   * 获取模版列表
   */
  public abstract getTemplates?: (
    platform: PlatformType
  ) => Promise<TemplateDto[]>;
  /**
   * 根据id获取模版
   */
  public abstract getTemplateById?: (id: string) => Promise<TemplateDto>;
  /**
   * 删除模版
   */
  public abstract removeTemplate?: (id: string) => Promise<boolean>;
  /**
   * 获取模版的dsl
   */
  public abstract getTemplateDsl?: (id: string) => Promise<BlockSchema>;
  /**
   * 获取字典项
   */
  public abstract getDictOptions?: (code: string) => Promise<DictOption[]>;
  /**
   * 发布模版
   */
  public abstract publishTemplate?: (
    dto: PublishTemplateDto
  ) => Promise<boolean>;
  /**
   * 发送AI话题
   */
  public abstract postTopic?: (
    dto: TopicDto
  ) => Promise<ResponseWrapper<{ topic: AITopic; chat: AIChat }>>;

  /**
   * 发送图片AI话题
   */
  public abstract postImageTopic?: (
    dto: TopicDto
  ) => Promise<ResponseWrapper<{ topic: AITopic; chat: AIChat }>>;

  /**
   * 发送元数据AI话题
   */
  public abstract postJsonTopic?: (
    dto: TopicDto
  ) => Promise<ResponseWrapper<{ topic: AITopic; chat: AIChat }>>;

  /**
   * 获取对话列表
   */
  public abstract getChats?: (
    topicId: string
  ) => Promise<ResponseWrapper<AIChat[]>>;

  /**
   * 获取话题列表
   */
  public abstract getTopics?: (
    fileId: string
  ) => Promise<ResponseWrapper<AITopic[]>>;

  /**
   * 发送对话
   */
  public abstract postChat?: (dto: ChatDto) => Promise<ResponseWrapper<AIChat>>;

  /**
   * 取消对话
   */
  public abstract cancelChat?: (
    chat: AIChat
  ) => Promise<ResponseWrapper<AIChat>>;

  /**
   *  保存对话
   */
  public abstract saveChat?: (
    chat: AIChat
  ) => Promise<ResponseWrapper<boolean>>;

  /**
   * 删除话题
   */
  public abstract removeTopic?: (
    topicId: string
  ) => Promise<ResponseWrapper<boolean>>;

  /**
   * 获取热门话题
   */
  public abstract getHotTopics?: () => Promise<ResponseWrapper<AITopic[]>>;

  /**
   * AI Completions
   */
  public abstract chatCompletions?: (
    topicId: string,
    chatId: string,
    callback?: (data: any, done?: boolean) => void,
    error?: (err: any, cancel?: boolean) => void
  ) => Promise<() => void>;

  /**
   * 获取AI设置
   */
  public abstract getSettins?: () => Promise<Settings>;
  /**
   * 创建订单
   */
  public abstract createOrder?: () => Promise<ResponseWrapper<any>>;
  /**
   * 取消订单
   */
  public abstract cancelOrder?: (id: string) => Promise<ResponseWrapper<any>>;

  /**
   * 订单详情
   */
  public abstract getOrder?: (id: string) => Promise<ResponseWrapper<any>>;

  /**
   * 获取图片url
   */
  public abstract getImage?: (path?: string) => string | undefined;

  /**
   * 获取文件url
   */
  public abstract getOssFile?: (path?: string) => string | undefined;
}
