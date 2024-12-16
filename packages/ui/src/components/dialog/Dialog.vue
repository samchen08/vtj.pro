<template>
  <Teleport v-if="props.modelValue" to="body">
    <div
      ref="wrapper"
      class="x-dialog__wrapper"
      :class="wrapperClass"
      :style="zIndexStyle">
      <div v-if="props.modal" class="x-dialog__modal" :style="modalStyle"></div>
      <XPanel
        ref="panelRef"
        class="x-dialog"
        card
        shadow="always"
        :header="{ icon: props.icon, subtitle: props.subtitle }"
        width="800px"
        height="600px"
        :footer="{ justify: 'space-between', flex: true, align: 'center' }"
        :class="classes"
        :style="styles"
        :size="props.size"
        :body="{ padding: props.bodyPadding }"
        v-draggable="draggable"
        v-resizable="resizable"
        @click="active"
        v-bind="$attrs">
        <template #title>{{ props.title }}</template>
        <template #actions>
          <slot name="actions"></slot>
          <XAction
            v-if="props.minimizable"
            :icon="Minimize"
            :size="props.size"
            mode="icon"
            type="primary"
            background="hover"
            @click="changeMode('minimized')"></XAction>
          <template v-if="props.maximizable">
            <XAction
              v-if="!normal"
              :icon="Popup"
              :size="props.size"
              mode="icon"
              type="primary"
              background="hover"
              @click="changeMode('normal')"></XAction>
            <XAction
              v-else
              :icon="Maximize"
              :size="props.size"
              mode="icon"
              type="primary"
              background="hover"
              @click="changeMode('maximized')"></XAction>
          </template>
          <XAction
            v-if="props.closable"
            :icon="RawClose"
            :size="props.size"
            mode="icon"
            type="danger"
            background="hover"
            @click="close"></XAction>
        </template>
        <slot>
          <component v-if="props.content" :is="props.content"></component>
          <iframe
            v-if="props.src"
            :src="props.src"
            class="x-dialog__frame"></iframe>
        </slot>
        <template
          v-if="
            props.cancel ||
            props.submit ||
            $slots.footer ||
            $slots.extra ||
            $slots.handle
          "
          #footer>
          <slot name="footer">
            <XContainer align="center">
              <slot name="extra"></slot>
            </XContainer>
            <XContainer align="center">
              <slot name="handle"></slot>
              <ElButton
                v-if="props.cancel"
                type="default"
                :size="props.size"
                @click="cancel">
                {{ typeof props.cancel === 'string' ? props.cancel : '取消' }}
              </ElButton>
              <ElButton
                v-if="props.submit"
                type="primary"
                :size="props.size"
                @click="submit">
                {{ typeof props.submit === 'string' ? props.submit : '确定' }}
              </ElButton>
            </XContainer>
          </slot>
        </template>
      </XPanel>
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
  import {
    // @ts-ignore
    Teleport,
    ref,
    watchEffect,
    nextTick,
    getCurrentInstance,
    computed,
    onUnmounted
  } from 'vue';
  import { RawClose, Popup, Maximize, Minimize } from '@vtj/icons';
  import { ElButton } from 'element-plus';
  import { XPanel, XAction, XContainer } from '../';
  import { vDraggable, vResizable } from '../../directives';
  import { dialogProps, type DialogEmits } from './types';
  import {
    useState,
    useStyle,
    useMethods,
    useDraggableOptions,
    useResizableOptions,
    useComponentInstance
  } from './hooks';

  defineOptions({
    name: 'XDialog'
  });

  const props = defineProps(dialogProps);
  const emit = defineEmits<DialogEmits>();
  const instance = getCurrentInstance();
  const wrapper = ref();
  const panelRef = ref();
  const { state, maximized, minimized, normal } = useState(props, wrapper);
  const { styles, classes, wrapperClass, modalStyle, zIndexStyle } = useStyle(
    props,
    state
  );
  const { changeMode, active, close, show, hide, submit, cancel } = useMethods(
    props,
    state,
    emit
  );
  const draggable = useDraggableOptions(props, state, emit, wrapper);
  const resizable = useResizableOptions(props, state, emit);
  const componentInstance = useComponentInstance(props, panelRef);

  watchEffect(async () => {
    if (props.modelValue) {
      await nextTick();
      if (instance) {
        emit('open', instance);
        document.body.classList.add('x-dialog-visible');
      }
    } else {
      document.body.classList.remove('x-dialog-visible');
    }
  });

  onUnmounted(() => {
    document.body.classList.remove('x-dialog-visible');
  });

  const $vtjEl = computed(() => panelRef.value?.$el);

  defineExpose({
    $vtjEl,
    panelRef,
    state,
    maximized,
    minimized,
    changeMode,
    show,
    hide,
    submit,
    cancel,
    close,
    componentInstance
  });
</script>
