import { Directive, watch, effectScope, EffectScope, ref, Ref } from 'vue';
import { isEqual } from '@vtj/utils';
import { useEventListener, useMouseInElement, Fn } from '@vueuse/core';

declare global {
  interface HTMLElement {
    __resizable__?: Resizable | null;
  }
}

const BODY_CLASS = 'user-select-none';

export type UseMouseInElementReturn = ReturnType<typeof useMouseInElement>;
export type ResizableDir = 'n' | 's' | 'w' | 'e';

export interface ResizableOptions {
  disabled?: boolean;
  edge?: number;
  dirs?: ResizableDir[];
  onStart?: (dir: string, mie: UseMouseInElementReturn) => void;
  onEnd?: (dir: string, mie: UseMouseInElementReturn) => void;
  onResizing?: (dir: string, mie: UseMouseInElementReturn) => void;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export class Resizable {
  private scope: EffectScope;
  public resizing: Ref<boolean> = ref(false);
  public direction: Ref<string> = ref('');
  public MIE: UseMouseInElementReturn | null = null;
  public cleanMousedown?: Fn;
  public cleanMouseup?: Fn;
  constructor(public el: HTMLElement, public options: ResizableOptions = {}) {
    this.scope = effectScope();
    this.scope.run(() => {
      this.init();
    });
  }
  init() {
    const { el, options } = this;
    const { disabled, onStart, onEnd } = options;
    if (disabled) return;
    this.MIE = useMouseInElement(el);
    this.cleanMousedown = useEventListener(document, 'mousedown', () => {
      if (this.direction?.value && this.MIE) {
        this.resizing.value = true;
        el.classList.add('is-resizing', `is-${this.direction.value}-resizing`);
        onStart && onStart(this.direction.value, this.MIE);
      }
    });

    this.cleanMouseup = useEventListener(document, 'mouseup', () => {
      if (this.resizing.value && this.direction?.value && this.MIE) {
        el.classList.remove(
          'is-resizing',
          `is-${this.direction.value}-resizing`
        );
        onEnd && onEnd(this.direction.value, this.MIE);
      }
      this.resizing.value = false;
    });

    watch(this.direction, (v) => {
      const body = document.body;
      body.style.cursor = v ? `${v}-resize` : '';
      if (v) {
        body.classList.add(BODY_CLASS);
      } else {
        body.classList.remove(BODY_CLASS);
      }
    });

    const { x, y } = this.MIE;

    watch([x, y], () => {
      if (this.resizing.value) {
        this.resize();
      } else {
        this.direction.value = this.getDirection();
      }
    });
  }
  resize() {
    const { MIE, direction, resizing, options, el } = this;
    const dir = direction?.value || '';
    if (!MIE || !resizing.value || !dir) return;
    const { x, y, elementX, elementY, elementHeight, elementWidth } = MIE;
    const { onResizing } = options;
    const {
      minWidth = 0,
      minHeight = 0,
      maxWidth = 99999,
      maxHeight = 99999
    } = options;
    if (dir.includes('e')) {
      const width = Math.min(Math.max(elementX.value, minWidth), maxWidth);
      el.style.width = `${width}px`;
    }

    if (dir.includes('s')) {
      const height = Math.min(Math.max(elementY.value, minHeight), maxHeight);
      el.style.height = `${height}px`;
    }

    if (dir.includes('w')) {
      const width = Math.min(
        Math.max(elementWidth.value - elementX.value, minWidth),
        maxWidth
      );
      el.style.width = `${width}px`;
      el.style.left = `${x.value}px`;
    }

    if (dir.includes('n')) {
      const height = Math.min(
        Math.max(elementHeight.value - elementY.value, minHeight),
        maxHeight
      );
      this.el.style.height = `${height}px`;
      this.el.style.top = `${y.value}px`;
    }
    onResizing && onResizing(dir, MIE);
  }
  getDirection() {
    if (!this.MIE) return '';
    const { elementX, elementY, elementHeight, elementWidth, isOutside } =
      this.MIE;
    if (isOutside.value) return '';
    const { dirs = ['n', 's', 'w', 'e'], edge = 5 } = this.options;
    let dir = '';
    if (dirs.includes('n') && elementY.value <= edge) {
      dir += 'n';
    } else if (
      dirs.includes('s') &&
      elementY.value > elementHeight.value - edge
    ) {
      dir += 's';
    }
    if (dirs.includes('w') && elementX.value <= edge) {
      dir += 'w';
    } else if (
      dirs.includes('e') &&
      elementX.value > elementWidth.value - edge
    ) {
      dir += 'e';
    }
    return dir;
  }
  destory() {
    const body = document.body;
    body.style.cursor = '';
    body.classList.remove(BODY_CLASS);
    this.cleanMousedown && this.cleanMousedown();
    this.cleanMouseup && this.cleanMouseup();
    this.MIE?.stop();
    this.scope.stop();
  }
}

export const vResizable: Directive<HTMLElement, ResizableOptions> = {
  mounted(el, binding) {
    const options = binding.value || {};
    const resizable = new Resizable(el, options);
    el.__resizable__ = resizable;
  },
  updated(el, binding) {
    const options = binding.value || {};
    let resizable = el.__resizable__;
    if (resizable && !isEqual(resizable.options, options)) {
      resizable.destory();
      el.__resizable__ = new Resizable(el, options);
    }
  },
  unmounted(el) {
    const resizable = el.__resizable__;
    if (resizable) {
      resizable.destory();
      el.__resizable__ = null;
    }
  }
};
