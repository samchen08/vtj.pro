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
      <ElButton @click="onResetDsl">重新生成DSL</ElButton>
    </template>
    <XContainer fit>
      <Editor
        ref="editorRef"
        height="100%"
        dark
        :lang="language === 'diff' ? 'diff' : 'html'"
        :model-value="source"></Editor>
      <Editor
        ref="dslRef"
        height="100%"
        dark
        readonly
        lang="json"
        :model-value="dslText"></Editor>
    </XContainer>
  </XDialog>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { ElButton } from 'element-plus';
  import { XContainer, XDialog } from '@vtj/ui';
  import { notify } from '../../../utils';
  import Editor from '../../editor/Editor.vue';

  const props = defineProps<{
    source: string;
    language: string;
    dsl: any;
    updateDsl: (source: string) => Promise<any>;
  }>();
  const emit = defineEmits<{
    apply: [dsl: any];
  }>();

  const currentDsl = ref(props.dsl);
  const dslText = computed(() =>
    JSON.stringify(currentDsl.value || {}, null, 2)
  );
  const editorRef = ref();
  const dslRef = ref();

  const onSubmit = () => emit('apply', currentDsl.value);

  const onResetDsl = async () => {
    const source = editorRef.value.getEditor().getValue();
    if (!source) return;
    const dsl = await props.updateDsl(source).catch((error: any) => {
      notify(
        Array.isArray(error) ? error.join('；') : error?.message || '代码错误'
      );
      return null;
    });
    if (!dsl) return;
    currentDsl.value = dsl;
    dslRef.value.getEditor().setValue(JSON.stringify(dsl, null, 2));
  };
</script>

<style lang="scss" scoped>
  .tips {
    color: var(--el-text-color-regular);
    font-size: 14px;
  }
</style>
