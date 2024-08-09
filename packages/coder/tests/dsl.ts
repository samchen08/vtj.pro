export const dsl = {
  name: 'Test',
  locked: false,
  inject: [],
  state: {},
  lifeCycles: {},
  methods: {},
  computed: {
    testComputed: {
      type: 'JSFunction',
      value: "() => {\r\n    return 'ab'\r\n}"
    }
  },
  watch: [],
  css: '',
  props: [],
  emits: [],
  slots: [],
  dataSources: {},
  __VTJ_BLOCK__: true,
  __VERSION__: '1723162511691',
  id: '1xc2yxyg7hz',
  nodes: [
    {
      id: 'v16xm3apre',
      name: 'div',
      from: '',
      invisible: false,
      locked: false,
      children: {
        type: 'JSExpression',
        value: 'this.testComputed.value'
      },
      props: {},
      directives: [],
      events: {}
    }
  ]
};
