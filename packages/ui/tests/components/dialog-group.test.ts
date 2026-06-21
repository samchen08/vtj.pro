import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

// === XDialog ===
import XDialog from '../../src/components/dialog/Dialog.vue';
const dialogStubs = {
  Teleport: { template: '<div class="teleport-stub"><slot /></div>' },
  XPanel: {
    template:
      '<div class="x-panel-stub"><slot name="title" /><slot /><slot name="footer" /><slot name="actions" /></div>',
    props: ['header', 'width', 'height', 'size', 'card', 'shadow']
  },
  XAction: {
    template:
      '<button class="x-action-stub" @click="$emit(\'click\')"><slot /></button>',
    props: ['icon', 'size', 'mode', 'type', 'background']
  },
  XContainer: { template: '<div class="x-container"><slot /></div>' },
  ElButton: {
    template:
      '<button class="el-button" @click="$emit(\'click\')"><slot /></button>'
  }
};
describe('XDialog', () => {
  test('modelValue 为 false 时不渲染', () => {
    const wrapper = mount(XDialog, {
      props: { modelValue: false },
      global: { stubs: dialogStubs }
    });
    expect(wrapper.find('.teleport-stub').exists()).toBe(false);
  });
  test('modelValue 为 true 时渲染 Teleport', () => {
    const wrapper = mount(XDialog, {
      props: { modelValue: true },
      global: { stubs: dialogStubs }
    });
    expect(wrapper.find('.teleport-stub').exists()).toBe(true);
  });
  test('title 属性渲染标题', () => {
    const wrapper = mount(XDialog, {
      props: { modelValue: true, title: '弹窗标题' },
      global: { stubs: dialogStubs }
    });
    expect(wrapper.text()).toContain('弹窗标题');
  });
  test('modal 为 true 渲染遮罩层', () => {
    const wrapper = mount(XDialog, {
      props: { modelValue: true, modal: true },
      global: { stubs: dialogStubs }
    });
    expect(wrapper.find('.x-dialog__modal').exists()).toBe(true);
  });
  test('closable 为 true 渲染关闭按钮', () => {
    const wrapper = mount(XDialog, {
      props: { modelValue: true, closable: true },
      global: { stubs: dialogStubs }
    });
    const actions = wrapper.findAll('.x-action-stub');
    expect(actions.length).toBeGreaterThanOrEqual(1);
  });
  test('submit 属性渲染确认按钮', () => {
    const wrapper = mount(XDialog, {
      props: { modelValue: true, submit: '确定' },
      global: { stubs: dialogStubs }
    });
    expect(wrapper.text()).toContain('确定');
  });
  test('cancel 属性渲染取消按钮', () => {
    const wrapper = mount(XDialog, {
      props: { modelValue: true, cancel: '取消' },
      global: { stubs: dialogStubs }
    });
    expect(wrapper.text()).toContain('取消');
  });
  test('default slot 渲染内容', () => {
    const wrapper = mount(XDialog, {
      props: { modelValue: true },
      slots: { default: '<span>弹窗内容</span>' },
      global: { stubs: dialogStubs }
    });
    expect(wrapper.text()).toContain('弹窗内容');
  });
});

// === XDialogForm ===
import XDialogForm from '../../src/components/dialog-form/DialogForm.vue';
const dialogFormStubs = {
  XDialog: {
    template:
      '<div class="x-dialog-stub" v-if="modelValue"><slot /><slot name="extra" /><slot name="handle" /><slot name="footer" /></div>',
    props: ['modelValue', 'submit', 'cancel', 'size']
  },
  XForm: {
    template: '<form class="x-form-stub"><slot /></form>',
    props: ['model', 'rules', 'size', 'footer', 'labelWidth']
  }
};
describe('XDialogForm', () => {
  test('默认渲染 XDialog', () => {
    const wrapper = mount(XDialogForm, {
      props: { modelValue: true },
      global: { stubs: dialogFormStubs }
    });
    expect(wrapper.find('.x-dialog-stub').exists()).toBe(true);
  });
  test('modelValue 为 false 时不渲染', () => {
    const wrapper = mount(XDialogForm, {
      props: { modelValue: false },
      global: { stubs: dialogFormStubs }
    });
    expect(wrapper.find('.x-dialog-stub').exists()).toBe(false);
  });
  test('extra slot 渲染', () => {
    const wrapper = mount(XDialogForm, {
      props: { modelValue: true },
      slots: { extra: '<span>extra content</span>' },
      global: { stubs: dialogFormStubs }
    });
    expect(wrapper.text()).toContain('extra content');
  });
  test('handle slot 渲染', () => {
    const wrapper = mount(XDialogForm, {
      props: { modelValue: true },
      slots: { handle: '<span>handle content</span>' },
      global: { stubs: dialogFormStubs }
    });
    expect(wrapper.text()).toContain('handle content');
  });
});

