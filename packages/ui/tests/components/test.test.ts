import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import XTest from '../../src/components/test/Test.vue';

const GlobalStubs = {
  ElDivider: { template: '<div class="el-divider" />' },
  ElDescriptions: { template: '<div class="el-descriptions"><slot /></div>' },
  ElDescriptionsItem: {
    template: '<div class="el-descriptions-item"><slot /></div>'
  },
  ElButton: { template: '<button class="el-button"><slot /></button>' },
  ElInput: { template: '<div class="el-input"><slot /></div>' },
  XPanel: {
    template:
      '<div class="x-panel"><slot name="default" /><slot name="extra" /><slot name="header" /></div>'
  },
  XContainer: { template: '<div class="x-container"><slot /></div>' }
};

describe('XTest', () => {
  test('默认渲染存在', () => {
    const wrapper = mount(XTest, { global: { stubs: GlobalStubs } });
    expect(wrapper.find('.x-panel').exists()).toBe(true);
  });

  test('显示默认内部数据', () => {
    const wrapper = mount(XTest, { global: { stubs: GlobalStubs } });
    expect(wrapper.text()).toContain('default inner data');
  });

  test('stringProp 属性传递', () => {
    const wrapper = mount(XTest, {
      props: { stringProp: 'hello-world' },
      global: { stubs: GlobalStubs }
    });
    expect(wrapper.text()).toContain('hello-world');
  });

  test('booleanProp 默认值为 false', () => {
    const wrapper = mount(XTest, { global: { stubs: GlobalStubs } });
    expect(wrapper.text()).toContain('false');
  });

  test('default slot 渲染', () => {
    const wrapper = mount(XTest, {
      slots: { default: '<span>custom content</span>' },
      global: { stubs: GlobalStubs }
    });
    expect(wrapper.text()).toContain('custom content');
  });
});
