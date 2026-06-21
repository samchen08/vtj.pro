import { expect, test, describe, vi, beforeEach } from 'vitest';
import { StorageService } from '../src/services/storage';

test('StorageService.init saves project to localStorage and returns merged data', async () => {
  const service = new StorageService();
  const project = { id: 'proj1', name: 'Test' };
  const result = await service.init(project as any);
  expect(result).toBeDefined();
  expect((result as any).id).toBe('proj1');
});

test('StorageService.saveProject saves to localStorage', async () => {
  const service = new StorageService();
  const project = { id: 'proj1', name: 'Test' };
  const result = await service.saveProject(project as any);
  expect(result).toBe(true);
});

test('StorageService.saveMaterials saves materials to localStorage', async () => {
  const service = new StorageService();
  const project = { id: 'proj1' };
  const materials = new Map();
  materials.set('comp1', { name: 'Comp1' });
  const result = await service.saveMaterials(project as any, materials);
  expect(result).toBe(true);
});

test('StorageService.saveFile saves file to localStorage', async () => {
  const service = new StorageService();
  const file = { id: 'file1', name: 'test' };
  const result = await service.saveFile(file as any);
  expect(result).toBe(true);
});

test('StorageService.getFile retrieves file from localStorage', async () => {
  const service = new StorageService();
  const file = { id: 'file1', name: 'test' };
  await service.saveFile(file as any);
  const result = await service.getFile('file1');
  expect((result as any).id).toBe('file1');
  expect((result as any).name).toBe('test');
});

test('StorageService.getFile rejects for non-existent file', async () => {
  const service = new StorageService();
  await expect(service.getFile('nonexistent')).rejects.toBeNull();
});

test('StorageService.removeFile removes file from localStorage', async () => {
  const service = new StorageService();
  const file = { id: 'file1', name: 'test' };
  await service.saveFile(file as any);
  const result = await service.removeFile('file1');
  expect(result).toBe(true);
  await expect(service.getFile('file1')).rejects.toBeNull();
});

test('StorageService.saveHistory saves history to localStorage', async () => {
  const service = new StorageService();
  const history = { id: 'hist1', items: [] };
  const result = await service.saveHistory(history as any);
  expect(result).toBe(true);
});

test('StorageService.getHistory returns history from localStorage', async () => {
  const service = new StorageService();
  const history = { id: 'hist1', items: [] };
  await service.saveHistory(history as any);
  const result = await service.getHistory('hist1');
  expect(result).toBeDefined();
  expect((result as any).id).toBe('hist1');
});

test('StorageService.removeHistory removes history and its items', async () => {
  const service = new StorageService();
  const history = { id: 'hist1', items: [{ id: 'item1' }] };
  await service.saveHistory(history as any);
  await service.saveHistoryItem('hist1', { id: 'item1', data: 'test' } as any);
  const result = await service.removeHistory('hist1');
  expect(result).toBe(true);
});

test('StorageService.saveHistoryItem saves history item', async () => {
  const service = new StorageService();
  const result = await service.saveHistoryItem('hist1', {
    id: 'item1',
    data: 'test'
  } as any);
  expect(result).toBe(true);
});

test('StorageService.getHistoryItem retrieves history item', async () => {
  const service = new StorageService();
  await service.saveHistoryItem('hist1', {
    id: 'item1',
    data: 'test'
  } as any);
  const result = await service.getHistoryItem('hist1', 'item1');
  expect(result).toBeDefined();
  expect((result as any).data).toBe('test');
});

test('StorageService.removeHistoryItem removes history items', async () => {
  const service = new StorageService();
  await service.saveHistoryItem('hist1', { id: 'item1', data: 'test' } as any);
  const result = await service.removeHistoryItem('hist1', ['item1']);
  expect(result).toBe(true);
  const item = await service.getHistoryItem('hist1', 'item1');
  // storage.get returns null when key not found
  expect(item).toBeNull();
});
