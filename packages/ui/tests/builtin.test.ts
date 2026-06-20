import { describe, expect, test } from 'vitest';
import {
  builtinFieldEditors,
  registerFieldEditors,
  type BuiltinFieldEditorType
} from '../src/components/field/builtin';

describe('builtinFieldEditors', () => {
  test('包含所有内置编辑器类型', () => {
    const types: BuiltinFieldEditorType[] = [
      'none',
      'text',
      'textarea',
      'select',
      'checkbox',
      'radio',
      'number',
      'date',
      'time',
      'datetime',
      'switch',
      'slider',
      'rate',
      'cascader',
      'picker',
      'grid'
    ];
    for (const type of types) {
      expect(builtinFieldEditors[type]).toBeDefined();
    }
  });

  test('每个编辑器都有 component 属性', () => {
    for (const [, editor] of Object.entries(builtinFieldEditors)) {
      expect(editor.component).toBeDefined();
    }
  });

  test('text 编辑器默认值空字符串', () => {
    expect(builtinFieldEditors.text.defaultValue).toBe('');
  });

  test('checkbox 编辑器默认值空数组', () => {
    expect(builtinFieldEditors.checkbox.defaultValue).toEqual([]);
  });

  test('none 编辑器使用 div 组件', () => {
    expect(builtinFieldEditors.none.component).toBe('div');
  });
});

describe('registerFieldEditors', () => {
  test('可以注册自定义编辑器覆盖默认', () => {
    const original = builtinFieldEditors.text.component;
    const custom = { component: 'custom-input', props: { clearable: false } };
    registerFieldEditors({ text: custom as any });
    expect(builtinFieldEditors.text.component).toBe('custom-input');
    // 恢复
    registerFieldEditors({
      text: { component: original, props: { clearable: true } } as any
    });
    expect(builtinFieldEditors.text.component).toBe(original);
  });
});
