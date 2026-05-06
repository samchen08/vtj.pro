import { expect, test } from 'vitest';
import { replacer } from '../src/vue/replacer';

/**
 * 辅助函数：验证 replacer 输出正确。
 * 基于 AST 的重构版本应正确处理所有 JavaScript/TypeScript 语法结构。
 */
function expectReplace(
  content: string,
  key: string,
  to: string,
  expected: string
) {
  expect(replacer(content, key, to)).toBe(expected);
}

// =====================
// 基础替换
// =====================
test('simple assignment replacement', () => {
  expectReplace('var x = foo', 'foo', 'bar', 'var x = bar');
});

test('function call argument', () => {
  expectReplace('console.log(foo)', 'foo', 'this.foo', 'console.log(this.foo)');
});

test('binary expression', () => {
  expectReplace('a + foo + b', 'foo', 'this.foo', 'a + this.foo + b');
});

test('template literal expression', () => {
  expectReplace(
    '`hello ${ foo } world`',
    'foo',
    'this.foo',
    '`hello ${ this.foo } world`'
  );
  expectReplace(
    '`hello ${foo} world`',
    'foo',
    'this.foo',
    '`hello ${this.foo} world`'
  );
});

test('return statement', () => {
  expectReplace('return foo', 'foo', 'this.foo', 'return this.foo');
});

// =====================
// 字符串中不替换（除 RegExp 特例外）
// =====================
test('string literal should NOT replace', () => {
  expectReplace('"hello foo world"', 'foo', 'bar', '"hello foo world"');
  expectReplace("'hello foo world'", 'foo', 'bar', "'hello foo world'");
  // 模板字面量（非 new RegExp 场景）不替换
  expectReplace('`hello foo world`', 'foo', 'bar', '`hello foo world`');
});

test('new RegExp string should replace', () => {
  expectReplace(
    'new RegExp("foo", "g")',
    'foo',
    'bar',
    'new RegExp("bar", "g")'
  );
  expectReplace(
    "new RegExp('foo', 'g')",
    'foo',
    'bar',
    "new RegExp('bar', 'g')"
  );
  expectReplace('new RegExp(`foo`)', 'foo', 'bar', 'new RegExp(`bar`)');
});

test('new RegExp string should replace even with surrounding punctuation', () => {
  // AST 正确识别字符串内的标识符需要替换（旧字符扫描版错误跳过）
  expectReplace(
    'new RegExp("abc.foo.com")',
    'foo',
    'bar',
    'new RegExp("abc.bar.com")'
  );
});

// =====================
// 对象属性访问不替换
// =====================
test('dot property access should NOT replace', () => {
  expectReplace('obj.foo', 'foo', 'bar', 'obj.foo');
  expectReplace('obj.foo.baz', 'foo', 'bar', 'obj.foo.baz');
  // this.X 模式：整个 this.X 应被替换为 to
  expectReplace('this.foo', 'foo', 'bar', 'bar');
});

test('optional chaining property access should NOT replace', () => {
  expectReplace('obj?.foo', 'foo', 'bar', 'obj?.foo');
});

test('computed property access SHOULD replace', () => {
  expectReplace('obj[foo]', 'foo', 'bar', 'obj[bar]');
  expectReplace('obj?.[foo]', 'foo', 'bar', 'obj?.[bar]');
});

// =====================
// 变量/函数/类声明不替换
// =====================
test('variable declaration should NOT replace', () => {
  expectReplace('var foo = 1', 'foo', 'bar', 'var foo = 1');
  expectReplace('let foo = 1', 'foo', 'bar', 'let foo = 1');
  expectReplace('const foo = 1', 'foo', 'bar', 'const foo = 1');
});

test('function declaration should NOT replace', () => {
  expectReplace('function foo() {}', 'foo', 'bar', 'function foo() {}');
  expectReplace(
    'async function foo() {}',
    'foo',
    'bar',
    'async function foo() {}'
  );
});

test('class declaration should NOT replace', () => {
  expectReplace('class foo {}', 'foo', 'bar', 'class foo {}');
});

test('class expression name should NOT replace', () => {
  expectReplace(
    'const X = class foo {}',
    'foo',
    'bar',
    'const X = class foo {}'
  );
});

