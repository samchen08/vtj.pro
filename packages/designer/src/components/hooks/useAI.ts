import { ref, watch, type Ref, reactive, computed } from 'vue';
import { useOpenApi } from './useOpenApi';
import {
  type TopicDto,
  type ChatDto,
  type AITopic,
  type AIChat,
  type DictOption,
  type Settings,
  type LLM
} from '../../framework';
import type { ProjectSchema, BlockSchema, BlockModel } from '@vtj/core';
import { useElementSize } from '@vueuse/core';
import { delay, storage } from '@vtj/utils';
import { notify, alert } from '../../utils';
import { MAX_TOKENS } from '../../constants';

export type { AITopic, AIChat, Settings };
export type Dict = DictOption;
export type UseAIOptions = ReturnType<typeof useOpenApi>;

export interface AISendData {
  model: string;
  auto: boolean;
  prompt: string;
  llm?: LLM;
}

export interface AISendImageData {
  model: string;
  auto: boolean;
  file: File;
  llm?: LLM;
}

export interface AISendJsonData {
  model: string;
  auto: boolean;
  file: File;
  content: any;
  llm?: LLM;
}

let __currentCompletions: any = null;

function useDict(code: string, getDictOptions: (code: string) => Promise<any>) {
  const result: Ref<DictOption[]> = ref([]);
  if (getDictOptions) {
    getDictOptions(code).then((res: any) => {
      result.value = res || [];
    });
  }

  return result;
}

async function createCommonDto(engine: UseAIOptions['engine']) {
  const projectDsl = engine.project.value?.toDsl() as ProjectSchema;
  const dsl = engine.current.value?.toDsl() as BlockSchema;
  const source = await engine.service.genVueContent(projectDsl, dsl);
  return {
    projectDsl,
    dsl,
    source
  };
}

async function createTopicDto(
  data: AISendData,
  engine: UseAIOptions['engine']
) {
  const { model, prompt = '', llm } = data;
  const { projectDsl, dsl, source } = await createCommonDto(engine);

  const dto: TopicDto = {
    model,
    prompt,
    dsl: JSON.stringify(dsl),
    project: JSON.stringify(projectDsl),
    source,
    llm: llm ? JSON.stringify(llm) : ''
  };
  return dto;
}

async function createImageTopicDto(
  data: AISendImageData,
  engine: UseAIOptions['engine']
) {
  const { model, file, llm } = data;
  const { projectDsl, dsl, source } = await createCommonDto(engine);
  const dto: TopicDto = {
    model,
    file,
    dsl: JSON.stringify(dsl),
    project: JSON.stringify(projectDsl),
    source,
    llm: llm ? JSON.stringify(llm) : ''
  };
  return dto;
}

