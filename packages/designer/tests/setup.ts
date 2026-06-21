/**
 * Vitest setup file for @vtj/designer
 * Provides necessary DOM/JS mocks for third-party libraries that access
 * browser APIs during module initialization.
 */
import { vi } from 'vitest';

// monaco-editor accesses document.queryCommandSupported on load
if (typeof document !== 'undefined') {
  Object.defineProperty(document, 'queryCommandSupported', {
    value: () => false,
    writable: true
  });
}

// Globally mock Vue component collections so built-in widgets/setters
// can initialize in vitest without requiring full Vue SFC compilation.
vi.doMock('../src/components/widgets', () => ({ widgets: {} }));
vi.doMock('../src/components/setters', () => ({ setters: {} }));
