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
  /**
   * 当前流程中创建的活动 chat 集合（经 postTopic/postChat 追踪），
   * 中止时统一标记 Canceled；chat 保存成功后即移除，避免误标已完成记录
   */
  const activeChats = new Set<any>();
  const trackActiveChat = (response: any) => {
    const chat = pickChat(response).chat;
    if (chat?.id) activeChats.add(chat);
    return response;
  };
  const clearActiveChat = () => {
    activeChats.clear();
  };
  const cancelActiveChat = () => {
    activeChats.forEach((chat) => {
      chat.status = 'Canceled';
      openApi.cancelChat(chat).catch(() => null);
    });
    activeChats.clear();
  };

  const postTopic = async (body: AgentTopicBody) =>
    trackActiveChat(unwrapOpenApi<any>(await openApi.postTopic(body)));
  const postChat = async (body: AgentChatBody) =>
    trackActiveChat(unwrapOpenApi<any>(await openApi.postChat(body)));
  const saveChat = async (body: SaveChatBody) => {
    const result = unwrapOpenApi<any>(await openApi.saveChat(body));
    // 保存成功即视为该 chat 已完成，移出活动追踪（中止时不再误标 Canceled）
    if (body.id) {
      activeChats.forEach((chat) => {
        if (chat?.id === body.id) activeChats.delete(chat);
      });
    }
    return result;
  };
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
