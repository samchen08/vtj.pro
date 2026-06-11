export const test_composition = {
  id: 'comp-1',
  name: 'CompositionDemo',
  apiMode: 'composition',
  props: [{ name: 'title', type: 'String' as any, default: 'Hi' }],
  emits: ['change'],
  state: {
    foo: 'bar'
  },
  refs: {
    count: 0,
    list: { type: 'JSExpression', value: '[1,2,3]' }
  },
  reactives: {
    form: { name: '', age: 18 }
  },
  computed: {
    total: {
      type: 'JSFunction',
      value: '() => this.count * 2'
    }
  },
  methods: {
    handleClick: {
      type: 'JSFunction',
      value:
        'function() { this.count++; this.form.name = "x"; this.state.foo = "baz"; this.$emit("change", this.count); this.$forceUpdate(); }'
    },
    log: {
      type: 'JSFunction',
      value:
        'async function() { await this.$nextTick(); console.log(this.title, this.total); }'
    },
    getEnv: {
      type: 'JSFunction',
      value: 'function() { return this.$attrs?.class; }'
    },
    getParent: {
      type: 'JSFunction',
      value: 'function() { return this.$parent; }'
    },
    getEl: {
      type: 'JSFunction',
      value: 'function() { return this.$el; }'
    }
  },
  watch: [
    {
      source: { type: 'JSFunction', value: '() => this.count' },
      handler: {
        type: 'JSFunction',
        value: 'function(val) { console.log("count changed", val) }'
      },
      deep: false,
      immediate: true
    }
  ],
  inject: [{ name: 'theme', from: 'theme', default: 'light' }],
  composables: [
    {
      name: 'mouse',
      composable: 'useMouse',
      from: '@vueuse/core'
    },
    {
      composable: 'useUserStore',
      from: '@/store/user',
      destructure: ['user', 'login']
    }
  ],
  provide: {
    appName: 'demo'
  },
  setup: {
    type: 'JSFunction',
    value: '() => { console.log("setup running", this.title); this.count = 5; }'
  },
  lifeCycles: {
    created: {
      type: 'JSFunction',
      value: 'function() { console.log("created", this.count) }'
    },
    mounted: {
      type: 'JSFunction',
      value: 'function() { console.log("mounted", this.list) }'
    },
    onUnmounted: {
      type: 'JSFunction',
      value: '() => { console.log("bye") }'
    }
  },
  nodes: [
    {
      id: 'n1',
      name: 'div',
      children: [
        {
          id: 'n2',
          name: 'span',
          children: {
            type: 'JSExpression',
            value: '`${this.title}: ${this.count}`'
          }
        },
        {
          id: 'n3',
          name: 'button',
          events: {
            click: {
              name: 'click',
              handler: {
                type: 'JSFunction',
                value: '() => this.handleClick()'
              }
            }
          },
          children: '点击'
        }
      ]
    }
  ]
};
