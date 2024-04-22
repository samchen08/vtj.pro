<template>
  <div class="v-json-setter" :class="{ 'is-active': isActive }">
    <ElInput
      readonly
      @focus="openDialog"
      :model-value="props.type"
      :suffix-icon="MoreFilled"
      v-bind="$attrs">
    </ElInput>
    <XDialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      :title="props.type"
      width="1000px"
      height="600px"
      cancel
      submit
      clear
      @submit="handleSubmit"
      @clear="handleClear">
      <Editor
        ref="codeEditor"
        height="100%"
        lang="json"
        dark
        :model-value="textValue"></Editor>
      <template #extra>
        <ElButton type="warning" @click="handleClear" size="default">
          清除
        </ElButton>
      </template>
    </XDialog>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { XDialog } from '@vtj/ui';
  import { MoreFilled } from '@vtj/icons';
  import { isPlainObject } from '@vtj/utils';
  import { ElInput, ElNotification, ElButton } from 'element-plus';
  import Editor from '../editor';

  export interface Props {
    modelValue?: any;
    type?: 'Array' | 'Object' | 'JSON';
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    type: 'JSON'
  });

  const codeEditor = ref();

  const textValue = ref(
    typeof props.modelValue === 'object'
      ? JSON.stringify(props.modelValue, null, 2)
      : undefined
  );

  const isActive = computed(() => !!textValue.value);

  const dialogVisible = ref(false);
  const emit = defineEmits(['change']);

  const validate = (value: string) => {
    let ret = true;
    try {
      const json = JSON.parse(value);
      if (props.type === 'Array' && !Array.isArray(json)) {
        throw new Error(`"${value}" is not a Array`);
      }

      if (props.type === 'Object' && !isPlainObject(json)) {
        throw new Error(`"${value}" is not a PlainObject`);
      }

      if (typeof json !== 'object') {
        throw new Error(`"${value}" is not a ${props.type}`);
      }
    } catch (e: any) {
      ret = false;
      ElNotification.error({
        title: '代码错误',
        message: e?.message || e
      });
    }
    return ret;
  };

  const handleSubmit = () => {
    const editor = codeEditor.value?.getEditor();
    if (editor) {
      const content = editor.getValue();
      if (validate(content)) {
        textValue.value = content;
        emit('change', JSON.parse(content));
        dialogVisible.value = false;
      }
    }
  };

  const handleClear = () => {
    textValue.value = '';
    emit('change', undefined);
    dialogVisible.value = false;
  };

  const openDialog = () => {
    dialogVisible.value = true;
  };

  defineOptions({
    name: 'JsonSetter'
  });
</script>
