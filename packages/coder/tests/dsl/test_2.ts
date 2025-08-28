export const test_2 = {
  name: 'Bbb',
  locked: false,
  inject: [],
  state: {},
  lifeCycles: {},
  methods: {
    handleNodeClick: {
      type: 'JSFunction',
      value: "() => {\n  this.$emit('node-click', this.node.name);\n}"
    },
    handleToggleNode: {
      type: 'JSFunction',
      value:
        "(e) => {\n  e.stopPropagation();\n  this.$emit('toggle-node', this.node.name);\n  if (!this.node.childrenLoaded && !this.expandedNodes.has(this.node.name)) {\n    this.$emit('load-children', this.node);\n  }\n}"
    }
  },
  computed: {},
  watch: [],
  css: '',
  props: [
    {
      name: 'node',
      required: true,
      type: 'Object'
    },
    {
      name: 'selectedNode',
      required: false,
      type: 'String',
      default: {
        type: 'JSExpression',
        value: "''"
      }
    },
    {
      name: 'expandedNodes',
      required: true,
      type: 'Set'
    }
  ],
  emits: [
    {
      name: 'node-click',
      params: [null]
    },
    {
      name: 'toggle-node',
      params: [null]
    },
    {
      name: 'load-children',
      params: [null]
    }
  ],
  slots: [],
  dataSources: {},
  __VTJ_BLOCK__: true,
  __VERSION__: '1756258696674',
  id: '235w0t1w',
  nodes: [
    {
      id: '19gngerb',
      name: 'div',
      from: '',
      invisible: false,
      locked: false,
      children: [
        {
          id: '29gngerb',
          name: 'div',
          from: '',
          invisible: false,
          locked: false,
          children: [
            {
              id: '39gngerc',
              name: 'XIcon',
              from: '@vtj/ui',
              invisible: false,
              locked: false,
              children: [],
              props: {
                icon: {
                  type: 'JSExpression',
                  value:
                    'expandedNodes.has(node.name)\n  ? this.$libs.VtjIcons.Minus\n  : this.$libs.VtjIcons.Plus'
                },
                class: 'expand-icon',
                color: '#666666'
              },
              directives: [
                {
                  id: 'b9gngesi',
                  name: 'vIf',
                  value: {
                    type: 'JSExpression',
                    value: 'node.hasChildren'
                  }
                }
              ],
              events: {
                click: {
                  name: 'click',
                  handler: {
                    type: 'JSFunction',
                    value: 'this.handleToggleNode'
                  },
                  modifiers: {
                    stop: true
                  }
                }
              }
            },
            {
              id: '49gngerc',
              name: 'XIcon',
              from: '@vtj/ui',
              invisible: false,
              locked: false,
              children: [],
              props: {
                icon: {
                  type: 'JSExpression',
                  value: 'this.$libs.VtjIcons.User'
                },
                class: 'type-icon',
                color: '#666666'
              },
              directives: [],
              events: {}
            },
            {
              id: '59gngerc',
              name: 'span',
              from: '',
              invisible: false,
              locked: false,
              children: {
                type: 'JSExpression',
                value: 'node.name'
              },
              props: {
                class: 'item-name'
              },
              directives: [],
              events: {}
            },
            {
              id: '69gngerc',
              name: 'div',
              from: '',
              invisible: false,
              locked: false,
              children: [
                {
                  id: '79gngerc',
                  name: 'XIcon',
                  from: '@vtj/ui',
                  invisible: false,
                  locked: false,
                  children: [],
                  props: {
                    icon: {
                      type: 'JSExpression',
                      value: 'this.$libs.VtjIcons.Refresh'
                    },
                    class: 'action-icon',
                    color: '#666666'
                  },
                  directives: [],
                  events: {
                    click: {
                      name: 'click',
                      handler: {
                        type: 'JSFunction',
                        value:
                          "($event) => {\n  $emit('load-children', node);\n}"
                      },
                      modifiers: {
                        stop: true
                      }
                    }
                  }
                },
                {
                  id: '89gngerc',
                  name: 'XIcon',
                  from: '@vtj/ui',
                  invisible: false,
                  locked: false,
                  children: [],
                  props: {
                    icon: {
                      type: 'JSExpression',
                      value: 'this.$libs.VtjIcons.Grid'
                    },
                    class: 'action-icon',
                    color: '#666666'
                  },
                  directives: [],
                  events: {
                    click: {
                      name: 'click',
                      handler: {
                        type: 'JSFunction',
                        value: "($event) => {\n  $emit('show-menu');\n}"
                      },
                      modifiers: {
                        stop: true
                      }
                    }
                  }
                }
              ],
              props: {
                class: 'action-icons'
              },
              directives: [],
              events: {}
            }
          ],
          props: {
            class: 'item-content'
          },
          directives: [],
          events: {}
        },
        {
          id: '99gngerc',
          name: 'div',
          from: '',
          invisible: false,
          locked: false,
          children: [
            {
              id: 'a9gngerc',
              name: 'TreeNode',
              from: '',
              invisible: false,
              locked: false,
              children: [],
              props: {
                key: {
                  type: 'JSExpression',
                  value: 'this.context.child.id'
                },
                node: {
                  type: 'JSExpression',
                  value: 'this.context.child'
                },
                'selected-node': {
                  type: 'JSExpression',
                  value: 'this.selectedNode'
                },
                'expanded-nodes': {
                  type: 'JSExpression',
                  value: 'this.expandedNodes'
                }
              },
              directives: [
                {
                  id: 'c9gngesi',
                  name: 'vFor',
                  value: {
                    type: 'JSExpression',
                    value: 'node.children'
                  },
                  iterator: {
                    item: 'child',
                    index: 'index'
                  }
                }
              ],
              events: {
                'node-click': {
                  name: 'node-click',
                  handler: {
                    type: 'JSFunction',
                    value: "($event) => {\n  $emit('node-click', $event);\n}"
                  },
                  modifiers: {}
                },
                'toggle-node': {
                  name: 'toggle-node',
                  handler: {
                    type: 'JSFunction',
                    value: "($event) => {\n  $emit('toggle-node', $event);\n}"
                  },
                  modifiers: {}
                },
                'load-children': {
                  name: 'load-children',
                  handler: {
                    type: 'JSFunction',
                    value: "($event) => {\n  $emit('load-children', $event);\n}"
                  },
                  modifiers: {}
                }
              }
            }
          ],
          props: {
            class: 'child-nodes'
          },
          directives: [
            {
              id: 'd9gngesi',
              name: 'vIf',
              value: {
                type: 'JSExpression',
                value: 'expandedNodes.has(node.name)'
              }
            }
          ],
          events: {}
        }
      ],
      props: {
        class: {
          type: 'JSExpression',
          value:
            "['tree-item', { 'selected-node': selectedNode === node.name }]"
        }
      },
      directives: [],
      events: {}
    }
  ]
};
