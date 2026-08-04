<template>
  <XContainer class="v-agent-widget__wrapper" direction="column" fit>
    <Panel class="v-agent-widget" title="智能体">
      <template #actions>
        <XAction
          mode="icon"
          size="small"
          :disabled="!hasData"
          v-bind="showCodeProps"
          @click="toggleHideCode"></XAction>
        <ElDivider direction="vertical"></ElDivider>
        <XAction
          mode="icon"
          size="small"
          type="primary"
          :icon="Top"
          title="滚动到顶部"
          background="hover"
          :disabled="!hasData"
          @click="scrollToTop"></XAction>
        <XAction
          mode="icon"
          size="small"
          type="primary"
          :icon="Bottom"
          title="滚动到底部"
          background="hover"
          :disabled="!hasData"
          @click="scrollToBottom"></XAction>
        <ElDivider direction="vertical"></ElDivider>
        <XAction
          mode="icon"
          size="small"
          type="primary"
          :icon="detailsExpanded ? ArrowUp : ArrowDown"
          :title="detailsExpanded ? '全部折叠' : '全部展开'"
          background="hover"
          :disabled="!hasData"
          @click="toggleDetails"></XAction>
        <ElDivider direction="vertical"></ElDivider>
        <XAction
          mode="icon"
          size="large"
          :icon="Download"
          background="hover"
          title="导出对话"
          :disabled="!hasData || running"
          @click="handleExport"></XAction>
        <ElDivider direction="vertical"></ElDivider>
        <XAction
          mode="icon"
          size="large"
          :icon="VtjIconChatRecord"
          background="hover"
          title="对话历史"
          @click="showChatRecords"></XAction>
        <XAction
          mode="icon"
          size="large"
          :icon="VtjIconNewChat"
          background="hover"
          title="新建任务"
          :disabled="running"
          @click="startNewConversation"></XAction>
      </template>

      <LoginTip v-if="!logined"></LoginTip>
      <InviteTip
        v-if="settings"
        :settings="settings"
        :get-image="getImage"></InviteTip>
      <PayTip
        v-if="settings"
        :remote="engine.remote"
        :settings="settings"
        :get-image="getImage"
        :create-order="createOrder"
        :cancel-order="cancelOrder"
        :get-order="getOrder"></PayTip>
      <div ref="conversationRef" class="v-agent-widget__conversation">
        <div v-if="!hasData" class="v-agent-widget-new-chat">
          <div class="v-agent-widget-new-chat__welcome">
            <h3>嗨！我是您的智能助手</h3>
            <div>我可以帮你开发应用，请把你的任务交给我吧~</div>
          </div>
          <template v-if="hotTopics.length">
            <ElDivider content-position="left">热门需求</ElDivider>
            <div class="hot-list">
              <Item
                v-for="(item, index) in hotTopics"
                :key="item.id"
                :index="index + 1"
                :title="item.title"
                :model-value="item"
                :nowrap="false"
                background
                @click="userMessage = item.prompt"></Item>
            </div>
          </template>
        </div>

        <ConversationRoundCard
          v-for="(round, index) in conversationRounds"
          :key="round.id"
          :round="round"
          :round-number="index + 1"
          :is-latest="index === conversationRounds.length - 1"
          :code="!isHideCode"
          :details-command="detailsCommand"
          @view="showCodeDetail"
          @apply="applyDetailDsl"
          @resolve-approval="resolveApproval" />

        <div
          v-if="statusText"
          class="v-agent-widget__status"
          :class="statusType">
          <span v-if="running" class="status-spinner"></span>
          <span>{{ statusText }}</span>
          <ElButton
            v-if="statusType === 'danger' && !running"
            text
            type="primary"
            @click="retryAgent">
            重试
          </ElButton>
        </div>
      </div>

      <MessageInputCard
        :message="userMessage"
        :running="running"
        :has-topic="!!existingTopicId"
        :files="files"
        :recognizing="recognizing"
        :auto-approve="autoApprove"
        :model="model"
        :models="models"
        @update:message="userMessage = $event"
        @update:auto-approve="updateAutoApprove"
        @update:model="model = $event"
        @start="startAgent"
        @continue="continueAgent"
        @abort="abortAgent"
        @upload-file="uploadFile"
        @remove-file="removeFile" />

      <Detail
        v-if="detailVisible"
        v-model="detailVisible"
        :source="detailSource"
        :language="detailLanguage"
        :dsl="detailDsl"
        :update-dsl="updateDetailDsl"
        @apply="applyDetailDsl"></Detail>
    </Panel>

    <ElDrawer
      v-model="showDrawer"
      class="v-agent-widget__drawer"
      size="100%"
      direction="ltr"
      :modal="false"
      :with-header="false"
      modal-class="v-agent-widget__drawer-modal"
      :append-to-body="false">
      <Panel class="v-agent-widget" title="历史对话">
        <template #actions>
          <XAction
            mode="icon"
            size="large"
            :icon="VtjIconClose"
            background="hover"
            title="关闭对话历史"
            @click="showChatRecords"></XAction>
        </template>
        <ChatRecords
          :current="currentTopic"
          :topics="topics"
          @new="startNewConversation"
          @load="onRecordLoad"
          @remove="onRemoveTopic"></ChatRecords>
      </Panel>
    </ElDrawer>
  </XContainer>
