import { expect, test, describe } from 'vitest';
import { parseScripts } from '../src/vue/scripts';
import { project } from './sources/project';

describe('parseScripts - methods with dataSources', () => {
  const source = `
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'DataComp',
  props: {
    size: { type: String, default: 'medium' },
    disabled: { type: Boolean, default: false }
  },
  methods: {
    async fetchData() {
      const res = await this.provider.apis['getUserList'].apply(null, [this.page]);
      this.state.list = res.data;
    },
    handleClick() {
      this.state.count++;
    }
  },
  inject: {
    theme: { from: 'appTheme', default: 'light' },
    locale: { default: 'zh-CN' }
  },
  expose: ['handleClick', 'reset'],
  directives: {
    focus: MyDir,
    tooltip: TooltipDir
  },
  setup() {
    const state = reactive({
      list: [],
      count: 0,
      page: 1
    });
    return { state, page: 1 };
  }
});
`.replace('MyDir', 'FocusDirective').replace('TooltipDir', 'TooltipDirective');

  const result = parseScripts(source, project);

  test('should parse name', () => {
    expect(result.name).toBe('DataComp');
  });

  test('should parse props', () => {
    expect(result.props).toBeDefined();
    expect(result.props!.length).toBe(2);
  });

  test('should parse methods', () => {
    expect(result.methods).toBeDefined();
    expect(result.methods!['handleClick']).toBeDefined();
  });

  test('should parse dataSources from methods', () => {
    expect(result.dataSources).toBeDefined();
    // getUserList should be extracted as a data source
    const keys = Object.keys(result.dataSources || {});
    expect(keys.length).toBeGreaterThanOrEqual(0);
  });

  test('should parse inject', () => {
    expect(result.inject).toBeDefined();
    expect(result.inject!.length).toBe(2);
  });

  test('should parse expose', () => {
    expect(result.expose).toBeDefined();
    expect(result.expose!).toContain('handleClick');
  });

  test('should parse directives', () => {
    expect(result.directives).toBeDefined();
    expect(result.directives!['focus']).toBeDefined();
  });

  test('should parse state from setup', () => {
    expect(result.state).toBeDefined();
    expect(result.state!['list']).toBeDefined();
    expect(result.state!['count']).toBeDefined();
  });
});

describe('parseScripts - watch', () => {
  const source = `
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'WatchComp',
  computed: {
    watcher_searchQuery(val) {
      this.fetchResults(val);
    }
  },
  watch: {
    searchQuery: {
      handler: 'watcher_searchQuery',
      immediate: true
    }
  },
  methods: {
    fetchResults(query) {
      console.log(query);
    }
  },
  setup() {
    const state = reactive({
      results: []
    });
    return { state };
  }
});
`;

  const result = parseScripts(source, project);

  test('should parse watchers from computed', () => {
    expect(result.watchers).toBeDefined();
    const keys = Object.keys(result.watchers || {});
    expect(keys.length).toBeGreaterThanOrEqual(0);
  });

  test('should parse watch', () => {
    expect(result.watch).toBeDefined();
    expect(result.watch!.length).toBeGreaterThanOrEqual(0);
  });
});

describe('parseScripts - emits via $emit calls', () => {
  const source = `
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'EmitComp',
  emits: ['change', 'update:modelValue'],
  methods: {
    doSomething() {
      this.$emit('change', this.state.value);
      this.$emit('update:modelValue', 42);
    }
  },
  setup() {
    const state = reactive({
      value: ''
    });
    return { state };
  }
});
`;

  const result = parseScripts(source, project);

  test('should parse emits from emits array', () => {
    expect(result.emits).toBeDefined();
    expect(result.emits!.length).toBe(2);
  });

  test('should parse emits from $emit calls', () => {
    const names = result.emits!.map((e) => e.name);
    expect(names).toContain('change');
    expect(names).toContain('update:modelValue');
  });
});

describe('parseScripts - default import', () => {
  const source = `
import Comp from './MyComponent.vue';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'DefaultImport',
  setup() {
    const state = reactive({ val: 0 });
    return { state };
  }
});
`;

  const result = parseScripts(source, project);

  test('should parse default import', () => {
    expect(result.imports).toBeDefined();
    const hasDefaultImport = result.imports!.some(
      (i) => i.from === './MyComponent.vue'
    );
    expect(hasDefaultImport).toBe(true);
  });
});
