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
        ref="payTipRef"
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
          :retryable="!running"
          :code="!isHideCode"
          :details-command="detailsCommand"
          @view="showCodeDetail"
          @apply="applyDetailDsl"
          @retry-step="(stepIndex) => retryAgentStep(round, stepIndex)"
          @retry-summary="retryAgentSummary(round)"
          @resolve-approval="resolveApproval" />

        <div
          v-if="statusText"
          class="v-agent-widget__status"
          :class="statusType">
          <span v-if="running" class="status-spinner"></span>
          <span v-else class="status-icon">{{ statusIcon }}</span>
          <span>{{ statusText }}</span>
          <ElButton
            v-if="statusType === 'danger' && !running"
            text
            type="primary"
            @click="retryAgent">
            重试
          </ElButton>
          <ElButton
            v-if="cancelled && !running && hasData"
            text
            type="primary"
            @click="resumeAgent">
            恢复
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
      modal-class="v-agent-widget__drawer-modal">
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
  import { storage, cloneDeep } from '@vtj/utils';
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
  import { useAgentApi } from './composables/useAgentApi';
  import { useSSEStream } from './composables/useSSEStream';
  import { useEditorStep } from './composables/useEditorStep';
  import { useArchitectPlan } from './composables/useArchitectPlan';
  import { useDualAgent } from './composables/useDualAgent';
  import { useFileRecognition } from './composables/useFileRecognition';
  import { useReplayChat } from './composables/useReplayChat';
  import { exportConversation } from './utils/export';
  import {
    HIDE_CODE_STORAGE_KEY,
    SCROLL_NEAR_BOTTOM_THRESHOLD,
    PAY_LIMIT_MESSAGE
  } from './constants';
  import {
    setAgentStatus,
    Messages,
    type AgentStatusMessage
  } from './utils/messages';
  import type {
    ConversationRound,
    DualAgentInfrastructure,
    DualAgentApi,
    DualAgentState
  } from './types/agent';

  const engine = useEngine();
  const statusText = ref('');
  const statusType = ref<'info' | 'warning' | 'success' | 'danger'>('info');
  /** 付费提示组件引用（服务端额度用尽报错时触发显示） */
  const payTipRef = ref<{ show: () => void }>();
  /** 状态写入统一闭包（各 composable 经 DI 使用，避免传递双 ref） */
  const setStatus = (message: AgentStatusMessage) => {
    setAgentStatus(statusText, statusType, message);
    // 服务端额度用尽报错：即时弹出付费提示（不等 settings 轮询）
    if (message.text.includes(PAY_LIMIT_MESSAGE)) {
      payTipRef.value?.show();
    }
  };
  /** 状态条符号（文案不携带 emoji，符号由 UI 层依据 statusType 渲染） */
  const statusIcon = computed(() => {
    switch (statusType.value) {
      case 'danger':
        return '✕';
      case 'warning':
        return '⚠';
      case 'success':
        return '✓';
      default:
        return 'ℹ';
    }
  });
  const conversationRounds = ref<ConversationRound[]>([]);
  const conversationRef = ref<HTMLElement>();
  // 兜底：步骤失败错误（slot.error 不经 setStatus）可能携带额度用尽文案
  watch(
    () =>
      conversationRounds.value
        .flatMap((round) => round.editorResults.map((e) => e.error || ''))
        .join('\n'),
    (text) => {
      if (text.includes(PAY_LIMIT_MESSAGE)) payTipRef.value?.show();
    }
  );
  const showDrawer = ref(false);
  const logined = ref(true);
  const topics = ref<AITopic[]>([]);
  const hotTopics = ref<AITopic[]>([]);
  const models = ref<DictOption[]>([]);
  const settings = ref<Settings>();
  const isHideCode = ref(
    !!storage.get(HIDE_CODE_STORAGE_KEY, { type: 'local' })
  );
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
  const openApi = useOpenApi();
  const {
    isLogined,
    getDictOptions,
    getSettings,
    getImage,
    createOrder,
    cancelOrder,
    getOrder,
    chatCompletions
  } = openApi;
  // Agent 业务 API 统一经 useAgentApi 包装（响应解包 / 结构容错 / 活动 chat 追踪）
  const {
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
  } = useAgentApi(openApi);

  const { token, model, existingTopicId, initToken } = useAuth(
    () => engine.access?.getData()?.token
  );
  const { streamCompletion, abortAll } = useSSEStream(chatCompletions as any);
  const {
    files,
    recognizing,
    uploadFile,
    removeFile,
    buildFilePrompt,
    buildAttachments,
    clearFiles
  } = useFileRecognition(recognitionFile);

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
      // 每次执行前重建 handler（捕获最新 project），切换项目后工具操作不会指向旧项目
      const handler = tool.createHandler(toolContext);
      if (toolRegistry.has(tool.name)) {
        toolRegistry.set(tool.name, { handler });
      } else {
        toolRegistry.register({
          name: tool.name,
          description: tool.description,
          parameters: tool.parameters,
          handler,
          risk: tool.risk
        });
      }
    });
  };

  const { executeEditorStep } = useEditorStep({
    streamCompletion,
    postChat,
    saveChat,
    updateTopic,
    getEngine,
    setStatus,
    requestApproval: (id) =>
      autoApprove.value
        ? Promise.resolve(true)
        : new Promise<boolean>((resolve) => approvalResolvers.set(id, resolve))
  });
  const {
    executeArchitectPlan,
    retryEditorPlan,
    retrySummary,
    resumeEditorPlan
  } = useArchitectPlan({
    streamCompletion,
    postChat,
    saveChat,
    updateTopic,
    saveTrace,
    setStatus,
    executeEditorStep
  });

  const infra: DualAgentInfrastructure = {
    token,
    model,
    existingTopicId,
    setTopicId: (id) => (existingTopicId.value = id),
    getEngine,
    registerTools,
    abortSse: abortAll,
    access: engine.access ?? undefined,
    setStatus
  };
  const agentApi: DualAgentApi = {
    postTopic,
    postChat,
    executeArchitectPlan,
    retryEditorPlan,
    resumeEditorPlan,
    retrySummary
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
    cancelled,
    startDualAgent,
    continueConversation,
    retryLastRound,
    retryStep,
    retrySummary: retryRoundSummary,
    resumeLastRound,
    abortAll: abortAgentFlow
  } = useDualAgent(
    infra,
    agentApi,
    agentState,
    buildFinalPrompt,
    buildAttachments,
    clearFiles
  );
  const { loadChatHistory } = useReplayChat(
    { getChats, setStatus },
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
  const detailsExpanded = computed(() => detailsCommand.value > 0);

  const toggleHideCode = () => {
    if (!hasData.value) return;
    isHideCode.value = !isHideCode.value;
    storage.save(HIDE_CODE_STORAGE_KEY, isHideCode.value, { type: 'local' });
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
    // 深拷贝，避免直接修改共享 dsl 对象
    const target = cloneDeep(dsl);
    const id = engine.current.value?.id;
    if (id) target.id = id;
    const applied = await engine.applyAI(target);
    if (!applied) {
      setStatus(Messages.lockedProject);
      return;
    }
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
    // 中止时标记活动 chat 为 Canceled 并清除追踪引用
    cancelActiveChat();
  };

  const retryAgent = async () => {
    await retryLastRound();
    clearActiveChat();
  };

  const resumeAgent = async () => {
    await resumeLastRound();
    clearActiveChat();
  };

  const retryAgentStep = async (
    round: ConversationRound,
    stepIndex: number
  ) => {
    await retryStep(round, stepIndex);
    clearActiveChat();
  };

  const retryAgentSummary = async (round: ConversationRound) => {
    await retryRoundSummary(round);
    clearActiveChat();
  };

  const startNewConversation = () => {
    if (running.value) return;
    existingTopicId.value = '';
    conversationRounds.value = [];
    statusText.value = '';
    cancelled.value = false;
    detailsCommand.value = 0;
    clearFiles();
    showDrawer.value = false;
  };

  const loadTopics = async () => {
    initToken();
    const projectId = engine.project.value?.__UID__;
    if (!token.value || !projectId) return;
    topics.value = await getTopics(projectId).catch(() => []);
  };

  // 加载最近一次对话（无话题时进入新会话）；防重：避免挂载与项目切换 watch 并发触发
  let loadingLatest = false;
  const loadLatest = async () => {
    if (loadingLatest) return;
    loadingLatest = true;
    try {
      if (topics.value[0]) {
        await onRecordLoad(topics.value[0]);
      } else {
        startNewConversation();
      }
    } finally {
      loadingLatest = false;
    }
  };

  const startAgent = async () => {
    initToken();
    const task = startDualAgent();
    if (running.value) {
      userMessage.value = '';
      clearFiles();
    }
    await task;
    clearActiveChat();
    await loadTopics();
  };

  const continueAgent = async () => {
    initToken();
    const task = continueConversation();
    if (running.value) {
      userMessage.value = '';
      clearFiles();
    }
    await task;
    clearActiveChat();
    await loadTopics();
  };

  const showChatRecords = async () => {
    if (!logined.value) {
      setStatus(Messages.tokenMissing);
      return;
    }
    showDrawer.value = !showDrawer.value;
    if (showDrawer.value) await loadTopics();
  };

  const onRecordLoad = async (topic: AITopic) => {
    // 运行中切换历史：先中止当前流程，避免 SSE 写入已卸载轮次
    if (running.value) abortAgent();
    initToken();
    existingTopicId.value = topic.id;
    model.value = topic.model || model.value;
    cancelled.value = false;
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
  // 用户是否停留在底部区域（避免内容更新时强制拉底干扰阅读）
  let isNearBottom = true;
  const onConversationScroll = () => {
    const element = conversationRef.value;
    if (!element) return;
    isNearBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight <
      SCROLL_NEAR_BOTTOM_THRESHOLD;
  };
  // 定向浅监听：仅跟踪影响高度的摘要（文本长度、步骤数、轮次数），
  // 避免 deep 监听 editorResults 内部字段导致无效滚动
  const scrollWatchKey = computed(() =>
    conversationRounds.value
      .map(
        (r) =>
          `${r.architectStreamText.length}|${r.summaryText.length}|${r.editorResults
            .map((e) => `${e.content.length}:${e.turns.length}`)
            .join(',')}`
      )
      .join(';')
  );
  watch(scrollWatchKey, () => {
    cancelAnimationFrame(scrollFrame);
    nextTick(() => {
      scrollFrame = requestAnimationFrame(() => {
        const element = conversationRef.value;
        if (element && isNearBottom) element.scrollTop = element.scrollHeight;
      });
    });
  });

  // 项目切换后刷新历史话题，并加载新项目最近一次对话
  watch(
    () => engine.project.value?.__UID__,
    async () => {
      if (!logined.value) return;
      if (running.value) abortAgent();
      await loadTopics();
      await loadLatest();
    }
  );

  onMounted(async () => {
    initToken();
    logined.value = await isLogined();
    if (!logined.value) return;
    models.value = await getDictOptions('LLM').catch(() => []);
    settings.value = await getSettings().catch(() => undefined);
    hotTopics.value = await getHotTopics(engine.project.value?.platform).catch(
      () => []
    );
    await loadTopics();
    await loadLatest();
    conversationRef.value?.addEventListener('scroll', onConversationScroll, {
      passive: true
    });
  });
  onUnmounted(() => {
    cancelAnimationFrame(scrollFrame);
    conversationRef.value?.removeEventListener('scroll', onConversationScroll);
    if (running.value) abortAgent();
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
    padding: 0;
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

  .status-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    font-size: 12px;
  }

  @keyframes agent-spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
