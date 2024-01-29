import { type BlockPropDataType } from '@vtj/core';
import { merge, logger } from '@vtj/utils';
import { builtInSetters, defaultSetter } from './built-in';
import { type Setter } from '../framework';

class SetterManager {
  private setters: Record<string, Setter> = {};
  public defaultSetter: Setter = defaultSetter;
  constructor() {
    this.setters = this.createSetters();
  }
  private createSetters() {
    const setters: Record<string, Setter> = {};
    for (const item of builtInSetters) {
      setters[item.name] = item;
    }
    return setters;
  }

  /**
   * 注册一个设置器
   * @param widget
   */
  register(setter: Setter) {
    this.setters[setter.name] = setter;
  }

  /**
   * 根据名称获取设置器
   * @param name
   * @returns
   */
  get(name: string) {
    return this.setters[name];
  }

  /**
   * 修改设置器
   * @param name
   * @param widget
   * @returns
   */
  set(name: string, setter: Partial<Setter>) {
    const match = this.setters[name];
    if (!match) {
      logger.warn(`setter '${name}' is not found`);
      return;
    }
    merge(match, setter);
    if (setter.component) {
      match.component = setter.component;
    }
  }

  getByType(type: BlockPropDataType) {
    const setters = Object.values(this.setters);
    return setters.filter((n) => n.type === type).map((n) => n.name);
  }
}

export const setterManager = new SetterManager();
