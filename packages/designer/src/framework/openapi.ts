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
  prompt: string;
}

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
}

export interface AIChat {
  id: string;
  content: string;
  createdAt: string;
  dsl: any;
  message: string;
  prompt: string;
  reasoning: string;
  status: string;
  tokens: number;
  topicId: string;
  userId: string;
  userName: string;
  thinking: number;
  vue: string;
  collapsed?: boolean;
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
  invited: boolean;
  paid: boolean;
  free: boolean;
}

export abstract class OpenApi {
  public abstract loginBySign?: () => Promise<string[]>;
  public abstract isLogined?: () => Promise<boolean>;
  public abstract getTemplates?: (
    platform: PlatformType
  ) => Promise<TemplateDto[]>;
  public abstract getTemplateById?: (id: string) => Promise<TemplateDto>;
  public abstract removeTemplate?: (id: string) => Promise<boolean>;
  public abstract getTemplateDsl?: (id: string) => Promise<BlockSchema>;
  public abstract getDictOptions?: (code: string) => Promise<DictOption[]>;
  public abstract publishTemplate?: (
    dto: PublishTemplateDto
  ) => Promise<boolean>;
  public abstract postTopic?: (
    dto: TopicDto
  ) => Promise<ResponseWrapper<{ topic: AITopic; chat: AIChat }>>;
  public abstract getChats?: (
    topicId: string
  ) => Promise<ResponseWrapper<AIChat[]>>;
  public abstract getTopics?: (
    fileId: string
  ) => Promise<ResponseWrapper<AITopic[]>>;
  public abstract postChat?: (dto: ChatDto) => Promise<ResponseWrapper<AIChat>>;
  public abstract saveChat?: (
    chat: AIChat
  ) => Promise<ResponseWrapper<boolean>>;
  public abstract removeTopic?: (
    topicId: string
  ) => Promise<ResponseWrapper<boolean>>;
  public abstract getHotTopics?: () => Promise<ResponseWrapper<AITopic[]>>;
  public abstract chatCompletions?: (
    topicId: string,
    chatId: string,
    callback?: (data: any, done?: boolean) => void,
    error?: (err: any, cancel?: boolean) => void
  ) => Promise<() => void>;

  public abstract getSettins?: () => Promise<Settings>;
  public abstract createOrder?: () => Promise<ResponseWrapper<any>>;
  public abstract cancelOrder?: (id: string) => Promise<ResponseWrapper<any>>;
  public abstract getOrder?: (id: string) => Promise<ResponseWrapper<any>>;
}
