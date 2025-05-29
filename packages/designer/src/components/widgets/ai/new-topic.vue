<template>
  <div class="v-ai-widget-new-chat">
    <div class="v-ai-widget-new-chat__welcome">
      <h3>嗨！我是您的智能助手</h3>
      <div>我可以帮你开发低代码页面，请把你的任务交给我吧~</div>
    </div>
    <div class="v-ai-widget-new-chat__input-type">
      <ElSegmented
        :options="inputOptions"
        :disabled="props.loading"
        v-model="currentOption"
        size="small"></ElSegmented>
    </div>
    <ChatInput
      v-if="isTextInput"
      :min-rows="8"
      :models="props.models"
      :loading="props.loading"
      :disabled="props.disabled"
      :model-value="props.modelValue"
      @send="onSend"></ChatInput>
    <ImageInput
      v-else
      :loading="props.loading"
      @send="onImageSend"></ImageInput>
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
  import { ref, onMounted, computed } from 'vue';
  import { ElDivider, ElSegmented } from 'element-plus';
  import ChatInput from './chat-input.vue';
  import ImageInput from './image-input.vue';
  import { Item } from '../../shared';
  import {
    useOpenApi,
    type Dict,
    type AISendData,
    type AISendImageData,
    type AITopic
  } from '../../hooks';

  export interface Props {
    models?: Dict[];
    loading?: boolean;
    modelValue?: string;
    fillPromptInput: any;
    disabled?: boolean;
    uploader?: (file: File) => Promise<any>;
  }

  const props = withDefaults(defineProps<Props>(), {
    models: () => []
  });

  const emit = defineEmits<{
    send: [data: AISendData];
    imageSend: [data: AISendImageData];
  }>();

  const { getHotTopics, engine } = useOpenApi();

  const hotTopics = ref<AITopic[]>([]);

  const inputOptions = [
    {
      label: '文字',
      value: 'text'
    },
    {
      label: '图片',
      value: 'image'
    }
  ];
  const currentOption = ref('text');

  const isTextInput = computed(() => currentOption.value === 'text');

  const onTopicClick = (topic: AITopic) => {
    props.fillPromptInput(topic.prompt);
  };

  const onSend = (data: AISendData) => {
    emit('send', { ...data } as AISendData);
  };

  const onImageSend = (file: File, auto: boolean) => {
    const model = engine.state.llm || props.models[0].value;
    emit('imageSend', { file, auto, model } as AISendImageData);
  };

  onMounted(async () => {
    const res = await getHotTopics();
    if (res?.success) {
      hotTopics.value = res.data as AITopic[];
    }
  });
</script>
