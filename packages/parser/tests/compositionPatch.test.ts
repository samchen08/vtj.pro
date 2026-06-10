import { expect, test, describe } from 'vitest';
import { compositionPatch } from '../src/vue/compositionPatch';

const baseOptions = {
  refs: ['count', 'message'],
  reactives: ['form'],
  hasState: true,
  computed: ['doubleCount', 'fullName'],
  methods: ['increment', 'fetchData'],
  props: ['title', 'visible'],
  composables: ['mouse'],
  injects: ['theme'],
  dataSources: ['getList', 'createItem'],
  globalApiVars: {
    router: '$router',
    route: '$route',
    t: '$t',
    store: '$store'
  }
};

describe('compositionPatch', () => {
  test('should replace ref .value access with this.xxx.value', () => {
    const input = 'count.value + message.value';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.count.value + this.message.value');
  });

  test('should replace computed .value access with this.xxx.value', () => {
    const input = 'doubleCount.value';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.doubleCount.value');
  });

  test('should replace bare ref name with this.xxx.value', () => {
    const input = 'count + message';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.count.value + this.message.value');
  });

  test('should replace bare computed name with this.xxx.value', () => {
    const input = 'doubleCount';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.doubleCount.value');
  });

  test('should not double-patch already patched ref expressions', () => {
    const input = 'this.count.value + this.message.value';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.count.value + this.message.value');
  });

  test('should replace global API variables', () => {
    const input = 'router.push("/home")';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.$router.push("/home")');
  });

  test('should replace route references', () => {
    const input = 'route.path';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.$route.path');
  });

  test('should replace t references for i18n', () => {
    const input = 't("hello")';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.$t("hello")');
  });

  test('should replace props.xxx with this.xxx', () => {
    const input = 'props.title + " " + props.visible';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.title + " " + this.visible');
  });

  test('should replace state with this.state', () => {
    const input = 'state.loading = true';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.state.loading = true');
  });

  test('should replace reactives with this.xxx', () => {
    const input = 'form.name = "test"';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.form.name = "test"');
  });

  test('should replace methods with this.xxx', () => {
    const input = 'increment()';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.increment()');
  });

  test('should replace composables with this.xxx', () => {
    const input = 'mouse.x + mouse.y';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.mouse.x + this.mouse.y');
  });

  test('should replace injects with this.xxx', () => {
    const input = 'theme === "dark"';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.theme === "dark"');
  });

  test('should replace dataSources with this.xxx', () => {
    const input = 'getList()';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.getList()');
  });

  test('should cleanup double this.this.', () => {
    const input = 'this.this.count';
    const result = compositionPatch(input, baseOptions);
    expect(result).not.toContain('this.this.');
  });

  test('should handle empty string', () => {
    const result = compositionPatch('', baseOptions);
    expect(result).toBe('');
  });

  test('should handle undefined/null gracefully', () => {
    const result = compositionPatch(undefined as any, baseOptions);
    expect(result).toBeUndefined();
  });
});
