<template>
  <Panel
    class="v-raw-widget"
    :title="title"
    :subtitle="subtitle"
    size="small"
    fit>
    <Editor
      ref="editorRef"
      :model-value="content"
      height="100%"
      lang="html"
      dark
      readonly></Editor>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import { Panel } from '../../shared';
  import Editor from '../../editor';
  import { useCurrent } from '../../hooks';

  const { current, engine } = useCurrent();
  const editorRef = ref();
  const content = ref('');
  const subtitle = computed(() => {
    return current.value ? `$vtj/raw/${current.value.id}.vue` : '';
  });
  const title = computed(() => {
    return current.value ? current.value.name : '';
  });

  watch(
    current,
    async (v) => {
      const project = engine.project.value;
      if (project && v) {
        content.value = await engine.service.getRaw(project.toDsl(), v.toDsl());
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
    name: 'SchemaWidget'
  });
</script>
