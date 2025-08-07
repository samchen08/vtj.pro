export const webPageJson: any = {
  name: 'LaunchPage',
  locked: false,
  inject: [],
  state: {
    quickActions: {
      type: 'JSExpression',
      value:
        "[\n  { icon: this.$libs.VtjIcons.HomeFilled, label: '首页', action: 'home' },\n  { icon: this.$libs.VtjIcons.Setting, label: '设置', action: 'settings' },\n  { icon: this.$libs.VtjIcons.Help, label: '帮助', action: 'help' }\n]"
    }
  },
  lifeCycles: {},
  methods: {
    handleLogin: {
      type: 'JSFunction',
      value:
        "() => {\n\n  this.$libs.ElementPlus.ElMessage({ message: 'login' })\n}"
    },
    handleRegister: {
      type: 'JSFunction',
      value:
        "() => {\n  this.$libs.ElementPlus.ElMessage({ message: 'register' })\n}"
    },
    handleQuickAction: {
      type: 'JSFunction',
      value:
        '(action) => {\n  this.$libs.ElementPlus.ElMessage({ message: action.action })\n}'
    },
    handleAbout: {
      type: 'JSFunction',
      value:
        "() => {\n  this.$libs.ElementPlus.ElMessage({ message: 'about' })\n}"
    },
    handleTerms: {
      type: 'JSFunction',
      value:
        "() => {\n  this.$libs.ElementPlus.ElMessage({ message: 'terms' })\n}"
    },
    handlePrivacy: {
      type: 'JSFunction',
      value:
        "() => {\n\n  this.$libs.ElementPlus.ElMessage({ message: 'privacy' })\n}"
    }
  },
  computed: {},
  watch: [],
  css: '.launch-page {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);\n  padding: 20px;\n  text-align: center;\n  box-sizing: border-box;\n}\n\n.header {\n  margin-top: 80px;\n  margin-bottom: 60px;\n}\n\n.logo {\n  border-radius: 50%;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  margin-bottom: 20px;\n}\n\n.title {\n  font-size: 2.5rem;\n  color: #333;\n  margin-bottom: 10px;\n}\n\n.subtitle {\n  font-size: 1.2rem;\n  color: #666;\n}\n\n.main {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.action-buttons {\n  display: flex;\n  gap: 20px;\n  margin-bottom: 60px;\n}\n\n.action-button {\n  min-width: 150px;\n}\n\n.quick-actions {\n  display: flex;\n  gap: 40px;\n  margin-bottom: 40px;\n}\n\n.quick-action {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  color: #555;\n}\n\n.quick-action:hover {\n  transform: translateY(-5px);\n  color: #409eff;\n}\n\n.action-icon {\n  margin-bottom: 8px;\n}\n\n.footer {\n  margin-top: auto;\n  padding: 20px 0;\n  color: #666;\n  font-size: 0.9rem;\n}\n\n.footer-links {\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n  margin-top: 10px;\n}\n\n.footer-links a {\n  color: #666;\n  text-decoration: none;\n}\n\n.footer-links a:hover {\n  color: #409eff;\n  text-decoration: underline;\n}',
  props: [],
  emits: [],
  slots: [],
  dataSources: {},
  __VTJ_BLOCK__: true,
  __VERSION__: '1754535531764',
  id: '18o4hf0s',
  nodes: [
    {
      id: '18neu6td',
      name: 'div',
      from: '',
      invisible: false,
      locked: false,
      children: [
        {
          id: '28neu6td',
          name: 'header',
          from: '',
          invisible: false,
          locked: false,
          children: [
            {
              id: '38neu6td',
              name: 'img',
              from: '',
              invisible: false,
              locked: false,
              children: [],
              props: {
                src: 'https://picsum.photos/120/120?random=1',
                alt: 'App Logo',
                class: 'logo'
              },
              directives: [],
              events: {}
            },
            {
              id: '48neu6td',
              name: 'h1',
              from: '',
              invisible: false,
              locked: false,
              children: '欢迎使用我们的应用',
              props: {
                class: 'title'
              },
              directives: [],
              events: {}
            },
            {
              id: '58neu6td',
              name: 'p',
              from: '',
              invisible: false,
              locked: false,
              children: '让工作更高效，让生活更简单',
              props: {
                class: 'subtitle'
              },
              directives: [],
              events: {}
            }
          ],
          props: {
            class: 'header'
          },
          directives: [],
          events: {}
        },
        {
          id: '68neu6td',
          name: 'main',
          from: '',
          invisible: false,
          locked: false,
          children: [
            {
              id: '78neu6te',
              name: 'div',
              from: '',
              invisible: false,
              locked: false,
              children: [
                {
                  id: '88neu6te',
                  name: 'ElButton',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: ' 立即登录 ',
                  props: {
                    type: 'primary',
                    size: 'large',
                    class: 'action-button'
                  },
                  directives: [],
                  events: {
                    click: {
                      name: 'click',
                      handler: {
                        type: 'JSFunction',
                        value: 'this.handleLogin'
                      },
                      modifiers: {}
                    }
                  }
                },
                {
                  id: '98neu6te',
                  name: 'ElButton',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: ' 注册账号 ',
                  props: {
                    size: 'large',
                    class: 'action-button'
                  },
                  directives: [],
                  events: {
                    click: {
                      name: 'click',
                      handler: {
                        type: 'JSFunction',
                        value: 'this.handleRegister'
                      },
                      modifiers: {}
                    }
                  }
                }
              ],
              props: {
                class: 'action-buttons'
              },
              directives: [],
              events: {}
            },
            {
              id: 'a8neu6te',
              name: 'div',
              from: '',
              invisible: false,
              locked: false,
              children: [
                {
                  id: 'b8neu6te',
                  name: 'div',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: [
                    {
                      id: 'c8neu6te',
                      name: 'XIcon',
                      from: '@vtj/ui',
                      invisible: false,
                      locked: false,
                      children: [],
                      props: {
                        icon: {
                          type: 'JSExpression',
                          value: 'this.context.action.icon'
                        },
                        size: {
                          type: 'JSExpression',
                          value: '24'
                        },
                        class: 'action-icon'
                      },
                      directives: [],
                      events: {}
                    },
                    {
                      id: 'd8neu6te',
                      name: 'span',
                      from: '',
                      invisible: false,
                      locked: false,
                      children: {
                        type: 'JSExpression',
                        value: 'this.context.action.label'
                      },
                      props: {},
                      directives: [],
                      events: {}
                    }
                  ],
                  props: {
                    key: {
                      type: 'JSExpression',
                      value: 'this.context.index'
                    },
                    class: 'quick-action'
                  },
                  directives: [
                    {
                      id: 'k8neu6uf',
                      name: 'vFor',
                      value: {
                        type: 'JSExpression',
                        value: 'this.state.quickActions'
                      },
                      iterator: {
                        item: 'action',
                        index: 'index'
                      }
                    }
                  ],
                  events: {
                    click: {
                      name: 'click',
                      handler: {
                        type: 'JSFunction',
                        value:
                          '($event) => {\n  this.handleQuickAction(this.context.action);\n}'
                      },
                      modifiers: {}
                    }
                  }
                }
              ],
              props: {
                class: 'quick-actions'
              },
              directives: [],
              events: {}
            }
          ],
          props: {
            class: 'main'
          },
          directives: [],
          events: {}
        },
        {
          id: 'e8neu6te',
          name: 'footer',
          from: '',
          invisible: false,
          locked: false,
          children: [
            {
              id: 'f8neu6te',
              name: 'p',
              from: '',
              invisible: false,
              locked: false,
              children: '© 2023 我们的应用. 保留所有权利.',
              props: {},
              directives: [],
              events: {}
            },
            {
              id: 'g8neu6te',
              name: 'div',
              from: '',
              invisible: false,
              locked: false,
              children: [
                {
                  id: 'h8neu6te',
                  name: 'a',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: '关于我们',
                  props: {
                    href: '#'
                  },
                  directives: [],
                  events: {
                    click: {
                      name: 'click',
                      handler: {
                        type: 'JSFunction',
                        value: 'this.handleAbout'
                      },
                      modifiers: {
                        prevent: true
                      }
                    }
                  }
                },
                {
                  id: 'i8neu6te',
                  name: 'a',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: '服务条款',
                  props: {
                    href: '#'
                  },
                  directives: [],
                  events: {
                    click: {
                      name: 'click',
                      handler: {
                        type: 'JSFunction',
                        value: 'this.handleTerms'
                      },
                      modifiers: {
                        prevent: true
                      }
                    }
                  }
                },
                {
                  id: 'j8neu6te',
                  name: 'a',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: '隐私政策',
                  props: {
                    href: '#'
                  },
                  directives: [],
                  events: {
                    click: {
                      name: 'click',
                      handler: {
                        type: 'JSFunction',
                        value: 'this.handlePrivacy'
                      },
                      modifiers: {
                        prevent: true
                      }
                    }
                  }
                }
              ],
              props: {
                class: 'footer-links'
              },
              directives: [],
              events: {}
            }
          ],
          props: {
            class: 'footer'
          },
          directives: [],
          events: {}
        }
      ],
      props: {
        class: 'launch-page'
      },
      directives: [],
      events: {}
    }
  ]
};
