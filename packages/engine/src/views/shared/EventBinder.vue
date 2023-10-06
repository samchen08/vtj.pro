<template>
  <Binder
    ref="binderRef"
    title="事件绑定"
    :subtitle="props.name"
    @submit="onSubmit"
    @pick="onPick"
    @remove="onRemove">
    <ElForm class="vtj-event-binder" label-position="top">
      <ElFormItem label="事件修饰符">
        <ElCheckboxGroup v-model="modifiers">
          <ElCheckbox
            v-for="item in EVENT_MODIFIERS"
            :key="item"
            :label="item"></ElCheckbox>
        </ElCheckboxGroup>
      </ElFormItem>
      <ElFormItem label="事件处理函数">
        <CodeEditor
          ref="editorRef"
          width="100%"
          height="360px"
          dark
          :model-value="codeContent"></CodeEditor>
      </ElFormItem>
    </ElForm>
  </Binder>
</template>
<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import Binder from './Binder.vue';
  import CodeEditor from '../../editor';
  import { Node } from '../../models';
  import {
    ElForm,
    ElFormItem,
    ElNotification,
    ElCheckboxGroup,
    ElCheckbox
  } from 'element-plus';
  import { expressionValidate } from '../../utils';
  import { NodeEventSchema, ComponentEvent } from '../../core';
  import { useCore } from '../../hooks';
  import { EVENT_MODIFIERS } from '../../constants';

  export interface Props {
    name?: string;
    event?: NodeEventSchema;
    node?: Node;
  }

  const { assets, project } = useCore();

  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits(['submit', 'remove']);

  const editorRef = ref();
  const binderRef = ref();
  const modifiers = ref<string[]>(Object.keys(props.event?.modifiers || {}));

  const eventParams = computed(() => {
    const nodeName = props.node?.name;
    if (!nodeName) return [];
    const desc = assets.componentMap[nodeName as string];
    if (desc && desc.events) {
      const item = desc.events.find(
        (n) => n === props.name || (n as ComponentEvent).name === props.name
      );
      if (item && (item as ComponentEvent).params) {
        return (item as ComponentEvent).params || [];
      }
    }
    return [];
  });

  const codeContent = ref(
    props.event?.handler?.value ||
      `(${eventParams.value.join(', ')}) => {\r\n\r\n}`
  );

  const validate = (value: string) => {
    const context = project.current.value?.runtimeContext;
    return expressionValidate({ value, type: 'JSFunction' }, context);
  };

  const onSubmit = () => {
    const value = editorRef.value.getEditor().getValue().trim();
    if (value) {
      if (validate(value)) {
        const event: NodeEventSchema = {
          handler: {
            type: 'JSFunction',
            value: value
          },
          modifiers: modifiers.value.reduce(
            (prev, cur) => {
              prev[cur] = true;
              return prev;
            },
            {} as Record<string, boolean>
          )
        };
        emit('submit', event);
        binderRef.value.close();
      }
    } else {
      ElNotification.warning({
        message: '请输入绑定内容'
      });
    }
  };

  const onPick = (item: string) => {
    const editor = editorRef.value?.getEditor();
    if (editor) {
      codeContent.value = item;
    }
  };

  const onRemove = () => {
    emit('remove', props.name);
  };
</script>
<style lang="scss">
  .vtj-var-binder {
    height: 100%;
    .el-form-item {
      height: 100%;
    }
    .el-form-item__content {
      height: calc(100% - 30px);
    }
  }
</style>
