import { describe, it, expect, vi } from 'vitest';
import { WidgetManager } from '../src/managers/widget';
import { RegionType, type Widget } from '../src/framework';

function createWidget(
  name: string,
  region: keyof typeof RegionType = 'Brand',
  extra?: Partial<Widget>
): Widget {
  return {
    name,
    region,
    component: {},
    ...extra
  };
}

describe('WidgetManager', () => {
  it('registers and gets a widget', () => {
    const manager = new WidgetManager([]);
    const w = createWidget('TestWidget');
    manager.register(w);
    expect(manager.get('TestWidget')).toBe(w);
  });

  it('returns undefined for missing widget', () => {
    const manager = new WidgetManager([]);
    expect(manager.get('NonExistent')).toBeUndefined();
  });

  it('modifies an existing widget', () => {
    const manager = new WidgetManager([]);
    const w = createWidget('ModWidget');
    manager.register(w);
    manager.set('ModWidget', { region: 'Toolbar' });
    expect(manager.get('ModWidget')?.region).toBe('Toolbar');
  });

  it('warns when setting a missing widget', () => {
    const manager = new WidgetManager([]);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    manager.set('MissingWidget', { region: 'Toolbar' });
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('is not found')
    );
    warnSpy.mockRestore();
  });

  it('unregisters a widget', () => {
    const manager = new WidgetManager([]);
    const w = createWidget('DelWidget');
    manager.register(w);
    manager.unregister('DelWidget');
    expect(manager.get('DelWidget')).toBeUndefined();
  });

  it('filters widgets by region', () => {
    const manager = new WidgetManager([
      createWidget('A', 'Brand'),
      createWidget('B', 'Toolbar')
    ]);
    const widgets = manager.getWidgets('Brand');
    expect(widgets).toHaveLength(1);
    expect(widgets[0].name).toBe('A');
  });

  it('filters widgets by region and group', () => {
    const manager = new WidgetManager([
      createWidget('A', 'Status', { group: 'Left' }),
      createWidget('B', 'Status', { group: 'Right' })
    ]);
    const widgets = manager.getWidgets('Status', 'Left');
    expect(widgets).toHaveLength(1);
    expect(widgets[0].name).toBe('A');
  });

  it('sorts widgets by order', () => {
    const manager = new WidgetManager([
      createWidget('SortA', 'Status', { group: 'Left', order: 10 }),
      createWidget('SortB', 'Status', { group: 'Left', order: 5 })
    ]);
    const widgets = manager.getWidgets('Status', 'Left');
    const names = widgets.map((w) => w.name);
    expect(names.indexOf('SortB')).toBeLessThan(names.indexOf('SortA'));
  });

  it('returns all widgets when no region specified', () => {
    const manager = new WidgetManager([
      createWidget('A', 'Brand'),
      createWidget('B', 'Toolbar')
    ]);
    expect(manager.getWidgets()).toHaveLength(2);
  });

  it('gets remote widgets', () => {
    const manager = new WidgetManager([
      createWidget('Local', 'Apps'),
      createWidget('RemoteA', 'Apps', { remote: true }),
      createWidget('RemoteB', 'Apps', { remote: true })
    ]);
    const remotes = manager.getRemoteWidgets();
    expect(remotes).toHaveLength(2);
    expect(remotes.map((w) => w.name)).toContain('RemoteA');
    expect(remotes.map((w) => w.name)).toContain('RemoteB');
  });

  it('removes all remote widgets', () => {
    const manager = new WidgetManager([
      createWidget('Local', 'Apps'),
      createWidget('TempRemote', 'Apps', { remote: true })
    ]);
    manager.removeRemoteWidgets();
    expect(manager.get('TempRemote')).toBeUndefined();
    expect(manager.get('Local')).toBeDefined();
  });
});
