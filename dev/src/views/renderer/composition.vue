<template>
  <div>
    <component :is="renderer"></component>
  </div>
</template>

<script lang="ts" setup>
  import { createRenderer } from '@vtj/renderer';

  const { renderer } = createRenderer({
    dsl: {
      id: 'composition-demo',
      name: 'CompositionDemo',
      apiMode: 'composition',

      // ref 响应式数据
      refs: {
        count: { type: 'JSExpression', value: '0' },
        message: { type: 'JSExpression', value: '"Hello VTJ"' }
      },

      // reactive 响应式数据
      reactives: {
        form: {
          type: 'JSExpression',
          value: '({ name: "VTJ", version: "1.0.0" })'
        },
        user: {
          type: 'JSExpression',
          value: '({ nickname: "Admin", role: "developer" })'
        }
      },

      // 计算属性
      computed: {
        greeting: {
          type: 'JSFunction',
          value:
            '() => `Message: ${this.message.value} | Count: ${this.count.value}`'
        },
        userInfo: {
          type: 'JSFunction',
          value: '() => `${this.user.nickname} (${this.user.role})`'
        }
      },

      // 方法
      methods: {
        increment: {
          type: 'JSFunction',
          value: '() => { this.count.value++ }'
        },
        reset: {
          type: 'JSFunction',
          value:
            '() => { this.count.value = 0; this.message.value = "Hello VTJ" }'
        },
        updateMessage: {
          type: 'JSFunction',
          value: '(msg) => { this.message.value = msg }'
        },
        updateRole: {
          type: 'JSFunction',
          value:
            '() => { this.user.role = this.user.role === "developer" ? "admin" : "developer" }'
        }
      },

      // 生命周期（composition 风格）
      lifeCycles: {
        onMounted: {
          type: 'JSFunction',
          value:
            '() => { console.log("[CompositionDemo] onMounted", this.count.value) }'
        },
        onUnmounted: {
          type: 'JSFunction',
          value: '() => { console.log("[CompositionDemo] onUnmounted") }'
        }
      },

      // 节点模板
      nodes: [
        {
          id: 'root',
          name: 'div',
          props: {
            style: {
              padding: '20px',
              fontFamily: 'Arial, sans-serif',
              border: '1px solid #e8e8e8',
              borderRadius: '8px',
              maxWidth: '500px'
            }
          },
          children: [
            {
              id: 'title',
              name: 'h3',
              children: '🧩 Composition API 模式示例'
            },
            {
              id: 'count-section',
              name: 'div',
              props: { style: { marginTop: '12px' } },
              children: [
                {
                  id: 'count-label',
                  name: 'span',
                  children: 'Count: '
                },
                {
                  id: 'count-value',
                  name: 'span',
                  props: {
                    style: {
                      fontWeight: 'bold',
                      fontSize: '20px',
                      color: '#1890ff'
                    }
                  },
                  children: {
                    type: 'JSExpression',
                    value: 'this.count.value'
                  }
                }
              ]
            },
            {
              id: 'message-section',
              name: 'div',
              props: { style: { marginTop: '8px' } },
              children: [
                { id: 'msg-label', name: 'span', children: 'Message: ' },
                {
                  id: 'msg-value',
                  name: 'span',
                  props: { style: { color: '#52c41a' } },
                  children: {
                    type: 'JSExpression',
                    value: 'this.message.value'
                  }
                }
              ]
            },
            {
              id: 'form-section',
              name: 'div',
              props: { style: { marginTop: '8px' } },
              children: [
                { id: 'form-label', name: 'span', children: 'Form: ' },
                {
                  id: 'form-value',
                  name: 'span',
                  props: { style: { color: '#722ed1' } },
                  children: {
                    type: 'JSExpression',
                    value: '`${this.form.name} v${this.form.version}`'
                  }
                }
              ]
            },
            {
              id: 'user-section',
              name: 'div',
              props: { style: { marginTop: '8px' } },
              children: [
                { id: 'user-label', name: 'span', children: 'User: ' },
                {
                  id: 'user-value',
                  name: 'span',
                  props: { style: { color: '#eb2f96' } },
                  children: {
                    type: 'JSExpression',
                    value: 'this.userInfo.value'
                  }
                }
              ]
            },
            {
              id: 'greeting-section',
              name: 'div',
              props: {
                style: { marginTop: '8px', color: '#8c8c8c', fontSize: '13px' }
              },
              children: [
                { id: 'greeting-label', name: 'span', children: 'Greeting: ' },
                {
                  id: 'greeting-value',
                  name: 'span',
                  children: {
                    type: 'JSExpression',
                    value: 'this.greeting.value'
                  }
                }
              ]
            },
            {
              id: 'input-section',
              name: 'div',
              props: { style: { marginTop: '12px' } },
              children: [
                {
                  id: 'msg-input',
                  name: 'input',
                  props: {
                    placeholder: 'Type a message...',
                    style: {
                      padding: '4px 8px',
                      marginRight: '8px',
                      borderRadius: '4px',
                      border: '1px solid #d9d9d9'
                    },
                    value: {
                      type: 'JSExpression',
                      value: 'this.message.value'
                    }
                  },
                  events: {
                    input: {
                      name: 'input',
                      handler: {
                        type: 'JSFunction',
                        value: '(e) => this.updateMessage(e.target.value)'
                      }
                    }
                  }
                }
              ]
            },
            {
              id: 'buttons-section',
              name: 'div',
              props: { style: { marginTop: '12px' } },
              children: [
                {
                  id: 'btn-increment',
                  name: 'button',
                  props: {
                    style: {
                      marginRight: '8px',
                      padding: '4px 16px',
                      cursor: 'pointer'
                    }
                  },
                  events: {
                    click: {
                      name: 'click',
                      handler: {
                        type: 'JSFunction',
                        value: '() => this.increment()'
                      }
                    }
                  },
                  children: '➕ Increment'
                },
                {
                  id: 'btn-toggle-role',
                  name: 'button',
                  props: {
                    style: {
                      marginRight: '8px',
                      padding: '4px 16px',
                      cursor: 'pointer'
                    }
                  },
                  events: {
                    click: {
                      name: 'click',
                      handler: {
                        type: 'JSFunction',
                        value: '() => this.updateRole()'
                      }
                    }
                  },
                  children: '🔄 Toggle Role'
                },
                {
                  id: 'btn-reset',
                  name: 'button',
                  props: {
                    style: { padding: '4px 16px', cursor: 'pointer' }
                  },
                  events: {
                    click: {
                      name: 'click',
                      handler: {
                        type: 'JSFunction',
                        value: '() => this.reset()'
                      }
                    }
                  },
                  children: '🔁 Reset'
                }
              ]
            },
            {
              id: 'footer',
              name: 'div',
              props: {
                style: {
                  marginTop: '16px',
                  fontSize: '12px',
                  color: '#bfbfbf',
                  borderTop: '1px solid #f0f0f0',
                  paddingTop: '8px'
                }
              },
              children: {
                type: 'JSExpression',
                value: '`Rendered at: ${new Date().toLocaleTimeString()}`'
              }
            }
          ]
        }
      ]
    }
  });
</script>
