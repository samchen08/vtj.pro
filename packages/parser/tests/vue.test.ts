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

// test('replacer: should expand ES6 shorthand property in object literal', () => {
//   // { ElButton, ElLink } → 替换 ElLink 展开为 ElLink: newValue
//   const input1 = `{
//   () => {
//     return { ElButton, ElLink };
//   }
// }`;
//   const result1 = replacer(input1, 'ElLink', 'this.$libs.ElementPlus.ElLink');
//   expect(result1).toContain('ElLink: this.$libs.ElementPlus.ElLink');

//   // { ElButton, ElLink } → 替换 ElButton 展开为 ElButton: newValue
//   const input2 = `{
//   () => {
//     return { ElButton, ElLink };
//   }
// }`;
//   const result2 = replacer(
//     input2,
//     'ElButton',
//     'this.$libs.ElementPlus.ElButton'
//   );
//   expect(result2).toContain('ElButton: this.$libs.ElementPlus.ElButton');

//   // 普通属性名 { ElLink: value } 不应替换
//   const input3 = `{
//   () => {
//     return { ElLink: someValue };
//   }
// }`;
//   const result3 = replacer(input3, 'ElLink', 'this.$libs.ElementPlus.ElLink');
//   expect(result3).toContain('ElLink: someValue');
//   expect(result3).not.toContain('this.$libs.ElementPlus.ElLink');

//   // 单个简写属性 { ElLink } 应展开
//   const input4 = `{
//   () => {
//     return { ElLink };
//   }
// }`;
//   const result4 = replacer(input4, 'ElLink', 'this.$libs.ElementPlus.ElLink');
//   expect(result4).toContain('ElLink: this.$libs.ElementPlus.ElLink');
// });

// test('replacer: should NOT expand ${ value } in template expression (not a shorthand property)', () => {
//   // ${ value } → value 不应该被当成简写属性展开
//   const input1 = '`hello ${ value } world`';
//   const result1 = replacer(input1, 'value', 'replaced');
//   // value 不在字符串内（因为 ${} 内是表达式），预期被替换为 replaced
//   // 但不应该展开为 value: replaced
//   expect(result1).not.toContain('value: replaced');
//   // 确认 value 确实存在于输入中，替换行为符合预期（普通替换为 replaced）
//   expect(input1).toContain('value');
//   expect(result1).toContain('replaced');

//   // ${ value } 无空格版本
//   const input2 = '`hello ${value} world`';
//   const result2 = replacer(input2, 'value', 'replaced');
//   expect(result2).not.toContain('value: replaced');
//   expect(result2).toContain('replaced');

//   // 多个空格同理
//   const input3 = '`hello ${  value   } world`';
//   const result3 = replacer(input3, 'value', 'replaced');
//   expect(result3).not.toContain('value: replaced');
//   expect(result3).toContain('replaced');
// });

// test('replacer: ${ key } should replace, not expand', () => {
//   const input = '`hello ${ ElLink } world`';
//   const result = replacer(input, 'ElLink', 'this.$libs.ElementPlus.ElLink');
//   // 不应该展开为 ElLink: ...
//   expect(result).not.toContain('ElLink:');
//   // 应该正常替换
//   expect(result).toContain('this.$libs.ElementPlus.ElLink');
//   // 确认 ${ ... } 结构完整
//   expect(result).toContain('${');
//   expect(result).toContain('}');
// });