</template>

<script lang="ts" setup>
  import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue';
  import { storage } from '@vtj/utils';
  import {
    Download,
    ArrowUp,
    ArrowDown,
    Top,
    Bottom,
    View,
    Hide,
    VtjIconChatRecord,
    VtjIconClose,
    VtjIconNewChat
  } from '@vtj/icons';
  import { XAction, XContainer } from '@vtj/ui';
  import { ElButton, ElDivider, ElDrawer } from 'element-plus';
  import {
    useEngine,
    type AITopic,
    type DictOption,
    type Settings,
    type ToolContext
  } from '../../../framework';
  import { TOOL_CONFIGS } from '../../../managers';
  import { Item, Panel } from '../../shared';
  import { useOpenApi } from '../../hooks';
  import LoginTip from './login-tip.vue';
  import InviteTip from './invite-tip.vue';
  import PayTip from './pay-tip.vue';
  import ChatRecords from './records.vue';
  import MessageInputCard from './message-input.vue';
  import ConversationRoundCard from './conversation-round.vue';
  import Detail from './detail.vue';
  import { useAuth } from './composables/useAuth';
  import { useSSEStream } from './composables/useSSEStream';
  import { useEditorStep } from './composables/useEditorStep';
  import { useSummary } from './composables/useSummary';
  import { useArchitectPlan } from './composables/useArchitectPlan';
  import { useDualAgent } from './composables/useDualAgent';
  import { useFileRecognition } from './composables/useFileRecognition';
  import { useExport } from './composables/useExport';
  import { useReplayChat } from './composables/useReplayChat';
  import type {
    ConversationRound,
    DualAgentInfrastructure,
    DualAgentApi,
    DualAgentState
  } from './types/agent';

  const engine = useEngine();
  const hideCodeCacheKey = 'CHAT_HIDE_CODE';
  const statusText = ref('');
  const statusType = ref<'info' | 'warning' | 'success' | 'danger'>('info');
  const conversationRounds = ref<ConversationRound[]>([]);
  const conversationRef = ref<HTMLElement>();
  const showDrawer = ref(false);
  const logined = ref(true);
  const topics = ref<AITopic[]>([]);
  const hotTopics = ref<AITopic[]>([]);
  const models = ref<DictOption[]>([]);
  const settings = ref<Settings>();
  const isHideCode = ref(!!storage.get(hideCodeCacheKey, { type: 'local' }));
  const detailsCommand = ref(0);
  const detailVisible = ref(false);
  const detailSource = ref('');
  const detailLanguage = ref('vue');
  const detailDsl = ref<any>(null);
  const autoApprove = computed({
    get: () => engine.state.autoApply,
    set: (value: boolean) => {
      engine.state.autoApply = value;
    }
  });
  const approvalResolvers = new Map<string, (approved: boolean) => void>();
  const {
    isLogined,
    getDictOptions,
    getSettings,
    getImage,
    createOrder,
    cancelOrder,
    getOrder,
    getHotTopics,
    postTopic: requestPostTopic,
    postChat: requestPostChat,
    saveChat: requestSaveChat,
    getChats: requestChats,
    getTopics: requestTopics,
    removeTopic: requestRemoveTopic,
    cancelChat,
    updateTopic: requestUpdateTopic,
    saveTrace: requestSaveTrace,
    chatCompletions,
    getSkills: requestSkills,
    recognitionFile
  } = useOpenApi();

  const { token, model, existingTopicId, initToken } = useAuth(
    () => engine.access?.getData()?.token
  );
  const unwrapOpenApi = <T,>(response: any): T => {
    if (response?.code !== undefined && response.code !== 0) {
      throw new Error(response.message || `API Error code=${response.code}`);
    }
    if (response?.success === false) {
      throw new Error(response.message || '远程接口调用失败');
    }
    return (response?.data !== undefined ? response.data : response) as T;
  };
  let activeChat: any = null;
  const trackActiveChat = (response: any) => {
    activeChat = response?.chat || response;
    return response;
  };
  const postTopic = async (body: Record<string, any>) =>
    trackActiveChat(unwrapOpenApi<any>(await requestPostTopic(body as any)));
  const postChat = async (body: Record<string, any>) =>
    trackActiveChat(unwrapOpenApi<any>(await requestPostChat(body as any)));
  const saveChat = async (body: Parameters<typeof requestSaveChat>[0]) =>
    unwrapOpenApi<any>(await requestSaveChat(body));
  const updateTopic = async (body: Parameters<typeof requestUpdateTopic>[0]) =>
    unwrapOpenApi<any>(await requestUpdateTopic(body));
  const saveTrace = async (body: Parameters<typeof requestSaveTrace>[0]) =>
    unwrapOpenApi<any>(await requestSaveTrace(body));
  const getChats = async (topicId: string) =>
    unwrapOpenApi<any>(await requestChats(topicId));
  const getTopics = async (projectId: string) =>
    unwrapOpenApi<AITopic[]>(await requestTopics(projectId));
  const removeTopic = async (topicId: string) =>
    unwrapOpenApi<boolean>(await requestRemoveTopic(topicId));
  const getSkills = async (ids: string[]) =>
    unwrapOpenApi<string>(await requestSkills(ids));
  const { streamCompletion: completeStream, abortAll } = useSSEStream(
    chatCompletions as any
  );
  const streamCompletion: typeof completeStream = (
    topicId,
    chatId,
    onChunk,
    onReasoning
  ) => {
    activeChat = { ...activeChat, id: chatId, topicId };
    return completeStream(topicId, chatId, onChunk, onReasoning);
  };
  const {
    files,
    recognizing,
    uploadFile,
    removeFile,
    buildFilePrompt,
    clearFiles
  } = useFileRecognition(async (file) =>
    unwrapOpenApi(await recognitionFile(file))
  );

  const getEngine = () => engine;
  const registerTools = () => {
    const { project, service, toolRegistry } = engine;
    if (!project.value) return;
    const toolContext: ToolContext = {
      engine,
      project: project.value,
      service,
      toolRegistry,
      config: {
        activeDelayMs: 1500,
        getSkills
      } as ToolContext['config']
    };
    TOOL_CONFIGS.forEach((tool) => {
      if (toolRegistry.has(tool.name)) return;
      toolRegistry.register({
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
        handler: tool.createHandler(toolContext)
      });
    });
  };

  const { buildSummaryPrompt } = useSummary();
  const { executeEditorStep } = useEditorStep({
    streamCompletion,
    postChat,
    saveChat,
    updateTopic,
    getEngine,
    statusText,
    statusType,
    requestApproval: (id) =>
      autoApprove.value
        ? Promise.resolve(true)
        : new Promise<boolean>((resolve) => approvalResolvers.set(id, resolve))
  });
  const { executeArchitectPlan } = useArchitectPlan({
    streamCompletion,
    postChat,
    saveChat,
    updateTopic,
    saveTrace,
    statusText,
    statusType,
    executeEditorStep,
    buildSummaryPrompt
  });

  const infra: DualAgentInfrastructure = {
    token,
    model,
    existingTopicId,
    setTopicId: (id) => (existingTopicId.value = id),
    getEngine,
    registerTools,
    abortSse: abortAll,
    access: engine.access!,
    statusText,
    statusType
  };
  const agentApi: DualAgentApi = {
    postTopic,
    postChat,
    streamCompletion,
    executeArchitectPlan
  };
  const agentState: DualAgentState = { conversationRounds };
  const buildFinalPrompt = () => {
    const text = userMessage.value.trim();
    const fileDescription = buildFilePrompt();
    return [text, fileDescription].filter(Boolean).join('\n\n');
  };
  const {
    running,
    userMessage,
    startDualAgent,
    continueConversation,
    retryLastRound,
    abortAll: abortAgentFlow
  } = useDualAgent(infra, agentApi, agentState, buildFinalPrompt);
  const { exportConversation } = useExport();
  const { loadChatHistory } = useReplayChat(
    { getChats, statusText, statusType },
    conversationRounds
  );
  const hasData = computed(() => conversationRounds.value.length > 0);
  const currentTopic = computed(
    () => topics.value.find((item) => item.id === existingTopicId.value) || null
  );
  const showCodeProps = computed<any>(() =>
    isHideCode.value
      ? { icon: Hide, title: '显示代码块', type: 'warning' }
      : { icon: View, title: '隐藏代码块', type: 'default' }
  );
  const detailsExpanded = computed(() => detailsCommand.value >= 0);

  const toggleHideCode = () => {
    if (!hasData.value) return;
    isHideCode.value = !isHideCode.value;
    storage.save(hideCodeCacheKey, isHideCode.value, { type: 'local' });
  };
  const scrollToTop = () => conversationRef.value?.scrollTo({ top: 0 });
  const scrollToBottom = () =>
    conversationRef.value?.scrollTo({
      top: conversationRef.value.scrollHeight
    });
  const toggleDetails = () => {
    const revision = Math.abs(detailsCommand.value) + 1;
    detailsCommand.value = detailsExpanded.value ? -revision : revision;
  };

  const updateDetailDsl = async (source: string) => {
    const projectDsl = engine.project.value?.toDsl();
    const currentDsl = engine.current.value?.toDsl();
    if (!projectDsl) return null;
    const dsl = await engine.service.parseVue(projectDsl as any, {
      id: currentDsl?.id || 'ai_gen',
      name: currentDsl?.name || 'AiGenFile',
      source
    });
    if (Array.isArray(dsl)) return Promise.reject(dsl);
    return dsl;
  };

  const showCodeDetail = async (
    source: string,
    language: string,
    dsl?: Record<string, any>
  ) => {
    if (language === 'diff') {
      const projectDsl = engine.project.value?.toDsl();
      const currentDsl = engine.current.value?.toDsl();
      if (projectDsl && currentDsl) {
        source =
          (await engine.service.genVueContent(
            projectDsl as any,
            currentDsl as any
          )) || source;
        language = 'vue';
      }
    }
    detailSource.value = source;
    detailLanguage.value = language;
    detailDsl.value = dsl || (await updateDetailDsl(source).catch(() => null));
    detailVisible.value = true;
  };

  const applyDetailDsl = async (dsl: any) => {
    if (!dsl) return;
    const id = engine.current.value?.id;
    if (id) dsl.id = id;
    await engine.applyAI(dsl);
    detailVisible.value = false;
  };

  const handleExport = () =>
    exportConversation(
      existingTopicId.value,
      model.value,
      conversationRounds.value
    );

  const resolveApproval = (id: string, approved: boolean) => {
    approvalResolvers.get(id)?.(approved);
    approvalResolvers.delete(id);
  };

  const updateAutoApprove = (enabled: boolean) => {
    autoApprove.value = enabled;
  };

  watch(autoApprove, (enabled) => {
    if (!enabled) return;
    approvalResolvers.forEach((resolve) => resolve(true));
    approvalResolvers.clear();
  });

  const abortAgent = () => {
    approvalResolvers.forEach((resolve) => resolve(false));
    approvalResolvers.clear();
    abortAgentFlow();
    if (activeChat) {
      activeChat.status = 'Canceled';
      cancelChat(activeChat).catch(() => null);
      activeChat = null;
    }
  };

  const retryAgent = async () => {
    await retryLastRound();
    activeChat = null;
  };

  const startNewConversation = () => {
    if (running.value) return;
    existingTopicId.value = '';
    conversationRounds.value = [];
    statusText.value = '';
    detailsCommand.value = 0;
    clearFiles();
    showDrawer.value = false;
  };

  const loadTopics = async () => {
    const projectId = engine.project.value?.__UID__;
    if (!token.value || !projectId) return;
    topics.value = await getTopics(projectId).catch(() => []);
  };

  const startAgent = async () => {
    const task = startDualAgent();
    if (running.value) {
      userMessage.value = '';
      clearFiles();
    }
    await task;
    activeChat = null;
    await loadTopics();
  };

  const continueAgent = async () => {
    const task = continueConversation();
    if (running.value) {
      userMessage.value = '';
      clearFiles();
    }
    await task;
    activeChat = null;
    await loadTopics();
  };

  const showChatRecords = async () => {
    showDrawer.value = !showDrawer.value;
    if (showDrawer.value) await loadTopics();
  };

  const onRecordLoad = async (topic: AITopic) => {
    existingTopicId.value = topic.id;
    model.value = topic.model || model.value;
    showDrawer.value = false;
    await loadChatHistory(topic.id);
  };

  const onRemoveTopic = async (topic: AITopic) => {
    const removed = await removeTopic(topic.id).catch(() => false);
    if (!removed) return;
    topics.value = topics.value.filter((item) => item.id !== topic.id);
    if (existingTopicId.value === topic.id) startNewConversation();
  };

  let scrollFrame = 0;
  watch(
    conversationRounds,
    () => {
      cancelAnimationFrame(scrollFrame);
      nextTick(() => {
        scrollFrame = requestAnimationFrame(() => {
          const element = conversationRef.value;
          if (element) element.scrollTop = element.scrollHeight;
        });
      });
    },
    { deep: true }
  );

  onMounted(async () => {
    initToken();
    logined.value = await isLogined();
    if (!logined.value) return;
    models.value = await getDictOptions('LLM').catch(() => []);
    settings.value = await getSettings();
    hotTopics.value = await getHotTopics(engine.project.value?.platform)
      .then((response) => unwrapOpenApi<AITopic[]>(response))
      .catch(() => []);
    await loadTopics();
    if (topics.value[0]) await onRecordLoad(topics.value[0]);
  });
  onUnmounted(() => {
    cancelAnimationFrame(scrollFrame);
    abortAgent();
    clearFiles();
  });

  defineOptions({ name: 'AgentWidget' });
  defineExpose({ newTask: startNewConversation, start: startAgent });
