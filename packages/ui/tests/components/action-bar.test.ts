import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import XActionBar from '../../src/components/action-bar/ActionBar.vue';

const Stubs = {
  XContainer: {
    template: '<div class="x-container"><slot /></div>'
  },
  XAction: {
    template:
      '<button class="x-action-stub" @click="$emit(\'click\')"><slot />{{ label }}</button>',
    props: ['label', 'mode', 'size', 'type', 'disabled', 'icon']
  },
  ElDivider: { template: '<div class="el-divider" />' }
};

describe('XActionBar', () => {
  test('默认渲染包含 x-action-bar class', () => {
    const wrapper = mount(XActionBar, {
      props: { items: [] },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-container').exists()).toBe(true);
  });

  test('items 渲染动作按钮', () => {
    const wrapper = mount(XActionBar, {
      props: { items: [{ label: '新增' }, { label: '编辑' }] },
      global: { stubs: Stubs }
    });
    const actions = wrapper.findAll('.x-action-stub');
    expect(actions.length).toBe(2);
    expect(actions[0].text()).toContain('新增');
    expect(actions[1].text()).toContain('编辑');
  });

  test('分隔符 | 渲染 ElDivider', () => {
    const wrapper = mount(XActionBar, {
      props: { items: [{ label: 'A' }, '|', { label: 'B' }] },
      global: { stubs: Stubs }
    });
    const actions = wrapper.findAll('.x-action-stub');
    expect(actions.length).toBe(2);
    const dividers = wrapper.findAll('.el-divider');
    expect(dividers.length).toBe(1);
  });

  test('click 事件传递', async () => {
    const items = [{ label: '保存', command: 'save' }];
    const wrapper = mount(XActionBar, {
      props: { items },
      global: { stubs: Stubs }
    });
    const action = wrapper.find('.x-action-stub');
    await action.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  test('badge 合并', () => {
    const wrapper = mount(XActionBar, {
      props: {
        badge: { type: 'danger' },
        items: [{ label: '通知', badge: { value: 5 } }]
      },
      global: { stubs: Stubs }
    });
    const action = wrapper.find('.x-action-stub');
    expect(action.exists()).toBe(true);
  });
});
