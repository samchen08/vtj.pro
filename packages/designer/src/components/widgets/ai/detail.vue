<template>
  <XDialog
    title="AI生成内容"
    maximizable
    submit="应用到页面"
    @submit="onSubmit">
    <template #extra>
      <div class="tips">您可以更改源码后重新生成DSL，再应用到页面。</div>
    </template>
    <template #handle>
      <ElButton @click="onRestDsl">重新生成DSL</ElButton>
    </template>
    <XContainer fit>
      <Editor
        ref="editorRef"
        height="100%"
        dark
        lang="html"
        :model-value="props.chat.vue"></Editor>
      <Editor
        height="100%"
        ref="dslRef"
        dark
        readonly
        lang="json"
        :model-value="dsl"></Editor>
    </XContainer>
  </XDialog>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { ElButton } from 'element-plus';
  import { XDialog, XContainer } from '@vtj/ui';
  import Editor from '../../editor/Editor.vue';
  import { type AIChat } from '../../hooks';
  import { notify } from '../../../utils';

  export interface Props {
    chat: AIChat;
    updateChatDsl: any;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    apply: [chat: AIChat];
  }>();

  const dsl = computed(() => JSON.stringify(props.chat.dsl || {}, null, 2));
  const editorRef = ref();
  const dslRef = ref();

  const onSubmit = () => {
    emit('apply', props.chat);
  };

  const onRestDsl = async () => {
    const editor = editorRef.value.getEditor();
    const code = editor.getValue();
    const dsl = await props.updateChatDsl(code).catch((e: any) => {
      if (Array.isArray(e)) {
        notify(e.join(','));
      } else {
        notify(e?.message || '代码错误');
      }
      return null;
    });

    if (dsl) {
      const dslEditor = dslRef.value.getEditor();
      dslEditor.setValue(JSON.stringify(dsl, null, 2));
    }
  };
</script>
<style lang="scss" scoped>
  .tips {
    font-size: 14px;
    color: var(--el-text-color-regular);
  }
</style>
