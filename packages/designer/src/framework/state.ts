import { type Reactive, reactive, toRaw } from 'vue';
import { storage, uid } from '@vtj/utils';
import { useDark } from '@vueuse/core';
import { STATE_KEY } from '../constants';

export interface LLM {
  id?: string;
  label: string;
  baseURL: string;
  model: string;
  apiKey: string;
}

const defaults = {
  outlineEnabled: true,
  activeEvent: true,
  autoApply: true,
  autoHistory: true,
  llm: '',
  LLMs: [],
  tour: true,
  dark: false
};

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
   * 自动保存历史记录
   */
  autoHistory: boolean;

  /**
   * 当前使用的 AI 大模型
   */
  llm: string | LLM;

  /**
   * 自定义模型列表
   */
  LLMs: LLM[];

  /**
   * 显示引导
   */
  tour: boolean;

  /**
   * 暗黑模式
   */
  dark: boolean;
}

export class State {
  private __state: Reactive<EngineState> = reactive(defaults);

  private __isDark = useDark();

  constructor() {
    const state = storage.get(STATE_KEY, { type: 'local' });
    if (state) {
      Object.assign(this.__state, state);
    }
  }

  reset() {
    storage.clear({ type: 'local' });
    location.reload();
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

  get autoHistory() {
    return this.__state.autoHistory;
  }

  set autoHistory(value: any) {
    this.save('autoHistory', value);
  }

  get llm() {
    return this.__state.llm;
  }

  set llm(value: any) {
    this.save('llm', value);
  }

  get LLMs() {
    return this.__state.LLMs;
  }
  set LLMs(value: LLM[]) {
    this.save('LLMs', value);
  }

  get tour() {
    return this.__state.tour;
  }

  set tour(value: boolean) {
    this.save('tour', value);
  }

  get dark() {
    return this.__isDark.value;
  }

  set dark(v: boolean) {
    this.__isDark.value = v;
  }

  saveLLM(item: LLM) {
    item.id = item.id || uid();
    const index = this.__state.LLMs.findIndex((n) => n.id === item.id);
    if (index > -1) {
      this.__state.LLMs.splice(index, 1, item);
    } else {
      this.__state.LLMs.push(item);
    }
    this.LLMs = this.__state.LLMs;
  }

  removeLLM(item: LLM) {
    const index = this.__state.LLMs.findIndex((n) => n.id === item.id);
    if (index > -1) {
      this.__state.LLMs.splice(index, 1);
      this.LLMs = this.__state.LLMs;
    }
  }

  getLLMById(id: string) {
    return this.__state.LLMs.find((n) => n.id === id);
  }
}
