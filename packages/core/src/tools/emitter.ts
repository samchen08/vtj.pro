import { mitt } from '@vtj/base';
import {
  type ProjectModelEvent,
  type BlockModel,
  type NodeModel,
  type HistoryModelEvent,
  EVENT_PROJECT_CHANGE,
  EVENT_PROJECT_ACTIVED,
  EVENT_PROJECT_DEPS_CHANGE,
  EVENT_PROJECT_PAGES_CHANGE,
  EVENT_PROJECT_BLOCKS_CHANGE,
  EVENT_PROJECT_APIS_CHANGE,
  EVENT_PROJECT_PUBLISH,
  EVENT_PROJECT_FILE_PUBLISH,
  EVENT_BLOCK_CHANGE,
  EVENT_NODE_CHANGE,
  EVENT_HISTORY_CHANGE,
  EVENT_HISTORY_LOAD
} from '../models';

type Events = {
  [EVENT_PROJECT_CHANGE]: ProjectModelEvent;
  [EVENT_PROJECT_ACTIVED]: ProjectModelEvent;
  [EVENT_PROJECT_DEPS_CHANGE]: ProjectModelEvent;
  [EVENT_PROJECT_PAGES_CHANGE]: ProjectModelEvent;
  [EVENT_PROJECT_BLOCKS_CHANGE]: ProjectModelEvent;
  [EVENT_PROJECT_APIS_CHANGE]: ProjectModelEvent;
  [EVENT_PROJECT_PUBLISH]: ProjectModelEvent;
  [EVENT_PROJECT_FILE_PUBLISH]: ProjectModelEvent;
  [EVENT_BLOCK_CHANGE]: BlockModel;
  [EVENT_NODE_CHANGE]: NodeModel;
  [EVENT_HISTORY_CHANGE]: HistoryModelEvent;
  [EVENT_HISTORY_LOAD]: HistoryModelEvent;
};

export const emitter = mitt<Events>();

export type Emitter = {
  on(type: string, listener: (...args: any[]) => void): void;
  off(type: string, listener: (...args: any[]) => void): void;
  emit(type: string, ...args: any[]): void;
  all: {
    clear(): void;
  };
};

export type ModelEventType =
  | 'create'
  | 'update'
  | 'delete'
  | 'clone'
  | 'clear'
  | 'load'
  | 'publish';
