import { expect, test, describe, vi, beforeEach } from 'vitest';
import { MemoryService, createMemoryService } from '../src/services/memory';

test('MemoryService.init creates and stores project', async () => {
  const service = new MemoryService();
  const project = { id: 'proj1', name: 'Test' };
  const result = await service.init(project as any);
  expect(result).toBeDefined();
  expect((result as any).id).toBe('proj1');
});

test('MemoryService.saveProject saves project', async () => {
  const service = new MemoryService();
  const project = { id: 'proj1', name: 'Test' };
  const result = await service.saveProject(project as any);
  expect(result).toBe(true);
});

test('MemoryService.saveMaterials saves materials', async () => {
  const service = new MemoryService();
  const project = { id: 'proj1' };
  const materials = new Map();
  materials.set('comp1', { name: 'Comp1' });
  const result = await service.saveMaterials(project as any, materials);
  expect(result).toBe(true);
});

test('MemoryService.saveFile and getFile roundtrip', async () => {
  const service = new MemoryService();
  const file = { id: 'file1', name: 'test' };
  await service.saveFile(file as any);
  const result = await service.getFile('file1');
  expect((result as any).id).toBe('file1');
  expect((result as any).name).toBe('test');
});

test('MemoryService.getFile rejects for non-existent file', async () => {
  const service = new MemoryService();
  await expect(service.getFile('nonexistent')).rejects.toBeNull();
});

test('MemoryService.removeFile removes file', async () => {
  const service = new MemoryService();
  await service.saveFile({ id: 'file1' } as any);
  const result = await service.removeFile('file1');
  expect(result).toBe(true);
  await expect(service.getFile('file1')).rejects.toBeNull();
});

test('MemoryService.saveHistory and getHistory roundtrip', async () => {
  const service = new MemoryService();
  const history = { id: 'hist1', items: [] };
  await service.saveHistory(history as any);
  const result = await service.getHistory('hist1');
  expect(result).toBeDefined();
  expect((result as any).id).toBe('hist1');
});

test('MemoryService.removeHistory removes history and items', async () => {
  const service = new MemoryService();
  const history = { id: 'hist1', items: [{ id: 'item1' }] };
  await service.saveHistory(history as any);
  await service.saveHistoryItem('hist1', { id: 'item1', data: 'test' } as any);
  const result = await service.removeHistory('hist1');
  expect(result).toBe(true);
});

test('MemoryService.saveHistoryItem and getHistoryItem roundtrip', async () => {
  const service = new MemoryService();
  await service.saveHistoryItem('hist1', {
    id: 'item1',
    data: 'test'
  } as any);
  const result = await service.getHistoryItem('hist1', 'item1');
  expect((result as any).data).toBe('test');
});

test('MemoryService.removeHistoryItem removes items', async () => {
  const service = new MemoryService();
  await service.saveHistoryItem('hist1', { id: 'item1', data: 'test' } as any);
  const result = await service.removeHistoryItem('hist1', ['item1']);
  expect(result).toBe(true);
});

test('createMemoryService returns singleton', () => {
  const service1 = createMemoryService();
  const service2 = createMemoryService();
  expect(service1).toBe(service2);
});
