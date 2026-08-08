<template>
  <div class="v-agent-widget-record">
    <ElButton
      class="new-btn"
      round
      plain
      type="primary"
      :icon="VtjIconNewChat"
      @click="$emit('new')">
      开启新对话
    </ElButton>
    <ElDivider content-position="left" border-style="dotted">
      历史对话
    </ElDivider>

    <div v-if="topics.length" class="v-agent-widget-record__list">
      <Item
        v-for="(item, index) in topics"
        :key="item.id"
        :index="index + 1"
        :title="item.title"
        :model-value="item"
        :active="current?.id === item.id"
        background
        :actions="['remove']"
        @click="$emit('load', item)"
        @action="onAction"></Item>
    </div>
    <ElEmpty v-else description="暂无历史对话"></ElEmpty>
  </div>
</template>

<script lang="ts" setup>
  import { VtjIconNewChat } from '@vtj/icons';
  import { ElDivider, ElButton, ElEmpty } from 'element-plus';
  import { Item } from '../../shared';
  import type { AITopic } from '../../../framework';

  withDefaults(
    defineProps<{
      topics?: AITopic[];
      current?: AITopic | null;
    }>(),
    { topics: () => [] }
  );

  const emit = defineEmits<{
    new: [];
    load: [topic: AITopic];
    remove: [topic: AITopic];
  }>();

  const onAction = (event: { modelValue: AITopic }) => {
    emit('remove', event.modelValue);
  };
</script>

<style lang="scss" scoped>
  .new-btn {
    width: 100%;
  }

  .v-agent-widget-record__list {
    :deep(.v-item) {
      margin-bottom: 10px;
    }

    :deep(.v-item__title) {
      flex-shrink: 1;
    }

    :deep(.v-item__content) {
      font-size: 12px;
      line-height: 1.5em;
    }
  }
</style>
