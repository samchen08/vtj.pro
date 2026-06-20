import { describe, it, expect, vi } from 'vitest';
import { ToolRegistry, type Tool } from '../src/framework/ToolRegistry';

function createTool(
  name: string,
  handler?: (...args: any[]) => Promise<any>
): Tool {
  return {
    name,
    description: `Tool ${name}`,
    parameters: [],
    handler: handler || (async () => `result-${name}`)
  };
}

describe('ToolRegistry', () => {
  it('registers a tool and retrieves it', () => {
    const registry = new ToolRegistry();
    const tool = createTool('test');
    registry.register(tool);
    expect(registry.get('test')).toBe(tool);
    expect(registry.has('test')).toBe(true);
  });

  it('warns and overwrites when registering duplicate name', () => {
    const registry = new ToolRegistry();
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    registry.register(createTool('dup'));
    registry.register(createTool('dup'));
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('already exists')
    );
    warnSpy.mockRestore();
  });

  it('returns undefined for non-existent tool', () => {
    const registry = new ToolRegistry();
    expect(registry.get('missing')).toBeUndefined();
    expect(registry.has('missing')).toBe(false);
  });

  it('modifies an existing tool with set', () => {
    const registry = new ToolRegistry();
    registry.register(createTool('mod'));
    registry.set('mod', { description: 'Updated' });
    expect(registry.get('mod')?.description).toBe('Updated');
  });

  it('warns when setting a non-existent tool', () => {
    const registry = new ToolRegistry();
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    registry.set('missing', { description: 'x' });
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('is not found')
    );
    warnSpy.mockRestore();
  });

  it('unregisters a tool', () => {
    const registry = new ToolRegistry();
    registry.register(createTool('del'));
    registry.unregister('del');
    expect(registry.has('del')).toBe(false);
  });

  it('returns all registered tools', () => {
    const registry = new ToolRegistry();
    registry.register(createTool('a'));
    registry.register(createTool('b'));
    expect(registry.getAll()).toHaveLength(2);
  });

  it('executes a tool successfully', async () => {
    const registry = new ToolRegistry();
    registry.register(
      createTool('exec', async (a: number, b: number) => a + b)
    );
    const result = await registry.execute('exec', [2, 3]);
    expect(result).toBe(5);
  });

  it('throws when executing non-existent tool', async () => {
    const registry = new ToolRegistry();
    await expect(registry.execute('missing')).rejects.toThrow(
      "Tool 'missing' not found"
    );
  });

  it('throws when tool handler fails', async () => {
    const registry = new ToolRegistry();
    registry.register(
      createTool('fail', async () => {
        throw new Error('boom');
      })
    );
    await expect(registry.execute('fail')).rejects.toThrow(
      "Failed to execute tool 'fail': boom"
    );
  });

  it('generates tool descriptions with nested parameters', () => {
    const registry = new ToolRegistry();
    const tool: Tool = {
      name: 'complex',
      description: 'A complex tool',
      parameters: [
        {
          name: 'config',
          type: 'object',
          properties: {
            host: { type: 'string', description: 'Host name' },
            port: { type: 'number', required: true }
          }
        },
        {
          name: 'tags',
          type: 'array',
          items: { type: 'string' }
        }
      ],
      handler: async () => {}
    };
    registry.register(tool);
    const descriptions = registry.generateToolDescriptions();
    expect(descriptions).toHaveLength(1);
    const desc = descriptions[0];
    expect(desc.name).toBe('complex');
    expect(desc.parameters[0].properties).toBeDefined();
    expect(desc.parameters[1].items).toBeDefined();
  });

  it('clears all tools', () => {
    const registry = new ToolRegistry();
    registry.register(createTool('x'));
    registry.clear();
    expect(registry.getAll()).toHaveLength(0);
  });
});