</script>

<style lang="scss" scoped>
  .v-agent-widget__wrapper,
  .v-agent-widget {
    height: 100%;
  }

  .v-agent-widget__wrapper {
    position: relative;
  }

  :deep(.v-agent-widget > .x-panel__body) {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  :global(.v-agent-widget__drawer-modal) {
    position: absolute !important;
    width: 100%;
    height: 100%;
  }

  :global(.v-agent-widget__drawer) {
    box-shadow: none !important;
    --el-drawer-padding-primary: 0 !important;
  }

  .v-agent-widget__conversation {
    min-height: 0;
    flex: 1;
    overflow: auto;
    padding: 14px 12px 22px;
    background: var(--el-bg-color);
    scroll-behavior: smooth;
  }

  .v-agent-widget-new-chat {
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow: hidden;
  }

  .v-agent-widget-new-chat__welcome {
    padding: 20px 0;
    text-align: center;
    line-height: 1.5em;

    > div {
      margin-top: 10px;
      color: var(--el-text-color-placeholder);
      font-size: 12px;
    }
  }

  .hot-list {
    overflow: auto;
  }

  .v-agent-widget__status {
    display: flex;
    width: fit-content;
    margin: 0 0 0 30px;
    padding: 6px 10px;
    align-items: center;
    gap: 8px;
    color: var(--el-text-color-secondary);
    border-radius: var(--el-border-radius-base);
    background: var(--el-fill-color-light);
    font-size: 12px;

    &.danger {
      color: var(--el-color-danger);
    }
  }

  .status-spinner {
    width: 12px;
    height: 12px;
    border: 2px solid var(--el-border-color-light);
    border-top-color: var(--el-color-primary);
    border-radius: 50%;
    animation: agent-spin 0.8s linear infinite;
  }

  @keyframes agent-spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
