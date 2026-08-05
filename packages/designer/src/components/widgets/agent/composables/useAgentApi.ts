/**
 * Agent API 封装层
 * 收敛远程接口的响应解包（unwrapOpenApi）、响应结构容错（pickChat/pickTopic）与
 * 活动 chat 追踪（activeChat），供 index.vue 装配与各 composable 依赖注入使用
 */
import { unwrapOpenApi, pickChat } from '../utils/response';
import { withRequestRetry } from '../utils/request';
import type { AITopic } from '../../../../framework';
import type {
  AgentTopicBody,
  AgentChatBody,
  SaveChatBody,
  UpdateTopicBody,
  SaveTraceBody
} from '../types/agent';

/** useOpenApi 中 Agent 业务所需的最小接口（结构化类型，便于 mock 测试） */
export interface AgentOpenApi {
  postTopic: (dto: any) => Promise<any>;
  postChat: (dto: any) => Promise<any>;
  saveChat: (chat: any) => Promise<any>;
  getChats: (topicId: string) => Promise<any>;
  getTopics: (fileId: string) => Promise<any>;
  removeTopic: (topicId: string) => Promise<any>;
  updateTopic: (topic: any) => Promise<any>;
  saveTrace: (trace: any) => Promise<any>;
  getSkills: (ids: string[]) => Promise<any>;
  getHotTopics: (platform?: string) => Promise<any>;
  recognitionFile: (file: File) => Promise<any>;
  cancelChat: (chat: any) => Promise<any>;
}

export function useAgentApi(openApi: AgentOpenApi) {
  /** 当前活动 chat（经 postTopic/postChat 追踪），供中止时标记 Canceled 状态 */
  let activeChat: any = null;
  const trackActiveChat = (response: any) => {
    activeChat = pickChat(response).chat;
    return response;
  };
  const clearActiveChat = () => {
    activeChat = null;
  };
  const cancelActiveChat = () => {
    if (activeChat) {
      activeChat.status = 'Canceled';
      openApi.cancelChat(activeChat).catch(() => null);
      activeChat = null;
    }
  };

  const postTopic = async (body: AgentTopicBody) =>
    trackActiveChat(unwrapOpenApi<any>(await openApi.postTopic(body)));
  const postChat = async (body: AgentChatBody) =>
    trackActiveChat(unwrapOpenApi<any>(await openApi.postChat(body)));
  const saveChat = async (body: SaveChatBody) =>
    unwrapOpenApi<any>(await openApi.saveChat(body));
  const updateTopic = async (body: UpdateTopicBody) =>
    unwrapOpenApi<any>(await openApi.updateTopic(body));
  const saveTrace = async (body: SaveTraceBody) =>
    unwrapOpenApi<any>(await openApi.saveTrace(body));
  const getChats = async (topicId: string) =>
    withRequestRetry(() =>
      Promise.resolve(openApi.getChats(topicId)).then(unwrapOpenApi<any>)
    );
  const getTopics = async (projectId: string) =>
    withRequestRetry(() =>
      Promise.resolve(openApi.getTopics(projectId)).then(
        unwrapOpenApi<AITopic[]>
      )
    );
  const removeTopic = async (topicId: string) =>
    unwrapOpenApi<boolean>(await openApi.removeTopic(topicId));
  const getSkills = async (ids: string[]) =>
    withRequestRetry(() =>
      Promise.resolve(openApi.getSkills(ids)).then(unwrapOpenApi<string>)
    );
  const getHotTopics = async (platform?: string) =>
    unwrapOpenApi<AITopic[]>(await openApi.getHotTopics(platform));
  const recognitionFile = async (
    file: File
  ): Promise<{
    title?: string;
    content?: string;
    type?: string;
    url?: string;
  }> => unwrapOpenApi(await openApi.recognitionFile(file));

  return {
    postTopic,
    postChat,
    saveChat,
    updateTopic,
    saveTrace,
    getChats,
    getTopics,
    removeTopic,
    getSkills,
    getHotTopics,
    recognitionFile,
    clearActiveChat,
    cancelActiveChat
  };
}
