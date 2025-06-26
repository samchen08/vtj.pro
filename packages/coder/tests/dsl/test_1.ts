export const test_1 = {
  name: 'Bbb',
  locked: false,
  inject: [],
  state: {
    list: {
      type: 'JSExpression',
      value: '[]'
    },
    page: {
      type: 'JSExpression',
      value: '1'
    },
    pageSize: {
      type: 'JSExpression',
      value: '10'
    },
    refreshing: {
      type: 'JSExpression',
      value: 'false'
    },
    loadingMore: {
      type: 'JSExpression',
      value: 'false'
    },
    noMore: {
      type: 'JSExpression',
      value: 'false'
    }
  },
  lifeCycles: {
    mounted: {
      type: 'JSFunction',
      value: '() => {\n  this.onRefresh();\n}'
    }
  },
  methods: {
    fetchGoodsList: {
      type: 'JSFunction',
      value:
        '() => {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      const newList = Array.from({ length: this.state.pageSize }, (_, i) => ({\n        id: i + (this.state.page - 1) * this.state.pageSize,\n        title: `商品${i + (this.state.page - 1) * this.state.pageSize + 1}`,\n        price: (Math.random() * 100).toFixed(2),\n        image: `https://picsum.photos/200/200?random=${i + (this.state.page - 1) * this.state.pageSize}`\n      }));\n      resolve(newList);\n    }, 800);\n  });\n}'
    },
    onRefresh: {
      type: 'JSFunction',
      value:
        'async () => {\n  this.state.refreshing = true;\n  this.state.page = 1;\n  this.state.noMore = false;\n  const newList = await this.fetchGoodsList();\n  this.state.list = newList;\n  this.state.refreshing = false;\n}'
    },
    loadMore: {
      type: 'JSFunction',
      value:
        'async () => {\n  if (this.state.noMore || this.state.loadingMore) return;\n  this.state.loadingMore = true;\n  this.state.page++;\n  const newList = await this.fetchGoodsList();\n  if (newList.length < this.state.pageSize) {\n    this.state.noMore = true;\n  }\n  this.state.list = [...this.state.list, ...newList];\n  this.state.loadingMore = false;\n}'
    }
  },
  computed: {},
  watch: [],
  css: '.goods-list {\n  height: 100vh;\n  background-color: #f7f7f7;\n}\n.scroll-view {\n  height: 100%;\n  box-sizing: border-box;\n  padding: 20rpx;\n}\n.goods-item {\n  display: flex;\n  padding: 20rpx;\n  margin-bottom: 20rpx;\n  background-color: #fff;\n  border-radius: 12rpx;\n  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);\n}\n.goods-image {\n  width: 160rpx;  /* 图片宽度缩小 */\n  height: 160rpx; /* 图片高度缩小 */\n  border-radius: 8rpx;\n  object-fit: cover;\n  flex-shrink: 0; /* 防止图片被压缩 */\n}\n.goods-info {\n  flex: 1;\n  margin-left: 20rpx;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  min-width: 0; /* 防止文字溢出 */\n}\n.goods-title {\n  font-size: 28rpx;\n  color: #333;\n  line-height: 1.4;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  overflow: hidden;\n}\n.goods-bottom {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 10rpx;\n}\n.goods-price {\n  font-size: 32rpx;\n  color: #ff4d4f;\n  font-weight: bold;\n}\n.goods-sales {\n  display: flex;\n  align-items: center;\n  font-size: 22rpx;\n  color: #999;\n}\n.goods-sales text {\n  margin-left: 6rpx;\n}\n.loading-status {\n  padding: 30rpx 0;\n  text-align: center;\n}\n.loading-more {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: #999;\n  font-size: 26rpx;\n}\n.loading-icon {\n  margin-right: 10rpx;\n  animation: rotate 1s linear infinite;\n}\n.no-more {\n  color: #ccc;\n  font-size: 26rpx;\n}',
  props: [],
  emits: [],
  slots: [],
  dataSources: {},
  __VTJ_BLOCK__: true,
  __VERSION__: '1745724533514',
  id: '14ktqdut',
  nodes: [
    {
      id: '184kurqun',
      name: 'View',
      from: '',
      invisible: false,
      locked: false,
      children: [
        {
          id: '194kurqun',
          name: 'ScrollView',
          from: '',
          invisible: false,
          locked: false,
          children: [
            {
              id: '1a4kurqun',
              name: 'View',
              from: '',
              invisible: false,
              locked: false,
              children: [
                {
                  id: '1b4kurqun',
                  name: 'Image',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: [],
                  props: {
                    class: 'goods-image',
                    src: {
                      type: 'JSExpression',
                      value: 'this.context.item.image'
                    },
                    mode: 'aspectFill'
                  },
                  directives: [],
                  events: {}
                },
                {
                  id: '1c4kurqun',
                  name: 'View',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: [
                    {
                      id: '1d4kurqun',
                      name: 'Text',
                      from: '',
                      invisible: false,
                      locked: false,
                      children: {
                        type: 'JSExpression',
                        value: 'this.context.item.title'
                      },
                      props: {
                        class: 'goods-title'
                      },
                      directives: [],
                      events: {}
                    },
                    {
                      id: '1e4kurqun',
                      name: 'View',
                      from: '',
                      invisible: false,
                      locked: false,
                      children: [
                        {
                          id: '1f4kurqun',
                          name: 'Text',
                          from: '',
                          invisible: false,
                          locked: false,
                          children: [
                            {
                              id: '1p4kurqvm',
                              name: 'span',
                              from: '',
                              invisible: false,
                              locked: false,
                              children: [
                                {
                                  id: '1q4kurqvm',
                                  name: 'span',
                                  from: '',
                                  invisible: false,
                                  locked: false,
                                  children: '¥',
                                  props: {},
                                  directives: [],
                                  events: {}
                                },
                                {
                                  id: '1r4kurqvm',
                                  name: 'span',
                                  from: '',
                                  invisible: false,
                                  locked: false,
                                  children: {
                                    type: 'JSExpression',
                                    value: 'this.context.item.price'
                                  },
                                  props: {},
                                  directives: [],
                                  events: {}
                                }
                              ],
                              props: {},
                              directives: [],
                              events: {}
                            }
                          ],
                          props: {
                            class: 'goods-price'
                          },
                          directives: [],
                          events: {}
                        },
                        {
                          id: '1g4kurqun',
                          name: 'View',
                          from: '',
                          invisible: false,
                          locked: false,
                          children: [
                            {
                              id: '1h4kurqun',
                              name: 'UniIcons',
                              from: '',
                              invisible: false,
                              locked: false,
                              children: [],
                              props: {
                                type: 'eye',
                                size: '14',
                                color: '#999'
                              },
                              directives: [],
                              events: {}
                            },
                            {
                              id: '1i4kurqun',
                              name: 'Text',
                              from: '',
                              invisible: false,
                              locked: false,
                              children: [
                                {
                                  id: '1s4kurqvm',
                                  name: 'span',
                                  from: '',
                                  invisible: false,
                                  locked: false,
                                  children: [
                                    {
                                      id: '1t4kurqvm',
                                      name: 'span',
                                      from: '',
                                      invisible: false,
                                      locked: false,
                                      children: {
                                        type: 'JSExpression',
                                        value:
                                          'Math.floor(Math.random() * 1000)'
                                      },
                                      props: {},
                                      directives: [],
                                      events: {}
                                    },
                                    {
                                      id: '1u4kurqvm',
                                      name: 'span',
                                      from: '',
                                      invisible: false,
                                      locked: false,
                                      children: '人浏览',
                                      props: {},
                                      directives: [],
                                      events: {}
                                    }
                                  ],
                                  props: {},
                                  directives: [],
                                  events: {}
                                }
                              ],
                              props: {},
                              directives: [],
                              events: {}
                            }
                          ],
                          props: {
                            class: 'goods-sales'
                          },
                          directives: [],
                          events: {}
                        }
                      ],
                      props: {
                        class: 'goods-bottom'
                      },
                      directives: [],
                      events: {}
                    }
                  ],
                  props: {
                    class: 'goods-info'
                  },
                  directives: [],
                  events: {}
                }
              ],
              props: {
                class: 'goods-item',
                key: {
                  type: 'JSExpression',
                  value: 'this.context.index'
                }
              },
              directives: [
                {
                  id: '1v4kurqvm',
                  name: 'vFor',
                  value: {
                    type: 'JSExpression',
                    value: 'this.state.list'
                  },
                  iterator: {
                    item: 'item',
                    index: 'index'
                  }
                }
              ],
              events: {}
            },
            {
              id: '1j4kurqun',
              name: 'View',
              from: '',
              invisible: false,
              locked: false,
              children: [
                {
                  id: '1k4kurqun',
                  name: 'View',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: [
                    {
                      id: '1l4kurqun',
                      name: 'UniIcons',
                      from: '',
                      invisible: false,
                      locked: false,
                      children: [],
                      props: {
                        type: 'spinner-cycle',
                        size: '18',
                        color: '#999',
                        class: 'loading-icon'
                      },
                      directives: [],
                      events: {}
                    },
                    {
                      id: '1m4kurqun',
                      name: 'Text',
                      from: '',
                      invisible: false,
                      locked: false,
                      children: '正在加载...',
                      props: {},
                      directives: [],
                      events: {}
                    }
                  ],
                  props: {
                    class: 'loading-more'
                  },
                  directives: [
                    {
                      id: '1w4kurqvm',
                      name: 'vIf',
                      value: {
                        type: 'JSExpression',
                        value: 'this.state.loadingMore'
                      }
                    }
                  ],
                  events: {}
                },
                {
                  id: '1n4kurqun',
                  name: 'View',
                  from: '',
                  invisible: false,
                  locked: false,
                  children: [
                    {
                      id: '1o4kurqun',
                      name: 'Text',
                      from: '',
                      invisible: false,
                      locked: false,
                      children: '— 我是有底线的 —',
                      props: {},
                      directives: [],
                      events: {}
                    }
                  ],
                  props: {
                    class: 'no-more'
                  },
                  directives: [
                    {
                      id: '1x4kurqvm',
                      name: 'vIf',
                      value: {
                        type: 'JSExpression',
                        value: 'this.state.noMore'
                      }
                    }
                  ],
                  events: {}
                }
              ],
              props: {
                class: 'loading-status'
              },
              directives: [],
              events: {}
            }
          ],
          props: {
            'scroll-y': '',
            class: 'scroll-view',
            'refresher-enabled': '',
            'refresher-triggered': {
              type: 'JSExpression',
              value: 'this.state.refreshing'
            }
          },
          directives: [],
          events: {
            scrolltolower: {
              name: 'scrolltolower',
              handler: {
                type: 'JSFunction',
                value: 'this.loadMore'
              },
              modifiers: {}
            },
            refresherrefresh: {
              name: 'refresherrefresh',
              handler: {
                type: 'JSFunction',
                value: 'this.onRefresh'
              },
              modifiers: {}
            }
          }
        }
      ],
      props: {
        class: 'goods-list'
      },
      directives: [],
      events: {}
    }
  ]
};
