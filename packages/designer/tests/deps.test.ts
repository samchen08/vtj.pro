import { describe, it, expect } from 'vitest';
import { DepsManager } from '../src/managers/deps';
import type { Dependencie, PlatformType } from '@vtj/core';

function createDep(pkg: string, extra?: Partial<Dependencie>): Dependencie {
  return {
    package: pkg,
    version: '1.0.0',
    library: pkg,
    enabled: true,
    ...extra
  } as Dependencie;
}

describe('DepsManager', () => {
  it('gets and sets built-in deps', () => {
    const manager = new DepsManager();
    const initial = manager.get();
    expect(initial.length).toBeGreaterThan(0);

    const newDeps = [createDep('a')];
    manager.set(newDeps);
    expect(manager.get()).toEqual(newDeps);
  });

  it('adds a new dep', () => {
    const manager = new DepsManager([]);
    manager.add(createDep('new-pkg'));
    expect(manager.get()).toHaveLength(1);
    expect(manager.get()[0].package).toBe('new-pkg');
  });

  it('merges dep when adding existing package', () => {
    const manager = new DepsManager([]);
    manager.add(createDep('pkg', { version: '1.0.0', enabled: false }));
    manager.add(createDep('pkg', { version: '2.0.0', enabled: true }));
    const dep = manager.get()[0];
    expect(dep.version).toBe('2.0.0');
    expect(dep.enabled).toBe(true);
  });

  it('saves dep when package is provided', () => {
    const manager = new DepsManager([]);
    manager.save({ package: 'saved', version: '1.0.0' });
    expect(manager.get()[0].package).toBe('saved');
  });

  it('ignores save when package is missing', () => {
    const manager = new DepsManager([]);
    manager.save({ version: '1.0.0' });
    expect(manager.get()).toHaveLength(0);
  });

  it('merges project deps with built-in deps', () => {
    const builtIn = [
      createDep('vue', { enabled: true }),
      createDep('pinia', { enabled: true })
    ];
    const manager = new DepsManager(builtIn);
    const projectDeps = [
      createDep('vue', { enabled: false }),
      createDep('custom', { enabled: true })
    ];
    const merged = manager.merge(projectDeps);
    const vueDep = merged.find((d: Dependencie) => d.package === 'vue');
    const piniaDep = merged.find((d: Dependencie) => d.package === 'pinia');
    const customDep = merged.find((d: Dependencie) => d.package === 'custom');

    expect(vueDep?.enabled).toBe(false);
    expect(piniaDep?.enabled).toBe(true);
    expect(customDep?.enabled).toBe(true);
  });

  it('filters deps by platform', () => {
    const deps = [
      createDep('universal'),
      createDep('web', { platform: 'web' as PlatformType }),
      createDep('uni', { platform: 'uniapp' as PlatformType })
    ];
    const manager = new DepsManager(deps);
    const merged = manager.merge([], 'web');
    expect(
      merged.find((d: Dependencie) => d.package === 'universal')
    ).toBeDefined();
    expect(merged.find((d: Dependencie) => d.package === 'web')).toBeDefined();
    expect(
      merged.find((d: Dependencie) => d.package === 'uni')
    ).toBeUndefined();
  });

  it('filters deps by platform array', () => {
    const deps = [
      createDep('multi', { platform: ['web', 'h5'] as PlatformType[] }),
      createDep('uni', { platform: 'uniapp' as PlatformType })
    ];
    const manager = new DepsManager(deps);
    const merged = manager.merge([], 'h5');
    expect(
      merged.find((d: Dependencie) => d.package === 'multi')
    ).toBeDefined();
    expect(
      merged.find((d: Dependencie) => d.package === 'uni')
    ).toBeUndefined();
  });

  it('removes a dep by package name', () => {
    const manager = new DepsManager([createDep('del')]);
    manager.remove('del');
    expect(manager.get()).toHaveLength(0);
  });
});
