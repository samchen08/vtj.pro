<template>
  <div
    class="v-code-editor"
    :class="{ 'is-border': props.border }"
    ref="container"
    @keyup.enter.stop
    :style="{ height: props.height }"></div>
</template>
<script lang="ts" setup>
  import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
  import { editor as monacoEditor } from 'monaco-editor';

  export interface Props {
    lang?: string;
    modelValue?: string;
    options?: monacoEditor.IEditorConstructionOptions;
    height?: string;
    readonly?: boolean;
    dark?: boolean;
    border?: boolean;
    minimap?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    height: '300px',
    lang: 'typescript',
    modelValue: '',
    readonly: false,
    dark: false,
    minimap: false,
    options: () => ({})
  });

  self.MonacoEnvironment = {
    createTrustedTypesPolicy: undefined as any,
    async getWorker(_, label) {
      let worker;
      if (label === 'json') {
        worker = await import(
          'monaco-editor/esm/vs/language/json/json.worker?worker&inline'
        );
      }
      if (['css', 'scss', 'less'].includes(label)) {
        worker = await import(
          'monaco-editor/esm/vs/language/css/css.worker?worker&inline'
        );
      }
      if (['html', 'handlebars', 'razor', 'vue'].includes(label)) {
        worker = await import(
          'monaco-editor/esm/vs/language/html/html.worker?worker&inline'
        );
      }
      if (['typescript', 'javascript'].includes(label)) {
        worker = await import(
          'monaco-editor/esm/vs/language/typescript/ts.worker?worker&inline'
        );
      }

      worker =
        worker ||
        (await import(
          'monaco-editor/esm/vs/editor/editor.worker?worker&inline'
        ));

      // return new Worker(worker as any);
      return new worker.default();
    }
  };

  const emit = defineEmits(['change', 'blur', 'update:modelValue']);

  const container = ref();
  let editor: monacoEditor.IStandaloneCodeEditor | null = null;

  const format = async () => {
    if (!editor) return;
    await editor.getAction('editor.action.formatDocument')?.run();
    editor.setValue(editor.getValue());
  };

  const handleBlur = async () => {
    await format();
    const content = editor?.getValue();
    emit('update:modelValue', content);
    emit('blur', content);
  };

  const createEditor = () => {
    editor = monacoEditor.create(container.value, {
      value: props.modelValue,
      language: props.lang,
      readOnly: props.readonly,
      theme: props.dark ? 'vs-dark' : 'vs',
      automaticLayout: true,
      minimap: { enabled: props.minimap },
      tabSize: 2,
      ...props.options
    });

    editor.onDidChangeModelContent((e) => {
      emit('change', editor?.getValue(), e);
    });

    editor.onDidBlurEditorText(handleBlur);
  };

  onMounted(() => {
    nextTick(createEditor);
  });

  onUnmounted(() => {
    if (editor) {
      editor.dispose();
    }
  });

  watch(
    () => props.modelValue,
    (value) => {
      if (editor) {
        editor.setValue(value);
      }
    }
  );

  const getEditor = () => {
    return editor;
  };

  defineExpose({ getEditor });
</script>
