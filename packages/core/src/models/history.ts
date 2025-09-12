import { uid, cloneDeep, toArray } from '@vtj/base';
import type { HistorySchema, HistoryItem, BlockSchema } from '../protocols';
import { emitter, type ModelEventType } from '../tools';

export interface HistoryModelOptions {
  max: number;
}

export const EVENT_HISTORY_CHANGE = 'EVENT_HISTORY_CHANGE';
export const EVENT_HISTORY_LOAD = 'EVENT_HISTORY_LOAD';

export interface HistoryModelEvent {
  model: HistoryModel;
  type: ModelEventType;
  data: any;
}

export class HistoryModel {
  private options: HistoryModelOptions = { max: 50 };
  index: number = -1;
  id: string;
  items: HistoryItem[];
  constructor(
    schema: HistorySchema,
    options: Partial<HistoryModelOptions> = {}
  ) {
    Object.assign(this.options, options);
    const { id, items = [] } = schema;
    this.id = id;
    this.items = items;
  }

  toDsl(): HistorySchema {
    const { id, items } = this;
    return {
      id,
      items: items.map((n) => ({
        id: n.id,
        label: n.label,
        remark: n.remark || ''
      }))
    };
  }
  /**
   * 获取历史项
   * @param id
   * @returns
   */
  get(id: string) {
    return this.items.find((n) => n.id === id);
  }

  /**
   * 增加历史记录
   * @param dsl
   * @param silent
   */
  add(dsl: BlockSchema, remark: string = '', silent: boolean = false) {
    const { max } = this.options;
    const item: HistoryItem = {
      id: uid(),
      label: new Date().toLocaleString(),
      remark,
      dsl: cloneDeep(dsl)
    };
    this.items.unshift(item);
    const noRemarkRecords = this.items.filter((n) => !n.remark);
    if (noRemarkRecords.length > max) {
      const removeIds = noRemarkRecords.splice(max).map((n) => n.id);
      this.items = this.items.filter((n) => !removeIds.includes(n.id));
      if (!silent) {
        emitter.emit(EVENT_HISTORY_CHANGE, {
          model: this,
          type: 'delete',
          data: removeIds
        });
      }
    }
    this.index = -1;
    if (!silent) {
      emitter.emit(EVENT_HISTORY_CHANGE, {
        model: this,
        type: 'create',
        data: item
      });
    }
  }

  /**
   * 更新历史记录
   * @param id
   * @param remark
   * @param silent
   */
  update(item: HistoryItem, silent: boolean = false) {
    const match = this.items.find((n) => n.id === item.id);
    if (match) {
      Object.assign(match, item);
    }
    if (!silent) {
      emitter.emit(EVENT_HISTORY_CHANGE, {
        model: this,
        type: 'update',
        data: match
      });
    }
  }

  /**
   * 删除历史记录
   * @param id
   * @param silent
   */
  remove(id: string | string[], silent: boolean = false) {
    const ids: string[] = toArray(id);
    for (const _id of ids) {
      const index = this.items.findIndex((n) => n.id === _id);
      if (index > -1) {
        this.items.splice(index, 1);
        if (index === this.index) {
          this.index = -1;
        } else if (this.index >= this.items.length) {
          this.index = this.items.length - 1;
        }
      } else {
        console.warn(`not found HistoryItem for id: ${id} `);
      }
    }

    if (!silent) {
      emitter.emit(EVENT_HISTORY_CHANGE, {
        model: this,
        type: 'delete',
        data: ids
      });
    }
  }

  forward(silent: boolean = false) {
    const { index, items } = this;
    if (index < 0) return;
    --this.index;
    const item = items[this.index];
    if (item && !silent) {
      emitter.emit(EVENT_HISTORY_LOAD, {
        model: this,
        type: 'load',
        data: item
      });
    }
  }

  backward(silent: boolean = false) {
    const { index, items } = this;
    if (index >= items.length - 1) return;
    if (index < 0) {
      this.index = 0;
    }
    ++this.index;
    const item = items[this.index];
    if (item && !silent) {
      emitter.emit(EVENT_HISTORY_LOAD, {
        model: this,
        type: 'load',
        data: item
      });
    }
  }

  load(id: string, silent: boolean = false) {
    const index = this.items.findIndex((n) => n.id === id);
    if (index >= 0) {
      this.index = index;
      if (!silent) {
        emitter.emit(EVENT_HISTORY_LOAD, {
          model: this,
          type: 'load',
          data: this.items[index]
        });
      }
    }
  }
  clear(silent: boolean = false) {
    this.index = -1;
    const ids = this.items.map((n) => n.id);
    this.items = [];
    if (!silent) {
      emitter.emit(EVENT_HISTORY_CHANGE, {
        model: this,
        type: 'clear',
        data: ids
      });
    }
  }
}
