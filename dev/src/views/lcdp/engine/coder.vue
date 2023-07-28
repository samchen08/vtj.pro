<template>
  <div></div>
</template>
<script lang="ts" setup>
import {
  coder,
  BlockSchema,
  StorageService,
  Project,
  presetConfig,
  Assets
} from '@vtj/engine';

const project = new Project(
  { id: 'test', name: 'Test' },
  presetConfig.dependencies
);

const service = new StorageService();

const assets = new Assets(service, project);

const schema: BlockSchema = {
  name: 'MyPage',
  title: '测试页面',
  inject: [
    {
      name: 'admin',
      from: 'admin',
      default: {
        type: 'JSExpression',
        value: 'null'
      }
    }
  ],
  state: {
    state1: {
      type: 'JSExpression',
      value: 'null'
    },
    state2: {
      type: 'JSExpression',
      value: "'ABC'"
    }
  },
  lifeCycles: {
    mounted: {
      type: 'JSFunction',
      value: '() => {\r\n    this.say()\r\n}'
    }
  },
  methods: {
    say: {
      type: 'JSFunction',
      value:
        '() => {\r\n    console.log(this.state.state1, this.cname.value);\r\n    this.testApi()\r\n}'
    }
  },
  computed: {
    cname: {
      type: 'JSFunction',
      value: '() => {\r\n    return this.state.state1\r\n}'
    }
  },
  watch: [
    {
      source: {
        type: 'JSFunction',
        value: '() => { return this.state.state2 }'
      },
      immediate: true,
      deep: true,
      handler: {
        type: 'JSFunction',
        value: "(v) => {\r\n    console.log('watch change', v)\r\n}"
      },
      id: '2izwlmltybo'
    }
  ],
  css: 'body {\r\n    background-color: #ccc;\r\n}',
  props: [
    {
      name: 'title',
      type: ['String', 'Number'],
      required: true,
      default: {
        type: 'JSExpression',
        value: "'默认标题'"
      }
    }
  ],
  emits: ['change'],
  slots: ['default'],
  transform: {},
  dataSources: {
    testApi: {
      type: 'api',
      detail: 'testApi',
      name: 'testApi',
      title: '测试接口',
      transform: {
        type: 'JSFunction',
        value: '(v) => v'
      },
      test: {
        type: 'JSFunction',
        value: '() => this.testApi()'
      }
    }
  },
  __VTJ_BLOCK__: true,
  id: 'gk3xkftonl',
  children: [
    {
      props: {
        style: {
          width: '100%',
          height: '100%'
        },
        key: 'key1',
        ref: 'ref1',
        class: 'class1',
        direction: 'vertical',
        custom: 'a'
      },
      name: 'ElContainer',
      from: 'element-plus',
      id: '1hhdftkv9f4',
      invisible: false,
      children: [
        {
          name: 'ElButton',
          children: {
            type: 'JSExpression',
            value: '`按钮${this.item}`'
          },
          props: {
            type: 'primary'
          },
          from: 'element-plus',
          id: '2k2waylgwn2',
          invisible: false,
          directives: [
            {
              id: 'y6m092mydv',
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value: '5'
              }
            }
          ],
          events: {}
        }
      ],
      directives: [],
      events: {
        click: {
          handler: {
            type: 'JSFunction',
            value: '() => {\r\n    console.log(this.$props.title)\r\n}'
          },
          modifiers: {
            stop: true,
            prevent: true
          }
        }
      }
    }
  ]
};

(async () => {
  await assets.load(project.dependencies.value);
  const code = coder(schema, assets);

  console.log(project.dependencies.value);
  console.log('-----------------------');
  console.log(code);
})();
</script>
