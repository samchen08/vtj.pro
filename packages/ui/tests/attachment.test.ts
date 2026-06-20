import { describe, expect, test } from 'vitest';
import {
  getFileType,
  isImage,
  toAttachmentFile
} from '../src/components/attachment/util';

describe('getFileType', () => {
  test('file.type 已定义时直接返回', () => {
    expect(
      getFileType({
        name: 'test.jpg',
        url: 'http://example.com/test.jpg',
        type: 'pdf' as any
      })
    ).toBe('pdf');
  });

  test('图片格式识别', () => {
    const imageExts = ['jpg', 'png', 'gif', 'jpeg', 'bpm', 'webp', 'svg'];
    for (const ext of imageExts) {
      expect(
        getFileType({
          name: `test.${ext}`,
          url: `http://example.com/test.${ext}`
        })
      ).toBe('img');
    }
  });

  test('JS 文件类型识别', () => {
    const exts = ['js', 'mjs', 'cjs', 'ts', 'jsx', 'tsx'];
    for (const ext of exts) {
      expect(
        getFileType({ name: `test.${ext}`, url: `/path/test.${ext}` })
      ).toBe('js');
    }
  });

  test('CSS 文件类型识别', () => {
    const exts = ['css', 'scss', 'sass', 'less'];
    for (const ext of exts) {
      expect(
        getFileType({ name: `test.${ext}`, url: `/path/test.${ext}` })
      ).toBe('css');
    }
  });

  test('Word 文件类型识别', () => {
    expect(getFileType({ name: 'doc.doc', url: '/path/doc.doc' })).toBe('word');
    expect(getFileType({ name: 'doc.docx', url: '/path/doc.docx' })).toBe(
      'word'
    );
  });

  test('Excel 文件类型识别', () => {
    expect(getFileType({ name: 'sheet.xls', url: '/path/sheet.xls' })).toBe(
      'excel'
    );
    expect(getFileType({ name: 'sheet.xlsx', url: '/path/sheet.xlsx' })).toBe(
      'excel'
    );
  });

  test('PPT 文件类型识别', () => {
    expect(getFileType({ name: 'slide.ppt', url: '/path/slide.ppt' })).toBe(
      'ppt'
    );
    expect(getFileType({ name: 'slide.pptx', url: '/path/slide.pptx' })).toBe(
      'ppt'
    );
  });

  test('压缩文件类型识别', () => {
    expect(getFileType({ name: 'archive.zip', url: '/path/archive.zip' })).toBe(
      'zip'
    );
    expect(getFileType({ name: 'archive.rar', url: '/path/archive.rar' })).toBe(
      'zip'
    );
  });

  test('视频文件类型识别', () => {
    expect(getFileType({ name: 'video.mp4', url: '/path/video.mp4' })).toBe(
      'video'
    );
    expect(getFileType({ name: 'video.wmv', url: '/path/video.wmv' })).toBe(
      'video'
    );
  });

  test('音频文件类型识别', () => {
    expect(getFileType({ name: 'audio.mp3', url: '/path/audio.mp3' })).toBe(
      'audio'
    );
    expect(getFileType({ name: 'audio.wma', url: '/path/audio.wma' })).toBe(
      'audio'
    );
  });

  test('PDF 文件类型识别', () => {
    expect(getFileType({ name: 'doc.pdf', url: '/path/doc.pdf' })).toBe('pdf');
  });

  test('JSON 文件类型识别', () => {
    expect(getFileType({ name: 'data.json', url: '/path/data.json' })).toBe(
      'json'
    );
  });

  test('未知扩展名返回 unknow', () => {
    expect(getFileType({ name: 'file.xyz', url: '/path/file.xyz' })).toBe(
      'unknow'
    );
  });

  test('无扩展名返回 unknow', () => {
    expect(getFileType({ name: 'README', url: '/path/README' })).toBe('unknow');
  });

  test('URL 包含 query 参数也能正确识别', () => {
    expect(
      getFileType({ name: 'photo.jpg', url: '/upload/photo.jpg?t=123' })
    ).toBe('img');
  });
});

describe('isImage', () => {
  test('图片文件返回 true', () => {
    expect(isImage({ name: 'img.png', url: '/path/img.png' })).toBe(true);
  });

  test('非图片文件返回 false', () => {
    expect(isImage({ name: 'doc.pdf', url: '/path/doc.pdf' })).toBe(false);
  });
});

describe('toAttachmentFile', () => {
  test('基础 url 和 name 映射', () => {
    const file = { url: '/upload/test.jpg', name: 'test.jpg' };
    const result = toAttachmentFile(file);
    expect(result.url).toBe('/upload/test.jpg');
    expect(result.name).toBe('test.jpg');
    expect(result.type).toBe('img');
  });

  test('response 中的字段会合并', () => {
    const file = {
      url: '/upload/test.pdf',
      name: 'test.pdf',
      response: { id: '123', url: '/cdn/test.pdf' }
    };
    const result = toAttachmentFile(file);
    expect(result.id).toBe('123');
    expect(result.type).toBe('pdf');
  });
});
