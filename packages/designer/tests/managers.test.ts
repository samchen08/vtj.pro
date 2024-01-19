import { expect, test } from 'vitest';
import { widgetManager } from '../src';

test('widgetManager', () => {
  const widget = widgetManager.get('Logo');
  expect(widget.name).toBe('Logo');
});
