import { expect, test, describe } from 'vitest';
import { EventModel } from '../../src/models';
import type { NodeEvents, NodeEvent } from '../../src/protocols';

describe('EventModel', () => {
  test('should create from NodeEvent schema', () => {
    const schema: NodeEvent = {
      name: 'click',
      handler: { type: 'JSFunction', value: 'function() {}' }
    };
    const event = new EventModel(schema);
    expect(event.name).toBe('click');
    expect(event.handler).toEqual({
      type: 'JSFunction',
      value: 'function() {}'
    });
    expect(event.modifiers).toEqual({});
  });

  test('should create with modifiers', () => {
    const schema: NodeEvent = {
      name: 'click',
      handler: { type: 'JSFunction', value: 'function() { console.log(1) }' },
      modifiers: { prevent: true, stop: true }
    };
    const event = new EventModel(schema);
    expect(event.modifiers).toEqual({ prevent: true, stop: true });
  });

  test('update should change handler and modifiers', () => {
    const schema: NodeEvent = {
      name: 'click',
      handler: { type: 'JSFunction', value: 'function() {}' }
    };
    const event = new EventModel(schema);
    event.update({
      handler: {
        type: 'JSFunction',
        value: 'function() { console.log("updated") }'
      },
      modifiers: { once: true }
    });
    expect(event.handler).toEqual({
      type: 'JSFunction',
      value: 'function() { console.log("updated") }'
    });
    expect(event.modifiers).toEqual({ once: true });
  });

  describe('toDsl', () => {
    test('should convert EventModel record to NodeEvents', () => {
      const events: Record<string, EventModel> = {
        click: new EventModel({
          name: 'click',
          handler: { type: 'JSFunction', value: 'function() {}' },
          modifiers: { prevent: true }
        }),
        change: new EventModel({
          name: 'change',
          handler: { type: 'JSFunction', value: 'function(val) {}' }
        })
      };
      const result = EventModel.toDsl(events);
      expect(result).toEqual({
        click: {
          name: 'click',
          handler: { type: 'JSFunction', value: 'function() {}' },
          modifiers: { prevent: true }
        },
        change: {
          name: 'change',
          handler: { type: 'JSFunction', value: 'function(val) {}' },
          modifiers: {}
        }
      });
    });

    test('should return empty object for empty input', () => {
      expect(EventModel.toDsl({})).toEqual({});
    });
  });

  describe('parse', () => {
    test('should parse NodeEvents to EventModel record', () => {
      const nodeEvents: NodeEvents = {
        click: {
          name: 'click',
          handler: { type: 'JSFunction', value: 'function() { alert(1) }' },
          modifiers: { prevent: true }
        }
      };
      const result = EventModel.parse(nodeEvents);
      expect(result.click).toBeInstanceOf(EventModel);
      expect(result.click.name).toBe('click');
      expect(result.click.handler).toEqual({
        type: 'JSFunction',
        value: 'function() { alert(1) }'
      });
      expect(result.click.modifiers).toEqual({ prevent: true });
    });

    test('should return empty object for empty input', () => {
      expect(EventModel.parse({})).toEqual({});
    });
  });
});
