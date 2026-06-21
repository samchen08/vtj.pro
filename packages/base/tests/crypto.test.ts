import { describe, it, expect } from 'vitest';
import { MD5, RSA, unRSA, base64, unBase64, AES, unAES } from '../src';

describe('加密工具', () => {
  it('MD5 应正确加密', () => {
    expect(MD5('abc')).toBe('900150983cd24fb0d6963f7d28e17f72');
    expect(MD5('')).toBe('d41d8cd98f00b204e9800998ecf8427e');
    expect(MD5('hello')).toBe('5d41402abc4b2a76b9719d911017c592');
  });

  it('MD5 应处理中文', () => {
    expect(MD5('你好')).toBe('7eca689f0d3389d9dea66ae112e5cfd7');
  });

  it('RSA 加解密应正确往返', () => {
    const code = RSA('abc');
    const result = unRSA(code as string);
    expect(result).toEqual('abc');
  });

  it('RSA 应支持自定义密钥', () => {
    const customKey = RSA(
      'test',
      'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALdyxTCEB5WcGnbeUyN4xn1cs8z+0tC72vgbd/L99om5TZ0OfRqRb6Y7RJfdimB9LJyvmyP9T1P0jWrHkotq8iUCAwEAAQ=='
    );
    expect(customKey).toBeTruthy();
  });

  it('base64 编解码应正确往返', () => {
    const code = base64('abc');
    const result = unBase64(code);
    expect(result).toEqual('abc');
  });

  it('base64 应处理中文', () => {
    const code = base64('你好世界');
    const result = unBase64(code);
    expect(result).toEqual('你好世界');
  });

  it('base64 应处理空字符串', () => {
    const code = base64('');
    const result = unBase64(code);
    expect(result).toEqual('');
  });

  it('AES 加解密应正确往返', () => {
    const content = 'abc';
    const key = '123';
    const code = AES(content, key);
    const result = unAES(code, key);
    expect(result).toEqual(content);
  });

  it('AES 应处理中文内容', () => {
    const content = '你好';
    const key = 'password';
    const code = AES(content, key);
    const result = unAES(code, key);
    expect(result).toEqual(content);
  });

  it('AES 不同密钥应产生不同密文', () => {
    const content = 'test';
    const code1 = AES(content, 'key1');
    const code2 = AES(content, 'key2');
    expect(code1).not.toEqual(code2);
  });
});
