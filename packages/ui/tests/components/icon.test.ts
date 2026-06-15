import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import XIcon from '../../src/components/icon/Icon.vue';

const ElIconStub = {
  name: 'ElIcon',
  template: '<i class="el-icon"><slot /></i>',
  props: ['color', 'size']
};

describe('XIcon', () => {
  test('默认渲染包含 x-icon class', () => {
    const wrapper = mount(XIcon, {
      global: { stubs: { ElIcon: ElIconStub } }
    });
    expect(wrapper.find('i.el-icon').exists()).toBe(true);
  });

  test('color 作为 props 传递给 ElIcon', () => {
    const wrapper = mount(XIcon, {
      props: { color: 'red' },
      global: {
        stubs: {
          ElIcon: {
            ...ElIconStub,
            inheritAttrs: false,
            template: '<i><slot /></i>'
          }
        }
      }
    });
    const elIcon = wrapper.findComponent({ name: 'ElIcon' });
    expect(elIcon.props('color')).toBe('red');
  });

  test('background 转为内联背景色', () => {
    const wrapper = mount(XIcon, {
      props: { icon: 'test-icon', background: '#f0f0f0' },
      global: { stubs: { ElIcon: ElIconStub } }
    });
    const elIcon = wrapper.find('i.el-icon');
    expect(elIcon.attributes('style')).toContain('background-color');
  });

  test('radius 转为 border-radius', () => {
    const wrapper = mount(XIcon, {
      props: { icon: 'test-icon', radius: 8 },
      global: { stubs: { ElIcon: ElIconStub } }
    });
    const elIcon = wrapper.find('i.el-icon');
    expect(elIcon.attributes('style')).toContain('border-radius: 8px');
  });

  test('padding 转为 padding', () => {
    const wrapper = mount(XIcon, {
      props: { icon: 'test-icon', padding: 10 },
      global: { stubs: { ElIcon: ElIconStub } }
    });
    const elIcon = wrapper.find('i.el-icon');
    expect(elIcon.attributes('style')).toContain('padding: 10px');
  });

  test('默认 slot 内容正常渲染', () => {
    const wrapper = mount(XIcon, {
      slots: { default: '<span>icon-content</span>' },
      global: { stubs: { ElIcon: ElIconStub } }
    });
    expect(wrapper.text()).toContain('icon-content');
  });

  test('size 为 large 时映射为 18px', () => {
    const wrapper = mount(XIcon, {
      props: { size: 'large' },
      global: { stubs: { ElIcon: ElIconStub } }
    });
    const elIcon = wrapper.findComponent({ name: 'ElIcon' });
    expect(elIcon.props('size')).toBe(18);
  });

  test('size 为数字时直接传递', () => {
    const wrapper = mount(XIcon, {
      props: { size: 24 },
      global: { stubs: { ElIcon: ElIconStub } }
    });
    const elIcon = wrapper.findComponent({ name: 'ElIcon' });
    expect(elIcon.props('size')).toBe(24);
  });
});
