export const materials = {
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
        is: 'div'
      }
    }
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
    }
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
    package: 'uni-h5'
  },
  Button: {
    name: 'Button',
    label: '按钮',
    categoryId: 'form',
    props: [
      {
        name: 'type',
        label: 'type'
      }
    ],
    snippet: {
      children: 'Button'
    },
    package: 'uni-h5'
  },
  VanButton: {
    name: 'VanButton',
    alias: 'Button',
    label: '按钮',
    categoryId: 'base',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/button',
    props: [
      {
        name: 'type',
        title: '类型，可选值为 primary success warning danger',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['primary', 'success', 'warning', 'danger', 'default']
      },
      {
        name: 'size',
        title: '尺寸，可选值为 large small mini',
        defaultValue: 'normal',
        setters: 'SelectSetter',
        options: ['large', 'small', 'mini', 'normal']
      },
      {
        name: 'text',
        title: '按钮文字',
        setters: 'StringSetter'
      },
      {
        name: 'color',
        title: '按钮颜色，支持传入 linear-gradient 渐变色',
        setters: 'StringSetter'
      },
      {
        name: 'icon',
        title: '左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
        setters: 'StringSetter'
      },
      {
        name: 'icon-position',
        title: '图标展示位置，可选值为 right',
        setters: 'SelectSetter',
        defaultValue: 'left',
        options: ['right', 'left']
      },
      {
        name: 'tag',
        title: '按钮根节点的 HTML 标签',
        defaultValue: 'button',
        setters: 'StringSetter'
      },
      {
        name: 'native-type',
        title: '原生 button 标签的 type 属性',
        defaultValue: 'button',
        setters: 'StringSetter'
      },
      {
        name: 'block',
        title: '是否为块级元素',
        setters: 'BooleanSetter'
      },
      {
        name: 'plain',
        title: '是否为朴素按钮',
        setters: 'BooleanSetter'
      },
      {
        name: 'square',
        title: '是否为方形按钮',
        setters: 'BooleanSetter'
      },
      {
        name: 'round',
        title: '是否为圆形按钮',
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用按钮',
        setters: 'BooleanSetter'
      },
      {
        name: 'hairline',
        title: '是否使用 0.5px 边框',
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        title: '是否显示为加载状态',
        setters: 'BooleanSetter'
      },
      {
        name: 'loading-text',
        title: '加载状态提示文字',
        setters: 'StringSetter'
      },
      {
        name: 'loading-type',
        title: '加载图标类型',
        setters: 'SelectSetter',
        defaultValue: 'circular',
        options: ['spinner', 'circular']
      },
      {
        name: 'loading-size',
        title: '加载图标大小，默认单位为 px',
        defaultValue: '20px',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'url',
        title: '点击后跳转的链接地址',
        setters: 'StringSetter'
      },
      {
        name: 'to',
        title: '点击后跳转的目标路由对象，等同于 Vue Router 的 to 属性',
        setters: 'StringSetter'
      },
      {
        name: 'replace',
        title: '是否在跳转时替换当前页面历史',
        setters: 'BooleanSetter'
      }
    ],
    events: ['click', 'touchstart'],
    slots: ['default', 'icon', 'loading'],
    snippet: {
      children: '按钮'
    },
    package: 'vant'
  },
  VanCell: {
    name: 'VanCell',
    alias: 'Cell',
    label: '单元格',
    categoryId: 'base',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/cell',
    props: [
      {
        name: 'title',
        title: '左侧标题',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'value',
        title: '右侧标题',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'label',
        title: '标题下方的描述信息',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'size',
        title: '单元格大小，可选值为 large normal',
        setters: 'SelectSetter',
        options: ['large', 'normal']
      },
      {
        name: 'icon',
        title: '左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
        defaultValue: 'van-icon',
        setters: 'StringSetter'
      },
      {
        name: 'tag',
        title: '根节点对应的 HTML 标签名',
        defaultValue: 'div',
        setters: 'StringSetter'
      },
      {
        name: 'url',
        title: '点击后跳转的链接地址',
        setters: 'StringSetter'
      },
      {
        name: 'to',
        title: '点击后跳转的目标路由对象，等同于 Vue Router 的 to 属性',
        setters: ['StringSetter', 'ObjectSetter']
      },
      {
        name: 'border',
        title: '是否显示内边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'replace',
        title: '是否在跳转时替换当前页面历史',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'clickable',
        title: '是否开启点击反馈',
        defaultValue: null,
        setters: 'BooleanSetter'
      },
      {
        name: 'is-link',
        title: '是否展示右侧箭头并开启点击反馈',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'required',
        title: '是否显示表单必填星号',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'center',
        title: '是否使内容垂直居中',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'arrow-direction',
        title: '箭头方向，可选值为 left up down',
        defaultValue: 'right',
        setters: 'SelectSetter',
        options: ['left', 'right', 'up', 'down']
      },
      {
        name: 'title-style',
        title: '左侧标题额外样式',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'title-class',
        title: '左侧标题额外类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'value-class',
        title: '右侧内容额外类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'label-class',
        title: '描述信息额外类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      }
    ],
    events: ['click'],
    slots: ['title', 'value', 'label', 'icon', 'right-icon', 'extra'],
    snippet: {
      props: {
        title: '单元格',
        value: '内容'
      }
    },
    package: 'vant'
  },
  VanCellGroup: {
    name: 'VanCellGroup',
    alias: 'CellGroup',
    label: '单元格组',
    categoryId: 'base',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/cell',
    props: [
      {
        name: 'title',
        title: '分组标题',
        setters: 'StringSetter'
      },
      {
        name: 'inset',
        title: '是否展示为圆角卡片风格',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'border',
        title: '是否显示外边框',
        setters: 'BooleanSetter',
        defaultValue: true
      }
    ],
    slots: ['default', 'title'],
    snippet: {
      children: [
        {
          name: 'VanCell',
          props: {
            title: '单元格',
            value: '内容'
          }
        },
        {
          name: 'VanCell',
          props: {
            title: '单元格',
            value: '内容',
            label: '描述信息'
          }
        }
      ]
    },
    package: 'vant'
  },
  VanIcon: {
    name: 'VanIcon',
    alias: 'Icon',
    label: '图标',
    categoryId: 'base',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/icon',
    props: [
      {
        name: 'name',
        title: '图标名称或图片链接',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'dot',
        title: '是否显示图标右上角小红点',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'badge',
        title: '图标右上角徽标的内容',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'badge-props',
        title: '自定义徽标的属性，传入的对象会被透传给 Badge 组件的 props',
        setters: 'ObjectSetter'
      },
      {
        name: 'color',
        title: '图标颜色',
        defaultValue: 'inherit',
        setters: 'StringSetter'
      },
      {
        name: 'size',
        title: '图标大小，如 20px 2em，默认单位为 px',
        defaultValue: 'inherit',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'class-prefix',
        title: '类名前缀，用于使用自定义图标',
        defaultValue: 'van-icon',
        setters: 'StringSetter'
      },
      {
        name: 'tag',
        title: '根节点对应的 HTML 标签名',
        defaultValue: 'i',
        setters: 'StringSetter'
      }
    ],
    events: ['click'],
    snippet: {
      props: {
        name: 'https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png',
        size: 30
      }
    },
    package: 'vant'
  },
  VanImage: {
    name: 'VanImage',
    alias: 'Image',
    label: '图片',
    categoryId: 'base',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/image',
    props: [
      {
        name: 'src',
        title: '图片链接',
        setters: 'StringSetter'
      },
      {
        name: 'fit',
        title: '图片填充模式，等同于原生的 object-fit 属性',
        defaultValue: 'fill',
        setters: 'StringSetter'
      },
      {
        name: 'position',
        title: '图片位置，等同于原生的 object-position 属性',
        defaultValue: 'center',
        setters: ['SelectSetter', 'StringSetter'],
        options: ['top', 'right', 'bottom', 'left', 'center']
      },
      {
        name: 'alt',
        title: '替代文本',
        setters: 'StringSetter'
      },
      {
        name: 'width',
        title: '宽度，默认单位为 px',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'height',
        title: '高度，默认单位为 px',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'radius',
        title: '圆角大小，默认单位为 px',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'round',
        title: '是否显示为圆形',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'block',
        title: '是否将根节点设置为块级元素，默认情况下为 inline-block 元素',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-error',
        title: '是否展示图片加载失败提示',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-loading',
        title: '是否展示图片加载中提示',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'error-icon',
        title: '失败时提示的图标名称或图片链接，等同于 Icon 组件的 name 属性',
        defaultValue: 'photo-fail',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'loading-icon',
        title: '加载时提示的图标名称或图片链接，等同于 Icon 组件的 name 属性',
        defaultValue: 'photo',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'icon-size',
        title: '加载图标和失败图标的大小',
        defaultValue: 32,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
        defaultValue: 'van-icon',
        setters: 'StringSetter'
      },
      {
        name: 'crossorigin',
        title: '等同于原生的 crossorigin 属性',
        setters: 'StringSetter'
      },
      {
        name: 'referrerpolicy',
        title: '等同于原生的 referrerpolicy 属性',
        setters: 'StringSetter'
      }
    ],
    events: ['click', 'load', 'error'],
    slots: ['default', 'loading', 'error'],
    snippet: {
      props: {
        width: '10rem',
        height: '10rem',
        fit: 'contain',
        src: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
      }
    },
    package: 'vant'
  },
  VanRow: {
    name: 'VanRow',
    alias: 'Row',
    label: '布局行',
    categoryId: 'base',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/col',
    props: [
      {
        name: 'gutter',
        title: '列元素之间的间距(单位为 px)',
        setters: ['NumberSetter', 'StringSetter', 'ArraySetter']
      },
      {
        name: 'tag',
        title: '自定义元素标签',
        defaultValue: 'div',
        setters: 'StringSetter'
      },
      {
        name: 'justify',
        title: '主轴对齐方式',
        defaultValue: 'start',
        setters: 'SelectSetter',
        options: ['start', 'end', 'center', 'space-around', 'space-between']
      },
      {
        name: 'align',
        title: '交叉轴对齐方式',
        defaultValue: 'top',
        setters: 'SelectSetter',
        options: ['top', 'center', 'bottom']
      },
      {
        name: 'wrap',
        title: '是否自动换行',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: ['click'],
    snippet: {
      children: [
        {
          name: 'VanCol',
          children: 'span:8',
          props: {
            span: '8'
          }
        },
        {
          name: 'VanCol',
          children: 'span:8',
          props: {
            span: '8'
          }
        }
      ]
    },
    package: 'vant'
  },
  VanCol: {
    name: 'VanCol',
    alias: 'Col',
    label: '布局列',
    categoryId: 'base',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/col',
    props: [
      {
        name: 'span',
        title: '列元素宽度',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'offset',
        title: '列元素偏移距离',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'tag',
        title: '自定义元素标签',
        defaultValue: 'div',
        setters: 'StringSetter'
      }
    ],
    events: ['click'],
    snippet: {
      name: 'VanCol',
      children: 'span:8',
      props: {
        span: '8'
      }
    },
    package: 'vant'
  },
  VanPopup: {
    name: 'VanPopup',
    alias: 'Popup',
    label: '弹出层',
    categoryId: 'base',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/popup',
    props: [
      {
        name: 'show',
        title: '是否显示弹出层',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'overlay',
        title: '是否显示遮罩层',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'position',
        title: '弹出位置，可选值为 top bottom right left',
        defaultValue: 'center',
        setters: 'SelectSetter',
        options: ['top', 'bottom', 'right', 'left', 'center']
      },
      {
        name: 'overlay-class',
        title: '自定义遮罩层类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'overlay-style',
        title: '自定义遮罩层样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'duration',
        title: '动画时长，单位秒，设置为 0 可以禁用动画',
        defaultValue: 0.3,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'z-index',
        title: '将弹窗的 z-index 层级设置为一个固定值',
        defaultValue: 2000,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'round',
        title: '是否显示圆角',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'lock-scroll',
        title: '是否锁定背景滚动',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy-render',
        title: '是否在显示弹层时才渲染节点',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-popstate',
        title: '是否在页面回退时自动关闭',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-overlay',
        title: '是否在点击遮罩层后关闭',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'closeable',
        title: '是否显示关闭图标',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-icon',
        title: '关闭图标名称或图片链接，等同于 Icon 组件的 name 属性',
        defaultValue: 'cross',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'close-icon-position',
        title: '关闭图标位置，可选值为 top-left bottom-left bottom-right',
        defaultValue: 'top-right',
        setters: 'SelectSetter',
        options: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
      },
      {
        name: 'before-close',
        title: '关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise',
        setters: 'FunctionSetter'
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
        defaultValue: 'van-icon',
        setters: 'StringSetter'
      },
      {
        name: 'transition',
        title: '动画类名，等价于 transition 的 name 属性',
        setters: 'StringSetter'
      },
      {
        name: 'transition-appear',
        title: '是否在初始渲染时启用过渡动画',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'teleport',
        title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
        setters: ['StringSetter', 'ExpressionSetter']
      },
      {
        name: 'safe-area-inset-top',
        title: '是否开启顶部安全区适配',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'safe-area-inset-bottom',
        title: '是否开启底部安全区适配',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      'update:show',
      'click',
      'click-overlay',
      'click-close-icon',
      'open',
      'close',
      'opened',
      'closed'
    ],
    slots: ['default', 'overlay-content'],
    snippet: {
      props: {
        position: 'right',
        show: true,
        style: {
          width: '30%',
          height: '100%'
        }
      },
      children: '内容'
    },
    package: 'vant'
  },
  VanSpace: {
    name: 'VanSpace',
    alias: 'Space',
    label: '间距',
    categoryId: 'base',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/space',
    props: [
      {
        name: 'direction',
        title: '间距方向',
        defaultValue: 'horizontal',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal']
      },
      {
        name: 'size',
        title:
          '间距大小，如 20px 2em，默认单位为 px，支持数组形式来分别设置横向和纵向间距',
        defaultValue: '8px',
        setters: ['NumberSetter', 'StringSetter', 'ArraySetter']
      },
      {
        name: 'align',
        title: '设置子元素的对齐方式',
        setters: 'SelectSetter',
        options: ['start', 'end', 'center', 'baseline']
      },
      {
        name: 'wrap',
        title: '是否自动换行，仅适用于水平方向排列',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'fill',
        title: '是否让 Space 变为一个块级元素，填充整个父元素',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {},
      children: [
        {
          name: 'VanButton',
          props: {
            type: 'primary'
          },
          children: '按钮'
        },
        {
          name: 'VanButton',
          props: {
            type: 'primary'
          },
          children: '按钮'
        },
        {
          name: 'VanButton',
          props: {
            type: 'primary',
            style: {
              padding: '30px'
            }
          },
          children: '按钮'
        }
      ]
    },
    package: 'vant'
  },
  VanToast: {
    name: 'VanToast',
    alias: 'Toast',
    label: '轻提示',
    categoryId: 'base',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/toast',
    props: [
      {
        name: 'show',
        title: '是否显示',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'type',
        title: '提示类型',
        defaultValue: 'text',
        setters: 'SelectSetter',
        options: ['loading', 'success', 'fail', 'html', 'text']
      },
      {
        name: 'position',
        title: '位置',
        defaultValue: 'middle',
        setters: 'SelectSetter',
        options: ['top', 'middle', 'bottom']
      },
      {
        name: 'message',
        title: '文本内容，支持通过\n换行',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'word-break',
        title: '文本内容的换行方式',
        defaultValue: 'break-all',
        setters: '',
        options: ['normal', 'break-all', 'break-word']
      },
      {
        name: 'icon',
        title:
          '自定义图标，支持传入图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'icon-size',
        title: '图标大小，如 20px 2em，默认单位为 px',
        defaultValue: '36px',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
        defaultValue: 'van-icon',
        setters: 'StringSetter'
      },
      {
        name: 'overlay',
        title: '是否显示背景遮罩层',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'forbid-click',
        title: '是否禁止背景点击',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click',
        title: '是否在点击后关闭',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-overlay',
        title: '是否在点击遮罩层后关闭',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading-type',
        title: '加载图标类型, 可选值为 spinner',
        defaultValue: 'circular',
        setters: 'SelectSetter',
        options: ['circular', 'spinner']
      },
      {
        name: 'duration',
        title: '展示时长(ms)，值为 0 时，toast 不会消失',
        defaultValue: 2000,
        setters: 'NumberSetter'
      },
      {
        name: 'class-name',
        title: '自定义类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'overlay-class',
        title: '自定义遮罩层类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'overlay-style',
        title: '自定义遮罩层样式',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'transition',
        title: '动画类名，等价于 transition 的name属性',
        defaultValue: 'van-fade',
        setters: 'StringSetter'
      },
      {
        name: 'teleport',
        title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
        defaultValue: 'body',
        setters: ['StringSetter', 'ExpressionSetter']
      },
      {
        name: 'z-index',
        title: '将组件的 z-index 层级设置为一个固定值',
        defaultValue: '2000',
        setters: ['StringSetter', 'NumberSetter']
      }
    ],
    events: ['close', 'opened', 'update:show'],
    slots: ['message'],
    snippet: {
      props: {
        show: true
      },
      children: [
        {
          name: 'VanImage',
          slot: 'message',
          props: {
            src: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
            style: {
              height: '100px',
              width: '100px'
            }
          }
        }
      ]
    },
    package: 'vant'
  },
  VanCalendar: {
    name: 'VanCalendar',
    alias: 'Calendar',
    label: '日历',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/calendar',
    props: [
      {
        name: 'type',
        title: '选择类型',
        defaultValue: 'single',
        setters: 'SelectSetter',
        options: ['single', 'multiple', 'range']
      },
      {
        name: 'switch-mode',
        title: '切换模式',
        defaultValue: 'none',
        setters: 'SelectSetter',
        options: ['none', 'month', 'year-month']
      },
      {
        name: 'title',
        title: '日历标题',
        defaultValue: '日期选择',
        setters: 'StringSetter'
      },
      {
        name: 'color',
        title: '主题色，对底部按钮和选中日期生效',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'min-date',
        title: '可选择的最小日期',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'max-date',
        title: '可选择的最大日期',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'default-date',
        title:
          '默认选中的日期，type 为 multiple 或 range 时为数组，传入 null 表示默认不选择',
        setters: ['ExpressionSetter', 'ArraySetter', 'StringSetter']
      },
      {
        name: 'row-height',
        title: '日期行高',
        defaultValue: 64,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'formatter',
        title: '日期格式化函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'poppable',
        title: '是否以弹层的形式展示日历',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy-render',
        title: '是否只渲染可视区域的内容',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-mark',
        title: '是否显示月份背景水印',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-title',
        title: '是否展示日历标题',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-subtitle',
        title: '是否展示日历副标题（年月）',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-confirm',
        title: '是否展示确认按钮',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'readonly',
        title: '是否为只读状态，只读状态下不能选择日期',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'confirmText',
        title: '确认按钮的文字',
        defaultValue: '确定',
        setters: 'StringSetter'
      },
      {
        name: 'confirm-disabled-text',
        title: '确认按钮处于禁用状态时的文字',
        defaultValue: '确定',
        setters: 'StringSetter'
      },
      {
        name: 'first-day-of-week',
        title: '设置周起始日',
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
          },
          {
            label: '3',
            value: 3
          },
          {
            label: '4',
            value: 4
          },
          {
            label: '5',
            value: 5
          },
          {
            label: '6',
            value: 6
          }
        ]
      },
      {
        name: 'show',
        title: '是否显示日历弹窗',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'position',
        title: '弹出位置',
        defaultValue: 'bottom',
        setters: 'SelectSetter',
        options: ['top', 'bottom', 'right', 'left']
      },
      {
        name: 'round',
        title: '是否显示圆角弹窗',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-popstate',
        title: '是否在页面回退时自动关闭',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-overlay',
        title: '是否在点击遮罩层后关闭',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'safe-area-inset-top',
        title: '是否开启顶部安全区适配',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'safe-area-inset-bottom',
        title: '是否开启顶部安全区适配',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'teleport',
        title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
        setters: ['StringSetter', 'ExpressionSetter']
      },
      {
        name: 'max-range',
        title: '日期区间最多可选天数',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'range-prompt',
        title: '范围选择超过最多可选天数时的提示文案',
        defaultValue: '\t最多选择 xx 天',
        setters: 'StringSetter'
      },
      {
        name: 'show-range-prompt',
        title: '范围选择超过最多可选天数时，是否展示提示文案',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'allow-same-day',
        title: '是否允许日期范围的起止时间为同一天',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      'update:show',
      'select',
      'confirm',
      'open',
      'close',
      'opened',
      'closed',
      'unselect',
      'month-show',
      'over-range',
      'click-subtitle',
      'click-disabled-date',
      'panel-change'
    ],
    slots: [
      'title',
      'subtitle',
      'month-title',
      'footer',
      'confirm-text',
      'top-info',
      'bottom-info',
      'prev-month',
      'prev-year',
      'next-month',
      'next-year'
    ],
    snippet: {
      props: {
        show: true,
        switchMode: 'month'
      }
    },
    package: 'vant'
  },
  VanCascader: {
    name: 'VanCascader',
    alias: 'Cascader',
    label: '级联选择',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/cascader',
    props: [
      {
        name: 'modelValue',
        title: '选中项的值',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'title',
        title: '顶部标题',
        setters: 'StringSetter'
      },
      {
        name: 'options',
        title: '可选项数据源',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'placeholder',
        title: '未选中时的提示文案',
        defaultValue: '请选择',
        setters: 'StringSetter'
      },
      {
        name: 'active-color',
        title: '选中状态的高亮颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'swipeable',
        title: '是否开启手势左右滑动切换',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'closeable',
        title: '是否显示关闭图标',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-header',
        title: '是否展示标题栏',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-icon',
        title: '关闭图标名称或图片链接，等同于 Icon 组件的 name 属性',
        defaultValue: 'cross',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'field-names',
        title: '自定义 options 结构中的字段',
        defaultValue: {
          text: 'text',
          value: 'value',
          children: 'children'
        },
        setters: 'ObjectSetter'
      }
    ],
    events: ['update:modelValue', 'change', 'finish', 'close', 'click-tab'],
    slots: ['title', 'option', 'options-top', 'options-bottom'],
    snippet: {
      props: {
        modelValue: '',
        title: '请选择所在地区',
        options: [
          {
            text: '浙江省',
            value: '330000',
            children: [
              {
                text: '杭州市',
                value: '330100'
              }
            ]
          },
          {
            text: '江苏省',
            value: '320000',
            children: [
              {
                text: '南京市',
                value: '320100'
              }
            ]
          }
        ]
      }
    },
    package: 'vant'
  },
  VanCheckbox: {
    name: 'VanCheckbox',
    alias: 'Checkbox',
    label: '复选框',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/checkbox',
    props: [
      {
        name: 'modelValue',
        title: '是否为选中状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'name',
        title: '标识符，通常为一个唯一的字符串或数字',
        setters: 'ExpressionSetter'
      },
      {
        name: 'shape',
        title: '形状，可选值为 square',
        defaultValue: 'round',
        setters: 'SelectSetter',
        options: ['round', 'square']
      },
      {
        name: 'disabled',
        title: '是否禁用复选框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'label-disabled',
        title: '是否禁用复选框文本点击',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'label-position',
        title: '文本位置，可选值为 left',
        defaultValue: 'right',
        setters: 'SelectSetter',
        options: ['left', 'right']
      },
      {
        name: 'icon-size',
        title: '图标大小，默认单位为 px',
        defaultValue: '20px',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'checked-color',
        title: '选中状态颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'bind-group',
        title: '是否与复选框组绑定',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'indeterminate',
        title: '是否为不确定状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['update:modelValue', 'change', 'click'],
    slots: ['default', 'icon'],
    snippet: {
      children: '复选框'
    },
    package: 'vant'
  },
  VanCheckboxGroup: {
    name: 'VanCheckboxGroup',
    alias: 'CheckboxGroup',
    label: '复选框组',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/checkbox',
    props: [
      {
        name: 'modelValue',
        title: '所有选中项的标识符',
        setters: 'ArraySetter'
      },
      {
        name: 'disabled',
        title: '是否禁用所有复选框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'max',
        title: '最大可选数，0 为无限制',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'direction',
        title: '排列方向，可选值为 horizontal',
        defaultValue: 'vertical',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal']
      },
      {
        name: 'icon-size',
        title: '所有复选框的图标大小，默认单位为 px',
        defaultValue: '20px',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'checked-color',
        title: '所有复选框的选中状态颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'shape',
        title: '形状，可选值为 square',
        defaultValue: 'round',
        setters: 'SelectSetter',
        options: ['round', 'square']
      }
    ],
    events: ['update:modelValue', 'change'],
    slots: ['default', 'toggleAll'],
    snippet: {
      props: {
        modelValue: ['a', 'b']
      },
      children: [
        {
          name: 'VanCheckbox',
          props: {
            name: 'a'
          },
          children: '复选框 a'
        },
        {
          name: 'VanCheckbox',
          props: {
            name: 'b'
          },
          children: '复选框 b'
        }
      ]
    },
    package: 'vant'
  },
  VanDatePicker: {
    name: 'VanDatePicker',
    alias: 'DatePicker',
    label: '日期选择',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/date-picker',
    props: [
      {
        name: 'modelValue',
        title: '当前选中的日期',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'columns-type',
        title: '选项类型，由 year、month 和 day 组成的数组',
        defaultValue: ['year', 'month', 'day'],
        setters: 'ArraySetter'
      },
      {
        name: 'min-date',
        title: '可选的最小时间，精确到日',
        setters: 'ExpressionSetter'
      },
      {
        name: 'max-date',
        title: '可选的最大时间，精确到日',
        setters: 'ExpressionSetter'
      },
      {
        name: 'title',
        title: '顶部栏标题',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'confirm-button-text',
        title: '确认按钮文字',
        defaultValue: '确认',
        setters: 'StringSetter'
      },
      {
        name: 'cancel-button-text',
        title: '取消按钮文字',
        defaultValue: '取消',
        setters: 'StringSetter'
      },
      {
        name: 'show-toolbar',
        title: '是否显示顶部栏',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        title: '是否显示加载状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'readonly',
        title: '是否为只读状态，只读状态下无法切换选项',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'filter',
        title: '选项过滤函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'formatter',
        title: '选项格式化函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'option-height',
        title: '选项高度，支持 px vw vh rem 单位，默认 px',
        defaultValue: 44,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'visible-option-num',
        title: '可见的选项个数',
        defaultValue: 6,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'swipe-duration',
        title: '快速滑动时惯性滚动的时长，单位 ms',
        defaultValue: 1000,
        setters: ['NumberSetter', 'StringSetter']
      }
    ],
    events: [
      {
        name: 'update:modelValue'
      },
      {
        name: 'confirm',
        params: ['data']
      },
      {
        name: 'cancel',
        params: ['data']
      },
      {
        name: 'change',
        params: ['data']
      }
    ],
    slots: [
      'toolbar',
      'title',
      'confirm',
      'cancel',
      'option',
      'columns-top',
      'columns-bottom'
    ],
    snippet: {
      props: {
        modelValue: []
      }
    },
    package: 'vant'
  },
  VanField: {
    name: 'VanField',
    alias: 'Field',
    label: '输入框',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/field',
    props: [
      {
        name: 'modelValue',
        title: '当前输入的值',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'label',
        title: '输入框左侧文本',
        setters: 'StringSetter'
      },
      {
        name: 'name',
        title: '名称，作为提交表单时的标识符',
        setters: 'StringSetter'
      },
      {
        name: 'id',
        title: '输入框 id，同时会设置 label 的 for 属性',
        defaultValue: 'van-field-n-input',
        setters: 'StringSetter'
      },
      {
        name: 'type',
        title:
          '输入框类型, 支持原生 input 标签的所有 type 属性，额外支持了 digit 类型',
        defaultValue: 'text',
        setters: 'StringSetter'
      },
      {
        name: 'size',
        title: '大小，可选值为 large normal',
        setters: 'SelectSetter',
        options: ['large', 'normal']
      },
      {
        name: 'maxlength',
        title: '输入的最大字符数',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'placeholder',
        title: '输入框占位提示文字',
        setters: 'StringSetter'
      },
      {
        name: 'border',
        title: '是否显示内边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用输入框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'readonly',
        title: '是否为只读状态，只读状态下无法输入内容',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'colon',
        title: '是否在 label 后面添加冒号',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'required',
        title: '是否显示表单必填星号',
        defaultValue: null,
        setters: ['BooleanSetter', 'StringSetter']
      },
      {
        name: 'center',
        title: '是否使内容垂直居中',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'clearable',
        title: '是否启用清除图标，点击清除图标后会清空输入框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'clear-icon',
        title: '清除图标名称或图片链接，等同于 Icon 组件的 name 属性',
        defaultValue: 'clear',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'clear-trigger',
        title:
          '显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示',
        defaultValue: 'focus',
        setters: 'SelectSetter',
        options: ['focus', 'always']
      },
      {
        name: 'clickable',
        title: '是否开启点击反馈',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'is-link',
        title: '是否展示右侧箭头并开启点击反馈',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'autofocus',
        title: '是否自动聚焦，iOS 系统不支持该属性',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-word-limit',
        title: '是否显示字数统计，需要设置 maxlength 属性',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'error',
        title: '是否将输入内容标红',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'error-message',
        title: '底部错误提示文案，为空时不展示',
        setters: 'StringSetter'
      },
      {
        name: 'error-message-align',
        title: '错误提示文案对齐方式，可选值为 center right',
        defaultValue: 'left',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right']
      },
      {
        name: 'formatter',
        title: '输入内容格式化函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'format-trigger',
        title: '格式化函数触发的时机，可选值为 onBlur',
        defaultValue: 'onChange',
        setters: 'SelectSetter',
        options: ['onChange', 'onBlur']
      },
      {
        name: 'arrow-direction',
        title: '箭头方向，可选值为 left up down',
        defaultValue: 'right',
        setters: 'SelectSetter',
        options: ['left', 'right', 'up', 'down']
      },
      {
        name: 'label-class',
        title: '左侧文本额外类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'label-width',
        title: '左侧文本宽度，默认单位为 px',
        defaultValue: '6.2em',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'label-align',
        title: '左侧文本对齐方式，可选值为 center right top',
        defaultValue: 'left',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right', 'top']
      },
      {
        name: 'input-align',
        title: '输入框对齐方式，可选值为 center right',
        defaultValue: 'left',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right']
      },
      {
        name: 'autosize',
        title:
          '\t是否自适应内容高度，只对 textarea 有效，可传入对象,如 { maxHeight: 100, minHeight: 50 }，单位为px',
        defaultValue: false,
        setters: ['BooleanSetter', 'ObjectSetter']
      },
      {
        name: 'rows',
        title: '输入框行数，仅 type 为 textarea 时有效',
        defaultValue: '2',
        setters: 'StringSetter'
      },
      {
        name: 'left-icon',
        title: '左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'right-icon',
        title: '右侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
        defaultValue: 'van-icon',
        setters: 'StringSetter'
      },
      {
        name: 'rules',
        title: '表单校验规则，详见 Form 组件',
        setters: 'ArraySetter'
      },
      {
        name: 'autocomplete',
        title: 'HTML 原生属性，用于控制自动完成功能，详见 MDN - autocomplete',
        setters: 'StringSetter'
      },
      {
        name: 'autocapitalize',
        title:
          'HTML 原生属性，用于控制文本输入时是否自动大写，此 API 仅在部分浏览器支持，详见 MDN - autocapitalize',
        setters: 'StringSetter'
      },
      {
        name: 'enterkeyhint',
        title:
          'HTML 原生属性，用于控制回车键样式，此 API 仅在部分浏览器支持，详见 MDN - enterkeyhint',
        setters: 'StringSetter'
      },
      {
        name: 'spellcheck ',
        title:
          'HTML 原生属性，用于检查元素的拼写错误，此 API 仅在部分浏览器支持，详见 MDN - spellcheck',
        setters: 'BooleanSetter'
      },
      {
        name: 'autocorrect ',
        title: '仅 Safari 适用，用于自动更正输入的文本，详见 MDN - autocorrect',
        setters: 'StringSetter'
      }
    ],
    events: [
      'update:modelValue',
      'focus',
      'blur',
      'clear',
      'click',
      'click-input',
      'click-left-icon',
      'click-right-icon',
      'start-validate',
      'end-validate'
    ],
    slots: [
      'default',
      'label',
      'input',
      'left-icon',
      'right-icon',
      'button',
      'error-message',
      'extra'
    ],
    snippet: {
      props: {
        label: '文本',
        placeholder: '请输入用户名'
      }
    },
    package: 'vant'
  },
  VanForm: {
    name: 'VanForm',
    alias: 'Form',
    label: '表单',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/form',
    props: [
      {
        name: 'label-width',
        title: '表单项 label 宽度，默认单位为px',
        defaultValue: '6.2em',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'label-align',
        title: '表单项 label 对齐方式，可选值为 center right top',
        defaultValue: 'left',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right', 'top']
      },
      {
        name: 'input-align',
        title: '输入框对齐方式，可选值为 center right',
        defaultValue: 'left',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right']
      },
      {
        name: 'error-message-align',
        title: '错误提示文案对齐方式，可选值为 center right',
        defaultValue: 'left',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right']
      },
      {
        name: 'validate-trigger',
        title:
          '表单校验触发时机，可选值为 onChange、onSubmit 支持通过数组同时设置多个值',
        defaultValue: 'onBlur',
        setters: ['StringSetter', 'ArraySetter']
      },
      {
        name: 'colon',
        title: '是否在 label 后面添加冒号',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用表单中的所有输入框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'readonly',
        title: '是否将表单中的所有输入框设置为只读状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'required',
        title: '是否显示表单必填星号',
        defaultValue: null,
        setters: ['BooleanSetter', 'StringSetter']
      },
      {
        name: 'validate-first',
        title: '是否在某一项校验不通过时停止校验',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scroll-to-error',
        title: '是否在提交表单且校验不通过时滚动至错误的表单项',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scroll-to-error-position',
        title:
          '滚动至错误的表单项时的位置，可选值为 center | end | nearest | start',
        setters: 'SelectSetter',
        options: ['center', 'end', 'nearest', 'start']
      },
      {
        name: 'show-error',
        title: '是否在校验不通过时标红输入框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-error-message',
        title: '是否在校验不通过时在输入框下方展示错误提示',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'submit-on-enter',
        title: '是否在按下回车键时提交表单',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: ['submit', 'failed'],
    slots: ['default'],
    snippet: {
      children: [
        {
          name: 'VanCellGroup',
          props: {
            inset: true
          },
          children: [
            {
              name: 'VanField',
              props: {
                modelValue: '用户名',
                name: '用户名',
                label: '用户名',
                placeholder: '用户名'
              }
            },
            {
              name: 'VanField',
              props: {
                modelValue: '密码',
                name: '密码',
                label: '密码',
                placeholder: '密码'
              }
            }
          ]
        }
      ]
    },
    package: 'vant'
  },
  VanNumberKeyboard: {
    name: 'VanNumberKeyboard',
    alias: 'NumberKeyboard',
    label: '数字键盘',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/number-keyboard',
    props: [
      {
        name: 'modelValue',
        title: '当前输入值',
        setters: 'StringSetter'
      },
      {
        name: 'show',
        title: '是否显示键盘',
        setters: 'BooleanSetter'
      },
      {
        name: 'title',
        title: '键盘标题',
        setters: 'StringSetter'
      },
      {
        name: 'theme',
        title: '样式风格，可选值为 custom',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'custom']
      },
      {
        name: 'maxlength',
        title: '输入值最大长度',
        defaultValue: 'Infinity',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'transition',
        title: '是否开启过场动画',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'z-index',
        title: '键盘 z-index 层级',
        defaultValue: '100',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'extra-key',
        title: '底部额外按键的内容',
        defaultValue: '',
        setters: ['StringSetter', 'ArraySetter']
      },
      {
        name: 'close-button-text',
        title: '关闭按钮文字，空则不展示',
        setters: 'StringSetter'
      },
      {
        name: 'delete-button-text',
        title: '删除按钮文字，空则展示删除图标',
        setters: 'StringSetter'
      },
      {
        name: 'close-button-loading',
        title: '是否将关闭按钮设置为加载中状态，仅在 theme="custom" 时有效',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-delete-key',
        title: '是否展示删除图标',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'blur-on-close',
        title: '是否在点击关闭按钮时触发 blur 事件',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'hide-on-click-outside',
        title: '是否在点击外部时收起键盘',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'teleport',
        title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
        setters: ['StringSetter', 'ExpressionSetter']
      },
      {
        name: 'safe-area-inset-bottom',
        title: '是否开启底部安全区适配',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'random-key-order',
        title: '是否将通过随机顺序展示按键',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'input',
        params: ['key']
      },
      {
        name: 'delete',
        params: ['key']
      },
      {
        name: 'close',
        params: ['key']
      },
      {
        name: 'blur',
        params: ['key']
      },
      {
        name: 'show',
        params: ['key']
      },
      {
        name: 'hide',
        params: ['key']
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: ['delete', 'extra-key', 'title-left'],
    snippet: {
      props: {
        show: true
      }
    },
    package: 'vant'
  },
  VanPasswordInput: {
    name: 'VanPasswordInput',
    alias: 'PasswordInput',
    label: '密码输入框',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/password-input',
    props: [
      {
        name: 'value',
        title: '密码值',
        setters: 'StringSetter'
      },
      {
        name: 'info',
        title: '输入框下方文字提示',
        setters: 'StringSetter'
      },
      {
        name: 'error-info',
        title: '输入框下方错误提示',
        setters: 'StringSetter'
      },
      {
        name: 'length',
        title: '密码最大长度',
        defaultValue: 6,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'gutter',
        title: '输入框格子之间的间距，如 20px 2em，默认单位为px',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'mask',
        title: '是否隐藏密码内容',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'focused',
        title: '是否已聚焦，聚焦时会显示光标',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['focus'],
    snippet: {
      props: {
        value: '123456'
      }
    },
    package: 'vant'
  },
  VanPicker: {
    name: 'VanPicker',
    alias: 'Picker',
    label: '选择器',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/picker',
    props: [
      {
        name: 'modelValue',
        title: '当前选中项对应的值',
        setters: 'ArraySetter'
      },
      {
        name: 'columns',
        title: '对象数组，配置每一列显示的数据',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'columns-field-names',
        title: '自定义 columns 结构中的字段',
        defaultValue: {
          text: 'text',
          value: 'value',
          children: 'children'
        },
        setters: 'ObjectSetter'
      },
      {
        name: 'title',
        title: '顶部栏标题',
        setters: 'StringSetter'
      },
      {
        name: 'confirm-button-text',
        title: '确认按钮文字，设置为空字符串可以隐藏按钮',
        defaultValue: '确认',
        setters: 'StringSetter'
      },
      {
        name: 'cancel-button-text',
        title: '取消按钮文字，设置为空字符串可以隐藏按钮',
        defaultValue: '取消',
        setters: 'StringSetter'
      },
      {
        name: 'toolbar-position',
        title: '顶部栏位置，可选值为 bottom',
        defaultValue: 'top',
        setters: 'SelectSetter',
        options: ['top', 'bottom']
      },
      {
        name: 'loading',
        title: '是否显示加载状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'readonly',
        title: '是否为只读状态，只读状态下无法切换选项',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-toolbar',
        title: '是否显示顶部栏',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'allow-html',
        title: '是否允许选项内容中渲染 HTML',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'option-height',
        title: '选项高度，支持 px vw vh rem 单位，默认 px',
        defaultValue: 44,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'visible-option-num',
        title: '可见的选项个数',
        defaultValue: 6,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'swipe-duration',
        title: '快速滑动时惯性滚动的时长，单位 ms',
        defaultValue: 1000,
        setters: ['NumberSetter', 'StringSetter']
      }
    ],
    events: [
      {
        name: 'confirm',
        params: ['data']
      },
      {
        name: 'cancel',
        params: ['data']
      },
      {
        name: 'change',
        params: ['data']
      },
      {
        name: 'click-option',
        params: ['data']
      },
      {
        name: 'scroll-into',
        params: ['data']
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: [
      'toolbar',
      'title',
      'confirm',
      'cancel',
      'option',
      'columns-top',
      'columns-bottom'
    ],
    snippet: {
      props: {
        title: '标题',
        columns: [
          {
            text: '杭州',
            value: 'Hangzhou'
          },
          {
            text: '宁波',
            value: 'Ningbo'
          },
          {
            text: '温州',
            value: 'Wenzhou'
          },
          {
            text: '绍兴',
            value: 'Shaoxing'
          },
          {
            text: '湖州',
            value: 'Huzhou'
          }
        ]
      }
    },
    package: 'vant'
  },
  VanPickerGroup: {
    name: 'VanPickerGroup',
    alias: 'PickerGroup',
    label: '选择器组',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/picker-group',
    props: [
      {
        name: 'active-tab',
        title: '设置当前选中的标签',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'tabs',
        title: '设置标签页的标题',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'title',
        title: '顶部栏标题',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'show-toolbar',
        title: '是否显示顶部栏',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'next-step-text',
        title: '下一步按钮的文字',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'confirm-button-text',
        title: '确认按钮的文字',
        defaultValue: '确认',
        setters: 'StringSetter'
      },
      {
        name: 'cancel-button-text',
        title: '取消按钮的文字',
        defaultValue: '取消',
        setters: 'StringSetter'
      }
    ],
    events: ['confirm', 'cancel', 'update:active-tab'],
    slots: ['default', 'toolbar', 'title', 'confirm', 'cancel'],
    snippet: {
      props: {
        title: '预约日期',
        tabs: ['选择日期', '选择时间']
      },
      children: [
        {
          name: 'VanDatePicker'
        },
        {
          name: 'VanTimePicker'
        }
      ]
    },
    package: 'vant'
  },
  VanRadio: {
    name: 'VanRadio',
    alias: 'Radio',
    label: '单选框',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/radio',
    props: [
      {
        name: 'name',
        title: '标识符，通常为一个唯一的字符串或数字',
        setters: 'ExpressionSetter'
      },
      {
        name: 'shape',
        title: '形状，可选值为 square dot',
        defaultValue: 'round',
        setters: 'SelectSetter',
        options: ['square', 'dot', 'round']
      },
      {
        name: 'disabled',
        title: '是否为禁用状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'label-disabled',
        title: '是否禁用文本内容点击',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'label-position',
        title: '文本位置，可选值为 left',
        defaultValue: 'right',
        setters: 'SelectSetter',
        options: ['left', 'right']
      },
      {
        name: 'icon-size',
        title: '图标大小，默认单位为 px',
        defaultValue: '20px',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'checked-color',
        title: '选中状态颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'click',
        params: ['event']
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'icon'
      }
    ],
    snippet: {
      props: {
        modelValue: 'checked',
        name: 'checked'
      },
      children: '单选框 1'
    },
    package: 'vant'
  },
  VanRadioGroup: {
    name: 'VanRadioGroup',
    alias: 'RadioGroup',
    label: '单选框组',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/radio',
    props: [
      {
        name: 'modelValue',
        title: '当前选中项的标识符',
        setters: 'ExpressionSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用所有单选框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'direction',
        title: '排列方向',
        defaultValue: 'vertical',
        setters: 'SelectSetter',
        options: ['horizontal', 'vertical']
      },
      {
        name: 'icon-size  ',
        title: '所有单选框的图标大小，默认单位为 px',
        defaultValue: '20px',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'checked-color',
        title: '所有单选框的选中状态颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'shape',
        title: '形状',
        defaultValue: 'round',
        setters: 'SelectSetter',
        options: ['square', 'dot']
      }
    ],
    events: [
      {
        name: 'update:modelValue'
      },
      {
        name: 'change',
        params: ['name']
      }
    ],
    snippet: {
      props: {
        modelValue: ['1', '2']
      },
      children: [
        {
          name: 'VanRadio',
          props: {
            name: '1'
          },
          children: '单选框 1'
        },
        {
          name: 'VanRadio',
          props: {
            name: '2'
          },
          children: '单选框 2'
        }
      ]
    },
    package: 'vant'
  },
  VanRate: {
    name: 'VanRate',
    alias: 'Rate',
    label: '评分',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/rate',
    props: [
      {
        name: 'modelValue',
        title: '当前分值',
        setters: 'NumberSetter'
      },
      {
        name: 'count',
        title: '图标总数',
        defaultValue: 5,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'size',
        title: '图标大小，默认单位为px',
        defaultValue: 20,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'gutter',
        title: '图标间距，默认单位为px',
        defaultValue: 4,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'color',
        title: '选中时的颜色',
        defaultValue: '#ee0a24',
        setters: 'StringSetter'
      },
      {
        name: 'void-color',
        title: '未选中时的颜色',
        defaultValue: '#c8c9cc',
        setters: 'StringSetter'
      },
      {
        name: 'disabled-color',
        title: '禁用时的颜色',
        defaultValue: '#c8c9cc',
        setters: 'StringSetter'
      },
      {
        name: 'icon',
        title: '选中时的图标名称或图片链接，等同于 Icon 组件的 name 属性',
        defaultValue: 'start',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'void-icon',
        title: '未选中时的图标名称或图片链接，等同于 Icon 组件的 name 属性',
        defaultValue: 'star-o',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
        defaultValue: 'van-icon',
        setters: 'StringSetter'
      },
      {
        name: 'allow-half',
        title: '是否允许半选',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'clearable',
        title: '是否允许再次点击后清除',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'readonly',
        title: '是否为只读状态，只读状态下无法修改评分',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用评分',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'touchable',
        title: '是否可以通过滑动手势选择评分',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: ['update:modelValue', 'change'],
    snippet: {
      props: {
        modelValue: 3
      }
    },
    package: 'vant'
  },
  VanSearch: {
    name: 'VanSearch',
    alias: 'Search',
    label: '搜索',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/search',
    props: [
      {
        name: 'modelValue',
        title: '当前输入的值',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'label',
        title: '搜索框左侧文本',
        setters: 'StringSetter'
      },
      {
        name: 'name',
        title: '名称，作为提交表单时的标识符',
        setters: 'StringSetter'
      },
      {
        name: 'shape',
        title: '搜索框形状',
        defaultValue: 'square',
        setters: 'SelectSetter',
        options: ['square', 'round']
      },
      {
        name: 'id',
        title: '搜索框 id，同时会设置 label 的 for 属性',
        defaultValue: 'van-search-n-input',
        setters: 'StringSetter'
      },
      {
        name: 'background',
        title: '搜索框外部背景色',
        defaultValue: '\t#f2f2f2',
        setters: 'StringSetter'
      },
      {
        name: 'maxlength',
        title: '输入的最大字符数',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'placeholder',
        title: '占位提示文字',
        setters: 'StringSetter'
      },
      {
        name: 'clearable',
        title: '是否启用清除图标，点击清除图标后会清空输入框',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'clear-icon',
        title: '清除图标名称或图片链接，等同于 Icon 组件的 name 属性',
        defaultValue: 'clear',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'clear-trigger',
        title:
          '显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示',
        defaultValue: 'focus',
        setters: 'SelectSetter',
        options: ['focus', 'always']
      },
      {
        name: 'autofocus',
        title: '是否自动聚焦，iOS 系统不支持该属性',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-action',
        title: '是否在搜索框右侧显示取消按钮',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'action-text',
        title: '取消按钮文字',
        defaultValue: '取消',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用输入框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'readonly',
        title: '是否将输入框设为只读状态，只读状态下无法输入内容',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'error',
        title: '是否将输入内容标红',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'error-message',
        title: '底部错误提示文案，为空时不展示',
        setters: 'StringSetter'
      },
      {
        name: 'formatter',
        title: '输入内容格式化函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'format-trigger',
        title: '格式化函数触发的时机',
        defaultValue: 'onChange',
        setters: 'SelectSetter',
        options: ['onChange', 'onBlur']
      },
      {
        name: 'input-align',
        title: '输入框内容对齐方式',
        defaultValue: 'left',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right']
      },
      {
        name: 'left-icon',
        title: '输入框左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
        defaultValue: 'search',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'right-icon',
        title: '输入框右侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'autocomplete',
        title: 'input 标签原生的自动完成属性',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'search',
        params: ['value']
      },
      {
        name: 'update:modelValue',
        params: ['value']
      },
      {
        name: 'focus',
        params: ['event']
      },
      {
        name: 'blur',
        params: ['event']
      },
      {
        name: 'click-input',
        params: ['event']
      },
      {
        name: 'click-left-icon',
        params: ['event']
      },
      {
        name: 'click-right-icon',
        params: ['event']
      },
      {
        name: 'clear',
        params: ['event']
      },
      {
        name: 'cancel'
      }
    ],
    slots: ['left', 'action', 'label', 'left-icon', 'right-icon'],
    snippet: {
      props: {
        placeholder: '请输入搜索关键词'
      }
    },
    package: 'vant'
  },
  VanSlider: {
    name: 'VanSlider',
    alias: 'Slider',
    label: '滑块',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/slider',
    props: [
      {
        name: 'modelValue',
        title: '当前进度百分比，在双滑块模式下为数组格式',
        defaultValue: 0,
        setters: ['NumberSetter', 'ArraySetter']
      },
      {
        name: 'max',
        title: '最大值',
        defaultValue: 100,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'min',
        title: '最小值',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'step',
        title: '步长',
        defaultValue: 1,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'bar-height',
        title: '进度条高度，默认单位为 px',
        defaultValue: 2,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'button-size',
        title: '滑块按钮大小，默认单位为 px',
        defaultValue: 24,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'active-color',
        title: '进度条激活态颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'inactive-color',
        title: '进度条非激活态颜色',
        defaultValue: '#e5e5e5',
        setters: 'StringSetter'
      },
      {
        name: 'range',
        title: '是否开启双滑块模式',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'reverse',
        title: '是否将进度条反转',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用滑块',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'readonly',
        title: '是否为只读状态，只读状态下无法修改滑块的值',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'vertical',
        title: 'vertical',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'update:modelValue',
        params: ['value']
      },
      {
        name: 'change',
        params: ['value']
      },
      {
        name: 'drag-start',
        params: ['event']
      },
      {
        name: 'drag-end',
        params: ['event']
      }
    ],
    slots: ['button', 'left-button', 'right-button'],
    snippet: {
      props: {
        modelValue: 50
      }
    },
    package: 'vant'
  },
  VanSignature: {
    name: 'VanSignature',
    alias: 'Signature',
    label: '签名',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/signature',
    props: [
      {
        name: 'type',
        title: '导出图片类型',
        defaultValue: 'png',
        setters: 'StringSetter'
      },
      {
        name: 'pen-color',
        title: '笔触颜色，默认黑色',
        defaultValue: '#000000',
        setters: 'StringSetter'
      },
      {
        name: 'line-width',
        title: '线条宽度',
        defaultValue: 3,
        setters: 'NumberSetter'
      },
      {
        name: 'background-color',
        title: '背景颜色',
        setters: 'StringSetter'
      },
      {
        name: 'tips',
        title: '当不支持 Canvas 的时候出现的提示文案',
        setters: 'StringSetter'
      },
      {
        name: 'clear-button-text',
        title: '清除按钮文案',
        defaultValue: '清空',
        setters: 'StringSetter'
      },
      {
        name: 'confirm-button-text',
        title: '\t确认按钮文案',
        defaultValue: '确认',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'start'
      },
      {
        name: 'end'
      },
      {
        name: 'signing',
        params: ['event']
      },
      {
        name: 'submit',
        params: ['data']
      },
      {
        name: 'clear'
      }
    ],
    package: 'vant'
  },
  VanStepper: {
    name: 'VanStepper',
    alias: 'Stepper',
    label: '步进器',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/stepper',
    props: [
      {
        name: 'modelValue',
        title: '当前输入的值',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'min',
        title: '最小值',
        defaultValue: 1,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'max',
        title: '最大值',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'auto-fixed',
        title:
          '是否自动校正超出限制范围的数值，设置为 false 后输入超过限制范围的数值将不会自动校正',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'default-value',
        title: '初始值，当 v-model 为空时生效',
        defaultValue: 1,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'step',
        title: '步长，每次点击时改变的值',
        defaultValue: 1,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'name',
        title:
          '标识符，通常为一个唯一的字符串或数字，可以在 change 事件回调参数中获取',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'input-width',
        title: '输入框宽度，默认单位为 px',
        defaultValue: 32,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'button-size',
        title: '按钮大小以及输入框高度，默认单位为 px',
        defaultValue: 28,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'decimal-length',
        title: '固定显示的小数位数',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'theme',
        title: '样式风格',
        setters: 'SelectSetter',
        options: ['round']
      },
      {
        name: 'placeholder',
        title: '输入框占位提示文字',
        setters: 'StringSetter'
      },
      {
        name: 'integer',
        title: '是否只允许输入整数',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用步进器',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disable-plus',
        title: '是否禁用增加按钮',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disable-minus',
        title: '是否禁用减少按钮',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disable-input',
        title: '是否禁用输入框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'before-change',
        title:
          '输入值变化前的回调函数，返回 false 可阻止输入，支持返回 Promise',
        defaultValue: false,
        setters: 'FunctionSetter'
      },
      {
        name: 'show-plus',
        title: '是否显示增加按钮',
        defaultValue: true,
        setters: 'FunctionSetter'
      },
      {
        name: 'show-minus',
        title: '是否显示减少按钮',
        defaultValue: true,
        setters: 'FunctionSetter'
      },
      {
        name: 'show-input',
        title: '是否显示输入框',
        defaultValue: true,
        setters: 'FunctionSetter'
      },
      {
        name: 'long-press',
        title: '是否开启长按手势，开启后可以长按增加和减少按钮',
        defaultValue: true,
        setters: 'FunctionSetter'
      },
      {
        name: 'allow-empty',
        title: '是否允许输入的值为空，设置为 true 后允许传入空字符串',
        defaultValue: false,
        setters: 'FunctionSetter'
      }
    ],
    events: [
      {
        name: 'update:modelValue'
      },
      {
        name: 'change',
        params: ['value', 'details']
      },
      {
        name: 'overlimit'
      },
      {
        name: 'plus'
      },
      {
        name: 'minus'
      },
      {
        name: 'focus',
        params: ['event']
      },
      {
        name: 'blur',
        params: ['event']
      }
    ],
    snippet: {
      props: {
        modelValue: 1
      }
    },
    package: 'vant'
  },
  VanSwitch: {
    name: 'VanSwitch',
    alias: 'Switch',
    label: '开关',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/switch',
    props: [
      {
        name: 'modelValue',
        title: '开关选中状态',
        defaultValue: false,
        setters: 'ExpressionSetter'
      },
      {
        name: 'loading',
        title: '是否为加载状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否为禁用状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        title: '开关按钮的尺寸，默认单位为 px',
        defaultValue: 26,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'active-color',
        title: '打开时的背景色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'inactive-color',
        title: '关闭时的背景色',
        defaultValue: 'rgba(120, 120, 128, 0.16)',
        setters: 'StringSetter'
      },
      {
        name: 'active-value',
        title: '打开时对应的值',
        defaultValue: true,
        setters: 'ExpressionSetter'
      },
      {
        name: 'inactive-value',
        title: '关闭时对应的值',
        defaultValue: false,
        setters: 'ExpressionSetter'
      }
    ],
    events: [
      {
        name: 'update:modelValue'
      },
      {
        name: 'change',
        params: ['value']
      },
      {
        name: 'click',
        params: ['event']
      }
    ],
    slots: ['node', 'background'],
    snippet: {},
    package: 'vant'
  },
  VanTimePicker: {
    name: 'VanTimePicker',
    alias: 'TimePicker',
    label: '时间选择',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/time-picker',
    props: [
      {
        name: 'modelValue',
        title: '当前选中的时间',
        setters: 'ArraySetter'
      },
      {
        name: 'columns-type',
        title: '选项类型，由 hour、minute 和 second 组成的数组',
        defaultValue: ['hour', 'minute'],
        setters: 'ArraySetter'
      },
      {
        name: 'min-hour',
        title: '可选的最小小时',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'max-hour',
        title: '可选的最大小时',
        defaultValue: 23,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'min-minute',
        title: '可选的最小分钟',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'max-minute',
        title: '可选的最大分钟',
        defaultValue: 59,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'min-second',
        title: '可选的最小秒数',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'max-second',
        title: '可选的最大秒数',
        defaultValue: 59,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'min-time',
        title:
          '可选的最小时间，格式参考 07:40:00，使用时 min-hour min-minute min-second 不会生效',
        setters: 'StringSetter'
      },
      {
        name: 'max-time',
        title:
          '可选的最大时间，格式参考 10:20:00，使用时 max-hour max-minute max-second 不会生效',
        setters: 'StringSetter'
      },
      {
        name: 'title',
        title: '顶部栏标题',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'confirm-button-text',
        title: '确认按钮文字',
        defaultValue: '确认',
        setters: 'StringSetter'
      },
      {
        name: 'cancel-button-text',
        title: '取消按钮文字',
        defaultValue: '取消',
        setters: 'StringSetter'
      },
      {
        name: 'show-toolbar',
        title: '是否显示顶部栏',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        title: '是否显示加载状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'readonly',
        title: '是否为只读状态，只读状态下无法切换选项',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'filter',
        title: '选项过滤函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'formatter',
        title: '选项格式化函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'option-height',
        title: '选项高度，支持 px vw vh rem 单位，默认 px',
        defaultValue: 44,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'visible-option-num',
        title: '可见的选项个数',
        defaultValue: 6,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'swipe-duration',
        title: '快速滑动时惯性滚动的时长，单位 ms',
        defaultValue: 1000,
        setters: ['NumberSetter', 'StringSetter']
      }
    ],
    events: [
      {
        name: 'confirm',
        params: ['data']
      },
      {
        name: 'cancel',
        params: ['data']
      },
      {
        name: 'change',
        params: ['data']
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: [
      {
        name: 'toolbar'
      },
      {
        name: 'title'
      },
      {
        name: 'confirm'
      },
      {
        name: 'cancel'
      },
      {
        name: 'toolbar'
      },
      {
        name: 'option',
        params: ['option', 'index']
      },
      {
        name: 'toolbar'
      },
      {
        name: 'columns-top'
      },
      {
        name: 'columns-bottom'
      }
    ],
    snippet: {
      props: {
        title: '选择时间'
      }
    },
    package: 'vant'
  },
  VanUploader: {
    name: 'VanUploader',
    alias: 'Uploader',
    label: '文件上传',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/uploader',
    props: [
      {
        name: 'modelValue',
        title: '已上传的文件列表',
        setters: 'ArraySetter'
      },
      {
        name: 'accept',
        title: '允许上传的文件类型',
        defaultValue: 'image/*',
        setters: 'StringSetter'
      },
      {
        name: 'name',
        title:
          '标识符，通常为一个唯一的字符串或数字，可以在回调函数的第二项参数中获取',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'preview-size',
        title: '预览图和上传区域的尺寸，默认单位为 px',
        defaultValue: 80,
        setters: ['NumberSetter', 'StringSetter', 'ArraySetter']
      },
      {
        name: 'preview-image',
        title: '是否在上传完成后展示预览图',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'preview-full-image',
        title: '是否在点击预览图后展示全屏图片预览',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'preview-options',
        title: '全屏图片预览的配置项',
        setters: 'ObjectSetter'
      },
      {
        name: 'multiple',
        title: '是否开启图片多选，部分安卓机型不支持',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用文件上传',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'readonly',
        title: '是否将上传区域设置为只读状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'deletable',
        title: '是否展示删除按钮',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'reupload',
        title: '是否开启覆盖上传，开启后会关闭图片预览',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-upload',
        title: '是否展示上传区域',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy-load',
        title: '是否开启图片懒加载，须配合 Lazyload 组件使用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'capture',
        title: '图片选取模式，可选值为 camera (直接调起摄像头)',
        setters: 'StringSetter'
      },
      {
        name: 'after-read',
        title: '文件读取完成后的回调函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'before-read',
        title:
          '文件读取前的回调函数，返回 false 可终止文件读取，支持返回 Promise',
        setters: 'FunctionSetter'
      },
      {
        name: 'before-delete',
        title:
          '文件删除前的回调函数，返回 false 可终止文件读取，支持返回 Promise',
        setters: 'FunctionSetter'
      },
      {
        name: 'max-size',
        title: '文件大小限制，单位为 byte',
        defaultValue: null,
        setters: ['NumberSetter', 'StringSetter', 'FunctionSetter']
      },
      {
        name: 'max-count',
        title: '文件上传数量限制',
        defaultValue: null,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'result-type',
        title: '文件读取结果类型，可选值为 file text',
        defaultValue: 'dataUrl',
        setters: 'SelectSetter',
        options: ['dataUrl', 'file', 'text']
      },
      {
        name: 'upload-text',
        title: '上传区域文字提示',
        setters: 'StringSetter'
      },
      {
        name: 'image-fit',
        title: '预览图裁剪模式',
        defaultValue: 'cover',
        setters: 'SelectSetter',
        options: ['contain', 'cover', 'fill', 'none', 'scale-down']
      },
      {
        name: 'upload-icon',
        title: '上传区域图标名称或图片链接，等同于 Icon 组件的 name 属性',
        defaultValue: 'photograph',
        setters: ['VanIconSetter', 'StringSetter']
      }
    ],
    events: [
      {
        name: 'oversize'
      },
      {
        name: 'click-upload',
        params: ['event']
      },
      {
        name: 'click-preview'
      },
      {
        name: 'click-reupload'
      },
      {
        name: 'close-preview'
      },
      {
        name: 'delete'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: ['default', 'preview-delete', 'preview-cover'],
    snippet: {},
    package: 'vant'
  },
  VanActionSheet: {
    name: 'VanActionSheet',
    alias: 'ActionSheet',
    label: '动作面板',
    categoryId: 'feedback',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/action-sheet',
    props: [
      {
        name: 'show',
        title: '是否显示动作面板',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'actions',
        title: '面板选项列表',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'title',
        title: '顶部标题',
        setters: 'StringSetter'
      },
      {
        name: 'cancel-text',
        title: '取消按钮文字',
        setters: 'StringSetter'
      },
      {
        name: 'description',
        title: '选项上方的描述信息',
        setters: 'StringSetter'
      },
      {
        name: 'closeable',
        title: '是否显示关闭图标',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-icon',
        title: '关闭图标名称或图片链接，等同于 Icon 组件的 name 属性',
        defaultValue: 'cross',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'duration',
        title: '动画时长，单位秒，设置为 0 可以禁用动画',
        defaultValue: 0.3,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'z-index',
        title: '将面板的 z-index 层级设置为一个固定值',
        defaultValue: 2000,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'round',
        title: '是否显示圆角',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'overlay',
        title: '是否显示遮罩层',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'overlay-class',
        title: '自定义遮罩层类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'overlay-style',
        title: '自定义遮罩层样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'lock-scroll',
        title: '是否锁定背景滚动',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy-render',
        title: 'lazy-render',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-popstate',
        title: '是否在页面回退时自动关闭',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-action',
        title: '是否在点击选项后关闭',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-overlay',
        title: '是否在点击遮罩层后关闭',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'safe-area-inset-bottom',
        title: '是否开启底部安全区适配',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'teleport',
        title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
        setters: ['StringSetter', 'ExpressionSetter']
      },
      {
        name: 'before-close',
        title: '关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise',
        setters: 'FunctionSetter'
      }
    ],
    events: [
      {
        name: 'update:show'
      },
      {
        name: 'select',
        params: ['action', 'index']
      },
      {
        name: 'cancel'
      },
      {
        name: 'open'
      },
      {
        name: 'close'
      },
      {
        name: 'opened'
      },
      {
        name: 'closed'
      },
      {
        name: 'click-overlay',
        params: ['event']
      }
    ],
    slots: ['default', 'description', 'cancel', 'action'],
    snippet: {
      props: {
        show: true,
        actions: [
          {
            name: '选项一'
          },
          {
            name: '选项二'
          },
          {
            name: '选项三'
          }
        ]
      }
    },
    package: 'vant'
  },
  VanBarrage: {
    name: 'VanBarrage',
    alias: 'Barrage',
    label: '弹幕',
    categoryId: 'feedback',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/barrage',
    props: [
      {
        name: 'modelValue',
        title: '弹幕数据',
        setters: 'ArraySetter'
      },
      {
        name: 'auto-play',
        title: '是否自动播放弹幕',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'rows',
        title: '弹幕文字行数',
        defaultValue: 4,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'top',
        title: '弹幕文字区域顶部间距，单位 px',
        defaultValue: 10,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'duration',
        title: '弹幕文字滑过容器的时间，单位 ms',
        defaultValue: 4000,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'delay',
        title: '弹幕动画延时，单位 ms',
        defaultValue: 300,
        setters: 'NumberSetter'
      }
    ],
    events: [
      {
        name: 'update:modelValue'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        modelValue: [
          {
            id: 100,
            text: '轻量'
          },
          {
            id: 101,
            text: '可定制的'
          },
          {
            id: 102,
            text: '移动端'
          },
          {
            id: 103,
            text: 'Vue'
          },
          {
            id: 104,
            text: '组件库'
          },
          {
            id: 105,
            text: 'VantUI'
          },
          {
            id: 106,
            text: '666'
          }
        ]
      },
      children: [
        {
          name: 'div',
          props: {
            style: {
              width: '100%',
              height: '150px'
            }
          }
        }
      ]
    },
    package: 'vant'
  },
  VanDialog: {
    name: 'VanDialog',
    alias: 'Dialog',
    label: '弹出框',
    categoryId: 'feedback',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/dialog',
    props: [
      {
        name: 'show',
        title: '是否显示弹窗',
        setters: 'BooleanSetter'
      },
      {
        name: 'title',
        title: '标题',
        setters: 'StringSetter'
      },
      {
        name: 'width',
        title: '弹窗宽度，默认单位为 px',
        defaultValue: 320,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'message',
        title: '文本内容，支持通过 \n 换行',
        setters: ['StringSetter', 'FunctionSetter']
      },
      {
        name: 'message-align',
        title: '内容水平对齐方式，可选值为 left right justify',
        defaultValue: 'center',
        setters: 'SelectSetter',
        options: ['left', 'right', 'justify', 'center']
      },
      {
        name: 'theme',
        title: '样式风格，可选值为 round-button',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['round-button', 'default']
      },
      {
        name: 'show-confirm-button',
        title: '是否展示确认按钮',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-cancel-button',
        title: '是否展示取消按钮',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'confirm-button-text',
        title: '确认按钮文案',
        defaultValue: '确认',
        setters: 'StringSetter'
      },
      {
        name: 'confirm-button-color',
        title: '确认按钮颜色',
        defaultValue: '#ee0a24',
        setters: 'StringSetter'
      },
      {
        name: 'confirm-button-disabled',
        title: '是否禁用确认按钮',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'cancel-button-text',
        title: '取消按钮文案',
        defaultValue: '取消',
        setters: 'StringSetter'
      },
      {
        name: 'cancel-button-color',
        title: '取消按钮颜色',
        defaultValue: '#000000',
        setters: 'StringSetter'
      },
      {
        name: 'cancel-button-disabled',
        title: '是否禁用取消按钮',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'z-index',
        title: '将弹窗的 z-index 层级设置为一个固定值',
        defaultValue: '2000+',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'overlay',
        title: '是否展示遮罩层',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'overlay-class',
        title: '自定义遮罩层类名',
        setters: 'StringSetter'
      },
      {
        name: 'overlay-style',
        title: '自定义遮罩层样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'close-on-popstate',
        title: '是否在页面回退时自动关闭',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-overlay',
        title: '是否在点击遮罩层后关闭弹窗',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy-render',
        title: '是否在显示弹层时才渲染节点',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'lock-scroll',
        title: '是否锁定背景滚动',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'allow-html',
        title: '是否允许 message 内容中渲染 HTML',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'before-close',
        title: '关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise',
        setters: 'FunctionSetter'
      },
      {
        name: 'transition',
        title: '动画类名，等价于 transition 的 name 属性',
        setters: 'StringSetter'
      },
      {
        name: 'teleport',
        title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
        setters: ['StringSetter', 'ExpressionSetter']
      }
    ],
    events: [
      'update:show',
      'confirm',
      'cancel',
      'open',
      'close',
      'opened',
      'closed'
    ],
    slots: ['default', 'title', 'footer'],
    snippet: {
      props: {
        show: true,
        title: '标题'
      },
      children: [
        {
          name: 'VanImage',
          props: {
            src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg'
          }
        }
      ]
    },
    package: 'vant'
  },
  VanDropdownMenu: {
    name: 'VanDropdownMenu',
    alias: 'DropdownMenu',
    label: '下拉菜单',
    categoryId: 'feedback',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/dropdown-menu',
    props: [
      {
        name: 'active-color',
        title: '菜单标题和选项的选中态颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'direction',
        title: '菜单展开方向，可选值为up',
        defaultValue: 'down',
        setters: 'SelectSetter',
        options: ['up', 'down']
      },
      {
        name: 'z-index',
        title: '菜单栏 z-index 层级',
        defaultValue: 10,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'duration',
        title: '动画时长，单位秒，设置为 0 可以禁用动画',
        defaultValue: 0.2,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'overlay',
        title: '是否显示遮罩层',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-overlay',
        title: '是否在点击遮罩层后关闭菜单',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-outside',
        title: '是否在点击外部元素后关闭菜单',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'swipe-threshold',
        title:
          '滚动阈值，选项数量超过阈值且总宽度超过菜单栏宽度时，可以横向滚动',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'auto-locate',
        title: '当祖先元素设置了 transform 时，自动调整下拉菜单的位置',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    snippet: {
      children: [
        {
          name: 'VanDropdownItem',
          props: {
            modelValue: 0,
            options: [
              {
                text: '全部商品',
                value: 0
              },
              {
                text: '新款商品',
                value: 1
              },
              {
                text: '活动商品',
                value: 2
              }
            ]
          }
        },
        {
          name: 'VanDropdownItem',
          props: {
            modelValue: 'a',
            options: [
              {
                text: '默认排序',
                value: 'a'
              },
              {
                text: '好评排序',
                value: 'b'
              },
              {
                text: '销量排序',
                value: 'c'
              }
            ]
          }
        }
      ]
    },
    package: 'vant'
  },
  VanDropdownItem: {
    name: 'VanDropdownItem',
    alias: 'DropdownItem',
    label: '下拉菜单项',
    categoryId: 'feedback',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/dropdown-menu',
    props: [
      {
        name: 'modelValue',
        title: '当前选中项对应的 value',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'title',
        title: '菜单项标题',
        setters: 'StringSetter'
      },
      {
        name: 'options',
        title: '选项数组',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'disabled',
        title: '是否禁用菜单',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy-render',
        title: '是否在首次展开时才渲染菜单内容',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'title-class',
        title: '标题额外类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'teleport',
        title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
        setters: ['StringSetter', 'ExpressionSetter']
      }
    ],
    events: [
      {
        name: 'update:modelValue'
      },
      {
        name: 'change',
        params: ['value']
      },
      {
        name: 'open'
      },
      {
        name: 'close'
      },
      {
        name: 'opened'
      },
      {
        name: 'closed'
      }
    ],
    slots: ['default', 'title'],
    snippet: {
      props: {
        modelValue: 'a',
        options: [
          {
            text: '默认排序',
            value: 'a'
          },
          {
            text: '好评排序',
            value: 'b'
          },
          {
            text: '销量排序',
            value: 'c'
          }
        ]
      }
    },
    package: 'vant'
  },
  VanFloatingPanel: {
    name: 'VanFloatingPanel',
    alias: 'FloatingPanel',
    label: '浮动面板',
    categoryId: 'feedback',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/floating-panel',
    props: [
      {
        name: 'height',
        title: '当前面板的显示高度',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'anchors',
        title: '设置自定义锚点, 单位 px',
        defaultValue: [100, 222],
        setters: 'ArraySetter'
      },
      {
        name: 'duration',
        title: '动画时长，单位秒，设置为 0 可以禁用动画',
        defaultValue: 0.3,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'content-draggable',
        title: '允许拖拽内容容器',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'lock-scroll',
        title: '当不拖拽时，是否锁定背景滚动',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'safe-area-inset-bottom',
        title: '是否开启底部安全区适配',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'height-change',
        params: ['height']
      }
    ],
    slots: ['default', 'header'],
    snippet: {
      children: [
        {
          name: 'VanCellGroup',
          children: [
            {
              name: 'VanCell',
              props: {
                size: 'large',
                title: {
                  type: 'JSExpression',
                  value: 'this.context.index'
                }
              },
              directives: [
                {
                  name: 'vFor',
                  value: {
                    type: 'JSExpression',
                    value: '20'
                  }
                },
                {
                  name: 'vBind',
                  value: {
                    type: 'JSExpression',
                    value: 'this.context.index'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    package: 'vant'
  },
  VanFloatingBubble: {
    name: 'VanFloatingBubble',
    alias: 'FloatingBubble',
    label: '浮动气泡',
    categoryId: 'feedback',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/floating-bubble',
    props: [
      {
        name: 'offset',
        title: '控制气泡位置',
        setters: 'ObjectSetter'
      },
      {
        name: 'axis',
        title: '拖拽的方向',
        defaultValue: 'y',
        setters: 'SelectSetter',
        options: ['x', 'y', 'xy', 'lock']
      },
      {
        name: 'magnetic',
        title: '自动磁吸的方向',
        setters: 'SelectSetter',
        options: ['x', 'y']
      },
      {
        name: 'icon',
        title: '气泡图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'gap',
        title: '气泡与窗口的最小间距，单位为 px',
        defaultValue: 24,
        setters: 'NumberSetter'
      },
      {
        name: 'teleport',
        title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
        defaultValue: 'body',
        setters: ['StringSetter', 'ExpressionSetter']
      }
    ],
    events: [
      {
        name: 'update:offset'
      },
      {
        name: 'click',
        params: ['event']
      },
      {
        name: 'offset-change',
        params: ['data']
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        icon: 'chat'
      }
    },
    package: 'vant'
  },
  VanLoading: {
    name: 'VanLoading',
    alias: 'Loading',
    label: '加载',
    categoryId: 'feedback',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/loading',
    props: [
      {
        name: 'color',
        title: '颜色',
        defaultValue: '#c9c9c9',
        setters: 'StringSetter'
      },
      {
        name: 'type',
        title: '类型',
        defaultValue: 'circular',
        setters: 'SelectSetter',
        options: ['circular', 'spinner']
      },
      {
        name: 'size',
        title: '加载图标大小，默认单位为 px',
        defaultValue: 30,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'text-size',
        title: '文字大小，默认单位为 px',
        defaultValue: 14,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'text-color',
        title: '文字颜色',
        defaultValue: '#c9c9c9',
        setters: 'StringSetter'
      },
      {
        name: 'vertical',
        title: '是否垂直排列图标和文字内容',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default', 'icon'],
    package: 'vant'
  },
  VanNotify: {
    name: 'VanNotify',
    alias: 'Notify',
    label: '消息提示',
    categoryId: 'feedback',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/notify',
    props: [
      {
        name: 'show',
        title: '是否显示通知',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'type',
        title: '类型',
        defaultValue: 'danger',
        setters: 'SelectSetter',
        options: ['primary', 'success', 'warning', 'danger']
      },
      {
        name: 'message',
        title: '展示文案，支持通过\n换行',
        setters: 'StringSetter'
      },
      {
        name: 'z-index',
        title: '将组件的 z-index 层级设置为一个固定值',
        defaultValue: '2000+',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'position',
        title: '弹出位置',
        defaultValue: 'top',
        setters: 'SelectSetter',
        options: ['top', 'bottom']
      },
      {
        name: 'color',
        title: '字体颜色',
        defaultValue: '#ffffff',
        setters: 'StringSetter'
      },
      {
        name: 'background',
        title: '背景颜色',
        setters: 'StringSetter'
      },
      {
        name: 'class-name',
        title: '自定义类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'lock-scroll',
        title: '是否锁定背景滚动',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'teleport',
        title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
        setters: ['StringSetter', 'ExpressionSetter']
      }
    ],
    events: [
      {
        name: 'click',
        params: ['event']
      },
      {
        name: 'close'
      },
      {
        name: 'opened'
      },
      {
        name: 'update:show'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        show: true,
        type: 'success'
      },
      children: [
        {
          name: 'VanIcon',
          props: {
            name: 'bell',
            style: {
              marginRight: '4px'
            }
          }
        },
        {
          name: 'span',
          children: '通知内容'
        }
      ]
    },
    package: 'vant'
  },
  VanOverlay: {
    name: 'VanOverlay',
    alias: 'Overlay',
    label: '遮罩层',
    categoryId: 'feedback',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/overlay',
    props: [
      {
        name: 'show',
        title: '是否展示遮罩层',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'z-index',
        title: '\tz-index 层级',
        defaultValue: 1,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'duration',
        title: '动画时长，单位秒，设置为 0 可以禁用动画',
        defaultValue: 0.3,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'class-name',
        title: '自定义类名',
        setters: 'StringSetter'
      },
      {
        name: 'custom-style',
        title: '自定义样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'lock-scroll',
        title: '是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy-render',
        title: '是否在显示时才渲染节点',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'click',
        params: ['event']
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        show: true
      }
    },
    package: 'vant'
  },
  VanPullRefresh: {
    name: 'VanPullRefresh',
    alias: 'PullRefresh',
    label: '下拉刷新',
    categoryId: 'feedback',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/pull-refresh',
    props: [
      {
        name: 'modelValue',
        title: '是否处于加载中状态',
        setters: 'BooleanSetter'
      },
      {
        name: 'pulling-text',
        title: '下拉过程提示文案',
        defaultValue: '下拉即可刷新...',
        setters: 'StringSetter'
      },
      {
        name: 'loosing-text',
        title: '释放过程提示文案',
        defaultValue: '释放即可刷新...',
        setters: 'StringSetter'
      },
      {
        name: 'loading-text',
        title: '加载过程提示文案',
        defaultValue: '加载中...',
        setters: 'StringSetter'
      },
      {
        name: 'success-text',
        title: '刷新成功提示文案',
        setters: 'StringSetter'
      },
      {
        name: 'success-duration',
        title: '刷新成功提示展示时长(ms)',
        defaultValue: 500,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'animation-duration',
        title: '动画时长',
        defaultValue: 300,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'head-height',
        title: '顶部内容高度',
        defaultValue: 50,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'pull-distance',
        title: '触发下拉刷新的距离',
        defaultValue: 50,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'disabled',
        title: '\t是否禁用下拉刷新',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'update:modelValue'
      },
      {
        name: 'refresh'
      },
      {
        name: 'change',
        params: ['data']
      }
    ],
    slots: ['default', 'normal', 'pulling', 'loosing', 'loading', 'success'],
    snippet: {
      props: {
        modelValue: true
      },
      children: [
        {
          name: 'p',
          children: '下拉刷新'
        }
      ]
    },
    package: 'vant'
  },
  VanShareSheet: {
    name: 'VanShareSheet',
    alias: 'ShareSheet',
    label: '分享面板',
    categoryId: 'feedback',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/share-sheet',
    props: [
      {
        name: 'show',
        title: '是否显示分享面板',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'options',
        title: '分享选项',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'title',
        title: '顶部标题',
        setters: 'StringSetter'
      },
      {
        name: 'cancel-text',
        title: '取消按钮文字，传入空字符串可以隐藏按钮',
        defaultValue: '取消',
        setters: 'StringSetter'
      },
      {
        name: 'description',
        title: '标题下方的辅助描述文字',
        setters: 'StringSetter'
      },
      {
        name: 'duration',
        title: '动画时长，单位秒，设置为 0 可以禁用动画',
        defaultValue: 0.3,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'z-index',
        title: '将面板的 z-index 层级设置为一个固定值',
        defaultValue: '2000+',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'round',
        title: '是否显示圆角',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'overlay',
        title: '是否显示遮罩层',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'overlay-class',
        title: '自定义遮罩层类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'overlay-style',
        title: '自定义遮罩层样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'lock-scroll',
        title: '是否锁定背景滚动',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy-render',
        title: '是否在显示弹层时才渲染内容',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-popstate',
        title: '是否在页面回退时自动关闭',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-overlay',
        title: '是否在点击遮罩层后关闭',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'safe-area-inset-bottom',
        title: '是否开启底部安全区适配',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'teleport',
        title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
        setters: ['StringSetter', 'ExpressionSetter']
      },
      {
        name: 'before-close',
        title: '关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise',
        setters: 'FunctionSetter'
      }
    ],
    events: [
      {
        name: 'update:show'
      },
      {
        name: 'select',
        params: ['option', 'index']
      },
      {
        name: 'cancel'
      },
      {
        name: 'open'
      },
      {
        name: 'close'
      },
      {
        name: 'opened'
      },
      {
        name: 'closed'
      },
      {
        name: 'click-overlay'
      }
    ],
    slots: ['title', 'description', 'cancel'],
    snippet: {
      props: {
        show: true,
        title: '立即分享给好友',
        options: [
          [
            {
              name: '微信',
              icon: 'wechat'
            },
            {
              name: '朋友圈',
              icon: 'wechat-moments'
            },
            {
              name: '微博',
              icon: 'weibo'
            },
            {
              name: 'QQ',
              icon: 'qq'
            }
          ],
          [
            {
              name: '复制链接',
              icon: 'link'
            },
            {
              name: '分享海报',
              icon: 'poster'
            },
            {
              name: '二维码',
              icon: 'qrcode'
            },
            {
              name: '小程序码',
              icon: 'weapp-qrcode'
            }
          ]
        ]
      }
    },
    package: 'vant'
  },
  VanSwipeCell: {
    name: 'VanSwipeCell',
    alias: 'SwipeCell',
    label: '滑动单元格',
    categoryId: 'feedback',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/swipe-cell',
    props: [
      {
        name: 'name',
        title: '标识符，通常为一个唯一的字符串或数字，可以在事件参数中获取到',
        defaultValue: '""',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'left-width',
        title: '指定左侧滑动区域宽度，单位为 px',
        defaultValue: 'auto',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'right-width',
        title: '指定右侧滑动区域宽度，单位为 px',
        defaultValue: 'auto',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'before-close',
        title: '关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise',
        setters: 'FunctionSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用滑动',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'stop-propagation',
        title: '是否阻止滑动事件冒泡',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'click',
        params: ['position']
      },
      {
        name: 'open',
        params: ['name', 'position']
      },
      {
        name: 'close',
        params: ['name', 'position']
      }
    ],
    slots: ['default', 'left', 'right'],
    snippet: {
      children: [
        {
          name: 'VanButton',
          slot: 'left',
          props: {
            square: true,
            type: 'primary',
            text: '选择'
          }
        },
        {
          name: 'VanCell',
          props: {
            border: false,
            title: '单元格',
            value: '内容'
          }
        },
        {
          name: 'template',
          slot: 'right',
          children: [
            {
              name: 'VanButton',
              props: {
                square: true,
                type: 'danger',
                text: '删除'
              }
            },
            {
              name: 'VanButton',
              props: {
                square: true,
                type: 'primary',
                text: '收藏'
              }
            }
          ]
        }
      ]
    },
    package: 'vant'
  },
  VanBadge: {
    name: 'VanBadge',
    alias: 'Badge',
    label: '徽标',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/button',
    props: [
      {
        name: 'content',
        title: '徽标内容（dot 为 fasle 时生效）',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'color',
        title: '徽标背景颜色',
        defaultValue: '#ee0a24',
        setters: 'StringSetter'
      },
      {
        name: 'dot',
        title: '是否展示为小红点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'max',
        title: '最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'offset',
        title:
          '设置徽标的偏移量，数组的两项分别对应水平向右和垂直向下方向的偏移量，默认单位为 px',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'show-zero',
        title: '当 content 为数字 0 或字符串 "0" 时，是否展示徽标',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'position',
        title: '徽标位置',
        defaultValue: 'top-right',
        setters: 'SelectSetter',
        options: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
      }
    ],
    slots: ['default', 'content'],
    snippet: {
      props: {
        content: '5'
      },
      children: [
        {
          name: 'div',
          props: {
            style: {
              width: '40px',
              height: '40px',
              background: '#f2f3f5',
              borderRadius: '4px'
            }
          }
        }
      ]
    },
    package: 'vant'
  },
  VanCircle: {
    name: 'VanCircle',
    alias: 'Circle',
    label: '环形进度条',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/circle',
    props: [
      {
        name: 'currentRate',
        title: '当前进度',
        setters: 'NumberSetter'
      },
      {
        name: 'rate',
        title: '目标进度',
        defaultValue: 100,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'size',
        title: '圆环直径，默认单位为 px',
        defaultValue: '100px',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'color',
        title: '进度条颜色，传入对象格式可以定义渐变色',
        defaultValue: '#1989fa',
        setters: ['ColorSetter', 'StringSetter', 'ObjectSetter']
      },
      {
        name: 'layer-color',
        title: '轨道颜色',
        defaultValue: 'white',
        setters: ['StringSetter', 'StringSetter']
      },
      {
        name: 'fill',
        title: '填充颜色',
        defaultValue: 'none',
        setters: ['StringSetter', 'StringSetter']
      },
      {
        name: 'speed',
        title: '动画速度（单位为 rate/s）',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'text',
        title: '文字',
        setters: 'StringSetter'
      },
      {
        name: 'stroke-width',
        title: '进度条宽度',
        defaultValue: 40,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'stroke-linecap',
        title: '进度条端点的形状，可选值为 square butt',
        defaultValue: 'round',
        setters: 'SelectSetter',
        options: ['round', 'square', 'butt']
      },
      {
        name: 'clockwise',
        title: '是否顺时针增加',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'start-position',
        title: '进度起始位置',
        defaultValue: 'top',
        setters: 'SelectSetter',
        options: ['left', 'right', 'top', 'bottom']
      }
    ],
    events: ['update:currentRate'],
    slots: ['default'],
    snippet: {
      props: {
        currentRate: 30,
        rate: 100,
        text: '30%'
      }
    },
    package: 'vant'
  },
  VanCollapse: {
    name: 'VanCollapse',
    alias: 'Collapse',
    label: '折叠面板',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/collapse',
    props: [
      {
        name: 'modelValue',
        title: '当前展开面板的 name',
        setters: ['NumberSetter', 'StringSetter', 'ArraySetter']
      },
      {
        name: 'accordion',
        title: '是否开启手风琴模式',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border\t',
        title: '是否显示外边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: ['update:modelValue', 'change'],
    snippet: {
      props: {
        modelValue: ['1']
      },
      children: [
        {
          name: 'VanCollapseItem',
          props: {
            title: '标题1',
            name: '1'
          },
          children: '代码是写出来给人看的，附带能在机器上运行。'
        },
        {
          name: 'VanCollapseItem',
          props: {
            title: '标题2',
            name: '2'
          },
          children: '技术无非就是那些开发它的人的共同灵魂。。'
        },
        {
          name: 'VanCollapseItem',
          props: {
            title: '标题3',
            name: '3'
          },
          children: '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'
        }
      ]
    },
    package: 'vant'
  },
  VanCollapseItem: {
    name: 'VanCollapseItem',
    alias: 'CollapseItem',
    label: '折叠面板',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/collapse',
    props: [
      {
        name: 'name',
        title: '唯一标识符，默认为索引值',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'icon',
        title: '标题栏左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'size',
        title: '标题栏大小，可选值为 large',
        setters: 'SelectSetter',
        options: ['large']
      },
      {
        name: 'title',
        title: '标题栏左侧内容',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'value',
        title: '标题栏右侧内容',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'label',
        title: '标题栏描述信息',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'border',
        title: '是否显示内边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'is-link',
        title: '是否展示标题栏右侧箭头并开启点击反馈',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用面板',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'readonly',
        title: '是否为只读状态，只读状态下无法操作面板',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy-render',
        title: '是否在首次展开时才渲染面板内容',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'title-class',
        title: '左侧标题额外类名',
        setters: 'StringSetter'
      },
      {
        name: 'value-class',
        title: '右侧内容额外类名',
        setters: 'StringSetter'
      },
      {
        name: 'label-class',
        title: 'label-class',
        setters: 'StringSetter'
      }
    ],
    events: ['toggle'],
    slots: ['default', 'title', 'value', 'label', 'icon', 'right-icon'],
    snippet: {
      props: {
        title: '这是个标题'
      },
      children: '代码是写出来给人看的，附带能在机器上运行。'
    },
    package: 'vant'
  },
  VanCountDown: {
    name: 'VanCountDown',
    alias: 'CountDown',
    label: '倒计时',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/count-down',
    props: [
      {
        name: 'time',
        title: '倒计时时长，单位毫秒',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'format',
        title: '时间格式',
        defaultValue: 'HH:ss:mm',
        setters: 'StringSetter'
      },
      {
        name: 'auto-start',
        title: '是否自动开始倒计时',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'millisecond',
        title: '是否开启毫秒级渲染',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'finish'
      },
      {
        name: 'change',
        params: ['currentTime']
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        time: 108000000
      }
    },
    package: 'vant'
  },
  VanDivider: {
    name: 'VanDivider',
    alias: 'Divider',
    label: '分割线',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/divider',
    props: [
      {
        name: 'dashed',
        title: '是否使用虚线',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'hairline',
        title: '是否使用 0.5px 线',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'content-position',
        title: '内容位置',
        defaultValue: 'center',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right']
      },
      {
        name: 'vertical',
        title: '是否使用垂直',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      children: '文本'
    },
    package: 'vant'
  },
  VanEmpty: {
    name: 'VanEmpty',
    alias: 'Empty',
    label: '空状态',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/empty',
    props: [
      {
        name: 'image',
        title: '图片类型, 支持传入图片 URL',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['error', 'network', 'search', 'default']
      },
      {
        name: 'image-size',
        title: '图片大小，默认单位为 px',
        setters: ['NumberSetter', 'StringSetter', 'ArraySetter']
      },
      {
        name: 'description',
        title: '图片下方的描述文字',
        setters: 'StringSetter'
      }
    ],
    slots: ['default', 'image', 'description'],
    snippet: {
      props: {
        description: '描述文字'
      }
    },
    package: 'vant'
  },
  VanHighlight: {
    name: 'VanHighlight',
    alias: 'Highlight',
    label: '高亮文本',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/highlight',
    props: [
      {
        name: 'auto-escape',
        title: '是否自动转义',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'case-sensitive',
        title: '是否区分大小写',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'highlight-class',
        title: '高亮元素的类名',
        setters: 'StringSetter'
      },
      {
        name: 'highlight-tag',
        title: '高亮元素对应的 HTML 标签名',
        defaultValue: 'span',
        setters: 'StringSetter'
      },
      {
        name: 'keywords',
        title: '期望高亮的文本',
        setters: ['StringSetter', 'ArraySetter']
      },
      {
        name: 'source-string',
        title: '源文本',
        setters: 'StringSetter'
      },
      {
        name: 'tag',
        title: '根节点对应的 HTML 标签名',
        defaultValue: 'div',
        setters: 'StringSetter'
      },
      {
        name: 'unhighlight-class',
        title: '非高亮元素的类名',
        setters: 'StringSetter'
      },
      {
        name: 'unhighlight-tag',
        title: '非高亮元素对应的 HTML 标签名',
        defaultValue: 'span',
        setters: 'StringSetter'
      }
    ],
    snippet: {
      props: {
        'source-string':
          '慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。',
        keywords: '难题'
      }
    },
    package: 'vant'
  },
  VanImagePreview: {
    name: 'VanImagePreview',
    alias: 'ImagePreview',
    label: '图片预览',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/image-preview',
    props: [
      {
        name: 'show',
        title: '是否展示图片预览',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'images',
        title: '需要预览的图片 URL 数组',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'start-position',
        title: '图片预览起始位置索引',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'swipe-duration',
        title: '动画时长，单位为 ms',
        defaultValue: 300,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'show-index',
        title: '是否显示页码',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-indicators',
        title: '是否显示轮播指示器',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loop',
        title: '是否开启循环播放',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'double-scale',
        title: '是否启用双击缩放手势，禁用后，点击时会立即关闭图片预览',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'before-close',
        title: '关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise',
        setters: 'FunctionSetter'
      },
      {
        name: 'close-on-popstate',
        title: '是否在页面回退时自动关闭',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-image',
        title: '是否在点击图片后关闭图片预览',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-overlay',
        title: '是否在点击遮罩层后关闭图片预览',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'vertical',
        title: '是否开启纵向手势滑动',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'class-name',
        title: '自定义类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'max-zoom',
        title: '手势缩放时，最大缩放比例',
        defaultValue: 3,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'min-zoom',
        title: '手势缩放时，最小缩放比例',
        defaultValue: 0.3333333333333333,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'closeable',
        title: '是否显示关闭图标',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-icon',
        title: '关闭图标名称或图片链接',
        defaultValue: 'clear',
        setters: 'StringSetter'
      },
      {
        name: 'close-icon-position',
        title: '关闭图标位置',
        defaultValue: 'top-right',
        setters: 'SelectSetter',
        options: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
      },
      {
        name: 'transition',
        title: '动画类名，等价于 transition 的 name 属性',
        defaultValue: 'van-fade',
        setters: 'StringSetter'
      },
      {
        name: 'overlay-class',
        title: '自定义遮罩层类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'overlay-style',
        title: '自定义遮罩层样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'teleport',
        title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
        setters: ['StringSetter', 'ExpressionSetter']
      }
    ],
    events: [
      {
        name: 'update:show'
      },
      {
        name: 'close',
        params: ['data']
      },
      {
        name: 'closed'
      },
      {
        name: 'change',
        params: ['index']
      },
      {
        name: 'scale',
        params: ['data']
      },
      {
        name: 'long-press',
        params: ['data']
      }
    ],
    slots: ['index', 'cover', 'image'],
    snippet: {
      props: {
        show: true,
        images: [
          'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
          'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'
        ]
      },
      children: [
        {
          name: 'template',
          slot: 'index'
        }
      ]
    },
    package: 'vant'
  },
  VanImageLazyload: {
    name: 'VanImageLazyload',
    alias: 'Lazyload',
    label: '懒加载',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/lazyload',
    snippet: {},
    package: 'vant'
  },
  VanList: {
    name: 'VanList',
    alias: 'List',
    label: '列表',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/list',
    props: [
      {
        name: 'loading',
        title: '是否处于加载状态，加载过程中不触发 load 事件',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'error',
        title: '是否加载失败，加载失败后点击错误提示可以重新触发 load 事件',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'finished',
        title: '是否已加载完成，加载完成后不再触发 load 事件',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'offset',
        title: '滚动条与底部距离小于 offset 时触发 load 事件',
        defaultValue: 300,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'loading-text',
        title: '加载过程中的提示文案',
        defaultValue: '加载中...',
        setters: 'StringSetter'
      },
      {
        name: 'finished-text',
        title: '加载完成后的提示文案',
        setters: 'StringSetter'
      },
      {
        name: 'error-text',
        title: '加载失败后的提示文案',
        setters: 'StringSetter'
      },
      {
        name: 'immediate-check',
        title: '是否在初始化时立即执行滚动位置检查',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用滚动加载',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'direction',
        title: '滚动触发加载的方向，可选值为 up',
        defaultValue: 'down',
        setters: 'SelectSetter',
        options: ['up', 'down']
      },
      {
        name: 'scroller',
        title: '指定需要监听滚动事件的节点，默认为最近的父级滚动节点',
        setters: 'ExpressionSetter'
      }
    ],
    events: ['update:loading', 'update:error', 'load'],
    snippet: {
      props: {
        loading: {
          type: 'JSExpression',
          value: 'this.state.loading'
        },
        finished: {
          type: 'JSExpression',
          value: 'this.state.finished'
        },
        'finished-text': '没有更多了'
      },
      children: [
        {
          name: 'VanCell',
          props: {
            key: {
              type: 'JSExpression',
              value: 'this.context.item'
            },
            title: {
              type: 'JSExpression',
              value: 'this.context.item'
            }
          },
          directives: [
            {
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value: '20'
              }
            }
          ]
        }
      ],
      events: {
        load: {
          name: 'load',
          handler: {
            type: 'JSFunction',
            value:
              '() => {\r\n    setTimeout(() => {\r\n        if (this.state.refreshing) {\r\n            this.state.list = [];\r\n            this.state.refreshing = false;\r\n        }\r\n\r\n        for (let i = 0; i < 10; i++) {\r\n            this.state.list.push(this.state.list.length + 1);\r\n        }\r\n        this.loading = false;\r\n\r\n        if (this.state.list.length >= 40) {\r\n            this.finished = true;\r\n        }\r\n    }, 1000);\r\n};'
          },
          modifiers: {}
        }
      }
    },
    package: 'vant'
  },
  VanNoticeBar: {
    name: 'VanNoticeBar',
    alias: 'NoticeBar',
    label: '通知栏',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/notice-bar',
    props: [
      {
        name: 'mode',
        title: '通知栏模式，可选值为 closeable link',
        defaultValue: '""',
        setters: 'SelectSetter',
        options: ['closeable', 'link', '']
      },
      {
        name: 'text',
        title: '通知文本内容',
        defaultValue: '""',
        setters: 'StringSetter'
      },
      {
        name: 'color',
        title: '通知文本颜色',
        defaultValue: '#ed6a0c',
        setters: 'StringSetter'
      },
      {
        name: 'background',
        title: '滚动条背景',
        defaultValue: '#fffbe8',
        setters: 'StringSetter'
      },
      {
        name: 'left-icon',
        title: '左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'delay',
        title: '动画延迟时间 (s)',
        defaultValue: 1,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'speed',
        title: '滚动速率 (px/s)',
        defaultValue: 60,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'scrollable',
        title: '是否开启滚动播放，内容长度溢出时默认开启',
        setters: 'BooleanSetter'
      },
      {
        name: 'wrapable',
        title: '是否开启文本换行，只在禁用滚动时生效',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'click',
        params: ['event']
      },
      {
        name: 'close',
        params: ['event']
      },
      {
        name: 'replay'
      }
    ],
    slots: ['default', 'left-icon', 'right-icon'],
    snippet: {
      props: {
        'left-icon': 'volume-o',
        text: '无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。'
      }
    },
    package: 'vant'
  },
  VanPopover: {
    name: 'VanPopover',
    alias: 'Popover',
    label: '气泡弹出框',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/popover',
    props: [
      {
        name: 'show',
        title: '是否展示气泡弹出层',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'actions',
        title: '选项列表',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'actions-direction',
        title: '选项列表的排列方向，可选值为 horizontal',
        defaultValue: 'vertical',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal']
      },
      {
        name: 'placement',
        title: '弹出位置',
        defaultValue: 'bottom',
        setters: 'SelectSetter',
        options: [
          'top',
          'top-start',
          'top-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end',
          'bottom',
          'bottom-start',
          'bottom-end'
        ]
      },
      {
        name: 'theme',
        title: '主题风格',
        defaultValue: 'light',
        setters: 'SelectSetter',
        options: ['light', 'dark']
      },
      {
        name: 'trigger',
        title: '触发方式',
        defaultValue: 'click',
        setters: 'SelectSetter',
        options: ['click', 'manual']
      },
      {
        name: 'duration',
        title: '动画时长，单位秒，设置为 0 可以禁用动画',
        defaultValue: 0.3,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'offset',
        title: '出现位置的偏移量',
        defaultValue: [0, 8],
        setters: 'ArraySetter'
      },
      {
        name: 'overlay',
        title: '是否显示遮罩层',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'overlay-class',
        title: '自定义遮罩层类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'overlay-style',
        title: '自定义遮罩层样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'show-arrow',
        title: '是否展示小箭头',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-action',
        title: '\t是否在点击选项后关闭',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-outside',
        title: '是否在点击外部元素后关闭菜单',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-on-click-overlay',
        title: '是否在点击遮罩层后关闭菜单',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'teleport',
        title: '\t指定挂载的节点，等同于 Teleport 组件的 to 属性',
        defaultValue: 'body',
        setters: ['StringSetter', 'ExpressionSetter']
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
        defaultValue: 'vant-icon',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'update:show'
      },
      {
        name: 'select',
        params: ['action', 'index']
      },
      {
        name: 'open'
      },
      {
        name: 'close'
      },
      {
        name: 'opened'
      },
      {
        name: 'closed'
      },
      {
        name: 'click-overlay',
        params: ['event']
      }
    ],
    slots: ['default', 'reference', 'action'],
    snippet: {
      props: {
        show: true,
        actions: [
          {
            text: '选项一'
          },
          {
            text: '选项二'
          },
          {
            text: '选项三'
          }
        ]
      },
      events: {
        select: {
          name: 'select',
          handler: {
            type: 'JSFunction',
            value:
              '(action) => {\r\n    this.$libs.vant.showToast(action.text)\r\n}'
          },
          modifiers: {}
        }
      },
      children: [
        {
          name: 'VanButton',
          slot: 'reference',
          props: {
            type: 'primary'
          },
          children: '浅色风格'
        }
      ]
    },
    package: 'vant'
  },
  VanProgress: {
    name: 'VanProgress',
    alias: 'Progress',
    label: '进度条',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/progress',
    props: [
      {
        name: 'percentage',
        title: '进度百分比',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'stroke-width',
        title: '进度条粗细，默认单位为px',
        defaultValue: 4,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'color',
        title: '进度条颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'track-color',
        title: '轨道颜色',
        defaultValue: '#e5e5e5',
        setters: 'StringSetter'
      },
      {
        name: 'pivot-text',
        title: '进度文字内容',
        setters: 'StringSetter'
      },
      {
        name: 'pivot-color',
        title: '进度文字背景色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'text-color',
        title: '进度文字颜色',
        defaultValue: 'white',
        setters: 'StringSetter'
      },
      {
        name: 'inactive',
        title: '是否置灰',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-pivot',
        title: '是否显示进度文字',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    snippet: {
      props: {
        percentage: 50
      }
    },
    package: 'vant'
  },
  VanRollingText: {
    name: 'VanRollingText',
    alias: 'RollingText',
    label: '翻滚文本动效',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/rolling-text',
    props: [
      {
        name: 'start-num',
        title: '起始数值',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'target-num',
        title: '目标数值',
        setters: 'NumberSetter'
      },
      {
        name: 'text-list',
        title: '内容数组，用于翻转非数字内容',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'duration',
        title: '动画时长，单位为秒',
        defaultValue: 2,
        setters: 'NumberSetter'
      },
      {
        name: 'direction',
        title: '文本翻滚方向，值为 down 和 up',
        defaultValue: 'down',
        setters: 'SelectSetter',
        options: ['up', 'down']
      },
      {
        name: 'auto-start',
        title: '是否自动开始动画',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'stop-order',
        title: '各个数位动画停止先后顺序，值为 ltr 和 rtl',
        defaultValue: 'ltr',
        setters: 'SelectSetter',
        options: ['ltr', 'rtl']
      },
      {
        name: 'height',
        title: '数字高度，单位为 px',
        defaultValue: 40,
        setters: 'NumberSetter'
      }
    ],
    snippet: {
      props: {
        'start-num': 0,
        'target-num': 123
      }
    },
    package: 'vant'
  },
  VanSkeleton: {
    name: 'VanSkeleton',
    alias: 'Skeleton',
    label: '骨架屏',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/skeleton',
    props: [
      {
        name: 'row',
        title: '段落占位图行数',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'row-width',
        title: '段落占位图宽度，可传数组来设置每一行的宽度',
        defaultValue: '100%',
        setters: ['StringSetter', 'NumberSetter', 'ArraySetter']
      },
      {
        name: 'title',
        title: '是否显示标题占位图',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'avatar',
        title: '是否显示头像占位图',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        title: '是否显示骨架屏，传 false 时会展示子组件内容',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'animate',
        title: '是否开启动画',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'round',
        title: '是否将标题和段落显示为圆角风格',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'title-width',
        title: '标题占位图宽度',
        defaultValue: '40%',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'avatar-size',
        title: '头像占位图大小',
        defaultValue: 32,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'avatar-shape',
        title: '头像占位图形状',
        defaultValue: 'round',
        setters: 'SelectSetter',
        options: ['round', 'square']
      }
    ],
    slots: ['default', 'template'],
    snippet: {
      props: {
        title: true,
        avatar: true,
        row: 3
      }
    },
    package: 'vant'
  },
  VanSkeletonParagraph: {
    name: 'VanSkeletonParagraph',
    alias: 'SkeletonParagraph',
    label: '骨架屏文本',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/skeleton',
    props: [
      {
        name: 'round',
        title: '是否将段落显示为圆角风格',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'row-width',
        title: '段落占位图宽度',
        defaultValue: '100%',
        setters: 'StringSetter'
      }
    ],
    package: 'vant'
  },
  VanSkeletonTitle: {
    name: 'VanSkeletonTitle',
    alias: 'SkeletonTitle',
    label: '骨架屏标题',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/skeleton',
    props: [
      {
        name: 'round',
        title: '是否将段落显示为圆角风格',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'row-width',
        title: '段落占位图宽度',
        defaultValue: '40%',
        setters: ['StringSetter', 'NumberSetter']
      }
    ],
    package: 'vant'
  },
  VanSkeletonAvatar: {
    name: 'VanSkeletonAvatar',
    alias: 'SkeletonAvatar',
    label: '骨架屏头像',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/skeleton',
    props: [
      {
        name: 'avatar-size',
        title: '头像占位图大小',
        defaultValue: '32px',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'avatar-shape',
        title: '头像占位图形状',
        defaultValue: 'round',
        setters: 'SelectSetter',
        options: ['round', 'square']
      }
    ],
    package: 'vant'
  },
  VanSkeletonImage: {
    name: 'VanSkeletonImage',
    alias: 'SkeletonImage',
    label: '骨架屏图片',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/skeleton',
    props: [
      {
        name: 'image-size',
        title: '图片占位图大小',
        defaultValue: '32px',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'image-shape',
        title: '图片占位图形状',
        defaultValue: 'round',
        setters: 'SelectSetter',
        options: ['round', 'square']
      }
    ],
    package: 'vant'
  },
  VanSteps: {
    name: 'VanSteps',
    alias: 'Steps',
    label: '步骤条',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/steps',
    props: [
      {
        name: 'active',
        title: '当前步骤对应的索引值',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'direction',
        title: '步骤条方向',
        defaultValue: 'horizontal',
        setters: 'SelectSetter',
        options: ['horizontal', 'vertical']
      },
      {
        name: 'active-icon',
        title: '当前步骤对应的底部图标',
        defaultValue: 'checked',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'inactive-icon',
        title: '非当前步骤对应的底部图标',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'finish-icon',
        title: '已完成步骤对应的底部图标，优先级高于 inactive-icon',
        setters: 'StringSetter'
      },
      {
        name: 'active-color',
        title: '当前步骤和已完成步骤的颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'inactive-color',
        title: '未激活步骤的颜色',
        defaultValue: '#969799',
        setters: 'StringSetter'
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀',
        defaultValue: 'van-icon',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'click-step',
        params: ['index']
      }
    ],
    snippet: {
      props: {
        active: 1
      },
      children: [
        {
          name: 'VanStep',
          children: '买家下单'
        },
        {
          name: 'VanStep',
          children: '商家接单'
        },
        {
          name: 'VanStep',
          children: '买家提货'
        },
        {
          name: 'VanStep',
          children: '交易完成'
        }
      ]
    },
    package: 'vant'
  },
  VanStep: {
    name: 'VanStep',
    alias: 'Step',
    label: '步骤条项',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/steps',
    slots: ['default', 'active-icon', 'inactive-icon', 'finish-icon'],
    snippet: {
      children: '步骤条项'
    },
    package: 'vant'
  },
  VanSticky: {
    name: 'VanSticky',
    alias: 'Sticky',
    label: '粘性布局',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/sticky',
    props: [
      {
        name: 'position',
        title: '吸附位置',
        defaultValue: 'top',
        setters: 'SelectSetter',
        options: ['top', 'bottom']
      },
      {
        name: 'offset-top',
        title: '吸顶时与顶部的距离，支持 px vw vh rem 单位，默认 px',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'offset-bottom',
        title: '吸底时与底部的距离，支持 px vw vh rem 单位，默认 px',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'z-index',
        title: '吸顶时的 z-index',
        defaultValue: 99,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'container',
        title: '容器对应的 HTML 节点',
        setters: 'ExpressionSetter'
      }
    ],
    events: [
      {
        name: 'change',
        params: ['isFixed']
      },
      {
        name: 'scroll',
        params: ['data']
      }
    ],
    snippet: {
      children: [
        {
          name: 'VanButton',
          props: {
            type: 'primary'
          },
          children: '基础用法'
        }
      ]
    },
    package: 'vant'
  },
  VanSwipe: {
    name: 'VanSwipe',
    alias: 'Swipe',
    label: '轮播',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/swipe',
    props: [
      {
        name: 'autoplay',
        title: '自动轮播间隔，单位为 ms',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'duration',
        title: '动画时长，单位为 ms',
        defaultValue: 500,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'initial-swipe',
        title: '初始位置索引值',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'width',
        title: '滑块宽度，单位为 px',
        defaultValue: 'auto',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'height',
        title: '滑块高度，单位为 px',
        defaultValue: 'auto',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'loop',
        title: '是否开启循环播放',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-indicators',
        title: '是否显示指示器',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'vertical',
        title: '是否为纵向滚动',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'touchable',
        title: '是否可以通过手势滑动',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'stop-propagation',
        title: '是否阻止滑动事件冒泡',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy-render',
        title: '是否延迟渲染未展示的轮播',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'indicator-color',
        title: '指示器颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'change',
        params: ['index']
      },
      {
        name: 'drag-start',
        params: ['data']
      },
      {
        name: 'drag-end',
        params: ['data']
      }
    ],
    snippet: {
      props: {
        autoplay: '3000',
        'indicator-color': 'white',
        style: {
          color: '#fff',
          fontSize: '20px',
          lineHeight: '150px',
          textAlign: 'center',
          backgroundColor: '#39a9ed'
        }
      },
      children: [
        {
          name: 'VanSwipeItem',
          children: '1'
        },
        {
          name: 'VanSwipeItem',
          children: '2'
        },
        {
          name: 'VanSwipeItem',
          children: '3'
        }
      ]
    },
    package: 'vant'
  },
  VanSwipeItem: {
    name: 'VanSwipeItem',
    alias: 'SwipeItem',
    label: '轮播项',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/swipe',
    snippet: {
      props: {
        style: {
          color: '#fff',
          fontSize: '20px',
          lineHeight: '150px',
          textAlign: 'center',
          backgroundColor: '#39a9ed'
        }
      },
      children: '1'
    },
    package: 'vant'
  },
  VanTag: {
    name: 'VanTag',
    alias: 'Tag',
    label: '标签',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/tag',
    props: [
      {
        name: 'type',
        title: '类型',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['primary', 'success', 'danger', 'warning', 'default']
      },
      {
        name: 'size',
        title: '大小',
        setters: 'SelectSetter',
        options: ['large', 'medium']
      },
      {
        name: 'color',
        title: '标签颜色',
        setters: 'StringSetter'
      },
      {
        name: 'show',
        title: '是否展示标签',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'plain',
        title: '是否为空心样式',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'round',
        title: '是否为圆角样式',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'mark',
        title: '是否为标记样式',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'text-color',
        title: '文本颜色，优先级高于 color 属性',
        defaultValue: 'white',
        setters: 'StringSetter'
      },
      {
        name: 'closeable',
        title: '是否为可关闭标签',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default'],
    events: [
      {
        name: 'click',
        params: ['event']
      },
      {
        name: 'close',
        params: ['event']
      }
    ],
    snippet: {
      props: {
        type: 'primary'
      },
      children: '标签'
    },
    package: 'vant'
  },
  VanTextEllipsis: {
    name: 'VanTextEllipsis',
    alias: 'TextEllipsis',
    label: '文本省略',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/text-ellipsis',
    props: [
      {
        name: 'rows',
        title: '展示的行数',
        defaultValue: 1,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'content',
        title: '需要展示的文本',
        setters: 'StringSetter'
      },
      {
        name: 'expand-text',
        title: '展开操作的文案',
        setters: 'StringSetter'
      },
      {
        name: 'collapse-text',
        title: '收起操作的文案',
        setters: 'StringSetter'
      },
      {
        name: 'dots',
        title: '省略号的文本内容',
        defaultValue: '...',
        setters: 'StringSetter'
      },
      {
        name: 'position',
        title: '省略位置',
        defaultValue: 'end',
        setters: 'SelectSetter',
        options: ['start', 'middle', 'end']
      }
    ],
    events: [
      {
        name: 'lick-action',
        params: ['event']
      }
    ],
    slots: ['action'],
    snippet: {
      props: {
        content: '慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。'
      }
    },
    package: 'vant'
  },
  VanWatermark: {
    name: 'VanWatermark',
    alias: 'Watermark',
    label: '水印',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/watermark',
    props: [
      {
        name: 'width',
        title: '水印宽度',
        defaultValue: 100,
        setters: 'NumberSetter'
      },
      {
        name: 'height',
        title: '水印高度',
        defaultValue: 100,
        setters: 'NumberSetter'
      },
      {
        name: 'z-index',
        title: '水印的 z-index',
        defaultValue: 100,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'content',
        title: '文字水印的内容',
        setters: 'StringSetter'
      },
      {
        name: 'image',
        title: '图片水印的内容，如果与 content 同时传入，优先使用图片水印',
        setters: 'StringSetter'
      },
      {
        name: 'rotate',
        title: '水印的旋转角度',
        defaultValue: -22,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'full-page',
        title: '水印是否全屏显示',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'gap-x',
        title: '水印之间的水平间隔',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'gap-y',
        title: '水印之间的垂直间隔',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'text-color',
        title: '文字水印的颜色',
        defaultValue: '#dcdee0',
        setters: 'StringSetter'
      },
      {
        name: 'opacity',
        title: '水印的透明度',
        setters: ['NumberSetter', 'StringSetter']
      }
    ],
    slots: ['content'],
    snippet: {
      props: {
        content: 'VTJ'
      }
    },
    package: 'vant'
  },
  VanActionBar: {
    name: 'VanActionBar',
    alias: 'ActionBar',
    label: '动作栏',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/action-bar',
    props: [
      {
        name: 'safe-area-inset-bottom',
        title: '是否开启底部安全区适配',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'placeholder',
        title: '是否在标签位置生成一个等高的占位元素',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    snippet: {
      children: [
        {
          name: 'VanActionBarIcon',
          props: {
            icon: 'chat-o',
            text: '客服'
          }
        },
        {
          name: 'VanActionBarIcon',
          props: {
            icon: 'cart-o',
            text: '购物车'
          }
        },
        {
          name: 'VanActionBarIcon',
          props: {
            icon: 'shop-o',
            text: '店铺'
          }
        },
        {
          name: 'VanActionBarButton',
          props: {
            type: 'danger',
            text: '立即购买'
          }
        }
      ]
    },
    package: 'vant'
  },
  VanActionBarIcon: {
    name: 'VanActionBarIcon',
    alias: 'ActionBarIcon',
    label: '动作栏图标',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/action-bar',
    props: [
      {
        name: 'text',
        title: '按钮文字',
        setters: 'StringSetter'
      },
      {
        name: 'icon',
        title: '图标',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'color',
        title: '图标颜色',
        defaultValue: '#323233',
        setters: 'StringSetter'
      },
      {
        name: 'icon-class',
        title: '图标额外类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
        defaultValue: 'van-icon',
        setters: 'StringSetter'
      },
      {
        name: 'dot',
        title: '是否显示图标右上角小红点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'badge',
        title: '图标右上角徽标的内容',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'badge-props',
        title: '自定义徽标的属性，传入的对象会被透传给 Badge 组件的 props',
        setters: 'ObjectSetter'
      },
      {
        name: 'url',
        title: '点击后跳转的链接地址',
        setters: 'StringSetter'
      },
      {
        name: 'to',
        title: '点击后跳转的目标路由对象，等同于 Vue Router 的 to 属性',
        setters: ['StringSetter', 'ObjectSetter']
      },
      {
        name: 'replace',
        title: '是否在跳转时替换当前页面历史',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default', 'icon'],
    snippet: {
      props: {
        icon: 'chat-o',
        text: '客服'
      }
    },
    package: 'vant'
  },
  VanActionBarButton: {
    name: 'VanActionBarButton',
    alias: 'ActionBarButton',
    label: '动作栏按钮',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/action-bar',
    props: [
      {
        name: 'text',
        title: '按钮文字',
        setters: 'StringSetter'
      },
      {
        name: 'type',
        title: '按钮类型',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'primary', 'success', 'warning', 'danger']
      },
      {
        name: 'color',
        title: '按钮颜色，支持传入 linear-gradient 渐变色',
        setters: 'StringSetter'
      },
      {
        name: 'icon',
        title: '左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'disabled',
        title: '是否禁用按钮',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        title: '是否显示为加载状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'url',
        title: '点击后跳转的链接地址',
        setters: 'StringSetter'
      },
      {
        name: 'to',
        title: '点击后跳转的目标路由对象，等同于 Vue Router 的 to 属性',
        setters: ['StringSetter', 'ObjectSetter']
      },
      {
        name: 'replace',
        title: '是否在跳转时替换当前页面历史',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    snippet: {
      props: {
        type: 'danger',
        text: '立即购买'
      }
    },
    package: 'vant'
  },
  VanBackTop: {
    name: 'VanBackTop',
    alias: 'BackTop',
    label: '回到顶部',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/back-top',
    props: [
      {
        name: 'target',
        title:
          '触发滚动的目标对象，支持传入选择器或 DOM 元素，默认最近的父级滚动容器',
        setters: ['StringSetter', 'ExpressionSetter']
      },
      {
        name: 'right',
        title: '距离页面右侧的距离，默认单位为 px',
        defaultValue: 30,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'bottom',
        title: '距离页面底部的距离，默认单位为 px',
        defaultValue: 40,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'offset',
        title: '滚动高度达到此参数值时才显示组件',
        defaultValue: 200,
        setters: 'NumberSetter'
      },
      {
        name: 'teleport',
        title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
        defaultValue: 'body',
        setters: ['StringSetter', 'ExpressionSetter']
      },
      {
        name: 'immediate',
        title: '是否瞬间滚动到顶部',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'z-index',
        title: '设置组件的 z-index 层级',
        defaultValue: 100,
        setters: ['NumberSetter', 'StringSetter']
      }
    ],
    events: [
      {
        name: 'click',
        params: ['event']
      }
    ],
    slots: ['default'],
    package: 'vant'
  },
  VanGrid: {
    name: 'VanGrid',
    alias: 'Grid',
    label: '宫格',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/grid',
    props: [
      {
        name: 'column-num',
        title: '列数',
        defaultValue: 4,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'icon-size',
        title: '图标大小，默认单位为px',
        defaultValue: 28,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'gutter',
        title: '格子之间的间距，默认单位为px',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'border',
        title: '是否显示边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'center',
        title: '是否将格子内容居中显示',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'square',
        title: '是否将格子固定为正方形',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'clickable',
        title: '是否开启格子点击反馈',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'direction',
        title: '格子内容排列的方向',
        defaultValue: 'vertical',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal']
      },
      {
        name: 'reverse',
        title: '是否调换图标和文本的位置',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    snippet: {
      children: [
        {
          name: 'VanGridItem',
          props: {
            icon: 'photo-o',
            text: '文字'
          },
          directives: [
            {
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value: '8'
              }
            }
          ]
        }
      ]
    },
    package: 'vant'
  },
  VanGridItem: {
    name: 'VanGridItem',
    alias: 'GridItem',
    label: '宫格项',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/grid',
    props: [
      {
        name: 'text',
        title: '文字',
        setters: 'StringSetter'
      },
      {
        name: 'icon',
        title: '图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
        defaultValue: 'van-icon',
        setters: 'StringSetter'
      },
      {
        name: 'icon-color',
        title: '图标颜色，等同于 Icon 组件的 color 属性',
        setters: 'StringSetter'
      },
      {
        name: 'dot',
        title: '是否显示图标右上角小红点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'badge',
        title: '图标右上角徽标的内容',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'badge-props',
        title: '自定义徽标的属性，传入的对象会被透传给 Badge 组件的 props',
        setters: 'ObjectSetter'
      },
      {
        name: 'url',
        title: '点击后跳转的链接地址',
        setters: 'StringSetter'
      },
      {
        name: 'to',
        title: '点击后跳转的目标路由对象，等同于 Vue Router 的 to 属性',
        setters: ['StringSetter', 'ObjectSetter']
      },
      {
        name: 'replace',
        title: '是否在跳转时替换当前页面历史',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'click',
        params: ['event']
      }
    ],
    slots: ['default', 'icon', 'text'],
    snippet: {
      props: {
        icon: 'photo-o',
        text: '文字'
      }
    },
    package: 'vant'
  },
  VanIndexBar: {
    name: 'VanIndexBar',
    alias: 'IndexBar',
    label: '索引栏',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/index-bar',
    props: [
      {
        name: 'index-list',
        title: '索引字符列表',
        setters: 'ArraySetter'
      },
      {
        name: 'z-index',
        title: 'z-index 层级',
        defaultValue: 1,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'sticky',
        title: '是否开启锚点自动吸顶',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'sticky-offset-top',
        title: '锚点自动吸顶时与顶部的距离',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'highlight-color',
        title: '索引字符高亮颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'teleport',
        title: '指定索引栏挂载的节点',
        setters: ['StringSetter', 'ExpressionSetter']
      }
    ],
    events: [
      {
        name: 'select',
        params: ['index']
      },
      {
        name: 'change',
        params: ['index']
      }
    ],
    snippet: {
      children: [
        {
          name: 'VanIndexAnchor',
          props: {
            index: 'A'
          }
        },
        {
          name: 'VanCell',
          props: {
            title: '文本'
          }
        },
        {
          name: 'VanCell',
          props: {
            title: '文本'
          }
        },
        {
          name: 'VanCell',
          props: {
            title: '文本'
          }
        },
        {
          name: 'VanIndexAnchor',
          props: {
            index: 'B'
          }
        },
        {
          name: 'VanCell',
          props: {
            title: '文本'
          }
        },
        {
          name: 'VanCell',
          props: {
            title: '文本'
          }
        },
        {
          name: 'VanCell',
          props: {
            title: '文本'
          }
        }
      ]
    },
    package: 'vant'
  },
  VanIndexAnchor: {
    name: 'VanIndexAnchor',
    alias: 'IndexAnchor',
    label: '索引栏锚点',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/index-bar',
    props: [
      {
        name: 'index',
        title: '索引字符',
        setters: ['StringSetter', 'NumberSetter']
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        index: 'C'
      }
    },
    package: 'vant'
  },
  VanNavBar: {
    name: 'VanNavBar',
    alias: 'NavBar',
    label: '导航栏',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/nav-bar',
    props: [
      {
        name: 'title',
        title: '标题',
        defaultValue: '""',
        setters: 'StringSetter'
      },
      {
        name: 'left-text',
        title: '左侧文案',
        defaultValue: '""',
        setters: 'StringSetter'
      },
      {
        name: 'right-text',
        title: '右侧文案',
        defaultValue: '""',
        setters: 'StringSetter'
      },
      {
        name: 'left-disabled',
        title: '是否禁用左侧按钮，禁用时透明度降低，且无法点击',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'right-disabled',
        title: '是否禁用右侧按钮，禁用时透明度降低，且无法点击',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'left-arrow',
        title: '是否显示左侧箭头',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        title: '是否显示下边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'fixed',
        title: '是否固定在顶部',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'placeholder',
        title: '固定在顶部时，是否在标签位置生成一个等高的占位元素',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'z-index',
        title: '导航栏 z-index',
        defaultValue: 1,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'safe-area-inset-top',
        title: '是否开启顶部安全区适配',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'clickable',
        title: '是否开启两侧按钮的点击反馈',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'click-left',
        params: ['event']
      },
      {
        name: 'click-right',
        params: ['event']
      }
    ],
    slots: ['title', 'left', 'right'],
    snippet: {
      props: {
        title: ' 标题'
      }
    },
    package: 'vant'
  },
  VanPagination: {
    name: 'VanPagination',
    alias: 'Pagination',
    label: '分页',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/pagination',
    props: [
      {
        name: 'modelValue',
        title: '当前页码',
        setters: 'NumberSetter'
      },
      {
        name: 'mode',
        title: '显示模式',
        defaultValue: 'multi',
        setters: 'SelectSetter',
        options: ['simple', 'multi']
      },
      {
        name: 'prev-text',
        title: '上一页按钮文字',
        defaultValue: '上一页',
        setters: 'StringSetter'
      },
      {
        name: 'next-text',
        title: '下一页按钮文字',
        defaultValue: '下一页',
        setters: 'StringSetter'
      },
      {
        name: 'page-count',
        title: '总页数',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'total-items',
        title: '总记录数',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'items-per-page',
        title: '每页记录数',
        defaultValue: 10,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'show-page-size',
        title: '显示的页码个数',
        defaultValue: 5,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'force-ellipses',
        title: '是否显示省略号',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-prev-button',
        title: '是否展示上一页按钮',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-next-button',
        title: '是否展示下一页按钮',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: ['update:modelValue', 'change'],
    slots: ['page', 'prev-text', 'next-text'],
    snippet: {
      props: {
        modelValue: 1,
        'total-items': 24,
        'items-per-page': 5
      }
    },
    package: 'vant'
  },
  VanSidebar: {
    name: 'VanSidebar',
    alias: 'Sidebar',
    label: '侧边导航',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/sidebar',
    props: [
      {
        name: 'modelValue',
        title: '当前导航项的索引',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      }
    ],
    events: ['update:modelValue', 'change'],
    snippet: {
      props: {
        modelValue: 0
      },
      children: [
        {
          name: 'VanSidebarItem',
          props: {
            title: '标签名称'
          }
        },
        {
          name: 'VanSidebarItem',
          props: {
            title: '标签名称'
          }
        },
        {
          name: 'VanSidebarItem',
          props: {
            title: '标签名称'
          }
        }
      ]
    },
    package: 'vant'
  },
  VanSidebarItem: {
    name: 'VanSidebarItem',
    alias: 'SidebarItem',
    label: '侧边导航项',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/sidebar',
    props: [
      {
        name: 'title',
        title: '内容',
        defaultValue: '""',
        setters: 'StringSetter'
      },
      {
        name: 'dot',
        title: '是否显示右上角小红点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'badge',
        title: '图标右上角徽标的内容',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'badge-props',
        title: '自定义徽标的属性，传入的对象会被透传给 Badge 组件的 props',
        setters: 'ObjectSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用该项',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'url',
        title: '点击后跳转的链接地址',
        setters: 'StringSetter'
      },
      {
        name: 'to',
        title: '点击后跳转的目标路由对象，等同于 Vue Router 的 to 属性',
        setters: ['StringSetter', 'ObjectSetter']
      },
      {
        name: 'replace',
        title: '是否在跳转时替换当前页面历史',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['click'],
    slots: ['title'],
    snippet: {
      props: {
        title: '标签名称'
      }
    },
    package: 'vant'
  },
  VanTabs: {
    name: 'VanTabs',
    alias: 'Tabs',
    label: '标签页',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/tap',
    props: [
      {
        name: 'active',
        title: '绑定当前选中标签的标识符',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'type',
        title: '样式风格类型，可选值为 card',
        defaultValue: 'line',
        setters: 'SelectSetter',
        options: ['line', 'card']
      },
      {
        name: 'color',
        title: '标签主题色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'background',
        title: '标签栏背景色',
        defaultValue: 'white',
        setters: 'StringSetter'
      },
      {
        name: 'duration',
        title: '动画时间，单位秒，设置为 0 可以禁用动画',
        defaultValue: 0.3,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'line-width',
        title: '底部条宽度，默认单位 px',
        defaultValue: 40,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'line-height',
        title: '底部条高度，默认单位 px',
        defaultValue: 3,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'animated',
        title:
          '是否开启切换标签内容时的转场动画（开启该属性后，内容区如果有粘性布局将会不达预期）',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        title: '是否显示标签栏外边框，仅在 type="line" 时有效',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'ellipsis',
        title:
          '是否省略过长的标题文字（仅在 shrink 为 false 且 tab 数量小于等于 swipe-threshold 时生效）',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'sticky',
        title: '是否使用粘性布局',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'shrink',
        title: '是否开启左侧收缩布局',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'swipeable',
        title:
          '是否开启手势左右滑动切换（开启该属性后，内容区如果有粘性布局将会不达预期）',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy-render',
        title: '是否开启延迟渲染（首次切换到标签时才触发内容渲染）',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'scrollspy',
        title: '是否开启滚动导航',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-header',
        title: '是否显示标题栏',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'offset-top',
        title: '粘性布局下吸顶时与顶部的距离，支持 px vw vh rem 单位，默认 px',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'swipe-threshold',
        title:
          '滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动（仅在 shrink 为 false 且 ellipsis 为 true 时生效）',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'title-active-color',
        title: '标题选中态颜色',
        setters: 'StringSetter'
      },
      {
        name: 'title-inactive-color',
        title: '标题默认态颜色',
        setters: 'StringSetter'
      },
      {
        name: 'before-change',
        title: '切换标签前的回调函数，返回 false 可阻止切换，支持返回 Promise',
        setters: 'FunctionSetter'
      }
    ],
    events: [
      {
        name: 'update:active'
      },
      {
        name: 'click-tab',
        params: ['data']
      },
      {
        name: 'change',
        params: ['name', 'title']
      },
      {
        name: 'rendered',
        params: ['name', 'title']
      },
      {
        name: 'scroll',
        params: ['data']
      }
    ],
    slots: ['default', 'nav-left', 'nav-right', 'nav-bottom'],
    snippet: {
      props: {
        active: 0
      },
      children: [
        {
          name: 'VanTab',
          props: {
            title: '内容1'
          },
          children: '标题1'
        },
        {
          name: 'VanTab',
          props: {
            title: '内容2'
          },
          children: '标题2'
        },
        {
          name: 'VanTab',
          props: {
            title: '内容3'
          },
          children: '标题3'
        }
      ]
    },
    package: 'vant'
  },
  VanTab: {
    name: 'VanTab',
    alias: 'Tab',
    label: '标签页项',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/tap',
    props: [
      {
        name: 'title',
        title: '标题',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用标签',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'dot',
        title: '是否在标题右上角显示小红点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'badge',
        title: '图标右上角徽标的内容（dot 为 fasle 时生效）',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'name',
        title: '标签名称，作为匹配的标识符',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'url',
        title: '点击后跳转的链接地址',
        setters: 'StringSetter'
      },
      {
        name: 'to',
        title: '点击后跳转的目标路由对象，等同于 Vue Router 的 to 属性',
        setters: ['StringSetter', 'ObjectSetter']
      },
      {
        name: 'replace',
        title: '是否在跳转时替换当前页面历史',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'title-style',
        title: '自定义标题样式',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'title-class',
        title: '自定义标题类名',
        setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
      },
      {
        name: 'show-zero-badge',
        title: '当 badge 为数字 0 时，是否展示徽标',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default', 'title'],
    snippet: {
      props: {
        title: '内容-标题项'
      },
      children: '内容-标题项'
    },
    package: 'vant'
  },
  VanTabbar: {
    name: 'VanTabbar',
    alias: 'Tabbar',
    label: '标签栏',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/tabbar',
    props: [
      {
        name: 'modelValue',
        title: '当前选中标签的名称或索引值',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'fixed',
        title: '是否固定在底部',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        title: '是否显示外边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'z-index',
        title: '元素 z-index',
        defaultValue: 1,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'active-color',
        title: '选中标签的颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'inactive-color',
        title: '未选中标签的颜色',
        defaultValue: '#7d7e80',
        setters: 'StringSetter'
      },
      {
        name: 'route',
        title: '是否开启路由模式',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'placeholder',
        title: '固定在底部时，是否在标签位置生成一个等高的占位元素',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'safe-area-inset-bottom',
        title: '是否开启底部安全区适配，设置 fixed 时默认开启',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'before-change',
        title: '切换标签前的回调函数，返回 false 可阻止切换，支持返回 Promise',
        setters: 'FunctionSetter'
      }
    ],
    events: ['update:modelValue', 'change'],
    snippet: {
      props: {
        modelValue: 0
      },
      children: [
        {
          name: 'VanTabbarItem',
          props: {
            icon: 'home-o'
          },
          children: 'home'
        },
        {
          name: 'VanTabbarItem',
          props: {
            icon: 'search'
          },
          children: 'search'
        },
        {
          name: 'VanTabbarItem',
          props: {
            icon: 'friends-o'
          },
          children: 'friends'
        },
        {
          name: 'VanTabbarItem',
          props: {
            icon: 'setting-o'
          },
          children: 'setting'
        }
      ]
    },
    package: 'vant'
  },
  VanTabbarItem: {
    name: 'VanTabbarItem',
    alias: 'TabbarItem',
    label: '标签栏项',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/tabbar',
    props: [
      {
        name: 'name',
        title: '标签名称，作为匹配的标识符',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'icon',
        title: '图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
        defaultValue: 'van-icon',
        setters: 'StringSetter'
      },
      {
        name: 'dot',
        title: '是否显示图标右上角小红点',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'badge',
        title: '图标右上角徽标的内容',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'badge-props',
        title: '自定义徽标的属性，传入的对象会被透传给 Badge 组件的 props',
        setters: 'ObjectSetter'
      },
      {
        name: 'url',
        title: '点击后跳转的链接地址',
        setters: 'StringSetter'
      },
      {
        name: 'to',
        title: '点击后跳转的目标路由对象，等同于 Vue Router 的 to 属性',
        setters: ['StringSetter', 'ObjectSetter']
      },
      {
        name: 'replace',
        title: '是否在跳转时替换当前页面历史',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['icon'],
    snippet: {
      props: {
        icon: 'home-o'
      },
      children: 'home'
    },
    package: 'vant'
  },
  VanTreeSelect: {
    name: 'VanTreeSelect',
    alias: 'TreeSelect',
    label: '分类选择',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/tree-select',
    props: [
      {
        name: 'main-active-index',
        title: '左侧选中项的索引',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'active-id',
        title: '右侧选中项的 id，支持传入数组',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter', 'ArraySetter']
      },
      {
        name: 'items',
        title: '分类显示所需的数据',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'height',
        title: '高度，默认单位为px',
        defaultValue: 300,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'max',
        title: '右侧项最大选中个数',
        defaultValue: null,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'selected-icon',
        title: '自定义右侧栏选中状态的图标',
        defaultValue: 'success',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'update:main-active-index'
      },
      {
        name: 'update:active-id'
      },
      {
        name: 'click-nav',
        params: ['index']
      },
      {
        name: 'click-item',
        params: ['item']
      }
    ],
    slots: ['nav-text', 'content'],
    snippet: {
      props: {
        'active-id': 1,
        items: [
          {
            text: '浙江',
            children: [
              {
                text: '杭州',
                id: 1
              },
              {
                text: '温州',
                id: 2
              },
              {
                text: '宁波',
                id: 3,
                disabled: true
              }
            ]
          },
          {
            text: '江苏',
            children: [
              {
                text: '南京',
                id: 4
              },
              {
                text: '无锡',
                id: 5
              },
              {
                text: '徐州',
                id: 6
              }
            ]
          },
          {
            text: '福建',
            disabled: true
          }
        ]
      }
    },
    package: 'vant'
  },
  VanAddressEdit: {
    name: 'VanAddressEdit',
    alias: 'AddressEdit',
    label: '地址编辑',
    categoryId: 'business',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/address-edit',
    props: [
      {
        name: 'area-list',
        title: '地区列表',
        setters: 'ObjectSetter'
      },
      {
        name: 'area-columns-placeholder',
        title: '地区选择列占位提示文字',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'area-placeholder',
        title: '地区输入框占位提示文字',
        defaultValue: '选择省 / 市 / 区',
        setters: 'StringSetter'
      },
      {
        name: 'address-info',
        title: '地址信息初始值',
        defaultValue: {},
        setters: 'ObjectSetter'
      },
      {
        name: 'search-result',
        title: '详细地址搜索结果',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'show-delete',
        title: '是否显示删除按钮',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-set-default',
        title: '是否显示默认地址栏',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-search-result',
        title: '是否显示搜索结果',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-area',
        title: '是否显示地区',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-detail',
        title: '是否显示详细地址',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'disable-area',
        title: '是否禁用地区选择',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'save-button-text',
        title: '保存按钮文字',
        defaultValue: '保存',
        setters: 'StringSetter'
      },
      {
        name: 'delete-button-text',
        title: '删除按钮文字',
        defaultValue: '删除',
        setters: 'StringSetter'
      },
      {
        name: 'detail-rows',
        title: '详细地址输入框行数',
        defaultValue: 1,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'detail-maxlength',
        title: '详细地址最大长度',
        defaultValue: 200,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'is-saving',
        title: '是否显示保存按钮加载动画',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'is-deleting',
        title: '是否显示删除按钮加载动画',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'tel-validator',
        title: '手机号格式校验函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'tel-maxlength',
        title: '手机号最大长度',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'validator',
        title: '自定义校验函数',
        setters: 'FunctionSetter'
      }
    ],
    events: [
      {
        name: 'save',
        params: ['info']
      },
      {
        name: 'focus',
        params: ['key']
      },
      {
        name: 'change',
        params: ['data']
      },
      {
        name: 'delete',
        params: ['info']
      },
      {
        name: 'select-search',
        params: ['value']
      },
      {
        name: 'click-area'
      },
      {
        name: 'change-area',
        params: ['selectedOptions']
      },
      {
        name: 'change-detail',
        params: ['value']
      },
      {
        name: 'change-default',
        params: ['checked']
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        'show-delete': true,
        'show-set-default': true,
        'show-search-result': true,
        'area-list': [],
        'area-columns-placeholder': ['请选择', '请选择', '请选择'],
        'search-result': [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }
        ]
      }
    },
    package: 'vant'
  },
  VanAddressList: {
    name: 'VanAddressList',
    alias: 'AddressList',
    label: '地址列表',
    categoryId: 'business',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/address-list',
    props: [
      {
        name: 'modelValue',
        title: '当前选中地址的 id，支持多选（类型为 []）',
        setters: ['NumberSetter', 'StringSetter', 'ArraySetter']
      },
      {
        name: 'list',
        title: '地址列表',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'disabled-list',
        title: '不可配送地址列表',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'disabled-text',
        title: '不可配送提示文案',
        setters: 'StringSetter'
      },
      {
        name: 'switchable',
        title: '是否允许切换地址',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'show-add-button',
        title: '是否显示底部按钮',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'add-button-text',
        title: '底部按钮文字',
        defaultValue: '\t新增地址',
        setters: 'StringSetter'
      },
      {
        name: 'default-tag-text',
        title: '默认地址标签文字',
        setters: 'StringSetter'
      },
      {
        name: 'right-icon',
        title: '右侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
        defaultValue: 'edit',
        setters: ['VanIconSetter', 'StringSetter']
      }
    ],
    events: [
      {
        name: 'update:modelValue'
      },
      {
        name: 'add',
        params: ['item', 'index']
      },
      {
        name: 'edit',
        params: ['item', 'index']
      },
      {
        name: 'select',
        params: ['item', 'index']
      },
      {
        name: 'edit-disabled',
        params: ['item', 'index']
      },
      {
        name: 'select-disabled',
        params: ['item', 'index']
      },
      {
        name: 'click-item',
        params: ['item', 'index', 'data']
      }
    ],
    slots: ['default', 'top', 'item-bottom', 'tag'],
    snippet: {
      props: {
        'disabled-text': '以下地址超出配送范围',
        'default-tag-text': '默认',
        modelValue: 1,
        list: [
          {
            id: '1',
            name: '张三',
            tel: '13000000000',
            address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
            isDefault: true
          },
          {
            id: '2',
            name: '李四',
            tel: '1310000000',
            address: '浙江省杭州市拱墅区莫干山路 50 号'
          }
        ],
        disabledList: [
          {
            id: '3',
            name: '王五',
            tel: '1320000000',
            address: '浙江省杭州市滨江区江南大道 15 号'
          }
        ]
      }
    },
    package: 'vant'
  },
  VanArea: {
    name: 'VanArea',
    alias: 'Area',
    label: '省市区选择',
    categoryId: 'business',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/area',
    props: [
      {
        name: 'modelValue',
        title: '当前选中项对应的地区码',
        setters: 'StringSetter'
      },
      {
        name: 'title',
        title: '顶部栏标题',
        setters: 'StringSetter'
      },
      {
        name: 'confirm-button-text',
        title: '确认按钮文字',
        defaultValue: '确认',
        setters: 'StringSetter'
      },
      {
        name: 'cancel-button-text',
        title: '取消按钮文字',
        defaultValue: '取消',
        setters: 'StringSetter'
      },
      {
        name: 'area-list',
        title: '省市区数据',
        setters: 'ObjectSetter'
      },
      {
        name: 'columns-placeholder',
        title: '列占位提示文字',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'loading',
        title: '是否显示加载状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'readonly',
        title: '是否为只读状态，只读状态下无法切换选项',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'option-height',
        title: '选项高度，支持 px vw vh rem 单位，默认 px',
        defaultValue: 44,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'columns-num',
        title: '显示列数，3-省市区，2-省市，1-省',
        defaultValue: 3,
        setters: 'SelectSetter',
        options: [
          {
            label: '1',
            value: 1
          },
          {
            label: '2',
            value: 2
          },
          {
            label: '3',
            value: 3
          }
        ]
      },
      {
        name: 'visible-option-num',
        title: '可见的选项个数',
        defaultValue: 6,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'swipe-duration',
        title: '快速滑动时惯性滚动的时长，单位 ms',
        defaultValue: 1000,
        setters: ['NumberSetter', 'StringSetter']
      }
    ],
    events: [
      {
        name: 'update:modelValue'
      },
      {
        name: 'confirm',
        params: ['data']
      },
      {
        name: 'cancel',
        params: ['data']
      },
      {
        name: 'change',
        params: ['data']
      }
    ],
    slots: [
      'toolbar',
      'title',
      'confirm',
      'cancel',
      'columns-top',
      'columns-bottom'
    ],
    snippet: {
      props: {
        title: '标题',
        'area-list': {
          province_list: {
            '110000': '北京市',
            '120000': '天津市'
          },
          city_list: {
            '110100': '北京市',
            '120100': '天津市'
          },
          county_list: {
            '110101': '东城区',
            '110102': '西城区'
          }
        }
      }
    },
    package: 'vant'
  },
  VanCard: {
    name: 'VanCard',
    alias: 'Card',
    label: '卡片',
    categoryId: 'business',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/card',
    props: [
      {
        name: 'thumb',
        title: '左侧图片 URL',
        setters: 'StringSetter'
      },
      {
        name: 'title',
        title: '标题',
        setters: 'StringSetter'
      },
      {
        name: 'desc',
        title: '描述',
        setters: 'StringSetter'
      },
      {
        name: 'tag',
        title: '图片角标',
        setters: 'StringSetter'
      },
      {
        name: 'num',
        title: '商品数量',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'price',
        title: '商品价格',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'origin-price',
        title: '商品划线原价',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'centered',
        title: '内容是否垂直居中',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'currency',
        title: '货币符号',
        defaultValue: '￥',
        setters: 'StringSetter'
      },
      {
        name: 'thumb-link',
        title: '点击左侧图片后跳转的链接地址',
        setters: 'StringSetter'
      },
      {
        name: 'lazy-load',
        title: '是否开启图片懒加载，须配合 Lazyload 组件使用',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'click',
        params: ['event']
      },
      {
        name: 'click-thumb',
        params: ['event']
      }
    ],
    slots: [
      'title',
      'desc',
      'num',
      'price',
      'origin-price',
      'price-top',
      'bottom',
      'thumb',
      'tag',
      'tags',
      'footer'
    ],
    snippet: {
      props: {
        num: 2,
        price: '2.00',
        desc: '描述信息',
        title: '商品标题',
        thumb: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
      }
    },
    package: 'vant'
  },
  VanContactCard: {
    name: 'VanContactCard',
    alias: 'ContactCard',
    label: '联系人卡片',
    categoryId: 'business',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/contact-card',
    props: [
      {
        name: 'type',
        title: '卡片类型',
        defaultValue: 'add',
        setters: 'SelectSetter',
        options: ['add', 'edit']
      },
      {
        name: 'name',
        title: '联系人姓名',
        setters: 'StringSetter'
      },
      {
        name: 'tel',
        title: '联系人手机号',
        setters: 'StringSetter'
      },
      {
        name: 'add-text',
        title: '添加时的文案提示',
        defaultValue: '添加联系人',
        setters: 'StringSetter'
      },
      {
        name: 'editable',
        title: '是否可以编辑联系人',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'click',
        params: ['event']
      }
    ],
    snippet: {},
    package: 'vant'
  },
  VanContactEdit: {
    name: 'VanContactEdit',
    alias: 'ContactEdit',
    label: '联系人编辑',
    categoryId: 'business',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/contact-edit',
    props: [
      {
        name: 'contact-info',
        title: '联系人信息',
        defaultValue: {},
        setters: 'ObjectSetter'
      },
      {
        name: 'is-edit',
        title: '是否为编辑联系人',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'is-saving',
        title: '是否显示保存按钮加载动画',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'is-deleting',
        title: '是否显示删除按钮加载动画',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'tel-validator',
        title: '手机号格式校验函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'show-set-default',
        title: '是否显示默认联系人栏',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'set-default-label',
        title: '默认联系人栏文案',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'save',
        params: ['content']
      },
      {
        name: 'delete',
        params: ['content']
      },
      {
        name: 'change-default',
        params: ['checked']
      }
    ],
    snippet: {
      props: {
        'is-edit': true,
        'show-set-default': true,
        'contact-info': {
          tel: '',
          name: ''
        },
        'set-default-label': '设为默认联系人'
      }
    },
    package: 'vant'
  },
  VanContactList: {
    name: 'VanContactList',
    alias: 'ContactList',
    label: '联系人列表',
    categoryId: 'business',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/contact-list',
    props: [
      {
        name: 'modelValue',
        title: '当前选中联系人的 id',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'list',
        title: '联系人列表',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'add-text',
        title: '新建按钮文案',
        defaultValue: '新建联系人',
        setters: 'StringSetter'
      },
      {
        name: 'default-tag-text',
        title: '默认联系人标签文案',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'add'
      },
      {
        name: 'edit',
        params: ['contact', 'index']
      },
      {
        name: 'select',
        params: ['contact', 'index']
      },
      {
        name: 'update:modelValue'
      }
    ],
    snippet: {
      props: {
        modelValue: '1',
        list: [
          {
            id: '1',
            name: '张三',
            tel: '13000000000',
            isDefault: true
          },
          {
            id: '2',
            name: '李四',
            tel: '1310000000'
          }
        ],
        'default-tag-text': '默认'
      }
    },
    package: 'vant'
  },
  VanCouponList: {
    name: 'VanCouponList',
    alias: 'CouponList',
    label: '优惠券列表',
    categoryId: 'business',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/coupon',
    props: [
      {
        name: 'code',
        title: '当前输入的兑换码',
        setters: 'StringSetter'
      },
      {
        name: 'chosen-coupon',
        title: '当前选中优惠券的索引,支持多选',
        defaultValue: -1,
        setters: ['NumberSetter', 'ArraySetter']
      },
      {
        name: 'coupons',
        title: '可用优惠券列表',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'disabled-coupons',
        title: '不可用优惠券列表',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'enabled-title',
        title: '可用优惠券列表标题',
        defaultValue: '可使用优惠券',
        setters: 'StringSetter'
      },
      {
        name: 'disabled-title',
        title: '不可用优惠券列表标题',
        defaultValue: '不可使用优惠券',
        setters: 'StringSetter'
      },
      {
        name: 'exchange-button-text',
        title: '兑换按钮文字',
        defaultValue: '兑换',
        setters: 'StringSetter'
      },
      {
        name: 'exchange-button-loading',
        title: '是否显示兑换按钮加载动画',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'exchange-button-disabled',
        title: '是否禁用兑换按钮',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'exchange-min-length',
        title: '兑换码最小长度',
        defaultValue: 1,
        setters: 'NumberSetter'
      },
      {
        name: 'displayed-coupon-index',
        title: '滚动至特定优惠券位置',
        setters: 'NumberSetter'
      },
      {
        name: 'show-close-button',
        title: '是否显示列表底部按钮',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-button-text',
        title: '列表底部按钮文字',
        defaultValue: '不使用优惠',
        setters: 'StringSetter'
      },
      {
        name: 'input-placeholder',
        title: '输入框文字提示',
        defaultValue: '请输入优惠码',
        setters: 'StringSetter'
      },
      {
        name: 'show-exchange-bar',
        title: '是否展示兑换栏',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'currency',
        title: '货币符号',
        defaultValue: '￥',
        setters: 'StringSetter'
      },
      {
        name: 'empty-image',
        title: '列表为空时的占位图',
        setters: 'StringSetter'
      },
      {
        name: 'show-count',
        title: '是否展示可用 / 不可用数量',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'change',
        params: ['index']
      },
      {
        name: 'exchange',
        params: ['code']
      }
    ],
    slots: ['list-footer', 'disabled-list-footer', 'list-button'],
    snippet: {
      props: {
        coupons: [
          {
            available: 1,
            condition: '无门槛\n最多优惠12元',
            reason: '',
            value: 150,
            name: '优惠券名称',
            startAt: 1489104000,
            endAt: 1514592000,
            valueDesc: '1.5',
            unitDesc: '元'
          }
        ],
        'chosen-coupon': -1,
        'disabled-coupons': [
          {
            available: 1,
            condition: '无门槛\n最多优惠12元',
            reason: '',
            value: 150,
            name: '优惠券名称',
            startAt: 1489104000,
            endAt: 1514592000,
            valueDesc: '1.5',
            unitDesc: '元'
          }
        ]
      }
    },
    package: 'vant'
  },
  VanCouponCell: {
    name: 'VanCouponCell',
    alias: 'CouponCell',
    label: '优惠券单元格',
    categoryId: 'business',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/coupon',
    props: [
      {
        name: 'title',
        title: '单元格标题',
        defaultValue: '优惠券',
        setters: 'StringSetter'
      },
      {
        name: 'chosen-coupon',
        title: '当前选中优惠券的索引',
        defaultValue: -1,
        setters: ['NumberSetter', 'ArraySetter']
      },
      {
        name: 'coupons',
        title: '可用优惠券列表',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'editable',
        title: '能否切换优惠券',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        title: '是否显示内边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'currency',
        title: '货币符号',
        defaultValue: '￥',
        setters: 'StringSetter'
      }
    ],
    snippet: {
      props: {
        coupons: [
          {
            available: 1,
            condition: '无门槛\n最多优惠12元',
            reason: '',
            value: 150,
            name: '优惠券名称',
            startAt: 1489104000,
            endAt: 1514592000,
            valueDesc: '1.5',
            unitDesc: '元'
          }
        ],
        'chosen-coupon': -1
      }
    },
    package: 'vant'
  },
  VanSubmitBar: {
    name: 'VanSubmitBar',
    alias: 'SubmitBar',
    label: '提交订单栏',
    categoryId: 'business',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/submit-bar',
    props: [
      {
        name: 'price',
        title: '金额（单位分）',
        setters: 'NumberSetter'
      },
      {
        name: 'decimal-length',
        title: '金额小数点位数',
        defaultValue: 2,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'label',
        title: '金额左侧文案',
        defaultValue: '\t合计：',
        setters: 'StringSetter'
      },
      {
        name: 'suffix-label',
        title: '金额右侧文案',
        setters: 'StringSetter'
      },
      {
        name: 'text-align',
        title: '金额文案对齐方向，可选值为 left',
        defaultValue: 'right',
        setters: 'SelectSetter',
        options: ['left', 'right']
      },
      {
        name: 'button-text',
        title: '按钮文字',
        setters: 'StringSetter'
      },
      {
        name: 'button-type',
        title: '按钮类型',
        defaultValue: 'danger',
        setters: 'StringSetter'
      },
      {
        name: 'button-color',
        title: '自定义按钮颜色',
        setters: 'StringSetter'
      },
      {
        name: 'tip',
        title: '\t在订单栏上方的提示文案',
        setters: 'StringSetter'
      },
      {
        name: 'tip-icon',
        title: '提示文案左侧的图标名称或图片链接，等同于 Icon 组件的 name 属性',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'currency',
        title: '货币符号',
        defaultValue: '￥',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用按钮',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        title: '是否显示将按钮显示为加载中状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'safe-area-inset-bottom',
        title: '是否开启底部安全区适配',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'placeholder',
        title: '是否在标签位置生成一个等高的占位元素',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['submit'],
    slots: ['default', 'button', 'top', 'tip'],
    snippet: {
      props: {
        price: 3050,
        'button-text': '提交订单'
      }
    },
    package: 'vant'
  }
};
