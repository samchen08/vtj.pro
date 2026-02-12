import type { PlatformType, BlockSchema } from '@vtj/core';
import type { AITopic, AIChat } from './types';
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
  llm?: string;
  project: string;
  dsl: string;
  source: string;
  prompt?: string;
  file?: File;
  options?: string;
  tools?: string;
}

export interface ChatDto {
  topicId: string;
  prompt: string;
  toolCallId?: string;
  source?: string;
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
  orderLink?: string;
  tokenLink?: string;
}

export interface CompletionChunk {
  id: string;
  choices: Array<CompletionChoice>;
  created: number;
  model: string;
  object: 'chat.completion.chunk';
  service_tier?: 'scale' | 'default' | null;
  system_fingerprint?: string;
  usage?: CompletionUsage | null;
}

export interface CompletionChoice {
  delta: CompletionDelta;
  finish_reason:
    | 'stop'
    | 'length'
    | 'tool_calls'
    | 'content_filter'
    | 'function_call'
    | null;
  index: number;
  logprobs: any;
}

export interface CompletionDelta {
  content?: string | null;
  reasoning_content?: string | null;
  role?: 'developer' | 'system' | 'user' | 'assistant' | 'tool';
  refusal?: string | null;
  tool_calls?: any[];
}

export interface CompletionUsage {
  completion_tokens: number;
  prompt_cache_hit_tokens: number;
  prompt_cache_miss_tokens: number;
  prompt_tokens: number;
  total_tokens: number;
}

export abstract class OpenApi {
  /**
   * 签名登录
   */
  public abstract loginBySign?: (
    auth?: string | (() => Promise<any>)
  ) => Promise<string[]>;
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
    callback?: (data: CompletionChunk | null, done?: boolean) => void,
    error?: (err: Error, cancel?: boolean) => void
  ) => Promise<() => void>;

  /**
   * 获取AI设置
   */
  public abstract getSettings?: () => Promise<Settings>;
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

  /**
   * 获取技能文档
   */
  public abstract getSkills?: (
    platform: PlatformType,
    ids: string[]
  ) => Promise<ResponseWrapper<string>>;
}
