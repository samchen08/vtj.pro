import { type Reactive, reactive, toRaw } from 'vue';
import { storage } from '@vtj/utils';
import { STATE_KEY } from '../constants';

export interface EngineState {
  /**
   * 设计视图是否显示辅助线
   */
  outlineEnabled: boolean;

  /**
   * 设计视图是否响应事件
   */
  activeEvent: boolean;

  /**
   * AI自动应用
   */
  autoApply: boolean;

  /**
   * AI 大模型
   */
  llm: string;
}

export class State {
  private __state: Reactive<EngineState> = reactive({
    outlineEnabled: true,
    activeEvent: true,
    autoApply: true,
    llm: ''
  });

  constructor() {
    const state = storage.get(STATE_KEY, { type: 'local' });
    if (state) {
      Object.assign(this.__state, state);
    }
  }

  private save(key: keyof EngineState, value: any) {
    //@ts-ignore
    this.__state[key] = value;
    storage.save(STATE_KEY, toRaw(this.__state), { type: 'local' });
  }

  get outlineEnabled() {
    return this.__state.outlineEnabled;
  }

  set outlineEnabled(value: any) {
    this.save('outlineEnabled', value);
  }

  get activeEvent() {
    return this.__state.activeEvent;
  }

  set activeEvent(value: any) {
    this.save('activeEvent', value);
  }

  get autoApply() {
    return this.__state.autoApply;
  }

  set autoApply(value: any) {
    this.save('autoApply', value);
  }

  get llm() {
    return this.__state.llm;
  }

  set llm(value: any) {
    this.save('llm', value);
  }
}
