import { describe, it, expect, vi } from 'vitest';
import { isClient, fileToBase64, formDataToJson, dataURLtoBlob, blobToFile } from '../src';

describe('util 工具函数', () => {
  it('isClient 应为 true（jsdom 环境）', () => {
    expect(isClient).toBe(true);
  });

  it('fileToBase64 应将 File 转为 base64', async () => {
    const file = new File(['Hello'], 'test.txt', { type: 'text/plain' });
    const result = await fileToBase64(file);
    expect(result).toContain('data:text/plain;base64,');
  });

  it('fileToBase64 应处理空文件', async () => {
    const file = new File([], 'empty.txt', { type: 'text/plain' });
    const result = await fileToBase64(file);
    expect(result).toContain('data:text/plain;base64,');
  });

  it('fileToBase64 应处理 FileReader 错误', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    // Mock FileReader to trigger onerror
    const originalFileReader = global.FileReader;
    const mockReader = {
      readAsDataURL: vi.fn(),
      onload: null as any,
      onerror: null as any,
      result: 'data:text/plain;base64,dGVzdA=='
    };
    (global as any).FileReader = vi.fn(() => {
      const reader = { ...mockReader };
      setTimeout(() => {
        if (reader.onerror) reader.onerror(new Error('read error'));
      }, 0);
      return reader;
    });

    await expect(fileToBase64(file)).rejects.toBeDefined();

    (global as any).FileReader = originalFileReader;
  });

  it('formDataToJson 应将 FormData 转为 JSON', () => {
    const formData = new FormData();
    formData.append('name', 'John');
    formData.append('age', '30');
    const json = formDataToJson(formData);
    expect(json).toEqual({ name: 'John', age: '30' });
  });

  it('formDataToJson 应处理空 FormData', () => {
    expect(formDataToJson(new FormData())).toEqual({});
  });

  it('formDataToJson 应处理 null/undefined', () => {
    expect(formDataToJson(null as any)).toEqual({});
    expect(formDataToJson(undefined as any)).toEqual({});
  });

  it('dataURLtoBlob 应将 base64 转为 Blob', () => {
    const dataUrl = 'data:text/plain;base64,SGVsbG8gV29ybGQ='; // "Hello World"
    const blob = dataURLtoBlob(dataUrl);
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('text/plain');
    expect(blob.size).toBeGreaterThan(0);
  });

  it('dataURLtoBlob 应处理空内容 base64', () => {
    const dataUrl = 'data:image/png;base64,';
    const blob = dataURLtoBlob(dataUrl);
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/png');
  });

  it('blobToFile 应给 Blob 附加文件属性', () => {
    const blob = new Blob(['test'], { type: 'text/plain' });
    const file = blobToFile(blob, 'test.txt');
    expect((file as any).name).toBe('test.txt');
    expect(file.size).toBe(4);
    expect(file.type).toBe('text/plain');
    expect((file as any).lastModified).toBeGreaterThan(0);
    expect((file as any).lastModifiedDate).toBeInstanceOf(Date);
  });
});