// =====================
// 箭头函数参数不替换
// =====================
test('arrow function param should NOT replace', () => {
  expectReplace('foo => foo + 1', 'foo', 'bar', 'foo => bar + 1');
  expectReplace('(foo) => foo + 1', 'foo', 'bar', '(foo) => bar + 1');
  expectReplace(
    '(foo, bar) => foo + bar',
    'foo',
    'baz',
    '(foo, bar) => baz + bar'
  );
});

// =====================
// 对象属性名不替换 / 简写展开
// =====================
test('object property key should NOT replace', () => {
  expectReplace(
    '({ foo: 1, bar: foo })',
    'foo',
    'baz',
    '({ foo: 1, bar: baz })'
  );
});

test('ES6 shorthand property should EXPAND', () => {
  expectReplace('({ foo })', 'foo', 'this.foo', '({ foo: this.foo })');
  // 多个简写属性中，仅展开匹配的 key
  expectReplace(
    '({ bar, foo })',
    'foo',
    'this.foo',
    '({ bar, foo: this.foo })'
  );
  expectReplace(
    '({ foo, bar })',
    'foo',
    'this.foo',
    '({ foo: this.foo, bar })'
  );
});

test('ES6 shorthand inside return', () => {
  expectReplace(
    'return { foo }',
    'foo',
    'this.foo',
    'return { foo: this.foo }'
  );
  expectReplace(
    'return { foo, bar };',
    'foo',
    'this.foo',
    'return { foo: this.foo, bar };'
  );
});

// =====================
// 对象方法名不替换
// =====================
test('object method name should NOT replace', () => {
  expectReplace('({ foo() {} })', 'foo', 'bar', '({ foo() {} })');
});

// =====================
// 解构：在 ObjectPattern 中的简写标识符不展开，应跳过
// =====================
test('destructuring should NOT replace the binding identifier', () => {
  // 解构声明中的标识符是新的绑定名称，不应替换
  expectReplace('const { foo } = obj', 'foo', 'bar', 'const { foo } = obj');
  expectReplace(
    'const { bar, foo } = obj',
    'foo',
    'baz',
    'const { bar, foo } = obj'
  );
  // 重命名语法 { key: alias } 中 key 是属性名，alias 是绑定名
  expectReplace(
    'const { foo: renamed } = obj',
    'foo',
    'bar',
    'const { foo: renamed } = obj'
  );
});

// =====================
// 展开运算符
// =====================
test('spread element should replace', () => {
  expectReplace('[...foo]', 'foo', 'this.foo', '[...this.foo]');
  expectReplace('({ ...foo })', 'foo', 'this.foo', '({ ...this.foo })');
});

// =====================
// 导入导出声明不替换
// =====================
test('import binding should NOT replace', () => {
  expectReplace('import foo from "bar"', 'foo', 'baz', 'import foo from "bar"');
  expectReplace(
    'import * as foo from "bar"',
    'foo',
    'baz',
    'import * as foo from "bar"'
  );
  expectReplace(
    'import { foo } from "bar"',
    'foo',
    'baz',
    'import { foo } from "bar"'
  );
});

test('export name should NOT replace', () => {
  expectReplace('export { foo }', 'foo', 'baz', 'export { foo }');
  expectReplace('export default foo', 'foo', 'baz', 'export default baz');
});

// =====================
// 复合场景
// =====================
test('complex expression with libs', () => {
  const input = `{
  () => {
    return { ElButton, ElLink };
  }
}`;
  expectReplace(
    input,
    'ElLink',
    'this.$libs.ElementPlus.ElLink',
    `{
  () => {
    return { ElButton, ElLink: this.$libs.ElementPlus.ElLink };
  }
}`
  );
  expectReplace(
    input,
    'ElButton',
    'this.$libs.ElementPlus.ElButton',
    `{
  () => {
    return { ElButton: this.$libs.ElementPlus.ElButton, ElLink };
  }
}`
  );
});

test('complex expression with members', () => {
  const input = `() => {
    const baseData = this.$libs.Mock.mock({
      'list|4': [{ icon: () => [View, User, UserFilled] }]
    });
  }`;
  expectReplace(
    input,
    'User',
    'this.$libs.VtjIcons.User',
    `() => {
    const baseData = this.$libs.Mock.mock({
      'list|4': [{ icon: () => [View, this.$libs.VtjIcons.User, UserFilled] }]
    });
  }`
  );
});

