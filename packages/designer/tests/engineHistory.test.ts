import { ref, toRaw } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import {
  BlockModel,
  HistoryModel,
  ProjectModel,
  type ProjectSchema
} from '@vtj/core';
import { Engine } from '../src/framework/engine';

function createEngine(saved: boolean = true) {
  const project = new ProjectModel({
    id: 'project-1',
    name: 'CurrentProject',
    locked: 'current-user',
    __BASE_PATH__: '/current/',
    __UID__: 'current-uid',
    pages: [{ id: 'page-1', name: 'PageOne', type: 'page' }]
  });
  project.active(project.getFile('page-1')!, true);

  const engine = Object.create(Engine.prototype) as Engine;
  const saveProject = vi.fn(async () => saved);
  Object.assign(engine, {
    project: ref(project),
    current: ref(new BlockModel({ id: 'page-1', name: 'PageOne' })),
    history: ref(null),
    provider: {},
    report: { setProject: vi.fn() },
    service: { saveProject },
    updateCurrent: vi.fn()
  });
  return { engine, project, saveProject };
}

function createHistoryDsl(): ProjectSchema {
  return {
    id: 'project-1',
    name: 'HistoryProject',
    locked: 'old-user',
    __BASE_PATH__: '/old/',
    __UID__: 'old-uid',
    __VTJ_PROJECT__: true,
    pages: [{ id: 'page-1', name: 'OldPage', type: 'page' }]
  };
}

describe('Engine project history', () => {
  it('records project dsl after a successful save', async () => {
    const { engine, project, saveProject } = createEngine();
    const projectHistory = new HistoryModel({
      id: '__project__',
      type: 'project'
    });
    Object.assign(engine, {
      projectHistory: ref(projectHistory),
      state: { autoHistory: true },
      checkLocked: vi.fn(() => false)
    });

    await (engine as any).saveProject({
      model: project,
      type: 'update',
      data: null
    });

    expect(saveProject).toHaveBeenCalledOnce();
    expect(projectHistory.items).toHaveLength(1);
    expect(projectHistory.items[0].dsl).toMatchObject({
      id: 'project-1',
      __VTJ_PROJECT__: true
    });
  });

  it('does not record a project dsl when saving fails', async () => {
    const { engine, project } = createEngine(false);
    const projectHistory = new HistoryModel({
      id: '__project__',
      type: 'project'
    });
    Object.assign(engine, {
      projectHistory: ref(projectHistory),
      state: { autoHistory: true },
      checkLocked: vi.fn(() => false)
    });

    await (engine as any).saveProject({
      model: project,
      type: 'update',
      data: null
    });

    expect(projectHistory.items).toHaveLength(0);
  });

  it('restores project dsl and preserves runtime fields', async () => {
    const { engine, project, saveProject } = createEngine();
    saveProject.mockImplementationOnce(async () => {
      expect(toRaw(engine.project.value)).toBe(project);
      return true;
    });

    await (engine as any).loadProjectHistory(createHistoryDsl());

    expect(toRaw(engine.project.value)).not.toBe(project);
    expect(engine.project.value?.name).toBe('HistoryProject');
    expect(engine.project.value?.locked).toBe('current-user');
    expect(engine.project.value?.__BASE_PATH__).toBe('/current/');
    expect(engine.project.value?.__UID__).toBe('current-uid');
    expect(engine.project.value?.currentFile?.id).toBe('page-1');
    expect(engine.provider.project).toBe(toRaw(engine.project.value));
  });

  it('does not replace current project when persistence fails', async () => {
    const { engine, project } = createEngine(false);

    await expect(
      (engine as any).loadProjectHistory(createHistoryDsl())
    ).rejects.toThrow('Save project history fail');

    expect(toRaw(engine.project.value)).toBe(project);
  });

  it('rejects history from another project', async () => {
    const { engine, project, saveProject } = createEngine();

    await expect(
      (engine as any).loadProjectHistory({
        ...createHistoryDsl(),
        id: 'project-2'
      })
    ).rejects.toThrow('Invalid project history');

    expect(saveProject).not.toHaveBeenCalled();
    expect(toRaw(engine.project.value)).toBe(project);
  });
});
