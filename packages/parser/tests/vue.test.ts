import { expect, test } from 'vitest';
import { parseVue, htmlToNodes } from '../src';
import { replacer } from '../src/vue/utils';

import { project } from './sources/project';
import { test_27 as source } from './sources/test_27';

test('test_1', async () => {
  const result = await parseVue({
    project,
    id: '235w0t1w',
    name: 'Bbb',
    source
  }).catch((errors) => {
    console.error('error', errors);
  });

  console.log(JSON.stringify(result, null, 2));

  expect(true).toBeTruthy();
});

test('replacer: should expand ES6 shorthand property in object literal', () => {
  // { ElButton, ElLink } → 替换 ElLink 展开为 ElLink: newValue
  const input1 = `{
  () => {
    return { ElButton, ElLink };
  }
}`;
  const result1 = replacer(input1, 'ElLink', 'this.$libs.ElementPlus.ElLink');
  expect(result1).toContain('ElLink: this.$libs.ElementPlus.ElLink');

  // { ElButton, ElLink } → 替换 ElButton 展开为 ElButton: newValue
  const input2 = `{
  () => {
    return { ElButton, ElLink };
  }
}`;
  const result2 = replacer(
    input2,
    'ElButton',
    'this.$libs.ElementPlus.ElButton'
  );
  expect(result2).toContain('ElButton: this.$libs.ElementPlus.ElButton');

  // 普通属性名 { ElLink: value } 不应替换
  const input3 = `{
  () => {
    return { ElLink: someValue };
  }
}`;
  const result3 = replacer(input3, 'ElLink', 'this.$libs.ElementPlus.ElLink');
  expect(result3).toContain('ElLink: someValue');
  expect(result3).not.toContain('this.$libs.ElementPlus.ElLink');

  // 单个简写属性 { ElLink } 应展开
  const input4 = `{
  () => {
    return { ElLink };
  }
}`;
  const result4 = replacer(input4, 'ElLink', 'this.$libs.ElementPlus.ElLink');
  expect(result4).toContain('ElLink: this.$libs.ElementPlus.ElLink');
});
