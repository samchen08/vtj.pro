<template>
  <teleport v-if="props.modelValue" to="body">
    <div class="vtj-dialog__modal" @mousemove.stop></div>
    <Panel
      ref="panelRef"
      @mousemove.stop
      class="vtj-dialog"
      v-bind="$attrs"
      :tools="tools"
      :style="styles"
      draggable
      @tool-click="handleToolClick">
      <slot></slot>
      <template v-if="$slots.footer || cancel || submit || clear" #footer>
        <slot name="footer">
          <div>
            <slot name="action"></slot>
            <ElButton
              v-if="clear"
              type="warning"
              size="default"
              class="vtj-dialog__clear"
              @click="handleClear">
              清除绑定
            </ElButton>
          </div>
          <div>
            <ElButton v-if="cancel" @click="handleCancel" size="default">
              取消
            </ElButton>
            <ElButton
              v-if="submit"
              type="primary"
              @click="handleSubmit"
              size="default">
              确定
            </ElButton>
          </div>
        </slot>
      </template>
    </Panel>
  </teleport>
</template>
<script lang="ts" setup>
  import { computed, useAttrs, ref } from 'vue';
  import Panel from './Panel.vue';
  import { PanelProps, ToolItem } from './types';
  import { ElButton } from 'element-plus';
  import { useDialog } from '../../hooks';

  export interface Props extends /* @vue-ignore */ PanelProps {
    modelValue?: boolean;
    modal?: boolean;
    width?: string;
    height?: string;
    top?: string;
    cancel?: boolean;
    submit?: boolean;
    clear?: boolean;
    closable?: boolean;
  }

  const attrs = useAttrs();

  const props = withDefaults(defineProps<Props>(), {
    modelValue: true,
    modal: true,
    width: '80%',
    heiht: 'auto',
    top: '40%',
    cancel: false,
    submit: false,
    clear: false,
    closable: true
  });
  const panelRef = ref();

  // const panel = computed(() => unref(panelRef.value?.panel));

  const tools = computed(() => {
    const toolBtns = [...((attrs.tools || []) as ToolItem[])];
    if (props.closable) {
      toolBtns.push({ name: 'close', icon: 'vtj-icon-close' });
    }
    return toolBtns;
  });

  const emit = defineEmits(['close', 'update:modelValue', 'submit', 'clear']);

  const { x, y } = useDialog(panelRef);

  const styles = computed(() => {
    return {
      width: props.width,
      height: props.height,
      left: `${x.value}px`,
      top: `${y.value}px`
    };
  });

  const handleToolClick = (item: ToolItem) => {
    if (item.name === 'close') {
      emit('update:modelValue', false);
      emit('close');
    }
  };

  function handleCancel() {
    emit('update:modelValue', false);
    emit('close');
  }

  function handleSubmit() {
    emit('submit');
  }

  function handleClear() {
    emit('clear');
  }

  defineExpose({
    close: handleCancel
  });
</script>

<style lang="scss">
  @use '../../style/vars' as *;
  .vtj-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1000;
    width: 500px;
    height: auto;
    background-color: $vtj-background-color;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    border-radius: 2px;

    &__modal {
      background-color: rgba(0, 0, 0, 0.2);
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .vtj-panel__header-wrapper {
      background-color: $vtj-color-light-9;
      // cursor: move;
      user-select: none;
    }
    .vtj-panel__body {
      height: 100%;
    }
    .vtj-panel__footer {
      justify-content: space-between;
    }
  }
  .vtj-dialog__clear {
    float: left;
  }
</style>
