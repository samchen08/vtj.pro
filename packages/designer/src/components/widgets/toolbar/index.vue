<template>
  <div class="v-toolbar-widget">
    <ElRadioGroup size="small" v-model="mode">
      <ElRadioButton label="pc" value="pc">
        <VtjIconPc></VtjIconPc>
      </ElRadioButton>
      <ElRadioButton label="mobile" value="mobile">
        <VtjIconPhone></VtjIconPhone>
      </ElRadioButton>
      <ElRadioButton label="pad" value="pad">
        <VtjIconPad></VtjIconPad>
      </ElRadioButton>
      <ElRadioButton label="custom" value="custom">
        <VtjIconEdit></VtjIconEdit>
      </ElRadioButton>
    </ElRadioGroup>

    <ScreenSize v-if="mode === 'custom'" v-model="customSize"></ScreenSize>

    <ElInput v-if="false" class="v-toolbar-widget__zoomer" size="small">
      <template #prepend>
        <ElButton :icon="ZoomOut"></ElButton>
      </template>
      <template #append>
        <ElButton :icon="ZoomIn"></ElButton>
      </template>
    </ElInput>

    <ElButtonGroup>
      <ElButton
        type="default"
        size="small"
        @click="backward"
        :disabled="backwardDisabled || !!props.preview">
        <VtjIconUndo></VtjIconUndo>
      </ElButton>
      <ElButton
        type="default"
        size="small"
        @click="forward"
        :disabled="forwardDisabled || !!props.preview">
        <VtjIconRedo></VtjIconRedo>
      </ElButton>
    </ElButtonGroup>
    <ElDivider direction="vertical"></ElDivider>
    <ElSwitch
      class="v-toolbar-widget__outline"
      size="default"
      inline-prompt
      active-text="辅助线"
      inactive-text="辅助线"
      :disabled="!!props.preview"
      v-model="outline"></ElSwitch>
    <ElSwitch
      class="v-toolbar-widget__active-event"
      size="default"
      inline-prompt
      active-text="响应事件"
      inactive-text="响应事件"
      :disabled="!!props.preview"
      v-model="activeEvent"></ElSwitch>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import ScreenSize from './ScreenSize.vue';
  import {
    ElButtonGroup,
    ElButton,
    ElRadioGroup,
    ElRadioButton,
    ElInput,
    ElSwitch,
    ElDivider
  } from 'element-plus';
  import {
    ZoomIn,
    ZoomOut,
    VtjIconPc,
    VtjIconPad,
    VtjIconPhone,
    VtjIconUndo,
    VtjIconRedo,
    VtjIconEdit
  } from '@vtj/icons';
  import { useHistory } from '../../hooks';

  export interface Props {
    preview?: boolean;
  }

  const props = defineProps<Props>();

  const { forward, backward, forwardDisabled, backwardDisabled, engine } =
    useHistory();
  const isWebPlatform = computed(() => {
    const { platform = 'web' } = engine.project.value || {};
    return platform === 'web';
  });
  const mode = ref('pc');
  const outline = ref(true);
  const activeEvent = ref(true);

  const customSize = ref({
    width: 1920,
    height: 1080
  });

  watch(
    isWebPlatform,
    (v) => {
      mode.value = v ? 'pc' : 'mobile';
    },
    {
      immediate: true
    }
  );
  defineOptions({
    name: 'ToolbarWidget',
    inheritAttrs: false
  });

  defineExpose({
    mode,
    outline,
    customSize,
    activeEvent
  });
</script>
