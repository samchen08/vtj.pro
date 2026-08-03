<template>
  <XContainer class="v-agent-widget__wrapper" direction="column" fit>
    <Panel class="v-agent-widget" title="AI Agent">
      <template #actions>
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

      <LoginTip v-if="!token"></LoginTip>
      <div v-else ref="conversationRef" class="v-agent-widget__conversation">
        <div v-if="!hasData" class="v-agent-widget__empty">
          <ElAvatar :size="48" :icon="VtjIconAi"></ElAvatar>
          <strong>我可以帮你修改当前页面</strong>
          <p>描述想创建或调整的内容，也可以附加图片或 JSON。</p>
        </div>

        <ConversationRoundCard
          v-for="(round, index) in conversationRounds"
          :key="round.id"
          :round="round"
          :round-number="index + 1"
          :is-latest="index === conversationRounds.length - 1"
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
            @click="retryLastRound">
            重试
          </ElButton>
        </div>
      </div>

      <template v-if="token" #footer>
        <MessageInputCard
          :message="userMessage"
          :running="running"
          :has-topic="!!existingTopicId"
          :files="files"
          :recognizing="recognizing"
          :auto-approve="autoApprove"
          :model="model"
          @update:message="userMessage = $event"
          @update:auto-approve="updateAutoApprove"
          @update:model="model = $event"
          @start="startAgent"
          @continue="continueAgent"
          @abort="abortAgent"
          @upload-file="uploadFile"
          @remove-file="removeFile" />
      </template>
    </Panel>

    <ElDrawer
      v-model="showDrawer"
      class="v-ai-widget__drawer"
      size="100%"
      direction="ltr"
      :modal="false"
      :with-header="false"
      modal-class="v-ai-widget__drawer-modal"
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
  import {
    Download,
    VtjIconAi,
    VtjIconChatRecord,
    VtjIconClose,
    VtjIconNewChat
  } from '@vtj/icons';
  import { XAction, XContainer } from '@vtj/ui';
  import { ElAvatar, ElButton, ElDivider, ElDrawer } from 'element-plus';
  import {
    useEngine,
    type AITopic,
    type ToolContext
  } from '../../../framework';
  import { TOOL_CONFIGS } from '../../../managers';
  import { Panel } from '../../shared';
  import LoginTip from '../ai/login-tip.vue';
  import ChatRecords from '../ai/records.vue';
  import MessageInputCard from './message-input.vue';
  import ConversationRoundCard from './conversation-round.vue';
  import { useAuth } from './composables/useAuth';
  import { useApi } from './composables/useApi';
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
  const remote = () => engine.remote || location.origin;
  const statusText = ref('');
  const statusType = ref<'info' | 'warning' | 'success' | 'danger'>('info');
  const conversationRounds = ref<ConversationRound[]>([]);
  const conversationRef = ref<HTMLElement>();
  const showDrawer = ref(false);
  const topics = ref<AITopic[]>([]);
  const autoApprove = ref(false);
  const approvalResolvers = new Map<string, (approved: boolean) => void>();

  const { token, model, existingTopicId, initToken } = useAuth(
    () => engine.access?.getData()?.token
  );
  const { apiPost, apiGet } = useApi(() => token.value, remote);
  const { streamCompletion, abortAll } = useSSEStream(
    () => token.value,
    remote
  );
  const {
    files,
    recognizing,
    uploadFile,
    removeFile,
    buildFilePrompt,
    clearFiles
  } = useFileRecognition(() => token.value, remote);

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
        getSkills: (ids: string[]) => {
          const platform = project.value?.platform || 'web';
          return apiPost(`/api/open/skills/${platform}`, ids);
        }
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
    apiPost,
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
    apiPost,
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
    apiPost,
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
    { apiGet, statusText, statusType },
    conversationRounds
  );
  const hasData = computed(() => conversationRounds.value.length > 0);
  const currentTopic = computed(
    () => topics.value.find((item) => item.id === existingTopicId.value) || null
  );

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
    if (!enabled) return;
    approvalResolvers.forEach((resolve) => resolve(true));
    approvalResolvers.clear();
  };

  const abortAgent = () => {
    approvalResolvers.forEach((resolve) => resolve(false));
    approvalResolvers.clear();
    abortAgentFlow();
  };

  const startNewConversation = () => {
    if (running.value) return;
    existingTopicId.value = '';
    conversationRounds.value = [];
    statusText.value = '';
    clearFiles();
    showDrawer.value = false;
  };

  const loadTopics = async () => {
    const projectId = engine.project.value?.__UID__;
    if (!token.value || !projectId) return;
    topics.value = await apiGet<AITopic[]>('/api/open/topic/list/:token', {
      id: projectId
    }).catch(() => []);
  };

  const startAgent = async () => {
    await startDualAgent();
    await loadTopics();
  };

  const continueAgent = async () => {
    await continueConversation();
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
    const removed = await apiGet<boolean>('/api/open/topic/remove/:token', {
      id: topic.id
    }).catch(() => false);
    if (!removed) return;
    topics.value = topics.value.filter((item) => item.id !== topic.id);
    if (existingTopicId.value === topic.id) startNewConversation();
  };

  let scrollFrame = 0;
  watch(
    conversationRounds,
    () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        nextTick(() => {
          const element = conversationRef.value;
          if (element) element.scrollTop = element.scrollHeight;
        });
      });
    },
    { deep: true }
  );

  onMounted(async () => {
    initToken();
    await loadTopics();
    if (topics.value[0]) await onRecordLoad(topics.value[0]);
  });
  onUnmounted(() => {
    cancelAnimationFrame(scrollFrame);
    approvalResolvers.forEach((resolve) => resolve(false));
    abortAgentFlow();
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

  .v-agent-widget__conversation {
    height: 100%;
    overflow: auto;
    padding: 14px 12px 22px;
    background: var(--el-bg-color);
    scroll-behavior: smooth;
  }

  .v-agent-widget__empty {
    display: flex;
    min-height: 55%;
    padding: 32px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    :deep(.el-avatar) {
      margin-bottom: 14px;
      color: var(--el-color-primary);
      background: var(--el-color-primary-light-9);
      box-shadow: 0 0 0 1px var(--el-color-primary-light-7);
    }

    p {
      margin: 8px 0 0;
      color: var(--el-text-color-secondary);
      font-size: 13px;
      line-height: 1.6;
    }
  }

  .v-agent-widget__status {
    display: flex;
    width: fit-content;
    margin: 12px 0 0 30px;
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
