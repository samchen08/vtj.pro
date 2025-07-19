export const test_2 = {
  name: 'Bbb',
  locked: false,
  inject: [],
  state: {},
  lifeCycles: {},
  methods: {
    fetchArticles: {
      type: 'JSFunction',
      value:
        "() => {\n  const mockArticles = this.$libs.Mock.Mock.mock({\n    'total|20-50': 0,\n    'list|5': [\n      {\n        'id|+1': 1,\n        title: '@ctitle(10, 20)',\n        summary: '@cparagraph(2, 4)',\n        date: '@date(\"yyyy-MM-dd\")',\n        author: '@cname()',\n        'category|1': ['前端技术', '后端开发', '设计', '生活随笔']\n      }\n    ]\n  });\n  this.state.latestArticles = mockArticles.list;\n  this.state.totalArticles = mockArticles.total;\n}"
    }
  },
  computed: {},
  watch: [],
  css: '',
  props: [],
  emits: [],
  slots: [],
  dataSources: {},
  __VTJ_BLOCK__: true,
  __VERSION__: '1746533057463',
  id: '235w0t1w',
  nodes: [
    {
      id: '14zt27ji',
      name: 'div',
      from: '',
      invisible: false,
      locked: false,
      children: [
        {
          id: '24zt27ji',
          name: 'XIcon',
          from: '',
          invisible: false,
          locked: false,
          children: [],
          props: {
            icon: {
              type: 'JSExpression',
              value: 'this.$libs.VtjIcons.VtjIconComponents'
            },
            size: '24'
          },
          directives: [],
          events: {}
        }
      ],
      props: {
        class: 'landing-page'
      },
      directives: [],
      events: {}
    }
  ]
};
