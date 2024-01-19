<template>
  <Binder
    title="绑定事件"
    unbind-enabled
    :block="props.current"
    :context="props.context"
    :model="model"
    @pick="onPick">
    <XField
      name="modifiers"
      label="事件修饰符"
      editor="checkbox"
      :options="modifiers">
    </XField>
    <XField name="handler.value" label="事件处理函数 [ JSFunction ]" required>
      <template #editor>
        <Editor
          ref="editorRef"
          v-model="model.handler.value"
          dark
          height="350px"></Editor>
      </template>
    </XField>
  </Binder>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { XField } from '@vtj/ui';
  import { type Context } from '@vtj/renderer';
  import { BlockModel, type NodeEvent } from '@vtj/core';
  import { Binder } from '../shared';
  import Editor from '../editor';
  import { EVENT_MODIFIERS } from '../../constants';

  export interface Props {
    context: Context | null;
    current: BlockModel | null;
    name: string;
    event?: NodeEvent;
  }

  const props = defineProps<Props>();
  const editorRef = ref();

  const createModel = () => {
    return {
      name: props.name,
      ...props.event,
      modifiers: Object.keys(props.event?.modifiers || {}),
      handler: {
        type: 'JSFunction',
        value: props.event?.handler?.value || '() => {}'
      }
    };
  };

  const model = reactive(createModel());

  const modifiers = EVENT_MODIFIERS.map((item) => {
    return {
      label: item,
      value: item
    };
  });

  const onPick = (name: string) => {
    const editor = editorRef.value.getEditor();
    editor.setValue(name);
    model.handler.value = name;
  };

  defineOptions({
    name: 'EventBinder'
  });
</script>
