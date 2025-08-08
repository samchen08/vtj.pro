export const test_2 = {
  name: 'regPage',
  locked: false,
  inject: [],
  state: {
    form: {
      type: 'JSExpression',
      value: "({ account: '', password: '', captcha: '', rememberMe: false })"
    },
    rules: {
      type: 'JSExpression',
      value:
        "({\n  account: [\n    { required: true, message: '请输入用户名/邮箱/手机号', trigger: 'blur' },\n    { min: 3, message: '账号长度至少3个字符', trigger: 'blur' }\n  ],\n  password: [\n    { required: true, message: '请输入密码', trigger: 'blur' },\n    { min: 6, message: '密码长度至少6个字符', trigger: 'blur' }\n  ],\n  captcha: [\n    { required: true, message: '请输入验证码', trigger: 'blur' },\n    { len: 4, message: '验证码长度为4位', trigger: 'blur' }\n  ]\n})"
    },
    loading: {
      type: 'JSExpression',
      value: 'false'
    },
    captchaCode: {
      type: 'JSExpression',
      value: "'A8B9'"
    },
    showCaptcha: {
      type: 'JSExpression',
      value: 'false'
    },
    loginAttempts: {
      type: 'JSExpression',
      value: '0'
    }
  },
  lifeCycles: {
    mounted: {
      type: 'JSFunction',
      value:
        "() => {\n  const rememberedAccount = localStorage.getItem('rememberedAccount');\n  if (rememberedAccount) {\n    this.state.form.account = rememberedAccount;\n    this.state.form.rememberMe = true;\n  }\n}"
    }
  },
  methods: {
    handleLogin: {
      type: 'JSFunction',
      value:
        "() => {\n  this.$refs.loginForm.validate((valid) => {\n    if (valid) {\n      if (\n        this.state.showCaptcha &&\n        this.state.form.captcha.toUpperCase() !== this.state.captchaCode\n      ) {\n        this.$libs.ElementPlus.ElMessage.error('验证码错误');\n        this.refreshCaptcha();\n        return;\n      }\n      this.state.loading = true;\n      setTimeout(() => {\n        this.state.loading = false;\n        const isSuccess = Math.random() > 0.3;\n        if (isSuccess) {\n          this.$libs.ElementPlus.ElMessage.success('登录成功！');\n          this.state.loginAttempts = 0;\n          this.state.showCaptcha = false;\n        } else {\n          this.state.loginAttempts++;\n          this.$libs.ElementPlus.ElMessage.error('用户名或密码错误');\n          if (this.state.loginAttempts >= 3) {\n            this.state.showCaptcha = true;\n            this.refreshCaptcha();\n          }\n        }\n      }, 2000);\n    } else {\n      this.$libs.ElementPlus.ElMessage.error('请检查表单信息');\n      return false;\n    }\n  });\n}"
    },
    goToRegister: {
      type: 'JSFunction',
      value:
        "() => {\n  this.$libs.ElementPlus.ElMessage.info('跳转到注册页面');\n}"
    },
    refreshCaptcha: {
      type: 'JSFunction',
      value:
        "() => {\n  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';\n  let result = '';\n  for (let i = 0; i < 4; i++) {\n    result += chars.charAt(Math.floor(Math.random() * chars.length));\n  }\n  this.state.captchaCode = result;\n  this.state.form.captcha = '';\n}"
    },
    handleSocialLogin: {
      type: 'JSFunction',
      value:
        "(type) => {\n  const typeMap = { wechat: '微信', qq: 'QQ', weibo: '微博' };\n  this.$libs.ElementPlus.ElMessage.info(`使用${typeMap[type]}登录`);\n  this.state.loading = true;\n  setTimeout(() => {\n    this.state.loading = false;\n    this.$libs.ElementPlus.ElMessage.success(`${typeMap[type]}登录成功！`);\n  }, 1500);\n}"
    },
    handleForgotPassword: {
      type: 'JSFunction',
      value:
        "() => {\n  this.$libs.ElementPlus.ElMessage.info('跳转到找回密码页面');\n}"
    }
  },
  computed: {},
  watch: [
    {
      id: '2018pmql03',
      deep: false,
      source: {
        type: 'JSFunction',
        value: '() => {\n  return this.state.form.rememberMe;\n}'
      },
      immediate: false
    }
  ],
  css: '.login-container {\n  min-height: 100vh;\n  display: flex;\n  background: #f5f7fa;\n}\n.login-card {\n  flex: 1;\n  max-width: 500px;\n  background: white;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding: 60px 80px;\n  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);\n}\n.login-bg {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  position: relative;\n  overflow: hidden;\n}\n.login-bg img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  opacity: 0.8;\n}\n.login-header {\n  text-align: center;\n  margin-bottom: 40px;\n}\n.login-header h2 {\n  color: #333;\n  font-size: 32px;\n  font-weight: 600;\n  margin: 0 0 10px 0;\n}\n.login-header p {\n  color: #666;\n  font-size: 16px;\n  margin: 0;\n}\n.login-form {\n  margin-bottom: 20px;\n}\n.login-form .el-form-item {\n  margin-bottom: 25px;\n}\n.login-form .el-input {\n  height: 50px;\n}\n.login-form .el-input__inner {\n  height: 50px;\n  line-height: 50px;\n  border-radius: 8px;\n  border: 1px solid #dcdfe6;\n  font-size: 16px;\n  transition: all 0.3s;\n}\n.login-form .el-input__inner:focus {\n  border-color: #409eff;\n  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);\n}\n.captcha-container {\n  display: flex;\n  align-items: center;\n}\n.captcha-code {\n  width: 100px;\n  height: 50px;\n  background: linear-gradient(45deg, #f0f0f0, #e0e0e0);\n  border: 1px solid #dcdfe6;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n  font-weight: bold;\n  color: #333;\n  cursor: pointer;\n  user-select: none;\n  letter-spacing: 2px;\n}\n.captcha-code:hover {\n  background: linear-gradient(45deg, #e0e0e0, #d0d0d0);\n}\n.login-options {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n}\n.forgot-link {\n  color: #409eff;\n  text-decoration: none;\n  font-size: 14px;\n}\n.forgot-link:hover {\n  text-decoration: underline;\n}\n.login-btn {\n  width: 100%;\n  height: 50px;\n  font-size: 18px;\n  font-weight: 500;\n  border-radius: 8px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border: none;\n}\n.login-btn:hover {\n  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);\n}\n.quick-login {\n  margin-top: 30px;\n}\n.divider {\n  text-align: center;\n  margin: 20px 0;\n  position: relative;\n}\n.divider::before {\n  content: "";\n  position: absolute;\n  top: 50%;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background: #e4e7ed;\n}\n.divider span {\n  background: white;\n  padding: 0 15px;\n  color: #909399;\n  font-size: 14px;\n}\n.social-login {\n  display: flex;\n  justify-content: center;\n  gap: 15px;\n}\n.social-btn {\n  width: 50px;\n  height: 50px;\n  border: 1px solid #e4e7ed;\n  background: white;\n  transition: all 0.3s;\n}\n.social-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.register-link {\n  text-align: center;\n  margin-top: 30px;\n  color: #666;\n  font-size: 14px;\n}\n.register-link a {\n  color: #409eff;\n  text-decoration: none;\n  font-weight: 500;\n}\n.register-link a:hover {\n  text-decoration: underline;\n}\n@media (max-width: 768px) {\n  .login-container {\n    flex-direction: column;\n  }\n  .login-bg {\n    height: 200px;\n    order: -1;\n  }\n  .login-card {\n    padding: 40px 30px;\n    max-width: none;\n  }\n  .login-header h2 {\n    font-size: 28px;\n  }\n  .social-login {\n    gap: 10px;\n  }\n  .social-btn {\n    width: 45px;\n    height: 45px;\n  }\n}\n@media (max-width: 480px) {\n  .login-card {\n    padding: 30px 20px;\n  }\n  .login-header h2 {\n    font-size: 24px;\n  }\n  .login-form .el-input {\n    height: 45px;\n  }\n  .login-form .el-input__inner {\n    height: 45px;\n    line-height: 45px;\n    font-size: 14px;\n  }\n  .login-btn {\n    height: 45px;\n    font-size: 16px;\n  }\n}',
  props: [],
  emits: [],
  slots: [],
  dataSources: {},
  __VTJ_BLOCK__: true,
  __VERSION__: '1754627830411',
  id: '28pmbx67',
  nodes: [
    {
      id: '2028pmql0g',
      name: 'div',
      from: '',
      invisible: false,
      locked: false,
      children: [
        {
          id: '2038pmql0g',
          name: 'div',
          from: '',
          invisible: false,
          locked: false,
          children: [
            {
              id: '2048pmql0g',
              name: 'div',
              from: '',
              invisible: false,
              locked: false,
              children: [
                {
                  id: '2058pmql0g',
                  name: 'h2',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: '用户登录',
                  props: {},
                  directives: [],
                  events: {}
                },
                {
                  id: '2068pmql0g',
                  name: 'p',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: '欢迎回来，请登录您的账户',
                  props: {},
                  directives: [],
                  events: {}
                }
              ],
              props: {
                class: 'login-header'
              },
              directives: [],
              events: {}
            },
            {
              id: '2078pmql0g',
              name: 'ElForm',
              from: '',
              invisible: false,
              locked: false,
              children: [
                {
                  id: '2088pmql0g',
                  name: 'ElFormItem',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: [
                    {
                      id: '2098pmql0g',
                      name: 'ElInput',
                      from: '',
                      invisible: false,
                      locked: false,
                      children: [],
                      props: {
                        size: 'large',
                        placeholder: '请输入用户名/邮箱/手机号',
                        'prefix-icon': {
                          type: 'JSExpression',
                          value: 'this.$libs.VtjIcons.User'
                        }
                      },
                      directives: [
                        {
                          id: '20z8pmql8r',
                          name: 'vModel',
                          value: {
                            type: 'JSExpression',
                            value: 'this.state.form.account'
                          }
                        }
                      ],
                      events: {}
                    }
                  ],
                  props: {
                    prop: 'account'
                  },
                  directives: [],
                  events: {}
                },
                {
                  id: '20a8pmql0g',
                  name: 'ElFormItem',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: [
                    {
                      id: '20b8pmql0g',
                      name: 'ElInput',
                      from: '',
                      invisible: false,
                      locked: false,
                      children: [],
                      props: {
                        size: 'large',
                        type: 'password',
                        placeholder: '请输入密码',
                        'prefix-icon': {
                          type: 'JSExpression',
                          value: 'this.$libs.VtjIcons.Lock'
                        },
                        'show-password': ''
                      },
                      directives: [
                        {
                          id: '2108pmql8r',
                          name: 'vModel',
                          value: {
                            type: 'JSExpression',
                            value: 'this.state.form.password'
                          }
                        }
                      ],
                      events: {
                        keyup: {
                          name: 'keyup',
                          handler: {
                            type: 'JSFunction',
                            value: 'this.handleLogin'
                          },
                          modifiers: {
                            enter: true
                          }
                        }
                      }
                    }
                  ],
                  props: {
                    prop: 'password'
                  },
                  directives: [],
                  events: {}
                },
                {
                  id: '20c8pmql0g',
                  name: 'ElFormItem',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: [
                    {
                      id: '20d8pmql0g',
                      name: 'div',
                      from: '',
                      invisible: false,
                      locked: false,
                      children: [
                        {
                          id: '20e8pmql0g',
                          name: 'ElInput',
                          from: '',
                          invisible: false,
                          locked: false,
                          children: [],
                          props: {
                            size: 'large',
                            style: {
                              type: 'JSExpression',
                              value: "({ flex: '1', 'margin-right': '10px' })"
                            },
                            placeholder: '请输入验证码'
                          },
                          directives: [
                            {
                              id: '2118pmql8r',
                              name: 'vModel',
                              value: {
                                type: 'JSExpression',
                                value: 'this.state.form.captcha'
                              }
                            }
                          ],
                          events: {}
                        },
                        {
                          id: '20f8pmql0g',
                          name: 'div',
                          from: '',
                          invisible: false,
                          locked: false,
                          children: {
                            type: 'JSExpression',
                            value: 'this.state.captchaCode'
                          },
                          props: {
                            class: 'captcha-code'
                          },
                          directives: [],
                          events: {
                            click: {
                              name: 'click',
                              handler: {
                                type: 'JSFunction',
                                value: 'this.refreshCaptcha'
                              },
                              modifiers: {}
                            }
                          }
                        }
                      ],
                      props: {
                        class: 'captcha-container'
                      },
                      directives: [],
                      events: {}
                    }
                  ],
                  props: {
                    prop: 'captcha'
                  },
                  directives: [
                    {
                      id: '2128pmql8r',
                      name: 'vIf',
                      value: {
                        type: 'JSExpression',
                        value: 'this.state.showCaptcha'
                      }
                    }
                  ],
                  events: {}
                },
                {
                  id: '20g8pmql0h',
                  name: 'div',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: [
                    {
                      id: '20h8pmql0h',
                      name: 'ElCheckbox',
                      from: '',
                      invisible: false,
                      locked: false,
                      children: '记住我',
                      props: {},
                      directives: [
                        {
                          id: '2138pmql8r',
                          name: 'vModel',
                          value: {
                            type: 'JSExpression',
                            value: 'this.state.form.rememberMe'
                          }
                        }
                      ],
                      events: {}
                    },
                    {
                      id: '20i8pmql0h',
                      name: 'a',
                      from: '',
                      invisible: false,
                      locked: false,
                      children: '忘记密码？',
                      props: {
                        href: '#',
                        class: 'forgot-link'
                      },
                      directives: [],
                      events: {
                        click: {
                          name: 'click',
                          handler: {
                            type: 'JSFunction',
                            value: 'this.handleForgotPassword'
                          },
                          modifiers: {}
                        }
                      }
                    }
                  ],
                  props: {
                    class: 'login-options'
                  },
                  directives: [],
                  events: {}
                },
                {
                  id: '20j8pmql0h',
                  name: 'ElFormItem',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: [
                    {
                      id: '20k8pmql0h',
                      name: 'ElButton',
                      from: '',
                      invisible: false,
                      locked: false,
                      children: ' 登录 ',
                      props: {
                        size: 'large',
                        type: 'primary',
                        class: 'login-btn',
                        loading: {
                          type: 'JSExpression',
                          value: 'this.state.loading'
                        }
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
                    }
                  ],
                  props: {},
                  directives: [],
                  events: {}
                },
                {
                  id: '20l8pmql0h',
                  name: 'div',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: [
                    {
                      id: '20m8pmql0h',
                      name: 'div',
                      from: '',
                      invisible: false,
                      locked: false,
                      children: [
                        {
                          id: '20n8pmql0h',
                          name: 'span',
                          from: '',
                          invisible: false,
                          locked: false,
                          children: '或',
                          props: {},
                          directives: [],
                          events: {}
                        }
                      ],
                      props: {
                        class: 'divider'
                      },
                      directives: [],
                      events: {}
                    },
                    {
                      id: '20o8pmql0h',
                      name: 'div',
                      from: '',
                      invisible: false,
                      locked: false,
                      children: [
                        {
                          id: '20p8pmql0h',
                          name: 'ElButton',
                          from: '',
                          invisible: false,
                          locked: false,
                          children: [
                            {
                              id: '20q8pmql0h',
                              name: 'XIcon',
                              from: '@vtj/ui',
                              invisible: false,
                              locked: false,
                              children: [],
                              props: {
                                icon: {
                                  type: 'JSExpression',
                                  value: 'this.$libs.VtjIcons.ChatRound'
                                },
                                size: {
                                  type: 'JSExpression',
                                  value: '20'
                                },
                                color: '#07c160'
                              },
                              directives: [],
                              events: {}
                            }
                          ],
                          props: {
                            class: 'social-btn wechat-btn',
                            circle: ''
                          },
                          directives: [],
                          events: {
                            click: {
                              name: 'click',
                              handler: {
                                type: 'JSFunction',
                                value:
                                  "($event) => {\n  this.handleSocialLogin('wechat');\n}"
                              },
                              modifiers: {}
                            }
                          }
                        },
                        {
                          id: '20r8pmql0h',
                          name: 'ElButton',
                          from: '',
                          invisible: false,
                          locked: false,
                          children: [
                            {
                              id: '20s8pmql0h',
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
                                size: {
                                  type: 'JSExpression',
                                  value: '20'
                                },
                                color: '#1296db'
                              },
                              directives: [],
                              events: {}
                            }
                          ],
                          props: {
                            class: 'social-btn qq-btn',
                            circle: ''
                          },
                          directives: [],
                          events: {
                            click: {
                              name: 'click',
                              handler: {
                                type: 'JSFunction',
                                value:
                                  "($event) => {\n  this.handleSocialLogin('qq');\n}"
                              },
                              modifiers: {}
                            }
                          }
                        },
                        {
                          id: '20t8pmql0h',
                          name: 'ElButton',
                          from: '',
                          invisible: false,
                          locked: false,
                          children: [
                            {
                              id: '20u8pmql0h',
                              name: 'XIcon',
                              from: '@vtj/ui',
                              invisible: false,
                              locked: false,
                              children: [],
                              props: {
                                icon: {
                                  type: 'JSExpression',
                                  value: 'this.$libs.VtjIcons.Share'
                                },
                                size: {
                                  type: 'JSExpression',
                                  value: '20'
                                },
                                color: '#e6162d'
                              },
                              directives: [],
                              events: {}
                            }
                          ],
                          props: {
                            class: 'social-btn weibo-btn',
                            circle: ''
                          },
                          directives: [],
                          events: {
                            click: {
                              name: 'click',
                              handler: {
                                type: 'JSFunction',
                                value:
                                  "($event) => {\n  this.handleSocialLogin('weibo');\n}"
                              },
                              modifiers: {}
                            }
                          }
                        }
                      ],
                      props: {
                        class: 'social-login'
                      },
                      directives: [],
                      events: {}
                    }
                  ],
                  props: {
                    class: 'quick-login'
                  },
                  directives: [],
                  events: {}
                }
              ],
              props: {
                ref: 'loginForm',
                class: 'login-form',
                model: {
                  type: 'JSExpression',
                  value: 'this.state.form'
                },
                rules: {
                  type: 'JSExpression',
                  value: 'this.state.rules'
                },
                'label-width': '0px'
              },
              directives: [],
              events: {}
            },
            {
              id: '20v8pmql0h',
              name: 'div',
              from: '',
              invisible: false,
              locked: false,
              children: [
                {
                  id: '2148pmql8r',
                  name: 'span',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: ' 还没有账户？',
                  props: {},
                  directives: [],
                  events: {}
                },
                {
                  id: '20w8pmql0h',
                  name: 'a',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: '立即注册',
                  props: {
                    href: '#'
                  },
                  directives: [],
                  events: {
                    click: {
                      name: 'click',
                      handler: {
                        type: 'JSFunction',
                        value: 'this.goToRegister'
                      },
                      modifiers: {}
                    }
                  }
                }
              ],
              props: {
                class: 'register-link'
              },
              directives: [],
              events: {}
            }
          ],
          props: {
            class: 'login-card'
          },
          directives: [],
          events: {}
        },
        {
          id: '20x8pmql0h',
          name: 'div',
          from: '',
          invisible: false,
          locked: false,
          children: [
            {
              id: '20y8pmql0h',
              name: 'img',
              from: '',
              invisible: false,
              locked: false,
              children: [],
              props: {
                alt: '登录背景图',
                src: 'https://picsum.photos/600/800?random=1'
              },
              directives: [],
              events: {}
            }
          ],
          props: {
            class: 'login-bg'
          },
          directives: [],
          events: {}
        }
      ],
      props: {
        class: 'login-container'
      },
      directives: [],
      events: {}
    }
  ]
};
