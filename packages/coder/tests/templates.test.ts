import { expect, describe, test } from 'vitest';
import {
  scriptCompiled,
  scriptSetupCompiled,
  vueCompiled
} from '../src/templates';

describe('scriptCompiled', () => {
  test('should compile script template with basic tokens', () => {
    const result = scriptCompiled({
      name: 'TestComp',
      imports: '',
      renderer: '@vtj/renderer',
      id: '123',
      version: '1.0.0',
      state: '',
      props: '',
      emits: '',
      inject: '',
      components: '',
      expose: '',
      computed: '',
      methods: '',
      watch: '',
      lifeCycles: '',
      returns: '',
      directives: '',
      urlSchemas: '',
      blockPlugins: '',
      asyncComponents: ''
    });
    expect(result).toContain('defineComponent');
    expect(result).toContain("name: 'TestComp'");
    expect(result).toContain("import { useProvider } from '@vtj/renderer'");
    expect(result).toContain("id: '123'");
  });

  test('should include props when provided', () => {
    const result = scriptCompiled({
      name: 'Test',
      imports: '',
      renderer: '@vtj/renderer',
      id: '1',
      version: '1.0.0',
      state: '',
      props: 'title: String',
      emits: '',
      inject: '',
      components: '',
      expose: '',
      computed: '',
      methods: '',
      watch: '',
      lifeCycles: '',
      returns: '',
      directives: '',
      urlSchemas: '',
      blockPlugins: '',
      asyncComponents: ''
    });
    expect(result).toContain('props: { title: String }');
  });

  test('should include methods when provided', () => {
    const result = scriptCompiled({
      name: 'Test',
      imports: '',
      renderer: '@vtj/renderer',
      id: '1',
      version: '1.0.0',
      state: '',
      props: '',
      emits: '',
      inject: '',
      components: '',
      expose: '',
      computed: '',
      methods: 'handleClick() { console.log("click") }',
      watch: '',
      lifeCycles: '',
      returns: '',
      directives: '',
      urlSchemas: '',
      blockPlugins: '',
      asyncComponents: ''
    });
    expect(result).toContain('methods: {');
    expect(result).toContain('handleClick() { console.log("click") }');
  });
});

describe('scriptSetupCompiled', () => {
  test('should compile composition script template', () => {
    const result = scriptSetupCompiled({
      name: 'Comp',
      imports: '',
      renderer: '@vtj/renderer',
      id: '123',
      version: '1.0.0',
      props: '',
      emits: '',
      expose: '',
      globalApiDeclares: '',
      injects: '',
      composables: '',
      state: '',
      refs: '',
      reactives: '',
      computed: '',
      methods: '',
      dataSources: '',
      watch: '',
      provide: '',
      urlSchemas: '',
      blockPlugins: '',
      createdStatements: '',
      setupStatements: '',
      lifeCycles: ''
    });
    expect(result).toContain("import { useProvider } from '@vtj/renderer'");
    expect(result).toContain("id: '123'");
  });

  test('should include defineProps when props provided', () => {
    const result = scriptSetupCompiled({
      name: 'Comp',
      imports: '',
      renderer: '@vtj/renderer',
      id: '1',
      version: '1.0.0',
      props: 'title: String',
      emits: '',
      expose: '',
      globalApiDeclares: '',
      injects: '',
      composables: '',
      state: '',
      refs: '',
      reactives: '',
      computed: '',
      methods: '',
      dataSources: '',
      watch: '',
      provide: '',
      urlSchemas: '',
      blockPlugins: '',
      createdStatements: '',
      setupStatements: '',
      lifeCycles: ''
    });
    expect(result).toContain('defineProps({ title: String })');
  });

  test('should include defineEmits when emits provided', () => {
    const result = scriptSetupCompiled({
      name: 'Comp',
      imports: '',
      renderer: '@vtj/renderer',
      id: '1',
      version: '1.0.0',
      props: '',
      emits: "'change', 'submit'",
      expose: '',
      globalApiDeclares: '',
      injects: '',
      composables: '',
      state: '',
      refs: '',
      reactives: '',
      computed: '',
      methods: '',
      dataSources: '',
      watch: '',
      provide: '',
      urlSchemas: '',
      blockPlugins: '',
      createdStatements: '',
      setupStatements: '',
      lifeCycles: ''
    });
    expect(result).toContain("defineEmits(['change', 'submit'])");
  });
});

describe('vueCompiled', () => {
  test('should compile Vue template with script, template, style', () => {
    const result = vueCompiled({
      template: '<div>Hello</div>',
      script: 'const msg = "Hello"',
      css: 'div { color: red }',
      style: '',
      scriptLang: 'ts',
      styleLang: 'css',
      scriptSetup: false
    });
    expect(result).toContain('<template>');
    expect(result).toContain('<div>Hello</div>');
    expect(result).toContain('</template>');
    expect(result).toContain('<script lang="ts">');
    expect(result).toContain('<style lang="css" scoped>');
    expect(result).toContain('div { color: red }');
  });

  test('should use js and scss when specified', () => {
    const result = vueCompiled({
      template: '<div>Test</div>',
      script: 'const msg = "test"',
      css: '',
      style: '',
      scriptLang: 'js',
      styleLang: 'scss',
      scriptSetup: true
    });
    expect(result).toContain('<script lang="js" setup>');
    expect(result).toContain('<style lang="scss" scoped>');
  });
});