export function useAI() {
  const {
    isLogined,
    engine,
    getDictOptions,
    postTopic,
    getTopics,
    getChats,
    postChat,
    removeTopic,
    chatCompletions,
    saveChat,
    getHotTopics,
    getSettins,
    createOrder,
    cancelOrder,
    getOrder,
    getImage,
    getOssFile,
    postImageTopic,
    postJsonTopic,
    cancelChat
  } = useOpenApi();
  const hideCodeCacheKey = 'CHAT_HIDE_CODE';
  const region = engine.skeleton?.getRegion('Apps').regionRef;
  const isReady = ref(false);
  const loading = ref(false);
  const isNewChat = ref(true);
  const showDetail = ref(false);
  const models = useDict('LLM', getDictOptions);
  const topics = ref<AITopic[]>([]);
  const chats = ref<AIChat[]>([]);
  const currentTopic = ref<AITopic | null>(null);
  const currentChat = ref<AIChat | null>(null);
  const listRef = ref();
  const panelRef = ref();
  const isHideCode = ref(!!storage.get(hideCodeCacheKey, { type: 'local' }));
  const promptText = ref('');
  const settings = ref<Settings>();
  const isPending = computed(() => {
    return chats.value.some((n) => n.status === 'Pending');
  });
  const inputDisabled = computed(() => {
    if (!settings.value) return true;
    return settings.value.mode === 2 && !settings.value.invited;
  });
  const { height: panelHeight } = useElementSize(listRef);

  const loadChats = async (topicId: string) => {
    const res = await getChats(topicId);
    if (res && res.success) {
      const data = res.data || [];
      if (data[0] && currentTopic.value) {
        if (currentTopic.value.image) {
          data[0].image = getImage(currentTopic.value.image);
        }
        if (currentTopic.value.json) {
          data[0].json = getOssFile(currentTopic.value.json);
        }
        if (currentTopic.value.type) {
          data[0].type = currentTopic.value.type;
        }
        if (currentTopic.value.dataType) {
          data[0].type = currentTopic.value.dataType;
        }
      }
      chats.value = res.data;
    }
  };

  const init = async (block: BlockModel | null) => {
    isReady.value = false;
    settings.value = await getSettins();
    if (!settings.value) return;
    if (!block || block.id === currentTopic.value?.fileId) return;
    topics.value = [];
    chats.value = [];
    isNewChat.value = true;
    const res = await getTopics(block.id).catch(() => null);
    if (res && res.success) {
      topics.value = res.data;
    }
    if (topics.value.length) {
      isNewChat.value = false;
      currentTopic.value = topics.value[0];
      await loadChats(currentTopic.value.id);
    }
    isReady.value = true;
  };

  const onPostTopic = async (data: AISendData) => {
    loading.value = true;
    const dto = await createTopicDto(data, engine);
    const res = await postTopic(dto).catch(() => null);
    loading.value = false;
    if (res && res.success) {
      const { topic, chat } = res.data;
      chat.type = topic.type;
      chats.value = [];
      topics.value.unshift(topic);
      isNewChat.value = false;
      currentTopic.value = topic;
      const rChat = reactive(chat);
      chats.value.push(rChat);
      completions(rChat, (c) => {
        if (data.auto) {
          onApply(c);
        }
      });
      await delay(0);
      if (panelRef.value) {
        panelRef.value.scrollToBottom();
      }
    } else {
      await init(null);
    }
    return res;
  };

  const onPostImageTopic = async (data: AISendImageData) => {
    loading.value = true;
    const dto = await createImageTopicDto(data, engine);
    const res = await postImageTopic(dto);
    loading.value = false;
    if (res && res.success) {
      const { topic, chat } = res.data;
      chats.value = [];
      topics.value.unshift(topic);
      isNewChat.value = false;
      currentTopic.value = topic;
      if (topic.image) {
        chat.image = getImage(topic.image);
      }
      chat.type = topic.type;
      const rChat = reactive(chat);
      chats.value.push(rChat);
      completions(rChat, (c) => {
        if (c.status === 'Error' && c.message) {
          return onPostChat({
            model: data.model,
            auto: data.auto,
            prompt: c.message
          });
        }
        if (c.status === 'Success' && data.auto) {
          onApply(c);
        }
      });
      await delay(0);
      if (panelRef.value) {
        panelRef.value.scrollToBottom();
      }
    } else {
      await init(null);
    }
    return res;
  };

  const onPostJsonTopic = async (data: AISendJsonData) => {
    loading.value = true;
    const dto = await createImageTopicDto(data, engine);
    const res = await postJsonTopic(dto);
    loading.value = false;
    if (res && res.success) {
      const { topic, chat } = res.data;
      chats.value = [];
      topics.value.unshift(topic);
      isNewChat.value = false;
      currentTopic.value = topic;
      if (topic.image) {
        chat.image = getImage(topic.image);
      }
      if (topic.json) {
        chat.json = getOssFile(topic.json);
      }
      chat.type = topic.type;
      chat.dataType = topic.dataType;
      const rChat = reactive(chat);
      chats.value.push(rChat);
      completions(rChat, (c) => {
        if (c.status === 'Error' && c.message) {
          return onPostChat({
            model: data.model,
            auto: data.auto,
            prompt: c.message
          });
        }
        if (c.status === 'Success' && data.auto) {
          onApply(c);
        }
      });
      await delay(0);
      if (panelRef.value) {
        panelRef.value.scrollToBottom();
      }
    } else {
      await init(null);
    }
    return res;
  };

  const onPostChat = async (data: AISendData) => {
    if (!currentTopic.value) return;
    loading.value = true;
    const dto: ChatDto = {
      topicId: currentTopic.value.id,
      prompt: data.prompt
    };
    const res = await postChat(dto).catch(() => null);
    loading.value = false;

    if (res && res.success) {
      const chat = reactive(res.data);
      chats.value.push(chat);
      completions(chat, (c) => {
        if (c.status === 'Error' && c.message) {
          return onPostChat({
            ...data,
            prompt: c.message
          });
        }
        if (c.status === 'Success' && data.auto) {
          onApply(c);
        }
      });
      await delay(0);
      if (panelRef.value) {
        panelRef.value.scrollToBottom();
      }
    } else {
      await init(null);
    }
    return res;
  };

  const onRemoveTopic = async (topic: AITopic) => {
    const res = await removeTopic(topic.id).catch(() => null);
    if (res && res.success) {
      topics.value = topics.value.filter((n) => n.id !== topic.id);
      if (topic.id === currentTopic.value?.id) {
        chats.value = [];
        currentTopic.value = null;
        isNewChat.value = true;
      }
    }
  };

  const vue2Dsl = async (chat: AIChat) => {
    if (!currentTopic.value) return;
    const id = currentTopic.value?.fileId as string;
    const project = engine.project.value?.toDsl() as ProjectSchema;
    const { name = '' } = engine.current.value || {};
    const source = getVueCode(chat.content);
    if (!source) return;
    return await engine.service.parseVue(project, {
      id,
      name,
      source
    });
  };

  const collectErrorMesssage = (msg: any) => {
    let message = '';
    if (Array.isArray(msg)) {
      message += '页面存在以下错误，请检查并修复：\n';
      message += msg.join(';\n');
    }
    return message
      ? message
      : '请检查代码是否有错误，是否符合模版和规则要求，并改正';
  };

  const completions = async (
    chat: AIChat,
    complete?: (chat: AIChat) => void
  ) => {
    promptText.value = '';
    chat.content = '';
    chat.reasoning = '';
    chat.status = 'Pending';
    chat.reasoning = '';
    chat.message = '';
    let thinking: number = 0;
    const now = Date.now();
    __currentCompletions = await chatCompletions(
      chat.topicId,
      chat.id,
      async (data, done) => {
        const choice = data?.choices?.[0];
        const delta = choice?.delta;
        if (delta) {
          const content = delta.content || '';
          const reasoning = delta.reasoning_content || '';
          if (content) {
            chat.content += content;
          }
          if (reasoning) {
            chat.reasoning += reasoning;
            thinking += Date.now() - now;
          }
        }
        if (data?.usage) {
          const completionTokens = data.usage.completion_tokens || 0;
          if (completionTokens >= MAX_TOKENS) {
            chat.status = 'Failed';
            chat.message = `生成tokens数量达到了MAX_TOKENS【${completionTokens}】已被截断！`;
            chat.dsl = null;
            return null;
          } else {
            chat.tokens = (chat.tokens || 0) + (data.usage.total_tokens || 0);
          }
        }
        if (done) {
          chat.status = 'Success';
          chat.thinking = Math.ceil(thinking / 1000);
          chat.vue = getVueCode(chat.content);
          const dsl = await vue2Dsl(chat).catch((e) => {
            chat.message = collectErrorMesssage(e);
            chat.status = 'Error';
            return null;
          });
          if (dsl) {
            try {
              chat.dsl = typeof dsl === 'object' ? dsl : JSON.parse(dsl);
              if (Array.isArray(chat.dsl)) {
                chat.status = 'Error';
                chat.message = collectErrorMesssage(chat.dsl);
                chat.dsl = null;
              }
            } catch (err: any) {
              chat.dsl = null;
              chat.status = 'Error';
              chat.message = collectErrorMesssage(err.message);
            }
          }
          await saveChat(chat);
          complete && complete(chat);
        }
      },
      async (err: any) => {
        const message = err.message || err.name;
        if (message === 'network error') {
          chat.message = '网络异常，请稍后再试';
        } else {
          chat.message = message || '请求失败，请稍后再试';
        }
        chat.status = 'Failed';
        console.warn('completions error', err);
        if (err?.message) {
          notify(err.message, '生成错误');
        }
        await saveChat(chat);
        complete && complete(chat);
      }
    );

    return __currentCompletions;
  };

  const getVueCode = (content: string) => {
    const regex = /```vue\n([\s\S]*?)\n```/;
    const matches = content.match(regex);
    return matches?.[1] ?? '';
  };

  const updateChatDsl = async (source: string) => {
    if (!currentTopic.value || !currentChat.value || !source) return;
    const id = currentTopic.value?.fileId as string;
    const project = engine.project.value?.toDsl() as ProjectSchema;
    const { name = '' } = engine.current.value || {};

    const dsl = await engine.service
      .parseVue(project, {
        id,
        name,
        source
      })
      .catch((e) => e);
    // 结果是错误信息
    if (Array.isArray(dsl)) {
      return Promise.reject(dsl);
    } else {
      try {
        currentChat.value.dsl = typeof dsl === 'object' ? dsl : JSON.parse(dsl);
      } catch (e) {
        currentChat.value.dsl = null;
      }
      await saveChat(currentChat.value);
      return dsl;
    }
  };

  const scrollToTop = () => {
    if (panelRef.value && !isNewChat.value) {
      panelRef.value.scrollToTop();
    }
  };

  const scrollToBottom = () => {
    if (panelRef.value && !isNewChat.value) {
      panelRef.value.scrollToBottom();
    }
  };

  const expandAll = () => {
    if (isNewChat.value || isPending.value) return;
    chats.value.map((n) => {
      n.collapsed = false;
    });
  };

  const collapseAll = () => {
    if (isNewChat.value || isPending.value) return;
    chats.value.map((n) => {
      n.collapsed = true;
    });
  };

  const onRefresh = (chat: AIChat) => {
    if (isPending.value) return;
    return completions(chat, (c) => {
      if (engine.state.autoApply) {
        onApply(c);
      }
    });
  };

  const onApply = (chat: AIChat, manual?: boolean) => {
    if (chat.dsl) {
      engine.applyAI(chat.dsl);
    } else {
      if (manual) {
        alert(`DSL不完整，无法应用到页面`);
      }
    }
    showDetail.value = false;
    currentChat.value = null;
  };

  const onView = (chat: AIChat) => {
    chat.vue = getVueCode(chat.content);
    currentChat.value = chat;
    showDetail.value = true;
  };

  const onFix = (chat: AIChat) => {
    if (!currentTopic.value) return;
    const prompt = chat.message
      ? chat.message
      : '请检查代码是否有错误，是否符合模版和规则要求，并改正';
    fillPromptInput(prompt);
  };

  const onCancelChat = async (chat: AIChat) => {
    if (!currentTopic.value) return;
    if (__currentCompletions && typeof __currentCompletions === 'function') {
      __currentCompletions();
    }
    chat.status = 'Canceled';
    const res = await cancelChat(chat);
    if (res && res.data) {
      Object.assign(chat, res.data);
    }
  };

  const fillPromptInput = (content: string, isNew?: boolean) => {
    promptText.value = content;
    if (isNew) {
      isNewChat.value = isNew;
    }
  };

  const toggleHideCode = () => {
    if (!isNewChat.value) {
      isHideCode.value = !isHideCode.value;
      storage.save(hideCodeCacheKey, isHideCode.value, { type: 'local' });
    }
  };

  watch(
    () => region?.active,
    (widget) => {
      if (widget.name === 'AI') {
        init(engine.current.value);
      }
    },
    {
      immediate: true
    }
  );

  watch(engine.current, (val, old) => {
    if (val?.id !== old?.id) {
      currentTopic.value = null;
    }
  });

  watch(panelHeight, () => {
    if (panelRef.value && isPending.value) {
      panelRef.value.autoScrollToBottom();
    }
  });

  return {
    engine,
    isLogined,
    isReady,
    init,
    loading,
    isNewChat,
    models,
    onPostTopic,
    topics,
    chats,
    currentTopic,
    onPostChat,
    loadChats,
    onRemoveTopic,
    getVueCode,
    vue2Dsl,
    onRefresh,
    onApply,
    onView,
    listRef,
    panelRef,
    currentChat,
    showDetail,
    scrollToTop,
    scrollToBottom,
    expandAll,
    collapseAll,
    isPending,
    toggleHideCode,
    isHideCode,
    onFix,
    fillPromptInput,
    promptText,
    getHotTopics,
    settings,
    inputDisabled,
    createOrder,
    cancelOrder,
    getOrder,
    updateChatDsl,
    getImage,
    onPostImageTopic,
    onPostJsonTopic,
    onCancelChat
  };
}
