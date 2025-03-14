<template>
  <Panel
    class="v-css-widget v-sub-panel"
    title="JSON"
    size="small"
    fit
    save
    @save="onSave">
    <Editor
      ref="editorRef"
      :model-value="style"
      height="100%"
      lang="json"
      dark
      @blur="saveStyle"></Editor>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { isBlock } from '@vtj/core';
  import { Panel } from '../../shared';
  import Editor from '../../editor';
  import { useSelected } from '../../hooks';
  import { message, notify, normalizedStyle } from '../../../utils';

  defineOptions({
    name: 'StyleWidget'
  });

  const { selected } = useSelected();

  const editorRef = ref();

  const node = computed(() => {
    const model = selected.value?.model || null;
    return isBlock(model) ? null : model;
  });

  const style = computed(() =>
    JSON.stringify(
      normalizedStyle((node.value?.getPropValue('style') as any) || {}),
      null,
      2
    )
  );

  const saveStyle = (value: string) => {
    try {
      const json = normalizedStyle(JSON.parse(value));
      node.value?.setProp('style', json);
    } catch (e) {
      notify('JSON格式错误');
    }
  };

  const onSave = () => {
    const editor = editorRef.value?.getEditor();
    const value = editor.getValue();
    saveStyle(value);
    message('保存成功');
  };
</script>
