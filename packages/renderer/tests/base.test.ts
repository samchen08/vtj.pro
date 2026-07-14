import { expect, test, describe, vi, beforeEach } from 'vitest';
import { BaseService } from '../src/services/base';
import { createServiceRequest } from '../src/services/base';

test('BaseService constructor sets api and uploader', () => {
  const mockReq = { send: vi.fn() };
  const service = new BaseService(mockReq as any);
  expect(service).toBeInstanceOf(BaseService);
  expect((service as any).req).toBe(mockReq);
});

test('BaseService.saveProject calls api', async () => {
  const mockReq = { send: vi.fn().mockResolvedValue({ data: { code: 0 } }) };
  const service = new BaseService(mockReq as any);
  const result = await service.saveProject({ id: 'test' } as any);
  expect(result).toBe(true);
  expect(mockReq.send).toHaveBeenCalled();
});

test('BaseService.saveProject returns false on error', async () => {
  const mockReq = { send: vi.fn().mockRejectedValue(new Error('fail')) };
  const service = new BaseService(mockReq as any);
  const result = await service.saveProject({ id: 'test' } as any);
  expect(result).toBe(false);
});

test('BaseService.publish calls api', async () => {
  const mockReq = { send: vi.fn().mockResolvedValue({ data: { code: 0 } }) };
  const service = new BaseService(mockReq as any);
  const result = await service.publish({ id: 'test' } as any);
  expect(result).toBe(true);
});

test('BaseService.publishFile calls api', async () => {
  const mockReq = { send: vi.fn().mockResolvedValue({ data: { code: 0 } }) };
  const service = new BaseService(mockReq as any);
  const result = await service.publishFile(
    { id: 'test' } as any,
    { id: 'file1' } as any
  );
  expect(result).toBe(true);
});

test('BaseService.genVueContent calls api', async () => {
  const mockReq = {
    send: vi.fn().mockResolvedValue({ data: { code: 0, data: '<template>' } })
  };
  const service = new BaseService(mockReq as any);
  const result = await service.genVueContent(
    { id: 'test' } as any,
    { id: 'dsl1' } as any
  );
  // Returns the full response object since genVueContent returns the api result directly
  expect(result).toBeDefined();
  expect(mockReq.send).toHaveBeenCalled();
});

test('BaseService.getExtension returns undefined', async () => {
  const service = new BaseService();
  const result = await service.getExtension();
  expect(result).toBeUndefined();
});

test('BaseService.init returns empty object', async () => {
  const service = new BaseService();
  const result = await service.init({} as any);
  expect(result).toEqual({});
});

test('BaseService.saveMaterials returns false', async () => {
  const service = new BaseService();
  const result = await service.saveMaterials({} as any, new Map());
  expect(result).toBe(false);
});

test('BaseService.saveFile returns false', async () => {
  const service = new BaseService();
  const result = await service.saveFile({} as any);
  expect(result).toBe(false);
});

test('BaseService.getFile returns empty object', async () => {
  const service = new BaseService();
  const result = await service.getFile('id1');
  expect(result).toEqual({});
});

test('BaseService.removeFile returns false', async () => {
  const service = new BaseService();
  const result = await service.removeFile('id1');
  expect(result).toBe(false);
});

test('BaseService.getPluginMaterial returns null for empty urls', async () => {
  const service = new BaseService();
  const result = await service.getPluginMaterial({ urls: [] } as any);
  expect(result).toBeNull();
});

test('BaseService.genSource returns empty string', async () => {
  const service = new BaseService();
  const result = await service.genSource({} as any);
  expect(result).toBe('');
});

test('BaseService.saveHistory', async () => {
  const mockReq = { send: vi.fn().mockResolvedValue({ data: { code: 0 } }) };
  const service = new BaseService(mockReq as any);
  const result = await service.saveHistory({} as any);
  expect(result).toBe(false);
});

test('createServiceRequest creates a request instance', () => {
  const notify = vi.fn();
  const req = createServiceRequest(notify);
  expect(req).toBeDefined();
  expect(typeof req.send).toBe('function');
});

test('BaseService.removeHistory', async () => {
  const service = new BaseService();
  const result = await service.removeHistory('h1');
  expect(result).toBe(false);
});

