<template>
  <div>
    <component
      :is="renderer"
      name="传递的Name"
      title="CTitle"
      :config="config"
      show-details></component>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { createRenderer } from '@vtj/renderer';

  const config = reactive({
    theme: 'dark',
    version: 1
  });
  const { renderer } = createRenderer({
    dsl: {
      id: 'props-demo',
      name: 'PropsDemo',
      apiMode: 'composition',

      // 定义属性参数
      props: [
        // 简写形式（仅名称）
        'name',
        // 完整定义形式
        {
          name: 'title',
          type: 'String',
          default: { type: 'JSExpression', value: '"Props Demo"' }
        },
        {
          name: 'initialCount',
          type: 'Number',
          default: { type: 'JSExpression', value: '0' }
        },
        {
          name: 'showDetails',
          type: 'Boolean',
          default: { type: 'JSExpression', value: 'true' }
        },
        {
          name: 'tags',
          type: 'Array',
          default: { type: 'JSExpression', value: '["vue", "vtj", "props"]' }
        },
        {
          name: 'config',
          type: 'Object',
          default: {
            type: 'JSExpression',
            value: '({ theme: "light", version: 1 })'
          }
        }
      ],

      // 定义事件
      emits: [
        // 简写形式
        'reset',
        // 完整定义形式
        { name: 'update:count', params: ['value'] },
        { name: 'tagClick', params: ['tag'] }
      ],

      // ref 响应式数据
      refs: {
        count: { type: 'JSExpression', value: '0' },
        localMessage: { type: 'JSExpression', value: '"点击按钮操作 props"' },
        lastEmit: { type: 'JSExpression', value: '""' },
        emitLogs: { type: 'JSExpression', value: '[]' }
      },

      // 计算属性
      computed: {
        summary: {
          type: 'JSFunction',
          value:
            '() => `"${this.title}" | Count: ${this.count.value} | Tags: ${this.tags.length} items`'
        },
        isDark: {
          type: 'JSFunction',
          value: '() => this.config.theme === "dark"'
        }
      },

      // 方法
      methods: {
        increment: {
          type: 'JSFunction',
          value:
            '() => { this.count.value++; this.$emit("update:count", this.count.value); this.logEmit("update:count", this.count.value) }'
        },
        decrement: {
          type: 'JSFunction',
          value:
            '() => { this.count.value--; this.$emit("update:count", this.count.value); this.logEmit("update:count", this.count.value) }'
        },
        handleTagClick: {
          type: 'JSFunction',
          value:
            '(tag) => { this.localMessage.value = `Tag clicked: ${tag}`; this.$emit("tagClick", tag); this.logEmit("tagClick", tag) }'
        },
        handleReset: {
          type: 'JSFunction',
          value:
            '() => { this.count.value = 0; this.localMessage.value = "已重置"; this.$emit("reset"); this.logEmit("reset", null); }'
        },
        toggleDetails: {
          type: 'JSFunction',
          value: '() => { this.showDetails = !this.showDetails }'
        },
        toggleTheme: {
          type: 'JSFunction',
          value:
            '() => { this.config.theme = this.config.theme === "light" ? "dark" : "light" }'
        },
        logEmit: {
          type: 'JSFunction',
          value:
            '(event, payload) => { const time = new Date().toLocaleTimeString(); const log = `[${time}] ${event}${payload !== null ? " → " + JSON.stringify(payload) : ""}`; this.lastEmit.value = log; this.emitLogs.value = [log, ...this.emitLogs.value].slice(0, 5) }'
        },
        clearLogs: {
          type: 'JSFunction',
          value: '() => { this.lastEmit.value = ""; this.emitLogs.value = [] }'
        }
      },

      // 侦听器
      watch: [
        {
          source: { type: 'JSExpression', value: 'this.count' },
          handler: {
            type: 'JSFunction',
            value:
              '(newVal, oldVal) => { console.log("[Watch count]", oldVal, "→", newVal) }'
          }
        }
      ],

      // 生命周期
      lifeCycles: {
        onMounted: {
          type: 'JSFunction',
          value:
            '() => { this.count.value = this.initialCount; console.log("[PropsDemo] onMounted", this.title) }'
        },
        onUnmounted: {
          type: 'JSFunction',
          value: '() => { console.log("[PropsDemo] onUnmounted") }'
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
              maxWidth: '560px'
            }
          },
          children: [
            {
              id: 'title',
              name: 'h3',
              children: '📦 Props & Emits 示例'
            },
            {
              id: 'intro',
              name: 'p',
              props: {
                style: { fontSize: '13px', color: '#8c8c8c', marginTop: '4px' }
              },
              children: {
                type: 'JSExpression',
                value: 'this.summary.value'
              }
            },

            // ---- 基础 Props 展示 ----
            {
              id: 'section-basic',
              name: 'div',
              props: {
                style: {
                  marginTop: '16px',
                  padding: '12px',
                  backgroundColor: '#fafafa',
                  borderRadius: '6px',
                  border: '1px solid #f0f0f0'
                }
              },
              children: [
                {
                  name: 'h4',
                  props: { style: { margin: '0 0 8px 0', fontSize: '14px' } },
                  children: '🔧 基础 Props'
                },
                {
                  name: 'div',
                  props: { style: { fontSize: '13px', lineHeight: '1.8' } },
                  children: [
                    {
                      name: 'div',
                      children: [
                        {
                          name: 'span',
                          props: { style: { color: '#8c8c8c' } },
                          children: 'name: '
                        },
                        {
                          name: 'span',
                          props: {
                            style: { fontWeight: 'bold', color: '#1890ff' }
                          },
                          children: {
                            type: 'JSExpression',
                            value: 'this.name || "（未传递）"'
                          }
                        }
                      ]
                    },
                    {
                      name: 'div',
                      children: [
                        {
                          name: 'span',
                          props: { style: { color: '#8c8c8c' } },
                          children: 'title: '
                        },
                        {
                          name: 'span',
                          props: {
                            style: { fontWeight: 'bold', color: '#1890ff' }
                          },
                          children: {
                            type: 'JSExpression',
                            value: 'this.title'
                          }
                        }
                      ]
                    },
                    {
                      name: 'div',
                      children: [
                        {
                          name: 'span',
                          props: { style: { color: '#8c8c8c' } },
                          children: 'initialCount: '
                        },
                        {
                          name: 'span',
                          props: {
                            style: { fontWeight: 'bold', color: '#1890ff' }
                          },
                          children: {
                            type: 'JSExpression',
                            value: 'this.initialCount'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },

            // ---- 复杂类型 Props ----
            {
              id: 'section-complex',
              name: 'div',
              props: {
                style: {
                  marginTop: '12px',
                  padding: '12px',
                  backgroundColor: '#fafafa',
                  borderRadius: '6px',
                  border: '1px solid #f0f0f0'
                }
              },
              children: [
                {
                  name: 'h4',
                  props: { style: { margin: '0 0 8px 0', fontSize: '14px' } },
                  children: '📋 复杂类型 Props'
                },
                {
                  name: 'div',
                  props: { style: { fontSize: '13px', lineHeight: '1.8' } },
                  children: [
                    {
                      name: 'div',
                      children: [
                        {
                          name: 'span',
                          props: { style: { color: '#8c8c8c' } },
                          children: 'showDetails: '
                        },
                        {
                          name: 'span',
                          props: {
                            style: {
                              fontWeight: 'bold',
                              color: '#52c41a'
                            }
                          },
                          children: {
                            type: 'JSExpression',
                            value: 'String(this.showDetails)'
                          }
                        }
                      ]
                    },
                    {
                      name: 'div',
                      children: [
                        {
                          name: 'span',
                          props: { style: { color: '#8c8c8c' } },
                          children: 'tags: '
                        },
                        {
                          name: 'span',
                          props: {
                            style: { fontWeight: 'bold', color: '#722ed1' }
                          },
                          children: {
                            type: 'JSExpression',
                            value: 'this.tags.join(", ")'
                          }
                        }
                      ]
                    },
                    {
                      name: 'div',
                      children: [
                        {
                          name: 'span',
                          props: { style: { color: '#8c8c8c' } },
                          children: 'config: '
                        },
                        {
                          name: 'span',
                          props: {
                            style: { fontWeight: 'bold', color: '#eb2f96' }
                          },
                          children: {
                            type: 'JSExpression',
                            value: 'JSON.stringify(this.config)'
                          }
                        }
                      ]
                    },
                    {
                      name: 'div',
                      children: [
                        {
                          name: 'span',
                          props: { style: { color: '#8c8c8c' } },
                          children: 'isDark: '
                        },
                        {
                          name: 'span',
                          props: { style: { fontWeight: 'bold' } },
                          children: {
                            type: 'JSExpression',
                            value: 'String(this.isDark.value)'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },

            // ---- Tag 列表 ----
            {
              id: 'tags-section',
              name: 'div',
              props: { style: { marginTop: '16px' } },
              children: [
                {
                  name: 'h4',
                  props: { style: { margin: '0 0 8px 0', fontSize: '14px' } },
                  children: '🏷️ Tags（点击触发 emit）'
                },
                {
                  id: 'tag-list',
                  name: 'div',
                  props: {
                    style: { display: 'flex', gap: '8px', flexWrap: 'wrap' }
                  },
                  children: [
                    {
                      id: 'tag-item',
                      name: 'span',
                      directives: [
                        {
                          name: 'vFor',
                          value: { type: 'JSExpression', value: 'this.tags' },
                          iterator: {
                            item: 'tag',
                            index: 'idx'
                          }
                        }
                      ],
                      props: {
                        style: {
                          display: 'inline-block',
                          padding: '4px 12px',
                          backgroundColor: '#e6f7ff',
                          border: '1px solid #91d5ff',
                          borderRadius: '4px',
                          fontSize: '13px',
                          color: '#1890ff',
                          cursor: 'pointer'
                        }
                      },
                      events: {
                        click: {
                          name: 'click',
                          handler: {
                            type: 'JSFunction',
                            value: '(e) => this.handleTagClick(tag)'
                          }
                        }
                      },
                      children: {
                        type: 'JSExpression',
                        value: 'tag'
                      }
                    }
                  ]
                }
              ]
            },

            // ---- 操作按钮 ----
            {
              id: 'actions-section',
              name: 'div',
              props: { style: { marginTop: '16px' } },
              children: [
                {
                  name: 'h4',
                  props: { style: { margin: '0 0 8px 0', fontSize: '14px' } },
                  children: '⚡ 操作（触发 Emit）'
                },
                {
                  name: 'div',
                  props: {
                    style: { display: 'flex', gap: '8px', flexWrap: 'wrap' }
                  },
                  children: [
                    {
                      name: 'button',
                      props: {
                        style: { padding: '4px 16px', cursor: 'pointer' }
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
                      children: '➕ Count+'
                    },
                    {
                      name: 'button',
                      props: {
                        style: { padding: '4px 16px', cursor: 'pointer' }
                      },
                      events: {
                        click: {
                          name: 'click',
                          handler: {
                            type: 'JSFunction',
                            value: '() => this.decrement()'
                          }
                        }
                      },
                      children: '➖ Count-'
                    },
                    {
                      name: 'button',
                      props: {
                        style: { padding: '4px 16px', cursor: 'pointer' },
                        disabled: {
                          type: 'JSExpression',
                          value: '!this.showDetails'
                        }
                      },
                      events: {
                        click: {
                          name: 'click',
                          handler: {
                            type: 'JSFunction',
                            value: '() => this.toggleDetails()'
                          }
                        }
                      },
                      children: {
                        type: 'JSExpression',
                        value:
                          'this.showDetails ? "🔒 隐藏详情" : "🔓 显示详情"'
                      }
                    },
                    {
                      name: 'button',
                      props: {
                        style: { padding: '4px 16px', cursor: 'pointer' }
                      },
                      events: {
                        click: {
                          name: 'click',
                          handler: {
                            type: 'JSFunction',
                            value: '() => this.toggleTheme()'
                          }
                        }
                      },
                      children: '🎨 切换主题'
                    },
                    {
                      name: 'button',
                      props: {
                        style: {
                          padding: '4px 16px',
                          cursor: 'pointer',
                          backgroundColor: '#fff1f0',
                          borderColor: '#ffa39e',
                          color: '#cf1322'
                        }
                      },
                      events: {
                        click: {
                          name: 'click',
                          handler: {
                            type: 'JSFunction',
                            value: '() => this.handleReset()'
                          }
                        }
                      },
                      children: '🔄 Reset (emit)'
                    }
                  ]
                }
              ]
            },

            // ---- 当前 Count ----
            {
              id: 'count-display',
              name: 'div',
              props: {
                style: {
                  marginTop: '12px',
                  padding: '12px',
                  backgroundColor: '#fffbe6',
                  border: '1px solid #ffe58f',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontSize: '14px'
                }
              },
              children: [
                { name: 'span', children: '当前 Count: ' },
                {
                  name: 'span',
                  props: {
                    style: {
                      fontWeight: 'bold',
                      fontSize: '24px',
                      color: '#fa8c16'
                    }
                  },
                  children: { type: 'JSExpression', value: 'this.count.value' }
                }
              ]
            },

            // ---- vShow 条件渲染示例（使用 directives） ----
            {
              id: 'details-section',
              name: 'div',
              props: {
                style: {
                  marginTop: '12px',
                  padding: '12px',
                  backgroundColor: '#f6ffed',
                  border: '1px solid #b7eb8f',
                  borderRadius: '6px',
                  fontSize: '13px'
                }
              },
              directives: [
                {
                  name: 'vShow',
                  value: { type: 'JSExpression', value: 'this.showDetails' }
                }
              ],
              children: [
                {
                  name: 'span',
                  props: { style: { color: '#8c8c8c' } },
                  children: '📝 '
                },
                {
                  name: 'span',
                  children: {
                    type: 'JSExpression',
                    value: 'this.localMessage.value'
                  }
                }
              ]
            },

            // ---- Emit 日志 ----
            {
              id: 'logs-section',
              name: 'div',
              props: {
                style: {
                  marginTop: '12px',
                  padding: '8px 12px',
                  backgroundColor: '#fff7e6',
                  border: '1px solid #ffd591',
                  borderRadius: '4px',
                  fontSize: '13px',
                  color: '#d46b08'
                }
              },
              children: [
                {
                  name: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '4px'
                    }
                  },
                  children: [
                    {
                      name: 'span',
                      props: { style: { fontWeight: 'bold' } },
                      children: '🔔 Emit 日志'
                    },
                    {
                      name: 'button',
                      props: {
                        style: {
                          padding: '2px 8px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: '#d46b08',
                          textDecoration: 'underline'
                        }
                      },
                      events: {
                        click: {
                          name: 'click',
                          handler: {
                            type: 'JSFunction',
                            value: '() => this.clearLogs()'
                          }
                        }
                      },
                      children: '清空'
                    }
                  ]
                },
                ...(function () {
                  const items = [];
                  for (let i = 0; i < 5; i++) {
                    items.push({
                      id: 'log-' + i,
                      name: 'div',
                      props: {
                        style: {
                          padding: '2px 0',
                          fontSize: '12px',
                          fontFamily: 'monospace'
                        }
                      },
                      children: {
                        type: 'JSExpression' as const,
                        value: 'this.emitLogs.value[' + i + '] || ""'
                      }
                    });
                  }
                  return items;
                })()
              ]
            },

            // ---- Footer ----
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
