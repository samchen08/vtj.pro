import { describe, it, expect } from 'vitest';
import { isClient, formDataToJson, dataURLtoBlob, blobToFile } from '../src';

describe('util 工具函数', () => {
  it('isClient 应为 true（jsdom 环境）', () => {
    expect(isClient).toBe(true);
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
