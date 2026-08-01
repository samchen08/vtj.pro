import { computed, ref } from 'vue';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../src/components/hooks/useSelected', () => ({
  useSelected: () => ({
    selected: computed(() => null),
    isSelectBlock: ref(true),
    engine: {}
  })
}));

import { useBinder } from '../src/components/hooks/useBinder';

describe('useBinder', () => {
  it('includes assigned and destructured composable results', () => {
    const current = ref({
      inject: [],
      props: [],
      refs: {},
      reactives: {},
      state: {},
      computed: {},
      methods: {},
      dataSources: {},
      composables: [
        {
          name: 'dark',
          composable: { type: 'JSExpression', value: 'useDark' }
        },
        {
          name: 'mouse',
          composable: { type: 'JSExpression', value: 'useMouse' },
          destructure: ['x', 'y']
        }
      ]
    } as any);
    const { options } = useBinder(current, ref(null));

    expect(options.value).toContainEqual({
      title: '组合式函数',
      items: ['this.dark', 'this.x', 'this.y']
    });
  });
});
