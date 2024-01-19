<template>
  <Panel
    class="v-schema-widget"
    :title="title"
    subtitle="手动修改DSL有风险，可能导致页面无法加载，请确认您的操作无误。"
    size="small"
    fit
    save
    @save="onSave">
    <Editor
      ref="editorRef"
      :model-value="dsl"
      height="100%"
      lang="json"
      dark></Editor>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Panel } from '../../shared';
  import Editor from '../../editor';
  import { useCurrent } from '../../hooks';
  import { notify, confirm, message } from '../../../utils';

  const { current } = useCurrent();
  const editorRef = ref();
  const dsl = computed(() =>
    JSON.stringify(current.value?.toDsl() || {}, null, 2)
  );

  const title = computed(() => {
    return current.value ? current.value.name : '';
  });

  const onSave = async () => {
    const editor = editorRef.value?.getEditor();
    const value = editor.getValue();
    if (value) {
      const ret = await confirm(
        '手动修改DSL有风险，可能导致页面无法加载，请确认您的操作无误。'
      );
      if (ret) {
        try {
          const schema = JSON.parse(value);
          current.value?.update(schema);
          message('保存成功');
        } catch (e: any) {
          notify(e?.message);
        }
      }
    }
  };

  defineOptions({
    name: 'SchemaWidget'
  });
</script>
