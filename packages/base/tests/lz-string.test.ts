import { describe, it, expect } from 'vitest';
import { compress, decompress } from '../src';

describe('lz-string 压缩工具', () => {
  it('compress 和 decompress 应正确往返', () => {
    const original = 'hello world';
    const compressed = compress(original);
    const decompressed = decompress(compressed);
    expect(decompressed).toBe(original);
  });

  it('compress 应处理较长的字符串', () => {
    const original = 'a'.repeat(1000);
    expect(decompress(compress(original))).toBe(original);
  });

  it('compress 应处理中文字符', () => {
    const original = '你好世界，这是一个测试';
    expect(decompress(compress(original))).toBe(original);
  });

  it('compress 应处理空字符串', () => {
    const compressed = compress('');
    expect(typeof compressed).toBe('string');
    expect(decompress(compressed)).toBe('');
  });

  it('compress 应处理特殊字符', () => {
    const original = '!@#$%^&*()_+-=[]{}|;:\'",.<>?/~`';
    expect(decompress(compress(original))).toBe(original);
  });
});
