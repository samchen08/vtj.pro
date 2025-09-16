import { delay } from '@vtj/utils';
import { watch, shallowRef, onUnmounted } from 'vue';
import { isNode, NodeModel } from '@vtj/core';
import hotkeys from 'hotkeys-js';
import { useEngine } from '../../framework';

// 保存
export const SAVE_KEYS = 'ctrl+s, command+s';

// 预览
export const PREVIEW_KEYS = 'ctrl+p, command+p';

// 撤销
export const UNDO_KEYS = 'ctrl+z, command+z';

// 重做
export const REDO_KEYS = 'shift+ctrl+z, shift+command+z';

// 退格删除
export const BACKSPACE_KEYS = 'backspace';

// 复制节点
export const COPY_KEYS = 'ctrl+c, command+c';

// 粘贴节点
export const PASTE_KEYS = 'ctrl+v, command+v';

// 剪切节点
export const CUT_KEYS = 'ctrl+x, command+x';

// 向外层选择组件
export const UP_KEYS = 'up';

// 向内层选择组件
export const DOWN_KEYS = 'down';

// 同级向左选择组件
export const LEFT_KEYS = 'left';

// 同级向右选择组件
export const RIGHT_KEYS = 'right';

// 向前移动组件
export const MOVE_PREV_KEYS = 'option+up, alt+up, option+left, alt+left';

// 向后移动组件
export const MOVE_NEXT_KEYS = 'option+down, alt+down, option+right, alt+right';

// 取消选择
export const ESCAPE_KEYS = 'escape';

export function useHotkeys() {
  const engine = useEngine();

  const _map: Record<string, any> = {};
  const _hotkeys = shallowRef<any>(null);

  const init = async () => {
    await delay(100);
    _hotkeys.value = engine.simulator.contentWindow?.hotkeys;
  };

  const bind = (key: string, handler: (...args: any[]) => any) => {
    _map[key] = handler;
    if (_hotkeys.value) {
      _hotkeys.value(key, handler);
      hotkeys(key, handler);
    }
  };

  const unbind = (key: string) => {
    delete _map[key];
    if (_hotkeys.value) {
      _hotkeys.value.unbind(key);
      hotkeys.unbind(key);
    }
  };

  const clear = () => {
    Object.keys(_map).forEach((key) => {
      unbind(key);
    });
  };

  const getSelected = () => {
    const designer = engine.simulator.designer.value;
    const selected = designer?.selected?.value;
    const current = engine.current.value;

    return {
      selected,
      current,
      designer
    };
  };

  engine.simulator.ready(init);

  watch(
    _hotkeys,
    (v) => {
      if (!v) return;
      for (const [key, handler] of Object.entries(_map)) {
        bind(key, handler);
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    clear();
    _hotkeys.value = null;
  });

  bind(UNDO_KEYS, () => {
    engine.history.value?.backward();
  });

  bind(REDO_KEYS, () => {
    engine.history.value?.forward();
  });

  bind(SAVE_KEYS, async (e: KeyboardEvent) => {
    e.preventDefault();
    const regionRef = engine.skeleton?.getRegion('Apps').regionRef;
    if (regionRef) {
      regionRef.setActive('History');
      await delay(100);
      const widgetRef = engine.skeleton?.getWidget('History')?.widgetRef;
      if (widgetRef) {
        widgetRef.openAdd();
      }
    }
    return false;
  });

  bind(PREVIEW_KEYS, (e: KeyboardEvent) => {
    e.preventDefault();
    const widgetRef = engine.skeleton?.getWidget('Actions')?.widgetRef;
    if (widgetRef) {
      widgetRef.preview();
    }
    return false;
  });

  bind(BACKSPACE_KEYS, () => {
    const { current, selected, designer } = getSelected();
    if (designer && current && selected && isNode(selected.model)) {
      current.removeNode(selected.model);
      designer.setSelected(null);
    }
  });

  bind(ESCAPE_KEYS, () => {
    const { current, selected, designer } = getSelected();
    if (current && selected && designer) {
      designer.setSelected(null);
    }
  });

  bind(LEFT_KEYS, () => {
    const { current, selected, designer } = getSelected();
    if (designer && current && selected && isNode(selected.model)) {
      const children = (selected.model.parent?.children || []) as NodeModel[];
      const index = children.findIndex((n) => n.id === selected.model.id);
      if (index > 0) {
        designer.setSelected(children[index - 1]);
      }
    }
  });

  bind(RIGHT_KEYS, () => {
    const { current, selected, designer } = getSelected();
    if (designer && current && selected && isNode(selected.model)) {
      const children = (selected.model.parent?.children || []) as NodeModel[];
      const index = children.findIndex((n) => n.id === selected.model.id);
      if (index < children.length - 1) {
        designer.setSelected(children[index + 1]);
      }
    }
  });

  bind(UP_KEYS, () => {
    const { current, selected, designer } = getSelected();
    if (
      designer &&
      current &&
      selected &&
      isNode(selected.model) &&
      selected.model.parent
    ) {
      designer.setSelected(selected.model.parent);
    }
  });

  bind(DOWN_KEYS, () => {
    const { current, selected, designer } = getSelected();
    if (designer && current && selected) {
      let child: NodeModel | null = null;
      if (isNode(selected.model)) {
        child = Array.isArray(selected.model.children)
          ? selected.model.children[0]
          : null;
      } else {
        child = selected.model.nodes[0];
      }
      if (child) {
        designer.setSelected(child);
      }
    }
  });

  return {
    bind,
    unbind,
    hotkeys,
    _hotkeys
  };
}
