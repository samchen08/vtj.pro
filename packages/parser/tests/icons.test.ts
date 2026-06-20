import { expect, test, describe } from 'vitest';
import {
  VantIcons,
  VtjIcons,
  defaultVantIcon,
  defaultVtjIcon
} from '../src/tools/icons';

describe('VantIcons', () => {
  test('should be an array', () => {
    expect(Array.isArray(VantIcons)).toBe(true);
  });

  test('should contain common icons', () => {
    expect(VantIcons).toContain('arrow');
    expect(VantIcons).toContain('close');
    expect(VantIcons).toContain('success');
    expect(VantIcons).toContain('fail');
    expect(VantIcons).toContain('search');
    expect(VantIcons).toContain('star-o');
    expect(VantIcons).toContain('user');
  });

  test('should have many icon definitions', () => {
    expect(VantIcons.length).toBeGreaterThan(100);
  });
});

describe('VtjIcons', () => {
  test('should be an array', () => {
    expect(Array.isArray(VtjIcons)).toBe(true);
  });

  test('should contain common icons', () => {
    expect(VtjIcons).toContain('User');
    expect(VtjIcons).toContain('Setting');
    expect(VtjIcons).toContain('Edit');
    expect(VtjIcons).toContain('Search');
    expect(VtjIcons).toContain('Delete');
    expect(VtjIcons).toContain('Plus');
    expect(VtjIcons).toContain('Minus');
    expect(VtjIcons).toContain('CloseBold');
  });

  test('should have many icon definitions', () => {
    expect(VtjIcons.length).toBeGreaterThan(200);
  });
});

describe('default icons', () => {
  test('should have default Vant icon', () => {
    expect(defaultVantIcon).toBe('user');
    expect(VantIcons).toContain(defaultVantIcon);
  });

  test('should have default Vtj icon', () => {
    expect(defaultVtjIcon).toBe('User');
    expect(VtjIcons).toContain(defaultVtjIcon);
  });
});
