<template>
  <XContainer direction="column" fit>
    <Panel
      class="v-css-widget v-sub-panel"
      title="JSON"
      size="small"
      :fit="true"
      save
      grow
      @save="onSave">
      <Editor
        readonly
        ref="editorRef"
        :model-value="style"
        height="100%"
        lang="json"
        dark
        @blur="saveStyle"></Editor>
    </Panel>
  </XContainer>
</template>
<script lang="ts" setup>
  import { XContainer } from '@vtj/ui';
  import { ref, computed } from 'vue';
  import { isBlock } from '@vtj/core';
  import { isJSExpression } from '@vtj/renderer';
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

  const oStyle = computed(() => {
    return (node.value?.getPropValue('style') as any) || {};
  });

  const style = computed(() => {
    if (isJSExpression(oStyle.value)) {
      return JSON.stringify({});
    } else {
      return JSON.stringify(normalizedStyle(oStyle.value), null, 2);
    }
  });

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
