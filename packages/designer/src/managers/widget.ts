import { merge, logger } from '@vtj/utils';
import { builtInWidgets } from './built-in';
import { type Widget, RegionType } from '../framework';

/**
 * Widget管理类
 */
class WidgetManager {
  private widgets: Record<string, Widget> = {};

  constructor() {
    this.widgets = this.createWidgets();
  }

  private createWidgets() {
    const widgets: Record<string, Widget> = {};
    for (const item of builtInWidgets) {
      widgets[item.name] = item;
    }
    return widgets;
  }

  /**
   * 注册一个器件
   * @param widget
   */
  register(widget: Widget) {
    this.widgets[widget.name] = widget;
  }

  /**
   * 根据名称获取器件配置
   * @param name
   * @returns
   */
  get(name: string) {
    return this.widgets[name];
  }

  /**
   * 修改器件
   * @param name
   * @param widget
   * @returns
   */
  set(name: string, widget: Partial<Widget>) {
    const match = this.widgets[name];
    if (!match) {
      logger.warn(`widget '${name}' is not found`);
      return;
    }
    merge(match, widget);
    if (widget.component) {
      match.component = widget.component;
    }
  }

  /**
   * 删除器件
   * @param name
   */
  unregister(name: string) {
    delete this.widgets[name];
  }
  /**
   * 根据区域名称获取区域内的器件配置
   * @param region
   * @param group
   * @returns
   */
  getWidgets(region?: keyof typeof RegionType, group?: string) {
    const widgets = Object.values(this.widgets);
    if (region) {
      return widgets
        .filter(
          (n) => n.region === region && (!group || (group && group === n.group))
        )
        .map((n, i) => {
          n.order = n.order ?? i;
          return n;
        })
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }
    return widgets;
  }

  /**
   * 获取支持Remote器件
   * @returns
   */
  getRemoteWidgets() {
    const widgets = this.getWidgets();
    return widgets.filter((n) => !!n.remote);
  }

  removeRemoteWidgets() {
    const widgets = this.getRemoteWidgets();
    widgets.forEach((n) => this.unregister(n.name));
  }
}

export const widgetManager = new WidgetManager();
