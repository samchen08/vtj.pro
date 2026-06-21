import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadUrl, downloadBlob, downloadJson } from '../src';

describe('download 工具', () => {
  beforeEach(() => {
    // 在 jsdom 中 URL.createObjectURL 可能不存在
    if (typeof URL.createObjectURL === 'undefined') {
      (URL as any).createObjectURL = vi.fn(() => 'blob:mock');
    }
    if (typeof URL.revokeObjectURL === 'undefined') {
      (URL as any).revokeObjectURL = vi.fn();
    }
  });

  it('downloadUrl 应创建链接并触发点击', () => {
    const clickSpy = vi.fn();
    vi.spyOn(window.HTMLAnchorElement.prototype, 'click').mockImplementation(
      clickSpy
    );

    downloadUrl('http://example.com/file.pdf', 'file.pdf');
    expect(clickSpy).toHaveBeenCalled();

    vi.restoreAllMocks();
  });

  it('downloadBlob 应创建 Blob 链接并触发点击', () => {
    const createObjectURL = vi.spyOn(URL, 'createObjectURL');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL');
    const clickSpy = vi.fn();
    vi.spyOn(window.HTMLAnchorElement.prototype, 'click').mockImplementation(
      clickSpy
    );

    downloadBlob('hello', 'test.txt', 'text/plain');

    expect(createObjectURL).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalled();

    vi.restoreAllMocks();
  });

  it('downloadJson 应下载 JSON 文件', () => {
    const createObjectURL = vi.spyOn(URL, 'createObjectURL');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL');
    const clickSpy = vi.fn();
    vi.spyOn(window.HTMLAnchorElement.prototype, 'click').mockImplementation(
      clickSpy
    );

    downloadJson({ name: 'test' }, 'data.json');

    expect(createObjectURL).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalled();

    vi.restoreAllMocks();
  });
});
