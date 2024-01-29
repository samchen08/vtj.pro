import {
  type Directive,
  watch,
  effectScope,
  type EffectScope,
  type MaybeRef,
  unref
} from 'vue';
import { useDraggable, type UseDraggableOptions } from '@vueuse/core';
import { isEqual } from '@vtj/utils';

declare global {
  interface HTMLElement {
    __draggable__?: Draggable | null;
  }
}

const BODY_CLASS = 'user-select-none';

export interface DraggableOptions extends UseDraggableOptions {
  /**
   * 限制在元素范围内拖拽
   */
  target?: MaybeRef<HTMLElement> | string;

  /**
   * 拖拽 handle 选择器
   */
  selector?: string;

  /**
   *  禁用
   */
  disabled?: boolean;

  /**
   * 延时
   */
  delay?: number;

  /**
   * 目标边缘距离
   */
  edge?: number;
}

export class Draggable {
  private scope: EffectScope;
  public dragging: boolean = false;
  constructor(
    public el: HTMLElement,
    public options: DraggableOptions = {}
  ) {
    this.scope = effectScope();
    this.scope.run(() => {
      this.init();
    });
  }
  private getHandle(): any {
    const { selector, handle } = this.options;
    return selector ? this.el.querySelector(selector) : handle;
  }
  private getTarget() {
    const { target = 'body' } = this.options;
    return typeof target === 'string'
      ? document.querySelector(target)
      : unref(target) || document.body;
  }
  init() {
    const { el, options } = this;
    const { disabled, delay = 150, onStart, onEnd } = options;
    if (disabled) return;
    let timer: any = null;

    const handle = this.getHandle();
    const target = this.getTarget();

    let rect = el.getBoundingClientRect();
    let targetRect: DOMRect | null = null;
    const { x, y } = useDraggable(el, {
      initialValue: { x: rect.x, y: rect.y },
      ...options,
      handle,
      onStart: (position, e) => {
        document.body.classList.add(BODY_CLASS);
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.dragging = true;
          rect = el.getBoundingClientRect();
          targetRect = target?.getBoundingClientRect() as DOMRect;
          onStart && onStart(position, e);
        }, delay);
      },
      onEnd: (position, e) => {
        clearTimeout(timer);
        document.body.classList.remove(BODY_CLASS);
        if (this.dragging && targetRect) {
          this.dragging = false;
          const { x, y } = position;
          const endPostion = this.getPosition(targetRect, rect, x, y);
          onEnd && onEnd(endPostion, e);
          targetRect = null;
        }
      }
    });

    watch([x, y], () => {
      if (this.dragging && targetRect) {
        const position = this.getPosition(targetRect, rect, x.value, y.value);
        el.style.left = `${position.x}px`;
        el.style.top = `${position.y}px`;
      }
    });
  }
  getPosition(targetRect: DOMRect, rect: DOMRect, x: number, y: number) {
    const { edge = 50 } = this.options;
    const xMin = -rect.width + edge;
    const xMax = targetRect.width - edge;
    const yMin = 0;
    const yMax = targetRect.height - edge;

    const left = Math.min(xMax, Math.max(x, xMin));
    const top = Math.min(yMax, Math.max(y, yMin));
    return {
      x: left,
      y: top
    };
  }
  destory() {
    this.scope.stop();
  }
}

export const vDraggable: Directive<HTMLElement, DraggableOptions> = {
  mounted(el, binding) {
    const options = binding.value || {};
    const draggable = new Draggable(el, options);
    el.__draggable__ = draggable;
  },
  updated(el, binding) {
    const options = binding.value || {};
    let draggable = el.__draggable__;
    if (draggable && !isEqual(draggable.options, options)) {
      draggable.destory();
      el.__draggable__ = new Draggable(el, options);
    }
  },
  unmounted(el) {
    const draggable = el.__draggable__;
    if (draggable) {
      draggable.destory();
      el.__draggable__ = null;
    }
  }
};
