import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

// === XList ===
import XList from '../../src/components/list/List.vue';
describe('XList', () => {
  const Stubs = {
    ElEmpty: { template: '<div class="el-empty"><slot /></div>' },
    ElPagination: {
      template: '<div class="el-pagination" />',
      props: ['total', 'defaultPageSize', 'defaultCurrentPage']
    }
  };
  test('默认渲染包含 x-list class', () => {
    const wrapper = mount(XList, {
      props: { data: { list: [], total: 0 } },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).toContain('x-list');
  });
  test('无数据时显示空状态', async () => {
    const wrapper = mount(XList, {
      props: { data: { list: [], total: 0 } },
      global: { stubs: Stubs }
    });
    await new Promise((r) => setTimeout(r, 20));
    expect(wrapper.find('.el-empty').exists()).toBe(true);
  });
  test('有数据时渲染列表项', () => {
    const wrapper = mount(XList, {
      props: { data: () => ({ list: ['item1', 'item2'], total: 2 }) },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-empty').exists()).toBe(false);
  });
  test('pager 属性开启分页', async () => {
    const wrapper = mount(XList, {
      props: {
        data: () => ({ list: ['item1', 'item2'], total: 20 }),
        pager: true
      },
      global: { stubs: Stubs }
    });
    await new Promise((r) => setTimeout(r, 50));
    expect(wrapper.find('.el-pagination').exists()).toBe(true);
  });
  test('pager 为 false 时不显示分页', async () => {
    const wrapper = mount(XList, {
      props: {
        data: () => ({ list: ['item1', 'item2'], total: 20 }),
        pager: false
      },
      global: { stubs: Stubs }
    });
    await new Promise((r) => setTimeout(r, 50));
    expect(wrapper.find('.el-pagination').exists()).toBe(false);
  });
  test('width/height 生成样式', () => {
    const wrapper = mount(XList, {
      props: { data: { list: [], total: 0 }, width: '50%', height: 300 },
      global: { stubs: Stubs }
    });
    expect(wrapper.attributes('style')).toContain('width: 50%');
    expect(wrapper.attributes('style')).toContain('height: 300px');
  });
  test('empty slot 自定义空状态', async () => {
    const wrapper = mount(XList, {
      props: { data: { list: [], total: 0 } },
      slots: { empty: '<span>自定义空</span>' },
      global: { stubs: Stubs }
    });
    await new Promise((r) => setTimeout(r, 20));
    expect(wrapper.text()).toContain('自定义空');
  });
});

// === XAttachment ===
import XAttachment from '../../src/components/attachment/Attachment.vue';
describe('XAttachment', () => {
  const Stubs = {
    ElUpload: {
      template: '<div class="el-upload"><slot /><slot name="tip" /></div>',
      props: [
        'fileList',
        'multiple',
        'accept',
        'listType',
        'autoUpload',
        'limit',
        'disabled'
      ]
    },
    ElIcon: { template: '<i class="el-icon"><slot /></i>' },
    ElMessage: { template: '<div />' },
    ElMessageBox: { template: '<div />' },
    ElImageViewer: { template: '<div class="el-image-viewer" />' }
  };
  test('默认渲染包含 x-attachment class', () => {
    const wrapper = mount(XAttachment, {
      props: { modelValue: [] },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).toContain('x-attachment');
  });
  test('modelValue 传递文件列表', () => {
    const wrapper = mount(XAttachment, {
      props: {
        modelValue: [{ name: 'file1.pdf', url: 'http://example.com/file1.pdf' }]
      },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-upload').exists()).toBe(true);
  });
  test('listType 为 card 生成 x-attachment--card class', () => {
    const wrapper = mount(XAttachment, {
      props: { modelValue: [], listType: 'card' },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).toContain('x-attachment--card');
  });
  test('disabled 生成 is-disabled class', () => {
    const wrapper = mount(XAttachment, {
      props: { modelValue: [], disabled: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).toContain('is-disabled');
  });
  test('upload slot 自定义上传按钮', () => {
    const wrapper = mount(XAttachment, {
      props: { modelValue: [] },
      slots: { upload: '<span>上传文件</span>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('上传文件');
  });
  test('tip slot 渲染提示', () => {
    const wrapper = mount(XAttachment, {
      props: { modelValue: [] },
      slots: { tip: '<span>支持 jpg/png</span>' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('支持 jpg/png');
  });
  test('selectable 为 true 生成 is-pointer class', () => {
    const wrapper = mount(XAttachment, {
      props: { modelValue: [], selectable: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.classes()).toContain('is-pointer');
  });
});
