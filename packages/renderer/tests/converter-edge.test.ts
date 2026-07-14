import { expect, test } from 'vitest';
import { rpxToPx } from '../src/utils/converter';

test('rpxToPx uses clientWidth when innerWidth is falsy', () => {
  const win = {
    innerWidth: 0,
    document: { documentElement: { clientWidth: 750 } }
  };
  expect(rpxToPx(win, 750)).toBe(750);
});

test('rpxToPx uses clientWidth when innerWidth is undefined', () => {
  const win = {
    document: { documentElement: { clientWidth: 375 } }
  };
  expect(rpxToPx(win, 750)).toBe(375);
});
