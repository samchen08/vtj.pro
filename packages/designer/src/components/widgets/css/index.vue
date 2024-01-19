<template>
  <Panel
    class="v-css-widget v-sub-panel"
    title="lang:css scoped"
    size="small"
    fit
    save
    @save="onSave">
    <Editor
      ref="editorRef"
      :model-value="css"
      height="100%"
      lang="css"
      dark
      @blur="saveCss"></Editor>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Panel } from '../../shared';
  import Editor from '../../editor';
  import { useCurrent } from '../../hooks';
  import { message } from '../../../utils';

  defineOptions({
    name: 'CssWidget'
  });
  const { current } = useCurrent();

  const editorRef = ref();
  const css = computed(() => current.value?.css || '');

  const saveCss = (value: string) => {
    current.value?.setCss(value);
  };

  const onSave = () => {
    const editor = editorRef.value?.getEditor();
    const value = editor.getValue();
    saveCss(value);
    message('保存成功');
  };
</script>
