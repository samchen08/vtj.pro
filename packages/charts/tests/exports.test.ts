import { describe, expect, test } from 'vitest';
import {
  VTJ_CHARTS_VERSION,
  components,
  XChart,
  XMapChart,
  echarts,
  useChart,
  useMapChart,
  useListeners
} from '../src';

describe('public exports', () => {
  test('VTJ_CHARTS_VERSION 是字符串', () => {
    expect(typeof VTJ_CHARTS_VERSION).toBe('string');
  });

  test('components 是包含 2 个组件的数组', () => {
    expect(Array.isArray(components)).toBe(true);
    expect(components.length).toBe(2);
  });

  test('echarts 被重新导出', () => {
    expect(echarts).toBeDefined();
    expect(typeof echarts.init).toBe('function');
  });

  test('useChart、useMapChart、useListeners hooks 可导入', () => {
    expect(typeof useChart).toBe('function');
    expect(typeof useMapChart).toBe('function');
    expect(typeof useListeners).toBe('function');
  });
});

describe('XChart 组件', () => {
  test('组件名称为 XChart', () => {
    expect(XChart.name).toBe('XChart');
  });

  test('组件接收 width/height/option props', () => {
    const props = (XChart as any).props || {};
    expect(props.width).toBeDefined();
    expect(props.height).toBeDefined();
    expect(props.option).toBeDefined();
  });
});

describe('XMapChart 组件', () => {
  test('组件名称为 XMapChart', () => {
    expect(XMapChart.name).toBe('XMapChart');
  });

  test('组件接收 geoJson/name props', () => {
    const props = (XMapChart as any).props || {};
    expect(props.geoJson).toBeDefined();
    expect(props.name).toBeDefined();
  });
});
