import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import XAction from '../../src/components/action/Action.vue';

const Stubs = {
  ElButton: {
    template:
      '<button class="el-button" :type="type" :size="size" :disabled="disabled" @click="$emit(\'click\')"><slot /><component :is="icon" v-if="icon" /></button>',
    props: ['type', 'size', 'disabled', 'icon']
  },
  ElBadge: { template: '<span class="el-badge"><slot /></span>' },
  ElTooltip: { template: '<span class="el-tooltip"><slot /></span>' },
  ElDropdown: {
    template:
      '<span class="el-dropdown"><slot /><slot name="dropdown" /></span>'
  },
  ElDropdownMenu: {
    template: '<div class="el-dropdown-menu"><slot /></div>'
  },
  ElDropdownItem: {
    template: '<div class="el-dropdown-item"><slot /></div>'
  },
  XIcon: { template: '<i class="x-icon-stub"><slot /></i>' }
};

describe('XAction', () => {
  test('默认渲染包含 x-action class', () => {
    const wrapper = mount(XAction, {
      props: { label: 'test', mode: 'text' },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).toContain('x-action');
  });

  test('button 模式渲染 ElButton', () => {
    const wrapper = mount(XAction, {
      props: { label: '保存', mode: 'button' },
      global: { stubs: Stubs }
    });
    const btn = wrapper.find('.el-button');
    expect(btn.exists()).toBe(true);
  });

  test('button 模式显示 label', () => {
    const wrapper = mount(XAction, {
      props: { label: '保存', mode: 'button' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('保存');
  });

  test('text 模式渲染 x-action__inner', () => {
    const wrapper = mount(XAction, {
      props: { label: '文本操作', mode: 'text' },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-action__inner').exists()).toBe(true);
    expect(wrapper.text()).toContain('文本操作');
  });

  test('icon 模式渲染 inner', () => {
    const wrapper = mount(XAction, {
      props: { label: '图标', mode: 'icon' },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-action__inner').exists()).toBe(true);
  });

  test('click 事件触发', async () => {
    const wrapper = mount(XAction, {
      props: { label: '点击', mode: 'text' },
      global: { stubs: Stubs }
    });
    await wrapper.find('.x-action__inner').trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  test('disabled 阻止点击', async () => {
    const wrapper = mount(XAction, {
      props: { label: '禁用', mode: 'text', disabled: true },
      global: { stubs: Stubs }
    });
    await wrapper.find('.x-action__inner').trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });
});