test('BaseService.getHistory', async () => {
  const service = new BaseService();
  const result = await service.getHistory('h1');
  expect(result).toEqual({});
});

test('BaseService.getHistoryItem', async () => {
  const service = new BaseService();
  const result = await service.getHistoryItem('f1', 'i1');
  expect(result).toEqual({});
});

test('BaseService.saveHistoryItem', async () => {
  const service = new BaseService();
  const result = await service.saveHistoryItem('f1', {} as any);
  expect(result).toBe(false);
});

test('BaseService.removeHistoryItem', async () => {
  const service = new BaseService();
  const result = await service.removeHistoryItem('f1', ['i1']);
  expect(result).toBe(false);
});

test('BaseService.parseVue calls api', async () => {
  const mockReq = { send: vi.fn().mockResolvedValue({ data: { code: 0, data: {} } }) };
  const service = new BaseService(mockReq as any);
  const result = await service.parseVue({ id: 't' } as any, { code: '' } as any);
  expect(result).toBeDefined();
  expect(mockReq.send).toHaveBeenCalled();
});

test('BaseService.createRawPage calls api', async () => {
  const mockReq = { send: vi.fn().mockResolvedValue({ data: { code: 0 } }) };
  const service = new BaseService(mockReq as any);
  const result = await service.createRawPage({ id: 'p1' } as any);
  expect(result).toBeDefined();
});

test('BaseService.removeRawPage calls api', async () => {
  const mockReq = { send: vi.fn().mockResolvedValue({ data: { code: 0 } }) };
  const service = new BaseService(mockReq as any);
  const result = await service.removeRawPage('p1');
  expect(result).toBeDefined();
});

test('BaseService.uploadStaticFile uses uploader', async () => {
  const mockReq = { send: vi.fn().mockResolvedValue({}) };
  const service = new BaseService(mockReq as any);
  const file = new File(['c'], 't.txt');
  const result = await service.uploadStaticFile(file, 'p1');
  expect(result).toBeNull();
});

test('BaseService.getStaticFiles calls api', async () => {
  const mockReq = { send: vi.fn().mockResolvedValue([]) };
  const service = new BaseService(mockReq as any);
  const result = await service.getStaticFiles('p1');
  expect(Array.isArray(result)).toBe(true);
});

test('BaseService.removeStaticFile calls api', async () => {
  const mockReq = { send: vi.fn().mockResolvedValue({ data: { code: 0 } }) };
  const service = new BaseService(mockReq as any);
  const result = await service.removeStaticFile('f.txt', 'p1');
  expect(result).toBeDefined();
});

test('BaseService.clearStaticFiles calls api', async () => {
  const mockReq = { send: vi.fn().mockResolvedValue({ data: { code: 0 } }) };
  const service = new BaseService(mockReq as any);
  const result = await service.clearStaticFiles('p1');
  expect(result).toBeDefined();
});

test('BaseService.getPluginMaterial returns null for non-json urls', async () => {
  const service = new BaseService();
  const result = await service.getPluginMaterial({ urls: ['http://ex.com/m.js'] } as any);
  expect(result).toBeNull();
});

test('createServiceRequest with notify covers error path', () => {
  const notify = vi.fn();
  const req = createServiceRequest(notify);
  expect(req).toBeDefined();
  // notify was passed into createRequest settings
  expect(notify).not.toHaveBeenCalled(); // It's just stored, not called
});

test('BaseService.uploadStaticFile succeeds with array result', async () => {
  const mockReq = {
    send: vi.fn().mockResolvedValue([{ url: 'http://ex.com/file.txt' }])
  };
  const service = new BaseService(mockReq as any);
  const file = new File(['content'], 'test.txt');
  const result = await service.uploadStaticFile(file, 'proj1');
  // uploader returns res[0] when res is an array with first element
  expect(result).toEqual({ url: 'http://ex.com/file.txt' });
});

test('BaseService.uploadStaticFile with empty array returns null', async () => {
  const mockReq = {
    send: vi.fn().mockResolvedValue([])
  };
  const service = new BaseService(mockReq as any);
  const file = new File(['content'], 'test.txt');
  const result = await service.uploadStaticFile(file, 'proj1');
  expect(result).toBeNull();
});
