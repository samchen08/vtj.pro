import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { useFileRecognition } from '../src/components/widgets/agent/composables/useFileRecognition';

function createFile(name: string, type: string): File {
  return new File(['content'], name, { type });
}

describe('useFileRecognition', () => {
  let createObjectURL: ReturnType<typeof vi.fn>;
  let revokeObjectURL: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    createObjectURL = vi.fn(() => 'blob:preview');
    revokeObjectURL = vi.fn();
    vi.stubGlobal('URL', {
      ...URL,
      createObjectURL,
      revokeObjectURL
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('tracks upload state while recognizing an image', async () => {
    const recognitionFile = vi.fn(async () => ({ content: '一个图表' }));
    const { files, recognizing, uploadFile } =
      useFileRecognition(recognitionFile);

    await uploadFile(createFile('chart.png', 'image/png'));

    expect(files.value).toHaveLength(1);
    const record = files.value[0];
    expect(record.type).toBe('image');
    expect(record.previewUrl).toBe('blob:preview');
    expect(record.description).toBe('一个图表');
    expect(record.recognizing).toBe(false);
    expect(record.error).toBe('');
    expect(recognizing.value).toBe(false);
    expect(createObjectURL).toHaveBeenCalledTimes(1);
  });

  it('prefers content over title as description', async () => {
    const recognitionFile = vi.fn(async () => ({
      title: '标题',
      content: '内容'
    }));
    const { files, uploadFile } = useFileRecognition(recognitionFile);

    await uploadFile(createFile('data.json', 'application/json'));

    expect(files.value[0].description).toBe('内容');
    expect(files.value[0].previewUrl).toBe('');
  });

  it('falls back to title when content is missing', async () => {
    const recognitionFile = vi.fn(async () => ({ title: '仅标题' }));
    const { files, uploadFile } = useFileRecognition(recognitionFile);

    await uploadFile(createFile('data.json', 'application/json'));

    expect(files.value[0].description).toBe('仅标题');
  });

  it('records the error when recognition fails', async () => {
    const recognitionFile = vi.fn(async () => {
      throw new Error('识别接口超时');
    });
    const { files, uploadFile } = useFileRecognition(recognitionFile);

    await uploadFile(createFile('bad.png', 'image/png'));

    expect(files.value[0].recognizing).toBe(false);
    expect(files.value[0].error).toBe('识别接口超时');
    expect(files.value[0].description).toBe('');
  });

  it('detects json type from file extension when mime is generic', async () => {
    const recognitionFile = vi.fn(async () => ({}));
    const { files, uploadFile } = useFileRecognition(recognitionFile);

    await uploadFile(createFile('schema.json', 'text/plain'));

    expect(files.value[0].type).toBe('json');
  });

  it('removeFile revokes the preview url and removes the record', async () => {
    const recognitionFile = vi.fn(async () => ({}));
    const { files, uploadFile, removeFile } =
      useFileRecognition(recognitionFile);

    await uploadFile(createFile('chart.png', 'image/png'));
    const id = files.value[0].id;

    removeFile(id);

    expect(files.value).toHaveLength(0);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:preview');
  });

  it('buildFilePrompt filters out pending, empty and failed files', async () => {
    const recognitionFile = vi.fn(async (file: File) => {
      if (file.name === 'bad.json') throw new Error('识别失败');
      return { content: `描述:${file.name}` };
    });
    const { uploadFile, buildFilePrompt } = useFileRecognition(recognitionFile);

    await uploadFile(createFile('a.json', 'application/json'));
    await uploadFile(createFile('bad.json', 'application/json'));
    await uploadFile(createFile('c.png', 'image/png'));

    const prompt = buildFilePrompt();
    expect(prompt).toContain('[JSON描述: a.json]');
    expect(prompt).toContain('描述:a.json');
    expect(prompt).toContain('[图片描述: c.png]');
    expect(prompt).not.toContain('bad.json');
  });

  it('clearFiles empties the list and revokes all preview urls', async () => {
    const recognitionFile = vi.fn(async () => ({}));
    const { files, uploadFile, clearFiles } =
      useFileRecognition(recognitionFile);

    await uploadFile(createFile('a.png', 'image/png'));
    await uploadFile(createFile('b.png', 'image/png'));

    clearFiles();

    expect(files.value).toHaveLength(0);
    expect(revokeObjectURL).toHaveBeenCalledTimes(2);
  });
});
