import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

// === XForm ===
import XForm from '../../src/components/form/Form.vue';
describe('XForm', () => {
  const Stubs = {
    ElForm: {
      template:
        '<form class="el-form" @keyup.enter="$emit(\'keyup.enter\', $event)"><slot /></form>',
      props: ['model', 'inline']
    },
    XField: {
      template:
        '<div class="x-field-stub"><slot name="editor" /><slot name="action" /></div>',
      props: ['editor', 'label', 'class']
    },
    ElButton: {
      template:
        '<button class="el-button" @click="$emit(\'click\')"><slot /></button>'
    }
  };
  test('默认渲染包含 el-form', () => {
    const wrapper = mount(XForm, { global: { stubs: Stubs } });
    expect(wrapper.find('.el-form').exists()).toBe(true);
  });
  test('inline 属性传递', () => {
    const wrapper = mount(XForm, {
      props: { inline: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-form').exists()).toBe(true);
  });
  test('footer 为 true 时渲染提交/重置按钮', () => {
    const wrapper = mount(XForm, {
      props: { footer: true, submitText: '提交', resetText: '重置' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('提交');
    expect(wrapper.text()).toContain('重置');
  });
  test('footer 为 false 时不渲染按钮', () => {
    const wrapper = mount(XForm, {
      props: { footer: false },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-field-stub').exists()).toBe(false);
  });
  test('submitText 为 null 时不显示提交按钮', () => {
    const wrapper = mount(XForm, {
      props: { footer: true, submitText: null, resetText: '重置' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).not.toContain('提交');
    expect(wrapper.text()).toContain('重置');
  });
  test('default slot 渲染内容', () => {
    const wrapper = mount(XForm, {
      slots: { default: '<span>表单内容</span>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('表单内容');
  });
  test('action slot 渲染自定义按钮区域', () => {
    const wrapper = mount(XForm, {
      props: { footer: true },
      slots: { action: '<span>自定义操作</span>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('自定义操作');
  });
});

// === XField ===
import XField from '../../src/components/field/Field.vue';
describe('XField', () => {
  const Stubs = {
    ElFormItem: {
      template:
        '<div class="el-form-item"><slot name="label" /><slot name="error" /><div class="x-field__editor_wrap"><slot name="editor" /></div><slot /></div>',
      props: ['prop', 'label', 'size']
    },
    ElTooltip: { template: '<span class="el-tooltip"><slot /></span>' },
    XIcon: { template: '<i class="x-icon-stub"><slot /></i>' }
  };
  test('默认渲染包含 x-field class', () => {
    const wrapper = mount(XField, {
      props: { name: 'test', editor: 'text' },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-form-item').exists()).toBe(true);
  });
  test('label 属性传递到 ElFormItem', () => {
    const wrapper = mount(XField, {
      props: { name: 'test', editor: 'text', label: '姓名' },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-form-item').exists()).toBe(true);
  });
  test('editor 为 none 时不渲染编辑器', () => {
    const wrapper = mount(XField, {
      props: { name: 'test', editor: 'none' },
      global: { stubs: Stubs }
    });
    const editorWrap = wrapper.find('.x-field__editor_wrap');
    expect(editorWrap.exists()).toBe(true);
  });
  test('default slot 渲染内容', () => {
    const wrapper = mount(XField, {
      props: { name: 'test', editor: 'text' },
      slots: { default: '<span>额外内容</span>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('额外内容');
  });
  test('tip 属性显示提示', () => {
    const wrapper = mount(XField, {
      props: { name: 'test', editor: 'text', tip: '帮助信息' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('帮助信息');
  });
  test('label slot 覆盖 label 属性', () => {
    const wrapper = mount(XField, {
      props: { name: 'test', editor: 'text', label: '默认' },
      slots: { label: '<span>自定义标签</span>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('自定义标签');
  });
});

// === XQueryForm ===
import XQueryForm from '../../src/components/query-form/QueryForm.vue';
describe('XQueryForm', () => {
  const Stubs = {
    XForm: {
      template:
        '<form class="x-form-stub"><slot /><slot name="action" /></form>',
      props: ['inline', 'footer', 'disabled']
    },
    XField: {
      template:
        '<div class="x-field-stub" :key="name">{{ $attrs.label }}<slot /></div>',
      props: ['name', 'label', 'disabled']
    },
    XAction: {
      template:
        '<button class="x-action-stub" @click="$emit(\'click\')"><slot /></button>',
      props: ['icon', 'label', 'mode', 'type']
    }
  };
  test('默认渲染包含 x-query-form class', () => {
    const wrapper = mount(XQueryForm, {
      props: { items: [] },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-form-stub').exists()).toBe(true);
  });
  test('items 渲染字段', () => {
    const wrapper = mount(XQueryForm, {
      props: {
        items: [
          { name: 'keyword', label: '关键字' },
          { name: 'status', label: '状态' }
        ]
      },
      global: { stubs: Stubs }
    });
    const fields = wrapper.findAll('.x-field-stub');
    expect(fields.length).toBe(2);
  });
  test('default slot 覆盖 items', () => {
    const wrapper = mount(XQueryForm, {
      props: { items: [] },
      slots: { default: '<span>自定义搜索</span>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('自定义搜索');
  });
  test('disabled 属性传递', () => {
    const wrapper = mount(XQueryForm, {
      props: { items: [], disabled: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-form-stub').exists()).toBe(true);
  });
});
