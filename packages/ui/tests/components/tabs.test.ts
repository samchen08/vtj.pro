import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import XTabs from '../../src/components/tabs/Tabs.vue';

const Stubs = {
  ElTabs: {
    template: '<div class="el-tabs" :class="$attrs.class"><slot /></div>'
  },
  ElTabPane: {
    template: '<div class="el-tab-pane"><slot /><slot name="label" /></div>',
    props: ['label', 'name', 'disabled', 'closable', 'lazy']
  },
  XAction: {
    template: '<button class="x-action-stub"><slot /></button>',
    props: ['mode', 'type', 'size']
  }
};

describe('XTabs', () => {
  test('默认渲染包含 x-tabs class', () => {
    const wrapper = mount(XTabs, {
      props: { items: [] },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-tabs').exists()).toBe(true);
  });

  test('items 渲染 TabPane', () => {
    const wrapper = mount(XTabs, {
      props: {
        items: [
          { label: 'Tab1', value: 'tab1' },
          { label: 'Tab2', value: 'tab2' }
        ]
      },
      global: { stubs: Stubs }
    });
    const panes = wrapper.findAll('.el-tab-pane');
    expect(panes.length).toBe(2);
    expect(panes[0].text()).toContain('Tab1');
    expect(panes[1].text()).toContain('Tab2');
  });

  test('无 items 时渲染空内容', () => {
    const wrapper = mount(XTabs, {
      props: { items: [] },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-tabs').exists()).toBe(true);
  });

  test('border 为 false 生成 is-no-border class', () => {
    const wrapper = mount(XTabs, {
      props: { items: [], border: false },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-tabs').classes()).toContain('is-no-border');
  });

  test('fit 为 true 生成 is-fit class', () => {
    const wrapper = mount(XTabs, {
      props: { items: [], fit: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-tabs').classes()).toContain('is-fit');
  });

  test('align 为 center 生成 is-align-center class', () => {
    const wrapper = mount(XTabs, {
      props: { items: [], align: 'center' },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-tabs').classes()).toContain('is-align-center');
  });
});
