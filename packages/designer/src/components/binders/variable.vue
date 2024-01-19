<template>
  <Binder
    title="绑定变量"
    unbind-enabled
    :block="props.current"
    :context="props.context"
    :model="model"
    @pick="onPick">
    <XField name="value" label="绑定内容 [ JSExpression ]" required>
      <template #editor>
        <Editor
          ref="editorRef"
          v-model="model.value"
          dark
          height="450px"></Editor>
      </template>
    </XField>
  </Binder>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { XField } from '@vtj/ui';
  import { type Context } from '@vtj/renderer';
  import { BlockModel } from '@vtj/core';
  import { Binder } from '../shared';
  import Editor from '../editor';

  export interface Props {
    context: Context | null;
    current: BlockModel | null;
    value?: string;
  }

  const props = defineProps<Props>();
  const editorRef = ref();
  const model = reactive({
    type: 'JSExpression',
    value: props.value
  });

  const onPick = (name: string) => {
    const editor = editorRef.value.getEditor();
    editor.setValue(name);
    model.value = name;
  };

  defineOptions({
    name: 'VariableBinder'
  });
</script>
