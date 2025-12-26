import { expect, test, vi, beforeEach } from 'vitest';
import { rpxToPx, convertCssRpx } from '../src/utils/converter';

// 模拟 window 对象
beforeEach(() => {
  // 在每个测试前重置 window 对象
  Object.defineProperty(global, 'window', {
    value: {
      innerWidth: 750,
      document: {
        documentElement: {
          clientWidth: 750
        }
      }
    },
    writable: true,
    configurable: true
  });
});

test('rpxToPx converts rpx to px correctly', () => {
  // 测试基础转换
  expect(rpxToPx(750)).toBe(750); // 750rpx * 750 / 750 = 750px
  expect(rpxToPx(375)).toBe(375); // 375rpx * 750 / 750 = 375px
  expect(rpxToPx(100)).toBe(100); // 100rpx * 750 / 750 = 100px

  // 测试自定义基准宽度
  expect(rpxToPx(750, 375)).toBe(1500); // 750rpx * 750 / 375 = 1500px
});

test('rpxToPx handles non-browser environment', () => {
  // 模拟非浏览器环境
  Object.defineProperty(global, 'window', {
    value: undefined,
    writable: true,
    configurable: true
  });

  // 在非浏览器环境中，应该使用默认值375
  // 750rpx * 375 / 750 = 375px
  expect(rpxToPx(750)).toBe(375);
});

test('convertCssRpx converts simple rpx values', () => {
  const css = `.container { width: 100rpx; height: 200rpx; }`;
  const result = convertCssRpx(css);

  // 100rpx * 750 / 750 = 100px
  // 200rpx * 750 / 750 = 200px
  expect(result).toBe(`.container { width: 100px; height: 200px; }`);
});

test('convertCssRpx converts decimal rpx values', () => {
  const css = `.container { font-size: 12.5rpx; margin: 1.5rpx 2.5rpx; }`;
  const result = convertCssRpx(css);

  expect(result).toBe(`.container { font-size: 12.5px; margin: 1.5px 2.5px; }`);
});

test('convertCssRpx converts negative rpx values', () => {
  const css = `.container { transform: translateX(-10rpx); margin: -5rpx; }`;
  const result = convertCssRpx(css);

  expect(result).toBe(
    `.container { transform: translateX(-10px); margin: -5px; }`
  );
});

test('convertCssRpx handles values with spaces', () => {
  const css = `.container { width: 100 rpx; height: 200  rpx; }`;
  const result = convertCssRpx(css);

  expect(result).toBe(`.container { width: 100px; height: 200px; }`);
});

test('convertCssRpx handles complex CSS with multiple selectors', () => {
  const css = `
    .container { width: 100rpx; }
    .item { height: 50rpx; margin: 10rpx 20rpx; }
    #special { padding: 15rpx; }
  `;

  const result = convertCssRpx(css);
  const expected = `
    .container { width: 100px; }
    .item { height: 50px; margin: 10px 20px; }
    #special { padding: 15px; }
  `;

  expect(result).toBe(expected);
});

test('convertCssRpx does not convert px values', () => {
  const css = `.container { width: 100px; height: 200px; }`;
  const result = convertCssRpx(css);

  // 应该保持不变
  expect(result).toBe(css);
});

test('convertCssRpx handles mixed units', () => {
  const css = `.container { margin: 10rpx 20px 30rpx 40px; }`;
  const result = convertCssRpx(css);

  expect(result).toBe(`.container { margin: 10px 20px 30px 40px; }`);
});

test('convertCssRpx handles calc functions', () => {
  const css = `.container { width: calc(100% - 20rpx); height: calc(50% + 10rpx); }`;
  const result = convertCssRpx(css);

  expect(result).toBe(
    `.container { width: calc(100% - 20px); height: calc(50% + 10px); }`
  );
});

test('convertCssRpx handles var functions', () => {
  const css = `.container { padding: var(--spacing, 10rpx); margin: var(--margin, 20rpx 30rpx); }`;
  const result = convertCssRpx(css);

  expect(result).toBe(
    `.container { padding: var(--spacing, 10px); margin: var(--margin, 20px 30px); }`
  );
});

test('convertCssRpx does not convert in variable names', () => {
  const css = `.container { --spacing-rpx: 10px; custom-property: var(--spacing-rpx); }`;
  const result = convertCssRpx(css);

  // 不应该转换变量名中的 rpx
  expect(result).toBe(css);
});

test('convertCssRpx handles empty string', () => {
  expect(convertCssRpx('')).toBe('');
});

test('convertCssRpx handles string without rpx', () => {
  const css = `.container { color: red; font-size: 14px; }`;
  expect(convertCssRpx(css)).toBe(css);
});

// 新增测试：测试浮点数精度处理
test('convertCssRpx handles floating point precision', () => {
  // 设置不同的屏幕宽度，以便产生浮点数结果
  Object.defineProperty(global, 'window', {
    value: {
      innerWidth: 375, // 屏幕宽度变为375
      document: {
        documentElement: {
          clientWidth: 375
        }
      }
    },
    writable: true,
    configurable: true
  });

  // 100rpx * 375 / 750 = 50px
  const css = `.container { width: 100rpx; }`;
  const result = convertCssRpx(css);

  // 应该得到整数 50px
  expect(result).toBe(`.container { width: 50px; }`);
});

// 新增测试：测试不会错误匹配类似 --spacing-rpx 的变量名
test('convertCssRpx does not match rpx in variable names or values', () => {
  const css = `
    .container {
      --my-rpx-variable: 10px;
      background: url(image@2xrpx.png);
      content: "10rpx";
    }
  `;
  const result = convertCssRpx(css);

  // 不应该转换变量名、URL或字符串中的 rpx
  expect(result).toBe(css);
});

// 新增测试：测试多个连续的 rpx 值
test('convertCssRpx handles multiple consecutive rpx values', () => {
  const css = `.container { box-shadow: 0rpx 2rpx 4rpx rgba(0,0,0,0.1); }`;
  const result = convertCssRpx(css);

  expect(result).toBe(
    `.container { box-shadow: 0px 2px 4px rgba(0,0,0,0.1); }`
  );
});
