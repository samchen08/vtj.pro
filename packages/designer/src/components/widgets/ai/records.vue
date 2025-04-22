<template>
  <div class="v-ai-widget-record">
    <ElButton
      class="new-btn"
      round
      plain
      type="primary"
      :icon="VtjIconNewChat"
      @click="onNewChat">
      开启新对话
    </ElButton>
    <ElDivider content-position="left" border-style="dotted">
      历史对话
    </ElDivider>

    <div v-if="props.topics.length" class="v-ai-widget-record__list">
      <Item
        v-for="(item, index) in props.topics"
        :index="index + 1"
        :title="item.title"
        :model-value="item"
        :active="current?.id === item.id"
        background
        :actions="['remove']"
        @click="onClickItem(item)"
        @action="onAction">
      </Item>
    </div>
    <ElEmpty v-else description="暂无历史对话"></ElEmpty>
  </div>
</template>
<script setup lang="ts">
  import { VtjIconNewChat } from '@vtj/icons';
  import { ElDivider, ElButton, ElEmpty } from 'element-plus';
  import { Item } from '../../shared';
  import { type AITopic } from '../../hooks';

  export interface Props {
    topics?: AITopic[];
    current?: AITopic | null;
  }

  const props = withDefaults(defineProps<Props>(), {
    topics: () => []
  });

  const emit = defineEmits(['new', 'load', 'remove']);

  const onNewChat = () => {
    emit('new');
  };

  const onClickItem = (item: AITopic) => {
    emit('load', item);
  };

  const onAction = (e: any) => {
    emit('remove', e.modelValue as AITopic);
  };
</script>