// === XDialogGrid ===
import XDialogGrid from '../../src/components/dialog-grid/DialogGrid.vue';
const dialogGridStubs = {
  XDialog: {
    template:
      '<div class="x-dialog-stub" v-if="modelValue"><slot name="extra" /><slot /></div>',
    props: ['modelValue', 'submit', 'cancel']
  },
  XGrid: {
    template:
      '<div class="x-grid-stub"><slot name="toolbar__buttons" /><slot name="top" /><slot /></div>',
    props: ['columns', 'data', 'editable'],
    methods: { doLayout() {} }
  },
  XAction: {
    template:
      '<button class="x-action-stub" @click="$emit(\'click\')"><slot /></button>',
    props: ['label', 'size', 'type', 'icon']
  }
};
describe('XDialogGrid', () => {
  test('默认渲染包含增行/删行按钮', () => {
    const wrapper = mount(XDialogGrid, {
      props: { modelValue: false },
      global: { stubs: dialogGridStubs }
    });
    // 通过 v-model 控制 XDialog 的显示
    expect(wrapper.find('.x-dialog-stub').exists()).toBe(false);
  });
  test('modelValue 为 true 时渲染', () => {
    const wrapper = mount(XDialogGrid, {
      props: { modelValue: true },
      global: { stubs: dialogGridStubs }
    });
    expect(wrapper.find('.x-dialog-stub').exists()).toBe(true);
  });
  test('default slot 透传到 XGrid', () => {
    const wrapper = mount(XDialogGrid, {
      props: { modelValue: true },
      slots: { default: '<span>grid content</span>' },
      global: { stubs: dialogGridStubs }
    });
    expect(wrapper.text()).toContain('grid content');
  });
  test('extra slot 渲染', () => {
    const wrapper = mount(XDialogGrid, {
      props: { modelValue: true },
      slots: { extra: '<span>extra</span>' },
      global: { stubs: dialogGridStubs }
    });
    expect(wrapper.text()).toContain('extra');
  });
  test('buttons slot 渲染', () => {
    const wrapper = mount(XDialogGrid, {
      props: { modelValue: true },
      slots: { buttons: '<span>custom button</span>' },
      global: { stubs: dialogGridStubs }
    });
    expect(wrapper.text()).toContain('custom button');
  });
});

// === XGridEditor ===
import XGridEditor from '../../src/components/grid-editor/GridEditor.vue';
const gridEditorStubs = {
  ElInput: {
    template: '<div class="el-input">{{ modelValue }}</div>',
    props: ['modelValue']
  },
  XDialogGrid: {
    template: '<div class="x-dialoggrid-stub" v-if="modelValue"><slot /></div>',
    props: ['modelValue', 'title', 'columns', 'model', 'plus', 'minus']
  }
};
describe('XGridEditor', () => {
  test('默认渲染 ElInput', () => {
    const wrapper = mount(XGridEditor, {
      props: { modelValue: [] },
      global: { stubs: gridEditorStubs }
    });
    expect(wrapper.find('.el-input').exists()).toBe(true);
  });
  test('modelValue 为对象时显示 JSON 字符串', () => {
    const wrapper = mount(XGridEditor, {
      props: { modelValue: [{ id: 1, name: 'test' }] },
      global: { stubs: gridEditorStubs }
    });
    expect(wrapper.find('.el-input').text()).toContain('id');
    expect(wrapper.find('.el-input').text()).toContain('name');
  });
  test('modelValue 为字符串时直接显示', () => {
    const wrapper = mount(XGridEditor, {
      props: { modelValue: 'hello' },
      global: { stubs: gridEditorStubs }
    });
    expect(wrapper.find('.el-input').text()).toContain('hello');
  });
  test('title 属性传递到 XDialogGrid', () => {
    const wrapper = mount(XGridEditor, {
      props: { modelValue: [], title: '选择数据' },
      global: { stubs: gridEditorStubs }
    });
    expect(wrapper.find('.x-dialoggrid-stub').exists()).toBe(false);
  });
});
