import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: '<div>Home</div>' } }
  ]
});

// === XGrid ===
import XGrid from '../../src/components/grid/Grid.vue';
describe('XGrid', () => {
  const Stubs = {
    VxeGrid: {
      template:
        '<div class="vxe-grid"><slot name="empty" /><slot name="pager" /><slot /></div>'
    },
    ElPagination: { template: '<div class="el-pagination"><slot /></div>' },
    ElEmpty: { template: '<div class="el-empty" />' }
  };
  test('默认渲染包含 x-grid class', () => {
    const wrapper = mount(XGrid, {
      props: { columns: [], data: [] },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.vxe-grid').exists()).toBe(true);
  });
  test('columns 属性传递', () => {
    const wrapper = mount(XGrid, {
      props: { columns: [{ field: 'name', title: '姓名' }], data: [] },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.vxe-grid').exists()).toBe(true);
  });
  test('pager 属性为 true 时渲染分页', () => {
    const wrapper = mount(XGrid, {
      props: { columns: [], data: [], pager: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-pagination').exists()).toBe(true);
  });
  test('default slot 渲染内容', () => {
    const wrapper = mount(XGrid, {
      props: { columns: [], data: [] },
      slots: { default: '<span>grid content</span>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('grid content');
  });
  test('empty slot 渲染空状态', () => {
    const wrapper = mount(XGrid, {
      props: { columns: [], data: [] },
      slots: { empty: '<span>自定义空状态</span>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('自定义空状态');
  });
});

// === XPicker ===
import XPicker from '../../src/components/picker/Picker.vue';
describe('XPicker', () => {
  const Stubs = {
    ElSelect: {
      template: '<div class="el-select"><slot name="prefix" /><slot /></div>',
      props: [
        'modelValue',
        'multiple',
        'disabled',
        'placeholder',
        'filterable',
        'clearable'
      ]
    },
    ElOption: {
      template: '<div class="el-option" />',
      props: ['label', 'value']
    },
    Dialog: {
      template:
        '<div class="picker-dialog-stub" v-if="modelValue"><slot /></div>',
      props: ['modelValue']
    }
  };
  test('默认渲染包含 x-picker class', () => {
    const wrapper = mount(XPicker, {
      props: { data: [] },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-select').exists()).toBe(true);
  });
  test('modelValue 传递到 ElSelect', () => {
    const wrapper = mount(XPicker, {
      props: { data: [{ label: 'A', value: 'a' }], modelValue: 'a' },
      global: { stubs: Stubs }
    });
    const select = wrapper.find('.el-select');
    expect(select.exists()).toBe(true);
  });
  test('prefix slot 渲染触发器', () => {
    const wrapper = mount(XPicker, {
      props: { data: [] },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-picker__tigger').exists()).toBe(true);
  });
  test('disabled 为 true 时传递到 ElSelect', () => {
    const wrapper = mount(XPicker, {
      props: { data: [], disabled: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-select').exists()).toBe(true);
  });
  test('multiple 为 true 时传递到 ElSelect', () => {
    const wrapper = mount(XPicker, {
      props: { data: [], multiple: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-select').exists()).toBe(true);
  });
});

// === XMask ===
import XMask from '../../src/components/mask/Mask.vue';
describe('XMask', () => {
  const Stubs = {
    'router-link': { template: '<a><slot /></a>' },
    'router-view': { template: '<div><slot /></div>' },
    XContainer: {
      template:
        '<div :class="[\'x-container\', $attrs.class]" :style="$attrs.style"><slot /><slot name="default" /></div>'
    },
    Sidebar: {
      template: '<div class="sidebar-stub"><slot name="brand" /><slot /></div>'
    },
    Brand: { template: '<div class="brand-stub" />' },
    SwitchBar: { template: '<div class="switchbar-stub" />' },
    Menu: { template: '<div class="menu-stub" />' },
    Tabs: { template: '<div class="tabs-stub" />' },
    Toolbar: { template: '<div class="toolbar-stub"><slot /></div>' },
    Avatar: { template: '<div class="avatar-stub"><slot /></div>' },
    Content: { template: '<div class="content-stub"><slot /></div>' }
  };
  test('默认渲染包含 x-mask class', () => {
    const wrapper = mount(XMask, {
      props: { menus: [] },
      global: { stubs: Stubs, plugins: [router] }
    });
    expect(wrapper.find('.x-container').exists()).toBe(true);
  });
  test('disabled 为 false 时渲染完整布局', () => {
    const wrapper = mount(XMask, {
      props: { menus: [], disabled: false },
      global: { stubs: Stubs, plugins: [router] }
    });
    expect(wrapper.find('.sidebar-stub').exists()).toBe(true);
    expect(wrapper.find('.tabs-stub').exists()).toBe(true);
    expect(wrapper.find('.toolbar-stub').exists()).toBe(true);
  });
  test('disabled 为 true 时渲染简单布局', () => {
    const wrapper = mount(XMask, {
      props: { menus: [], disabled: true },
      global: { stubs: Stubs, plugins: [router] }
    });
    expect(wrapper.find('.sidebar-stub').exists()).toBe(false);
    expect(wrapper.find('.content-stub').exists()).toBe(true);
  });
  test('title 属性显示标题', () => {
    const wrapper = mount(XMask, {
      props: { menus: [], title: 'MyApp' },
      global: { stubs: Stubs, plugins: [router] }
    });
    expect(wrapper.find('.x-container').exists()).toBe(true);
  });
  test('default slot 渲染内容', () => {
    const wrapper = mount(XMask, {
      props: { menus: [] },
      slots: { default: '<span>主内容</span>' },
      global: { stubs: Stubs, plugins: [router] }
    });
    expect(wrapper.text()).toContain('主内容');
  });
  test('user slot 渲染用户信息', () => {
    const wrapper = mount(XMask, {
      props: { menus: [] },
      slots: { user: '<span>用户信息</span>' },
      global: { stubs: Stubs, plugins: [router] }
    });
    expect(wrapper.text()).toContain('用户信息');
  });
});
