import {
  reactive,
  watch,
  type MaybeRef,
  computed,
  onMounted,
  onUnmounted,
  unref
} from 'vue';
import { useElementSize, type Position } from '@vueuse/core';
import type {
  DialogProps,
  DialogState,
  DialogMode,
  DialogEmits
} from './types';
import type { Emits } from '../';
import type { DraggableOptions, ResizableOptions } from '../../directives';
import { parseSize } from '../../utils';
import { isObject } from '@vtj/utils';

let __global_ZIndex__ = 1000;

export function useState(props: DialogProps, wrapper: MaybeRef<HTMLElement>) {
  const { width, height } = useElementSize(wrapper);
  const state = reactive<DialogState>({
    mode: props.mode || 'normal',
    wrapperWidth: 0,
    wrapperHeight: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    zIndex: ++__global_ZIndex__,
    dragging: false,
    resizing: false
  });

  watch([width, height], ([w, h]) => {
    state.wrapperWidth = w;
    state.wrapperHeight = h;
    state.width = parseSize(props.width, w);
    state.height = parseSize(props.height, h);
    state.left = props.left
      ? parseSize(props.left, w) - state.width / 2
      : Math.max(Math.floor((w - state.width) / 2), 0);
    state.top = props.top
      ? parseSize(props.top, h)
      : Math.max(Math.floor((h - state.height) / 2), 0);
  });

  watch(state, (v) => {
    __global_ZIndex__ = Math.max(v.zIndex, __global_ZIndex__);
  });

  return {
    state,
    normal: computed(() => state.mode === 'normal'),
    maximized: computed(() => state.mode === 'maximized'),
    minimized: computed(() => state.mode === 'minimized')
  };
}

export function useStyle(props: DialogProps, state: DialogState) {
  const styles = computed(() => {
    const { width, height, top, left, zIndex } = state;
    return {
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
      zIndex
    };
  });

  const zIndexStyle = computed(() => {
    const { zIndex } = state;
    return {
      zIndex
    };
  });

  const classes = computed(() => {
    return {
      [`is-${state.mode}`]: !!state.mode,
      [`is-draggable`]: !!props.draggable,
      [`is-resizable`]: !!props.resizable,
      'is-primary': !!props.primary,
      'is-pure': !!props.pure
    };
  });

  const wrapperClass = computed(() => {
    return {
      [`is-${state.mode}`]: !!state.mode,
      'is-dragging': state.dragging,
      'is-resizing': state.resizing
    };
  });

  const modalStyle = computed(() => {
    return {
      zIndex: state.zIndex
    };
  });

  return {
    styles,
    classes,
    wrapperClass,
    modalStyle,
    zIndexStyle
  };
}

export function useMethods(
  props: DialogProps,
  state: DialogState,
  emit: Emits<DialogEmits>
) {
  const changeMode = (mode: DialogMode) => {
    state.mode = mode;
    if (['maximized', 'minimized', 'normal'].includes(mode)) {
      emit(mode as any);
    }
    emit('modeChange', mode);
  };

  const close = async () => {
    if (!props.beforeClose || (await props.beforeClose())) {
      emit('update:modelValue', false);
      emit('close');
      emit('destroy');
    }
  };

  const active = (e: any) => {
    const nodeName = e.target.nodeName || '';
    if (
      !['INPUT', 'TEXTAREA', 'RADIO', 'CHECKBOX'].includes(
        nodeName.toUpperCase()
      )
    ) {
      state.zIndex = Math.max(state.zIndex, ++__global_ZIndex__);
    }
  };

  const show = () => changeMode('normal');
  const hide = () => changeMode('minimized');
  const submit = () => emit('submit');
  const cancel = () => {
    emit('cancel');
    close();
  };
  return {
    close,
    changeMode,
    show,
    hide,
    active,
    submit,
    cancel
  };
}

export function useDraggableOptions(
  props: DialogProps,
  state: DialogState,
  emit: Emits<DialogEmits>,
  target: MaybeRef<HTMLElement>
) {
  return computed<DraggableOptions>(() => {
    const disabled =
      typeof props.draggable === 'boolean'
        ? !props.draggable
        : !!props.draggable?.disabled;
    return {
      ...(isObject(props.draggable) ? props.draggable : {}),
      disabled,
      target,
      selector: '.x-panel__header',
      onStart(position: Position) {
        state.dragging = true;
        state.zIndex = Math.max(state.zIndex, ++__global_ZIndex__);
        emit('dragStart', position);
      },
      onMove(position: Position) {
        emit('dragging', position);
      },
      onEnd(position: Position) {
        if (state.mode === 'maximized') return;
        const { x, y } = position;
        state.left = x;
        state.top = y;
        state.dragging = false;
        emit('dragEnd', position);
      }
    };
  });
}

export function useResizableOptions(
  props: DialogProps,
  state: DialogState,
  emit: Emits<DialogEmits>
) {
  return computed<ResizableOptions>(() => {
    const disabled =
      typeof props.resizable === 'boolean'
        ? !props.resizable
        : !!props.resizable?.disabled;
    return {
      minWidth: 200,
      minHeight: 150,
      ...(isObject(props.resizable) ? props.resizable : {}),
      disabled,
      dirs: ['e', 's', 'w'],
      onStart(dir, mie) {
        state.resizing = true;
        state.zIndex = Math.max(state.zIndex, ++__global_ZIndex__);
        emit('resizeStart', dir, mie);
      },
      onResizing(dir, mie) {
        emit('resizing', dir, mie);
      },
      onEnd(dir, mie) {
        const bodyRect = document.body.getBoundingClientRect();
        state.left = mie.elementPositionX.value - bodyRect.x;
        state.top = mie.elementPositionY.value - bodyRect.y;
        state.width = mie.elementWidth.value;
        state.height = mie.elementHeight.value;
        state.resizing = false;
        emit('resizeEnd', dir, mie);
      }
    };
  });
}

export function useComponentInstance(
  props: DialogProps,
  panelRef: MaybeRef<any>
) {
  const componentInstance = props.componentInstance;
  if (!componentInstance) return;
  let el: any = null;

  onMounted(() => {
    const panel = unref(panelRef);
    const body = unref(panel?.bodyRef);
    el = (componentInstance as any).$el;
    if (body && body.$el) {
      body.$el.appendChild(el);
    }
  });

  onUnmounted(() => {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });

  return {
    componentInstance
  };
}
