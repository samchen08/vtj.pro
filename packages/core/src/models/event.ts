import type {
  NodeEvents,
  NodeEvent,
  NodeModifiers,
  JSFunction
} from '../protocols';

export class EventModel {
  public readonly name: string;
  public handler: JSFunction;
  public modifiers: NodeModifiers = {};
  constructor(private schema: NodeEvent) {
    const { name, handler } = this.schema;
    this.name = name;
    this.handler = handler;
    this.update(schema);
  }

  update(schema: Partial<NodeEvent>) {
    Object.assign(this.schema, schema);
    const { handler, modifiers = {} } = this.schema;
    this.handler = handler;
    this.modifiers = modifiers;
  }

  static toDsl(events: Record<string, EventModel>): NodeEvents {
    return Object.entries(events).reduce((result, [name, event]) => {
      const { handler, modifiers } = event;
      result[name] = { name, handler, modifiers };
      return result;
    }, {} as NodeEvents);
  }

  static parse(events: NodeEvents = {}): Record<string, EventModel> {
    return Object.entries(events).reduce(
      (result, [name, schema]) => {
        result[name] = new EventModel(schema);
        return result;
      },
      {} as Record<string, EventModel>
    );
  }
}
