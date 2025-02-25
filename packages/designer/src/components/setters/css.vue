<template>
  <div class="v-json-setter v-css-setter" :class="{ 'is-active': isActive }">
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
        lang="css"
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
  import { ElInput, ElButton } from 'element-plus';
  import Editor from '../editor';

  export interface Props {
    modelValue?: any;
    type?: 'CSS';
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    type: 'CSS'
  });

  const codeEditor = ref();

  const textValue = ref(props.modelValue);

  const isActive = computed(() => !!textValue.value);

  const dialogVisible = ref(false);
  const emit = defineEmits(['change']);

  const validate = (_value: string) => {
    return true;
  };

  const handleSubmit = () => {
    const editor = codeEditor.value?.getEditor();
    if (editor) {
      const content = editor.getValue();
      if (validate(content)) {
        textValue.value = content;
        emit('change', content);
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
    name: 'cssSetter'
  });
</script>
