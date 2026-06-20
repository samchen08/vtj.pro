import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import XDataItem from '../../src/components/data-item/DataItem.vue';

const Stubs = {
  XContainer: {
    template:
      '<div :class="[\'x-container\', $attrs.class]" :style="$attrs.style"><slot /><slot name="title" /><slot name="default" /></div>'
  },
  XActionBar: {
    template: '<div class="x-actionbar-stub"><slot /></div>',
    props: ['items', 'size']
  },
  ElImage: { template: '<img class="el-image" />' }
};

describe('XDataItem', () => {
  test('默认渲染包含 x-data-item class', () => {
    const wrapper = mount(XDataItem, { global: { stubs: Stubs } });
    expect(wrapper.find('.x-data-item').exists()).toBe(true);
  });

  test('title 属性显示标题', () => {
    const wrapper = mount(XDataItem, {
      props: { title: '数据项标题' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('数据项标题');
  });

  test('description 属性显示描述', () => {
    const wrapper = mount(XDataItem, {
      props: { description: '数据项描述' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('数据项描述');
  });

  test('title slot 覆盖 title 属性', () => {
    const wrapper = mount(XDataItem, {
      props: { title: '默认标题' },
      slots: { title: '<span>自定义标题</span>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('自定义标题');
  });

  test('imageSrc 渲染图片区域', () => {
    const wrapper = mount(XDataItem, {
      props: { imageSrc: 'http://example.com/img.png' },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-data-item__img').exists()).toBe(true);
  });

  test('default slot 渲染额外内容', () => {
    const wrapper = mount(XDataItem, {
      slots: { default: '<span>extra content</span>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('extra content');
  });

  test('actions 属性渲染操作栏', () => {
    const wrapper = mount(XDataItem, {
      props: { actions: [{ label: '编辑' }, { label: '删除' }] },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-data-item__actions').exists()).toBe(true);
  });

  test('direction 为 row 生成 is-image-row class', () => {
    const wrapper = mount(XDataItem, {
      props: { direction: 'row' },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-data-item').classes()).toContain('is-image-row');
  });

  test('split 为 true 生成 is-split class', () => {
    const wrapper = mount(XDataItem, {
      props: { split: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-data-item').classes()).toContain('is-split');
  });

  test('hover 为 true 生成 is-hover class', () => {
    const wrapper = mount(XDataItem, {
      props: { hover: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-data-item').classes()).toContain('is-hover');
  });

  test('active 为 true 生成 is-active class', () => {
    const wrapper = mount(XDataItem, {
      props: { active: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-data-item').classes()).toContain('is-active');
  });
});
