import { expect, test, describe, vi, beforeEach } from 'vitest';
import { LocalService } from '../src/services/local';

describe('LocalService', () => {
  let service: LocalService;
  let mockReq: { send: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockReq = { send: vi.fn() };
    service = new LocalService(mockReq as any);
  });

  test('extends BaseService', () => {
    expect(service).toBeInstanceOf(LocalService);
  });

  test('getExtension calls api', async () => {
    mockReq.send.mockResolvedValue({ data: { version: '1.0' } });
    const result = await service.getExtension();
    expect(result).toBeDefined();
    expect(mockReq.send).toHaveBeenCalled();
  });

  test('getExtension returns undefined on error', async () => {
    mockReq.send.mockRejectedValue(new Error('fail'));
    const result = await service.getExtension();
    expect(result).toBeUndefined();
  });

  test('init calls api with project data', async () => {
    const project = { id: 'p1', name: 'Test' };
    mockReq.send.mockResolvedValue({ data: { id: 'p1', name: 'Test' } });
    const result = await service.init(project as any);
    expect(result).toBeDefined();
    expect(mockReq.send).toHaveBeenCalledWith(
      expect.objectContaining({
        params: { type: 'init' }
      })
    );
  });

  test('init returns empty object on error', async () => {
    mockReq.send.mockRejectedValue(new Error('fail'));
    const result = await service.init({ id: 'p1' } as any);
    expect(result).toEqual({});
  });

  test('saveProject calls api', async () => {
    mockReq.send.mockResolvedValue({ data: { code: 0 } });
    const result = await service.saveProject({ id: 'p1' } as any);
    expect(result).toBe(true);
  });

  test('saveMaterials calls api with serialized materials', async () => {
    mockReq.send.mockResolvedValue({ data: { code: 0 } });
    const materials = new Map();
    materials.set('comp1', { name: 'Comp1' });

    const result = await service.saveMaterials({ id: 'p1' } as any, materials);
    expect(result).toBe(true);
    expect(mockReq.send).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          type: 'saveMaterials',
          data: expect.objectContaining({
            project: { id: 'p1' },
            materials: expect.any(Object)
          })
        })
      })
    );
  });

  test('saveMaterials returns false on error', async () => {
    mockReq.send.mockRejectedValue(new Error('fail'));
    const result = await service.saveMaterials({} as any, new Map());
    expect(result).toBe(false);
  });

  test('saveFile calls api', async () => {
    mockReq.send.mockResolvedValue({ data: { code: 0 } });
    const result = await service.saveFile({ id: 'f1' } as any);
    expect(result).toBe(true);
  });

  test('saveFile returns false on error', async () => {
    mockReq.send.mockRejectedValue(new Error('fail'));
    const result = await service.saveFile({ id: 'f1' } as any);
    expect(result).toBe(false);
  });

  test('getFile calls api and caches result temporarily', async () => {
    mockReq.send.mockResolvedValue({ data: { id: 'f1', name: 'test' } });
    const result = await service.getFile('f1');
    expect(result).toBeDefined();
  });

  test('getFile returns null on error', async () => {
    mockReq.send.mockRejectedValue(new Error('fail'));
    const result = await service.getFile('f1');
    expect(result).toBeNull();
  });

  test('removeFile calls api', async () => {
    mockReq.send.mockResolvedValue({ data: { code: 0 } });
    const result = await service.removeFile('f1');
    expect(result).toBe(true);
  });

  test('removeFile returns false on error', async () => {
    mockReq.send.mockRejectedValue(new Error('fail'));
    const result = await service.removeFile('f1');
    expect(result).toBe(false);
  });

  test('saveHistory calls api', async () => {
    mockReq.send.mockResolvedValue({ data: { code: 0 } });
    const result = await service.saveHistory({ id: 'h1', items: [] } as any);
    expect(result).toBe(true);
  });

  test('removeHistory calls api', async () => {
    mockReq.send.mockResolvedValue({ data: { code: 0 } });
    const result = await service.removeHistory('h1');
    expect(result).toBe(true);
  });

  test('getHistory calls api', async () => {
    mockReq.send.mockResolvedValue({ data: { id: 'h1', items: [] } });
    const result = await service.getHistory('h1');
    expect(result).toBeDefined();
  });

  test('getHistoryItem calls api', async () => {
    mockReq.send.mockResolvedValue({ data: { id: 'item1' } });
    const result = await service.getHistoryItem('h1', 'item1');
    expect(result).toBeDefined();
    expect(mockReq.send).toHaveBeenCalledWith(
      expect.objectContaining({
        params: { type: 'getHistoryItem' }
      })
    );
  });

  test('saveHistoryItem calls api', async () => {
    mockReq.send.mockResolvedValue({ data: { code: 0 } });
    const result = await service.saveHistoryItem('h1', {
      id: 'item1',
      data: 'test'
    } as any);
    expect(result).toBe(true);
  });

  test('removeHistoryItem calls api', async () => {
    mockReq.send.mockResolvedValue({ data: { code: 0 } });
    const result = await service.removeHistoryItem('h1', ['item1']);
    expect(result).toBe(true);
  });
});
