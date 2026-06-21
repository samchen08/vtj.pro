import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import XPanel from '../../src/components/panel/Panel.vue';

const Stubs = {
  XContainer: {
    template:
      '<div :class="[\'x-container\', $attrs.class]" :style="$attrs.style"><slot /><slot name="header" /><slot name="footer" /></div>'
  },
  XHeader: {
    template:
      '<div class="x-header"><slot />{{ content }}<span v-if="subtitle" class="x-header__subtitle">{{ subtitle }}</span><slot name="actions" /></div>',
    props: ['content', 'subtitle', 'size', 'icon', 'border', 'more']
  }
};

describe('XPanel', () => {
  test('默认渲染包含 x-panel class', () => {
    const wrapper = mount(XPanel, { global: { stubs: Stubs } });
    expect(wrapper.classes()).toContain('x-panel');
  });

  test('header 字符串参数渲染标题内容', () => {
    const wrapper = mount(XPanel, {
      props: { header: '面板标题' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('面板标题');
  });

  test('header 对象参数透传', () => {
    const wrapper = mount(XPanel, {
      props: { header: { content: '对象标题', subtitle: '副标题' } },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('对象标题');
    expect(wrapper.text()).toContain('副标题');
  });

  test('card 模式生成 x-panel--card class', () => {
    const wrapper = mount(XPanel, {
      props: { card: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).toContain('x-panel--card');
  });

  test('非 card 模式生成 x-panel--default class', () => {
    const wrapper = mount(XPanel, { global: { stubs: Stubs } });
    expect(wrapper.classes()).toContain('x-panel--default');
  });

  test('border 属性生成 is-border class', () => {
    const wrapper = mount(XPanel, {
      props: { border: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).toContain('is-border');
  });

  test('radius 属性生成 is-radius class', () => {
    const wrapper = mount(XPanel, {
      props: { radius: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).toContain('is-radius');
  });

  test('shadow 为 always 生成 is-shadow-always class', () => {
    const wrapper = mount(XPanel, {
      props: { shadow: 'always' },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).toContain('is-shadow-always');
  });

  test('shadow 为 none 不生成 is-shadow class', () => {
    const wrapper = mount(XPanel, {
      props: { shadow: 'none' },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).not.toContain('is-shadow');
  });

  test('size 生成 is-${size} class', () => {
    const wrapper = mount(XPanel, {
      props: { size: 'small' },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).toContain('is-small');
  });

  test('size 为 default 不生成 class', () => {
    const wrapper = mount(XPanel, {
      props: { size: 'default' },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).not.toContain('is-default');
  });

  test('badge 属性渲染角标内容', () => {
    const wrapper = mount(XPanel, {
      props: { badge: { type: 'danger', text: 'NEW' } },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('NEW');
    expect(wrapper.classes()).toContain('x-panel__badge-wrapper');
  });

  test('default slot 渲染内容', () => {
    const wrapper = mount(XPanel, {
      slots: { default: '<span>panel body</span>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('panel body');
  });

  test('header slot 覆盖 header prop', () => {
    const wrapper = mount(XPanel, {
      props: { header: '默认标题' },
      slots: { header: '<span>自定义头部</span>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('自定义头部');
  });

  test('footer slot 渲染底部内容', () => {
    const wrapper = mount(XPanel, {
      slots: { footer: '<span>footer content</span>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('footer content');
  });
});