test('catch clause binding should NOT replace', () => {
  expectReplace('try {} catch(foo) {}', 'foo', 'bar', 'try {} catch(foo) {}');
});

test('rest element should NOT replace', () => {
  expectReplace(
    'function fn(...foo) {}',
    'foo',
    'bar',
    'function fn(...foo) {}'
  );
  expectReplace('(...foo) => foo', 'foo', 'bar', '(...foo) => bar');
});

test('labeled statement should NOT replace', () => {
  expectReplace('foo: for(;;) {}', 'foo', 'bar', 'foo: for(;;) {}');
});

// =====================
// 边界情况
// =====================
test('key not present', () => {
  expectReplace('hello world', 'foo', 'bar', 'hello world');
});

test('key as substring of larger word', () => {
  // 'foo' 是 'foobar' 的一部分，不应替换
  expectReplace('foobar', 'foo', 'bar', 'foobar');
});

test('multiple occurrences', () => {
  expectReplace('foo + foo', 'foo', 'bar', 'bar + bar');
});

test('mixed string and identifier in template', () => {
  expectReplace('`text ${foo} more`', 'foo', 'bar', '`text ${bar} more`');
});

// =====================
// TypeScript 声明不替换
// =====================
test('enum declaration should NOT replace', () => {
  expectReplace('enum foo { A, B }', 'foo', 'bar', 'enum foo { A, B }');
});

test('type alias should NOT replace', () => {
  expectReplace('type foo = string', 'foo', 'bar', 'type foo = string');
});

test('interface should NOT replace', () => {
  expectReplace(
    'interface foo { a: string }',
    'foo',
    'bar',
    'interface foo { a: string }'
  );
});

// 旧方法测试

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

  const input3a = `
  () => {
    return this.current;
  }
`;

  const result3a = replacer(input3a, 'current', 'this.props.current');
  expect(result3a).toContain('this.props.current');

  // 单个简写属性 { ElLink } 应展开
  const input4 = `{
  () => {
    return { ElLink };
  }
}`;
  const result4 = replacer(input4, 'ElLink', 'this.$libs.ElementPlus.ElLink');
  expect(result4).toContain('ElLink: this.$libs.ElementPlus.ElLink');
});

test('replacer: should NOT expand ${ value } in template expression (not a shorthand property)', () => {
  // ${ value } → value 不应该被当成简写属性展开
  const input1 = '`hello ${ value } world`';
  const result1 = replacer(input1, 'value', 'replaced');
  expect(result1).not.toContain('value: replaced');
  expect(input1).toContain('value');
  expect(result1).toContain('replaced');

  // ${ value } 无空格版本
  const input2 = '`hello ${value} world`';
  const result2 = replacer(input2, 'value', 'replaced');
  expect(result2).not.toContain('value: replaced');
  expect(result2).toContain('replaced');

  // 多个空格同理
  const input3 = '`hello ${  value   } world`';
  const result3 = replacer(input3, 'value', 'replaced');
  expect(result3).not.toContain('value: replaced');
  expect(result3).toContain('replaced');
});

test('replacer: ${ key } should replace, not expand', () => {
  const input = '`hello ${ ElLink } world`';
  const result = replacer(input, 'ElLink', 'this.$libs.ElementPlus.ElLink');
  expect(result).not.toContain('ElLink:');
  expect(result).toContain('this.$libs.ElementPlus.ElLink');
  expect(result).toContain('${');
  expect(result).toContain('}');
});

test('replacer: should NOT expand shorthand inside array literal', () => {
  // 数组 [View, User, UserFilled] 中的 User 不应该展开为 User: to
  const input1 = `() => {
    return [View, User, UserFilled];
  }`;
  const result1 = replacer(input1, 'User', 'this.$libs.VtjIcons.User');
  expect(result1).not.toContain('User:');
  expect(result1).toContain('this.$libs.VtjIcons.User');

  // 用户报告的原始场景
  const input2 = `
() => {
  const baseData = this.$libs.Mock.mock({
    'list|4': [{ icon: () => [this.$libs.VtjIcons.View, User, UserFilled] }]
  });
}`;
  const result2 = replacer(input2, 'User', 'this.$libs.VtjIcons.User');
  expect(result2).not.toContain('User:');
  expect(result2).toContain(
    '[this.$libs.VtjIcons.View, this.$libs.VtjIcons.User, UserFilled]'
  );
});
