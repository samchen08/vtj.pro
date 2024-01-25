export const dsl = {
    name: 'A',
    locked: false,
    inject: [],
    state: {
      list: {
        type: 'JSExpression',
        value:
          '[\r\n    {\r\n        "date": "2016-05-03",\r\n        "name": "Tom",\r\n        "address": "No. 189, Grove St, Los Angeles"\r\n    },\r\n    {\r\n        "date": "2016-05-02",\r\n        "name": "Tom",\r\n        "address": "No. 189, Grove St, Los Angeles"\r\n    },\r\n    {\r\n        "date": "2016-05-04",\r\n        "name": "Tom",\r\n        "address": "No. 189, Grove St, Los Angeles"\r\n    },\r\n    {\r\n        "date": "2016-05-01",\r\n        "name": "Tom",\r\n        "address": "No. 189, Grove St, Los Angeles"\r\n    }\r\n]'
      }
    },
    lifeCycles: {
      mounted: {
        type: 'JSFunction',
        value:
          "() => {\r\n\r\n    this.$notify({\r\n        message: this.$libs.VtjUtils.MD5('abc')\r\n    })\r\n}"
      }
    },
    methods: {},
    computed: {},
    watch: [],
    css: '',
    props: [],
    emits: [],
    slots: [],
    dataSources: {},
    __VTJ_BLOCK__: true,
    __VERSION__: '1706101351474',
    id: '7zq4li15bn',
    nodes: [
      {
        id: '1brsb0b32ge',
        name: 'ElTable',
        from: 'element-plus',
        invisible: false,
        locked: false,
        children: [
          {
            id: '1oroqmxp0z3',
            name: 'ElTableColumn',
            from: 'element-plus',
            invisible: false,
            locked: false,
            children: [],
            props: {
              prop: 'date',
              label: 'Date'
            },
            directives: [],
            events: {}
          },
          {
            id: 'gk454225gv',
            name: 'ElTableColumn',
            from: 'element-plus',
            invisible: false,
            locked: false,
            children: [],
            props: {
              prop: 'name',
              label: 'Name'
            },
            directives: [],
            events: {}
          },
          {
            id: 'gnnr1rv86n',
            name: 'ElTableColumn',
            from: 'element-plus',
            invisible: false,
            locked: false,
            children: [
              {
                id: '2nx59zv4zmg',
                name: 'ElButton',
                from: 'element-plus',
                invisible: false,
                locked: false,
                slot: {
                  name: 'default',
                  params: ['row', 'column', '$index']
                },
                children: {
                  type: 'JSExpression',
                  value: 'this.context.row?.address'
                },
                props: {
                  type: 'primary'
                },
                directives: [],
                events: {
                  click: {
                    name: 'click',
                    handler: {
                      type: 'JSFunction',
                      value:
                        '() => {\r\n    this.$message.info({\r\n        message: JSON.stringify(this.context.row)\r\n    })\r\n}'
                    },
                    modifiers: {}
                  }
                }
              }
            ],
            props: {
              prop: 'address',
              label: 'Address'
            },
            directives: [],
            events: {}
          }
        ],
        props: {
          data: {
            type: 'JSExpression',
            value: 'this.state.list'
          }
        },
        directives: [],
        events: {}
      },
      {
        id: 'j0qdiz9729',
        name: 'ElPagination',
        from: 'element-plus',
        invisible: false,
        locked: false,
        children: [],
        props: {
          total: 1000,
          background: true
        },
        directives: [],
        events: {}
      }
    ]
  };
  