<template>
  <Panel
    class="v-raw-widget"
    :title="title"
    :subtitle="subtitle"
    size="small"
    fit
    save
    @save="onSave">
    <Editor
      ref="editorRef"
      :model-value="content"
      height="100%"
      lang="html"
      dark></Editor>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import { Panel } from '../../shared';
  import Editor from '../../editor';
  import { useCurrent } from '../../hooks';
  import { confirm, message, notify } from '../../../utils';

  const { current, engine } = useCurrent();
  const editorRef = ref();
  const content = ref('');
  const subtitle = computed(() => {
    return current.value ? `$vtj/vue/${current.value.id}.vue` : '';
  });
  const title = computed(() => {
    return current.value ? current.value.name : '';
  });

  const onSave = async () => {
    const editor = editorRef.value?.getEditor();
    const value = editor.getValue();
    if (value) {
      const ret = await confirm(
        '手动修改源码有风险，可能导致页面无法加载，请确认您的操作无误。'
      );
      const project = engine.project.value?.toDsl();
      if (ret && current.value && project) {
        const { id, name } = current.value;
        const schema = await engine.service
          .parseVue(project, {
            id,
            name,
            source: value
          })
          .catch((e) => {
            notify(e?.message);
            return null;
          });
        if (schema) {
          if (Array.isArray(schema)) {
            notify(schema.join(','), '提示');
          } else {
            current.value?.update(schema);
            message('保存成功');
          }
        }
      }
    }
  };

  watch(
    current,
    async (v) => {
      const project = engine.project.value;
      if (project && v) {
        content.value = await engine.service.genVueContent(
          project.toDsl(),
          v.toDsl()
        );
      } else {
        content.value = '';
      }
    },
    {
      immediate: true,
      deep: true
    }
  );

  defineOptions({
    name: 'RawWidget'
  });
</script>
