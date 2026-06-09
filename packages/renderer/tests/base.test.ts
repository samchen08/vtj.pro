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

test('createServiceRequest creates a request instance', () => {
  const notify = vi.fn();
  const req = createServiceRequest(notify);
  expect(req).toBeDefined();
  expect(typeof req.send).toBe('function');
});
