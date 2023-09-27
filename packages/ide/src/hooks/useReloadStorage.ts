import { Storage } from '@vtj/utils';

const PROJECT_KEY = 'Project';
const FILE_KEY = 'File';

const storage = new Storage({
  prefix: '__VTJ__',
  type: 'local'
});

function createKey(...args: string[]) {
  return args.join('_');
}

async function fetchJson(type: 'file' | 'project', id: string) {
  const base = '/storage';
  return fetch(`${base}/${type}/${id}.json?t=${Date.now()}`)
    .then((res) => res.json())
    .catch((e) => null);
}

async function loadPage(item: any) {
  if (item.children) {
    for (const page of item.children) {
      await loadPage(page);
    }
  } else {
    const page = await fetchJson('file', item.id);
    if (page) {
      storage.save(createKey(FILE_KEY, item.id), page);
    }
  }
}

export async function useReloadStorage(projectId: string) {
  const project = await fetchJson('project', projectId);
  if (project) {
    storage.save(createKey(PROJECT_KEY, projectId), project);
    const { pages = [], blocks = [] } = project;
    for (const item of pages) {
      await loadPage(item);
    }
    for (const item of blocks) {
      const block = await fetchJson('file', item.id);
      if (block) {
        storage.save(createKey(FILE_KEY, item.id), block);
      }
    }
  }
}
