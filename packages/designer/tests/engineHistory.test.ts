import { ref, toRaw } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import {
  BlockModel,
  HistoryModel,
  ProjectModel,
  type BlockSchema,
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

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((r) => {
    resolve = r;
  });
  return { promise, resolve };
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

describe('Engine active file', () => {
  it('ignores an earlier file request that finishes after the active page', async () => {
    const project = new ProjectModel({
      id: 'project-1',
      name: 'ProjectOne',
      pages: [
        { id: 'page-1', name: 'PageOne', type: 'page' },
        { id: 'page-2', name: 'PageTwo', type: 'page' }
      ]
    });
    const pageOne = project.getFile('page-1')!;
    const pageTwo = project.getFile('page-2')!;
    const first = deferred<BlockSchema>();
    const second = deferred<BlockSchema>();
    const engine = Object.create(Engine.prototype) as Engine;
    const updateCurrent = vi.fn(async (block: BlockModel) => {
      engine.current.value = block;
    });
    Object.assign(engine, {
      project: ref(project),
      current: ref(null),
      history: ref(null),
      service: {
        getFile: vi.fn((id: string) =>
          id === 'page-1' ? first.promise : second.promise
        ),
        getHistory: vi.fn(async () => ({}))
      },
      updateCurrent
    });

    project.active(pageOne, true);
    const loadOne = (engine as any).activeFile({ model: project });
    await Promise.resolve();
    project.active(pageTwo, true);
    const loadTwo = (engine as any).activeFile({ model: project });
    second.resolve({ id: 'page-2', name: 'PageTwo' });
    await loadTwo;
    first.resolve({ id: 'page-1', name: 'PageOne' });
    await loadOne;

    expect(updateCurrent).toHaveBeenCalledOnce();
    expect(engine.current.value?.id).toBe('page-2');
  });
});
