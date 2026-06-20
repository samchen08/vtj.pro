import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import XContainer from '../../src/components/container/Container.vue';

describe('XContainer', () => {
  test('默认渲染为 div', () => {
    const wrapper = mount(XContainer);
    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.classes()).toContain('x-container');
    expect(wrapper.classes()).toContain('is-flex');
  });

  test('tag 属性可改变渲染标签', () => {
    const wrapper = mount(XContainer, {
      props: { tag: 'section', flex: false }
    });
    expect(wrapper.element.tagName).toBe('SECTION');
  });

  test('flex=false 则没有 is-flex class', () => {
    const wrapper = mount(XContainer, { props: { flex: false } });
    expect(wrapper.classes()).not.toContain('is-flex');
  });

  test('inline flex 生成 is-inline-flex', () => {
    const wrapper = mount(XContainer, { props: { flex: true, inline: true } });
    expect(wrapper.classes()).toContain('is-inline-flex');
    expect(wrapper.classes()).not.toContain('is-flex');
  });

  test('direction 非默认值时添加相应 class', () => {
    const wrapper = mount(XContainer, {
      props: { flex: true, direction: 'column' }
    });
    expect(wrapper.classes()).toContain('is-direction-column');
  });

  test('direction 默认 row 时不加 class', () => {
    const wrapper = mount(XContainer, {
      props: { flex: true, direction: 'row' }
    });
    expect(wrapper.classes()).not.toContain('is-direction-row');
  });

  test('wrap 非默认值时添加相应 class', () => {
    const wrapper = mount(XContainer, { props: { flex: true, wrap: 'wrap' } });
    expect(wrapper.classes()).toContain('is-wrap-wrap');
  });

  test('justify 非默认值时添加相应 class', () => {
    const wrapper = mount(XContainer, {
      props: { flex: true, justify: 'center' }
    });
    expect(wrapper.classes()).toContain('is-justify-center');
  });

  test('align 非默认值时添加相应 class', () => {
    const wrapper = mount(XContainer, {
      props: { flex: true, align: 'center' }
    });
    expect(wrapper.classes()).toContain('is-align-center');
  });

  test('width/height 生成内联样式', () => {
    const wrapper = mount(XContainer, { props: { width: '50%', height: 200 } });
    expect(wrapper.attributes('style')).toContain('width: 50%');
    expect(wrapper.attributes('style')).toContain('height: 200px');
  });

  test('fit 为 true 时不生成宽高样式', () => {
    const wrapper = mount(XContainer, {
      props: { fit: true, width: '100%', height: 200 }
    });
    expect(wrapper.attributes('style')).toBeUndefined();
  });

  test('fit 添加 is-fit class', () => {
    const wrapper = mount(XContainer, { props: { fit: true } });
    expect(wrapper.classes()).toContain('is-fit');
  });

  test('grow 添加 is-grow class', () => {
    const wrapper = mount(XContainer, { props: { grow: true } });
    expect(wrapper.classes()).toContain('is-grow');
  });

  test('shrink 添加 is-shrink class', () => {
    const wrapper = mount(XContainer, { props: { shrink: true } });
    expect(wrapper.classes()).toContain('is-shrink');
  });

  test('padding 添加 is-padding class', () => {
    const wrapper = mount(XContainer, { props: { padding: true } });
    expect(wrapper.classes()).toContain('is-padding');
  });

  test('gap 添加 is-gap class', () => {
    const wrapper = mount(XContainer, { props: { gap: true } });
    expect(wrapper.classes()).toContain('is-gap');
  });

  test('overflow 添加相应 class', () => {
    const wrapper = mount(XContainer, { props: { overflow: 'auto' } });
    expect(wrapper.classes()).toContain('is-overflow-auto');
  });

  test('slots 默认渲染内容', () => {
    const wrapper = mount(XContainer, {
      slots: { default: 'Hello Container' }
    });
    expect(wrapper.text()).toBe('Hello Container');
  });

  test('autoPointer 且有点击事件时添加 is-pointer', () => {
    const wrapper = mount(XContainer, {
      props: { autoPointer: true },
      attrs: { onClick: () => {} }
    });
    expect(wrapper.classes()).toContain('is-pointer');
  });
});
