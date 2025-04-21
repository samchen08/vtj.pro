<template>
  <div class="v-ai-widget-new-chat">
    <div class="v-ai-widget-new-chat__welcome">
      <h3>嗨！我是您的智能助手</h3>
      <div>我可以帮你开发低代码页面，请把你的任务交给我吧~</div>
    </div>
    <ChatInput
      :min-rows="5"
      :models="props.models"
      :loading="props.loading"
      :disabled="props.disabled"
      :model-value="props.modelValue"
      @send="onSend"></ChatInput>
    <template v-if="hotTopics.length">
      <ElDivider content-position="left">热门需求</ElDivider>
      <div>
        <Item
          v-for="(item, index) in hotTopics"
          :index="index + 1"
          :title="item.title"
          :model-value="item"
          :nowrap="false"
          background
          @click="onTopicClick(item)">
        </Item>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { ElDivider } from 'element-plus';
  import ChatInput from './chat-input.vue';
  import { Item } from '../../shared';
  import {
    useOpenApi,
    type Dict,
    type AISendData,
    type AITopic
  } from '../../hooks';

  export interface Props {
    models?: Dict[];
    types?: Dict[];
    loading?: boolean;
    modelValue?: string;
    fillPromptInput: any;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    models: () => [],
    types: () => []
  });

  const emit = defineEmits<{
    send: [data: AISendData];
  }>();

  const { getHotTopics } = useOpenApi();

  const hotTopics = ref<AITopic[]>([]);

  const currentOption = ref('New');

  const onTopicClick = (topic: AITopic) => {
    props.fillPromptInput(topic.prompt);
  };

  const onSend = (data: AISendData) => {
    emit('send', { type: currentOption.value, ...data } as AISendData);
  };

  onMounted(async () => {
    const res = await getHotTopics();
    if (res?.success) {
      hotTopics.value = res.data as AITopic[];
    }
  });
</script>
