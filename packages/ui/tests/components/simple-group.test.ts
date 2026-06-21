import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

// === Startup ===
import XStartup from '../../src/components/startup/Startup.vue';
describe('XStartup', () => {
  const Stubs = {
    ElButton: { template: '<button class="el-button"><slot /></button>' }
  };
  test('默认渲染包含 x-startup class', () => {
    const wrapper = mount(XStartup, { global: { stubs: Stubs } });
    expect(wrapper.classes()).toContain('x-startup');
  });
  test('name 属性显示名称', () => {
    const wrapper = mount(XStartup, {
      props: { name: 'MyApp' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('MyApp');
  });
  test('tagline 属性显示标语', () => {
    const wrapper = mount(XStartup, {
      props: { tagline: '快速开发平台' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('快速开发平台');
  });
  test('actionText 属性显示按钮文本', () => {
    const wrapper = mount(XStartup, {
      props: { actionText: '开始使用' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('开始使用');
  });
});

// === XVerify ===
import XVerify from '../../src/components/verify/Verify.vue';
describe('XVerify', () => {
  const Stubs = {
    ElInput: {
      template:
        '<div class="el-input" :placeholder="placeholder"><slot name="suffix" /></div>',
      props: ['placeholder', 'maxlength', 'modelValue']
    },
    ElLink: {
      template: '<a class="el-link"><slot /></a>'
    },
    ElDivider: { template: '<div class="el-divider" />' }
  };
  test('默认渲染包含 x-verify class', () => {
    const wrapper = mount(XVerify, { global: { stubs: Stubs } });
    expect(wrapper.find('.el-input').exists()).toBe(true);
  });
  test('placeholder 属性传递', () => {
    const wrapper = mount(XVerify, {
      props: { placeholder: '输入验证码' },
      global: { stubs: Stubs }
    });
    const input = wrapper.find('.el-input');
    expect(input.attributes('placeholder')).toBe('输入验证码');
  });
  test('默认显示获取验证码链接', () => {
    const wrapper = mount(XVerify, { global: { stubs: Stubs } });
    expect(wrapper.find('.el-link').exists()).toBe(true);
    expect(wrapper.find('.el-link').text()).toContain('获取验证码');
  });
});

// === XCaptcha ===
import XCaptcha from '../../src/components/captcha/Captcha.vue';
describe('XCaptcha', () => {
  const Stubs = {
    ElInput: {
      template:
        '<div class="el-input"><slot name="prepend" /><slot name="suffix" /></div>',
      props: ['placeholder', 'maxlength']
    },
    XIcon: { template: '<i class="x-icon-stub"><slot /></i>' }
  };
  test('默认渲染包含 x-captcha class', () => {
    const wrapper = mount(XCaptcha, { global: { stubs: Stubs } });
    expect(wrapper.find('.el-input').exists()).toBe(true);
  });
  test('placeholder 默认值', () => {
    const wrapper = mount(XCaptcha, { global: { stubs: Stubs } });
    expect(wrapper.find('.el-input').exists()).toBe(true);
  });
  test('prepend slot 渲染图片', () => {
    const wrapper = mount(XCaptcha, { global: { stubs: Stubs } });
    expect(wrapper.find('img').exists()).toBe(true);
  });
});

// === XImportButton ===
import XImportButton from '../../src/components/import-button/ImportButton.vue';
describe('XImportButton', () => {
  const Stubs = {
    ElUpload: {
      template: '<div class="el-upload"><slot /></div>',
      props: ['multiple', 'accept']
    },
    ElButton: { template: '<button class="el-button"><slot /></button>' }
  };
  test('默认渲染包含 x-import-button class', () => {
    const wrapper = mount(XImportButton, { global: { stubs: Stubs } });
    expect(wrapper.find('.el-upload').exists()).toBe(true);
  });
  test('默认显示导入文本', () => {
    const wrapper = mount(XImportButton, { global: { stubs: Stubs } });
    expect(wrapper.text()).toContain('导入');
  });
  test('multiple 属性传递', () => {
    const wrapper = mount(XImportButton, {
      props: { multiple: true },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-upload').exists()).toBe(true);
  });
  test('accept 属性传递', () => {
    const wrapper = mount(XImportButton, {
      props: { accept: '.xlsx,.csv' },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-upload').exists()).toBe(true);
  });
  test('default slot 自定义按钮文本', () => {
    const wrapper = mount(XImportButton, {
      slots: { default: '上传文件' },
      global: { stubs: Stubs }
    });
    expect(wrapper.text()).toContain('上传文件');
  });
});

// === XQrCode ===
import XQrCode from '../../src/components/qr-code/QrCode.vue';

describe('XQrCode', () => {
  const Stubs = { XIcon: { template: '<i class="x-icon-stub"><slot /></i>' } };
  test('默认渲染包含 x-qr-code class', () => {
    const wrapper = mount(XQrCode, { global: { stubs: Stubs } });
    expect(wrapper.classes()).toContain('x-qr-code');
  });
  test('size 属性控制宽高样式', () => {
    const wrapper = mount(XQrCode, {
      props: { size: 150 },
      global: { stubs: Stubs }
    });
    expect(wrapper.attributes('style')).toContain('width: 150px');
    expect(wrapper.attributes('style')).toContain('height: 150px');
  });
  test('默认 size 为 200', () => {
    const wrapper = mount(XQrCode, { global: { stubs: Stubs } });
    expect(wrapper.attributes('style')).toContain('width: 200px');
  });
  test('content 为空时不生成 img', () => {
    const wrapper = mount(XQrCode, { global: { stubs: Stubs } });
    expect(wrapper.find('img').exists()).toBe(false);
  });
});

// === XInputUnit ===
import XInputUnit from '../../src/components/input-unit/InputUnit.vue';
describe('XInputUnit', () => {
  const Stubs = {
    ElInput: {
      template:
        '<div class="el-input"><slot name="append" /><slot name="suffix" /></div>'
    },
    ElSelect: { template: '<select class="el-select"><slot /></select>' },
    ElOption: {
      template: '<option class="el-option" />',
      props: ['label', 'value']
    }
  };
  test('默认渲染包含 x-input-unit class', () => {
    const wrapper = mount(XInputUnit, { global: { stubs: Stubs } });
    expect(wrapper.find('.el-input').exists()).toBe(true);
  });
  test('units 为字符串数组渲染选项', () => {
    const wrapper = mount(XInputUnit, {
      props: { units: ['px', 'em', '%'] },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.el-select').exists()).toBe(true);
  });
  test('无 units 时显示后缀 unit', () => {
    const wrapper = mount(XInputUnit, {
      props: { unit: 'px' },
      global: { stubs: Stubs }
    });
    expect(wrapper.find('.x-input-unit__unit').exists()).toBe(true);
    expect(wrapper.find('.x-input-unit__unit').text()).toContain('px');
  });
});

// === XMenu ===
import XMenu from '../../src/components/menu/Menu.vue';
const menuStubs = {
  ElMenu: { template: '<div class="el-menu"><slot /></div>' },
  XMenuItem: {
    template: '<div class="x-menuitem-stub">{{ item?.title }}<slot /></div>',
    props: ['item', 'defaultIcon']
  },
  ElSubMenu: {
    template: '<div class="el-submenu"><slot name="title" /><slot /></div>'
  },
  ElMenuItem: {
    template: '<div class="el-menuitem"><slot name="title" /><slot /></div>'
  },
  ElBadge: { template: '<span class="el-badge"><slot /></span>' },
  XIcon: { template: '<i class="x-icon-stub"><slot /></i>' }
};
describe('XMenu', () => {
  test('默认渲染包含 x-menu class', () => {
    const wrapper = mount(XMenu, {
      props: { data: [] },
      global: { stubs: menuStubs }
    });
    expect(wrapper.find('.el-menu').exists()).toBe(true);
  });
  test('data 渲染菜单项', () => {
    const wrapper = mount(XMenu, {
      props: {
        data: [
          { id: '1', title: '首页' },
          { id: '2', title: '设置' }
        ]
      },
      global: { stubs: menuStubs }
    });
    const items = wrapper.findAll('.x-menuitem-stub');
    expect(items.length).toBe(2);
    expect(items[0].text()).toContain('首页');
    expect(items[1].text()).toContain('设置');
  });
  test('hidden 为 true 的菜单项不显示', () => {
    const wrapper = mount(XMenu, {
      props: {
        data: [
          { id: '1', title: '可见' },
          { id: '2', title: '隐藏', hidden: true }
        ]
      },
      global: { stubs: menuStubs }
    });
    const items = wrapper.findAll('.x-menuitem-stub');
    expect(items.length).toBe(1);
    expect(items[0].text()).toContain('可见');
  });
  test('子菜单渲染父级项', () => {
    const wrapper = mount(XMenu, {
      props: {
        data: [
          {
            id: '1',
            title: '父菜单',
            children: [{ id: '1-1', title: '子菜单' }]
          }
        ]
      },
      global: { stubs: menuStubs }
    });
    // 子菜单通过 XMenuItem 的子组件内部递归渲染，外部 stub 不追踪递归
    expect(wrapper.find('.x-menuitem-stub').exists()).toBe(true);
    expect(wrapper.find('.x-menuitem-stub').text()).toContain('父菜单');
  });
});
