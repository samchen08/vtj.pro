<template>
  <div class="v-ai-widget-bubble" :class="classes">
    <ElAvatar
      v-if="isAi"
      class="v-ai-widget-bubble__avatar"
      :size="24"
      :icon="VtjIconAi"></ElAvatar>
    <Avatar v-if="props.type === 'user'"></Avatar>
    <div class="v-ai-widget-bubble__main">
      <div class="v-ai-widget-bubble__content" :class="statusClass">
        <template v-if="isAi">
          <ElTag
            v-if="!isPending"
            class="v-ai-widget-bubble__toggle"
            size="small"
            type="info"
            @click="onToggleCollaspe">
            {{ collaspeText }}
            <XIcon :icon="collaspedIcon"></XIcon>
          </ElTag>
          <div :class="{ 'is-collapsed': collasped }">
            <div class="v-ai-widget-bubble__reasoning">
              <pre>{{ props.data.reasoning }}</pre>
            </div>
            <div v-if="props.data.content" class="v-ai-widget-bubble__detail">
              <StreamMarkdown
                :content="props.data.content"
                :code="isPending || props.code"
                @click="onClickCode"></StreamMarkdown>
            </div>
          </div>
          <div v-if="props.data.message" class="v-ai-widget-bubble__message">
            <div>{{ props.data.message }}</div>
            <ElButton v-if="isError" size="small" round @click="onFix">
              纠正错误
            </ElButton>
          </div>
          <ElButton
            v-if="isPending"
            class="v-ai-widget-bubble__loading"
            loading
            size="default"
            text
            circle></ElButton>
        </template>
        <div v-else>
          <div v-if="props.data.image || props.data.json">
            <ElImage :src="getCover(props.data)"></ElImage>
            <div
              title="下载文件"
              class="v-ai-widget-bubble__filename"
              @click="showFile(props.data.image || props.data.json)">
              {{ getFileName(props.data.image || props.data.json) }}
            </div>
          </div>
          <pre v-else>{{ props.data.prompt }}</pre>
        </div>
      </div>
      <div v-if="isAi" class="v-ai-widget-bubble__tools">
        <XActionBar
          v-if="!isPending"
          :items="actions"
          size="small"
          mode="icon"
          type="primary"
          @click="onActionClick"></XActionBar>
        <XAction
          v-if="isPending"
          :icon="VtjIconNpCancel"
          size="small"
          tooltip="取消对话"
          mode="icon"
          type="danger"
          @click="onCancel"></XAction>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { ElAvatar, ElButton, ElTag, ElImage } from 'element-plus';
  import Avatar from './avatar.vue';
  import {
    VtjIconAi,
    Refresh,
    View,
    Download,
    ArrowUpBold,
    ArrowDownBold,
    VtjIconNpCancel
  } from '@vtj/icons';
  import { XActionBar, XAction, XIcon, type ActionBarItems } from '@vtj/ui';
  import StreamMarkdown from './stream-markdown.vue';
  import { type AIChat } from '../../hooks';
  import figma from '../../../assets/figma.png';
  import sketch from '../../../assets/sketch.png';
  import other from '../../../assets/json.png';

  export interface Props {
    type: 'user' | 'ai';
    data: AIChat;
    code?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'user',
    code: true
  });

  const emit = defineEmits(['refresh', 'view', 'download', 'fix', 'cancel']);
  const coverMap = { figma, sketch, other, unknown: other };
  const isAi = computed(() => props.type === 'ai');
  const isCompleted = computed(() => props.data.status === 'Success');
  const isPending = computed(() => props.data.status === 'Pending');
  const isError = computed(() => props.data.status === 'Error');
  const collasped = ref(props.data.collapsed);
  const collaspedIcon = computed(() =>
    collasped.value ? ArrowDownBold : ArrowUpBold
  );
  const statusClass = computed(() => {
    return {
      [`is-${props.data.status}`]: props.type === 'ai'
    };
  });

  const actions = computed(() => {
    return [
      {
        name: 'refresh',
        tooltip: '重新生成',
        icon: Refresh
      },
      {
        name: 'view',
        tooltip: '查看生成内容',
        icon: View,
        disabled: !isCompleted.value
      },
      {
        name: 'apply',
        tooltip: '应用到页面',
        icon: Download,
        disabled: !isCompleted.value
      }
    ] as ActionBarItems;
  });

  const classes = computed(() => {
    return {
      'is-user': props.type === 'user',
      'is-ai': props.type === 'ai'
    };
  });

  const collaspeText = computed(() => {
    return !!props.data.reasoning
      ? `已经深度思考 (用时 ${Math.ceil(props.data.thinking / 1000)} 秒)`
      : collasped.value
        ? '展开'
        : '收起';
  });

  const getCover = (chat: AIChat) => {
    const type = chat.type;
    if (type === 'json' && chat.json) {
      if (chat.dataType) {
        return coverMap[chat.dataType] || coverMap.other;
      }
      if (chat.json.includes('/sketch/')) {
        return coverMap.sketch;
      } else if (chat.json.includes('/figma/')) {
        return coverMap.figma;
      }
      return coverMap.other;
    }
    if (chat.image) {
      return chat.image;
    }
    return '';
  };

  const getFileName = (fileUrl: string = '') => {
    const arr = fileUrl.split('/');
    return arr.length > 6 ? arr.slice(6).join('/') : fileUrl;
  };

  const showFile = (url?: string) => {
    if (url) {
      window.open(url);
    }
  };

  const onActionClick = (e: any) => {
    emit(e.name, e);
  };

  const onToggleCollaspe = () => {
    collasped.value = !collasped.value;
  };

  const onFix = () => {
    emit('fix', props.data);
  };

  const onClickCode = () => {
    emit('view', props.data);
  };

  const onCancel = () => {
    emit('cancel', props.data);
  };

  watch(
    () => props.data.collapsed,
    (v) => {
      collasped.value = !!v;
    },
    { immediate: true }
  );

  watch(
    () => props.data.status,
    () => {
      collasped.value = false;
    }
  );
</script>
