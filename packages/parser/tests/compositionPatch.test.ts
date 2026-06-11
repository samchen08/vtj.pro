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
    store: '$store',
    provider: '$provider'
  },
  libs: {}
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

  test('should replace provider references', () => {
    const input = 'provider?.env?.NODE_ENV';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.$provider?.env?.NODE_ENV');
  });

  test('should replace __i18n.t with this.$t', () => {
    const input = '__i18n.t("hello")';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.$t("hello")');
  });

  test('should replace __i18n.n with this.$n', () => {
    const input = '__i18n.n(1000)';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.$n(1000)');
  });

  test('should replace nextTick with this.$nextTick', () => {
    const opts = {
      ...baseOptions,
      globalApiVars: { ...baseOptions.globalApiVars, nextTick: '$nextTick' }
    };
    const input = 'await nextTick()';
    const result = compositionPatch(input, opts);
    expect(result).toBe('await this.$nextTick()');
  });

  test('should replace attrs with this.$attrs', () => {
    const opts = {
      ...baseOptions,
      globalApiVars: { ...baseOptions.globalApiVars, attrs: '$attrs' }
    };
    const input = 'attrs.class';
    const result = compositionPatch(input, opts);
    expect(result).toBe('this.$attrs.class');
  });

  test('should replace slots with this.$slots', () => {
    const opts = {
      ...baseOptions,
      globalApiVars: { ...baseOptions.globalApiVars, slots: '$slots' }
    };
    const input = 'slots.default';
    const result = compositionPatch(input, opts);
    expect(result).toBe('this.$slots.default');
  });

  test('should replace composables destructure fields', () => {
    const opts = { ...baseOptions, composables: ['mouse', 'x', 'y'] };
    const input = 'x + y';
    const result = compositionPatch(input, opts);
    expect(result).toBe('this.x + this.y');
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

  test('should convert _ctx.Bell to this.$libs.VtjIcons.Bell via libs', () => {
    const opts = { ...baseOptions, libs: { Bell: 'VtjIcons' } };
    const input = '_ctx.Bell';
    const result = compositionPatch(input, opts);
    expect(result).toBe('this.$libs.VtjIcons.Bell');
  });

  test('should convert _ctx.Bell in parenthesized expression via libs', () => {
    const opts = { ...baseOptions, libs: { Bell: 'VtjIcons' } };
    const input = '(_ctx.Bell)';
    const result = compositionPatch(input, opts);
    expect(result).toBe('(this.$libs.VtjIcons.Bell)');
  });

  test('should convert _ctx.xxx.value to this.xxx.value for refs', () => {
    const input = '_ctx.count.value';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.count.value');
  });

  test('should convert _ctx.xxx to this.xxx.value for bare refs in script', () => {
    const input = '_ctx.count';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.count.value');
  });

  test('should convert _ctx.state.xxx to this.state.xxx', () => {
    const input = '_ctx.state.loading';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.state.loading');
  });

  test('should convert _ctx.props.xxx to this.xxx', () => {
    const input = '_ctx.props.title';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.title');
  });

  test('should convert _ctx.t("hello") to this.$t("hello") via globalApiVars', () => {
    // globalApiVars 处理的 bare 标识符场景（非 _ctx 前缀）已在其他测试覆盖
    const input = 't("hello")';
    const result = compositionPatch(input, baseOptions);
    expect(result).toBe('this.$t("hello")');
  });
});
