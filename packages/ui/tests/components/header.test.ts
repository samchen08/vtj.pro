import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import XHeader from '../../src/components/header/Header.vue';

const Stubs = {
  XContainer: {
    template:
      '<div :class="[\'x-container\', $attrs.class]" :style="$attrs.style"><slot /><slot name="header" /></div>'
  },
  XIcon: { template: '<i class="x-icon-stub"><slot /></i>' }
};

describe('XHeader', () => {
  test('默认渲染包含 x-header class', () => {
    const wrapper = mount(XHeader, { global: { stubs: Stubs } });
    expect(wrapper.classes()).toContain('x-header');
  });

  test('content 属性显示标题文本', () => {
    const wrapper = mount(XHeader, {
      props: { content: '头部标题' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('头部标题');
  });

  test('subtitle 属性显示副标题', () => {
    const wrapper = mount(XHeader, {
      props: { content: '标题', subtitle: '副标题' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('副标题');
  });

  test('more 为 true 显示更多图标', () => {
    const wrapper = mount(XHeader, {
      props: { more: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-header__more').exists()).toBe(true);
  });

  test('more 为 false 不显示更多图标', () => {
    const wrapper = mount(XHeader, {
      props: { more: false },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-header__more').exists()).toBe(false);
  });

  test('actions slot 渲染操作区域', () => {
    const wrapper = mount(XHeader, {
      slots: { actions: '<button>操作</button>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-header__actions').exists()).toBe(true);
    expect(wrapper.find('.x-header__actions button').text()).toBe('操作');
  });

  test('size 为 small 生成 is-size-small class', () => {
    const wrapper = mount(XHeader, {
      props: { size: 'small' },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).toContain('is-size-small');
  });

  test('size 为 default 不生成 size class', () => {
    const wrapper = mount(XHeader, {
      props: { size: 'default' },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).not.toContain('is-size-default');
  });

  test('border 为 true 生成 is-border class', () => {
    const wrapper = mount(XHeader, {
      props: { border: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).toContain('is-border');
  });

  test('default slot 覆盖 content 属性', () => {
    const wrapper = mount(XHeader, {
      props: { content: '属性标题' },
      slots: { default: '<span>插槽标题</span>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('插槽标题');
  });
});
