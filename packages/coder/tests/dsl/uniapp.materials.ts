export const uniappMaterials = {
  div: {
    name: 'div',
    label: '容器',
    categoryId: 'html',
    snippet: {
      children: '容器文本内容示例'
    }
  },
  span: {
    name: 'span',
    label: '内联',
    categoryId: 'html',
    snippet: {
      children: '内联容器文本内容示例'
    }
  },
  a: {
    name: 'a',
    label: '链接',
    categoryId: 'html',
    props: [
      {
        name: 'href',
        label: 'href',
        setters: 'InputSetter'
      }
    ],
    snippet: {
      children: '链接文本内容示例',
      props: {
        href: '#'
      }
    }
  },
  img: {
    name: 'img',
    label: '图片',
    categoryId: 'html',
    childIncludes: false,
    props: [
      {
        name: 'src',
        label: 'src',
        setters: 'InputSetter'
      },
      {
        name: 'width',
        label: 'width',
        setters: 'InputSetter'
      },
      {
        name: 'height',
        label: 'height',
        setters: 'InputSetter'
      }
    ],
    snippet: {
      props: {
        src: 'data:image/png;base64,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',
        width: '200',
        height: '200'
      }
    }
  },
  h1: {
    name: 'h1',
    label: '大标题',
    categoryId: 'html',
    snippet: {
      children: '标题'
    }
  },
  h2: {
    name: 'h2',
    label: '中标题',
    categoryId: 'html',
    snippet: {
      children: '标题'
    }
  },
  h3: {
    name: 'h3',
    label: '小标题',
    categoryId: 'html',
    snippet: {
      children: '标题'
    }
  },
  p: {
    name: 'p',
    label: '段落',
    categoryId: 'html',
    snippet: {
      children: '段落文本'
    }
  },
  component: {
    name: 'component',
    label: '动态组件',
    categoryId: 'elements',
    doc: 'https://cn.vuejs.org/api/built-in-special-elements.html#component',
    props: [
      {
        name: 'is',
        label: '组件名',
        setters: 'InputSetter'
      }
    ],
    snippet: {
      children: '组件文本内容示例',
      props: {
        is: 'view'
      }
    },
    package: '@dcloudio/uni-h5'
  },
  slot: {
    name: 'slot',
    label: '插槽',
    categoryId: 'elements',
    doc: 'https://cn.vuejs.org/api/built-in-special-elements.html#slot',
    props: [
      {
        name: 'name',
        label: '名称',
        defaultValue: 'default',
        setters: 'InputSetter'
      }
    ],
    snippet: {
      children: '默认插槽内容'
    },
    package: '@dcloudio/uni-h5'
  },
  Transition: {
    name: 'Transition',
    label: '过渡效果',
    categoryId: 'components',
    doc: 'https://cn.vuejs.org/api/built-in-components.html#transition',
    package: 'vue',
    props: [
      {
        name: 'name',
        label: '名称',
        defaultValue: '',
        title: '用于自动生成过渡 CSS class 名',
        setters: 'InputSetter'
      },
      {
        name: 'css',
        label: '应用CSS',
        defaultValue: true,
        title: '是否应用 CSS 过渡 class',
        setters: 'BooleanSetter'
      },
      {
        name: 'type',
        label: '事件类型',
        title:
          '指定要等待的过渡事件类型来确定过渡结束的时间，默认情况下会自动检测持续时间较长的类型',
        setters: 'SelectSetter',
        options: ['transition', 'animation']
      },
      {
        name: 'duration',
        label: '持续时间',
        title: '显式指定过渡的持续时间',
        setters: ['NumberSetter', 'JSONSetter']
      },
      {
        name: 'mode',
        label: '时序',
        defaultValue: 'default',
        title: '控制离开/进入过渡的时序。',
        setters: 'SelectSetter',
        options: ['in-out', 'out-in', 'default']
      },
      {
        name: 'appear',
        label: '使用过渡',
        defaultValue: false,
        title: '是否对初始渲染使用过渡',
        setters: 'BooleanSetter'
      },
      {
        name: 'enterFromClass',
        label: 'enterFromClass',
        setters: 'InputSetter'
      },
      {
        name: 'enterActiveClass',
        label: 'enterActiveClass',
        setters: 'InputSetter'
      },
      {
        name: 'enterToClass',
        label: 'enterToClass',
        setters: 'InputSetter'
      },
      {
        name: 'appearFromClass',
        label: 'appearFromClass',
        setters: 'InputSetter'
      },
      {
        name: 'appearActiveClass',
        label: 'appearActiveClass',
        setters: 'InputSetter'
      },
      {
        name: 'appearToClass',
        label: 'appearToClass',
        setters: 'InputSetter'
      },
      {
        name: 'leaveFromClass',
        label: 'leaveFromClass',
        setters: 'InputSetter'
      },
      {
        name: 'leaveActiveClass',
        label: 'leaveActiveClass',
        setters: 'InputSetter'
      },
      {
        name: 'leaveToClass',
        label: 'leaveToClass',
        setters: 'InputSetter'
      }
    ],
    events: [
      'before-enter',
      'before-leave',
      'enter',
      'leave',
      'appear',
      'after-enter',
      'after-leave',
      'after-appear',
      'enter-cancelled',
      'leave-cancelled',
      'ppear-cancelled'
    ],
    snippet: {
      children: 'Transition'
    }
  },
  TransitionGroup: {
    name: 'TransitionGroup',
    label: '过渡效果组',
    categoryId: 'components',
    doc: 'https://cn.vuejs.org/api/built-in-components.html#transitiongroup',
    package: 'vue',
    props: [
      {
        name: 'name',
        label: '名称',
        defaultValue: '',
        title: '用于自动生成过渡 CSS class 名',
        setters: 'InputSetter'
      },
      {
        name: 'tag',
        label: '标签名',
        title: '如果未定义，则渲染为片段 (fragment)',
        setters: 'InputSetter'
      },
      {
        name: 'moveClass',
        label: 'moveClass',
        title: '用于自定义过渡期间被应用的 CSS class。',
        setters: 'InputSetter'
      },
      {
        name: 'css',
        label: '应用CSS',
        defaultValue: true,
        title: '是否应用 CSS 过渡 class',
        setters: 'BooleanSetter'
      },
      {
        name: 'type',
        label: '事件类型',
        title:
          '指定要等待的过渡事件类型来确定过渡结束的时间，默认情况下会自动检测持续时间较长的类型',
        setters: 'SelectSetter',
        options: ['transition', 'animation']
      },
      {
        name: 'duration',
        label: '持续时间',
        title: '显式指定过渡的持续时间',
        setters: ['NumberSetter', 'JSONSetter']
      },
      {
        name: 'appear',
        label: '使用过渡',
        defaultValue: false,
        title: '是否对初始渲染使用过渡',
        setters: 'BooleanSetter'
      },
      {
        name: 'enterFromClass',
        label: 'enterFromClass',
        setters: 'InputSetter'
      },
      {
        name: 'enterActiveClass',
        label: 'enterActiveClass',
        setters: 'InputSetter'
      },
      {
        name: 'enterToClass',
        label: 'enterToClass',
        setters: 'InputSetter'
      },
      {
        name: 'appearFromClass',
        label: 'appearFromClass',
        setters: 'InputSetter'
      },
      {
        name: 'appearActiveClass',
        label: 'appearActiveClass',
        setters: 'InputSetter'
      },
      {
        name: 'appearToClass',
        label: 'appearToClass',
        setters: 'InputSetter'
      },
      {
        name: 'leaveFromClass',
        label: 'leaveFromClass',
        setters: 'InputSetter'
      },
      {
        name: 'leaveActiveClass',
        label: 'leaveActiveClass',
        setters: 'InputSetter'
      },
      {
        name: 'leaveToClass',
        label: 'leaveToClass',
        setters: 'InputSetter'
      }
    ],
    events: [
      'before-enter',
      'before-leave',
      'enter',
      'leave',
      'appear',
      'after-enter',
      'after-leave',
      'after-appear',
      'enter-cancelled',
      'leave-cancelled',
      'ppear-cancelled'
    ],
    snippet: {
      children: 'TransitionGroup'
    }
  },
  KeepAlive: {
    name: 'KeepAlive',
    label: '缓存切换组件',
    categoryId: 'components',
    doc: 'https://cn.vuejs.org/api/built-in-components.html#keepalive',
    package: 'vue',
    props: [
      {
        name: 'include',
        label: '匹配包含',
        title: '如果指定，则只有与 `include` 名称, 匹配的组件才会被缓存。',
        setters: ['InputSetter', 'JSONSetter']
      },
      {
        name: 'exclude',
        label: '匹配排除',
        title: '任何名称与 `exclude` 匹配的组件都不会被缓存。',
        setters: ['InputSetter', 'JSONSetter']
      },
      {
        name: 'max',
        label: '最大缓存数',
        title: '最多可以缓存多少组件实例。',
        setters: ['InputSetter']
      }
    ]
  },
  Teleport: {
    name: 'Teleport',
    label: '传送组件',
    categoryId: 'components',
    doc: 'https://cn.vuejs.org/api/built-in-components.html#teleport',
    package: 'vue',
    props: [
      {
        name: 'to',
        label: '目标容器',
        title: '指定目标容器,可以是选择器或实际元素',
        setters: ['InputSetter']
      },
      {
        name: 'disabled',
        label: '禁用',
        title:
          '当值为 `true` 时，内容将保留在其原始位置, 而不是移动到目标容器中, 可以动态更改',
        setters: ['BooleanSetter']
      }
    ]
  },
  Suspense: {
    name: 'Suspense',
    label: '异步依赖',
    categoryId: 'components',
    doc: 'https://cn.vuejs.org/api/built-in-components.html#suspense',
    package: 'vue',
    props: [
      {
        name: 'timeout',
        label: 'timeout',
        setters: ['InputSetter']
      }
    ]
  },
  RouterLink: {
    name: 'RouterLink',
    label: '路由链接',
    categoryId: 'components',
    doc: 'https://router.vuejs.org/zh/api/interfaces/RouterLinkProps.html',
    package: 'vue-router',
    props: [
      {
        name: 'to',
        label: 'to',
        setters: ['InputSetter']
      },
      {
        name: 'replace',
        label: 'replace',
        setters: ['BooleanSetter']
      }
    ],
    snippet: {
      children: 'RouterLink',
      props: {
        to: '/'
      }
    }
  },
  View: {
    name: 'View',
    label: '视图',
    categoryId: 'container',
    props: [
      {
        name: 'hover-class',
        defaultValue: 'none',
        title: '指定按下去的样式类。当 hover-class="none" 时，没有点击态效果',
        setters: 'InputSetter'
      },
      {
        name: 'hover-stop-propagation',
        defaultValue: false,
        title:
          '指定是否阻止本节点的祖先节点出现点击态，App、H5、支付宝小程序、百度小程序不支持（支付宝小程序、百度小程序文档中都有此属性，实测未支持）',
        setters: 'BooleanSetter'
      },
      {
        name: 'hover-start-time',
        defaultValue: 50,
        title: '按住后多久出现点击态，单位毫秒',
        setters: 'NumberSetter'
      },
      {
        name: 'hover-stay-time',
        defaultValue: 400,
        title: '手指松开后点击态保留时间，单位毫秒',
        setters: 'NumberSetter'
      }
    ],
    snippet: {
      children: '视图内容'
    },
    package: '@dcloudio/uni-h5'
  },
  ScrollView: {
    name: 'ScrollView',
    label: '滚动视图',
    categoryId: 'container',
    props: [
      {
        name: 'scroll-x',
        title: '允许横向滚动',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scroll-y',
        title: '允许纵向滚动',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'upper-threshold',
        title: '距顶部/左边多远时（单位px），触发 scrolltoupper 事件',
        defaultValue: 50,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'lower-threshold',
        title: '距底部/右边多远时（单位px），触发 scrolltolower 事件',
        defaultValue: 50,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'scroll-top',
        title: '设置竖向滚动条位置',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'scroll-left',
        title: '设置横向滚动条位置',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'scroll-into-view',
        title:
          '值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素',
        setters: 'StringSetter'
      },
      {
        name: 'scroll-with-animation',
        title: '在设置滚动条位置时使用动画过渡',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'enable-back-to-top',
        title:
          'iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-scrollbar',
        title: '控制是否出现滚动条',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'refresher-enabled',
        title: '开启自定义下拉刷新',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'refresher-threshold',
        title: '设置自定义下拉刷新阈值',
        defaultValue: 45,
        setters: 'NumberSetter'
      },
      {
        name: 'refresher-default-style',
        title: '设置自定义下拉刷新默认样式',
        defaultValue: 'black',
        setters: 'SelectSetter',
        options: ['black', 'white', 'none', 'none']
      },
      {
        name: 'refresher-background',
        title: '设置自定义下拉刷新区域背景颜色',
        defaultValue: '#FFF',
        setters: 'ColorSetter'
      },
      {
        name: 'refresher-triggered',
        title: '设置当前下拉刷新状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'enable-flex',
        title: '启用 flexbox 布局',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scroll-anchoring',
        title: '开启 scroll anchoring 特性，即控制滚动位置不随内容变化而抖动',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      'scrolltoupper',
      'scrolltolower',
      'scroll',
      'refresherpulling',
      'refresherrefresh',
      'refresherrestore',
      'refresherabort'
    ],
    snippet: {
      props: {
        'scroll-y': true,
        'scroll-top': 0,
        style: {
          height: '300px'
        }
      },
      children: [
        {
          name: 'View',
          props: {
            id: 'demo1',
            class: 'scroll-view-item uni-bg-red',
            style: {
              'min-height': '300px',
              background: 'red'
            }
          },
          children: 'A'
        },
        {
          name: 'View',
          props: {
            id: 'demo2',
            class: 'scroll-view-item uni-bg-green',
            style: {
              'min-height': '300px',
              background: 'green'
            }
          },
          children: 'B'
        },
        {
          name: 'View',
          props: {
            id: 'demo3',
            class: 'scroll-view-item uni-bg-blue',
            style: {
              'min-height': '300px',
              background: 'blue'
            }
          },
          children: 'C'
        }
      ]
    },
    package: '@dcloudio/uni-h5'
  },
  Swiper: {
    name: 'Swiper',
    label: '滑块视图容器',
    categoryId: 'container',
    props: [
      {
        name: 'indicator-dots',
        title: '是否显示面板指示点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'indicator-color',
        title: '指示点颜色',
        defaultValue: 'rgba(0, 0, 0, .3)',
        setters: 'ColorSetter'
      },
      {
        name: 'indicator-active-color',
        title: '当前选中的指示点颜色',
        defaultValue: '#000000',
        setters: 'ColorSetter'
      },
      {
        name: 'active-class',
        title: 'swiper-item 可见时的 class',
        setters: 'StringSetter'
      },
      {
        name: 'changing-class',
        title:
          'acceleration 设置为 true 时且处于滑动过程中，中间若干屏处于可见时的class',
        setters: 'StringSetter'
      },
      {
        name: 'autoplay',
        title: '是否自动切换',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'current',
        title: '当前所在滑块的 index',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'current-item-id',
        title: '当前所在滑块的 item-id ，不能与 current 被同时指定',
        setters: 'StringSetter'
      },
      {
        name: 'interval',
        title: '自动切换时间间隔',
        defaultValue: 5000,
        setters: 'NumberSetter'
      },
      {
        name: 'duration',
        title: '滑动动画时长',
        defaultValue: 500,
        setters: 'NumberSetter'
      },
      {
        name: 'circular',
        title: '是否采用衔接滑动，即播放到末尾后重新回到开头',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'vertical',
        title: '滑动方向是否为纵向',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'previous-margin',
        title: '前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值',
        defaultValue: '0px',
        setters: 'StringSetter'
      },
      {
        name: 'next-margin',
        title: '后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值',
        defaultValue: '0px',
        setters: 'StringSetter'
      },
      {
        name: 'acceleration',
        title: '当开启时，会根据滑动速度，连续滑动多屏',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disable-programmatic-animation',
        title: '是否禁用代码变动触发 swiper 切换时使用动画',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'display-multiple-items',
        title: '同时显示的滑块数量',
        defaultValue: 1,
        setters: 'NumberSetter'
      },
      {
        name: 'skip-hidden-item-layout',
        title:
          '是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disable-touch',
        title: '是否禁止用户 touch 操作',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'touchable',
        title: '是否监听用户的触摸事件，只在初始化时有效，不能动态变更',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'easing-function',
        title: '指定 swiper 切换缓动动画类型',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: [
          'default',
          'linear',
          'easeInCubic',
          'easeOutCubic',
          'easeInOutCubic'
        ]
      }
    ],
    events: ['change', 'transition', 'animationfinish'],
    snippet: {
      props: {
        autoplay: true,
        indicatorDots: true,
        circular: true,
        style: {
          color: '#fff',
          height: '200px'
        }
      },
      children: [
        {
          name: 'SwiperItem',
          props: {
            style: {
              background: '#f76260',
              textAlign: 'center',
              color: '#fff',
              height: '200px',
              lineHeight: '200px'
            }
          },
          children: 'A'
        },
        {
          name: 'SwiperItem',
          props: {
            style: {
              background: '#09bb07',
              textAlign: 'center',
              color: '#fff',
              height: '200px',
              lineHeight: '200px'
            }
          },
          children: 'B'
        },
        {
          name: 'SwiperItem',
          props: {
            style: {
              background: '#007aff',
              textAlign: 'center',
              color: '#fff',
              height: '200px',
              lineHeight: '200px'
            }
          },
          children: 'C'
        }
      ]
    },
    package: '@dcloudio/uni-h5'
  },
  SwiperItem: {
    name: 'SwiperItem',
    label: '滑块视图容器',
    parentIncludes: ['Swiper'],
    categoryId: 'container',
    props: [
      {
        name: 'item-id',
        title: '该 swiper-item 的标识符',
        setters: 'InputSetter'
      }
    ],
    snippet: {
      children: [
        {
          name: 'View',
          props: {
            style: {
              height: '300px',
              background: 'green'
            }
          },
          children: 'A'
        }
      ]
    },
    package: '@dcloudio/uni-h5'
  },
  MatchMedia: {
    name: 'MatchMedia',
    label: '适配大屏小屏',
    categoryId: 'container',
    props: [
      {
        name: 'min-width',
        title: '页面最小宽度（ px 为单位）',
        setters: 'NumberSetter'
      },
      {
        name: 'max-width',
        title: '页面最大宽度（ px 为单位）',
        setters: 'NumberSetter'
      },
      {
        name: 'width',
        title: '页面宽度（ px 为单位）',
        setters: 'NumberSetter'
      },
      {
        name: 'min-height',
        title: '页面最小高度（ px 为单位）',
        setters: 'NumberSetter'
      },
      {
        name: 'max-height',
        title: '页面最大高度（ px 为单位）',
        setters: 'NumberSetter'
      },
      {
        name: 'height',
        title: '页面高度（ px 为单位）',
        setters: 'NumberSetter'
      },
      {
        name: 'orientation',
        title: '屏幕方向',
        setters: 'SelectSetter',
        options: ['landscape', 'portrait']
      }
    ],
    snippet: {
      props: {
        'min-width': '375',
        'max-width': '800'
      },
      children: [
        {
          name: 'View',
          children: '当页面最小宽度 375px， 页面宽度最大 800px 时显示'
        }
      ]
    },
    package: '@dcloudio/uni-h5'
  },
  MovableArea: {
    name: 'MovableArea',
    label: '可拖动区域',
    categoryId: 'container',
    props: [
      {
        name: 'scale-area',
        title:
          '当里面的 movable-view 设置为支持双指缩放时，设置此值可将缩放手势生效区域修改为整个 movable-area',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'width',
        title: '宽度 *',
        defaultValue: '10px',
        setters: 'StringSetter'
      },
      {
        name: 'height',
        title: '高度 *',
        defaultValue: '10px',
        setters: 'StringSetter'
      }
    ],
    snippet: {},
    package: '@dcloudio/uni-h5'
  },
  MovableView: {
    name: 'MovableView',
    label: '可移动的视图容器',
    categoryId: 'container',
    parentIncludes: ['MovableArea'],
    props: [
      {
        name: 'direction',
        title: 'movable-view的移动方向',
        defaultValue: 'none',
        setters: 'SelectSetter',
        options: ['all', 'vertical', 'horizontal', 'none']
      },
      {
        name: 'inertia',
        title: 'movable-view是否带有惯性',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'out-of-bounds',
        title: '超过可移动区域后，movable-view是否还可以移动',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'x',
        title: '定义x轴方向的偏移',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'y',
        title: '定义y轴方向的偏移',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'damping',
        title: '阻尼系数',
        defaultValue: 20,
        setters: 'NumberSetter'
      },
      {
        name: 'friction',
        title: '摩擦系数',
        defaultValue: 2,
        setters: 'NumberSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scale',
        title: '是否支持双指缩放',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scale-min',
        title: '定义缩放倍数最小值',
        defaultValue: 0.2,
        setters: 'NumberSetter'
      },
      {
        name: 'scale-max',
        title: '定义缩放倍数最大值',
        defaultValue: 10,
        setters: 'NumberSetter'
      },
      {
        name: 'scale-value',
        title: '定义缩放倍数，取值范围为 0.1/0.5 - 10',
        defaultValue: 1,
        setters: 'NumberSetter'
      },
      {
        name: 'animation',
        title: '是否使用动画',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: ['change', 'scale'],
    snippet: {
      props: {
        x: 0,
        y: 0,
        direction: 'all'
      }
    },
    package: '@dcloudio/uni-h5'
  },
  CoverView: {
    name: 'CoverView',
    label: '文本视图',
    categoryId: 'container',
    props: [
      {
        name: 'scroll-top',
        title:
          '设置顶部滚动偏移量，仅在设置了 overflow-y: scroll 成为滚动元素后生效',
        setters: ['NumberSetter', 'StringSetter']
      }
    ],
    events: ['click'],
    snippet: {},
    package: '@dcloudio/uni-h5'
  },
  CoverImage: {
    name: 'CoverImage',
    label: '图片视图',
    categoryId: 'container',
    props: [
      {
        name: 'src',
        title: '图标路径。支持本地路径、网络路径。不支持 base64 格式。',
        setters: 'StringSetter'
      }
    ],
    events: ['load', 'error', 'click'],
    snippet: {},
    package: '@dcloudio/uni-h5'
  },
  Icon: {
    name: 'Icon',
    label: '图标',
    categoryId: 'basic',
    props: [
      {
        name: 'type',
        title: 'icon的类型',
        setters: 'SelectSetter',
        options: [
          'success',
          'success_no_circle',
          'info',
          'warn',
          'waiting',
          'cancel',
          'download',
          'search',
          'clear'
        ]
      },
      {
        name: 'size',
        title: 'icon的大小， 单位px',
        defaultValue: 23,
        setters: 'NumberSetter'
      },
      {
        name: 'color',
        title: 'icon的颜色，同css的color',
        setters: 'ColorSetter'
      }
    ],
    snippet: {
      props: {
        type: 'success',
        size: 26
      }
    },
    package: '@dcloudio/uni-h5'
  },
  Text: {
    name: 'Text',
    label: '文本',
    categoryId: 'basic',
    props: [
      {
        name: 'selectable',
        title: '文本是否可选',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'user-select',
        title: '文本是否可选',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'space',
        title: '显示连续空格',
        setters: ['SelectSetter', 'StringSetter'],
        options: ['ensp', 'emsp', 'nbsp']
      },
      {
        name: 'decode',
        title: '是否解码',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    snippet: {
      children: 'VTJ'
    },
    package: '@dcloudio/uni-h5'
  },
  RichText: {
    name: 'RichText',
    label: '文本',
    categoryId: 'basic',
    props: [
      {
        name: 'nodes',
        title: '节点列表 / HTML String',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'space',
        title: '显示连续空格',
        setters: 'StringSetter'
      },
      {
        name: 'selectable',
        title: '富文本是否可以长按选中，可用于复制，粘贴等场景',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'image-menu-prevent',
        title: '阻止长按图片时弹起默认菜单',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'preview',
        title: '富文本中的图片是否可点击预览',
        setters: 'BooleanSetter'
      }
    ],
    events: [
      'click',
      'touchstart',
      'touchmove',
      'touchcancel',
      'touchend',
      'longpress',
      'itemclick'
    ],
    snippet: {
      props: {
        nodes: [
          {
            name: 'div',
            attrs: {
              class: 'div-class',
              style: 'line-height: 60px; color: red; text-align:center;'
            },
            children: [
              {
                type: 'text',
                text: 'Hello&nbsp;uni-app!'
              }
            ]
          }
        ]
      }
    },
    package: '@dcloudio/uni-h5'
  },
  Progress: {
    name: 'Progress',
    label: '进度条',
    categoryId: 'basic',
    props: [
      {
        name: 'percent',
        title: '百分比0~100',
        setters: 'NumberSetter'
      },
      {
        name: 'show-info',
        title: '在进度条右侧显示百分比',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border-radius',
        title: '圆角大小',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'font-size',
        title: '右侧百分比字体大小',
        defaultValue: 16,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'stroke-width',
        title: '进度条线的宽度，单位px',
        defaultValue: 6,
        setters: 'NumberSetter'
      },
      {
        name: 'activeColor',
        title: '已选择的进度条的颜色',
        defaultValue: '#09BB07',
        setters: 'ColorSetter'
      },
      {
        name: 'backgroundColor',
        title: '未选择的进度条的颜色',
        defaultValue: '#EBEBEB',
        setters: 'ColorSetter'
      },
      {
        name: 'active',
        title: '进度条从左往右的动画',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'active-mode',
        title: 'backwards: 动画从头播；forwards：动画从上次结束点接着播',
        defaultValue: 'backwards',
        setters: 'SelectSetter',
        options: ['backwards', 'forwards']
      },
      {
        name: 'duration',
        title: '进度增加1%所需毫秒数',
        defaultValue: 30,
        setters: 'NumberSetter'
      }
    ],
    events: ['activeend'],
    snippet: {
      props: {
        percent: 10,
        'show-info': true,
        'stroke-width': '3'
      }
    },
    package: '@dcloudio/uni-h5'
  },
  Button: {
    name: 'Button',
    label: '按钮',
    categoryId: 'form',
    props: [
      {
        name: 'size',
        title: '按钮的大小',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'mini']
      },
      {
        name: 'type',
        title: '按钮的样式类型',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['primary', 'default', 'warn']
      },
      {
        name: 'plain',
        title: '按钮是否镂空，背景色透明',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        title: '名称前是否带 loading 图标',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'form-type',
        title:
          '用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件',
        setters: 'SelectSetter',
        options: ['submit', 'reset']
      },
      {
        name: 'open-type',
        title: '开放能力',
        setters: 'SelectSetter',
        options: [
          'feedback',
          'share',
          'getUserInfo',
          'contact',
          'getPhoneNumber',
          'launchApp',
          'openSetting',
          'chooseAvatar',
          'agreePrivacyAuthorization',
          'uploadDouyinVideo',
          'im',
          'getAuthorize',
          'lifestyle',
          'contactShare',
          'openGroupProfile',
          'openGuildProfile',
          'openPublicProfile',
          'shareMessageToFriend',
          'addFriend',
          'addColorSign',
          'addGroupApp',
          'addToFavorites',
          'chooseAddress',
          'chooseInvoiceTitle',
          'login',
          'subscribe',
          'favorite',
          'watchLater',
          'openProfile'
        ]
      },
      {
        name: 'hover-class',
        title: '指定按钮按下去的样式类',
        defaultValue: 'button-hover',
        setters: 'StringSetter'
      },
      {
        name: 'hover-start-time',
        title: '按住后多久出现点击态，单位毫秒',
        defaultValue: 20,
        setters: 'NumberSetter'
      },
      {
        name: 'hover-stay-time',
        title: '手指松开后点击态保留时间，单位毫秒',
        defaultValue: 70,
        setters: 'NumberSetter'
      },
      {
        name: 'app-parameter',
        title: '打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效',
        setters: 'StringSetter'
      },
      {
        name: 'hover-stop-propagation',
        title: '指定是否阻止本节点的祖先节点出现点击态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'lang',
        title: '指定返回用户信息的语言',
        defaultValue: 'en',
        setters: 'SelectSetter',
        options: ['en', 'zh_CN', 'zh_TW']
      },
      {
        name: 'session-from',
        title: '会话来源，open-type="contact"时有效',
        setters: 'StringSetter'
      },
      {
        name: 'send-message-title',
        title: '会话内消息卡片标题，open-type="contact"时有效',
        setters: 'StringSetter'
      },
      {
        name: 'send-message-path',
        title: '会话内消息卡片点击跳转小程序路径，open-type="contact"时有效',
        setters: 'StringSetter'
      },
      {
        name: 'send-message-img',
        title: '会话内消息卡片图片，open-type="contact"时有效',
        setters: 'StringSetter'
      },
      {
        name: 'show-message-card',
        title: '是否显示会话内消息卡片',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'group-id',
        title: '打开群资料卡时，传递的群号',
        setters: 'StringSetter'
      },
      {
        name: 'guild-id',
        title: '打开频道页面时，传递的频道号',
        setters: 'StringSetter'
      },
      {
        name: 'public-id',
        title: '打开公众号资料卡时，传递的号码',
        setters: 'StringSetter'
      },
      {
        name: 'data-im-id',
        title: '客服的抖音号',
        setters: 'StringSetter'
      },
      {
        name: 'data-im-type',
        title: 'IM卡片类型',
        setters: 'StringSetter'
      },
      {
        name: 'data-goods-id',
        title: '商品的id',
        setters: 'StringSetter'
      },
      {
        name: 'data-order-id',
        title: '订单的id，仅支持交易2.0订单',
        setters: 'StringSetter'
      },
      {
        name: 'data-biz-line',
        title: '商品类型，“1”代表生活服务，“2”代表泛知识。',
        setters: 'StringSetter'
      }
    ],
    events: [
      'getphonenumber',
      'getuserinfo',
      'error',
      'opensetting',
      'launchapp',
      'contact',
      'chooseavatar',
      'agreeprivacyauthorization',
      'addgroupapp',
      'chooseaddress',
      'chooseinvoicetitle',
      'subscribe',
      'login',
      'im'
    ],
    snippet: {
      children: 'Button'
    },
    package: '@dcloudio/uni-h5'
  },
  CheckboxGroup: {
    name: 'CheckboxGroup',
    label: '多选框组',
    categoryId: 'form',
    events: ['change'],
    snippet: {
      children: [
        {
          name: 'Checkbox',
          props: {
            checked: true
          },
          children: '选中'
        },
        {
          name: 'Checkbox',
          props: {
            checked: false
          },
          children: '未选中'
        }
      ]
    },
    package: '@dcloudio/uni-h5'
  },
  Checkbox: {
    name: 'Checkbox',
    label: '多选项',
    categoryId: 'form',
    props: [
      {
        name: 'value',
        title:
          '<checkbox> 标识，选中时触发 <checkbox-group> 的 change 事件，并携带 <checkbox> 的 value。',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'checked',
        title: '当前是否选中，可用来设置默认选中',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'color',
        title: 'checkbox的颜色，同css的color',
        setters: 'ColorSetter'
      },
      {
        name: 'backgroundColor',
        title: 'checkbox默认的背景颜色',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      },
      {
        name: 'borderColor',
        title: 'checkbox默认的边框颜色',
        defaultValue: '#d1d1d1',
        setters: 'ColorSetter'
      },
      {
        name: 'activeBackgroundColor',
        title: 'checkbox选中时的背景颜色，优先级大于color属性',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      },
      {
        name: 'activeBorderColor',
        title: 'checkbox选中时的边框颜色',
        defaultValue: '#d1d1d1',
        setters: 'ColorSetter'
      },
      {
        name: 'iconColor',
        title: 'checkbox的图标颜色',
        defaultValue: '#007aff',
        setters: 'ColorSetter'
      }
    ],
    snippet: {
      children: '选项'
    },
    package: '@dcloudio/uni-h5'
  },
  Editor: {
    name: 'Editor',
    label: '富文本编辑器',
    categoryId: 'form',
    props: [
      {
        name: 'read-only',
        title: '设置编辑器为只读',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'placeholder',
        title: '提示信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'show-img-size',
        title: '点击图片时显示图片大小控件',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-img-toolbar',
        title: '点击图片时显示工具栏控件',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-img-resize',
        title: '点击图片时显示修改尺寸控件',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['ready', 'focus', 'blur', 'input', 'statuschange'],
    snippet: {
      props: {
        placeholder: '开始输入...',
        'show-img-size': true,
        'show-img-toolbar': true,
        'show-img-resize': true
      }
    },
    package: '@dcloudio/uni-h5'
  },
  Form: {
    name: 'Form',
    label: '表单',
    categoryId: 'form',
    props: [
      {
        name: 'report-submit',
        title: '是否返回 formId 用于发送模板消息',
        setters: 'BooleanSetter'
      },
      {
        name: 'report-submit-timeout',
        title: '等待一段时间（毫秒数）以确认 formId 是否生效',
        setters: 'NumberSetter'
      }
    ],
    events: ['submit', 'reset'],
    snippet: {
      children: [
        {
          name: 'Label',
          children: [
            {
              name: 'View',
              children: '用户名'
            },
            {
              name: 'Input',
              props: {
                style: {
                  height: '40px',
                  backgroundColor: '#f0f0f0'
                },
                placeholder: '请输入用户名'
              }
            }
          ]
        },
        {
          name: 'Label',
          children: [
            {
              name: 'View',
              children: '密码'
            },
            {
              name: 'Input',
              props: {
                style: {
                  height: '40px',
                  backgroundColor: '#f0f0f0'
                },
                placeholder: '请输入密码'
              }
            }
          ]
        },
        {
          name: 'Button',
          children: '提交'
        }
      ]
    },
    package: '@dcloudio/uni-h5'
  },
  Input: {
    name: 'Input',
    label: '单行输入框',
    categoryId: 'form',
    props: [
      {
        name: 'modelValue',
        title: '输入框的初始内容',
        setters: 'StringSetter'
      },
      {
        name: 'type',
        title: 'input 的类型 有效值',
        defaultValue: 'text',
        setters: 'SelectSetter',
        options: [
          'text',
          'number',
          'idcard',
          'digit',
          'tel',
          'safe-password',
          'nickname'
        ]
      },
      {
        name: 'text-content-type',
        title: '文本区域的语义，根据类型自动填充 有效值',
        setters: 'StringSetter'
      },
      {
        name: 'password',
        title: '是否是密码类型',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'placeholder',
        title: '输入框为空时占位符',
        setters: 'StringSetter'
      },
      {
        name: 'placeholder-style',
        title: '指定 placeholder 的样式',
        setters: 'StringSetter'
      },
      {
        name: 'placeholder-class',
        title: '指定 placeholder 的样式类',
        defaultValue: 'input-placeholder',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'maxlength',
        title: '最大输入长度，设置为 -1 的时候不限制最大长度',
        defaultValue: 140,
        setters: 'NumberSetter'
      },
      {
        name: 'cursor-spacing',
        title: '指定光标与键盘的距离',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'focus',
        title: '获取焦点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'confirm-type',
        title: '设置键盘右下角按钮的文字，仅在 type="text" 时生效。有效值',
        defaultValue: 'done',
        setters: 'SelectSetter',
        options: ['send', 'search', 'next', 'go', 'done']
      },
      {
        name: 'confirm-hold',
        title: '点击键盘右下角按钮时是否保持键盘不收起',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'cursor',
        title: '指定focus时的光标位置',
        setters: 'NumberSetter'
      },
      {
        name: 'cursor-color',
        title: '光标颜色',
        setters: 'StringSetter'
      },
      {
        name: 'selection-start',
        title: '光标起始位置，自动聚集时有效，需与selection-end搭配使用',
        defaultValue: -1,
        setters: 'NumberSetter'
      },
      {
        name: 'selection-end',
        title: '光标结束位置，自动聚集时有效，需与selection-start搭配使用',
        defaultValue: -1,
        setters: 'NumberSetter'
      },
      {
        name: 'adjust-position',
        title: '键盘弹起时，是否自动上推页面',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'auto-blur',
        title: '键盘收起时，是否自动失去焦点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'ignoreCompositionEvent',
        title: '是否忽略组件内对文本合成系统事件的处理',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'always-embed',
        title:
          '强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'hold-keyboard',
        title: 'focus时，点击页面的时候不收起键盘',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'safe-password-cert-path',
        title: '安全键盘加密公钥的路径，只支持包内路径',
        setters: 'StringSetter'
      },
      {
        name: 'safe-password-length',
        title: '安全键盘输入密码长度',
        setters: 'NumberSetter'
      },
      {
        name: 'safe-password-time-stamp',
        title: '安全键盘加密时间戳',
        setters: 'NumberSetter'
      },
      {
        name: 'safe-password-nonce',
        title: '安全键盘加密盐值',
        setters: 'StringSetter'
      },
      {
        name: 'safe-password-salt',
        title: '安全键盘计算 hash 盐值，若指定custom-hash 则无效',
        setters: 'StringSetter'
      },
      {
        name: 'safe-password-custom-hash',
        title: '安全键盘计算 hash 的算法表达式',
        setters: 'StringSetter'
      },
      {
        name: 'random-number',
        title: '当 type 为 number, digit, idcard 数字键盘是否随机排列',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'controlled',
        title: '是否为受控组件。为 true 时，value 内容会完全受 setData 控制',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'always-system',
        title:
          '是否强制使用系统键盘和 Web-view 创建的 input 元素。为 true 时，confirm-type、confirm-hold 可能失效',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'inputmode',
        title:
          '是一个枚举属性，它提供了用户在编辑元素或其内容时可能输入的数据类型的提示',
        defaultValue: 'text',
        setters: 'SelectSetter',
        options: [
          'none',
          'text',
          'decimal',
          'numeric',
          'tel',
          'search',
          'email',
          'url'
        ]
      }
    ],
    events: ['input', 'focus', 'blur', 'confirm', 'update:modelValue'],
    snippet: {
      props: {
        placeholder: '这个是一个输入框'
      }
    },
    package: '@dcloudio/uni-h5'
  },
  Label: {
    name: 'Label',
    label: '标签',
    categoryId: 'form',
    props: [
      {
        name: 'for',
        title: '绑定控件的 id',
        setters: 'StringSetter'
      }
    ],
    snippet: {},
    package: '@dcloudio/uni-h5'
  },
  Picker: {
    name: 'Picker',
    label: '选择器',
    categoryId: 'form',
    props: [
      {
        name: 'mode',
        title: '模式',
        defaultValue: 'selector',
        setters: 'SelectSetter',
        options: ['selector', 'multiSelector', 'time', 'date', 'region']
      },
      {
        name: 'range',
        title: 'mode为 selector 或 multiSelector 时，range 有效',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'range-key',
        title:
          '当 range 是一个 Array＜Object＞ 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容',
        setters: 'StringSetter'
      },
      {
        name: 'value',
        title: 'value 的值表示选择了 range 中的第几个（下标从 0 开始）',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'selector-type',
        title:
          'UI类型,仅大屏时该属性生效，支持 picker、select、auto，默认在 iPad 以 picker 样式展示而在 PC 以 select 样式展示',
        defaultValue: 'auto',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'start',
        title: '表示有效时间范围的开始，字符串格式为"hh:mm"',
        setters: 'StringSetter'
      },
      {
        name: 'end',
        title: '表示有效时间范围的结束，字符串格式为"hh:mm"',
        setters: 'StringSetter'
      },
      {
        name: 'fields',
        title:
          '有效值 year、month、day，表示选择器的粒度，默认为 day，App 端未配置此项时使用系统 UI',
        defaultValue: 'day',
        setters: 'SelectSetter',
        options: ['year', 'month', 'day']
      },
      {
        name: 'custom-item',
        title: '可为每一列的顶部添加一个自定义的项',
        setters: 'StringSetter'
      }
    ],
    events: ['change', 'cancel', 'columnchange'],
    snippet: {
      props: {
        mode: 'selector',
        range: ['中国', '美国', '巴西', '日本'],
        value: 0,
        children: [
          {
            name: 'View',
            children: '中国'
          }
        ]
      }
    },
    package: '@dcloudio/uni-h5'
  },
  PickerView: {
    name: 'PickerView',
    label: '选择器',
    categoryId: 'form',
    props: [
      {
        name: 'value',
        title: '选中的项',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'indicator-style',
        title: '设置选择器中间选中框的样式',
        setters: 'StringSetter'
      },
      {
        name: 'indicator-class',
        title: '设置选择器中间选中框的类名',
        setters: 'StringSetter'
      },
      {
        name: 'mask-style',
        title: '设置蒙层的样式',
        setters: 'StringSetter'
      },
      {
        name: 'mask-top-style',
        title: '设置蒙层上半部分的样式',
        setters: 'StringSetter'
      },
      {
        name: 'mask-bottom-style',
        title: '设置蒙层下半部分的样式',
        setters: 'StringSetter'
      },
      {
        name: 'mask-class',
        title: '设置蒙层的类名',
        setters: 'StringSetter'
      },
      {
        name: 'immediate-change',
        title:
          '是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件。',
        setters: 'BooleanSetter'
      }
    ],
    events: ['change', 'pickstart', 'pickend'],
    snippet: {
      props: {
        value: [9999, 10, 10],
        'indicator-style': 'height: 50px;',
        style: {
          width: ' 100%',
          height: '300px',
          marginTop: '20px'
        }
      },
      children: [
        {
          name: 'PickerViewColumn',
          children: [
            {
              name: 'View',
              props: {
                style: {
                  'text-align': 'center'
                }
              },
              children: {
                type: 'JSExpression',
                value: 'this.context.item'
              },
              directives: [
                {
                  name: 'vFor',
                  value: {
                    type: 'JSExpression',
                    value: '["2021年","2022年","2023年","2024年"]'
                  }
                }
              ]
            }
          ]
        },
        {
          name: 'PickerViewColumn',
          children: [
            {
              name: 'View',
              props: {
                style: {
                  'text-align': 'center'
                }
              },
              children: {
                type: 'JSExpression',
                value: 'this.context.item'
              },
              directives: [
                {
                  name: 'vFor',
                  value: {
                    type: 'JSExpression',
                    value: '["3月","4月","5月","6月", "7月"]'
                  }
                }
              ]
            }
          ]
        },
        {
          name: 'PickerViewColumn',
          children: [
            {
              name: 'View',
              props: {
                style: {
                  'text-align': 'center'
                }
              },
              children: {
                type: 'JSExpression',
                value: 'this.context.item'
              },
              directives: [
                {
                  name: 'vFor',
                  value: {
                    type: 'JSExpression',
                    value: '["3号","4号","5号","6号", "7号"]'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    package: '@dcloudio/uni-h5'
  },
  PickerViewColumn: {
    name: 'PickerViewColumn',
    label: '选择器列',
    parentIncludes: ['PickerView'],
    categoryId: 'form',
    snippet: {
      children: [
        {
          name: 'View',
          children: {
            type: 'JSExpression',
            value: 'this.context.item'
          },
          directives: [
            {
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value: '["2021年","2022年","2023年","2024年"]'
              }
            }
          ]
        }
      ]
    },
    package: '@dcloudio/uni-h5'
  },
  RadioGroup: {
    name: 'RadioGroup',
    label: '单项选择器',
    categoryId: 'form',
    events: ['change'],
    snippet: {
      props: {},
      children: [
        {
          name: 'Label',
          props: {
            key: {
              type: 'JSExpression',
              value: 'this.context.item.value'
            },
            style: {
              display: 'flex',
              flexDirection: 'row'
            }
          },
          children: [
            {
              name: 'View',
              children: [
                {
                  name: 'Radio',
                  props: {
                    value: {
                      type: 'JSExpression',
                      value: 'this.context.item.value'
                    },
                    checked: 'this.context.index === 0'
                  }
                }
              ]
            },
            {
              name: 'View',
              children: {
                type: 'JSExpression',
                value: 'this.context.item.name'
              }
            }
          ],
          directives: [
            {
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value:
                  "[{value: 'USA',name: '美国',checked: 'true'},{value: 'CHN',name:'中国'},{value: 'BRA',\tname: '巴西'},{value: 'JPN',name: '日本'},{value: 'ENG',name: '英国'},{value: 'FRA',name: '法国'}]"
              }
            }
          ]
        }
      ]
    },
    package: '@dcloudio/uni-h5'
  },
  Radio: {
    name: 'Radio',
    label: '单选项目',
    categoryId: 'form',
    props: [
      {
        name: 'value',
        title:
          '<radio> 标识。当该 <radio> 选中时，<radio-group> 的 change 事件会携带 <radio> 的 value',
        setters: 'StringSetter'
      },
      {
        name: 'checked',
        title: '当前是否选中',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'color',
        title: 'radio的颜色，同css的color',
        setters: 'ColorSetter'
      },
      {
        name: 'backgroundColor',
        title: 'radio默认的背景颜色',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      },
      {
        name: 'borderColor',
        title: 'radio默认的边框颜色',
        defaultValue: '#d1d1d1',
        setters: 'ColorSetter'
      },
      {
        name: 'activeBackgroundColor',
        title: 'radio选中时的背景颜色，优先级大于color属性',
        defaultValue: '#007AFF',
        setters: 'ColorSetter'
      },
      {
        name: 'activeBorderColor',
        title: 'radio选中时的边框颜色',
        setters: 'ColorSetter'
      },
      {
        name: 'iconColor',
        title: 'radio的图标颜色',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      }
    ],
    snippet: {
      props: {
        checked: false
      },
      children: '选项'
    },
    package: '@dcloudio/uni-h5'
  },
  Slider: {
    name: 'Slider',
    label: '滑动选择器',
    categoryId: 'form',
    props: [
      {
        name: 'min',
        title: '最小值',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'max',
        title: '最大值',
        defaultValue: '100',
        setters: 'NumberSetter'
      },
      {
        name: 'step',
        title: '步长，取值必须大于 0，并且可被(max - min)整除',
        defaultValue: 1,
        setters: 'NumberSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'value',
        title: '当前取值',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'activeColor',
        title: '滑块左侧已选择部分的线条颜色',
        setters: 'ColorSetter'
      },
      {
        name: 'backgroundColor',
        title: '滑块右侧背景条的颜色',
        defaultValue: '#e9e9e9',
        setters: 'ColorSetter'
      },
      {
        name: 'block-size',
        title: '滑块的大小，取值范围为 12 - 28',
        defaultValue: 28,
        setters: 'NumberSetter'
      },
      {
        name: 'block-color',
        title: '滑块的颜色',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      },
      {
        name: 'show-value',
        title: '是否显示当前 value',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['change', 'changing'],
    snippet: {
      props: {
        value: 60
      }
    },
    package: '@dcloudio/uni-h5'
  },
  Switch: {
    name: 'Switch',
    label: '开关选择器',
    categoryId: 'form',
    props: [
      {
        name: 'checked',
        title: '是否选中',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'type',
        title: '样式',
        defaultValue: 'switch',
        setters: 'SelectSetter',
        options: ['switch', 'checkbox']
      },
      {
        name: 'color',
        title: 'switch 的颜色',
        setters: 'ColorSetter'
      }
    ],
    events: ['change'],
    package: '@dcloudio/uni-h5'
  },
  Textarea: {
    name: 'Textarea',
    label: '多行输入框',
    categoryId: 'form',
    props: [
      {
        name: 'value',
        title: '输入框的内容',
        setters: 'StringSetter'
      },
      {
        name: 'placeholder',
        title: '输入框为空时占位符',
        setters: 'StringSetter'
      },
      {
        name: 'placeholder-style',
        title: '指定 placeholder 的样式',
        setters: 'StringSetter'
      },
      {
        name: 'placeholder-class',
        title: '指定 placeholder 的样式类',
        defaultValue: 'textarea-placeholder',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'maxlength',
        title: '最大输入长度，设置为 -1 的时候不限制最大长度',
        defaultValue: 140,
        setters: 'NumberSetter'
      },
      {
        name: 'focus',
        title: '获取焦点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'auto-focus',
        title: '自动聚焦，拉起键盘',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'auto-height',
        title: '是否自动增高，设置auto-height时，style.height不生效',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'fixed',
        title:
          '如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'cursor-spacing',
        title: '指定光标与键盘的距离，单位 px',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'cursor',
        title: '指定focus时的光标位置',
        setters: 'NumberSetter'
      },
      {
        name: 'cursor-color',
        title: '光标颜色',
        setters: 'StringSetter'
      },
      {
        name: 'confirm-type',
        title: '设置键盘右下角按钮的文字',
        defaultValue: 'done',
        setters: 'SelectSetter',
        options: ['send', 'search', 'next', 'go', 'done']
      },
      {
        name: 'confirm-hold',
        title: '点击键盘右下角按钮时是否保持键盘不收起',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-confirm-bar',
        title: '是否显示键盘上方带有”完成“按钮那一栏',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'selection-start',
        title: '光标起始位置，自动聚焦时有效，需与selection-end搭配使用',
        defaultValue: -1,
        setters: 'NumberSetter'
      },
      {
        name: 'selection-end',
        title: '光标结束位置，自动聚焦时有效，需与selection-end搭配使用',
        defaultValue: -1,
        setters: 'NumberSetter'
      },
      {
        name: 'adjust-position',
        title: '键盘弹起时，是否自动上推页面',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'disable-default-padding',
        title: '是否去掉 iOS 下的默认内边距',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'hold-keyboard',
        title: 'focus时，点击页面的时候不收起键盘',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'auto-blur',
        title: '键盘收起时，是否自动失去焦点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'ignoreCompositionEvent',
        title: '是否忽略组件内对文本合成系统事件的处理',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'inputmode',
        title: '提供了用户在编辑元素或其内容时可能输入的数据类型的提示',
        defaultValue: 'text',
        setters: 'SelectSetter',
        options: [
          'none',
          'text',
          'decimal',
          'numeric',
          'tel',
          'search',
          'email',
          'url'
        ]
      }
    ],
    events: ['confirm', 'input', 'linechange', 'blur', 'focus'],
    snippet: {
      props: {
        style: {
          backgroundColor: '#999'
        },
        placeholder: '输入区域'
      }
    },
    package: '@dcloudio/uni-h5'
  },
  Navigator: {
    name: 'Navigator',
    label: '页面跳转',
    categoryId: 'nav',
    props: [
      {
        name: 'url',
        title: '应用内的跳转链接，值为相对路径或绝对路径',
        setters: 'StringSetter'
      },
      {
        name: 'open-type',
        title: '跳转方式',
        defaultValue: 'navigate',
        setters: 'SelectSetter',
        options: [
          'navigate',
          'redirect',
          'switchTab',
          'reLaunch',
          'navigateBack',
          'exit'
        ]
      },
      {
        name: 'delta',
        title: '当 open-type 为 "navigateBack" 时有效，表示回退的层数',
        setters: 'NumberSetter'
      },
      {
        name: 'animation-type',
        title:
          '当 open-type 为 navigate、navigateBack 时有效，窗口的显示/关闭动画效果',
        defaultValue: 'pop-in/out',
        setters: 'StringSetter'
      },
      {
        name: 'animation-duration',
        title:
          '当 open-type 为 navigate、navigateBack 时有效，窗口显示/关闭动画的持续时间',
        defaultValue: 300,
        setters: 'NumberSetter'
      },
      {
        name: 'render-link',
        title: '是否给 navigator 组件加一层 a 标签控制 ssr 渲染',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'hover-class',
        title: '指定点击时的样式类，当hover-class="none"时，没有点击态效果',
        defaultValue: 'navigator-hover',
        setters: 'StringSetter'
      },
      {
        name: 'hover-stop-propagation',
        title: '指定是否阻止本节点的祖先节点出现点击态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'hover-start-time',
        title: '按住后多久出现点击态，单位毫秒',
        defaultValue: 50,
        setters: 'NumberSetter'
      },
      {
        name: 'hover-stay-time',
        title: '手指松开后点击态保留时间，单位毫秒',
        defaultValue: 600,
        setters: 'NumberSetter'
      },
      {
        name: 'target',
        title:
          '在哪个小程序目标上发生跳转，默认当前小程序，值域self/miniProgram',
        defaultValue: 'self',
        setters: 'StringSetter'
      }
    ],
    snippet: {
      children: [
        {
          name: 'Button',
          props: {
            type: 'default'
          },
          children: '跳转到新页面'
        }
      ]
    },
    package: '@dcloudio/uni-h5'
  },
  Audio: {
    name: 'Audio',
    label: '音频',
    categoryId: 'media',
    props: [
      {
        name: 'id',
        title: 'audio 组件的唯一标识符',
        setters: 'StringSetter'
      },
      {
        name: 'src',
        title: '要播放音频的资源地址',
        setters: 'StringSetter'
      },
      {
        name: 'loop',
        title: '是否循环播放',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'controls',
        title: '是否显示默认控件',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'poster',
        title: '默认控件上的音频封面的图片资源地址',
        setters: 'StringSetter'
      },
      {
        name: 'name',
        title: '默认控件上的音频名字',
        defaultValue: '未知音频',
        setters: 'StringSetter'
      },
      {
        name: 'author',
        title: '默认控件上的作者名字',
        defaultValue: '未知作者',
        setters: 'StringSetter'
      },
      {
        name: 'action',
        setters: 'ObjectSetter'
      }
    ],
    events: ['error', 'play', 'pause', 'timeupdate', 'ended'],
    snippet: {
      props: {
        src: 'https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3',
        poster: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png',
        name: '致爱丽丝',
        author: '暂无',
        controls: true,
        action: {
          audioAction: {
            method: 'pause'
          }
        }
      }
    },
    package: '@dcloudio/uni-h5'
  },
  Image: {
    name: 'Image',
    label: '图片',
    categoryId: 'media',
    props: [
      {
        name: 'src',
        title: '图片资源地址',
        setters: 'StringSetter'
      },
      {
        name: 'mode',
        title: '图片裁剪、缩放的模式',
        defaultValue: 'scaleToFill',
        setters: 'SelectSetter',
        options: [
          'scaleToFill',
          'aspectFit',
          'aspectFill',
          'widthFix',
          'heightFix',
          'top',
          'bottom',
          'center',
          'left',
          'right',
          'top left',
          'top right',
          'bottom left',
          'bottom right'
        ]
      },
      {
        name: 'lazy-load',
        title: '图片懒加载',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'fade-show',
        title: '图片显示动画效果',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'webp',
        title:
          '在系统不支持webp的情况下是否单独启用webp。默认false，只支持网络资源',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-menu-by-longpress',
        title: '开启长按图片显示识别小程序码菜单',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'draggable',
        title: '是否能拖动图片',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: ['error', 'load'],
    snippet: {
      props: {
        src: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
        style: {
          width: '200px',
          height: '200px',
          backgroundColor: '#eeeeee'
        }
      }
    },
    package: '@dcloudio/uni-h5'
  },
  Video: {
    name: 'Video',
    label: '视频播放组件',
    categoryId: 'media',
    props: [
      {
        name: 'src',
        title: '要播放视频的资源地址',
        setters: 'StringSetter'
      },
      {
        name: 'autoplay',
        title: '是否自动播放',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loop',
        title: '是否循环播放',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'muted',
        title: '是否静音播放',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'initial-time',
        title: '指定视频初始播放位置，单位为秒（s）',
        setters: 'NumberSetter'
      },
      {
        name: 'duration',
        title: '指定视频时长，单位为秒（s）',
        setters: 'NumberSetter'
      },
      {
        name: 'controls',
        title: '是否显示默认播放控件（播放/暂停按钮、播放进度、时间）',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'danmu-list',
        title: '弹幕列表',
        setters: 'ExpressionSetter'
      },
      {
        name: 'danmu-btn',
        title: '是否显示弹幕按钮，只在初始化时有效，不能动态变更',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'enable-danmu',
        title: '是否展示弹幕，只在初始化时有效，不能动态变更',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'page-gesture',
        title: '在非全屏模式下，是否开启亮度与音量调节手势',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'direction',
        title: '设置全屏时视频的方向，不指定则根据宽高比自动判断',
        setters: 'SelectSetter',
        options: [
          {
            label: '0',
            value: 0
          },
          {
            label: '90',
            value: 90
          },
          {
            label: '-90',
            value: -90
          }
        ]
      },
      {
        name: 'show-progress',
        title: '若不设置，宽度大于240时才会显示',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-fullscreen-btn',
        title: '是否显示全屏按钮',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-play-btn',
        title: '是否显示视频底部控制栏的播放按钮',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-center-play-btn',
        title: '是否显示视频中间的播放按钮',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-loading',
        title: '是否显示loading控件',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'enable-progress-gesture',
        title: '是否开启控制进度的手势',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'object-fit',
        title: '视频的表现形式',
        defaultValue: 'contain',
        setters: 'SelectSetter',
        options: ['contain', 'fill', 'cover']
      },
      {
        name: 'poster',
        title:
          '视频封面的图片网络资源地址，如果 controls 属性值为 false 则设置 poster 无效\t',
        setters: 'StringSetter'
      },
      {
        name: 'show-mute-btn',
        title: '是否显示静音按钮',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'title',
        title: '视频的标题，全屏时在顶部展示',
        setters: 'StringSetter'
      },
      {
        name: 'play-btn-position',
        title: '播放按钮的位置',
        defaultValue: 'bottom',
        setters: 'SelectSetter',
        options: ['bottom', 'center']
      },
      {
        name: 'mobilenet-hint-type',
        title: '移动网络提醒样式：0是不提醒，1是提醒，默认值为1',
        defaultValue: 1,
        setters: 'SelectSetter',
        options: [
          {
            label: '0',
            value: 0
          },
          {
            label: '1',
            value: 1
          }
        ]
      },
      {
        name: 'enable-play-gesture',
        title: '是否开启播放手势，即双击切换播放/暂停',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'auto-pause-if-navigate',
        title: '当跳转到其它小程序页面时，是否自动暂停本页面的视频',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'auto-pause-if-open-native',
        title: '当跳转到其它微信原生页面时，是否自动暂停本页面的视频',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'vslide-gesture',
        title: '在非全屏模式下，是否开启亮度与音量调节手势（同 page-gesture）',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'vslide-gesture-in-fullscreen',
        title: '在全屏模式下，是否开启亮度与音量调节手势',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'ad-unit-id',
        title: '视频前贴广告单元ID',
        setters: 'StringSetter'
      },
      {
        name: 'poster-for-crawler',
        title: '用于给搜索等场景作为视频封面展示',
        setters: 'StringSetter'
      },
      {
        name: 'codec',
        title: '解码器选择',
        defaultValue: 'hardware',
        setters: 'SelectSetter',
        options: ['hardware', 'software']
      },
      {
        name: 'http-cache',
        title: '是否对 http、https 视频源开启本地缓存',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'play-strategy',
        title: '播放策略',
        defaultValue: 0,
        setters: 'SelectSetter',
        options: [
          {
            label: '0',
            value: 0
          },
          {
            label: '1',
            value: 1
          },
          {
            label: '2',
            value: 2
          }
        ]
      },
      {
        name: 'header',
        title: 'HTTP 请求 Header',
        setters: 'ObjectSetter'
      },
      {
        name: 'is-live',
        title: '是否为直播源',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      'play',
      'pause',
      'ended',
      'timeupdate',
      'fullscreenchange',
      'waiting',
      'error',
      'progress',
      'loadeddata',
      'loadstart',
      'seeked',
      'seeking',
      'loadedmetadata',
      'fullscreenclick',
      'controlstoggle'
    ],
    snippet: {
      props: {
        style: {
          width: '300px',
          height: '225px'
        },
        src: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4',
        'enable-danmu': true,
        'danmu-btn': true,
        controls: true,
        'danmu-list': [
          {
            text: '第 1s 出现的弹幕',
            color: '#ff0000',
            time: 1
          },
          {
            text: '第 3s 出现的弹幕',
            color: '#ff00ff',
            time: 3
          }
        ]
      }
    },
    package: '@dcloudio/uni-h5'
  },
  Map: {
    name: 'Map',
    label: '地图组件',
    categoryId: 'media',
    props: [
      {
        name: 'longitude',
        title: '中心经度',
        setters: 'NumberSetter'
      },
      {
        name: 'latitude',
        title: '中心纬度',
        setters: 'NumberSetter'
      },
      {
        name: 'scale',
        title: '缩放级别，取值范围为3-20',
        defaultValue: 16,
        setters: 'NumberSetter'
      },
      {
        name: 'theme',
        title: '主题',
        defaultValue: 'normal',
        setters: 'SelectSetter',
        options: ['satellite', 'normal']
      },
      {
        name: 'min-scale',
        title: '最小缩放级别',
        defaultValue: 3,
        setters: 'NumberSetter'
      },
      {
        name: 'max-scale',
        title: '最大缩放级别',
        defaultValue: 20,
        setters: 'NumberSetter'
      },
      {
        name: 'layer-style',
        title: '个性化地图',
        defaultValue: 1,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'markers',
        title: '标记点',
        setters: 'ArraySetter'
      },
      {
        name: 'polyline',
        title: '路线',
        setters: 'ArraySetter'
      },
      {
        name: 'circles',
        title: '圆',
        setters: 'ArraySetter'
      },
      {
        name: 'controls',
        title: '控件',
        setters: 'ArraySetter'
      },
      {
        name: 'include-points',
        title: '缩放视野以包含所有给定的坐标点',
        setters: 'ArraySetter'
      },
      {
        name: 'zIndex',
        title: '显示层级',
        defaultValue: false,
        setters: 'NumberSetter'
      },
      {
        name: 'enable-3D',
        title: '是否显示3D楼块',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-compass',
        title: '是否显示指南针',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'enable-zoom',
        title: '是否支持缩放',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'enable-scroll',
        title: '是否支持拖动',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'enable-rotate',
        title: '是否支持旋转',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'rotate',
        title: '旋转角度(范围0-360)地图正北和设备 y 轴角度的夹角',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'skew',
        title: '倾斜角度，范围 0 ~ 40 , 关于 z 轴的倾角',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'enable-overlooking',
        title: '是否开启俯视',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'enable-satellite',
        title: '是否开启卫星图',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'enable-traffic',
        title: '是否开启实时路况',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'enable-poi',
        title: '是否展示 POI 点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'enable-building',
        title: '是否展示建筑物',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-location',
        title: '显示带有方向的当前定位点',
        setters: 'BooleanSetter'
      },
      {
        name: 'polygons',
        title: '多边形',
        setters: 'ArraySetter'
      },
      {
        name: 'polygon',
        title: '多边形(支付宝)',
        setters: 'ArraySetter'
      },
      {
        name: 'enable-indoorMap',
        title: '是否展示室内地图',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      'markertap',
      'labeltap',
      'callouttap',
      'controltap',
      'regionchange',
      'tap',
      'updated',
      'anchorpointtap',
      'poitap'
    ],
    snippet: {
      props: {
        style: {
          width: '100%',
          height: '300px'
        },
        latitude: '39.909',
        longitude: '116.39742',
        markers: [
          {
            latitude: 39.909,
            longitude: 116.39742
          },
          {
            latitude: 39.9,
            longitude: 116.39
          }
        ]
      }
    },
    package: '@dcloudio/uni-h5'
  },
  Canvas: {
    name: 'Canvas',
    label: '画布',
    categoryId: 'media',
    props: [
      {
        name: 'type',
        title: '指定 canvas 类型，支持 2d (2.9.0) 和 webgl',
        defaultValue: '',
        setters: 'SelectSetter',
        options: ['2d', 'webgl']
      },
      {
        name: 'canvas-id',
        title: 'canvas 组件的唯一标识符',
        setters: 'StringSetter'
      },
      {
        name: 'disable-scroll',
        title:
          '当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'hidpi',
        title: '是否启用高清处理',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      'touchstart',
      'touchmove',
      'touchend',
      'touchcancel',
      'longtap',
      'error'
    ],
    snippet: {
      props: {
        style: {
          width: '300px',
          height: '200px'
        },
        'canvas-id': 'firstCanvas',
        id: 'firstCanvas'
      }
    },
    package: '@dcloudio/uni-h5'
  },
  WebView: {
    name: 'WebView',
    label: '浏览器组件',
    categoryId: 'media',
    props: [
      {
        name: 'src',
        title: 'webview 指向网页的链接',
        setters: 'StringSetter'
      },
      {
        name: 'allow',
        title: '用于为 iframe 指定其特征策略',
        setters: 'StringSetter'
      },
      {
        name: 'sandbox',
        title: '该属性对呈现在 iframe 框架中的内容启用一些额外的限制条件',
        setters: 'StringSetter'
      },
      {
        name: 'fullscreen',
        title: '是否铺满整个页面',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'webview-styles',
        title: 'webview 的样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'update-title',
        title: '是否自动更新当前页面标题',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: ['message', 'onPostMessage', 'load', 'error'],
    snippet: {
      props: {
        'webview-styles': {
          progress: {
            color: '#FF3333'
          }
        },
        src: 'https://uniapp.dcloud.io/static/web-view.html'
      }
    },
    package: '@dcloudio/uni-h5'
  }
};
