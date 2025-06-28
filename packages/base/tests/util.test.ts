import { describe, it, expect, vi } from 'vitest';
import {
  toTypeString,
  toRawType,
  isDef,
  now,
  timestamp,
  random,
  uid,
  uuid,
  delay
} from '../src/util';

describe('util functions', () => {
  it('toTypeString should return correct type string', () => {
    expect(toTypeString(undefined)).toBe('[object Undefined]');
    expect(toTypeString(null)).toBe('[object Null]');
    expect(toTypeString({})).toBe('[object Object]');
    expect(toTypeString([])).toBe('[object Array]');
    expect(toTypeString(() => {})).toBe('[object Function]');
  });

  it('toRawType should return correct raw type', () => {
    expect(toRawType(undefined)).toBe('Undefined');
    expect(toRawType(null)).toBe('Null');
    expect(toRawType({})).toBe('Object');
    expect(toRawType([])).toBe('Array');
    expect(toRawType(new Date())).toBe('Date');
    expect(toRawType(/regex/)).toBe('RegExp');
  });

  it('isDef should check if value is defined', () => {
    expect(isDef(undefined)).toBe(false);
    expect(isDef(null)).toBe(true); // null is defined
    expect(isDef(0)).toBe(true);
    expect(isDef('')).toBe(true);
    expect(isDef(false)).toBe(true);
  });

  it('now and timestamp should return current time', () => {
    const before = Date.now();
    const n = now();
    const ts = timestamp();
    const after = Date.now();

    expect(n).toBeGreaterThanOrEqual(before);
    expect(n).toBeLessThanOrEqual(after);
    expect(ts).toBeGreaterThanOrEqual(before);
    expect(ts).toBeLessThanOrEqual(after);
  });

  it('random should generate number in range', () => {
    const min = 5;
    const max = 10;
    const result = random(min, max);

    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);

    // Test multiple runs
    for (let i = 0; i < 100; i++) {
      const val = random(min, max);
      expect(val).toBeGreaterThanOrEqual(min);
      expect(val).toBeLessThanOrEqual(max);
    }
  });

  it('uid should generate unique IDs', () => {
    const id1 = uid();
    const id2 = uid();
    expect(id1).not.toBe(id2);

    // Test with custom start date
    const start = new Date('2020-01-01');
    const customId = uid(start);
    expect(customId.length).toBeGreaterThan(5);
  });

  it('uuid should generate valid UUID/GUID', () => {
    const id1 = uuid();
    const id2 = uuid(false);

    // GUID format (with dashes)
    expect(id1).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );

    // UUID format (no dashes)
    expect(id2).toMatch(/^[0-9a-f]{32}$/i);
    expect(id2.length).toBe(32);
  });

  it('delay should wait for specified time', async () => {
    const mock = vi.fn();
    const waitTime = 100;

    const start = Date.now();
    await delay(waitTime).then(mock);
    const end = Date.now();

    expect(mock).toHaveBeenCalled();
    expect(end - start).toBeGreaterThanOrEqual(waitTime - 5); // Allow small variance
    expect(end - start).toBeLessThanOrEqual(waitTime + 20);
  });
});
