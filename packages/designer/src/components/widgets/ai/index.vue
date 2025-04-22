<template>
  <XContainer class="v-ai-widget__wrapper" direction="column" fit>
    <Panel
      class="v-ai-widget"
      title="AI助手"
      ref="panelRef"
      :body="{ overflow: bodyOverflow }">
      <template #actions>
        <XAction
          mode="icon"
          size="small"
          :disabled="isNewChat"
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
          :disabled="isNewChat"
          @click="scrollToTop"></XAction>
        <XAction
          mode="icon"
          size="small"
          type="primary"
          :icon="Bottom"
          title="滚动到底部"
          background="hover"
          :disabled="isNewChat"
          @click="scrollToBottom"></XAction>
        <ElDivider direction="vertical"></ElDivider>
        <XAction
          mode="icon"
          size="small"
          type="primary"
          :icon="ArrowUp"
          title="全部折叠"
          background="hover"
          :disabled="isNewChat"
          @click="collapseAll"></XAction>
        <XAction
          mode="icon"
          size="small"
          type="primary"
          :icon="ArrowDown"
          title="全部展开"
          background="hover"
          :disabled="isNewChat"
          @click="expandAll"></XAction>
        <ElDivider direction="vertical"></ElDivider>
        <XAction
          mode="icon"
          size="large"
          :icon="VtjIconChatRecord"
          background="hover"
          title="对话历史"
          @click="showChatRecored"></XAction>
      </template>

      <LoginTip v-if="!logined"></LoginTip>
      <NoFileTip v-if="logined && isNoFile"></NoFileTip>
      <NewTopic
        v-if="isNoFile || isNewChat"
        :models="models"
        :loading="loading"
        :model-value="promptText"
        :disabled="inputDisabled"
        :fillPromptInput="fillPromptInput"
        @send="onPostTopic"></NewTopic>

      <div v-if="!isNewChat" ref="listRef" class="v-ai-widget__bubble-list">
        <template v-for="chat of chats" :key="chat.id">
          <Bubble type="user" :data="chat"></Bubble>
          <Bubble
            type="ai"
            :data="chat"
            :code="!isHideCode"
            @view="onView(chat)"
            @refresh="onRefresh(chat)"
            @apply="onApply(chat)"
            @fix="onFix(chat)"></Bubble>
        </template>
      </div>

      <template v-if="!isNewChat" #footer>
        <div class="v-ai-widget__input">
          <ElButton
            class="new-btn"
            round
            plain
            type="primary"
            size="small"
            :icon="VtjIconNewChat"
            @click="onNewChat">
            开启新对话
          </ElButton>
          <ChatInput
            v-if="currentTopic"
            :models="models"
            :loading="loading || isPending"
            :model="currentTopic?.model"
            :model-value="promptText"
            :disabled="inputDisabled"
            lock-model
            @send="onPostChat"></ChatInput>
          <div class="footer">内容由 AI 生成，请仔细甄别</div>
        </div>
      </template>

      <Detial
        v-if="currentChat"
        v-model="showDetail"
        :chat="currentChat"
        :update-chat-dsl="updateChatDsl"
        @apply="onApply"></Detial>
    </Panel>
    <ElDrawer
      class="v-ai-widget__drawer"
      title="历史对话"
      size="100%"
      direction="ltr"
      :modal="false"
      :with-header="false"
      modal-class="v-ai-widget__drawer-modal"
      :append-to-body="false"
      v-model="showDrawer">
      <Panel class="v-ai-widget" title="AI助手">
        <template #actions>
          <XAction
            mode="icon"
            size="large"
            :icon="VtjIconClose"
            background="hover"
            title="对话历史"
            @click="showChatRecored"></XAction>
        </template>

        <ChatRecords
          :current="currentTopic"
          :topics="topics"
          @new="onNewChat"
          @load="onRecordLoad"
          @remove="onRemoveTopic"></ChatRecords>
      </Panel>
    </ElDrawer>
    <InviteTip
      v-if="settings"
      :settings="settings"
      :remote="engine.remote"></InviteTip>
    <PayTip
      v-if="settings"
      :settings="settings"
      :remote="engine.remote"
      :create-order="createOrder"
      :cancel-order="cancelOrder"
      :get-order="getOrder"></PayTip>
  </XContainer>
</template>
<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import {
    VtjIconChatRecord,
    VtjIconClose,
    VtjIconNewChat,
    ArrowUp,
    ArrowDown,
    Top,
    Bottom,
    View,
    Hide
  } from '@vtj/icons';
  import { XAction, XContainer } from '@vtj/ui';
  import { ElDrawer, ElButton, ElDivider } from 'element-plus';
  import { useAI, type AITopic, type AIChat } from '../../hooks';
  import { Panel } from '../../shared';
  import { message } from '../../../utils';
  import ChatRecords from './records.vue';
  import ChatInput from './chat-input.vue';
  import Bubble from './bubble.vue';
  import LoginTip from './login-tip.vue';
  import NewTopic from './new-topic.vue';
  import NoFileTip from './no-file-tip.vue';
  import Detial from './detail.vue';
  import InviteTip from './invite-tip.vue';
  import PayTip from './pay-tip.vue';

  const {
    engine,
    isLogined,
    isNewChat,
    loading,
    models,
    onPostTopic,
    chats,
    currentTopic,
    onPostChat,
    topics,
    loadChats,
    onRemoveTopic,
    onView,
    onRefresh,
    onApply,
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
    promptText,
    fillPromptInput,
    settings,
    inputDisabled,
    createOrder,
    cancelOrder,
    getOrder,
    updateChatDsl
  } = useAI();

  const logined = ref(true);
  const showDrawer = ref(false);
  const isNoFile = computed(() => !engine.current.value);

  const showCodeProps = computed<any>(() => {
    return isHideCode.value
      ? {
          icon: Hide,
          title: '显示代码块',
          type: 'warning'
        }
      : {
          icon: View,
          title: '隐藏代码块',
          type: 'default'
        };
  });

  const bodyOverflow = computed(() => {
    return !logined.value || isNoFile.value ? 'hidden' : 'auto';
  });

  onMounted(async () => {
    logined.value = await isLogined();
  });

  const showChatRecored = () => {
    if (!logined.value) {
      message(
        '使用AI助手需登录，您还没登录或登录已失效，请重新登录！',
        'warning'
      );
      return;
    }
    if (isNoFile.value) {
      message(
        '当前设计视图无任何文件，请新建或打开文件后再使用AI助',
        'warning'
      );
      return;
    }
    showDrawer.value = !showDrawer.value;
  };

  const onNewChat = () => {
    if (isPending.value) return;
    isNewChat.value = true;
    showDrawer.value = false;
  };

  const onRecordLoad = (item: AITopic) => {
    showDrawer.value = false;
    isNewChat.value = false;
    currentTopic.value = item;
    loadChats(item.id);
  };

  defineOptions({
    name: 'AIWidget'
  });
</script>
