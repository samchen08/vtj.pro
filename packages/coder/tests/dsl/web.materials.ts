export const webMaterials = {
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
        src: '/@fs/Users/chc/Code/vtj/packages/designer/src/assets/logo.png',
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
  XTest: {
    name: 'XTest',
    label: '测试组件',
    categoryId: 'test',
    props: [
      {
        name: 'booleanProp',
        label: '布尔值',
        setters: 'BooleanSetter',
        title: '提示说明文本',
        defaultValue: true
      },
      {
        name: 'stringProp',
        setters: 'StringSetter'
      },
      {
        name: 'numberProp',
        setters: 'NumberSetter'
      },
      {
        name: 'selectProp',
        setters: 'SelectSetter',
        defaultValue: 'default',
        options: ['default', 'primary', 'success', 'warning', 'danger', 'info']
      },
      {
        name: 'objectProp',
        setters: 'ObjectSetter'
      },
      {
        name: 'arrayProp',
        setters: 'ArraySetter'
      },
      {
        name: 'iconProp',
        setters: 'IconSetter'
      },
      {
        name: 'colorProp',
        setters: 'ColorSetter'
      },
      {
        name: 'modelValue',
        setters: 'StringSetter'
      },
      {
        name: 'syncProp',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'click',
        params: ['props']
      },
      {
        name: 'submit',
        params: ['props']
      },
      {
        name: 'change',
        params: ['data']
      },
      {
        name: 'update:modelValue',
        params: ['value']
      },
      {
        name: 'update:syncProp',
        params: ['value']
      }
    ],
    slots: [
      {
        name: 'default',
        params: ['props', 'data']
      },
      {
        name: 'extra',
        params: ['props', 'data']
      }
    ],
    snippet: {
      props: {}
    },
    package: '@vtj/ui'
  },
  XIcon: {
    name: 'XIcon',
    label: '图标',
    categoryId: 'base',
    props: [
      {
        name: 'icon',
        label: '图标',
        setters: 'IconSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        setters: ['SelectSetter', 'NumberSetter'],
        options: ['default', 'large', 'small']
      },
      {
        name: 'color',
        label: '颜色',
        setters: 'ColorSetter'
      },
      {
        name: 'background',
        label: '背景色',
        setters: 'ColorSetter'
      },
      {
        name: 'src',
        label: '图片Url',
        setters: 'InputSetter'
      },
      {
        name: 'radius',
        label: '圆角值',
        setters: 'NumberSetter'
      },
      {
        name: 'padding',
        label: '内边距',
        setters: 'NumberSetter'
      },
      {
        name: 'hoverEffect',
        label: '悬停效果',
        setters: 'BooleanSetter'
      }
    ],
    snippet: {
      props: {
        icon: 'Star'
      }
    },
    package: '@vtj/ui'
  },
  XContainer: {
    name: 'XContainer',
    label: '容器',
    categoryId: 'base',
    props: [
      {
        name: 'tag',
        label: '标签名',
        setters: 'StringSetter',
        defaultValue: 'div'
      },
      {
        name: 'fit',
        label: '高度自适应',
        setters: 'BooleanSetter'
      },
      {
        name: 'width',
        label: '宽度',
        setters: 'StringSetter'
      },
      {
        name: 'height',
        label: '高度',
        setters: 'StringSetter'
      },
      {
        name: 'flex',
        label: 'flex布局',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'inline',
        label: 'inline-flex',
        setters: 'BooleanSetter'
      },
      {
        name: 'direction',
        label: '排版方向',
        setters: 'SelectSetter',
        options: ['row', 'row-reverse', 'column', 'column-reverse'],
        defaultValue: 'row'
      },
      {
        name: 'wrap',
        label: '换行',
        setters: 'SelectSetter',
        options: ['nowrap', 'wrap', 'wrap-reverse'],
        defaultValue: 'nowrap'
      },
      {
        name: 'justify',
        label: '主轴对齐',
        setters: 'SelectSetter',
        options: [
          'flex-start',
          'flex-end',
          'center',
          'space-between',
          'space-around'
        ],
        defaultValue: 'flex-start'
      },
      {
        name: 'align',
        label: '交叉轴对齐',
        setters: 'SelectSetter',
        options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
        defaultValue: 'flex-start'
      },
      {
        name: 'alignContent',
        label: '多轴线对齐',
        title: '多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用',
        setters: 'SelectSetter',
        options: [
          'flex-start',
          'flex-end',
          'center',
          'space-between',
          'space-around',
          'stretch'
        ],
        defaultValue: 'stretch'
      },
      {
        name: 'grow',
        label: '自动放大',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'shrink',
        label: '自动缩小',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'alignSelf',
        label: 'alignSelf',
        title:
          '单个项目有与其他项目不一样的对齐方式。可覆盖容器的align-items属性',
        setters: 'SelectSetter',
        options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
        defaultValue: 'auto'
      },
      {
        name: 'overflow',
        label: 'overflow',
        setters: 'SelectSetter',
        options: ['auto', 'hidden', 'visible']
      },
      {
        name: 'padding',
        label: '内边距',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'gap',
        label: '子组件间隔',
        setters: 'BooleanSetter'
      },
      {
        name: 'autoPointer',
        label: 'autoPointer',
        setters: 'BooleanSetter'
      }
    ],
    snippet: {
      props: {
        padding: true
      }
    },
    package: '@vtj/ui'
  },
  XAction: {
    name: 'XAction',
    label: '操作按钮',
    categoryId: 'base',
    props: [
      {
        name: 'name',
        label: '名称标识',
        setters: 'StringSetter'
      },
      {
        name: 'label',
        label: '标题文本',
        setters: 'StringSetter'
      },
      {
        name: 'value',
        label: '动作值',
        setters: 'StringSetter',
        title: '用来传输数据'
      },
      {
        name: 'icon',
        label: '图标配置',
        setters: 'IconSetter'
      },
      {
        name: 'mode',
        label: '模式',
        setters: 'SelectSetter',
        options: ['button', 'text', 'icon'],
        defaultValue: 'button'
      },
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'type',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'primary', 'success', 'warning', 'danger', 'info']
      },
      {
        name: 'menus',
        label: '菜单配置',
        setters: 'JsonSetter'
      },
      {
        name: 'tooltip',
        label: 'Tooltip配置',
        setters: ['StringSetter', 'JsonSetter']
      },
      {
        name: 'badge',
        label: 'Badge配置',
        setters: ['StringSetter', 'NumberSetter', 'JsonSetter']
      },
      {
        name: 'dropdown',
        label: 'Dropdown配置',
        setters: 'JsonSetter'
      },
      {
        name: 'button',
        label: 'Button配置',
        setters: 'JsonSetter',
        title: 'mode为button时有效'
      },
      {
        name: 'disabled',
        label: '禁用',
        setters: 'BooleanSetter'
      },
      {
        name: 'background',
        label: '背景',
        setters: 'SelectSetter',
        options: ['always', 'hover', 'none']
      },
      {
        name: 'circle',
        label: '圆形',
        setters: 'BooleanSetter'
      }
    ],
    events: ['click', 'command'],
    slots: [
      {
        name: 'item',
        params: ['item', 'index']
      },
      {
        name: 'default'
      }
    ],
    snippet: {
      props: {
        label: '操作按钮'
      }
    },
    package: '@vtj/ui'
  },
  XActionBar: {
    name: 'XActionBar',
    label: '操作按钮集',
    categoryId: 'base',
    props: [
      {
        name: 'items',
        title: '动作项',
        setters: 'ArraySetter'
      },
      {
        name: 'mode',
        label: '模式',
        setters: 'SelectSetter',
        options: ['button', 'text', 'icon'],
        defaultValue: 'button'
      },
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'type',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'primary', 'success', 'warning', 'danger', 'info']
      },
      {
        name: 'tooltip',
        label: 'Tooltip配置',
        setters: ['StringSetter', 'JsonSetter']
      },
      {
        name: 'badge',
        label: 'Badge配置',
        setters: ['StringSetter', 'NumberSetter', 'JsonSetter']
      },
      {
        name: 'dropdown',
        label: 'Dropdown配置',
        setters: 'JsonSetter'
      },
      {
        name: 'button',
        label: 'Button配置',
        setters: 'JsonSetter',
        title: 'mode为button时有效'
      },
      {
        name: 'disabled',
        label: '禁用',
        setters: 'BooleanSetter'
      },
      {
        name: 'background',
        label: '背景',
        setters: 'SelectSetter',
        options: ['always', 'hover', 'none']
      },
      {
        name: 'circle',
        label: '圆形',
        setters: 'BooleanSetter'
      }
    ],
    events: ['click', 'command'],
    snippet: {
      props: {
        items: [
          {
            label: '操作一',
            value: 1
          },
          {
            label: '操作二',
            value: 2
          },
          {
            label: '操作三',
            value: 3
          }
        ]
      }
    },
    package: '@vtj/ui'
  },
  XQrCode: {
    name: 'XQrCode',
    label: '二维码',
    categoryId: 'base',
    props: [
      {
        name: 'size',
        title: '二维码尺寸',
        setters: 'NumberSetter'
      },
      {
        name: 'content',
        setters: ['StringSetter', 'FunctionSetter']
      },
      {
        name: 'expired',
        title: '设置过期时间，单位毫秒',
        setters: 'NumberSetter'
      },
      {
        name: 'tip',
        title: '过期时提示文本',
        setters: 'StringSetter'
      },
      {
        name: 'options',
        title: 'qrcode工具配置参数：https://www.npmjs.com/package/qrcode',
        setters: 'ObjectSetter'
      }
    ],
    events: [
      {
        name: 'refresh'
      },
      {
        name: 'draw'
      }
    ],
    slots: ['tip'],
    snippet: {
      props: {
        content: '二维码内容'
      }
    },
    package: '@vtj/ui'
  },
  XPanel: {
    name: 'XPanel',
    label: '面板',
    categoryId: 'layout',
    props: [
      {
        name: 'fit',
        label: 'fit',
        title: '宽高自适应',
        setters: 'BooleanSetter'
      },
      {
        name: 'width',
        label: 'width',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'height',
        label: 'height',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'border',
        title: '显示边框',
        setters: 'BooleanSetter'
      },
      {
        name: 'radius',
        title: '圆角',
        setters: 'BooleanSetter'
      },
      {
        name: 'card',
        title: '卡片模式',
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        setters: ['SelectSetter'],
        options: ['default', 'large', 'small']
      },
      {
        name: 'shadow',
        title: '阴影设置',
        setters: 'SelectSetter',
        options: ['none', 'always', 'hover']
      },
      {
        name: 'header',
        title: '头部设置',
        setters: ['StringSetter', 'ObjectSetter']
      },
      {
        name: 'body',
        title: 'body',
        setters: 'ObjectSetter'
      },
      {
        name: 'footer',
        title: 'footer',
        setters: 'ObjectSetter'
      }
    ],
    slots: ['default', 'actions', 'title', 'footer'],
    snippet: {
      props: {
        header: '标题'
      },
      children: '内容文本'
    },
    package: '@vtj/ui'
  },
  XAttachment: {
    name: 'XAttachment',
    label: '附件',
    categoryId: 'data',
    props: [
      {
        name: 'modelValue',
        label: 'modelValue',
        title: '列表显示的文件',
        setters: 'ArraySetter'
      },
      {
        name: 'selectValue',
        label: 'selectValue',
        title: '选中值，开启 selectable 有效',
        setters: 'ArraySetter'
      },
      {
        name: 'uploader',
        label: 'uploader',
        title: '文件上传方法',
        setters: 'FunctionsSetter'
      },
      {
        name: 'multiple',
        label: 'multiple',
        title: '支持多文件上传, 同时在selectable时控制多选',
        setters: 'BooleanSetter'
      },
      {
        name: 'limit',
        label: 'limit',
        title: '允许上传文件的最大数量',
        setters: 'NumberSetter'
      },
      {
        name: 'accept',
        label: 'accept',
        title: ' 接受上传的文件类型, 如：image/png, image/jpeg, .pptx',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '禁止更改文件，不能上传和删除',
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'thumbnail',
        label: 'thumbnail',
        title: '缩略图生成方法',
        setters: 'FunctionSetter'
      },
      {
        name: 'addable',
        label: 'addable',
        title: '可增加',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'removable',
        label: 'removable',
        title: '可删除',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'downloadable',
        label: 'downloadable',
        title: '可下载',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'previewable',
        label: 'previewable',
        title: '可预览',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'selectable',
        label: 'selectable',
        title: '可选择',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'clickable',
        label: 'clickable',
        title: '可点击',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'listType',
        label: 'listType',
        title: '列表类型',
        setters: 'SelectSetter',
        options: ['card', 'list'],
        defaultValue: 'card'
      },
      {
        name: 'beforeUpload',
        title: '上传前守卫',
        setters: 'FunctionSetter'
      },
      {
        name: 'limitSize',
        title: '允许上传的文件大写最大值， 支持 K / M',
        setters: 'StringSetter',
        defaultValue: '10M'
      },
      {
        name: 'formatter',
        setters: 'FunctionSetter'
      },
      {
        name: 'valueFormatter',
        setters: 'FunctionSetter'
      },
      {
        name: 'previewer',
        setters: 'FunctionSetter'
      },
      {
        name: 'downloader',
        setters: 'FunctionSetter'
      },
      {
        name: 'autoUpload',
        setters: 'BooleanSetter'
      }
    ],
    events: [
      'click',
      'preview',
      'remove',
      'download',
      'select',
      'change',
      'update:modelValue',
      'update:selectValue'
    ],
    slots: ['tip'],
    snippet: {
      props: {}
    },
    package: '@vtj/ui'
  },
  XDataItem: {
    name: 'XDataItem',
    label: '数据项',
    categoryId: 'data',
    props: [
      {
        name: 'direction',
        title: '排版方向',
        setters: 'SelectSetter',
        options: ['row', 'column'],
        defaultValue: 'column'
      },
      {
        name: 'imageSrc',
        title: '图片URL',
        setters: 'StringSetter'
      },
      {
        name: 'imageWidth',
        title: '图片宽度',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'imageHeight',
        title: '图片高度',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'icon',
        title: '图片高度',
        setters: ['IconSetter']
      },
      {
        name: 'title',
        setters: ['StringSetter']
      },
      {
        name: 'description',
        setters: ['StringSetter']
      },
      {
        name: 'actions',
        title: '动作按钮 ActionBarItems',
        setters: ['ArraySetter']
      },
      {
        name: 'actionBarProps',
        title: '动作条组件配置 ActionBarProps',
        setters: ['ObjectSetter']
      },
      {
        name: 'split',
        setters: ['BooleanSetter']
      },
      {
        name: 'active',
        setters: ['BooleanSetter']
      },
      {
        name: 'hover',
        setters: ['BooleanSetter']
      },
      {
        name: 'padding',
        setters: ['BooleanSetter']
      },
      {
        name: 'tag',
        label: '标签名',
        setters: 'StringSetter',
        defaultValue: 'div'
      },
      {
        name: 'fit',
        label: '高度自适应',
        setters: 'BooleanSetter'
      },
      {
        name: 'width',
        label: '宽度',
        setters: 'StringSetter'
      },
      {
        name: 'height',
        label: '高度',
        setters: 'StringSetter'
      },
      {
        name: 'flex',
        label: 'flex布局',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'inline',
        label: 'inline-flex',
        setters: 'BooleanSetter'
      },
      {
        name: 'wrap',
        label: '换行',
        setters: 'SelectSetter',
        options: ['nowrap', 'wrap', 'wrap-reverse'],
        defaultValue: 'nowrap'
      },
      {
        name: 'justify',
        label: '主轴对齐',
        setters: 'SelectSetter',
        options: [
          'flex-start',
          'flex-end',
          'center',
          'space-between',
          'space-around'
        ],
        defaultValue: 'flex-start'
      },
      {
        name: 'align',
        label: '交叉轴对齐',
        setters: 'SelectSetter',
        options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
        defaultValue: 'flex-start'
      },
      {
        name: 'alignContent',
        label: '多轴线对齐',
        title: '多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用',
        setters: 'SelectSetter',
        options: [
          'flex-start',
          'flex-end',
          'center',
          'space-between',
          'space-around',
          'stretch'
        ],
        defaultValue: 'stretch'
      },
      {
        name: 'grow',
        label: '自动放大',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'shrink',
        label: '自动缩小',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'alignSelf',
        label: 'alignSelf',
        title:
          '单个项目有与其他项目不一样的对齐方式。可覆盖容器的align-items属性',
        setters: 'SelectSetter',
        options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
        defaultValue: 'auto'
      },
      {
        name: 'overflow',
        label: 'overflow',
        setters: 'SelectSetter',
        options: ['auto', 'hidden', 'visible']
      },
      {
        name: 'padding',
        label: '内边距',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'gap',
        label: '子组件间隔',
        setters: 'BooleanSetter'
      },
      {
        name: 'autoPointer',
        label: 'autoPointer',
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'imageClick'
      },
      {
        name: 'titleClick'
      },
      {
        name: 'actionClick',
        params: ['action']
      },
      {
        name: 'actionCommand',
        params: ['action', 'menu']
      }
    ],
    slots: [
      {
        name: 'image'
      },
      {
        name: 'title'
      },
      {
        name: 'description'
      },
      {
        name: 'actions'
      },
      {
        name: 'default'
      }
    ],
    snippet: {
      props: {
        title: '标题文本',
        description: '描述文本示例内容'
      }
    },
    package: '@vtj/ui'
  },
  XDialog: {
    name: 'XDialog',
    label: '弹窗',
    categoryId: 'layout',
    props: [
      {
        name: 'modelValue',
        title: '控制是否显示弹窗',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'title',
        setters: 'StringSetter'
      },
      {
        name: 'subtitle',
        setters: 'StringSetter'
      },
      {
        name: 'icon',
        setters: 'IconSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'width',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'height',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'left',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'top',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'modal',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'draggable',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'resizable',
        setters: 'BooleanSetter'
      },
      {
        name: 'closable',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'maximizable',
        setters: 'BooleanSetter'
      },
      {
        name: 'minimizable',
        setters: 'BooleanSetter'
      },
      {
        name: 'mode',
        setters: 'SelectSetter',
        options: ['normal', 'maximized', 'minimized'],
        defaultValue: 'normal'
      },
      {
        name: 'src',
        title: '加载页码url',
        setters: 'StringSetter'
      },
      {
        name: 'beforeClose',
        title: '关闭弹窗回调函数，return true 阻止关闭',
        setters: 'FunctionSetter'
      },
      {
        name: 'submit',
        setters: ['Boolean', 'StringSetter']
      },
      {
        name: 'cancel',
        setters: ['Boolean', 'StringSetter']
      },
      {
        name: 'bodyPadding',
        setters: 'BooleanSetter'
      },
      {
        name: 'primary',
        setters: 'BooleanSetter'
      },
      {
        name: 'fit',
        label: 'fit',
        title: '宽高自适应',
        setters: 'BooleanSetter'
      },
      {
        name: 'width',
        label: 'width',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'height',
        label: 'height',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'border',
        title: '显示边框',
        setters: 'BooleanSetter'
      },
      {
        name: 'radius',
        title: '圆角',
        setters: 'BooleanSetter'
      },
      {
        name: 'card',
        title: '卡片模式',
        setters: 'BooleanSetter'
      },
      {
        name: 'shadow',
        title: '阴影设置',
        setters: 'SelectSetter',
        options: ['none', 'always', 'hover']
      },
      {
        name: 'header',
        title: '头部设置',
        setters: ['StringSetter', 'ObjectSetter']
      },
      {
        name: 'body',
        title: 'body',
        setters: 'ObjectSetter'
      },
      {
        name: 'footer',
        title: 'footer',
        setters: 'ObjectSetter'
      }
    ],
    events: [
      {
        name: 'update:modelValue',
        params: ['modelValue']
      },
      {
        name: 'open',
        params: ['instance']
      },
      {
        name: 'close'
      },
      {
        name: 'destroy'
      },
      {
        name: 'maximized'
      },
      {
        name: 'minimized'
      },
      {
        name: 'normal'
      },
      {
        name: 'modeChange',
        params: ['mode']
      },
      {
        name: 'dragStart',
        params: ['position']
      },
      {
        name: 'dragging',
        params: ['position']
      },
      {
        name: 'dragEnd',
        params: ['position']
      },
      {
        name: 'resizeStart',
        params: ['dir', 'mie']
      },
      {
        name: 'resizeEnd',
        params: ['dir', 'mie']
      },
      {
        name: 'resizing',
        params: ['dir', 'mie']
      },
      {
        name: 'submit'
      },
      {
        name: 'cancel'
      }
    ],
    slots: [
      {
        name: 'title'
      },
      {
        name: 'actions'
      },
      {
        name: 'default'
      },
      {
        name: 'footer'
      },
      {
        name: 'extra'
      },
      {
        name: 'handle'
      }
    ],
    snippet: {
      props: {
        title: '弹窗标题'
      }
    },
    package: '@vtj/ui'
  },
  XDialogForm: {
    name: 'XDialogForm',
    label: '弹窗表单',
    categoryId: 'form',
    props: [
      {
        name: 'modelValue',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'submit',
        setters: ['StringSetter', 'BooleanSetter'],
        defaultValue: '确定'
      },
      {
        name: 'cancel',
        setters: ['StringSetter', 'BooleanSetter'],
        defaultValue: '取消'
      },
      {
        name: 'model',
        setters: 'ObjectSetter'
      },
      {
        name: 'rules',
        setters: 'ObjectSetter'
      },
      {
        name: 'formProps',
        title: '表单XForm组件参数选项',
        setters: 'ObjectSetter'
      },
      {
        name: 'submitMethod',
        title: '表单提交处理方法, return true 关闭弹窗',
        setters: 'FunctionSetter'
      },
      {
        name: 'title',
        setters: 'StringSetter'
      },
      {
        name: 'subtitle',
        setters: 'StringSetter'
      },
      {
        name: 'icon',
        setters: 'IconSetter'
      },
      {
        name: 'width',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'height',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'left',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'top',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'modal',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'draggable',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'resizable',
        setters: 'BooleanSetter'
      },
      {
        name: 'closable',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'maximizable',
        setters: 'BooleanSetter'
      },
      {
        name: 'minimizable',
        setters: 'BooleanSetter'
      },
      {
        name: 'mode',
        setters: 'SelectSetter',
        options: ['normal', 'maximized', 'minimized'],
        defaultValue: 'normal'
      },
      {
        name: 'src',
        title: '加载页码url',
        setters: 'StringSetter'
      },
      {
        name: 'beforeClose',
        title: '关闭弹窗回调函数，return true 阻止关闭',
        setters: 'FunctionSetter'
      },
      {
        name: 'bodyPadding',
        setters: 'BooleanSetter'
      },
      {
        name: 'primary',
        setters: 'BooleanSetter'
      },
      {
        name: 'fit',
        label: 'fit',
        title: '宽高自适应',
        setters: 'BooleanSetter'
      },
      {
        name: 'width',
        label: 'width',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'height',
        label: 'height',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'border',
        title: '显示边框',
        setters: 'BooleanSetter'
      },
      {
        name: 'radius',
        title: '圆角',
        setters: 'BooleanSetter'
      },
      {
        name: 'card',
        title: '卡片模式',
        setters: 'BooleanSetter'
      },
      {
        name: 'shadow',
        title: '阴影设置',
        setters: 'SelectSetter',
        options: ['none', 'always', 'hover']
      },
      {
        name: 'header',
        title: '头部设置',
        setters: ['StringSetter', 'ObjectSetter']
      },
      {
        name: 'body',
        title: 'body',
        setters: 'ObjectSetter'
      },
      {
        name: 'footer',
        title: 'footer',
        setters: 'ObjectSetter'
      }
    ],
    events: [
      {
        name: 'update:modelValue',
        params: ['modelValue']
      },
      {
        name: 'submit',
        params: ['model']
      },
      {
        name: 'close'
      }
    ],
    slots: ['default', 'extra', 'handle', 'footer'],
    snippet: {
      props: {
        title: '弹窗表单'
      }
    },
    package: '@vtj/ui'
  },
  XField: {
    name: 'XField',
    label: '字段',
    categoryId: 'form',
    props: [
      {
        name: 'name',
        title: '字段名称',
        setters: 'StringSetter'
      },
      {
        name: 'label',
        title: '字段标题文本',
        setters: 'StringSetter'
      },
      {
        name: 'editor',
        title: '编辑器组件',
        setters: 'SelectSetter',
        options: [
          'none',
          'text',
          'textarea',
          'select',
          'checkbox',
          'radio',
          'number',
          'date',
          'time',
          'datetime',
          'switch',
          'slider',
          'rate',
          'cascader',
          'picker'
        ]
      },
      {
        name: 'props',
        title: '编辑器组件参数',
        setters: 'ObjectSetter'
      },
      {
        name: 'modelValue',
        setters: 'StringSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'width',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'tooltipMessage',
        title: '是否在tooltip显示校验信息',
        setters: ['BooleanSetter', 'ObjectSetter']
      },
      {
        name: 'tooltipPosition',
        setters: ['SelectSetter', 'NumberSetter'],
        options: ['inner', 'outer'],
        defaultValue: 'outer'
      },
      {
        name: 'placeholder',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        setters: 'BooleanSetter'
      },
      {
        name: 'readonly',
        setters: 'BooleanSetter'
      },
      {
        name: 'options',
        setters: ['ArraySetter', 'FunctionSetter']
      },
      {
        name: 'visible',
        setters: 'BooleanSetter'
      },
      {
        name: 'cascader',
        title: '级联字段，根据字段值变化刷新options',
        setters: ['StringSetter', 'ArraySetter']
      },
      {
        name: 'error',
        setters: 'StringSetter'
      },
      {
        name: 'tip',
        setters: 'StringSetter'
      },
      {
        name: 'inline',
        title: '表单项内容采用inline布局',
        setters: 'BooleanSetter'
      },
      {
        name: 'hidden',
        title: '隐藏域',
        setters: 'BooleanSetter'
      },
      {
        name: 'defaultValue',
        title: '默认值',
        setters: 'StringSetter'
      },
      {
        name: 'labelPosition',
        defaultValue: '',
        setters: 'SelectSetter',
        options: ['left', 'right', 'top']
      },
      {
        name: 'labelWidth',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'required',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'rules',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'error',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'showMessage',
        defaultValue: true,
        title: '是否显示校验错误信息',
        label: '错误信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'inlineMessage',
        defaultValue: false,
        title: '是否在行内显示校验信息',
        label: '校验信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'for',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'validateStatus',
        title: 'formitem 校验的状态',
        options: ['', 'error', 'validating', 'success'],
        setters: 'SelectSetter'
      }
    ],
    events: ['update:modelValue', 'change', 'focus', 'blur'],
    slots: [
      {
        name: 'label'
      },
      {
        name: 'error',
        params: ['error']
      },
      {
        name: 'editor',
        params: ['editor']
      },
      {
        name: 'tip'
      },
      {
        name: 'default'
      }
    ],
    snippet: {
      props: {
        label: '字段名称'
      }
    },
    package: '@vtj/ui'
  },
  XForm: {
    name: 'XForm',
    label: '表单',
    categoryId: 'form',
    props: [
      {
        name: 'model',
        setters: 'ObjectSetter'
      },
      {
        name: 'inline',
        setters: 'BooleanSetter'
      },
      {
        name: 'inlineColumns',
        title: 'inline模式显示列数',
        setters: 'NumberSetter'
      },
      {
        name: 'footer',
        setters: 'BooleanSetter'
      },
      {
        name: 'submitText',
        setters: 'StringSetter',
        defaultValue: '提交'
      },
      {
        name: 'resetText',
        setters: 'StringSetter',
        defaultValue: '重置'
      },
      {
        name: 'submitMethod',
        title: '表单提交处理方法',
        setters: 'FunctionSetter'
      },
      {
        name: 'tooltipMessage',
        title: '是否在tooltip显示校验信息',
        setters: ['BooleanSetter', 'ObjectSetter']
      },
      {
        name: 'enterSubmit',
        title: '回车键触发提交',
        setters: 'BooleanSetter'
      },
      {
        name: 'sticky',
        title: '开启底部sticky定位',
        setters: 'BooleanSetter'
      },
      {
        name: 'footerAlign',
        title: '底部对齐方式',
        setters: 'SelectSetter',
        defaultValue: 'left',
        options: ['left', 'center', 'right']
      },
      {
        name: 'rules',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'labelPosition',
        defaultValue: 'right',
        options: ['left', 'right', 'top'],
        setters: 'SelectSetter'
      },
      {
        name: 'labelWidth',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'labelSuffix',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'hideRequiredAsterisk',
        defaultValue: false,
        title: '是否显示必填字段的标签旁边的红色星号',
        setters: 'BooleanSetter'
      },
      {
        name: 'requireAsteriskPosition',
        defaultValue: 'left',
        title: '星号的位置',
        options: ['left', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'showMessage',
        defaultValue: true,
        title: '是否显示校验错误信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'inlineMessage',
        defaultValue: false,
        title: '是否以行内形式展示校验信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'statusIcon',
        defaultValue: false,
        title: '是否在输入框中显示校验结果反馈图标',
        setters: 'BooleanSetter'
      },
      {
        name: 'validateOnRuleChange',
        defaultValue: true,
        title: '是否在 rules 属性改变后立即触发一次验证',
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: '',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scrollToError',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scrollIntoViewOptions',
        defaultValue: '',
        setters: ['ExpressionSetter', 'BooleanSetter']
      }
    ],
    events: [
      {
        name: 'change',
        params: ['model']
      },
      {
        name: 'submit',
        params: ['model']
      },
      {
        name: 'reset'
      }
    ],
    slots: ['default', 'footer', 'action'],
    snippet: {
      props: {
        labelWidth: '100px'
      },
      children: [
        {
          name: 'XField',
          props: {
            label: '字段名称'
          }
        }
      ]
    },
    package: '@vtj/ui'
  },
  XGrid: {
    name: 'XGrid',
    label: '表格',
    categoryId: 'data',
    doc: 'https://vxetable.cn/#/grid/api',
    props: [
      {
        name: 'columns',
        setters: 'ArraySetter'
      },
      {
        name: 'loader',
        title: '数据加载函数: (state) => {list, total}',
        setters: 'FunctionSetter'
      },
      {
        name: 'rowSortable',
        title: '行拖拽排序',
        setters: 'BooleanSetter'
      },
      {
        name: 'columnSortable',
        title: '列拖拽排序',
        setters: 'BooleanSetter'
      },
      {
        name: 'customable',
        title: '开启用户自定义',
        setters: 'BooleanSetter'
      },
      {
        name: 'resizable',
        setters: 'BooleanSetter'
      },
      {
        name: 'pager',
        title: '开启分页功能',
        setters: 'BooleanSetter'
      },
      {
        name: 'page',
        setters: 'NumberSetter'
      },
      {
        name: 'pageSize',
        setters: 'NumberSetter'
      },
      {
        name: 'pageSizes',
        title: '每页显示个数选择器的选项设置',
        setters: 'ArraySetter'
      },
      {
        name: 'auto',
        title: '初始执行加载函数',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'virtual',
        title: '开启虚拟滚动',
        setters: 'BooleanSetter'
      },
      {
        name: 'editable',
        title: '开启编辑模式',
        setters: 'BooleanSetter'
      },
      {
        name: 'cellRenders',
        title: '单元格渲染器',
        setters: 'ObjectSetter'
      },
      {
        name: 'editRenders',
        title: '单元格渲染器',
        setters: 'ObjectSetter'
      },
      {
        name: 'filterRenders',
        title: '过滤器渲染器',
        setters: 'ObjectSetter'
      },
      {
        name: 'id',
        setters: 'StringSetter'
      },
      {
        name: 'data',
        setters: 'ArraySetter'
      },
      {
        name: 'height',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'minHeight',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'maxHeight',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'autoResize',
        setters: 'BooleanSetter'
      },
      {
        name: 'syncResize',
        setters: ['BooleanSetter', 'StringSetter']
      },
      {
        name: 'stripe',
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        setters: 'BooleanSetter'
      },
      {
        name: 'round',
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        setters: 'SelectSetter',
        options: ['small', 'mini']
      },
      {
        name: 'loading',
        setters: 'BooleanSetter'
      },
      {
        name: 'align',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right']
      },
      {
        name: 'HeaderAlign',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right']
      },
      {
        name: 'FooterAlign',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right']
      },
      {
        name: 'showHeader',
        setters: 'BooleanSetter'
      },
      {
        name: 'showFoter',
        setters: 'BooleanSetter'
      },
      {
        name: 'footerData',
        setters: 'ArraySetter'
      },
      {
        name: 'mergeCells',
        setters: 'FunctionSetter'
      },
      {
        name: 'mergeFooterItems',
        setters: 'FunctionSetter'
      },
      {
        name: 'showOverflow',
        setters: 'BooleanSetter'
      },
      {
        name: 'showHeaderOverflow',
        setters: 'BooleanSetter'
      },
      {
        name: 'showFooterOverflow',
        setters: 'BooleanSetter'
      },
      {
        name: 'keepSource',
        setters: 'BooleanSetter'
      },
      {
        name: 'columnConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'rowConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'resizeConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'resizableConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'seqConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'sortConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'filterConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'exportConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'importConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'printConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'radioConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'checkboxConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'tooltipConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'expandConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'treeConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'menuConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'mouseConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'keyboardConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'editConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'validConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'editRules',
        setters: 'ObjectSetter'
      },
      {
        name: 'emptyText',
        setters: 'StringSetter'
      },
      {
        name: 'emptyRender',
        setters: 'ObjectSetter'
      },
      {
        name: 'loadingConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'customConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'scrollX',
        setters: 'ObjectSetter'
      },
      {
        name: 'scrollY',
        setters: 'ObjectSetter'
      },
      {
        name: 'params',
        setters: 'ObjectSetter'
      },
      {
        name: 'toolbarConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'pagerConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'proxyConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'zoomConfig',
        setters: 'ObjectSetter'
      },
      {
        name: 'layouts',
        setters: 'ArraySetter'
      }
    ],
    events: [
      'rowSort',
      'columnSort',
      'editChange',
      'keydown',
      'current-change',
      'radio-change',
      'checkbox-change',
      'checkbox-all',
      'checkbox-range-start',
      'checkbox-range-change',
      'checkbox-range-end',
      'cell-click',
      'cell-dblclick',
      'cell-menu',
      'cell-mouseenter',
      'cell-mouseleave',
      'cell-delete-value',
      'header-cell-click',
      'header-cell-dblclick',
      'header-cell-menu',
      'footer-cell-click',
      'footer-cell-dblclick',
      'footer-cell-menu',
      'clear-merge',
      'sort-change',
      'clear-sort',
      'filter-change',
      'filter-visible',
      'clear-filter',
      'resizable-change',
      'toggle-row-expand',
      'toggle-tree-expand',
      'menu-click',
      'cell-selected',
      'edit-closed',
      'edit-activated',
      'edit-disabled',
      'valid-error',
      'scroll',
      'custom',
      'page-change',
      'proxy-query',
      'proxy-delete',
      'proxy-save',
      'toolbar-button-click',
      'toolbar-tool-click',
      'zoom'
    ],
    slots: [
      'empty',
      'form',
      'top',
      'bottom',
      'toolbar__buttons',
      'pager__left'
    ],
    snippet: {
      props: {
        height: 'auto',
        columns: [
          {
            type: 'seq',
            title: '#'
          },
          {
            field: 'title',
            title: '标题'
          }
        ]
      }
    },
    package: '@vtj/ui'
  },
  XHeader: {
    name: 'XHeader',
    label: '标题头',
    categoryId: 'layout',
    props: [
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'content',
        setters: 'StringSetter'
      },
      {
        name: 'subtitle',
        setters: 'StringSetter'
      },
      {
        name: 'icon',
        setters: 'IconSetter'
      },
      {
        name: 'border',
        setters: 'BooleanSetter'
      },
      {
        name: 'more',
        setters: 'BooleanSetter'
      }
    ],
    events: ['click', 'clickIcon'],
    slots: ['default', 'subtitle', 'actions'],
    snippet: {
      props: {
        content: '标题内容文本',
        subtitle: '这里是子标题内容示例'
      }
    },
    package: '@vtj/ui'
  },
  XList: {
    name: 'XList',
    label: '列表',
    categoryId: 'data',
    props: [
      {
        name: 'data',
        setters: ['ObjectSetter', 'FunctionSetter']
      },
      {
        name: 'itemHeight',
        title: '设置 itemHeight 即自动开启虚拟滚动',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'width',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'height',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'pager',
        setters: ['BooleanSetter', 'ObjectSetter']
      },
      {
        name: 'page',
        setters: 'NumberSetter',
        defaultValue: 1
      },
      {
        name: 'pageSize',
        setters: 'NumberSetter',
        defaultValue: 10
      },
      {
        name: 'dataKey',
        title: '数据主键属性名称',
        setters: 'StringSetter'
      },
      {
        name: 'infiniteScroll',
        setters: ['BooleanSetter', 'ObjectSetter']
      }
    ],
    events: [
      {
        name: 'load',
        params: ['state']
      }
    ],
    slots: [
      {
        name: 'empty'
      },
      {
        name: 'default',
        params: ['item', 'index']
      },
      {
        name: 'loading'
      },
      {
        name: 'nomore'
      }
    ],
    snippet: {
      props: {
        data: {
          list: ['列表项内容一', '列表项内容二'],
          total: 2
        }
      }
    },
    package: '@vtj/ui'
  },
  XQueryForm: {
    name: 'XQueryForm',
    label: '查询表单',
    categoryId: 'form',
    props: [
      {
        name: 'collapsible',
        setters: 'BooleanSetter'
      },
      {
        name: 'items',
        setters: 'ArraySetter'
      },
      {
        name: 'model',
        setters: 'ObjectSetter'
      },
      {
        name: 'inline',
        setters: 'BooleanSetter'
      },
      {
        name: 'inlineColumns',
        title: 'inline模式显示列数',
        setters: 'NumberSetter'
      },
      {
        name: 'footer',
        setters: 'BooleanSetter'
      },
      {
        name: 'submitText',
        setters: 'StringSetter',
        defaultValue: '提交'
      },
      {
        name: 'resetText',
        setters: 'StringSetter',
        defaultValue: '重置'
      },
      {
        name: 'submitMethod',
        title: '表单提交处理方法',
        setters: 'FunctionSetter'
      },
      {
        name: 'tooltipMessage',
        title: '是否在tooltip显示校验信息',
        setters: ['BooleanSetter', 'ObjectSetter']
      },
      {
        name: 'enterSubmit',
        title: '回车键触发提交',
        setters: 'BooleanSetter'
      },
      {
        name: 'sticky',
        title: '开启底部sticky定位',
        setters: 'BooleanSetter'
      },
      {
        name: 'footerAlign',
        title: '底部对齐方式',
        setters: 'SelectSetter',
        defaultValue: 'left',
        options: ['left', 'center', 'right']
      },
      {
        name: 'rules',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'labelPosition',
        defaultValue: 'right',
        options: ['left', 'right', 'top'],
        setters: 'SelectSetter'
      },
      {
        name: 'labelWidth',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'labelSuffix',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'hideRequiredAsterisk',
        defaultValue: false,
        title: '是否显示必填字段的标签旁边的红色星号',
        setters: 'BooleanSetter'
      },
      {
        name: 'requireAsteriskPosition',
        defaultValue: 'left',
        title: '星号的位置',
        options: ['left', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'showMessage',
        defaultValue: true,
        title: '是否显示校验错误信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'inlineMessage',
        defaultValue: false,
        title: '是否以行内形式展示校验信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'statusIcon',
        defaultValue: false,
        title: '是否在输入框中显示校验结果反馈图标',
        setters: 'BooleanSetter'
      },
      {
        name: 'validateOnRuleChange',
        defaultValue: true,
        title: '是否在 rules 属性改变后立即触发一次验证',
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: '',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scrollToError',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scrollIntoViewOptions',
        defaultValue: '',
        setters: ['ExpressionSetter', 'BooleanSetter']
      }
    ],
    events: [
      {
        name: 'change',
        params: ['model']
      },
      {
        name: 'submit',
        params: ['model']
      },
      {
        name: 'reset'
      },
      'collapsed'
    ],
    slots: [
      {
        name: 'default'
      }
    ],
    snippet: {
      children: [
        {
          name: 'XField',
          props: {
            label: '条件名称'
          }
        }
      ]
    },
    package: '@vtj/ui'
  },
  XTabs: {
    name: 'XTabs',
    label: '选项卡',
    categoryId: 'layout',
    props: [
      {
        name: 'items',
        setters: 'ArraySetter'
      },
      {
        name: 'border',
        setters: 'BooleanSetter'
      },
      {
        name: 'fit',
        setters: 'BooleanSetter'
      },
      {
        name: 'align',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right']
      },
      {
        name: 'modelValue',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'type',
        setters: [
          {
            name: 'SelectSetter',
            props: {
              closable: true
            }
          }
        ],
        defaultValue: '',
        options: ['', 'card', 'border-card']
      },
      {
        name: 'closable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'addable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'editable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'tabPosition',
        defaultValue: 'top',
        setters: 'SelectSetter',
        options: ['top', 'right', 'bottom', 'left']
      },
      {
        name: 'stretch',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'beforeLeave',
        defaultValue: '',
        setters: 'FunctionSetter'
      }
    ],
    events: [
      {
        name: 'tab-click'
      },
      {
        name: 'tab-change'
      },
      {
        name: 'tab-remove'
      },
      {
        name: 'tab-add'
      },
      {
        name: 'edit'
      },
      {
        name: 'update:modelValue'
      },
      'actionClick',
      'actionCommand'
    ],
    slots: ['label', 'default'],
    snippet: {
      props: {
        modelValue: '1',
        items: [
          {
            label: 'Tab 1',
            value: '1'
          },
          {
            label: 'Tab 2',
            value: '2'
          },
          {
            label: 'Tab 3',
            value: '3'
          }
        ]
      }
    },
    package: '@vtj/ui'
  },
  XPicker: {
    name: 'XPicker',
    label: '数据选择器',
    categoryId: 'form',
    childIncludes: false,
    props: [
      {
        name: 'columns',
        title: '表格列配置',
        setters: 'ArraySetter'
      },
      {
        name: 'fields',
        title: '查询条件表单字段配置',
        setters: 'ArraySetter'
      },
      {
        name: 'loader',
        title: '表格数据加载函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'modelValue',
        setters: 'StringSetter'
      },
      {
        name: 'multiple',
        title: '多选模式',
        setters: 'BooleanSetter'
      },
      {
        name: 'raw',
        title: '值为对象模式',
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        setters: 'BooleanSetter'
      },
      {
        name: 'append',
        title: '多选可追加',
        setters: 'BooleanSetter'
      },
      {
        name: 'valueKey',
        title: '值映射字段名称',
        setters: 'StringSetter',
        defaultValue: 'value'
      },
      {
        name: 'labelKey',
        title: '输入框显示映射字段名称',
        setters: 'StringSetter',
        defaultValue: 'label'
      },
      {
        name: 'queryKey',
        title: '查询参数名称',
        setters: 'StringSetter'
      },
      {
        name: 'preload',
        title: '单选模式，回车时自动检测取回有且计有唯一数据',
        setters: 'BooleanSetter'
      },
      {
        name: 'defaultQuery',
        title: '初始默认查询参数 () => Record<string,any>',
        setters: 'FunctionSetter'
      },
      {
        name: 'dialogProps',
        title: '弹窗组件配置参数',
        setters: 'ObjectSetter'
      },
      {
        name: 'gridProps',
        title: '表格组件配置参数',
        setters: 'ObjectSetter'
      },
      {
        name: 'formProps',
        title: '查询表单配置参数',
        setters: 'ObjectSetter'
      },
      {
        name: 'formatter',
        title: '接受数据转换函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'valueFormatter',
        title: '发送数据转换函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'clearable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'collapseTags',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'collapseTagsTooltip',
        title:
          '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'multipleLimit',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'effect',
        defaultValue: 'light',
        options: ['dark', 'light'],
        setters: 'SelectSetter'
      },
      {
        name: 'autocomplete',
        defaultValue: 'off',
        setters: 'InputSetter'
      },
      {
        name: 'placeholder',
        defaultValue: 'Select',
        setters: 'InputSetter'
      },
      {
        name: 'filterable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'allowCreate',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'filterMethod',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'remote',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'remoteMethod',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'remoteShowSuffix',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loadingText',
        defaultValue: 'Loading',
        setters: 'InputSetter'
      },
      {
        name: 'noMatchText',
        defaultValue: 'No matching data',
        setters: 'InputSetter'
      },
      {
        name: 'noDataText',
        defaultValue: 'No data',
        setters: 'InputSetter'
      },
      {
        name: 'popperClass',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'reserveKeyword',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'defaultFirstOption',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'appendTo',
        title: '下拉框挂载到哪个 DOM 元素',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'persistent',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'automaticDropdown',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'clearIcon',
        defaultValue: 'CircleClose',
        setters: 'InputSetter'
      },
      {
        name: 'fitInputWidth',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'suffixIcon',
        defaultValue: 'ArrowUp',
        setters: 'InputSetter'
      },
      {
        name: 'tagType',
        defaultValue: 'info',
        options: ['success', 'info', 'warning', 'danger'],
        setters: 'SelectSetter'
      },
      {
        name: 'tagEffect',
        defaultValue: 'light',
        options: ['', 'light', 'dark', 'plain'],
        setters: 'SelectSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'offset',
        defaultValue: 12,
        setters: 'NumberSetter'
      },
      {
        name: 'showArrow',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'placement',
        label: 'placement',
        title: '下拉框出现的位置',
        setters: 'SelectSetter',
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ],
        defaultValue: 'bottom-start'
      },
      {
        name: 'fallbackPlacements',
        label: 'fallbackPlacements',
        title: 'dropdown 可用的 positions',
        setters: 'ArraySetter',
        defaultValue: ['bottom-start', 'top-start', 'right', 'left']
      },
      {
        name: 'maxCollapseTags',
        label: 'maxCollapseTags',
        title:
          '需要显示的 Tag 的最大数量 只有当 collapse-tags 设置为 true 时才会生效。',
        setters: 'NumberSetter',
        defaultValue: 1
      },
      {
        name: 'popperOptions',
        label: 'popperOptions',
        title: 'popper.js 参数',
        setters: 'ObjectSetter',
        defaultValue: {}
      },
      {
        name: 'ariaLabel',
        label: 'ariaLabel',
        title: '等价于原生 input aria-label 属性',
        setters: 'StringSetter'
      },
      {
        name: 'emptyValues',
        title: '组件的空值配置',
        setters: 'ArraySetter'
      },
      {
        name: 'valueOnClear',
        title: '清空选项的值 ',
        setters: [
          'StringSetter',
          'NumberSetter',
          'BooleanSetter',
          'FunctionSetter'
        ]
      },
      {
        name: 'suffixTransition',
        title: '下拉菜单显示/消失时后缀图标的动画',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'tabindex',
        title: 'input 的 tabindex',
        setters: ['StringSetter', 'NumberSetter']
      }
    ],
    events: [
      'picked',
      'change',
      'visible-change',
      'remove-tag',
      'clear',
      'blur',
      'focus',
      'update:modelValue'
    ],
    slots: [],
    snippet: {
      props: {}
    },
    package: '@vtj/ui'
  },
  XImportButton: {
    name: 'XImportButton',
    label: '导入按钮',
    categoryId: 'base',
    props: [
      {
        name: 'uploader',
        title: '文件上传函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'multiple',
        setters: 'BooleanSetter'
      },
      {
        name: 'accept',
        title: '接受上传的文件类型',
        setters: 'StringSetter'
      },
      {
        name: 'parser',
        setters: ['SelectSetter', 'FunctionSetter'],
        options: ['text', 'json', 'base64']
      },
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'type',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'primary', 'success', 'warning', 'danger', 'info']
      },
      {
        name: 'plain',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'text',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'bg',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'link',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'round',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'circle',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loadingIcon',
        setters: 'IconSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'icon',
        setters: 'IconSetter'
      },
      {
        name: 'autofocus',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'nativeType',
        defaultValue: 'button',
        setters: 'SelectSetter',
        options: ['button ', 'submit', 'reset']
      },
      {
        name: 'autoInsertSpace',
        setters: 'BooleanSetter'
      },
      {
        name: 'color',
        setters: 'StringSetter'
      },
      {
        name: 'dark',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'tag',
        setters: 'StringSetter',
        defaultValue: 'button'
      }
    ],
    events: ['success', 'fail'],
    slots: ['default'],
    snippet: {
      props: {}
    },
    package: '@vtj/ui'
  },
  XDialogGrid: {
    name: 'XDialogGrid',
    label: '弹窗表格',
    categoryId: 'form',
    props: [
      {
        name: 'modelValue',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'columns',
        title: '表格列配置',
        setters: 'ArraySetter'
      },
      {
        name: 'model',
        setters: 'ObjectSetter'
      },
      {
        name: 'rules',
        setters: 'ObjectSetter'
      },
      {
        name: 'formatter',
        title: ' model数据转换为表格数据',
        setters: 'FunctionSetter'
      },
      {
        name: 'valueFormatter',
        title: ' 表格数据转换为model数据',
        setters: 'FunctionSetter'
      },
      {
        name: 'puls',
        title: '显示增行按钮',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'minus',
        title: '显示删行按钮',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'submitMethod',
        title: '表单提交处理方法, return true 关闭弹窗',
        setters: 'FunctionSetter'
      },
      {
        name: 'gridProps',
        title: '表格其他配置',
        setters: 'ObjectSetter'
      },
      {
        name: 'title',
        setters: 'StringSetter'
      },
      {
        name: 'subtitle',
        setters: 'StringSetter'
      },
      {
        name: 'icon',
        setters: 'IconSetter'
      },
      {
        name: 'width',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'height',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'left',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'top',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'modal',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'draggable',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'resizable',
        setters: 'BooleanSetter'
      },
      {
        name: 'closable',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'maximizable',
        setters: 'BooleanSetter'
      },
      {
        name: 'minimizable',
        setters: 'BooleanSetter'
      },
      {
        name: 'mode',
        setters: 'SelectSetter',
        options: ['normal', 'maximized', 'minimized'],
        defaultValue: 'normal'
      },
      {
        name: 'src',
        title: '加载页码url',
        setters: 'StringSetter'
      },
      {
        name: 'beforeClose',
        title: '关闭弹窗回调函数，return true 阻止关闭',
        setters: 'FunctionSetter'
      },
      {
        name: 'bodyPadding',
        setters: 'BooleanSetter'
      },
      {
        name: 'primary',
        setters: 'BooleanSetter'
      },
      {
        name: 'fit',
        label: 'fit',
        title: '宽高自适应',
        setters: 'BooleanSetter'
      },
      {
        name: 'width',
        label: 'width',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'height',
        label: 'height',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'border',
        title: '显示边框',
        setters: 'BooleanSetter'
      },
      {
        name: 'radius',
        title: '圆角',
        setters: 'BooleanSetter'
      },
      {
        name: 'card',
        title: '卡片模式',
        setters: 'BooleanSetter'
      },
      {
        name: 'shadow',
        title: '阴影设置',
        setters: 'SelectSetter',
        options: ['none', 'always', 'hover']
      },
      {
        name: 'header',
        title: '头部设置',
        setters: ['StringSetter', 'ObjectSetter']
      },
      {
        name: 'body',
        title: 'body',
        setters: 'ObjectSetter'
      },
      {
        name: 'footer',
        title: 'footer',
        setters: 'ObjectSetter'
      }
    ],
    events: [
      {
        name: 'update:modelValue',
        params: ['modelValue']
      },
      {
        name: 'submit',
        params: ['model']
      },
      {
        name: 'close'
      }
    ],
    slots: ['buttons', 'extra', 'top'],
    snippet: {
      props: {
        title: '弹窗表格'
      }
    },
    package: '@vtj/ui'
  },
  XCaptcha: {
    name: 'XCaptcha',
    label: '图形验证码',
    categoryId: 'form',
    props: [
      {
        name: 'src',
        setters: 'FunctionSetter',
        title: '() => MaybePromise<string>'
      },
      {
        name: 'maxlength',
        title: '验证码长度',
        setters: 'NumberSetter',
        defaultValue: 4
      },
      {
        name: 'placeholder',
        setters: 'StringSetter',
        defaultValue: '请输入图形验证码'
      },
      {
        name: 'validate',
        setters: 'FunctionSetter',
        title: '校验函数：(value: string) => MaybePromise<boolean>'
      },
      {
        name: 'type',
        defaultValue: 'text',
        options: ['text', 'textarea'],
        setters: ['SelectSetter', 'InputSetter']
      },
      {
        name: 'modelValue',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'minlength',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'showWordLimit',
        defaultValue: false,
        title:
          '是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效',
        label: '字数统计',
        setters: 'BooleanSetter'
      },
      {
        name: 'clearable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'formatter',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'parser',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'showPassword',
        defaultValue: false,
        title: '是否显示切换密码图标',
        label: '密码图标',
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'prefix-icon',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'suffix-icon',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'rows',
        defaultValue: 2,
        setters: 'NumberSetter'
      },
      {
        name: 'autosize',
        defaultValue: false,
        setters: ['BooleanSetter', 'JSONStter']
      },
      {
        name: 'autocomplete',
        defaultValue: 'off',
        setters: 'InputSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'readonly',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'max',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'min',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'step',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'resize',
        defaultValue: '',
        options: ['none', 'both', 'horizontal', 'vertical'],
        setters: 'InputSetter'
      },
      {
        name: 'autofocus',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'form',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'aria-label',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'tabindex',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        title: '输入时是否触发表单的校验',
        label: '表单校验',
        setters: 'BooleanSetter'
      },
      {
        name: 'inputStyle',
        defaultValue: {},
        setters: ['JSONSetter']
      }
    ],
    events: [
      {
        name: 'blur'
      },
      {
        name: 'focus'
      },
      {
        name: 'change'
      },
      {
        name: 'input'
      },
      {
        name: 'clear'
      },
      {
        name: 'update:modelValue'
      }
    ],
    snippet: {
      props: {
        src: {
          type: 'JSFunction',
          value: "() => 'https://dummyimage.com/300x120'"
        }
      }
    },
    package: '@vtj/ui'
  },
  XVerify: {
    name: 'XVerify',
    label: '短信验证码',
    categoryId: 'form',
    props: [
      {
        name: 'api',
        setters: 'FunctionSetter',
        title: '() => Promise<boolean>'
      },
      {
        name: 'maxlength',
        title: '验证码长度',
        setters: 'NumberSetter',
        defaultValue: 6
      },
      {
        name: 'placeholder',
        setters: 'StringSetter',
        defaultValue: '请输入图形验证码'
      },
      {
        name: 'seconds',
        setters: 'NumberSetter',
        title: '可重发秒数',
        defaultValue: 60
      },
      {
        name: 'type',
        defaultValue: 'text',
        options: ['text', 'textarea'],
        setters: ['SelectSetter', 'InputSetter']
      },
      {
        name: 'modelValue',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'minlength',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'showWordLimit',
        defaultValue: false,
        title:
          '是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效',
        label: '字数统计',
        setters: 'BooleanSetter'
      },
      {
        name: 'clearable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'formatter',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'parser',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'showPassword',
        defaultValue: false,
        title: '是否显示切换密码图标',
        label: '密码图标',
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'prefix-icon',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'suffix-icon',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'rows',
        defaultValue: 2,
        setters: 'NumberSetter'
      },
      {
        name: 'autosize',
        defaultValue: false,
        setters: ['BooleanSetter', 'JSONStter']
      },
      {
        name: 'autocomplete',
        defaultValue: 'off',
        setters: 'InputSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'readonly',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'max',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'min',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'step',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'resize',
        defaultValue: '',
        options: ['none', 'both', 'horizontal', 'vertical'],
        setters: 'InputSetter'
      },
      {
        name: 'autofocus',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'form',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'aria-label',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'tabindex',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        title: '输入时是否触发表单的校验',
        label: '表单校验',
        setters: 'BooleanSetter'
      },
      {
        name: 'inputStyle',
        defaultValue: {},
        setters: ['JSONSetter']
      }
    ],
    events: [
      {
        name: 'blur'
      },
      {
        name: 'focus'
      },
      {
        name: 'change'
      },
      {
        name: 'input'
      },
      {
        name: 'clear'
      },
      {
        name: 'update:modelValue'
      }
    ],
    snippet: {
      props: {
        src: {
          type: 'JSFunction',
          value: 'async () => true'
        }
      }
    },
    package: '@vtj/ui'
  },
  ElAffix: {
    name: 'ElAffix',
    label: '固钉',
    categoryId: 'nav',
    doc: 'https://element-plus.org/zh-CN/component/affix.html',
    package: 'element-plus',
    props: [
      {
        name: 'offset',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'position',
        defaultValue: 'top',
        setters: 'SelectSetter',
        options: ['top', 'bottom']
      },
      {
        name: 'target',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'z-index',
        defaultValue: 100,
        setters: 'NumberSetter'
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'scroll'
      }
    ],
    slots: ['default'],
    snippet: {
      name: 'ElAffix',
      children: [
        {
          name: 'ElButton',
          props: {
            type: 'primary'
          },
          children: 'Affix 固钉'
        }
      ]
    }
  },
  ElAlert: {
    name: 'ElAlert',
    childIncludes: true,
    label: '提示',
    doc: 'https://element-plus.org/zh-CN/component/alert.html',
    categoryId: 'other',
    package: 'element-plus',
    props: [
      {
        name: 'title',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'type',
        defaultValue: 'info',
        setters: 'SelectSetter',
        options: ['success', 'warning', 'info', 'error']
      },
      {
        name: 'description',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'closable',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'center',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'closeText',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'showIcon',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'effect',
        defaultValue: 'light',
        setters: 'SelectSetter',
        options: ['light', 'dark']
      }
    ],
    events: [
      {
        name: 'close'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'title'
      }
    ],
    snippet: {
      props: {
        title: 'success alert',
        type: 'success'
      }
    }
  },
  ElAnchor: {
    name: 'ElAnchor',
    label: '锚点',
    doc: 'https://element-plus.org/zh-CN/component/anchor.html',
    categoryId: 'other',
    package: 'element-plus',
    props: [
      {
        name: 'container',
        label: 'container',
        title: '滚动的容器',
        setters: 'StringSetter'
      },
      {
        name: 'offset',
        label: 'offset',
        title: '设置锚点滚动的偏移量',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'bound',
        label: 'bound',
        title: '触发锚点的元素的位置偏移量',
        setters: 'NumberSetter',
        defaultValue: 15
      },
      {
        name: 'duration',
        label: 'duration',
        title: '设置容器滚动持续时间，单位为毫秒',
        setters: 'NumberSetter',
        defaultValue: 300
      },
      {
        name: 'marker',
        label: 'marker',
        title: '是否显示标记',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'type',
        label: 'type',
        title: '设置锚点类型',
        setters: 'SelectSetter',
        options: ['default', 'underline'],
        defaultValue: 'default'
      },
      {
        name: 'direction',
        label: 'direction',
        title: '设置锚点方向',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal'],
        defaultValue: 'horizontal'
      },
      {
        name: 'selectScrollTop',
        title: '滚动时，链接是否选中位于顶部',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['change', 'click'],
    slots: ['default'],
    snippet: {
      props: {
        offset: '70'
      },
      children: [
        {
          name: 'ElAnchorLink',
          props: {
            href: ''
          },
          children: '基本用法'
        }
      ]
    }
  },
  ElAnchorLink: {
    name: 'ElAnchorLink',
    label: '锚点链接',
    doc: 'https://element-plus.org/zh-CN/component/anchor.html',
    categoryId: 'other',
    package: 'element-plus',
    props: [
      {
        name: 'title',
        label: 'title',
        title: '链接的文本内容',
        setters: 'StringSetter'
      },
      {
        name: 'href',
        label: 'href',
        title: '链接的地址',
        setters: 'StringSetter'
      }
    ],
    slots: ['default', 'sub-link'],
    snippet: {
      props: {
        href: ''
      },
      children: '基本用法'
    }
  },
  ElAutocomplete: {
    name: 'ElAutocomplete',
    label: '自动补全输入框',
    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/autocomplete.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: '',
        title: '选中项绑定值',
        setters: 'StringSetter'
      },
      {
        name: 'placeholder',
        title: '占位文本',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'clearable',
        title: '是否可清空',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '自动补全组件是否被禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'valueKey',
        title: '输入建议对象中用于显示的键名',
        defaultValue: 'value',
        setters: 'StringSetter'
      },
      {
        name: 'debounce',
        defaultValue: 300,
        title: '获取输入建议的防抖延时',
        setters: 'NumberSetter'
      },
      {
        name: 'placement',
        defaultValue: 'bottom-start',
        title: '菜单弹出位置',
        options: [
          'top ',
          'top-start',
          'top-end',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end'
        ],
        setters: 'SelectSetter'
      },
      {
        name: 'fetchSuggestions',
        defaultValue: '',
        title: '获取输入建议的方法',
        setters: ['ArraySetter', 'FunctionSetter']
      },
      {
        name: 'triggerOnFocus',
        defaultValue: true,
        title: '是否在输入框focus时显示建议列表',
        setters: 'BooleanSetter'
      },
      {
        name: 'selectWhenUnmatched',
        defaultValue: false,
        title: '在输入没有任何匹配建议的情况下，按下回车是否触发select事件',
        setters: 'BooleanSetter'
      },
      {
        name: 'name',
        title: '等价于原生 input name 属性',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'aria-label',
        defaultValue: '',
        title: '原生 aria-label属性',
        setters: 'StringSetter'
      },
      {
        name: 'hideLoading',
        title: '是否隐藏远程加载时的加载图标',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'popperClass',
        defaultValue: '',
        title: '下拉列表的类名',
        setters: 'StringSetter'
      },
      {
        name: 'teleported',
        title: '是否将下拉列表元素插入 append-to 指向的元素下',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'highlightFirstItem',
        defaultValue: false,
        title: '是否默认突出显示远程搜索建议中的第一项',
        setters: 'BooleanSetter'
      },
      {
        name: 'fit-input-width',
        defaultValue: false,
        title: '下拉框是否与输入框同宽',
        setters: 'BooleanSetter'
      },
      {
        name: 'popperAppendToBody',
        defaultValue: false,
        title: '是否将下拉列表插入至body元素',
        setters: 'BooleanSetter'
      }
    ],
    slots: [
      {
        name: 'default',
        params: ['item']
      },
      {
        name: 'prefix'
      },
      {
        name: 'suffix'
      },
      {
        name: 'prepend'
      },
      {
        name: 'append'
      },
      {
        name: 'loading'
      }
    ],
    events: [
      {
        name: 'update:modelValue'
      },
      {
        name: 'select'
      },
      {
        name: 'change'
      }
    ],
    snippet: {
      props: {
        fetchSuggestions: {
          type: 'JSFunction',
          value:
            "(function (queryString, cb) {\r\n\r\n    const list = [\r\n        { value: 'vue', link: 'https://github.com/vuejs/vue' },\r\n        { value: 'element', link: 'https://github.com/ElemeFE/element' },\r\n        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },\r\n        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },\r\n        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },\r\n        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },\r\n        { value: 'babel', link: 'https://github.com/babel/babel' }\r\n    ];\r\n\r\n    const results = list.filter(n => n.value.startsWith(queryString));\r\n\r\n    cb(results);\r\n\r\n})"
        }
      }
    }
  },
  ElAvatar: {
    name: 'ElAvatar',
    label: '头像',
    categoryId: 'data',
    doc: 'https://element-plus.org/zh-CN/component/avatar.html',
    package: 'element-plus',
    props: [
      {
        name: 'icon',
        defaultValue: '',
        setters: 'IconSetter'
      },
      {
        name: 'size',
        setters: ['SelectSetter', 'NumberSetter'],
        options: ['large', 'default', 'small'],
        defaultValue: 'default'
      },
      {
        name: 'shape',
        defaultValue: 'circle',
        options: ['circle', 'square'],
        setters: 'SelectSetter'
      },
      {
        name: 'src',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'srcSet',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'alt',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'fit',
        defaultValue: 'cover',
        options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        setters: 'SelectSetter'
      }
    ],
    events: ['error'],
    slots: ['default', 'icon'],
    snippet: {
      props: {
        src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      }
    }
  },
  ElBacktop: {
    name: 'ElBacktop',
    label: '回到顶部',
    categoryId: 'nav',
    doc: 'https://element-plus.org/zh-CN/component/backtop.html',
    package: 'element-plus',
    props: [
      {
        name: 'target',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'visibilityHeight',
        defaultValue: 200,
        setters: 'NumberSetter'
      },
      {
        name: 'right',
        defaultValue: 40,
        setters: 'NumberSetter'
      },
      {
        name: 'bottom',
        defaultValue: 40,
        setters: 'NumberSetter'
      }
    ],
    events: [
      {
        name: 'click'
      }
    ],
    slots: ['default'],
    snippet: {
      name: 'ElBacktop',
      children: [
        {
          name: 'component',
          props: {
            is: 'div',
            style: {
              height: '100%',
              textAlign: 'center',
              width: '100px',
              lineHeight: '40px',
              color: '#1989fa'
            }
          },
          children: 'UP'
        }
      ]
    }
  },
  ElBadge: {
    name: 'ElBadge',
    label: '徽章',
    categoryId: 'data',
    doc: 'https://element-plus.org/zh-CN/component/badge.html',
    package: 'element-plus',
    props: [
      {
        name: 'value',
        defaultValue: '',
        title: '显示值',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'max',
        defaultValue: 99,
        setters: 'NumberSetter'
      },
      {
        name: 'isDot',
        defaultValue: false,
        title: '是否显示小圆点。',
        setters: 'BooleanSetter'
      },
      {
        name: 'hidden',
        defaultValue: false,
        title: '是否隐藏 Badge。',
        setters: 'BooleanSetter'
      },
      {
        name: 'type',
        defaultValue: 'danger',
        title: 'badge 类型。',
        options: ['primary', 'success', 'warning', 'danger', 'info'],
        setters: 'SelectSetter'
      },
      {
        name: 'showZero',
        title: '值为零时是否显示 Badge  ',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'color',
        title: '背景色',
        setters: 'ColorSetter'
      },
      {
        name: 'offset',
        title: 'badge 的偏移量',
        setters: 'ArraySetter'
      },
      {
        name: 'badgeStyle',
        title: '自定义 badge 样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'badgeClass',
        title: '自定义 badge 类名',
        setters: 'StringSetter'
      }
    ],
    slots: ['default', 'content'],
    snippet: {
      props: {
        value: 12
      },
      children: [
        {
          name: 'ElButton',
          children: '评论'
        }
      ]
    }
  },
  ElBreadcrumb: {
    name: 'ElBreadcrumb',
    childIncludes: ['ElBreadcrumbItem'],
    label: '面包屑',
    categoryId: 'nav',
    doc: 'https://element-plus.org/zh-CN/component/breadcrumb.html',
    package: 'element-plus',
    props: [
      {
        name: 'separator',
        defaultValue: '/',
        setters: 'InputSetter'
      },
      {
        name: 'separatorIcon',
        defaultValue: '',
        setters: ['InputSetter']
      }
    ],
    slots: ['default', 'separatorIcon'],
    snippet: {
      children: [
        {
          name: 'ElBreadcrumbItem',
          children: '主页'
        },
        {
          name: 'ElBreadcrumbItem',
          children: '列表'
        },
        {
          name: 'ElBreadcrumbItem',
          children: '详情'
        }
      ]
    }
  },
  ElBreadcrumbItem: {
    name: 'ElBreadcrumbItem',
    label: '面包屑项',
    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'to',
        defaultValue: '',
        setters: ['InputSetter', 'JSONSetter']
      },
      {
        name: 'replace',
        defaultValue: '',
        setters: 'InputSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      name: 'ElBreadcrumbItem',
      children: 'BreadcrumbItem'
    }
  },
  ElButton: {
    name: 'ElButton',
    label: '按钮',
    categoryId: 'base',
    doc: 'https://element-plus.org/zh-CN/component/button.html',
    props: [
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'type',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'primary', 'success', 'warning', 'danger', 'info']
      },
      {
        name: 'plain',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'text',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'bg',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'link',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'round',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'circle',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loadingIcon',
        setters: 'IconSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'icon',
        setters: 'IconSetter'
      },
      {
        name: 'autofocus',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'nativeType',
        defaultValue: 'button',
        setters: 'SelectSetter',
        options: ['button ', 'submit', 'reset']
      },
      {
        name: 'autoInsertSpace',
        setters: 'BooleanSetter'
      },
      {
        name: 'color',
        setters: 'StringSetter'
      },
      {
        name: 'dark',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'tag',
        setters: 'StringSetter',
        defaultValue: 'button'
      }
    ],
    events: ['click'],
    slots: ['default', 'loading', 'icon', 'tag'],
    snippet: {
      name: 'ElButton',
      children: '按钮',
      props: {
        type: 'primary'
      }
    },
    package: 'element-plus'
  },
  ElButtonGroup: {
    name: 'ElButtonGroup',
    childIncludes: ['ElButton'],
    label: '按钮组',
    categoryId: 'base',
    props: [
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'type',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'primary', 'success', 'warning', 'danger', 'info']
      }
    ],
    slots: ['default'],
    snippet: {
      name: 'ElButtonGroup',
      children: [
        {
          name: 'ElButton',
          children: 'Button1'
        },
        {
          name: 'ElButton',
          children: 'Button2'
        },
        {
          name: 'ElButton',
          children: 'Button3'
        }
      ]
    },
    package: 'element-plus'
  },
  ElCalendar: {
    name: 'ElCalendar',
    label: '日历',
    categoryId: 'data',
    doc: 'https://element-plus.org/zh-CN/component/calendar.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: '',
        setters: ['StringSetter', 'ExpressionSetter']
      },
      {
        name: 'range',
        defaultValue: '',
        setters: ['ArraySetter', 'JSONSetter']
      }
    ],
    events: ['update:modelValue'],
    slots: [
      {
        name: 'date-cell'
      },
      {
        name: 'header'
      }
    ]
  },
  ElCard: {
    name: 'ElCard',
    label: '卡片',
    categoryId: 'data',
    package: 'element-plus',
    doc: 'https://element-plus.org/zh-CN/component/card.html',
    props: [
      {
        name: 'header',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'footer',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'bodyStyle',
        setters: 'JSONSetter'
      },
      {
        name: 'bodyClass',
        setters: 'StringSetter'
      },
      {
        name: 'shadow',
        defaultValue: 'always',
        options: ['always', 'hover', 'never'],
        setters: 'SelectSetter'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'header'
      },
      {
        name: 'footer'
      }
    ],
    snippet: {
      props: {
        header: '标题'
      },
      children: '内容文本'
    }
  },
  ElCarousel: {
    name: 'ElCarousel',
    label: '走马灯',
    categoryId: 'data',
    doc: 'https://element-plus.org/zh-CN/component/carousel.html',
    childIncludes: ['ElCarouselItem'],
    package: 'element-plus',
    props: [
      {
        name: 'height',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'initialIndex',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'trigger',
        defaultValue: 'hover',
        options: ['hover', 'click'],
        setters: 'SelectSetter'
      },
      {
        name: 'autoplay',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'interval',
        defaultValue: 3000,
        setters: 'NumberSetter'
      },
      {
        name: 'indicatorPosition',
        defaultValue: '',
        options: ['', 'outside', 'none'],
        label: '指示器',
        setters: 'InputSetter'
      },
      {
        name: 'arrow',
        defaultValue: 'hover',
        options: ['always', 'hover', 'never'],
        setters: 'SelectSetter'
      },
      {
        name: 'type',
        defaultValue: '',
        options: ['', 'card'],
        setters: 'SelectSetter'
      },
      {
        name: 'cardScale',
        defaultValue: 0.83,
        setters: 'NumberSetter'
      },
      {
        name: 'loop',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'direction',
        defaultValue: 'horizontal',
        options: ['horizontal', 'vertical'],
        setters: 'SelectSetter'
      },
      {
        name: 'pauseOnHover',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'motionBlur',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['change'],
    slots: ['default'],
    snippet: {
      props: {
        height: '300px',
        style: {
          width: '100%'
        }
      },
      children: [
        {
          name: 'ElCarouselItem',
          props: {
            style: {
              width: '100%'
            }
          },
          children: [
            {
              name: 'component',
              props: {
                is: 'img',
                style: {
                  width: '100%',
                  height: '300px'
                },
                src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              }
            }
          ],
          directives: [
            {
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value: '3'
              }
            }
          ]
        }
      ]
    }
  },
  ElCarouselItem: {
    name: 'ElCarouselItem',
    label: '走马灯子项',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'label',
        defaultValue: '',
        setters: 'InputSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        style: {
          width: '100%'
        }
      },
      children: [
        {
          name: 'component',
          props: {
            is: 'img',
            style: {
              width: '100%',
              height: '300px'
            },
            src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          }
        }
      ]
    }
  },
  ElCascader: {
    name: 'ElCascader',
    label: '级联选择器',
    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/cascader.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '选中项绑定值',
        setters: ['StringSetter', 'NumberSetter', 'ObjectSetter']
      },
      {
        name: 'options',
        title: '选项的数据源， value 和 label 可以通过 CascaderProps 自定义',
        defaultValue: [],
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'props',
        title: '配置选项',
        setters: ['ObjectSetter', 'JSONSetter']
      },
      {
        name: 'size',
        defaultValue: '',
        title: '尺寸',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'placeholder',
        title: '输入框占位文本',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'clearable',
        title: '是否支持清空选项',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'showAllLevels',
        defaultValue: true,
        title: '输入框中是否显示选中值的完整路径',
        setters: 'BooleanSetter'
      },
      {
        name: 'collapseTags',
        title: '多选模式下是否折叠Tag',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'collapseTagsTooltip',
        defaultValue: false,
        title:
          '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapseTags属性必须设定为 true',
        setters: 'BooleanSetter'
      },
      {
        name: 'separator',
        title: '用于分隔选项的字符',
        defaultValue: '/',
        setters: 'StringSetter'
      },
      {
        name: 'filterable',
        title: '该选项是否可以被搜索',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'filterMethod',
        title:
          '自定义搜索逻辑，第一个参数是node，第二个参数是keyword，返回的布尔值表示是否保留该选项',
        defaultValue: '',
        setters: ['FunctionSetter', 'ExpressionSetter']
      },
      {
        name: 'debounce',
        title: '搜索关键词正在输入时的去抖延迟，单位为毫秒',
        defaultValue: 300,
        setters: 'NumberSetter'
      },
      {
        name: 'beforeFilter',
        title:
          '过滤函数调用前，所要调用的钩子函数，该函数接收要过滤的值作为参数。 如果该函数的返回值是 false 或者是一个被拒绝的 Promise，那么接下来的过滤逻辑便不会执行',
        defaultValue: '',
        setters: ['FunctionSetter', 'ExpressionSetter']
      },
      {
        name: 'popperClass',
        title: '弹出内容的自定义类名',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'teleported',
        title: '弹层是否使用 teleport',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'tagType',
        title: '标签类型',
        defaultValue: 'info',
        options: ['success', 'info', 'warning', 'danger'],
        setters: 'SelectSetter'
      },
      {
        name: 'tag-effect',
        title: 'tag effect',
        defaultValue: 'light',
        options: ['light', 'dark', 'plain'],
        setters: 'SelectSetter'
      },
      {
        name: 'validateEvent',
        title: '输入时是否触发表单的校验',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'maxCollapseTags',
        title:
          '需要显示的 Tag 的最大数量 只有当 collapse-tags 设置为 true 时才会生效。',
        setters: 'NumberSetter',
        defaultValue: 1
      },
      {
        name: 'empty-values',
        title: '组件的空值配置',
        setters: 'ArraySetter'
      },
      {
        name: 'value-on-clear',
        title: '清空选项的值',
        setters: [
          'StringSetter',
          'NumberSetter',
          'BooleanSetter',
          'ArraySetter'
        ]
      },
      {
        name: 'persistent',
        title:
          '当下拉框未被激活并且persistent设置为false，下拉框容器会被删除。',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'fallback-placements',
        title: 'Tooltip 可用的 positions',
        setters: 'ArraySetter'
      },
      {
        name: 'placement',
        title: '下拉框出现的位置',
        defaultValue: 'bottom-start',
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ],
        setters: 'SelectSetter'
      },
      {
        name: 'popperAppendToBody',
        defaultValue: true,
        title:
          '是否将弹出的内容直接插入到 body 元素。 在弹出内容的边框定位出现问题时，可将该属性设置为 false',
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'expand-change'
      },
      {
        name: 'blur'
      },
      {
        name: 'focus'
      },
      {
        name: 'clear'
      },
      {
        name: 'visible-change'
      },
      {
        name: 'remove-tag'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: [
      {
        name: 'default',
        params: ['node', 'data']
      },
      {
        name: 'empty'
      }
    ],
    snippet: {
      props: {
        options: [
          {
            value: 'guide',
            label: 'Guide',
            children: [
              {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                  {
                    value: 'consistency',
                    label: 'Consistency'
                  },
                  {
                    value: 'feedback',
                    label: 'Feedback'
                  },
                  {
                    value: 'efficiency',
                    label: 'Efficiency'
                  },
                  {
                    value: 'controllability',
                    label: 'Controllability'
                  }
                ]
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'side nav',
                    label: 'Side Navigation'
                  },
                  {
                    value: 'top nav',
                    label: 'Top Navigation'
                  }
                ]
              }
            ]
          },
          {
            value: 'component',
            label: 'Component',
            children: [
              {
                value: 'basic',
                label: 'Basic',
                children: [
                  {
                    value: 'layout',
                    label: 'Layout'
                  },
                  {
                    value: 'color',
                    label: 'Color'
                  },
                  {
                    value: 'typography',
                    label: 'Typography'
                  },
                  {
                    value: 'icon',
                    label: 'Icon'
                  },
                  {
                    value: 'button',
                    label: 'Button'
                  }
                ]
              },
              {
                value: 'form',
                label: 'Form',
                children: [
                  {
                    value: 'radio',
                    label: 'Radio'
                  },
                  {
                    value: 'checkbox',
                    label: 'Checkbox'
                  },
                  {
                    value: 'input',
                    label: 'Input'
                  },
                  {
                    value: 'input-number',
                    label: 'InputNumber'
                  },
                  {
                    value: 'select',
                    label: 'Select'
                  },
                  {
                    value: 'cascader',
                    label: 'Cascader'
                  },
                  {
                    value: 'switch',
                    label: 'Switch'
                  },
                  {
                    value: 'slider',
                    label: 'Slider'
                  },
                  {
                    value: 'time-picker',
                    label: 'TimePicker'
                  },
                  {
                    value: 'date-picker',
                    label: 'DatePicker'
                  },
                  {
                    value: 'datetime-picker',
                    label: 'DateTimePicker'
                  },
                  {
                    value: 'upload',
                    label: 'Upload'
                  },
                  {
                    value: 'rate',
                    label: 'Rate'
                  },
                  {
                    value: 'form',
                    label: 'Form'
                  }
                ]
              },
              {
                value: 'data',
                label: 'Data',
                children: [
                  {
                    value: 'table',
                    label: 'Table'
                  },
                  {
                    value: 'tag',
                    label: 'Tag'
                  },
                  {
                    value: 'progress',
                    label: 'Progress'
                  },
                  {
                    value: 'tree',
                    label: 'Tree'
                  },
                  {
                    value: 'pagination',
                    label: 'Pagination'
                  },
                  {
                    value: 'badge',
                    label: 'Badge'
                  }
                ]
              },
              {
                value: 'notice',
                label: 'Notice',
                children: [
                  {
                    value: 'alert',
                    label: 'Alert'
                  },
                  {
                    value: 'loading',
                    label: 'Loading'
                  },
                  {
                    value: 'message',
                    label: 'Message'
                  },
                  {
                    value: 'message-box',
                    label: 'MessageBox'
                  },
                  {
                    value: 'notification',
                    label: 'Notification'
                  }
                ]
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'menu',
                    label: 'Menu'
                  },
                  {
                    value: 'tabs',
                    label: 'Tabs'
                  },
                  {
                    value: 'breadcrumb',
                    label: 'Breadcrumb'
                  },
                  {
                    value: 'dropdown',
                    label: 'Dropdown'
                  },
                  {
                    value: 'steps',
                    label: 'Steps'
                  }
                ]
              },
              {
                value: 'others',
                label: 'Others',
                children: [
                  {
                    value: 'dialog',
                    label: 'Dialog'
                  },
                  {
                    value: 'tooltip',
                    label: 'Tooltip'
                  },
                  {
                    value: 'popover',
                    label: 'Popover'
                  },
                  {
                    value: 'card',
                    label: 'Card'
                  },
                  {
                    value: 'carousel',
                    label: 'Carousel'
                  },
                  {
                    value: 'collapse',
                    label: 'Collapse'
                  }
                ]
              }
            ]
          },
          {
            value: 'resource',
            label: 'Resource',
            children: [
              {
                value: 'axure',
                label: 'Axure Components'
              },
              {
                value: 'sketch',
                label: 'Sketch Templates'
              },
              {
                value: 'docs',
                label: 'Design Documentation'
              }
            ]
          }
        ],
        props: {},
        modelValue: []
      }
    }
  },
  ElCascaderPanel: {
    name: 'ElCascaderPanel',
    label: '级联面板',
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '选中项绑定值',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter', 'JSONSetter']
      },
      {
        name: 'options',
        title: '选项的数据源',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'props',
        title: '配置选项',
        defaultValue: '',
        setters: 'JSONSetter'
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'expand-change'
      },
      {
        name: 'close'
      }
    ],
    slots: [
      {
        name: 'default',
        params: ['node', 'data']
      },
      {
        name: 'empty'
      }
    ],
    snippet: {
      props: {
        options: [
          {
            value: 'guide',
            label: 'Guide',
            children: [
              {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                  {
                    value: 'consistency',
                    label: 'Consistency'
                  },
                  {
                    value: 'feedback',
                    label: 'Feedback'
                  },
                  {
                    value: 'efficiency',
                    label: 'Efficiency'
                  },
                  {
                    value: 'controllability',
                    label: 'Controllability'
                  }
                ]
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'side nav',
                    label: 'Side Navigation'
                  },
                  {
                    value: 'top nav',
                    label: 'Top Navigation'
                  }
                ]
              }
            ]
          },
          {
            value: 'component',
            label: 'Component',
            children: [
              {
                value: 'basic',
                label: 'Basic',
                children: [
                  {
                    value: 'layout',
                    label: 'Layout'
                  },
                  {
                    value: 'color',
                    label: 'Color'
                  },
                  {
                    value: 'typography',
                    label: 'Typography'
                  },
                  {
                    value: 'icon',
                    label: 'Icon'
                  },
                  {
                    value: 'button',
                    label: 'Button'
                  }
                ]
              },
              {
                value: 'form',
                label: 'Form',
                children: [
                  {
                    value: 'radio',
                    label: 'Radio'
                  },
                  {
                    value: 'checkbox',
                    label: 'Checkbox'
                  },
                  {
                    value: 'input',
                    label: 'Input'
                  },
                  {
                    value: 'input-number',
                    label: 'InputNumber'
                  },
                  {
                    value: 'select',
                    label: 'Select'
                  },
                  {
                    value: 'cascader',
                    label: 'Cascader'
                  },
                  {
                    value: 'switch',
                    label: 'Switch'
                  },
                  {
                    value: 'slider',
                    label: 'Slider'
                  },
                  {
                    value: 'time-picker',
                    label: 'TimePicker'
                  },
                  {
                    value: 'date-picker',
                    label: 'DatePicker'
                  },
                  {
                    value: 'datetime-picker',
                    label: 'DateTimePicker'
                  },
                  {
                    value: 'upload',
                    label: 'Upload'
                  },
                  {
                    value: 'rate',
                    label: 'Rate'
                  },
                  {
                    value: 'form',
                    label: 'Form'
                  }
                ]
              },
              {
                value: 'data',
                label: 'Data',
                children: [
                  {
                    value: 'table',
                    label: 'Table'
                  },
                  {
                    value: 'tag',
                    label: 'Tag'
                  },
                  {
                    value: 'progress',
                    label: 'Progress'
                  },
                  {
                    value: 'tree',
                    label: 'Tree'
                  },
                  {
                    value: 'pagination',
                    label: 'Pagination'
                  },
                  {
                    value: 'badge',
                    label: 'Badge'
                  }
                ]
              },
              {
                value: 'notice',
                label: 'Notice',
                children: [
                  {
                    value: 'alert',
                    label: 'Alert'
                  },
                  {
                    value: 'loading',
                    label: 'Loading'
                  },
                  {
                    value: 'message',
                    label: 'Message'
                  },
                  {
                    value: 'message-box',
                    label: 'MessageBox'
                  },
                  {
                    value: 'notification',
                    label: 'Notification'
                  }
                ]
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'menu',
                    label: 'Menu'
                  },
                  {
                    value: 'tabs',
                    label: 'Tabs'
                  },
                  {
                    value: 'breadcrumb',
                    label: 'Breadcrumb'
                  },
                  {
                    value: 'dropdown',
                    label: 'Dropdown'
                  },
                  {
                    value: 'steps',
                    label: 'Steps'
                  }
                ]
              },
              {
                value: 'others',
                label: 'Others',
                children: [
                  {
                    value: 'dialog',
                    label: 'Dialog'
                  },
                  {
                    value: 'tooltip',
                    label: 'Tooltip'
                  },
                  {
                    value: 'popover',
                    label: 'Popover'
                  },
                  {
                    value: 'card',
                    label: 'Card'
                  },
                  {
                    value: 'carousel',
                    label: 'Carousel'
                  },
                  {
                    value: 'collapse',
                    label: 'Collapse'
                  }
                ]
              }
            ]
          },
          {
            value: 'resource',
            label: 'Resource',
            children: [
              {
                value: 'axure',
                label: 'Axure Components'
              },
              {
                value: 'sketch',
                label: 'Sketch Templates'
              },
              {
                value: 'docs',
                label: 'Design Documentation'
              }
            ]
          }
        ],
        props: {},
        modelValue: []
      }
    }
  },
  ElCheckbox: {
    name: 'ElCheckbox',
    label: '多选框',
    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/checkbox.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '选中项绑定值',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'label',
        title:
          '选中状态的值，只有在绑定对象类型为 array 时有效。 如果没有 value， label则作为value使用',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'value',
        title:
          '选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效）',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter', 'JSONSetter']
      },
      {
        name: 'trueValue',
        title: '选中时的值',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'falseValue',
        title: '没有选中时的值',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        title: '是否显示边框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        title: 'Checkbox 的尺寸',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'checked',
        title: '当前是否勾选',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'indeterminate',
        defaultValue: false,
        title: '设置 indeterminate 状态，只负责样式控制',
        setters: 'BooleanSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        title: '输入时是否触发表单的校验',
        setters: 'BooleanSetter'
      },
      {
        name: 'tabindex',
        label: 'tabindex',
        title: '输入框的 tabindex',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'id',
        label: 'id',
        title: 'input id',
        setters: 'StringSetter'
      },
      {
        name: 'aria-controls',
        title: '与 aria-control一致, 当 indeterminate为 true时生效',
        setters: 'BooleanSetter'
      },
      {
        name: 'trueLabel',
        title: '选中时的值(deprecated)',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'falseLabel',
        title: '没有选中时的值(deprecated)',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'controls(deprecated)',
        title: '与 aria-control一致, 当 indeterminate为 true时生效',
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        label: '选项一',
        value: 1
      }
    }
  },
  ElCheckboxGroup: {
    name: 'ElCheckboxGroup',
    label: '多选框组',
    childIncludes: ['ElCheckbox', 'ElCheckboxButton'],
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '绑定值',
        defaultValue: [],
        setters: 'JSONSetter'
      },
      {
        name: 'size',
        title: '多选框组尺寸',
        defaultValue: '',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'min',
        title: '可被勾选的 checkbox 的最小数量',
        defaultValue: '',
        setters: 'NumberSetter'
      },
      {
        name: 'max',
        title: '可被勾选的 checkbox 的最大数量',
        defaultValue: '',
        setters: 'NumberSetter'
      },
      {
        name: 'aria-label',
        title: '原生 aria-label属性',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'textColor',
        title: '当按钮为活跃状态时的字体颜色',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      },
      {
        name: 'fill',
        defaultValue: '#409EFF',
        title: '当按钮为活跃状态时的边框和背景颜色',
        setters: 'ColorSetter'
      },
      {
        name: 'tag',
        defaultValue: 'div',
        title: '复选框组元素标签',
        setters: 'StringSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        title: '输入时是否触发表单的校验',
        setters: 'BooleanSetter'
      },
      {
        name: 'label',
        title: '原生 aria-label属性',
        defaultValue: '',
        setters: 'StringSetter'
      }
    ],
    events: ['change', 'update:modelValue'],
    slots: ['default'],
    snippet: {
      children: [
        {
          name: 'ElCheckbox',
          props: {
            label: '选项一',
            value: '1'
          }
        },
        {
          name: 'ElCheckbox',
          props: {
            label: '选项二',
            value: '2'
          }
        },
        {
          name: 'ElCheckbox',
          props: {
            label: '选项三',
            value: '3'
          }
        }
      ]
    }
  },
  ElCheckboxButton: {
    name: 'ElCheckboxButton',
    label: '按钮样式的多选组合',
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '选中状态的值，只有在绑定对象类型为 array 时有效。',
        defaultValue: [],
        setters: ['StringSetter', 'NumberSetter', 'BooleanSetter', 'JSONSetter']
      },
      {
        name: 'label',
        title:
          '选中状态的值，只有在绑定对象类型为 array 时有效。 如果没有 value， label则作为value使用',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter', 'BooleanSetter', 'JSONSetter']
      },
      {
        name: 'trueValue',
        title: '选中时的值',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'falseValue',
        title: '没有选中时的值',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'name',
        title: '原生 name 属性',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'checked',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'trueLabel',
        title: '选中时的值',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'falseLabel',
        title: '没有选中时的值',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter']
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        label: '按钮选项'
      }
    }
  },
  ElCollapse: {
    name: 'ElCollapse',
    label: '折叠面板',
    categoryId: 'data',
    doc: 'https://element-plus.org/zh-CN/component/collapse.html',
    childIncludes: ['ElCollapseItem'],
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: '',
        title:
          '当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array)',
        setters: ['InputSetter', 'ArraySetter', 'JSONSetter']
      },
      {
        name: 'accordion',
        defaultValue: false,
        title: '是否手风琴模式',
        setters: 'BooleanSetter'
      }
    ],
    events: ['change'],
    slots: ['default'],
    snippet: {
      children: [
        {
          name: 'ElCollapseItem',
          children: '面板内容',
          props: {
            title: '面板标题'
          },
          directives: [
            {
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value: '3'
              }
            }
          ]
        }
      ]
    }
  },
  ElCollapseItem: {
    name: 'ElCollapseItem',
    label: '折叠面板子项',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'name',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'title',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'icon',
        defaultValue: 'ArrowRight',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['change'],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'title'
      },
      {
        name: 'icon'
      }
    ],
    snippet: {
      children: '面板内容',
      props: {
        title: '面板标题'
      }
    }
  },
  ElColorPicker: {
    name: 'ElColorPicker',
    label: '取色器',
    categoryId: 'form',
    childIncludes: false,
    doc: 'https://element-plus.org/zh-CN/component/color-picker.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '选中项绑定值',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: '',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'showAlpha',
        title: '是否支持透明度选择',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'colorFormat',
        title: '写入 v-model 的颜色的格式',
        defaultValue: '',
        options: ['hsl', 'hsv', 'hex', 'rgb'],
        setters: 'SelectSetter'
      },
      {
        name: 'popperClass',
        title: 'ColorPicker 下拉框的类名',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'predefine',
        title: '预定义颜色',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'validateEvent',
        title: '输入时是否触发表单的校验',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'tabindex',
        label: 'tabindex',
        title: 'ColorPicker 的 tabindex',
        setters: ['StringSetter', 'NumberSetter'],
        defaultValue: 0
      },
      {
        name: 'aria-label',
        title: 'ColorPicker 的 aria-label',
        setters: 'StringSetter'
      },
      {
        name: 'id',
        title: 'ColorPicker 的 id',
        setters: 'StringSetter'
      },
      {
        name: 'teleported',
        title: '是否将 popover 的下拉列表渲染至 body 下',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'label',
        title: 'ColorPicker 的 aria-label(deprecated)',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'active-change'
      },
      {
        name: 'update:modelValue'
      },
      {
        name: 'focus'
      },
      {
        name: 'blur'
      }
    ]
  },
  ElConfigProvider: {
    name: 'ElConfigProvider',
    label: '全局配置',
    categoryId: 'other',
    doc: 'https://element-plus.org/zh-CN/component/config-provider.html',
    props: [
      {
        name: 'locale',
        label: 'locale',
        title: '翻译文本对象',
        setters: 'ObjectSetter'
      },
      {
        name: 'size',
        label: 'size',
        title: '全局组件大小',
        setters: 'SelectSetter',
        options: ['large', 'default', 'small'],
        defaultValue: 'default'
      },
      {
        name: 'zIndex',
        label: 'zIndex',
        title: '全局初始化 zIndex 的值',
        setters: 'NumberSetter'
      },
      {
        name: 'namespace',
        label: 'namespace',
        title: '全局组件类名称前缀',
        setters: 'StringSetter',
        defaultValue: 'el'
      },
      {
        name: 'button',
        label: 'button',
        title: '按钮相关配置',
        setters: 'ObjectSetter',
        defaultValue: {
          autoInsertSpace: false
        }
      },
      {
        name: 'message',
        label: 'message',
        title: '消息相关配置',
        setters: 'ObjectSetter'
      },
      {
        name: 'experimentalFeatures',
        label: 'experimentalFeatures',
        title: '将要添加的实验阶段的功能，所有功能都是默认设置为 false',
        setters: 'ObjectSetter'
      }
    ],
    slots: ['default'],
    package: 'element-plus'
  },
  ElContainer: {
    name: 'ElContainer',
    label: '布局容器',
    categoryId: 'layout',
    doc: 'https://element-plus.org/zh-CN/component/container.html',
    package: 'element-plus',
    props: [
      {
        name: 'direction',
        defaultValue: '',
        setters: 'SelectSetter',
        options: ['horizontal', 'vertical']
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        style: {
          width: '100%',
          height: '100%'
        }
      }
    }
  },
  ElHeader: {
    name: 'ElHeader',
    parentIncludes: ['ElContainer'],
    label: '顶栏容器',
    categoryId: 'layout',
    package: 'element-plus',
    props: [
      {
        name: 'height',
        defaultValue: '60px',
        setters: ['InputSetter']
      }
    ]
  },
  ElAside: {
    name: 'ElAside',
    parentIncludes: ['ElContainer'],
    label: '侧边栏容器',
    categoryId: 'layout',
    package: 'element-plus',
    props: [
      {
        name: 'width',
        defaultValue: '300px',
        setters: ['InputSetter']
      }
    ],
    slots: ['default']
  },
  ElMain: {
    name: 'ElMain',
    parentIncludes: ['ElContainer'],
    label: '主要区域容器',
    categoryId: 'layout',
    package: 'element-plus'
  },
  ElFooter: {
    name: 'ElFooter',
    parentIncludes: ['ElContainer'],
    label: '底栏容器',
    categoryId: 'layout',
    package: 'element-plus',
    props: [
      {
        name: 'height',
        defaultValue: '60px',
        setters: ['InputSetter']
      }
    ],
    slots: ['default']
  },
  ElDatePicker: {
    name: 'ElDatePicker',
    label: '日期选择器',
    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/date-picker.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '绑定值，如果它是数组，长度应该是 2',
        defaultValue: '',
        setters: [
          'NumberSetter',
          'StringSetter',
          'ArraySetter',
          'ExpressionSetter'
        ]
      },
      {
        name: 'readonly',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'editable',
        title: '文本框可输入',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'clearable',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'placeholder',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'startPlaceholder',
        defaultValue: '',
        title: '范围选择时开始日期的占位内容',
        setters: 'InputSetter'
      },
      {
        name: 'endPlaceholder',
        defaultValue: '',
        title: '范围选择时结束日期的占位内容',
        setters: 'InputSetter'
      },
      {
        name: 'type',
        defaultValue: 'date',
        title: '显示类型',
        options: [
          'year',
          'years',
          'month',
          'months',
          'date',
          'dates',
          'datetime',
          'week',
          'datetimerange',
          'daterange',
          'monthrange',
          'yearrange'
        ],
        setters: 'SelectSetter'
      },
      {
        name: 'format',
        title: '显示在输入框中的格式',
        defaultValue: 'YYYY-MM-DD',
        setters: 'InputSetter'
      },
      {
        name: 'popperClass',
        title: 'DatePicker 下拉框的类名',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'popper-options',
        title: '自定义 popper 选项',
        defaultValue: '',
        setters: ['ObjectSetter', 'JSONSetter']
      },
      {
        name: 'rangeSeparator',
        defaultValue: '-',
        title: '选择范围时的分隔符',
        setters: 'InputSetter'
      },
      {
        name: 'defaultValue',
        title: '可选，选择器打开时默认显示的时间',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'defaultTime',
        title: '范围选择时选中日期所使用的当日内具体时刻',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'valueFormat',
        title: '可选，绑定值的格式。 不指定则绑定值为 Date 对象',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'id',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'unlinkPanels',
        title: '在范围选择器里取消两个日期面板之间的联动',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'prefixIcon',
        defaultValue: 'Date',
        title: '自定义前缀图标',
        setters: 'InputSetter'
      },
      {
        name: 'clearIcon',
        defaultValue: 'CircleClose',
        title: '自定义清除图标',
        setters: 'InputSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        title: '输入时是否触发表单的校验',
        setters: 'BooleanSetter'
      },
      {
        name: 'disabledDate',
        title:
          '一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'shortcuts',
        defaultValue: '',
        title: '设置快捷选项，需要传入数组对象',
        setters: 'JSONSetter'
      },
      {
        name: 'cellClassName',
        defaultValue: '',
        title: '设置自定义类名',
        setters: 'FunctionSetter'
      },
      {
        name: 'teleported',
        defaultValue: true,
        title: '是否将 date-picker 的下拉列表插入至 body 元素',
        setters: 'BooleanSetter'
      },
      {
        name: 'empty-values',
        title: '组件的空值配置',
        setters: 'ArraySetter'
      },
      {
        name: 'value-on-clear',
        title: '清空选项的值',
        setters: [
          'StringSetter',
          'NumberSetter',
          'BooleanSetter',
          'FunctionSetter'
        ]
      },
      {
        name: 'fallback-placements',
        title: 'Tooltip 可用的 positions',
        setters: 'ArraySetter'
      },
      {
        name: 'placement',
        title: '下拉框出现的位置',
        defaultValue: 'bottom',
        setters: 'SelectSetter',
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ]
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'blur'
      },
      {
        name: 'focus'
      },
      {
        name: 'clear'
      },
      {
        name: 'calendar-change'
      },
      {
        name: 'panel-change'
      },
      {
        name: 'visible-change'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'range-separator'
      },
      {
        name: 'prev-month'
      },
      {
        name: 'next-month'
      },
      {
        name: 'prev-year'
      },
      {
        name: 'next-year'
      }
    ]
  },
  ElDateTimePicker: {
    name: 'ElDateTimePicker',
    label: '日期时间选择器',
    alias: 'ElDatePicker',
    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/datetime-picker.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: '',
        setters: ['NumberSetter', 'StringSetter', 'ExpressionSetter']
      },
      {
        name: 'readonly',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'editable',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'clearable',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'placeholder',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'startPlaceholder',
        defaultValue: '',
        title: '范围选择时开始日期的占位内容',
        setters: 'StringSetter'
      },
      {
        name: 'endPlaceholder',
        defaultValue: '',
        title: '范围选择时结束日期的占位内容',
        setters: 'InputSetter'
      },
      {
        name: 'arrowControl',
        title: '是否使用箭头进行时间选择',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'type',
        defaultValue: 'date',
        title: '显示类型',
        options: [
          'year',
          'month',
          'date',
          'dates',
          'datetime',
          'week',
          'datetimerange',
          'daterange',
          'monthrange'
        ],
        setters: 'SelectSetter'
      },
      {
        name: 'format',
        title: '显示在输入框中的格式',
        defaultValue: 'YYYY-MM-DD HH:mm:ss',
        setters: 'StringSetter'
      },
      {
        name: 'popperClass',
        title: 'DateTimePicker 下拉框的类名',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'rangeSeparator',
        defaultValue: '-',
        title: '选择范围时的分隔符',
        setters: 'StringSetter'
      },
      {
        name: 'defaultValue',
        title: '可选，选择器打开时默认显示的时间',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'defaultTime',
        title: '选择日期后的默认时间值。 如未指定则默认时间值为 00:00:00',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'valueFormat',
        title: '可选，绑定值的格式。 不指定则绑定值为 Date 对象',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'dateFormat',
        defaultValue: '',
        setters: 'StringSetter',
        title: '时间选择器下拉列表中显示的日期格式'
      },
      {
        name: 'timeFormat',
        defaultValue: '',
        setters: 'StringSetter',
        title: '时间选择器下拉列表中显示的时间格式'
      },
      {
        name: 'id',
        defaultValue: '',
        setters: ['StringSetter', 'ArraySetter', 'ExpressionSetter']
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'unlinkPanels',
        title: '在范围选择器里取消两个日期面板之间的联动',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'prefixIcon',
        defaultValue: 'Date',
        title: '自定义前缀图标',
        setters: 'InputSetter'
      },
      {
        name: 'clearIcon',
        defaultValue: 'CircleClose',
        title: '自定义清除图标',
        setters: 'InputSetter'
      },
      {
        name: 'shortcuts',
        defaultValue: '',
        title: '设置快捷选项，需要传入数组对象',
        setters: 'JSONSetter'
      },
      {
        name: 'disabledDate',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'cellClassName',
        defaultValue: '',
        title: '设置自定义类名',
        setters: 'FunctionSetter'
      },
      {
        name: 'teleported',
        defaultValue: true,
        title: '设置自定义类名',
        setters: 'BooleanSetter'
      },
      {
        name: 'emptyValues',
        title: '组件的空值配置',
        setters: 'ArraySetter'
      },
      {
        name: 'valueOnClear',
        title: '清空选项的值',
        setters: [
          'StringSetter',
          'NumberSetter',
          'BooleanSetter',
          'FunctionSetter'
        ]
      },
      {
        name: 'showNow',
        title: '是否显示 now 按钮',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'blur'
      },
      {
        name: 'focus'
      },
      {
        name: 'clear'
      },
      {
        name: 'calendar-change'
      },
      {
        name: 'visible-change'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'range-separator'
      },
      {
        name: 'prev-month'
      },
      {
        name: 'next-month'
      },
      {
        name: 'prev-year'
      },
      {
        name: 'next-year'
      }
    ],
    snippet: {
      props: {
        type: 'datetime',
        placeholder: 'Select date and time'
      }
    }
  },
  ElDescriptions: {
    name: 'ElDescriptions',
    label: '描述列表',
    categoryId: 'data',
    package: 'element-plus',
    doc: 'https://element-plus.org/zh-CN/component/descriptions.html',
    props: [
      {
        name: 'border',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'column',
        defaultValue: 3,
        setters: 'NumberSetter'
      },
      {
        name: 'direction',
        defaultValue: 'horizontal',
        options: ['vertical', 'horizontal'],
        setters: 'SelectSetter'
      },
      {
        name: 'size',
        defaultValue: '',
        options: ['', 'large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'title',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'extra',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'labelWidth',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter']
      }
    ],
    slots: ['default', 'title', 'extra'],
    snippet: {
      props: {
        border: true
      },
      children: [
        {
          name: 'ElDescriptionsItem',
          children: 'kooriookami',
          props: {
            label: 'Username'
          }
        },
        {
          name: 'ElDescriptionsItem',
          children: '18100000000',
          props: {
            label: 'Telephone'
          }
        },
        {
          name: 'ElDescriptionsItem',
          children: 'Suzhou',
          props: {
            label: 'Place'
          }
        },
        {
          name: 'ElDescriptionsItem',
          children:
            'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangs Province',
          props: {
            label: 'Address'
          }
        }
      ]
    }
  },
  ElDescriptionsItem: {
    name: 'ElDescriptionsItem',
    label: '描述列表子项',
    categoryId: 'data',
    parentIncludes: ['ElDescriptions'],
    package: 'element-plus',
    props: [
      {
        name: 'label',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'span',
        defaultValue: 1,
        setters: 'NumberSetter'
      },
      {
        name: 'rowspan',
        defaultValue: 1,
        setters: 'NumberSetter'
      },
      {
        name: 'width',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'min-width',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'labelWidth',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'align',
        defaultValue: 'left',
        options: ['left', 'center', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'label-align',
        defaultValue: '',
        options: ['left', 'center', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'class-name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'label-class-name',
        defaultValue: '',
        label: '标题类名',
        setters: 'InputSetter'
      }
    ],
    slots: ['default', 'label'],
    snippet: {
      children: '内容',
      props: {
        label: '标题'
      }
    }
  },
  ElDialog: {
    name: 'ElDialog',
    label: '对话框',
    categoryId: 'other',
    doc: 'https://element-plus.org/zh-CN/component/dialog.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'title',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'width',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'fullscreen',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'top',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'modal',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'modalClass',
        label: 'modalClass',
        title: '遮罩的自定义类名',
        setters: 'StringSetter'
      },
      {
        name: 'appendToBody',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'appendTo',
        label: 'appendTo',
        title: 'Dialog 挂载到哪个 DOM 元素 将覆盖 append-to-body',
        setters: 'StringSetter',
        defaultValue: 'body'
      },
      {
        name: 'lockScroll',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'openDelay',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'closeDelay',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'closeOnClickModal',
        label: '点击关闭',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'closeOnPressEscape',
        label: 'ESC键关闭',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'showClose',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'beforeClose',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'draggable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'overflow',
        label: 'overflow',
        title: '拖动范围可以超出可视区',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'center',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'alignCenter',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'destroyOnClose',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'closeIcon',
        label: 'closeIcon',
        title: '自定义关闭图标',
        setters: ['StringSetter', 'IconSetter']
      },
      {
        name: 'z-index',
        label: 'z-index',
        title: '和原生的 CSS 的 z-index 相同，改变 z 轴的顺序',
        setters: 'NumberSetter'
      },
      {
        name: 'headerAriaLevel',
        label: 'headerAriaLevel',
        title: 'header 的 aria-level 属性',
        setters: 'StringSetter',
        defaultValue: 2
      },
      {
        name: 'customClass',
        defaultValue: '',
        setters: 'InputSetter'
      }
    ],
    events: [
      {
        name: 'open'
      },
      {
        name: 'opened'
      },
      {
        name: 'close'
      },
      {
        name: 'closed'
      },
      {
        name: 'open-auto-focus'
      },
      {
        name: 'close-auto-focus'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'header'
      },
      {
        name: 'footer'
      },
      {
        name: 'title'
      }
    ],
    snippet: {
      name: 'ElDialog',
      children: '对话框弹窗内容',
      props: {
        title: '标题',
        modelValue: true
      }
    }
  },
  ElDivider: {
    name: 'ElDivider',
    label: '分割线',
    categoryId: 'other',
    doc: 'https://element-plus.org/zh-CN/component/divider.html',
    package: 'element-plus',
    props: [
      {
        name: 'direction',
        defaultValue: 'horizontal',
        setters: 'SelectSetter',
        options: ['horizontal', 'vertical']
      },
      {
        name: 'borderStyle',
        defaultValue: 'solid',
        setters: 'InputSetter'
      },
      {
        name: 'contentPosition',
        defaultValue: 'center',
        setters: 'SelectSetter',
        options: ['left', 'right', 'center']
      }
    ],
    slots: ['default'],
    snippet: {
      name: 'ElDivider',
      children: '分割线'
    }
  },
  ElDrawer: {
    name: 'ElDrawer',
    label: '抽屉',
    categoryId: 'other',
    doc: 'https://element-plus.org/zh-CN/component/drawer.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'appendToBody',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'appendTo',
        defaultValue: 'body',
        setters: 'StringSetter'
      },
      {
        name: 'lockScroll',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'beforeClose',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'closeOnClickModal',
        label: '点击蒙层关闭',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'closOonPressEscape',
        label: 'ESC键关闭',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'openDelay',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'closeDelay',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'destroyOnClose',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'modal',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'direction',
        defaultValue: 'rtl',
        setters: 'SelectSetter',
        options: ['rtl', 'ltr', 'ttb', 'btt']
      },
      {
        name: 'showClose',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: '30%',
        title:
          'Drawer 窗体的大小, 当使用 number 类型时, 以像素为单位, 当使用 string 类型时, 请传入 x%, 否则便会以 number 类型解释',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'title',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'withHeader',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'modalClass',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'zIndex',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'headerAriaLevel',
        label: 'headerAriaLevel',
        title: 'header 的 aria-level 属性',
        setters: 'StringSetter',
        defaultValue: 2
      },
      {
        name: 'customClass',
        defaultValue: '',
        setters: 'InputSetter'
      }
    ],
    events: [
      {
        name: 'open'
      },
      {
        name: 'opened'
      },
      {
        name: 'close'
      },
      {
        name: 'closed'
      },
      {
        name: 'open-auto-focus'
      },
      {
        name: 'close-auto-focus'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'header'
      },
      {
        name: 'footer'
      },
      {
        name: 'title'
      }
    ],
    snippet: {
      name: 'ElDrawer',
      children: '抽屉内容',
      props: {
        title: '标题',
        modelValue: true
      }
    }
  },
  ElDropdown: {
    name: 'ElDropdown',
    label: '下拉菜单',
    categoryId: 'nav',
    doc: 'https://element-plus.org/zh-CN/component/dropdown.html',
    package: 'element-plus',
    props: [
      {
        name: 'type',
        defaultValue: '',
        options: [
          '',
          'default',
          'primary',
          'success',
          'warning',
          'info',
          'danger',
          'text'
        ],
        setters: 'SelectSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['large', 'default', 'small']
      },
      {
        name: 'maxHeight',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'splitButton',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'placement',
        defaultValue: 'bottom',
        setters: 'SelectSetter',
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end'
        ]
      },
      {
        name: 'trigger',
        defaultValue: 'hover',
        setters: 'SelectSetter',
        options: ['hover', 'click', 'contextmenu']
      },
      {
        name: 'triggerKeys',
        title: '指定键盘上哪些按键可以触发操作',
        defaultValue: ['Enter', 'Space', 'ArrowDown', 'NumpadEnter'],
        setters: 'ArraySetter'
      },
      {
        name: 'hideOnClick',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'showTimeout',
        defaultValue: 150,
        setters: 'NumberSetter'
      },
      {
        name: 'hideTimeout',
        defaultValue: 150,
        setters: 'NumberSetter'
      },
      {
        name: 'role',
        defaultValue: 'menu',
        setters: 'InputSetter'
      },
      {
        name: 'tabindex',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'popperClass',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'popperOptions',
        defaultValue: {
          modifiers: [
            {
              name: 'computeStyles',
              options: {
                gpuAcceleration: false
              }
            }
          ]
        },
        setters: 'JSONSetter'
      },
      {
        name: 'teleported',
        label: 'teleported',
        title: '是否将下拉列表插入至 body 元素',
        setters: 'BooleanSetter',
        defaultValue: true
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'dropdown'
      }
    ],
    events: [
      {
        name: 'click'
      },
      {
        name: 'command'
      },
      {
        name: 'visible-change'
      }
    ],
    snippet: {
      name: 'ElDropdown',
      children: [
        {
          name: 'ElButton',
          children: [
            {
              name: 'component',
              props: {
                is: 'span'
              },
              children: '下拉菜单'
            },
            {
              name: 'component',
              props: {
                is: 'span'
              },
              children: ' V'
            }
          ]
        },
        {
          name: 'ElDropdownMenu',
          slot: 'dropdown',
          children: [
            {
              name: 'ElDropdownItem',
              children: 'Action 1'
            },
            {
              name: 'ElDropdownItem',
              children: 'Action 2'
            },
            {
              name: 'ElDropdownItem',
              children: 'Action 3'
            }
          ]
        }
      ]
    }
  },
  ElDropdownMenu: {
    name: 'ElDropdownMenu',
    label: '下拉菜单Menu',
    categoryId: 'nav',
    package: 'element-plus',
    slots: ['default']
  },
  ElDropdownItem: {
    name: 'ElDropdownItem',
    childIncludes: true,
    label: '下拉菜单项',
    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'command',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'JSONSetter']
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'divided',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'icon',
        defaultValue: '',
        setters: ['InputSetter']
      }
    ],
    slots: ['default', 'icon'],
    snippet: {
      name: 'ElDropdownItem',
      children: '下拉选项'
    }
  },
  ElEmpty: {
    name: 'ElEmpty',
    label: '空状态',
    doc: 'https://element-plus.org/zh-CN/component/empty.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'image',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'imageSize',
        defaultValue: '',
        setters: 'NumberSetter'
      },
      {
        name: 'description',
        defaultValue: '',
        setters: 'InputSetter'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'image'
      },
      {
        name: 'description'
      }
    ]
  },
  ElForm: {
    name: 'ElForm',
    label: '表单',
    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/form.html',
    package: 'element-plus',
    props: [
      {
        name: 'model',
        title: '表单数据对象',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'rules',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'inline',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'labelPosition',
        defaultValue: 'right',
        options: ['left', 'right', 'top'],
        setters: 'SelectSetter'
      },
      {
        name: 'labelWidth',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'labelSuffix',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'hideRequiredAsterisk',
        defaultValue: false,
        title: '是否显示必填字段的标签旁边的红色星号',
        setters: 'BooleanSetter'
      },
      {
        name: 'requireAsteriskPosition',
        defaultValue: 'left',
        title: '星号的位置',
        options: ['left', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'showMessage',
        defaultValue: true,
        title: '是否显示校验错误信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'inlineMessage',
        defaultValue: false,
        title: '是否以行内形式展示校验信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'statusIcon',
        defaultValue: false,
        title: '是否在输入框中显示校验结果反馈图标',
        setters: 'BooleanSetter'
      },
      {
        name: 'validateOnRuleChange',
        defaultValue: true,
        title: '是否在 rules 属性改变后立即触发一次验证',
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: '',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scrollToError',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scrollIntoViewOptions',
        defaultValue: '',
        setters: ['ExpressionSetter', 'BooleanSetter']
      }
    ],
    events: [
      {
        name: 'validate'
      }
    ],
    slots: ['default'],
    snippet: {
      name: 'ElForm',
      props: {
        labelWidth: '80px'
      },
      children: [
        {
          name: 'ElFormItem',
          props: {
            label: '表单项'
          },
          children: [
            {
              name: 'ElInput'
            }
          ]
        },
        {
          name: 'ElFormItem',
          props: {
            label: ' '
          },
          children: [
            {
              name: 'ElButton',
              props: {
                type: 'primary'
              },
              children: '确定'
            }
          ]
        }
      ]
    }
  },
  ElFormItem: {
    name: 'ElFormItem',
    label: '表单项',
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'prop',
        defaultValue: '',
        setters: ['InputSetter', 'ArraySetter']
      },
      {
        name: 'label',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'labelPosition',
        defaultValue: '',
        setters: 'SelectSetter',
        options: ['left', 'right', 'top']
      },
      {
        name: 'labelWidth',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'required',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'rules',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'error',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'showMessage',
        defaultValue: true,
        title: '是否显示校验错误信息',
        label: '错误信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'inlineMessage',
        defaultValue: false,
        title: '是否在行内显示校验信息',
        label: '校验信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'for',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'validateStatus',
        title: 'formitem 校验的状态',
        options: ['', 'error', 'validating', 'success'],
        setters: 'SelectSetter'
      }
    ],
    slots: ['default', 'label', 'error'],
    snippet: {
      props: {
        label: '表单项'
      },
      children: [
        {
          name: 'ElInput'
        }
      ]
    }
  },
  ElImage: {
    name: 'ElImage',
    label: '图片',
    categoryId: 'data',
    doc: 'https://element-plus.org/zh-CN/component/image.html',
    package: 'element-plus',
    props: [
      {
        name: 'src',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'fit',
        defaultValue: '',
        options: ['', 'fill', 'contain', 'cover', 'none', 'scale-down'],
        setters: 'SelectSetter'
      },
      {
        name: 'hideOnClickModal',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        defaultValue: '',
        options: ['eager', 'lazy'],
        setters: 'SelectSetter'
      },
      {
        name: 'lazy',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scrollContainer',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'alt',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'referrerPolicy',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'crossorigin',
        label: 'crossorigin',
        title: '原生属性 crossorigin',
        setters: 'SelectSetter',
        options: ['', 'anonymous', 'use-credentials']
      },
      {
        name: 'previewSrcList',
        defaultValue: '',
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'zIndex',
        defaultValue: '',
        setters: 'NumberSetter'
      },
      {
        name: 'initialIndex',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'close-on-press-escape',
        label: 'close-on-press-escape',
        defaultValue: true,
        title: '是否可以通过按下 ESC 关闭 Image Viewer',
        setters: 'BooleanSetter'
      },
      {
        name: 'previewTeleported',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'infinite',
        defaultValue: true,
        setters: 'BooleanSetter',
        title: '是否可以无限循环预览'
      },
      {
        name: 'zoomRate',
        defaultValue: 1.2,
        setters: {
          name: 'NumberSetter',
          props: {
            precision: 1
          }
        },
        title: '图像查看器缩放事件的缩放速率'
      },
      {
        name: 'minScale',
        defaultValue: 0.2,
        setters: {
          name: 'NumberSetter',
          props: {
            precision: 1
          }
        },
        title: '图像查看器缩放事件的最小缩放比例'
      },
      {
        name: 'maxScale',
        defaultValue: 7,
        setters: {
          name: 'NumberSetter',
          props: {
            precision: 1
          }
        },
        title: '图像查看器缩放事件的最大缩放比例'
      }
    ],
    events: ['load', 'error', 'switch', 'close', 'show'],
    slots: ['placeholder', 'error', 'viewer'],
    snippet: {
      props: {
        style: {
          width: '100px',
          height: '100px'
        },
        src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        previewSrcList: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ]
      }
    }
  },
  ElInput: {
    name: 'ElInput',
    label: '输入框',
    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/input.html',
    props: [
      {
        name: 'type',
        defaultValue: 'text',
        options: ['text', 'textarea'],
        setters: ['SelectSetter', 'InputSetter']
      },
      {
        name: 'modelValue',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'maxlength',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'minlength',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'showWordLimit',
        defaultValue: false,
        title:
          '是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效',
        label: '字数统计',
        setters: 'BooleanSetter'
      },
      {
        name: 'placeholder',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'clearable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'formatter',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'parser',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'showPassword',
        defaultValue: false,
        title: '是否显示切换密码图标',
        label: '密码图标',
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'prefix-icon',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'suffix-icon',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'rows',
        defaultValue: 2,
        setters: 'NumberSetter'
      },
      {
        name: 'autosize',
        defaultValue: false,
        setters: ['BooleanSetter', 'JSONStter']
      },
      {
        name: 'autocomplete',
        defaultValue: 'off',
        setters: 'InputSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'readonly',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'max',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'min',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'step',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'resize',
        defaultValue: '',
        options: ['none', 'both', 'horizontal', 'vertical'],
        setters: 'InputSetter'
      },
      {
        name: 'autofocus',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'form',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'aria-label',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'tabindex',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        title: '输入时是否触发表单的校验',
        label: '表单校验',
        setters: 'BooleanSetter'
      },
      {
        name: 'inputStyle',
        defaultValue: {},
        setters: ['JSONSetter']
      }
    ],
    events: [
      {
        name: 'blur'
      },
      {
        name: 'focus'
      },
      {
        name: 'change'
      },
      {
        name: 'input'
      },
      {
        name: 'clear'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: ['prefix', 'suffix', 'prepend', 'append'],
    package: 'element-plus'
  },
  ElInputNumber: {
    name: 'ElInputNumber',
    label: '数字输入框',
    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/input-number.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: '',
        setters: 'NumberSetter'
      },
      {
        name: 'min',
        defaultValue: null,
        setters: 'NumberSetter'
      },
      {
        name: 'max',
        defaultValue: null,
        setters: 'NumberSetter'
      },
      {
        name: 'step',
        defaultValue: 1,
        setters: 'NumberSetter'
      },
      {
        name: 'stepStrictly',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'precision',
        defaultValue: '',
        setters: 'NumberSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'readonly',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'controls',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'controlsPosition',
        defaultValue: '',
        title: '控制按钮位置',
        label: '按钮位置',
        options: ['', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'ariaLabel',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'placeholder',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'valueOnClear',
        defaultValue: '',
        options: ['min', 'max'],
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    slots: [
      {
        name: 'decrease-icon'
      },
      {
        name: 'increase-icon'
      },
      {
        name: 'prefix'
      },
      {
        name: 'suffix'
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'blur'
      },
      {
        name: 'focus'
      },
      {
        name: 'update:modelValue'
      }
    ]
  },
  ElInputTag: {
    name: 'ElInputTag',
    label: '标签输入框',
    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/input-tag.html',
    props: [
      {
        name: 'modelValue',
        setters: 'ArraySetter'
      },
      {
        name: 'max',
        title: '可添加标签的最大数量',
        setters: 'NumberSetter'
      },
      {
        name: 'tagType',
        title: '标签类型',
        defaultValue: 'info',
        setters: 'SelectSetter',
        options: ['primary', 'success', 'info', 'warning', 'danger']
      },
      {
        name: 'tagEffect',
        title: '标签效果',
        defaultValue: 'light',
        setters: 'SelectSetter',
        options: ['light', 'dark', 'plain']
      },
      {
        name: 'trigger',
        title: '触发输入标签的按键',
        defaultValue: 'Enter',
        setters: 'SelectSetter',
        options: ['Enter', 'Space']
      },
      {
        name: 'draggable',
        title: '是否可以拖动标签',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        setters: 'SelectSetter',
        defaultValue: 'default',
        options: ['large', 'default', 'small']
      },
      {
        name: 'clearable',
        title: '是否显示清除按钮',
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
        name: 'validateEvent',
        title: '是否触发表单验证',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'readonly',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'autofocus',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'id',
        setters: 'StringSetter'
      },
      {
        name: 'tabindex',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'maxlength',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'minlength',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'placeholder',
        setters: 'StringSetter'
      },
      {
        name: 'autocomplete',
        defaultValue: 'off',
        setters: 'StringSetter'
      },
      {
        name: 'ariaLabel',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'input'
      },
      {
        name: 'add-tag'
      },
      {
        name: 'remove-tag'
      },
      {
        name: 'focus'
      },
      {
        name: 'blur'
      },
      {
        name: 'clear'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: [
      {
        name: 'tag'
      },
      {
        name: 'prefix'
      },
      {
        name: 'suffix'
      }
    ],
    snippet: {
      props: {
        modelValue: ['1', '2']
      }
    },
    package: 'element-plus'
  },
  ElMention: {
    name: 'ElMention',
    label: '提及',
    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/mention.html#api',
    props: [
      {
        name: 'options',
        title: '提及选项列表',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'prefix',
        title: '触发字段的前缀。 字符串长度必须且只能为 1',
        defaultValue: '@',
        setters: ['StringSetter', 'ArraySetter']
      },
      {
        name: 'split',
        title: '用于拆分提及的字符。 字符串长度必须且只能为 1\t',
        defaultValue: ' ',
        setters: 'StringSetter'
      },
      {
        name: 'filterOption',
        title: '定制筛选器选项逻辑',
        setters: ['BooleanSetter', 'FunctionSetter']
      },
      {
        name: 'placement',
        title: '设置弹出位置',
        defaultValue: 'bottom',
        options: ['top', 'bottom'],
        setters: 'SelectSetter'
      },
      {
        name: 'showArrow',
        title: '下拉菜单的内容是否有箭头',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'offset',
        title: '下拉面板偏移量',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'whole',
        title: '当退格键被按下做删除操作时，是否将提及部分作为整体删除',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'checkIsWhole',
        title: '当退格键被按下做删除操作时，检查是否将提及部分作为整体删除',
        setters: 'FunctionSetter'
      },
      {
        name: 'loading',
        title: '提及的下拉面板是否处于加载状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'modelValue',
        title: '输入值',
        setters: 'StringSetter'
      },
      {
        name: 'popperClass',
        title: '自定义浮层类名',
        setters: 'StringSetter'
      },
      {
        name: 'popperOptions',
        title: '参数',
        setters: ['ObjectSetter', 'JSONSetter']
      },
      {
        name: 'type',
        defaultValue: 'text',
        options: ['text', 'textarea'],
        setters: ['SelectSetter', 'InputSetter']
      },
      {
        name: 'maxlength',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'minlength',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'showWordLimit',
        defaultValue: false,
        title:
          '是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效',
        label: '字数统计',
        setters: 'BooleanSetter'
      },
      {
        name: 'placeholder',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'clearable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'formatter',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'parser',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'showPassword',
        defaultValue: false,
        title: '是否显示切换密码图标',
        label: '密码图标',
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'prefix-icon',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'suffix-icon',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'rows',
        defaultValue: 2,
        setters: 'NumberSetter'
      },
      {
        name: 'autosize',
        defaultValue: false,
        setters: ['BooleanSetter', 'JSONStter']
      },
      {
        name: 'autocomplete',
        defaultValue: 'off',
        setters: 'InputSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'readonly',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'max',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'min',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'step',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'resize',
        defaultValue: '',
        options: ['none', 'both', 'horizontal', 'vertical'],
        setters: 'InputSetter'
      },
      {
        name: 'autofocus',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'form',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'aria-label',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'tabindex',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        title: '输入时是否触发表单的校验',
        label: '表单校验',
        setters: 'BooleanSetter'
      },
      {
        name: 'inputStyle',
        defaultValue: {},
        setters: ['JSONSetter']
      }
    ],
    events: [
      {
        name: 'update:modelValue'
      },
      {
        name: 'search'
      },
      {
        name: 'select'
      },
      {
        name: 'input'
      },
      {
        name: 'blur'
      },
      {
        name: 'focus'
      },
      {
        name: 'change'
      },
      {
        name: 'clear'
      }
    ],
    slots: [
      'label',
      'loading',
      'header',
      'footer',
      'prefix',
      'suffix',
      'prepend',
      'append'
    ],
    snippet: {
      props: {
        options: [
          {
            label: 'Fuphoenixes',
            value: 'Fuphoenixes'
          },
          {
            label: 'kooriookami',
            value: 'kooriookami'
          },
          {
            label: 'Jeremy',
            value: 'Jeremy'
          },
          {
            label: 'btea',
            value: 'btea'
          }
        ],
        modelValue: '@'
      }
    },
    package: 'element-plus'
  },
  ElRow: {
    name: 'ElRow',
    label: '布局行',
    categoryId: 'layout',
    doc: 'https://element-plus.org/zh-CN/component/layout.html',
    package: 'element-plus',
    props: [
      {
        name: 'gutter',
        defaultValue: 0,
        label: '栅格间隔',
        setters: 'NumberSetter'
      },
      {
        name: 'justify',
        defaultValue: 'start',
        title: 'flex 布局下的水平排列方式',
        options: [
          'start',
          'end',
          'center',
          'space-around',
          'space-between',
          'space-evenly'
        ],
        setters: 'SelectSetter'
      },
      {
        name: 'align',
        defaultValue: 'top',
        title: 'flex 布局下的垂直排列方式',
        options: ['top', 'middle', 'bottom'],
        setters: 'SelectSetter'
      },
      {
        name: 'tag',
        defaultValue: 'div',
        title: '自定义元素标签',
        setters: 'InputSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        gutter: 10
      }
    }
  },
  ElCol: {
    name: 'ElCol',
    label: '布局列',
    categoryId: 'layout',
    package: 'element-plus',
    parentIncludes: ['ElRow'],
    props: [
      {
        name: 'span',
        defaultValue: 24,
        setters: 'NumberSetter'
      },
      {
        name: 'offset',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'push',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'pull',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'xs',
        setters: ['JSONSetter', 'NumberSetter']
      },
      {
        name: 'sm',
        setters: ['JSONSetter', 'NumberSetter']
      },
      {
        name: 'md',
        setters: ['JSONSetter', 'NumberSetter']
      },
      {
        name: 'lg',
        setters: ['JSONSetter', 'NumberSetter']
      },
      {
        name: 'xl',
        setters: ['JSONSetter', 'NumberSetter']
      },
      {
        name: 'tag',
        defaultValue: 'div',
        title: '自定义元素标签',
        setters: 'InputSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        span: 6
      }
    }
  },
  ElLink: {
    name: 'ElLink',
    label: '链接',
    categoryId: 'base',
    doc: 'https://element-plus.org/zh-CN/component/link.html',
    props: [
      {
        name: 'type',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'primary', 'success', 'warning', 'danger', 'info']
      },
      {
        name: 'underline',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'href',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'target',
        label: 'target',
        title: '同原生 target 属性',
        setters: 'SelectSetter',
        options: ['_blank', '_parent', '_self', '_top'],
        defaultValue: '_self'
      },
      {
        name: 'icon',
        defaultValue: '',
        setters: 'IconSetter'
      }
    ],
    events: [],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'icon'
      }
    ],
    snippet: {
      children: '链接文本'
    },
    package: 'element-plus'
  },
  ElMenu: {
    name: 'ElMenu',
    label: '导航菜单',
    doc: 'https://element-plus.org/zh-CN/component/menu.html',
    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'mode',
        defaultValue: 'vertical',
        setters: 'SelectSetter',
        options: ['horizontal', 'vertical']
      },
      {
        name: 'collapse',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'ellipsis',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'ellipsisIcon',
        label: 'ellipsisIcon',
        title: '自定义省略图标 (仅在水平模式下可用)',
        setters: 'StringSetter'
      },
      {
        name: 'popperOffset',
        label: 'popperOffset',
        title: '弹出层的偏移量(对所有子菜单有效)',
        setters: 'NumberSetter',
        defaultValue: 6
      },
      {
        name: 'defaultActive',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'defaultOpeneds',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'uniqueOpened',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'menuTrigger',
        defaultValue: 'hover',
        setters: 'SelectSetter',
        options: ['hover', 'click']
      },
      {
        name: 'router',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'collapseTransition',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'popperEffect',
        label: 'popperEffect',
        title: 'Tooltip 主题，内置了 dark / light 两种主题',
        setters: 'SelectSetter',
        options: ['dark', 'light'],
        defaultValue: 'dark'
      },
      {
        name: 'closeOnClickOutside',
        label: 'closeOnClickOutside',
        title: '可选，单击外部时是否折叠菜单',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'popperClass',
        label: 'popperClass',
        title: '为 popper 添加类名',
        setters: 'StringSetter'
      },
      {
        name: 'showTimeout',
        label: 'showTimeout',
        title: '菜单出现前的延迟',
        setters: 'NumberSetter',
        defaultValue: 300
      },
      {
        name: 'hideTimeout',
        label: 'hideTimeout',
        title: '菜单消失前的延迟',
        setters: 'NumberSetter',
        defaultValue: 300
      },
      {
        name: 'backgroundColor',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      },
      {
        name: 'textColor',
        defaultValue: '#303133',
        setters: 'ColorSetter'
      },
      {
        name: 'activeTextColor',
        defaultValue: '#409EFF',
        setters: 'ColorSetter'
      }
    ],
    events: [
      {
        name: 'select'
      },
      {
        name: 'open'
      },
      {
        name: 'close'
      }
    ],
    slots: ['default', 'ellipsis-icon'],
    snippet: {
      props: {
        mode: 'horizontal'
      },
      children: [
        {
          name: 'ElMenuItem',
          children: '菜单项一',
          props: {
            index: '1'
          }
        },
        {
          name: 'ElSubMenu',
          props: {
            index: '2'
          },
          children: [
            {
              name: 'component',
              slot: 'title',
              props: {
                is: 'div'
              },
              children: '子菜单'
            },
            {
              name: 'ElMenuItem',
              children: '子菜单项一',
              props: {
                index: '2-1'
              }
            },
            {
              name: 'ElMenuItem',
              children: '子菜单项二',
              props: {
                index: '2-2'
              }
            }
          ]
        },
        {
          name: 'ElMenuItem',
          children: '菜单项三',
          props: {
            index: '3'
          }
        }
      ]
    }
  },
  ElSubMenu: {
    name: 'ElSubMenu',
    label: '导航子菜单',
    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'index',
        label: 'index *',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'popperClass',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'showTimeout',
        setters: 'NumberSetter'
      },
      {
        name: 'hideTimeout',
        setters: 'NumberSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'teleported',
        setters: 'BooleanSetter'
      },
      {
        name: 'popperOffset',
        defaultValue: 6,
        setters: 'NumberSetter'
      },
      {
        name: 'expandCloseIcon',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'expandOpenIcon',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'collapseCloseIcon',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'collapseOpenIcon',
        defaultValue: '',
        setters: ['InputSetter']
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'title'
      }
    ],
    snippet: {
      children: [
        {
          name: 'component',
          slot: 'title',
          props: {
            is: 'div'
          },
          children: '子菜单'
        },
        {
          name: 'ElMenuItem',
          children: '子菜单项一'
        }
      ]
    }
  },
  ElMenuItem: {
    name: 'ElMenuItem',
    label: '导航菜单项',
    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'index',
        defaultValue: null,
        setters: 'InputSetter'
      },
      {
        name: 'route',
        defaultValue: '',
        setters: ['StringSetter', 'JSONSetter']
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'click'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'title'
      }
    ],
    snippet: {
      children: '菜单项'
    }
  },
  ElMenuItemGroup: {
    name: 'ElMenuItemGroup',
    label: '导航菜单组',
    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'title',
        defaultValue: '',
        setters: 'InputSetter'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'title'
      }
    ],
    snippet: {
      props: {
        title: '分组一'
      },
      children: [
        {
          name: 'ElMenuItem',
          children: '子菜单项一'
        },
        {
          name: 'ElMenuItem',
          children: '子菜单项一'
        }
      ]
    }
  },
  ElPageHeader: {
    name: 'ElPageHeader',
    label: '页头',
    doc: 'https://element-plus.org/zh-CN/component/page-header.html',
    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'icon',
        defaultValue: 'Back',
        setters: 'InputSetter'
      },
      {
        name: 'title',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'content',
        defaultValue: '',
        setters: 'InputSetter'
      }
    ],
    events: [
      {
        name: 'back'
      }
    ],
    slots: [
      {
        name: 'icon'
      },
      {
        name: 'title'
      },
      {
        name: 'content'
      },
      {
        name: 'extra'
      },
      {
        name: 'breadcrumb'
      },
      {
        name: 'default'
      }
    ],
    snippet: {
      name: 'ElPageHeader',
      children: [
        {
          name: 'component',
          slot: 'content',
          props: {
            is: 'span'
          },
          children: 'Title'
        }
      ]
    }
  },
  ElPagination: {
    name: 'ElPagination',
    label: '分页',
    categoryId: 'data',
    doc: 'https://element-plus.org/zh-CN/component/pagination.html',
    package: 'element-plus',
    props: [
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'background',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'pageSize',
        defaultValue: 10,
        setters: 'NumberSetter'
      },
      {
        name: 'defaultPageSize',
        label: '默认页大小',
        setters: 'NumberSetter'
      },
      {
        name: 'total',
        title: '总条目数',
        setters: 'NumberSetter'
      },
      {
        name: 'pageCount',
        setters: 'NumberSetter'
      },
      {
        name: 'pagerCount',
        defaultValue: 7,
        setters: 'NumberSetter'
      },
      {
        name: 'currentPage',
        defaultValue: 1,
        setters: 'NumberSetter'
      },
      {
        name: 'defaultCurrentPage',
        label: '默认当前页',
        setters: 'NumberSetter'
      },
      {
        name: 'layout',
        defaultValue: 'prev, pager, next, jumper, ->, total',
        setters: 'InputSetter'
      },
      {
        name: 'pageSizes',
        defaultValue: [10, 20, 30, 40, 50, 100],
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'appendSizeTo',
        title: '下拉框挂载到哪个 DOM 元素',
        setters: 'StringSetter'
      },
      {
        name: 'popperClass',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'prevText',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'prevIcon',
        defaultValue: 'ArrowLeft',
        setters: 'InputSetter'
      },
      {
        name: 'nextText',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'nextIcon',
        defaultValue: 'ArrowRight',
        setters: 'InputSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'teleported ',
        title: '是否将下拉菜单teleport至 body',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'hideOnSinglePage',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'small',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      'size-change',
      'current-change',
      'change',
      'prev-click',
      'next-click',
      'update:pageSize',
      'update:currentPage'
    ],
    slots: ['default', 'prevIcon', 'nextIcon'],
    snippet: {
      props: {
        total: 1000,
        background: true
      }
    }
  },
  ElPopconfirm: {
    name: 'ElPopconfirm',
    label: '气泡确认框',
    categoryId: 'other',
    doc: 'https://element-plus.org/zh-CN/component/popconfirm.html',
    package: 'element-plus',
    props: [
      {
        name: 'title',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'confirmButtonText',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'cancelButtonText',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'confirmButtonType',
        defaultValue: 'primary',
        setters: 'SelectSetter',
        options: ['primary', 'success', 'warning', 'danger', 'info', 'text']
      },
      {
        name: 'confirmButtonType',
        defaultValue: 'text',
        setters: 'SelectSetter',
        options: ['primary', 'success', 'warning', 'danger', 'info', 'text']
      },
      {
        name: 'icon',
        defaultValue: 'QuestionFilled',
        setters: ['InputSetter']
      },
      {
        name: 'iconColor',
        defaultValue: '#f90',
        setters: 'ColorSetter'
      },
      {
        name: 'hideIcon',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'hideAfter',
        defaultValue: 200,
        setters: 'NumberSetter'
      },
      {
        name: 'teleported',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'persistent',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'width',
        defaultValue: '150',
        setters: ['NumberSetter', 'InputSetter']
      }
    ],
    events: [
      {
        name: 'confirm'
      },
      {
        name: 'cancel'
      }
    ],
    slots: [
      {
        name: 'reference'
      },
      {
        name: 'actions'
      }
    ],
    snippet: {
      name: 'ElPopconfirm',
      children: [
        {
          name: 'ElButton',
          children: '气泡确认框',
          slot: 'reference'
        }
      ],
      props: {
        title: '标题内容'
      }
    }
  },
  ElPopover: {
    name: 'ElPopover',
    label: '气泡卡片',
    categoryId: 'other',
    doc: 'https://element-plus.org/zh-CN/component/popover.html',
    package: 'element-plus',
    props: [
      {
        name: 'trigger',
        defaultValue: 'primary',
        setters: 'click',
        options: ['click', 'focus', 'hover', 'contextmenu']
      },
      {
        name: 'title',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'effect',
        defaultValue: 'light',
        options: ['dark', 'light'],
        setters: 'SelectSetter'
      },
      {
        name: 'content',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'width',
        defaultValue: 150,
        setters: ['NumberSetter', 'InputSetter']
      },
      {
        name: 'placement',
        defaultValue: 'bottom',
        setters: 'SelectSetter',
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ]
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'visible',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'offset',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'transition',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'showArrow',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'popperOptions',
        setters: 'JSONSetter'
      },
      {
        name: 'popperClass',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'popperStyle',
        setters: ['InputSetter', 'ObjectSetter']
      },
      {
        name: 'showAfter',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'hideAfter',
        defaultValue: 200,
        setters: 'NumberSetter'
      },
      {
        name: 'autoClose',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'tabindex',
        defaultValue: '',
        setters: 'NumberSetter'
      },
      {
        name: 'teleported',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'persistent',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      {
        name: 'show'
      },
      {
        name: 'before-enter'
      },
      {
        name: 'after-enter'
      },
      {
        name: 'hide'
      },
      {
        name: 'before-leave'
      },
      {
        name: 'after-leave'
      },
      {
        name: 'update:visible'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'reference'
      }
    ],
    snippet: {
      name: 'ElPopover',
      props: {
        placement: 'bottom',
        title: 'Title',
        width: '200',
        trigger: 'hover',
        content: '这是content123！'
      },
      children: [
        {
          name: 'ElButton',
          children: '气泡卡片',
          slot: 'reference'
        }
      ]
    }
  },
  ElProgress: {
    name: 'ElProgress',
    label: '进度条',
    categoryId: 'data',
    doc: 'https://element-plus.org/zh-CN/component/progress.html',
    package: 'element-plus',
    props: [
      {
        name: 'percentage',
        defaultValue: 0,
        title: '百分比，必填',
        setters: {
          name: 'NumberSetter',
          props: {
            min: 0,
            max: 100
          }
        }
      },
      {
        name: 'type',
        defaultValue: 'line',
        options: ['line', 'circle', 'dashboard'],
        setters: 'SelectSetter'
      },
      {
        name: 'strokeWidth',
        defaultValue: 6,
        setters: 'NumberSetter'
      },
      {
        name: 'textInside',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'status',
        defaultValue: '',
        options: ['success', 'exception', 'warning'],
        setters: 'SelectSetter'
      },
      {
        name: 'indeterminate',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'duration',
        defaultValue: 3,
        setters: 'NumberSetter'
      },
      {
        name: 'color',
        defaultValue: '',
        setters: ['ColorSetter', 'FunctionSetter', 'ArraySetter', 'JSONSetter']
      },
      {
        name: 'width',
        defaultValue: 126,
        setters: 'NumberSetter'
      },
      {
        name: 'showText',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'strokeLinecap',
        defaultValue: 'round',
        options: ['butt', 'round', 'square'],
        setters: 'SelectSetter'
      },
      {
        name: 'format',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'striped',
        label: 'striped',
        title: '在进度条上增加条纹',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'stripedFlow',
        label: 'stripedFlow',
        title: '让进度条上的条纹流动起来',
        setters: 'BooleanSetter',
        defaultValue: false
      }
    ],
    slots: ['default'],
    snippet: {
      name: 'ElProgress',
      props: {
        percentage: 50
      }
    }
  },
  ElRadio: {
    name: 'ElRadio',
    label: '单选框',
    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/radio.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'value',
        title: '单选框的值',
        setters: ['StringSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'label',
        defaultValue: '',
        title: '单选框的 label 如果value没有值， label则作为value使用',
        setters: ['StringSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'disabled',
        title: '是否禁用单选框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        title: '是否显示边框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        title: '单选框的尺寸',
        defaultValue: '',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'name',
        title: '原始 name 属性',
        defaultValue: '',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        label: '选项一',
        value: '1'
      }
    }
  },
  ElRadioGroup: {
    name: 'ElRadioGroup',
    label: '单选框组',
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '绑定值',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'size',
        title: '单选框按钮或边框按钮的大小',
        defaultValue: '',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'textColor',
        title: '按钮形式的 Radio 激活时的文本颜色',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      },
      {
        name: 'fill',
        title: '按钮形式的 Radio 激活时的填充色和边框色',
        defaultValue: '#409EFF',
        setters: 'ColorSetter'
      },
      {
        name: 'validateEvent',
        title: '输入时是否触发表单的校验',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'aria-label',
        title: '与 RadioGroup 中的 aria-label 属性相同',
        setters: 'StringSetter'
      },
      {
        name: 'name',
        label: 'name',
        title: '原生 name 属性',
        setters: 'StringSetter'
      },
      {
        name: 'id',
        label: 'id',
        title: '原生 id 属性',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: ['default'],
    snippet: {
      name: 'ElRadioGroup',
      children: [
        {
          name: 'ElRadio',
          props: {
            label: '选项一',
            value: '1'
          }
        },
        {
          name: 'ElRadio',
          props: {
            label: '选项二',
            value: '2'
          }
        },
        {
          name: 'ElRadio',
          props: {
            label: '选项三',
            value: '3'
          }
        }
      ]
    }
  },
  ElRadioButton: {
    name: 'ElRadioButton',
    label: '单选框按钮',
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'label',
        title: '单选框的label,如果没有value,label则作为value使用',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'value',
        title: '单选框的值',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'disabled',
        title: '是否禁用单选框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'name',
        title: '原生 name 属性',
        defaultValue: '',
        setters: 'StringSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      children: '按钮选项'
    }
  },
  ElRate: {
    name: 'ElRate',
    label: '评分',
    childIncludes: false,
    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/rate.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'max',
        defaultValue: 5,
        setters: 'NumberSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'allowHalf',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'lowThreshold',
        defaultValue: 2,
        title: '低分和中等分数的界限值， 值本身被划分在低分中',
        setters: 'NumberSetter'
      },
      {
        name: 'highThreshold',
        defaultValue: 4,
        title: '高分和中等分数的界限值， 值本身被划分在高分中',
        setters: 'NumberSetter'
      },
      {
        name: 'colors',
        defaultValue: ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'voidColor',
        defaultValue: '#C6D1DE',
        setters: 'ColorSetter'
      },
      {
        name: 'disabledVoidColor',
        defaultValue: '#EFF2F7',
        label: 'disabledColor',
        setters: 'ColorSetter'
      },
      {
        name: 'icons',
        defaultValue: ['StarFilled', 'StarFilled', 'StarFilled'],
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'voidIcon',
        defaultValue: 'Star',
        setters: 'InputSetter'
      },
      {
        name: 'disabledVoidIcon',
        defaultValue: 'StarFilled',
        label: 'disabledIcon',
        setters: 'InputSetter'
      },
      {
        name: 'showText',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'showScore',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'textColor',
        defaultValue: '#1F2D3D',
        setters: 'ColorSetter'
      },
      {
        name: 'texts',
        defaultValue: [
          'Extremely bad',
          'Disappointed',
          'Fair',
          'Satisfied',
          'Surprise'
        ],
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'scoreTemplate',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'clearable',
        label: 'clearable',
        title: '是否可以重置值为 0',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'id',
        label: 'id',
        title: '原生 id 属性',
        setters: 'StringSetter'
      },
      {
        name: 'ariaLabel',
        title: '和 Rate 的 aria-label 属性保持一致',
        setters: 'StringSetter'
      },
      {
        name: 'label',
        label: 'label',
        title: '和 Rate 的 aria-label 属性保持一致',
        setters: 'StringSetter'
      }
    ],
    events: ['change', 'update:modelValue']
  },
  ElResult: {
    name: 'ElResult',
    label: '结果',
    doc: 'https://element-plus.org/zh-CN/component/result.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'title',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'subTitle',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'icon',
        defaultValue: 'info',
        options: ['success', 'warning', 'info', 'error'],
        setters: 'SelectSetter'
      }
    ],
    slots: ['icon', 'title', 'sub-title', 'extra'],
    snippet: {
      props: {
        icon: 'success',
        title: 'Success Tip',
        subTitle: 'Please follow the instructions'
      }
    }
  },
  ElScrollbar: {
    name: 'ElScrollbar',
    label: '滚动条',
    categoryId: 'base',
    doc: 'https://element-plus.org/zh-CN/component/scrollbar.html',
    childIncludes: false,
    package: 'element-plus',
    props: [
      {
        name: 'height',
        defaultValue: '',
        setters: ['NumberSetter', 'InputSetter']
      },
      {
        name: 'maxHeight',
        defaultValue: '',
        setters: ['NumberSetter', 'InputSetter']
      },
      {
        name: 'native',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'wrapStyle',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'wrapClass',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'viewStyle',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'viewClass',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'noresize',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'tag',
        defaultValue: 'div',
        setters: 'InputSetter'
      },
      {
        name: 'always',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'minSize',
        defaultValue: 20,
        setters: 'NumberSetter'
      },
      {
        name: 'id',
        label: 'id',
        title: '视图id',
        setters: 'StringSetter'
      },
      {
        name: 'role',
        label: 'role',
        title: '视图的角色',
        setters: 'StringSetter'
      },
      {
        name: 'ariaLabel',
        label: 'ariaLabel',
        title: '视图的 aria-label',
        setters: 'StringSetter'
      },
      {
        name: 'ariaOrientation',
        label: 'ariaOrientation',
        title: '视图的 aria-orientation',
        setters: 'SelectSetter',
        options: ['horizontal', 'vertical']
      }
    ],
    events: [
      {
        name: 'scroll'
      }
    ],
    snippet: {
      props: {
        style: {
          height: '300px'
        }
      },
      children: [
        {
          name: 'component',
          props: {
            style: {
              height: '50px',
              margin: '10px',
              background: '#ecf5ff'
            }
          },
          directives: [
            {
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value: '6'
              }
            }
          ]
        }
      ]
    }
  },
  ElSelect: {
    name: 'ElSelect',
    label: '选择器',
    doc: 'https://element-plus.org/zh-CN/component/select.html',
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: '',
        setters: ['NumberSetter', 'InputSetter', 'BooleanSetter']
      },
      {
        name: 'multiple',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'valueKey',
        defaultValue: 'value',
        setters: 'InputSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'clearable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'collapseTags',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'collapseTagsTooltip',
        title:
          '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'multipleLimit',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'effect',
        defaultValue: 'light',
        options: ['dark', 'light'],
        setters: 'SelectSetter'
      },
      {
        name: 'autocomplete',
        defaultValue: 'off',
        setters: 'InputSetter'
      },
      {
        name: 'placeholder',
        defaultValue: 'Select',
        setters: 'InputSetter'
      },
      {
        name: 'filterable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'allowCreate',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'filterMethod',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'remote',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'remoteMethod',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'remoteShowSuffix',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loadingText',
        defaultValue: 'Loading',
        setters: 'InputSetter'
      },
      {
        name: 'noMatchText',
        defaultValue: 'No matching data',
        setters: 'InputSetter'
      },
      {
        name: 'noDataText',
        defaultValue: 'No data',
        setters: 'InputSetter'
      },
      {
        name: 'popperClass',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'reserveKeyword',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'defaultFirstOption',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'teleported',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'appendTo',
        title: '下拉框挂载到哪个 DOM 元素',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'persistent',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'automaticDropdown',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'clearIcon',
        defaultValue: 'CircleClose',
        setters: 'InputSetter'
      },
      {
        name: 'fitInputWidth',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'suffixIcon',
        defaultValue: 'ArrowUp',
        setters: 'InputSetter'
      },
      {
        name: 'tagType',
        defaultValue: 'info',
        options: ['success', 'info', 'warning', 'danger'],
        setters: 'SelectSetter'
      },
      {
        name: 'tagEffect',
        defaultValue: 'light',
        options: ['', 'light', 'dark', 'plain'],
        setters: 'SelectSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'offset',
        defaultValue: 12,
        setters: 'NumberSetter'
      },
      {
        name: 'showArrow',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'placement',
        label: 'placement',
        title: '下拉框出现的位置',
        setters: 'SelectSetter',
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ],
        defaultValue: 'bottom-start'
      },
      {
        name: 'fallbackPlacements',
        label: 'fallbackPlacements',
        title: 'dropdown 可用的 positions',
        setters: 'ArraySetter',
        defaultValue: ['bottom-start', 'top-start', 'right', 'left']
      },
      {
        name: 'maxCollapseTags',
        label: 'maxCollapseTags',
        title:
          '需要显示的 Tag 的最大数量 只有当 collapse-tags 设置为 true 时才会生效。',
        setters: 'NumberSetter',
        defaultValue: 1
      },
      {
        name: 'popperOptions',
        label: 'popperOptions',
        title: 'popper.js 参数',
        setters: 'ObjectSetter',
        defaultValue: {}
      },
      {
        name: 'ariaLabel',
        label: 'ariaLabel',
        title: '等价于原生 input aria-label 属性',
        setters: 'StringSetter'
      },
      {
        name: 'emptyValues',
        title: '组件的空值配置',
        setters: 'ArraySetter'
      },
      {
        name: 'valueOnClear',
        title: '清空选项的值 ',
        setters: [
          'StringSetter',
          'NumberSetter',
          'BooleanSetter',
          'FunctionSetter'
        ]
      },
      {
        name: 'suffixTransition',
        title: '下拉菜单显示/消失时后缀图标的动画',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'tabindex',
        title: 'input 的 tabindex',
        setters: ['StringSetter', 'NumberSetter']
      }
    ],
    events: [
      'change',
      'visible-change',
      'remove-tag',
      'clear',
      'blur',
      'focus',
      'update:modelValue'
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'header'
      },
      {
        name: 'footer'
      },
      {
        name: 'prefix'
      },
      {
        name: 'empty'
      },
      {
        name: 'tag'
      },
      {
        name: 'loading'
      },
      {
        name: 'label'
      }
    ],
    snippet: {
      children: [
        {
          name: 'ElOption',
          props: {
            label: {
              type: 'JSExpression',
              value: '`选项${this.context.item}`'
            }
          },
          directives: [
            {
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value: '6'
              }
            }
          ]
        }
      ]
    }
  },
  ElOptionGroup: {
    name: 'ElOptionGroup',
    label: '选择器选项组',
    categoryId: 'form',
    package: 'element-plus',
    parentIncludes: ['ElSelect'],
    props: [
      {
        name: 'label',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        label: '分组'
      }
    }
  },
  ElOption: {
    name: 'ElOption',
    label: '选择器选项',
    categoryId: 'form',
    package: 'element-plus',
    parentIncludes: ['ElSelect', 'ElOptionGroup'],
    props: [
      {
        name: 'value',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter', 'JSONSetter']
      },
      {
        name: 'label',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        label: '选项'
      }
    }
  },
  ElSelectV2: {
    name: 'ElSelectV2',
    label: '虚拟列表选择器',
    doc: 'https://element-plus.org/zh-CN/component/select-v2.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter', 'JSONSetter']
      },
      {
        name: 'options',
        label: 'options',
        title: '选项的数据源， value 的 key 和 label 可以通过 props自定义.',
        setters: 'ArraySetter'
      },
      {
        name: 'props',
        label: 'props',
        title: '配置选项，具体看下表',
        setters: 'ObjectSetter'
      },
      {
        name: 'multiple',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'valueKey',
        defaultValue: 'value',
        setters: 'InputSetter'
      },
      {
        name: 'size',
        defaultValue: '',
        options: ['', 'large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'clearable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'clearIcon',
        label: 'clearIcon',
        title: '自定义清除图标',
        setters: ['StringSetter', 'ObjectSetter'],
        defaultValue: 'CircleClose'
      },
      {
        name: 'collapseTags',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'multipleLimit',
        label: 'multipleLimit',
        title:
          '多选时可被选择的最大数目。 当被设置为0时，可被选择的数目不设限。',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'effect',
        defaultValue: 'light',
        options: ['dark', 'light'],
        setters: ['SelectSetter', 'StringSetter']
      },
      {
        name: 'autocomplete',
        defaultValue: 'off',
        setters: 'InputSetter'
      },
      {
        name: 'placeholder',
        defaultValue: 'Please select',
        setters: 'InputSetter'
      },
      {
        name: 'filterable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'allowCreate',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'filterMethod',
        label: 'filterMethod',
        title: '自定义筛选方法',
        setters: 'FunctionSetter'
      },
      {
        name: 'loading',
        label: 'loading',
        title: '是否从远程加载数据',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'loadingText',
        label: 'loadingText',
        title: '从服务器加载数据时显示的文本，默认为“Loading”',
        setters: 'StringSetter',
        defaultValue: 'Loading'
      },
      {
        name: 'reserveKeyword',
        label: 'reserveKeyword',
        title: '筛选时，是否在选择选项后保留关键字',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'noMatchText',
        label: 'noMatchText',
        title:
          '搜索条件无匹配时显示的文字，也可以使用 empty 插槽设置，默认是 “No matching data“',
        setters: 'StringSetter'
      },
      {
        name: 'noDataText',
        label: 'noDataText',
        title: '当在没有数据时显示的文字，你同时可以使用empty插槽进行设置。',
        setters: 'StringSetter',
        defaultValue: 'No Data'
      },
      {
        name: 'popperClass',
        label: 'popperClass',
        title: '选择器下拉菜单的自定义类名',
        setters: 'StringSetter',
        defaultValue: ''
      },
      {
        name: 'teleported',
        label: 'teleported',
        title: '是否将下拉列表元素插入 append-to 指向的元素下',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'appendTo',
        title: '下拉框挂载到哪个 DOM 元素',
        setters: 'StringSetter'
      },
      {
        name: 'persistent',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'popperOptions',
        label: 'popperOptions',
        setters: 'ObjectSetter',
        defaultValue: {}
      },
      {
        name: 'automaticDropdown',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'fitInputWidth',
        defaultValue: true,
        setters: ['BooleanSetter', 'NumberSetter']
      },
      {
        name: 'height',
        defaultValue: 274,
        setters: 'NumberSetter'
      },
      {
        name: 'itemHeight',
        label: 'itemHeight',
        title: '下拉项的高度',
        setters: 'NumberSetter',
        defaultValue: 34
      },
      {
        name: 'scrollbarAlwaysOn',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'remote',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'remoteMethod',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'offset',
        title: '下拉面板偏移量',
        defaultValue: 12,
        setters: 'NumberSetter'
      },
      {
        name: 'showArrow',
        title: '下拉菜单的内容是否有箭头',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'placement',
        label: 'placement',
        title: '下拉框出现的位置',
        setters: 'SelectSetter',
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ],
        defaultValue: 'bottom-start'
      },
      {
        name: 'fallbackPlacements',
        setters: 'ArraySetter',
        defaultValue: ['bottom-start', 'top-start', 'right', 'left']
      },
      {
        name: 'collapseTagsTooltip',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'maxCollapseTags',
        setters: 'NumberSetter',
        defaultValue: 1
      },
      {
        name: 'tagType',
        label: 'tagType',
        title: '标签类型',
        setters: 'SelectSetter',
        options: ['', 'success', 'info', 'warning', 'danger'],
        defaultValue: 'info'
      },
      {
        name: 'tagEffect',
        title: '标签效果',
        defaultValue: 'light',
        options: ['', 'light', 'dark', 'plain'],
        setters: 'SelectSetter'
      },
      {
        name: 'ariaLabel',
        label: 'ariaLabel',
        title: '等价于原生 input aria-label 属性',
        setters: 'StringSetter'
      },
      {
        name: 'emptyValues',
        title: '组件的空值配置',
        setters: 'ArraySetter'
      },
      {
        name: 'valueOnClear',
        title: '清空选项的值 ',
        setters: [
          'StringSetter',
          'NumberSetter',
          'BooleanSetter',
          'FunctionSetter'
        ]
      },
      {
        name: 'popperAppendToBody',
        title:
          '是否将弹出框插入至 body 元素 当弹出框的位置出现问题时，你可以尝试将该属性设置为false。',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'tabindex',
        title: 'input 的 tabindex',
        setters: ['StringSetter', 'NumberSetter']
      }
    ],
    events: [
      'change',
      'visible-change',
      'remove-tag',
      'clear',
      'blur',
      'focus',
      'update:modelValue'
    ],
    slots: [
      {
        name: 'default',
        params: ['item']
      },
      {
        name: 'header'
      },
      {
        name: 'footer'
      },
      {
        name: 'prefix'
      },
      {
        name: 'empty'
      },
      {
        name: 'tag'
      },
      {
        name: 'loading'
      },
      {
        name: 'label'
      }
    ]
  },
  ElSkeleton: {
    name: 'ElSkeleton',
    label: '骨架屏',
    doc: 'https://element-plus.org/zh-CN/component/skeleton.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'animated',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'count',
        defaultValue: 1,
        setters: 'NumberSetter'
      },
      {
        name: 'loading',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'rows',
        defaultValue: 3,
        setters: 'NumberSetter'
      },
      {
        name: 'throttle',
        defaultValue: 0,
        setters: ['NumberSetter', 'ObjectSetter']
      }
    ],
    slots: [
      {
        name: 'default',
        params: ['object']
      },
      {
        name: 'template',
        params: ['object']
      }
    ]
  },
  ElSkeletonItem: {
    name: 'ElSkeletonItem',
    label: '骨架项',
    doc: 'https://element-plus.org/zh-CN/component/skeleton.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'variant',
        setters: 'SelectSetter',
        options: [
          'p',
          'text',
          'h1',
          'h3',
          'caption',
          'button',
          'image',
          'circle',
          'rect'
        ],
        defaultValue: 'text'
      }
    ],
    snippet: {
      props: {
        variant: 'image',
        style: {
          width: '240px',
          height: '240px'
        }
      }
    }
  },
  ElSlider: {
    name: 'ElSlider',
    label: '滑块',
    childIncludes: false,
    doc: 'https://element-plus.org/zh-CN/component/slider.html',
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '选中项绑定值',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'min',
        title: '最小值',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'max',
        title: '最大值',
        defaultValue: 100,
        setters: 'NumberSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'step',
        title: '步长',
        defaultValue: 1,
        setters: 'NumberSetter'
      },
      {
        name: 'showInput',
        title: '是否显示输入框，仅在非范围选择时有效',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'showInputControls',
        title: '在显示输入框的情况下，是否显示输入框的控制按钮',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        title: 'slider 包装器的大小，垂直模式下该属性不可用',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'inputSize',
        title: '输入框的大小，如果设置了 size 属性，默认值自动取 size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'showStops',
        defaultValue: false,
        title: '是否显示间断点',
        setters: 'BooleanSetter'
      },
      {
        name: 'showTooltip',
        defaultValue: true,
        title: '是否显示提示信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'formatTooltip',
        title: '格式化提示信息',
        setters: 'FunctionSetter'
      },
      {
        name: 'range',
        title: '是否开启选择范围',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'vertical',
        defaultValue: false,
        title: '垂直模式',
        setters: 'BooleanSetter'
      },
      {
        name: 'height',
        defaultValue: '',
        title: '滑块高度，垂直模式必填',
        setters: 'InputSetter'
      },
      {
        name: 'aria-label',
        title: '原生 aria-label属性',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'rangeStartLabel',
        defaultValue: '',
        title: '当 range 为true时，屏幕阅读器标签开始的标记',
        setters: 'InputSetter'
      },
      {
        name: 'rangeEndLabel',
        defaultValue: '',
        title: '当 range 为true时，屏幕阅读器标签结尾的标记',
        setters: 'InputSetter'
      },
      {
        name: 'formatValueText',
        title: '显示屏幕阅读器的 aria-valuenow 属性的格式',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'debounce',
        defaultValue: 300,
        title: '输入时的去抖延迟，毫秒，仅在 show-input 等于 true 时有效',
        setters: 'NumberSetter'
      },
      {
        name: 'tooltipClass',
        title: 'tooltip 的自定义类名',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'placement',
        title: 'Tooltip 出现的位置',
        defaultValue: 'top',
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ],
        setters: 'SelectSetter'
      },
      {
        name: 'marks',
        title:
          '标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'validateEvent',
        title: '输入时是否触发表单的校验',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: ['change', 'input', 'update:modelValue']
  },
  ElSpace: {
    name: 'ElSpace',
    label: '间距',
    categoryId: 'base',
    doc: 'https://element-plus.org/zh-CN/component/space.html',
    package: 'element-plus',
    props: [
      {
        name: 'alignment',
        defaultValue: 'center',
        title: '对齐的方式',
        options: [
          'normal',
          'stretch',
          'center',
          'start',
          'end',
          'flex-start',
          'flex-end',
          'baseline',
          'first baseline',
          'last baseline',
          'safe center',
          'unsafe center',
          'inherit',
          'initial',
          'revert',
          'revert-layer',
          'unset'
        ],
        setters: 'SelectSetter'
      },
      {
        name: 'class',
        title: 'className',
        defaultValue: '',
        setters: ['StringSetter', 'ObjectSetter', 'ArraySetter']
      },
      {
        name: 'direction',
        title: '排列的方向',
        defaultValue: 'horizontal',
        options: ['vertical', 'horizontal'],
        setters: 'SelectSetter'
      },
      {
        name: 'prefixCls',
        title: '给 space-items 的类名前缀',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'style',
        title: '额外样式',
        defaultValue: '',
        setters: ['StringSetter', 'JSONSetter']
      },
      {
        name: 'spacer',
        title: '间隔符',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'size',
        title: '间隔大小',
        defaultValue: 'small',
        setters: ['SelectSetter', 'NumberSetter', 'ArraySetter'],
        options: ['large', 'default', 'small']
      },
      {
        name: 'wrap',
        title: '设置是否自动折行',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'fill',
        title: '子元素是否填充父容器',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'fillRatio',
        title: '填充父容器的比例',
        defaultValue: 100,
        setters: 'NumberSetter'
      }
    ],
    slots: ['default', 'spacer'],
    snippet: {
      props: {
        fill: true,
        style: {
          width: '100%'
        }
      },
      children: [
        {
          name: 'ElCard'
        },
        {
          name: 'ElCard'
        }
      ]
    }
  },
  ElStatistic: {
    name: 'ElStatistic',
    label: '统计组件',
    doc: 'https://element-plus.org/zh-CN/component/statistic.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'value',
        label: 'value',
        title: '数字内容',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'decimalSeparator',
        label: 'decimalSeparator',
        title: '设置小数点符号',
        setters: 'StringSetter',
        defaultValue: '.'
      },
      {
        name: 'formatter',
        label: 'formatter',
        title: '自定义数字格式化',
        setters: 'FunctionSetter'
      },
      {
        name: 'groupSeparator',
        label: 'groupSeparator',
        title: '设置千分位标识符',
        setters: 'StringSetter',
        defaultValue: ','
      },
      {
        name: 'precision',
        label: 'precision',
        title: '数字精度',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'prefix',
        label: 'prefix',
        title: '设置数字的前缀',
        setters: 'StringSetter'
      },
      {
        name: 'suffix',
        label: 'suffix',
        title: '设置数字的后缀',
        setters: 'StringSetter'
      },
      {
        name: 'title',
        label: 'title',
        title: '数字标题',
        setters: 'StringSetter'
      },
      {
        name: 'valueStyle',
        label: 'valueStyle',
        title: '数字样式',
        setters: ['StringSetter', 'ObjectSetter', 'ArraySetter']
      }
    ],
    slots: ['prefix', 'suffix', 'title'],
    snippet: {
      props: {
        title: 'Daily active users',
        value: '268500'
      }
    }
  },
  ElCountdown: {
    name: 'ElCountdown',
    label: '倒计时',
    doc: 'https://element-plus.org/zh-CN/component/statistic.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'value',
        label: 'value',
        title: '目标时间',
        setters: ['NumberSetter']
      },
      {
        name: 'format',
        label: 'format',
        title: '格式化倒计时',
        setters: 'StringSetter',
        defaultValue: 'HH:mm:ss'
      },
      {
        name: 'prefix',
        label: 'prefix',
        title: '设置倒计时前缀',
        setters: 'StringSetter'
      },
      {
        name: 'suffix',
        label: 'suffix',
        title: '设置倒计时的后缀',
        setters: 'StringSetter'
      },
      {
        name: 'title',
        label: 'title',
        title: '倒计时标题',
        setters: 'StringSetter'
      },
      {
        name: 'valueStyle',
        label: 'valueStyle',
        title: '倒计时值的样式',
        setters: ['StringSetter', 'ObjectSetter', 'ArraySetter']
      }
    ],
    events: ['change', 'finish'],
    slots: ['prefix', 'suffix', 'title'],
    snippet: {
      props: {
        title: 'Start to grab',
        value: 1792134444342
      }
    }
  },
  ElSegmented: {
    name: 'ElSegmented',
    label: '分段控制器',
    doc: 'https://element-plus.org/zh-CN/component/segmented.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '绑定值',
        setters: ['StringSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'options',
        title: '选项的数据',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'size',
        defaultValue: '',
        options: ['', 'large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'block',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'validate-event',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'name',
        setters: 'StringSetter'
      },
      {
        name: 'id',
        setters: 'StringSetter'
      },
      {
        name: 'ariaLabel',
        setters: 'StringSetter'
      },
      {
        name: 'direction',
        defaultValue: 'horizontal',
        options: ['horizontal', 'vertical'],
        setters: 'SelectSetter'
      }
    ],
    events: ['change', 'update:modelValue'],
    slots: ['default'],
    snippet: {
      props: {
        modelValue: 'Mom',
        options: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    }
  },
  ElSteps: {
    name: 'ElSteps',
    label: '步骤条',
    categoryId: 'nav',
    doc: 'https://element-plus.org/zh-CN/component/steps.html',
    package: 'element-plus',
    props: [
      {
        name: 'space',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'direction',
        defaultValue: 'horizontal',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal']
      },
      {
        name: 'active',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'processStatus',
        defaultValue: 'process',
        setters: 'SelectSetter',
        options: ['wait', 'process', 'finish', 'error', 'success']
      },
      {
        name: 'finishStatus',
        defaultValue: 'finish',
        setters: 'SelectSetter',
        options: ['wait', 'process', 'finish', 'error', 'success']
      },
      {
        name: 'alignCenter',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'simple',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      name: 'ElSteps',
      children: [
        {
          name: 'ElStep',
          props: {
            title: 'Step 1'
          }
        },
        {
          name: 'ElStep',
          props: {
            title: 'Step 2'
          }
        },
        {
          name: 'ElStep',
          props: {
            title: 'Step 3'
          }
        }
      ],
      props: {
        active: 0,
        finishStatus: 'success'
      }
    }
  },
  ElStep: {
    name: 'ElStep',
    label: '步骤项',
    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'title',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'description',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'icon',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'status',
        defaultValue: '',
        setters: 'SelectSetter',
        options: ['wait', 'process', 'finish', 'error', 'success']
      }
    ],
    slots: [
      {
        name: 'icon'
      },
      {
        name: 'title'
      },
      {
        name: 'description'
      }
    ],
    snippet: {
      props: {
        title: '步骤'
      }
    }
  },
  ElSwitch: {
    name: 'ElSwitch',
    label: '开关',
    doc: 'https://element-plus.org/zh-CN/component/switch.html',
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: false,
        setters: ['BooleanSetter', 'NumberSetter', 'InputSetter']
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'width',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'inlinePrompt',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'activeIcon',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'inactiveIcon',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'activeActionIcon',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'inactiveActionIcon',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'activeText',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'inactiveText',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'activeValue',
        defaultValue: true,
        setters: ['BooleanSetter', 'InputSetter', 'NumberSetter']
      },
      {
        name: 'inactiveValue',
        defaultValue: false,
        setters: ['BooleanSetter', 'InputSetter', 'NumberSetter']
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'beforeChange',
        setters: ['BooleanSetter', 'FunctionSetter']
      },
      {
        name: 'id',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'tabindex',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'ariaLabel',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'activeColor',
        defaultValue: '',
        setters: 'ColorSetter'
      },
      {
        name: 'inactiveColor',
        defaultValue: '',
        setters: 'ColorSetter'
      },
      {
        name: 'borderColor',
        defaultValue: '',
        setters: 'ColorSetter'
      },
      {
        name: 'label',
        defaultValue: '',
        setters: 'StringSetter'
      }
    ],
    events: ['change', 'update:modelValue'],
    slots: ['active-action', 'inactive-action']
  },
  ElTable: {
    name: 'ElTable',
    label: '表格',
    doc: 'https://element-plus.org/zh-CN/component/table.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'data',
        defaultValue: '',
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'height',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'maxHeight',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'stripe',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: '',
        options: ['', 'large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'fit',
        defaultValue: true,
        title: '列的宽度是否自撑开',
        setters: 'BooleanSetter'
      },
      {
        name: 'showHeader',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'highlightCurrentRow',
        defaultValue: false,
        label: '是否高亮',
        setters: 'BooleanSetter'
      },
      {
        name: 'currentRowKey',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'rowClassName',
        defaultValue: '',
        setters: ['InputSetter', 'FunctionSetter']
      },
      {
        name: 'rowStyle',
        defaultValue: '',
        setters: ['JSONSetter', 'FunctionSetter']
      },
      {
        name: 'cellClassName',
        defaultValue: '',
        setters: ['InputSetter', 'FunctionSetter']
      },
      {
        name: 'cellStyle',
        defaultValue: '',
        setters: ['JSONSetter', 'FunctionSetter']
      },
      {
        name: 'headerRowClassName',
        defaultValue: '',
        title: '表头行类名',
        label: 'RowClassName',
        setters: ['InputSetter', 'FunctionSetter']
      },
      {
        name: 'headerRowStyle',
        defaultValue: '',
        setters: ['JSONSetter', 'FunctionSetter']
      },
      {
        name: 'headerCellClassName',
        defaultValue: '',
        title: '表头单元格类名',
        label: 'CellClassName',
        setters: ['InputSetter', 'FunctionSetter']
      },
      {
        name: 'headerCellStyle',
        defaultValue: '',
        setters: ['JSONSetter', 'FunctionSetter']
      },
      {
        name: 'rowKey',
        defaultValue: '',
        setters: ['InputSetter', 'FunctionSetter']
      },
      {
        name: 'emptyText',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'defaultExpandAll',
        defaultValue: false,
        label: '展开所有',
        setters: 'BooleanSetter'
      },
      {
        name: 'expand-row-keys',
        defaultValue: '',
        title:
          '可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。',
        label: 'row-keys',
        setters: 'JSONSetter'
      },
      {
        name: 'default-sort',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'tooltip-effect',
        defaultValue: 'dark',
        options: ['dark', 'light'],
        setters: 'SelectSetter'
      },
      {
        name: 'tooltip-options',
        defaultValue: {
          enterable: true,
          placement: 'top',
          showArrow: true,
          hideAfter: 200,
          popperOptions: {
            strategy: 'fixed'
          }
        },
        setters: 'ObjectSetter'
      },
      {
        name: 'show-summary',
        defaultValue: false,
        label: '显示合计行',
        setters: 'BooleanSetter'
      },
      {
        name: 'sum-text',
        defaultValue: '合计',
        setters: 'InputSetter'
      },
      {
        name: 'summary-method',
        defaultValue: '',
        label: '合计计算方法',
        setters: 'FunctionSetter'
      },
      {
        name: 'span-method',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'select-on-indeterminate',
        defaultValue: true,
        title:
          '在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。 若为 true，则选中所有行；若为 false，则取消选择所有行',
        label: 'indeterminate',
        setters: 'BooleanSetter'
      },
      {
        name: 'indent',
        defaultValue: 16,
        setters: 'NumberSetter'
      },
      {
        name: 'lazy',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'load',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'tree-props',
        defaultValue: {
          hasChildren: 'hasChildren',
          children: 'children'
        },
        setters: 'JSONSetter'
      },
      {
        name: 'tableLayout',
        defaultValue: 'fixed',
        title: '设置表格单元、行和列的布局方式',
        options: ['fixed', 'auto'],
        setters: 'SelectSetter'
      },
      {
        name: 'scrollbar-always-on',
        defaultValue: false,
        label: '显示滚动条',
        setters: 'BooleanSetter'
      },
      {
        name: 'show-overflow-tooltip',
        setters: ['BooleanSetter', 'JSONSetter']
      },
      {
        name: 'flexible',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scrollbarTabindex',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'allowDragLastColumn',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      'select',
      'select-all',
      'selection-change',
      'cell-mouse-enter',
      'cell-mouse-leave',
      'cell-click',
      'cell-dblclick',
      'cell-contextmenu',
      'row-click',
      'row-contextmenu',
      'row-dblclick',
      'header-click',
      'header-contextmenu',
      'sort-change',
      'filter-change',
      'current-change',
      'header-dragend',
      'expand-change',
      'scroll'
    ],
    slots: ['default', 'append', 'empty'],
    snippet: {
      name: 'ElTable',
      props: {
        data: [
          {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          },
          {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          },
          {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }
        ]
      },
      children: [
        {
          name: 'ElTableColumn',
          props: {
            prop: 'date',
            label: 'Date'
          }
        },
        {
          name: 'ElTableColumn',
          props: {
            prop: 'name',
            label: 'Name'
          }
        },
        {
          name: 'ElTableColumn',
          props: {
            prop: 'address',
            label: 'Address'
          }
        }
      ]
    }
  },
  ElTableColumn: {
    name: 'ElTableColumn',
    label: '表头',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'type',
        defaultValue: 'default',
        options: ['default', 'selection', 'index', 'expand'],
        setters: 'SelectSetter'
      },
      {
        name: 'index',
        defaultValue: 0,
        title: '如果设置了 type=index，可以通过传递 index 属性来自定义索引',
        setters: ['NumberSetter', 'FunctionSetter']
      },
      {
        name: 'label',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'column-key',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'prop',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'width',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'min-width',
        defaultValue: '',
        title: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'fixed',
        defaultValue: '',
        options: ['left', 'right'],
        setters: ['SelectSetter', 'BooleanSetter']
      },
      {
        name: 'render-header',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'sortable',
        defaultValue: false,
        options: ['', 'custom'],
        setters: ['BooleanSetter', 'SelectSetter']
      },
      {
        name: 'sort-method',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'sort-by',
        defaultValue: '',
        setters: ['InputSetter', 'FunctionSetter', 'JSONSetter']
      },
      {
        name: 'sort-orders',
        defaultValue: ['ascending', 'descending', null],
        title:
          '数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。 需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序',
        setters: 'JSONSetter'
      },
      {
        name: 'resizable',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'formatter',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'show-overflow-tooltip',
        title: '当内容过长被隐藏时显示 tooltip',
        setters: ['BooleanSetter', 'JSONSetter']
      },
      {
        name: 'align',
        defaultValue: 'left',
        options: ['left', 'center', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'header-align',
        defaultValue: 'left',
        options: ['left', 'center', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'class-name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'label-class-name',
        defaultValue: '',
        title: '当前列标题的自定义类名',
        setters: 'InputSetter'
      },
      {
        name: 'selectable',
        setters: 'FunctionSetter'
      },
      {
        name: 'reserve-selection',
        defaultValue: false,
        title:
          '仅对  type=selection 的列有效， 请注意， 需指定 row-key 来让这个功能生效。',
        setters: 'BooleanSetter'
      },
      {
        name: 'filters',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'filter-placement',
        defaultValue: '',
        title: '过滤弹出框的定位,与 Tooltip 的 placement 属性相同',
        setters: 'InputSetter'
      },
      {
        name: 'filter-class-name',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'filter-multiple',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'filter-method',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'filtered-value',
        defaultValue: '',
        setters: 'JSONSetter'
      }
    ],
    slots: [
      {
        name: 'default',
        params: ['row', 'column', '$index']
      },
      {
        name: 'header',
        params: ['column', '$index']
      },
      {
        name: 'filter-icon',
        params: ['filterOpened']
      }
    ],
    snippet: {
      props: {
        label: '列名'
      }
    }
  },
  ElTabs: {
    name: 'ElTabs',
    label: '标签页',
    doc: 'https://element-plus.org/zh-CN/component/tabs.html',
    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'type',
        setters: [
          {
            name: 'SelectSetter',
            props: {
              closable: true
            }
          }
        ],
        defaultValue: '',
        options: ['', 'card', 'border-card']
      },
      {
        name: 'closable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'addable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'editable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'tabPosition',
        defaultValue: 'top',
        setters: 'SelectSetter',
        options: ['top', 'right', 'bottom', 'left']
      },
      {
        name: 'stretch',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'beforeLeave',
        defaultValue: '',
        setters: 'FunctionSetter'
      }
    ],
    events: [
      {
        name: 'tab-click'
      },
      {
        name: 'tab-change'
      },
      {
        name: 'tab-remove'
      },
      {
        name: 'tab-add'
      },
      {
        name: 'edit'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: ['default', 'addIcon', 'add-icon'],
    snippet: {
      props: {
        modelValue: '1'
      },
      children: [
        {
          name: 'ElTabPane',
          children: '面板一内容',
          props: {
            label: '面板一',
            name: '1'
          }
        },
        {
          name: 'ElTabPane',
          children: '面板二内容',
          props: {
            label: '面板二',
            name: '2'
          }
        },
        {
          name: 'ElTabPane',
          children: '面板三内容',
          props: {
            label: '面板三',
            name: '3'
          }
        }
      ]
    }
  },
  ElTabPane: {
    name: 'ElTabPane',
    label: '标签页面板',
    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'label',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'closable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'lazy',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'label'
      }
    ],
    snippet: {
      props: {
        label: '面板标题'
      },
      children: '面板内容'
    }
  },
  ElTag: {
    name: 'ElTag',
    label: '标签',
    doc: 'https://element-plus.org/zh-CN/component/tag.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'type',
        defaultValue: 'primary',
        options: ['primary', 'success', 'info', 'warning', 'danger'],
        setters: 'SelectSetter'
      },
      {
        name: 'closable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disable-transitions',
        defaultValue: false,
        label: '渐变动画',
        setters: 'BooleanSetter'
      },
      {
        name: 'hit',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'color',
        defaultValue: '',
        setters: 'ColorSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'effect',
        defaultValue: 'light',
        options: ['dark', 'light', 'plain'],
        setters: 'SelectSetter'
      },
      {
        name: 'round',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['click', 'close'],
    slots: ['default'],
    snippet: {
      children: '标签一'
    }
  },
  ElCheckTag: {
    name: 'ElCheckTag',
    label: '可选中的标签',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'checked',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'type',
        label: 'type',
        title: 'CheckTag 类型',
        setters: 'SelectSetter',
        options: ['primary', 'success', 'info', 'warning', 'danger'],
        defaultValue: 'primary'
      }
    ],
    events: ['change', 'update:checked'],
    slots: ['default'],
    snippet: {
      children: '标签一'
    }
  },
  ElText: {
    name: 'ElText',
    label: '文本',
    categoryId: 'base',
    doc: 'https://element-plus.org/zh-CN/component/text.html',
    props: [
      {
        name: 'type',
        label: 'type',
        title: '类型',
        setters: 'SelectSetter',
        options: ['primary', 'success', 'warning', 'danger', 'info']
      },
      {
        name: 'size',
        label: 'size',
        title: '大小',
        setters: 'SelectSetter',
        options: ['large', 'default', 'small'],
        defaultValue: 'default'
      },
      {
        name: 'truncated',
        label: 'truncated',
        title: '显示省略号',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'lineClamp',
        label: 'lineClamp',
        title: '最大行数',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'tag',
        label: 'tag',
        title: '自定义元素标签',
        setters: 'StringSetter',
        defaultValue: 'span'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        type: 'primary'
      },
      children: '这是一段Primary颜色的文本'
    },
    package: 'element-plus'
  },
  ElTimeline: {
    name: 'ElTimeline',
    label: '时间线',
    doc: 'https://element-plus.org/zh-CN/component/timeline.html',
    categoryId: 'form',
    package: 'element-plus',
    slots: ['default'],
    snippet: {
      name: 'ElTimeline',
      children: [
        {
          name: 'ElTimelineItem',
          children: 'Event start',
          props: {
            timestamp: '2018-04-15',
            size: 'large',
            type: 'primary',
            icon: 'MoreFilled'
          }
        },
        {
          name: 'ElTimelineItem',
          children: 'Approved',
          props: {
            timestamp: '2018-04-13',
            color: '#0bbd87'
          }
        },
        {
          name: 'ElTimelineItem',
          children: 'Success',
          props: {
            timestamp: '2018-04-11',
            hollow: true,
            icon: 'el-icon-more'
          }
        }
      ]
    }
  },
  ElTimelineItem: {
    name: 'ElTimelineItem',
    label: '时间线子项',
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'timestamp',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'hide-timestamp',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'center',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'placement',
        defaultValue: 'bottom',
        options: ['top', 'bottom'],
        setters: 'SelectSetter'
      },
      {
        name: 'type',
        defaultValue: '',
        options: ['primary', 'success', 'warning', 'danger', 'info'],
        setters: 'SelectSetter'
      },
      {
        name: 'color',
        defaultValue: '',
        options: ['hsl', 'hsv', 'hex', 'rgb'],
        setters: 'SelectSetter'
      },
      {
        name: 'size',
        defaultValue: 'normal',
        options: ['normal', 'large'],
        setters: 'SelectSetter'
      },
      {
        name: 'icon',
        defaultValue: '',
        setters: 'IconSetter'
      },
      {
        name: 'hollow',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default', 'dot']
  },
  ElTimePicker: {
    name: 'ElTimePicker',
    label: '时间选择器',
    childIncludes: false,
    doc: 'https://element-plus.org/zh-CN/component/time-picker.html',
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: '',
        setters: [
          'NumberSetter',
          'StringSetter',
          'ArraySetter',
          'ExpressionSetter'
        ]
      },
      {
        name: 'readonly',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'editable',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'clearable',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'placeholder',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'startPlaceholder',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'endPlaceholder',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'isRange',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'arrowControl',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'popperClass',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'rangeSeparator',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'format',
        defaultValue: 'HH:mm:ss',
        setters: 'InputSetter'
      },
      {
        name: 'defaultValue',
        defaultValue: '',
        setters: ['InputSetter', 'ExpressionSetter']
      },
      {
        name: 'valueFormat',
        title: '可选，绑定值的格式。 不指定则绑定值为 Date 对象',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'id',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'ariaLabel',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'prefixIcon',
        defaultValue: 'Clock',
        setters: 'InputSetter'
      },
      {
        name: 'clearIcon',
        defaultValue: 'CircleClose',
        setters: 'InputSetter'
      },
      {
        name: 'disabledHours',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'disabledMinutes',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'disabledSeconds',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'teleported',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'tabindex',
        label: 'tabindex',
        title: '输入框的 tabindex',
        setters: ['StringSetter', 'NumberSetter'],
        defaultValue: 0
      },
      {
        name: 'emptyValues',
        title: '组件的空值配置',
        setters: 'ArraySetter'
      },
      {
        name: 'valueOnClear',
        title: '清空选项的值',
        setters: [
          'StringSetter',
          'NumberSetter',
          'BooleanSetter',
          'FunctionSetter'
        ]
      }
    ],
    events: [
      'change',
      'blur',
      'focus',
      'clear',
      'visible-change',
      'update:modelValue'
    ]
  },
  ElTimeSelect: {
    name: 'ElTimeSelect',
    label: '时间选择',
    childIncludes: false,
    doc: 'https://element-plus.org/zh-CN/component/time-select.html',
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: '',
        setters: ['StringSetter', 'ExpressionSetter']
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'editable',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'clearable',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'placeholder',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'effect',
        defaultValue: 'light',
        options: ['dark', 'light'],
        setters: 'SelectSetter'
      },
      {
        name: 'prefixIcon',
        defaultValue: 'Clock',
        setters: 'InputSetter'
      },
      {
        name: 'clearIcon',
        defaultValue: 'CircleClose',
        setters: 'InputSetter'
      },
      {
        name: 'start',
        defaultValue: '09:00',
        setters: 'InputSetter'
      },
      {
        name: 'end',
        defaultValue: '18:00',
        setters: 'InputSetter'
      },
      {
        name: 'step',
        defaultValue: '00:30',
        setters: 'InputSetter'
      },
      {
        name: 'minTime',
        defaultValue: '00:00',
        setters: 'InputSetter'
      },
      {
        name: 'maxTime',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'format',
        defaultValue: 'HH:mm',
        setters: 'InputSetter'
      },
      {
        name: 'emptyValues',
        title: '组件的空值配置',
        setters: 'ArraySetter'
      },
      {
        name: 'valueOnClear',
        title: '清空选项的值',
        setters: [
          'StringSetter',
          'NumberSetter',
          'BooleanSetter',
          'FunctionSetter'
        ]
      }
    ],
    events: ['change', 'blur', 'focus', 'clear', 'update:modelValue']
  },
  ElTooltip: {
    name: 'ElTooltip',
    childIncludes: true,
    label: '文字提示',
    doc: 'https://element-plus.org/zh-CN/component/tooltip.html',
    categoryId: 'other',
    package: 'element-plus',
    props: [
      {
        name: 'appendTo',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'effect',
        defaultValue: 'dark',
        setters: 'InputSetter'
      },
      {
        name: 'content',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'rawContent',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'placement',
        defaultValue: 'bottom',
        setters: 'SelectSetter',
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ]
      },
      {
        name: 'fallback-placements',
        setters: 'ArraySetter'
      },
      {
        name: 'visible',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'offset',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'transition',
        defaultValue: 'el-fade-in-linear',
        setters: 'InputSetter'
      },
      {
        name: 'popperOptions',
        defaultValue: {
          boundariesElement: 'body',
          gpuAcceleration: false
        },
        setters: 'JSONSetter'
      },
      {
        name: 'showAfter',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'show-arrow',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'hide-after',
        defaultValue: 200,
        setters: 'NumberSetter'
      },
      {
        name: 'auto-close',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'popper-class',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'enterable',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'teleported',
        label: 'teleported',
        title: '是否使用 teleport。设置成 true则会被追加到 append-to 的位置',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'trigger',
        label: 'trigger',
        title: '如何触发 Tooltip',
        setters: 'SelectSetter',
        options: ['hover', 'click', 'focus', 'contextmenu'],
        defaultValue: 'hover'
      },
      {
        name: 'virtual-triggering',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'virtual-ref',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'trigger-keys',
        defaultValue: ['Enter', 'Space'],
        setters: 'ExpressionSetter'
      },
      {
        name: 'persistent',
        setters: 'BooleanSetter'
      },
      {
        name: 'ariaLabel',
        label: 'ariaLabel',
        title: '和 aria-label 属性保持一致',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'confirm'
      },
      {
        name: 'cancel'
      },
      {
        name: 'update:visible '
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'content'
      }
    ],
    snippet: {
      name: 'ElTooltip',
      children: '文字提示',
      props: {
        content: '自定义弹出框的内容'
      }
    }
  },
  ElTour: {
    name: 'ElTour',
    label: '漫游式引导',
    doc: 'https://element-plus.org/zh-CN/component/tour.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'showArrow',
        label: 'showArrow',
        title: '是否显示箭头',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'placement',
        label: 'placement',
        title: '引导卡片相对于目标元素的位置',
        setters: 'SelectSetter',
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ],
        defaultValue: 'bottom'
      },
      {
        name: 'contentStyle',
        label: 'contentStyle',
        title: '为content自定义样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'mask',
        label: 'mask',
        title: '是否启用遮罩，通过自定义属性改变遮罩样式以及填充的颜色',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: true
      },
      {
        name: 'type',
        label: 'type',
        title: '类型，影响底色与文字颜色',
        setters: 'SelectSetter',
        options: ['default', 'primary'],
        defaultValue: 'default'
      },
      {
        name: 'modelValue',
        label: 'modelValue',
        title: '打开引导',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'current',
        label: 'current',
        title: '当前值',
        setters: 'NumberSetter'
      },
      {
        name: 'scroll-into-view-options',
        label: 'scroll-into-view-options',
        title:
          '是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: {
          block: 'center'
        }
      },
      {
        name: 'z-index',
        label: 'z-index',
        title: 'Tour 的层级',
        setters: 'NumberSetter',
        defaultValue: 2001
      },
      {
        name: 'show-close',
        label: 'show-close',
        title: '是否显示关闭按钮',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'close-icon',
        label: 'close-icon',
        title: '自定义关闭图标',
        setters: 'IconSetter',
        defaultValue: 'Close'
      },
      {
        name: 'close-on-press-escape',
        label: 'close-on-press-escape',
        title: '是否可以通过按下 ESC 关闭引导',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'target-area-clickable',
        label: 'target-area-clickable',
        title: '启用蒙层时，target 元素区域是否可以点击。',
        setters: 'BooleanSetter',
        defaultValue: true
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'indicators',
        params: ['current', 'total']
      },
      {
        name: 'close-icon'
      }
    ],
    events: [
      'close',
      'finish',
      'change',
      'update:modelValue',
      'update:current'
    ],
    snippet: {
      props: {
        modelValue: true
      },
      children: [
        {
          name: 'ElTourStep',
          props: {
            title: 'Center',
            description: 'Displayed in the center of screen.'
          }
        },
        {
          name: 'ElTourStep',
          props: {
            title: 'Center',
            description: 'Displayed in the center of screen.'
          }
        },
        {
          name: 'ElTourStep',
          props: {
            title: 'Center',
            description: 'Displayed in the center of screen.'
          }
        }
      ]
    }
  },
  ElTourStep: {
    name: 'ElTourStep',
    label: '漫游式引导步',
    parentIncludes: ['ElTour'],
    doc: 'https://element-plus.org/zh-CN/component/tour.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'target',
        label: 'target',
        title: '获取引导卡片指向的元素， 为空时居中于屏幕。',
        setters: ['StringSetter', 'FunctionSetter']
      },
      {
        name: 'showArrow',
        label: 'showArrow',
        title: '是否显示箭头',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'title',
        label: 'title',
        title: '标题',
        setters: 'StringSetter'
      },
      {
        name: 'description',
        label: 'description',
        title: '主要描述部分',
        setters: 'StringSetter'
      },
      {
        name: 'placement',
        label: 'placement',
        title: '引导卡片相对于目标元素的位置',
        setters: 'SelectSetter',
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ],
        defaultValue: 'bottom'
      },
      {
        name: 'contentStyle',
        label: 'contentStyle',
        title: '为content自定义样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'mask',
        label: 'mask',
        title: '是否启用蒙层，也可传入配置改变蒙层样式和填充色',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: true
      },
      {
        name: 'type',
        label: 'type',
        title: '类型，影响底色与文字颜色',
        setters: 'SelectSetter',
        options: ['default', 'primary'],
        defaultValue: 'default'
      },
      {
        name: 'nextButtonProps',
        label: 'nextButtonProps',
        title: '“下一步”按钮的属性',
        setters: 'ObjectSetter'
      },
      {
        name: 'prev-button-props',
        label: 'prev-button-props',
        title: '“上一步”按钮的属性',
        setters: 'ObjectSetter'
      },
      {
        name: 'scrollIntoViewOptions',
        label: 'scrollIntoViewOptions',
        title:
          '是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数',
        setters: ['BooleanSetter', 'ObjectSetter']
      },
      {
        name: 'showClose',
        label: 'showClose',
        title: '是否显示关闭按钮',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'closeIcon',
        label: 'closeIcon',
        title: '自定义关闭图标',
        setters: ['IconSetter']
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'header'
      },
      {
        name: 'close-icon'
      }
    ],
    events: ['close'],
    snippet: {
      props: {
        title: 'Center',
        description: 'Displayed in the center of screen.'
      }
    }
  },
  ElTransfer: {
    name: 'ElTransfer',
    label: '穿梭框',
    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/transfer.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: '',
        setters: ['ArraySetter', 'ExpressionSetter']
      },
      {
        name: 'data',
        defaultValue: [],
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'filterable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'filterPlaceholder',
        defaultValue: 'Enter keyword',
        setters: 'InputSetter'
      },
      {
        name: 'filterMethod',
        setters: 'FunctionSetter'
      },
      {
        name: 'targetOrder',
        defaultValue: 'original',
        options: ['original', 'push', 'unshift'],
        setters: 'SelectSetter'
      },
      {
        name: 'titles',
        defaultValue: [],
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'buttonTexts',
        defaultValue: [],
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'renderContent',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'format',
        defaultValue: '',
        setters: ['ObjectSetter', 'JSONSetter']
      },
      {
        name: 'props',
        defaultValue: '',
        setters: ['ObjectSetter', 'JSONSetter']
      },
      {
        name: 'leftDefaultChecked',
        defaultValue: [],
        title: '初始状态下左侧列表的已勾选项的 key 数组',
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'rightDefaultChecked',
        defaultValue: [],
        title: '初始状态下右侧列表的已勾选项的 key 数组',
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    slots: [
      {
        name: 'default',
        params: ['options']
      },
      {
        name: 'left-footer'
      },
      {
        name: 'right-footer'
      },
      {
        name: 'left-empty'
      },
      {
        name: 'right-empty'
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'left-check-change'
      },
      {
        name: 'right-check-change'
      },
      {
        name: 'update:modelValue'
      }
    ]
  },
  ElTree: {
    name: 'ElTree',
    label: '树形控件',
    doc: 'https://element-plus.org/zh-CN/component/tree.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'data',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'empty-text',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'node-key',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'props',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'render-after-expand',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'load',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'render-content',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'highlight-current',
        defaultValue: false,
        label: '高亮当前节点',
        setters: 'BooleanSetter'
      },
      {
        name: 'default-expand-all',
        defaultValue: false,
        label: '展开所有节点',
        setters: 'BooleanSetter'
      },
      {
        name: 'expand-on-click-node',
        defaultValue: true,
        title:
          '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
        label: '点击展开',
        setters: 'BooleanSetter'
      },
      {
        name: 'check-on-click-node',
        defaultValue: false,
        title:
          '是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。',
        label: '点击选中',
        setters: 'BooleanSetter'
      },
      {
        name: 'auto-expand-parent',
        defaultValue: true,
        title: '展开子节点的时候是否自动展开父节点',
        label: '自动展开',
        setters: 'BooleanSetter'
      },
      {
        name: 'default-expanded-keys',
        defaultValue: '',
        title: '默认展开的节点的 key 的数组',
        label: '默认展开',
        setters: 'JSONSetter'
      },
      {
        name: 'show-checkbox',
        defaultValue: false,
        label: '显示checkbox',
        setters: 'BooleanSetter'
      },
      {
        name: 'check-strictly',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'default-checked-keys',
        defaultValue: '',
        title: '默认勾选的节点的 key 的数组',
        label: '默认勾选',
        setters: 'JSONSetter'
      },
      {
        name: 'current-node-key',
        defaultValue: '',
        label: '当前节点key',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'filter-node-method',
        defaultValue: '',
        title:
          'filter-node-method 对树节点进行筛选时执行的方法， 返回 false 则表示这个节点会被隐藏',
        label: '筛选节点函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'accordion',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'indent',
        defaultValue: 16,
        setters: 'NumberSetter'
      },
      {
        name: 'icon',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'lazy',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'draggable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'allow-drag',
        defaultValue: '',
        title: '判断节点能否被拖拽 如果返回 false ，节点不能被拖动',
        setters: 'FunctionSetter'
      },
      {
        name: 'allow-drop',
        defaultValue: '',
        title:
          '拖拽时判定目标节点能否成为拖动目标位置。 如果返回 false ，拖动节点不能被拖放到目标节点。 type 参数有三种情况：prev、inner 和 next，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后',
        setters: 'FunctionSetter'
      }
    ],
    events: [
      'node-click',
      'node-contextmenu',
      'check-change',
      'check',
      'current-change',
      'node-expand',
      'node-collapse',
      'node-drag-start',
      'node-drag-enter',
      'node-drag-leave',
      'node-drag-over',
      'node-drop',
      'node-drag-end'
    ],
    slots: [
      {
        name: 'default',
        params: ['node', 'data']
      },
      {
        name: 'empty'
      }
    ],
    snippet: {
      props: {
        data: [
          {
            value: 'guide',
            label: 'Guide',
            children: [
              {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                  {
                    value: 'consistency',
                    label: 'Consistency'
                  },
                  {
                    value: 'feedback',
                    label: 'Feedback'
                  },
                  {
                    value: 'efficiency',
                    label: 'Efficiency'
                  },
                  {
                    value: 'controllability',
                    label: 'Controllability'
                  }
                ]
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'side nav',
                    label: 'Side Navigation'
                  },
                  {
                    value: 'top nav',
                    label: 'Top Navigation'
                  }
                ]
              }
            ]
          },
          {
            value: 'component',
            label: 'Component',
            children: [
              {
                value: 'basic',
                label: 'Basic',
                children: [
                  {
                    value: 'layout',
                    label: 'Layout'
                  },
                  {
                    value: 'color',
                    label: 'Color'
                  },
                  {
                    value: 'typography',
                    label: 'Typography'
                  },
                  {
                    value: 'icon',
                    label: 'Icon'
                  },
                  {
                    value: 'button',
                    label: 'Button'
                  }
                ]
              },
              {
                value: 'form',
                label: 'Form',
                children: [
                  {
                    value: 'radio',
                    label: 'Radio'
                  },
                  {
                    value: 'checkbox',
                    label: 'Checkbox'
                  },
                  {
                    value: 'input',
                    label: 'Input'
                  },
                  {
                    value: 'input-number',
                    label: 'InputNumber'
                  },
                  {
                    value: 'select',
                    label: 'Select'
                  },
                  {
                    value: 'cascader',
                    label: 'Cascader'
                  },
                  {
                    value: 'switch',
                    label: 'Switch'
                  },
                  {
                    value: 'slider',
                    label: 'Slider'
                  },
                  {
                    value: 'time-picker',
                    label: 'TimePicker'
                  },
                  {
                    value: 'date-picker',
                    label: 'DatePicker'
                  },
                  {
                    value: 'datetime-picker',
                    label: 'DateTimePicker'
                  },
                  {
                    value: 'upload',
                    label: 'Upload'
                  },
                  {
                    value: 'rate',
                    label: 'Rate'
                  },
                  {
                    value: 'form',
                    label: 'Form'
                  }
                ]
              },
              {
                value: 'data',
                label: 'Data',
                children: [
                  {
                    value: 'table',
                    label: 'Table'
                  },
                  {
                    value: 'tag',
                    label: 'Tag'
                  },
                  {
                    value: 'progress',
                    label: 'Progress'
                  },
                  {
                    value: 'tree',
                    label: 'Tree'
                  },
                  {
                    value: 'pagination',
                    label: 'Pagination'
                  },
                  {
                    value: 'badge',
                    label: 'Badge'
                  }
                ]
              },
              {
                value: 'notice',
                label: 'Notice',
                children: [
                  {
                    value: 'alert',
                    label: 'Alert'
                  },
                  {
                    value: 'loading',
                    label: 'Loading'
                  },
                  {
                    value: 'message',
                    label: 'Message'
                  },
                  {
                    value: 'message-box',
                    label: 'MessageBox'
                  },
                  {
                    value: 'notification',
                    label: 'Notification'
                  }
                ]
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'menu',
                    label: 'Menu'
                  },
                  {
                    value: 'tabs',
                    label: 'Tabs'
                  },
                  {
                    value: 'breadcrumb',
                    label: 'Breadcrumb'
                  },
                  {
                    value: 'dropdown',
                    label: 'Dropdown'
                  },
                  {
                    value: 'steps',
                    label: 'Steps'
                  }
                ]
              },
              {
                value: 'others',
                label: 'Others',
                children: [
                  {
                    value: 'dialog',
                    label: 'Dialog'
                  },
                  {
                    value: 'tooltip',
                    label: 'Tooltip'
                  },
                  {
                    value: 'popover',
                    label: 'Popover'
                  },
                  {
                    value: 'card',
                    label: 'Card'
                  },
                  {
                    value: 'carousel',
                    label: 'Carousel'
                  },
                  {
                    value: 'collapse',
                    label: 'Collapse'
                  }
                ]
              }
            ]
          },
          {
            value: 'resource',
            label: 'Resource',
            children: [
              {
                value: 'axure',
                label: 'Axure Components'
              },
              {
                value: 'sketch',
                label: 'Sketch Templates'
              },
              {
                value: 'docs',
                label: 'Design Documentation'
              }
            ]
          }
        ]
      }
    }
  },
  ElTreeSelect: {
    name: 'ElTreeSelect',
    label: '树形选择',
    doc: 'https://element-plus.org/zh-CN/component/tree-select.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'cacheData',
        label: 'cacheData',
        title: '懒加载节点的缓存数据，结构与数据相同，用于获取未加载数据的标签',
        setters: 'ArraySetter',
        defaultValue: []
      },
      {
        name: 'data',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'empty-text',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'node-key',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'props',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'renderAfterExpand',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'load',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'renderContent',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'highlightCurrent',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'defaultExpandAll',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'expandOnClickNode',
        defaultValue: true,
        title:
          '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
        setters: 'BooleanSetter'
      },
      {
        name: 'checkOnClickNode',
        defaultValue: false,
        title:
          '是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。',
        setters: 'BooleanSetter'
      },
      {
        name: 'autoExpandParent',
        defaultValue: true,
        title: '展开子节点的时候是否自动展开父节点',
        setters: 'BooleanSetter'
      },
      {
        name: 'defaultExpandedKeys',
        defaultValue: '',
        title: '默认展开的节点的 key 的数组',
        label: '默认展开',
        setters: 'JSONSetter'
      },
      {
        name: 'showCheckbox',
        defaultValue: false,
        label: '显示checkbox',
        setters: 'BooleanSetter'
      },
      {
        name: 'checkStrictly',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'defaultCheckedKeys',
        defaultValue: '',
        title: '默认勾选的节点的 key 的数组',
        label: '默认勾选',
        setters: 'JSONSetter'
      },
      {
        name: 'currentNodeKey',
        defaultValue: '',
        label: '当前节点key',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'filterNodeMethod',
        defaultValue: '',
        title:
          'filter-node-method 对树节点进行筛选时执行的方法， 返回 false 则表示这个节点会被隐藏',
        label: '筛选节点函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'accordion',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'indent',
        defaultValue: 16,
        setters: 'NumberSetter'
      },
      {
        name: 'icon',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'lazy',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'draggable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'allowDrag',
        defaultValue: '',
        title: '判断节点能否被拖拽 如果返回 false ，节点不能被拖动',
        setters: 'FunctionSetter'
      },
      {
        name: 'allowDrop',
        defaultValue: '',
        title:
          '拖拽时判定目标节点能否成为拖动目标位置。 如果返回 false ，拖动节点不能被拖放到目标节点。 type 参数有三种情况：prev、inner 和 next，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后',
        setters: 'FunctionSetter'
      },
      {
        name: 'modelValue',
        defaultValue: '',
        setters: [
          'StringSetter',
          'NumberSetter',
          'BooleanSetter',
          'ObjectSetter',
          'ArraySetter'
        ]
      },
      {
        name: 'multiple',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'valueKey',
        defaultValue: 'value',
        setters: 'InputSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'clearable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'collapseTags',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'collapseTagsTooltip',
        label: 'Tooltip',
        title:
          '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'multipleLimit',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'effect',
        defaultValue: 'light',
        options: ['dark', 'light'],
        setters: 'SelectSetter'
      },
      {
        name: 'autocomplete',
        defaultValue: 'off',
        setters: 'InputSetter'
      },
      {
        name: 'placeholder',
        defaultValue: 'Select',
        setters: 'InputSetter'
      },
      {
        name: 'filterable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'allowCreate',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'filterMethod',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'remote',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'remoteMethod',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'remoteShowSuffix',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loadingText',
        defaultValue: 'Loading',
        setters: 'InputSetter'
      },
      {
        name: 'noMatchText',
        defaultValue: 'No matching data',
        setters: 'InputSetter'
      },
      {
        name: 'noDataText',
        defaultValue: 'No data',
        setters: 'InputSetter'
      },
      {
        name: 'popperClass',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'reserveKeyword',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'defaultFirstOption',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'popperAppendToBody',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'teleported',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'appendTo',
        setters: 'StringSetter'
      },
      {
        name: 'persistent',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'automaticDropdown',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'clearIcon',
        defaultValue: 'CircleClose',
        setters: 'InputSetter'
      },
      {
        name: 'fitInputWidth',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'suffixIcon',
        defaultValue: 'ArrowUp',
        setters: 'InputSetter'
      },
      {
        name: 'tagType',
        defaultValue: 'info',
        options: ['success', 'info', 'warning', 'danger'],
        setters: 'SelectSetter'
      },
      {
        name: 'tagEffect',
        defaultValue: 'light',
        options: ['', 'light', 'dark', 'plain'],
        setters: 'SelectSetter'
      },
      {
        name: 'validateEvent',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'offset',
        defaultValue: 12,
        setters: 'NumberSetter'
      },
      {
        name: 'showArrow',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'placement',
        label: 'placement',
        title: '下拉框出现的位置',
        setters: 'SelectSetter',
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ],
        defaultValue: 'bottom-start'
      },
      {
        name: 'fallbackPlacements',
        label: 'fallbackPlacements',
        title: 'dropdown 可用的 positions',
        setters: 'ArraySetter',
        defaultValue: ['bottom-start', 'top-start', 'right', 'left']
      },
      {
        name: 'maxCollapseTags',
        label: 'maxCollapseTags',
        title:
          '需要显示的 Tag 的最大数量 只有当 collapse-tags 设置为 true 时才会生效。',
        setters: 'NumberSetter',
        defaultValue: 1
      },
      {
        name: 'popperOptions',
        label: 'popperOptions',
        title: 'popper.js 参数',
        setters: 'ObjectSetter',
        defaultValue: {}
      },
      {
        name: 'ariaLabel',
        label: 'ariaLabel',
        title: '等价于原生 input aria-label 属性',
        setters: 'StringSetter'
      },
      {
        name: 'emptyValues',
        setters: 'ArraySetter'
      },
      {
        name: 'valueOnClear',
        setters: [
          'StringSetter',
          'NumberSetter',
          'BooleanSetter',
          'FunctionSetter'
        ]
      },
      {
        name: 'suffixTransition',
        title: '下拉菜单显示/消失时后缀图标的动画',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'tabindex',
        setters: ['StringSetter', 'NumberSetter']
      }
    ],
    events: [
      'node-click',
      'node-contextmenu',
      'check-change',
      'check',
      'current-change',
      'node-expand',
      'node-collapse',
      'node-drag-start',
      'node-drag-enter',
      'node-drag-leave',
      'node-drag-over',
      'node-drop',
      'node-drag-end',
      'change',
      'visible-change',
      'remove-tag',
      'clear',
      'blur',
      'focus',
      'update:modelValue'
    ],
    slots: [
      {
        name: 'default',
        params: ['node', 'data']
      },
      {
        name: 'empty'
      },
      {
        name: 'header'
      },
      {
        name: 'footer'
      },
      {
        name: 'prefix'
      },
      {
        name: 'tag'
      },
      {
        name: 'loading'
      },
      {
        name: 'label'
      }
    ],
    snippet: {
      props: {
        data: [
          {
            value: '1',
            label: 'Level one 1',
            children: [
              {
                value: '1-1',
                label: 'Level two 1-1',
                children: [
                  {
                    value: '1-1-1',
                    label: 'Level three 1-1-1'
                  }
                ]
              }
            ]
          },
          {
            value: '2',
            label: 'Level one 2',
            children: [
              {
                value: '2-1',
                label: 'Level two 2-1',
                children: [
                  {
                    value: '2-1-1',
                    label: 'Level three 2-1-1'
                  }
                ]
              },
              {
                value: '2-2',
                label: 'Level two 2-2',
                children: [
                  {
                    value: '2-2-1',
                    label: 'Level three 2-2-1'
                  }
                ]
              }
            ]
          },
          {
            value: '3',
            label: 'Level one 3',
            children: [
              {
                value: '3-1',
                label: 'Level two 3-1',
                children: [
                  {
                    value: '3-1-1',
                    label: 'Level three 3-1-1'
                  }
                ]
              },
              {
                value: '3-2',
                label: 'Level two 3-2',
                children: [
                  {
                    value: '3-2-1',
                    label: 'Level three 3-2-1'
                  }
                ]
              }
            ]
          }
        ],
        renderAfterExpand: false,
        style: {
          width: '240px'
        }
      }
    }
  },
  ElTreeV2: {
    name: 'ElTreeV2',
    label: '虚拟化树形控件',
    doc: 'https://element-plus.org/zh-CN/component/tree-v2.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'data',
        defaultValue: '',
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'empty-text',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'props',
        defaultValue: '',
        setters: ['ObjectSetter', 'JSONSetter']
      },
      {
        name: 'highlight-current',
        defaultValue: false,
        label: '高亮选中节点',
        setters: 'BooleanSetter'
      },
      {
        name: 'expand-on-click-node',
        defaultValue: true,
        title:
          '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点',
        label: 'expand-on',
        setters: 'BooleanSetter'
      },
      {
        name: 'check-on-click-node',
        defaultValue: false,
        title:
          '是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点',
        label: 'check-on',
        setters: 'BooleanSetter'
      },
      {
        name: 'default-expanded-keys',
        defaultValue: '',
        title: '默认展开的节点的 key 的数组',
        label: 'check-on',
        setters: 'JSONSetter'
      },
      {
        name: 'show-checkbox',
        defaultValue: false,
        title: '节点是否可被选择',
        label: 'check-on',
        setters: 'BooleanSetter'
      },
      {
        name: 'check-strictly',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'default-checked-keys',
        defaultValue: '',
        title: '默认勾选的节点的 key 的数组',
        label: 'checked-keys',
        setters: 'JSONSetter'
      },
      {
        name: 'current-node-key',
        defaultValue: '',
        label: '选中的节点',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'filter-method',
        defaultValue: '',
        title:
          '对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示， 返回 false 则表示这个节点会被隐藏',
        setters: 'JSONSetter'
      },
      {
        name: 'indent',
        defaultValue: 16,
        title: '相邻级节点间的水平缩进，单位为像素',
        setters: 'NumberSetter'
      },
      {
        name: 'icon',
        defaultValue: '',
        title: '相邻级节点间的水平缩进，单位为像素',
        setters: 'InputSetter'
      },
      {
        name: 'itemSize ',
        label: 'itemSize ',
        title: '自定义树节点的高度',
        setters: 'NumberSetter',
        defaultValue: 26
      }
    ],
    events: [
      'node-click',
      'node-drop',
      'node-contextmenu',
      'check-change',
      'check',
      'current-change',
      'node-expand',
      'node-collapse'
    ],
    slots: [
      {
        name: 'default',
        params: ['node', 'data']
      }
    ]
  },
  ElUpload: {
    name: 'ElUpload',
    label: '上传',
    doc: 'https://element-plus.org/zh-CN/component/upload.html',
    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'action',
        defaultValue: '#',
        title: '请求 URL',
        setters: 'InputSetter'
      },
      {
        name: 'headers',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'method',
        defaultValue: 'post',
        setters: 'InputSetter'
      },
      {
        name: 'multiple',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'data',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'name',
        defaultValue: 'file',
        setters: 'ExpressionSetter'
      },
      {
        name: 'withCredentials',
        defaultValue: false,
        title: '支持发送 cookie 凭证信息',
        setters: 'BooleanSetter'
      },
      {
        name: 'showFileList',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'drag',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'accept',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'crossorigin',
        options: ['', 'anonymous', 'use-credentials'],
        setters: 'SelectSetter'
      },
      {
        name: 'onPreview',
        setters: 'FunctionSetter'
      },
      {
        name: 'onRemove',
        setters: 'FunctionSetter'
      },
      {
        name: 'onSuccess',
        setters: 'FunctionSetter'
      },
      {
        name: 'onError',
        setters: ['FunctionSetter', 'ExpressionSetter']
      },
      {
        name: 'onProgress',
        setters: ['FunctionSetter', 'ExpressionSetter']
      },
      {
        name: 'onChange',
        setters: 'FunctionSetter'
      },
      {
        name: 'onExceed',
        setters: 'FunctionSetter'
      },
      {
        name: 'beforeUpload',
        setters: 'FunctionSetter'
      },
      {
        name: 'beforeRemove',
        setters: 'FunctionSetter'
      },
      {
        name: 'fileList',
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'listType',
        defaultValue: 'text',
        options: ['text', 'picture', 'picture-card'],
        setters: 'SelectSetter'
      },
      {
        name: 'autoUpload',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'httpRequest',
        setters: 'FunctionSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'limit',
        defaultValue: '',
        setters: 'NumberSetter'
      }
    ],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'trigger'
      },
      {
        name: 'tip'
      },
      {
        name: 'file'
      }
    ],
    events: [
      {
        name: 'update:fileList'
      }
    ],
    snippet: {
      props: {
        action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
        multiple: true,
        fileList: [
          {
            name: 'element-plus-logo.svg',
            url: 'https://element-plus.org/images/element-plus-logo.svg'
          }
        ]
      },
      children: [
        {
          name: 'ElButton',
          props: {
            type: 'primary'
          },
          children: '选择文件'
        }
      ]
    }
  },
  ElTableV2: {
    name: 'ElTableV2',
    label: '虚拟化表格',
    categoryId: 'data',
    doc: 'https://element-plus.org/zh-CN/component/table-v2.html',
    package: 'element-plus',
    props: [
      {
        name: 'cache',
        defaultValue: 2,
        setters: 'NumberSetter'
      },
      {
        name: 'estimated-row-height',
        defaultValue: '',
        title: '渲染动态的单元格的预估高度',
        label: 'row-height',
        setters: 'NumberSetter'
      },
      {
        name: 'header-class',
        defaultValue: '',
        setters: ['InputSetter', 'ExpressionSetter']
      },
      {
        name: 'header-props',
        defaultValue: '',
        setters: ['JSONSetter', 'ExpressionSetter']
      },
      {
        name: 'header-cell-props',
        defaultValue: '',
        setters: ['JSONSetter', 'ExpressionSetter']
      },
      {
        name: 'header-height',
        defaultValue: 50,
        setters: ['NumberSetter', 'ExpressionSetter']
      },
      {
        name: 'footer-height',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'row-class',
        defaultValue: '',
        setters: ['InputSetter', 'ExpressionSetter']
      },
      {
        name: 'row-key',
        defaultValue: 'id',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'row-props',
        defaultValue: '',
        setters: ['JSONSetter', 'ExpressionSetter']
      },
      {
        name: 'columns',
        defaultValue: '50',
        setters: 'NumberSetter'
      },
      {
        name: 'data',
        defaultValue: [],
        setters: 'JSONSetter'
      },
      {
        name: 'data-getter',
        defaultValue: '',
        setters: 'ExpressionSetter'
      },
      {
        name: 'fixed-data',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'expand-column-key',
        defaultValue: '',
        title: '列的 key 来标记哪个行可以被展开',
        label: 'column-key',
        setters: 'InputSetter'
      },
      {
        name: 'expanded-row-keys',
        defaultValue: '',
        title: '列的 key 来标记哪个行可以被展开',
        label: 'column-key',
        setters: 'JSONSetter'
      },
      {
        name: 'default-expanded-row-keys',
        defaultValue: '',
        title: '默认展开的行的 key 的数组, 这个数据不是响应式的',
        label: '默认展开行',
        setters: 'JSONSetter'
      },
      {
        name: 'class',
        defaultValue: '',
        setters: ['JSONSetter', 'InputSetter']
      },
      {
        name: 'fixed',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'width',
        defaultValue: '',
        label: '表宽必填',
        setters: 'NumberSetter'
      },
      {
        name: 'height',
        defaultValue: '',
        label: '表高必填',
        setters: 'NumberSetter'
      },
      {
        name: 'max-height',
        defaultValue: '',
        setters: 'NumberSetter'
      },
      {
        name: 'h-scrollbar-size',
        defaultValue: 6,
        label: '水平滚动条大小',
        setters: 'NumberSetter'
      },
      {
        name: 'h-scrollbar-size',
        defaultValue: 6,
        label: '垂直滚动条大小',
        setters: 'NumberSetter'
      },
      {
        name: 'scrollbar-always-on',
        defaultValue: false,
        title: '如果开启，滚动条将一直显示，反之只会在鼠标经过时显示。',
        label: 'scrollbar',
        setters: 'BooleanSetter'
      },
      {
        name: 'sort-by',
        defaultValue: {},
        title: '排序方式',
        setters: 'JSONSetter'
      },
      {
        name: 'sort-state',
        title: '多个排序',
        setters: 'JSONSetter'
      }
    ],
    slots: [
      'cell',
      'header',
      'header-cell',
      'row',
      'footer',
      'empty',
      'overlay'
    ],
    events: [
      'column-sort',
      'expanded-rows-change',
      'end-reached',
      'scroll',
      'rows-rendered',
      'row-event-handlers'
    ],
    snippet: {
      props: {
        width: 700,
        height: 400
      }
    }
  },
  ElWatermark: {
    name: 'ElWatermark',
    label: '水印',
    categoryId: 'other',
    doc: 'https://element-plus.org/zh-CN/component/watermark.html',
    package: 'element-plus',
    props: [
      {
        name: 'width',
        label: 'width',
        title: '水印的宽度， content 的默认值是它自己的宽度',
        setters: 'NumberSetter',
        defaultValue: 120
      },
      {
        name: 'height',
        label: 'height',
        title: '水印的高度， content 的默认值是它自己的高度',
        setters: 'NumberSetter',
        defaultValue: 64
      },
      {
        name: 'rotate',
        label: 'rotate',
        title: '水印的旋转角度, 单位 °',
        setters: 'NumberSetter',
        defaultValue: -22
      },
      {
        name: 'zIndex',
        label: 'zIndex',
        title: '水印元素的z-index值',
        setters: 'NumberSetter',
        defaultValue: 9
      },
      {
        name: 'image',
        label: 'image',
        title: '水印图片，建议使用 2x 或 3x 图像',
        setters: 'StringSetter'
      },
      {
        name: 'content',
        label: 'content',
        title: '水印文本内容',
        setters: ['StringSetter', 'ArraySetter']
      },
      {
        name: 'font',
        label: 'font',
        title: '文字样式',
        setters: 'ObjectSetter',
        defaultValue: {
          color: 'rgba(0,0,0,.15)',
          fontSize: 16,
          fontWeight: 'normal',
          fontFamily: 'sans-serif',
          fontStyle: 'normal',
          textAlign: 'center',
          textBaseline: 'top'
        }
      },
      {
        name: 'gap',
        label: 'gap',
        title: '水印之间的间距',
        setters: 'ArraySetter',
        defaultValue: [100, 100]
      },
      {
        name: 'offset',
        label: 'offset',
        title: '水印从容器左上角的偏移 默认值为 gap/2',
        setters: 'ArraySetter',
        defaultValue: [50, 50]
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        font: {
          color: 'rgba(0, 0, 0, .15)'
        }
      },
      children: [
        {
          name: 'div',
          props: {
            style: {
              height: '500px'
            }
          }
        }
      ]
    }
  },
  VtjIconChatRecord: {
    name: 'VtjIconChatRecord',
    label: 'VtjIconChatRecord',
    categoryId: 'vtj',
    icon: 'VtjIconChatRecord',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNewChat: {
    name: 'VtjIconNewChat',
    label: 'VtjIconNewChat',
    categoryId: 'vtj',
    icon: 'VtjIconNewChat',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconAi: {
    name: 'VtjIconAi',
    label: 'VtjIconAi',
    categoryId: 'vtj',
    icon: 'VtjIconAi',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconUniapp: {
    name: 'VtjIconUniapp',
    label: 'VtjIconUniapp',
    categoryId: 'vtj',
    icon: 'VtjIconUniapp',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconWindowMax: {
    name: 'VtjIconWindowMax',
    label: 'VtjIconWindowMax',
    categoryId: 'vtj',
    icon: 'VtjIconWindowMax',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconWindowMin: {
    name: 'VtjIconWindowMin',
    label: 'VtjIconWindowMin',
    categoryId: 'vtj',
    icon: 'VtjIconWindowMin',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconWindowClose: {
    name: 'VtjIconWindowClose',
    label: 'VtjIconWindowClose',
    categoryId: 'vtj',
    icon: 'VtjIconWindowClose',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconWindowNormal: {
    name: 'VtjIconWindowNormal',
    label: 'VtjIconWindowNormal',
    categoryId: 'vtj',
    icon: 'VtjIconWindowNormal',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconWindowDown: {
    name: 'VtjIconWindowDown',
    label: 'VtjIconWindowDown',
    categoryId: 'vtj',
    icon: 'VtjIconWindowDown',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconWindowUp: {
    name: 'VtjIconWindowUp',
    label: 'VtjIconWindowUp',
    categoryId: 'vtj',
    icon: 'VtjIconWindowUp',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpSave: {
    name: 'VtjIconNpSave',
    label: 'VtjIconNpSave',
    categoryId: 'vtj',
    icon: 'VtjIconNpSave',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpFile: {
    name: 'VtjIconNpFile',
    label: 'VtjIconNpFile',
    categoryId: 'vtj',
    icon: 'VtjIconNpFile',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpEdit: {
    name: 'VtjIconNpEdit',
    label: 'VtjIconNpEdit',
    categoryId: 'vtj',
    icon: 'VtjIconNpEdit',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpShare: {
    name: 'VtjIconNpShare',
    label: 'VtjIconNpShare',
    categoryId: 'vtj',
    icon: 'VtjIconNpShare',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpSearch: {
    name: 'VtjIconNpSearch',
    label: 'VtjIconNpSearch',
    categoryId: 'vtj',
    icon: 'VtjIconNpSearch',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpExport: {
    name: 'VtjIconNpExport',
    label: 'VtjIconNpExport',
    categoryId: 'vtj',
    icon: 'VtjIconNpExport',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpImport: {
    name: 'VtjIconNpImport',
    label: 'VtjIconNpImport',
    categoryId: 'vtj',
    icon: 'VtjIconNpImport',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpList: {
    name: 'VtjIconNpList',
    label: 'VtjIconNpList',
    categoryId: 'vtj',
    icon: 'VtjIconNpList',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpPrint: {
    name: 'VtjIconNpPrint',
    label: 'VtjIconNpPrint',
    categoryId: 'vtj',
    icon: 'VtjIconNpPrint',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpCancel: {
    name: 'VtjIconNpCancel',
    label: 'VtjIconNpCancel',
    categoryId: 'vtj',
    icon: 'VtjIconNpCancel',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpConfirm: {
    name: 'VtjIconNpConfirm',
    label: 'VtjIconNpConfirm',
    categoryId: 'vtj',
    icon: 'VtjIconNpConfirm',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpReset: {
    name: 'VtjIconNpReset',
    label: 'VtjIconNpReset',
    categoryId: 'vtj',
    icon: 'VtjIconNpReset',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpReturnAll: {
    name: 'VtjIconNpReturnAll',
    label: 'VtjIconNpReturnAll',
    categoryId: 'vtj',
    icon: 'VtjIconNpReturnAll',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpReturn: {
    name: 'VtjIconNpReturn',
    label: 'VtjIconNpReturn',
    categoryId: 'vtj',
    icon: 'VtjIconNpReturn',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpRemove: {
    name: 'VtjIconNpRemove',
    label: 'VtjIconNpRemove',
    categoryId: 'vtj',
    icon: 'VtjIconNpRemove',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpRemoveRow: {
    name: 'VtjIconNpRemoveRow',
    label: 'VtjIconNpRemoveRow',
    categoryId: 'vtj',
    icon: 'VtjIconNpRemoveRow',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpDelete: {
    name: 'VtjIconNpDelete',
    label: 'VtjIconNpDelete',
    categoryId: 'vtj',
    icon: 'VtjIconNpDelete',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpExit: {
    name: 'VtjIconNpExit',
    label: 'VtjIconNpExit',
    categoryId: 'vtj',
    icon: 'VtjIconNpExit',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpRefresh: {
    name: 'VtjIconNpRefresh',
    label: 'VtjIconNpRefresh',
    categoryId: 'vtj',
    icon: 'VtjIconNpRefresh',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpAdd: {
    name: 'VtjIconNpAdd',
    label: 'VtjIconNpAdd',
    categoryId: 'vtj',
    icon: 'VtjIconNpAdd',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpSelect: {
    name: 'VtjIconNpSelect',
    label: 'VtjIconNpSelect',
    categoryId: 'vtj',
    icon: 'VtjIconNpSelect',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpAddRow: {
    name: 'VtjIconNpAddRow',
    label: 'VtjIconNpAddRow',
    categoryId: 'vtj',
    icon: 'VtjIconNpAddRow',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpExtend: {
    name: 'VtjIconNpExtend',
    label: 'VtjIconNpExtend',
    categoryId: 'vtj',
    icon: 'VtjIconNpExtend',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpClose: {
    name: 'VtjIconNpClose',
    label: 'VtjIconNpClose',
    categoryId: 'vtj',
    icon: 'VtjIconNpClose',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNpSubmit: {
    name: 'VtjIconNpSubmit',
    label: 'VtjIconNpSubmit',
    categoryId: 'vtj',
    icon: 'VtjIconNpSubmit',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconDeps: {
    name: 'VtjIconDeps',
    label: 'VtjIconDeps',
    categoryId: 'vtj',
    icon: 'VtjIconDeps',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconBack: {
    name: 'VtjIconBack',
    label: 'VtjIconBack',
    categoryId: 'vtj',
    icon: 'VtjIconBack',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconHome: {
    name: 'VtjIconHome',
    label: 'VtjIconHome',
    categoryId: 'vtj',
    icon: 'VtjIconHome',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconApi: {
    name: 'VtjIconApi',
    label: 'VtjIconApi',
    categoryId: 'vtj',
    icon: 'VtjIconApi',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconExport: {
    name: 'VtjIconExport',
    label: 'VtjIconExport',
    categoryId: 'vtj',
    icon: 'VtjIconExport',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconImport: {
    name: 'VtjIconImport',
    label: 'VtjIconImport',
    categoryId: 'vtj',
    icon: 'VtjIconImport',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconGreater: {
    name: 'VtjIconGreater',
    label: 'VtjIconGreater',
    categoryId: 'vtj',
    icon: 'VtjIconGreater',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconSmaller: {
    name: 'VtjIconSmaller',
    label: 'VtjIconSmaller',
    categoryId: 'vtj',
    icon: 'VtjIconSmaller',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconCheck: {
    name: 'VtjIconCheck',
    label: 'VtjIconCheck',
    categoryId: 'vtj',
    icon: 'VtjIconCheck',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconSwitch: {
    name: 'VtjIconSwitch',
    label: 'VtjIconSwitch',
    categoryId: 'vtj',
    icon: 'VtjIconSwitch',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconCopy: {
    name: 'VtjIconCopy',
    label: 'VtjIconCopy',
    categoryId: 'vtj',
    icon: 'VtjIconCopy',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconLock: {
    name: 'VtjIconLock',
    label: 'VtjIconLock',
    categoryId: 'vtj',
    icon: 'VtjIconLock',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconUnlock: {
    name: 'VtjIconUnlock',
    label: 'VtjIconUnlock',
    categoryId: 'vtj',
    icon: 'VtjIconUnlock',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconLayers: {
    name: 'VtjIconLayers',
    label: 'VtjIconLayers',
    categoryId: 'vtj',
    icon: 'VtjIconLayers',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconConsole: {
    name: 'VtjIconConsole',
    label: 'VtjIconConsole',
    categoryId: 'vtj',
    icon: 'VtjIconConsole',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconTeam: {
    name: 'VtjIconTeam',
    label: 'VtjIconTeam',
    categoryId: 'vtj',
    icon: 'VtjIconTeam',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconPublish: {
    name: 'VtjIconPublish',
    label: 'VtjIconPublish',
    categoryId: 'vtj',
    icon: 'VtjIconPublish',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconPreview: {
    name: 'VtjIconPreview',
    label: 'VtjIconPreview',
    categoryId: 'vtj',
    icon: 'VtjIconPreview',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconSave: {
    name: 'VtjIconSave',
    label: 'VtjIconSave',
    categoryId: 'vtj',
    icon: 'VtjIconSave',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconPc: {
    name: 'VtjIconPc',
    label: 'VtjIconPc',
    categoryId: 'vtj',
    icon: 'VtjIconPc',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconPhone: {
    name: 'VtjIconPhone',
    label: 'VtjIconPhone',
    categoryId: 'vtj',
    icon: 'VtjIconPhone',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconPad: {
    name: 'VtjIconPad',
    label: 'VtjIconPad',
    categoryId: 'vtj',
    icon: 'VtjIconPad',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconRedo: {
    name: 'VtjIconRedo',
    label: 'VtjIconRedo',
    categoryId: 'vtj',
    icon: 'VtjIconRedo',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconRefresh: {
    name: 'VtjIconRefresh',
    label: 'VtjIconRefresh',
    categoryId: 'vtj',
    icon: 'VtjIconRefresh',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconUndo: {
    name: 'VtjIconUndo',
    label: 'VtjIconUndo',
    categoryId: 'vtj',
    icon: 'VtjIconUndo',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconCategory: {
    name: 'VtjIconCategory',
    label: 'VtjIconCategory',
    categoryId: 'vtj',
    icon: 'VtjIconCategory',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconProject: {
    name: 'VtjIconProject',
    label: 'VtjIconProject',
    categoryId: 'vtj',
    icon: 'VtjIconProject',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconNotice: {
    name: 'VtjIconNotice',
    label: 'VtjIconNotice',
    categoryId: 'vtj',
    icon: 'VtjIconNotice',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconFav: {
    name: 'VtjIconFav',
    label: 'VtjIconFav',
    categoryId: 'vtj',
    icon: 'VtjIconFav',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconBug: {
    name: 'VtjIconBug',
    label: 'VtjIconBug',
    categoryId: 'vtj',
    icon: 'VtjIconBug',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconFile: {
    name: 'VtjIconFile',
    label: 'VtjIconFile',
    categoryId: 'vtj',
    icon: 'VtjIconFile',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconFolder: {
    name: 'VtjIconFolder',
    label: 'VtjIconFolder',
    categoryId: 'vtj',
    icon: 'VtjIconFolder',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconUpload: {
    name: 'VtjIconUpload',
    label: 'VtjIconUpload',
    categoryId: 'vtj',
    icon: 'VtjIconUpload',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconDownload: {
    name: 'VtjIconDownload',
    label: 'VtjIconDownload',
    categoryId: 'vtj',
    icon: 'VtjIconDownload',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconUser: {
    name: 'VtjIconUser',
    label: 'VtjIconUser',
    categoryId: 'vtj',
    icon: 'VtjIconUser',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconSetting: {
    name: 'VtjIconSetting',
    label: 'VtjIconSetting',
    categoryId: 'vtj',
    icon: 'VtjIconSetting',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconArrowRight: {
    name: 'VtjIconArrowRight',
    label: 'VtjIconArrowRight',
    categoryId: 'vtj',
    icon: 'VtjIconArrowRight',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconArrowLeft: {
    name: 'VtjIconArrowLeft',
    label: 'VtjIconArrowLeft',
    categoryId: 'vtj',
    icon: 'VtjIconArrowLeft',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconArrowDown: {
    name: 'VtjIconArrowDown',
    label: 'VtjIconArrowDown',
    categoryId: 'vtj',
    icon: 'VtjIconArrowDown',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconArrowUp: {
    name: 'VtjIconArrowUp',
    label: 'VtjIconArrowUp',
    categoryId: 'vtj',
    icon: 'VtjIconArrowUp',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconShare: {
    name: 'VtjIconShare',
    label: 'VtjIconShare',
    categoryId: 'vtj',
    icon: 'VtjIconShare',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconData: {
    name: 'VtjIconData',
    label: 'VtjIconData',
    categoryId: 'vtj',
    icon: 'VtjIconData',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconTemplate: {
    name: 'VtjIconTemplate',
    label: 'VtjIconTemplate',
    categoryId: 'vtj',
    icon: 'VtjIconTemplate',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconExitFullscreen: {
    name: 'VtjIconExitFullscreen',
    label: 'VtjIconExitFullscreen',
    categoryId: 'vtj',
    icon: 'VtjIconExitFullscreen',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconFullscreen: {
    name: 'VtjIconFullscreen',
    label: 'VtjIconFullscreen',
    categoryId: 'vtj',
    icon: 'VtjIconFullscreen',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconEdit: {
    name: 'VtjIconEdit',
    label: 'VtjIconEdit',
    categoryId: 'vtj',
    icon: 'VtjIconEdit',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconRemove: {
    name: 'VtjIconRemove',
    label: 'VtjIconRemove',
    categoryId: 'vtj',
    icon: 'VtjIconRemove',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconJs: {
    name: 'VtjIconJs',
    label: 'VtjIconJs',
    categoryId: 'vtj',
    icon: 'VtjIconJs',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconDatabase: {
    name: 'VtjIconDatabase',
    label: 'VtjIconDatabase',
    categoryId: 'vtj',
    icon: 'VtjIconDatabase',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconInfo: {
    name: 'VtjIconInfo',
    label: 'VtjIconInfo',
    categoryId: 'vtj',
    icon: 'VtjIconInfo',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconPlus: {
    name: 'VtjIconPlus',
    label: 'VtjIconPlus',
    categoryId: 'vtj',
    icon: 'VtjIconPlus',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconMinus: {
    name: 'VtjIconMinus',
    label: 'VtjIconMinus',
    categoryId: 'vtj',
    icon: 'VtjIconMinus',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconHelp: {
    name: 'VtjIconHelp',
    label: 'VtjIconHelp',
    categoryId: 'vtj',
    icon: 'VtjIconHelp',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconVars: {
    name: 'VtjIconVars',
    label: 'VtjIconVars',
    categoryId: 'vtj',
    icon: 'VtjIconVars',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconOutline: {
    name: 'VtjIconOutline',
    label: 'VtjIconOutline',
    categoryId: 'vtj',
    icon: 'VtjIconOutline',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconVisible: {
    name: 'VtjIconVisible',
    label: 'VtjIconVisible',
    categoryId: 'vtj',
    icon: 'VtjIconVisible',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconInvisible: {
    name: 'VtjIconInvisible',
    label: 'VtjIconInvisible',
    categoryId: 'vtj',
    icon: 'VtjIconInvisible',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconDocument: {
    name: 'VtjIconDocument',
    label: 'VtjIconDocument',
    categoryId: 'vtj',
    icon: 'VtjIconDocument',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconHistory: {
    name: 'VtjIconHistory',
    label: 'VtjIconHistory',
    categoryId: 'vtj',
    icon: 'VtjIconHistory',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconFixed: {
    name: 'VtjIconFixed',
    label: 'VtjIconFixed',
    categoryId: 'vtj',
    icon: 'VtjIconFixed',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconUnfixed: {
    name: 'VtjIconUnfixed',
    label: 'VtjIconUnfixed',
    categoryId: 'vtj',
    icon: 'VtjIconUnfixed',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconSearch: {
    name: 'VtjIconSearch',
    label: 'VtjIconSearch',
    categoryId: 'vtj',
    icon: 'VtjIconSearch',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconMore: {
    name: 'VtjIconMore',
    label: 'VtjIconMore',
    categoryId: 'vtj',
    icon: 'VtjIconMore',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconClose: {
    name: 'VtjIconClose',
    label: 'VtjIconClose',
    categoryId: 'vtj',
    icon: 'VtjIconClose',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconComponents: {
    name: 'VtjIconComponents',
    label: 'VtjIconComponents',
    categoryId: 'vtj',
    icon: 'VtjIconComponents',
    porps: [],
    package: '@vtj/icons'
  },
  VtjIconBlock: {
    name: 'VtjIconBlock',
    label: 'VtjIconBlock',
    categoryId: 'vtj',
    icon: 'VtjIconBlock',
    porps: [],
    package: '@vtj/icons'
  },
  AddLocation: {
    name: 'AddLocation',
    label: 'AddLocation',
    categoryId: 'el',
    icon: 'AddLocation',
    porps: [],
    package: '@vtj/icons'
  },
  Aim: {
    name: 'Aim',
    label: 'Aim',
    categoryId: 'el',
    icon: 'Aim',
    porps: [],
    package: '@vtj/icons'
  },
  AlarmClock: {
    name: 'AlarmClock',
    label: 'AlarmClock',
    categoryId: 'el',
    icon: 'AlarmClock',
    porps: [],
    package: '@vtj/icons'
  },
  Apple: {
    name: 'Apple',
    label: 'Apple',
    categoryId: 'el',
    icon: 'Apple',
    porps: [],
    package: '@vtj/icons'
  },
  ArrowDownBold: {
    name: 'ArrowDownBold',
    label: 'ArrowDownBold',
    categoryId: 'el',
    icon: 'ArrowDownBold',
    porps: [],
    package: '@vtj/icons'
  },
  ArrowDown: {
    name: 'ArrowDown',
    label: 'ArrowDown',
    categoryId: 'el',
    icon: 'ArrowDown',
    porps: [],
    package: '@vtj/icons'
  },
  ArrowLeftBold: {
    name: 'ArrowLeftBold',
    label: 'ArrowLeftBold',
    categoryId: 'el',
    icon: 'ArrowLeftBold',
    porps: [],
    package: '@vtj/icons'
  },
  ArrowLeft: {
    name: 'ArrowLeft',
    label: 'ArrowLeft',
    categoryId: 'el',
    icon: 'ArrowLeft',
    porps: [],
    package: '@vtj/icons'
  },
  ArrowRightBold: {
    name: 'ArrowRightBold',
    label: 'ArrowRightBold',
    categoryId: 'el',
    icon: 'ArrowRightBold',
    porps: [],
    package: '@vtj/icons'
  },
  ArrowRight: {
    name: 'ArrowRight',
    label: 'ArrowRight',
    categoryId: 'el',
    icon: 'ArrowRight',
    porps: [],
    package: '@vtj/icons'
  },
  ArrowUpBold: {
    name: 'ArrowUpBold',
    label: 'ArrowUpBold',
    categoryId: 'el',
    icon: 'ArrowUpBold',
    porps: [],
    package: '@vtj/icons'
  },
  ArrowUp: {
    name: 'ArrowUp',
    label: 'ArrowUp',
    categoryId: 'el',
    icon: 'ArrowUp',
    porps: [],
    package: '@vtj/icons'
  },
  Avatar: {
    name: 'Avatar',
    label: 'Avatar',
    categoryId: 'el',
    icon: 'Avatar',
    porps: [],
    package: '@vtj/icons'
  },
  Back: {
    name: 'Back',
    label: 'Back',
    categoryId: 'el',
    icon: 'Back',
    porps: [],
    package: '@vtj/icons'
  },
  Baseball: {
    name: 'Baseball',
    label: 'Baseball',
    categoryId: 'el',
    icon: 'Baseball',
    porps: [],
    package: '@vtj/icons'
  },
  Basketball: {
    name: 'Basketball',
    label: 'Basketball',
    categoryId: 'el',
    icon: 'Basketball',
    porps: [],
    package: '@vtj/icons'
  },
  BellFilled: {
    name: 'BellFilled',
    label: 'BellFilled',
    categoryId: 'el',
    icon: 'BellFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Bell: {
    name: 'Bell',
    label: 'Bell',
    categoryId: 'el',
    icon: 'Bell',
    porps: [],
    package: '@vtj/icons'
  },
  Bicycle: {
    name: 'Bicycle',
    label: 'Bicycle',
    categoryId: 'el',
    icon: 'Bicycle',
    porps: [],
    package: '@vtj/icons'
  },
  BottomLeft: {
    name: 'BottomLeft',
    label: 'BottomLeft',
    categoryId: 'el',
    icon: 'BottomLeft',
    porps: [],
    package: '@vtj/icons'
  },
  BottomRight: {
    name: 'BottomRight',
    label: 'BottomRight',
    categoryId: 'el',
    icon: 'BottomRight',
    porps: [],
    package: '@vtj/icons'
  },
  Bottom: {
    name: 'Bottom',
    label: 'Bottom',
    categoryId: 'el',
    icon: 'Bottom',
    porps: [],
    package: '@vtj/icons'
  },
  Bowl: {
    name: 'Bowl',
    label: 'Bowl',
    categoryId: 'el',
    icon: 'Bowl',
    porps: [],
    package: '@vtj/icons'
  },
  Box: {
    name: 'Box',
    label: 'Box',
    categoryId: 'el',
    icon: 'Box',
    porps: [],
    package: '@vtj/icons'
  },
  Briefcase: {
    name: 'Briefcase',
    label: 'Briefcase',
    categoryId: 'el',
    icon: 'Briefcase',
    porps: [],
    package: '@vtj/icons'
  },
  BrushFilled: {
    name: 'BrushFilled',
    label: 'BrushFilled',
    categoryId: 'el',
    icon: 'BrushFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Brush: {
    name: 'Brush',
    label: 'Brush',
    categoryId: 'el',
    icon: 'Brush',
    porps: [],
    package: '@vtj/icons'
  },
  Burger: {
    name: 'Burger',
    label: 'Burger',
    categoryId: 'el',
    icon: 'Burger',
    porps: [],
    package: '@vtj/icons'
  },
  Calendar: {
    name: 'Calendar',
    label: 'Calendar',
    categoryId: 'el',
    icon: 'Calendar',
    porps: [],
    package: '@vtj/icons'
  },
  CameraFilled: {
    name: 'CameraFilled',
    label: 'CameraFilled',
    categoryId: 'el',
    icon: 'CameraFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Camera: {
    name: 'Camera',
    label: 'Camera',
    categoryId: 'el',
    icon: 'Camera',
    porps: [],
    package: '@vtj/icons'
  },
  CaretBottom: {
    name: 'CaretBottom',
    label: 'CaretBottom',
    categoryId: 'el',
    icon: 'CaretBottom',
    porps: [],
    package: '@vtj/icons'
  },
  CaretLeft: {
    name: 'CaretLeft',
    label: 'CaretLeft',
    categoryId: 'el',
    icon: 'CaretLeft',
    porps: [],
    package: '@vtj/icons'
  },
  CaretRight: {
    name: 'CaretRight',
    label: 'CaretRight',
    categoryId: 'el',
    icon: 'CaretRight',
    porps: [],
    package: '@vtj/icons'
  },
  CaretTop: {
    name: 'CaretTop',
    label: 'CaretTop',
    categoryId: 'el',
    icon: 'CaretTop',
    porps: [],
    package: '@vtj/icons'
  },
  Cellphone: {
    name: 'Cellphone',
    label: 'Cellphone',
    categoryId: 'el',
    icon: 'Cellphone',
    porps: [],
    package: '@vtj/icons'
  },
  ChatDotRound: {
    name: 'ChatDotRound',
    label: 'ChatDotRound',
    categoryId: 'el',
    icon: 'ChatDotRound',
    porps: [],
    package: '@vtj/icons'
  },
  ChatDotSquare: {
    name: 'ChatDotSquare',
    label: 'ChatDotSquare',
    categoryId: 'el',
    icon: 'ChatDotSquare',
    porps: [],
    package: '@vtj/icons'
  },
  ChatLineRound: {
    name: 'ChatLineRound',
    label: 'ChatLineRound',
    categoryId: 'el',
    icon: 'ChatLineRound',
    porps: [],
    package: '@vtj/icons'
  },
  ChatLineSquare: {
    name: 'ChatLineSquare',
    label: 'ChatLineSquare',
    categoryId: 'el',
    icon: 'ChatLineSquare',
    porps: [],
    package: '@vtj/icons'
  },
  ChatRound: {
    name: 'ChatRound',
    label: 'ChatRound',
    categoryId: 'el',
    icon: 'ChatRound',
    porps: [],
    package: '@vtj/icons'
  },
  ChatSquare: {
    name: 'ChatSquare',
    label: 'ChatSquare',
    categoryId: 'el',
    icon: 'ChatSquare',
    porps: [],
    package: '@vtj/icons'
  },
  Check: {
    name: 'Check',
    label: 'Check',
    categoryId: 'el',
    icon: 'Check',
    porps: [],
    package: '@vtj/icons'
  },
  Checked: {
    name: 'Checked',
    label: 'Checked',
    categoryId: 'el',
    icon: 'Checked',
    porps: [],
    package: '@vtj/icons'
  },
  Cherry: {
    name: 'Cherry',
    label: 'Cherry',
    categoryId: 'el',
    icon: 'Cherry',
    porps: [],
    package: '@vtj/icons'
  },
  Chicken: {
    name: 'Chicken',
    label: 'Chicken',
    categoryId: 'el',
    icon: 'Chicken',
    porps: [],
    package: '@vtj/icons'
  },
  ChromeFilled: {
    name: 'ChromeFilled',
    label: 'ChromeFilled',
    categoryId: 'el',
    icon: 'ChromeFilled',
    porps: [],
    package: '@vtj/icons'
  },
  CircleCheckFilled: {
    name: 'CircleCheckFilled',
    label: 'CircleCheckFilled',
    categoryId: 'el',
    icon: 'CircleCheckFilled',
    porps: [],
    package: '@vtj/icons'
  },
  CircleCheck: {
    name: 'CircleCheck',
    label: 'CircleCheck',
    categoryId: 'el',
    icon: 'CircleCheck',
    porps: [],
    package: '@vtj/icons'
  },
  CircleCloseFilled: {
    name: 'CircleCloseFilled',
    label: 'CircleCloseFilled',
    categoryId: 'el',
    icon: 'CircleCloseFilled',
    porps: [],
    package: '@vtj/icons'
  },
  CircleClose: {
    name: 'CircleClose',
    label: 'CircleClose',
    categoryId: 'el',
    icon: 'CircleClose',
    porps: [],
    package: '@vtj/icons'
  },
  CirclePlusFilled: {
    name: 'CirclePlusFilled',
    label: 'CirclePlusFilled',
    categoryId: 'el',
    icon: 'CirclePlusFilled',
    porps: [],
    package: '@vtj/icons'
  },
  CirclePlus: {
    name: 'CirclePlus',
    label: 'CirclePlus',
    categoryId: 'el',
    icon: 'CirclePlus',
    porps: [],
    package: '@vtj/icons'
  },
  Clock: {
    name: 'Clock',
    label: 'Clock',
    categoryId: 'el',
    icon: 'Clock',
    porps: [],
    package: '@vtj/icons'
  },
  CloseBold: {
    name: 'CloseBold',
    label: 'CloseBold',
    categoryId: 'el',
    icon: 'CloseBold',
    porps: [],
    package: '@vtj/icons'
  },
  Close: {
    name: 'Close',
    label: 'Close',
    categoryId: 'el',
    icon: 'Close',
    porps: [],
    package: '@vtj/icons'
  },
  Cloudy: {
    name: 'Cloudy',
    label: 'Cloudy',
    categoryId: 'el',
    icon: 'Cloudy',
    porps: [],
    package: '@vtj/icons'
  },
  CoffeeCup: {
    name: 'CoffeeCup',
    label: 'CoffeeCup',
    categoryId: 'el',
    icon: 'CoffeeCup',
    porps: [],
    package: '@vtj/icons'
  },
  Coffee: {
    name: 'Coffee',
    label: 'Coffee',
    categoryId: 'el',
    icon: 'Coffee',
    porps: [],
    package: '@vtj/icons'
  },
  Coin: {
    name: 'Coin',
    label: 'Coin',
    categoryId: 'el',
    icon: 'Coin',
    porps: [],
    package: '@vtj/icons'
  },
  ColdDrink: {
    name: 'ColdDrink',
    label: 'ColdDrink',
    categoryId: 'el',
    icon: 'ColdDrink',
    porps: [],
    package: '@vtj/icons'
  },
  CollectionTag: {
    name: 'CollectionTag',
    label: 'CollectionTag',
    categoryId: 'el',
    icon: 'CollectionTag',
    porps: [],
    package: '@vtj/icons'
  },
  Collection: {
    name: 'Collection',
    label: 'Collection',
    categoryId: 'el',
    icon: 'Collection',
    porps: [],
    package: '@vtj/icons'
  },
  Comment: {
    name: 'Comment',
    label: 'Comment',
    categoryId: 'el',
    icon: 'Comment',
    porps: [],
    package: '@vtj/icons'
  },
  Compass: {
    name: 'Compass',
    label: 'Compass',
    categoryId: 'el',
    icon: 'Compass',
    porps: [],
    package: '@vtj/icons'
  },
  Connection: {
    name: 'Connection',
    label: 'Connection',
    categoryId: 'el',
    icon: 'Connection',
    porps: [],
    package: '@vtj/icons'
  },
  Coordinate: {
    name: 'Coordinate',
    label: 'Coordinate',
    categoryId: 'el',
    icon: 'Coordinate',
    porps: [],
    package: '@vtj/icons'
  },
  CopyDocument: {
    name: 'CopyDocument',
    label: 'CopyDocument',
    categoryId: 'el',
    icon: 'CopyDocument',
    porps: [],
    package: '@vtj/icons'
  },
  Cpu: {
    name: 'Cpu',
    label: 'Cpu',
    categoryId: 'el',
    icon: 'Cpu',
    porps: [],
    package: '@vtj/icons'
  },
  CreditCard: {
    name: 'CreditCard',
    label: 'CreditCard',
    categoryId: 'el',
    icon: 'CreditCard',
    porps: [],
    package: '@vtj/icons'
  },
  Crop: {
    name: 'Crop',
    label: 'Crop',
    categoryId: 'el',
    icon: 'Crop',
    porps: [],
    package: '@vtj/icons'
  },
  DArrowLeft: {
    name: 'DArrowLeft',
    label: 'DArrowLeft',
    categoryId: 'el',
    icon: 'DArrowLeft',
    porps: [],
    package: '@vtj/icons'
  },
  DArrowRight: {
    name: 'DArrowRight',
    label: 'DArrowRight',
    categoryId: 'el',
    icon: 'DArrowRight',
    porps: [],
    package: '@vtj/icons'
  },
  DCaret: {
    name: 'DCaret',
    label: 'DCaret',
    categoryId: 'el',
    icon: 'DCaret',
    porps: [],
    package: '@vtj/icons'
  },
  DataAnalysis: {
    name: 'DataAnalysis',
    label: 'DataAnalysis',
    categoryId: 'el',
    icon: 'DataAnalysis',
    porps: [],
    package: '@vtj/icons'
  },
  DataBoard: {
    name: 'DataBoard',
    label: 'DataBoard',
    categoryId: 'el',
    icon: 'DataBoard',
    porps: [],
    package: '@vtj/icons'
  },
  DataLine: {
    name: 'DataLine',
    label: 'DataLine',
    categoryId: 'el',
    icon: 'DataLine',
    porps: [],
    package: '@vtj/icons'
  },
  DeleteFilled: {
    name: 'DeleteFilled',
    label: 'DeleteFilled',
    categoryId: 'el',
    icon: 'DeleteFilled',
    porps: [],
    package: '@vtj/icons'
  },
  DeleteLocation: {
    name: 'DeleteLocation',
    label: 'DeleteLocation',
    categoryId: 'el',
    icon: 'DeleteLocation',
    porps: [],
    package: '@vtj/icons'
  },
  Delete: {
    name: 'Delete',
    label: 'Delete',
    categoryId: 'el',
    icon: 'Delete',
    porps: [],
    package: '@vtj/icons'
  },
  Dessert: {
    name: 'Dessert',
    label: 'Dessert',
    categoryId: 'el',
    icon: 'Dessert',
    porps: [],
    package: '@vtj/icons'
  },
  Discount: {
    name: 'Discount',
    label: 'Discount',
    categoryId: 'el',
    icon: 'Discount',
    porps: [],
    package: '@vtj/icons'
  },
  DishDot: {
    name: 'DishDot',
    label: 'DishDot',
    categoryId: 'el',
    icon: 'DishDot',
    porps: [],
    package: '@vtj/icons'
  },
  Dish: {
    name: 'Dish',
    label: 'Dish',
    categoryId: 'el',
    icon: 'Dish',
    porps: [],
    package: '@vtj/icons'
  },
  DocumentAdd: {
    name: 'DocumentAdd',
    label: 'DocumentAdd',
    categoryId: 'el',
    icon: 'DocumentAdd',
    porps: [],
    package: '@vtj/icons'
  },
  DocumentChecked: {
    name: 'DocumentChecked',
    label: 'DocumentChecked',
    categoryId: 'el',
    icon: 'DocumentChecked',
    porps: [],
    package: '@vtj/icons'
  },
  DocumentCopy: {
    name: 'DocumentCopy',
    label: 'DocumentCopy',
    categoryId: 'el',
    icon: 'DocumentCopy',
    porps: [],
    package: '@vtj/icons'
  },
  DocumentDelete: {
    name: 'DocumentDelete',
    label: 'DocumentDelete',
    categoryId: 'el',
    icon: 'DocumentDelete',
    porps: [],
    package: '@vtj/icons'
  },
  DocumentRemove: {
    name: 'DocumentRemove',
    label: 'DocumentRemove',
    categoryId: 'el',
    icon: 'DocumentRemove',
    porps: [],
    package: '@vtj/icons'
  },
  Document: {
    name: 'Document',
    label: 'Document',
    categoryId: 'el',
    icon: 'Document',
    porps: [],
    package: '@vtj/icons'
  },
  Download: {
    name: 'Download',
    label: 'Download',
    categoryId: 'el',
    icon: 'Download',
    porps: [],
    package: '@vtj/icons'
  },
  Drizzling: {
    name: 'Drizzling',
    label: 'Drizzling',
    categoryId: 'el',
    icon: 'Drizzling',
    porps: [],
    package: '@vtj/icons'
  },
  EditPen: {
    name: 'EditPen',
    label: 'EditPen',
    categoryId: 'el',
    icon: 'EditPen',
    porps: [],
    package: '@vtj/icons'
  },
  Edit: {
    name: 'Edit',
    label: 'Edit',
    categoryId: 'el',
    icon: 'Edit',
    porps: [],
    package: '@vtj/icons'
  },
  ElemeFilled: {
    name: 'ElemeFilled',
    label: 'ElemeFilled',
    categoryId: 'el',
    icon: 'ElemeFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Eleme: {
    name: 'Eleme',
    label: 'Eleme',
    categoryId: 'el',
    icon: 'Eleme',
    porps: [],
    package: '@vtj/icons'
  },
  ElementPlus: {
    name: 'ElementPlus',
    label: 'ElementPlus',
    categoryId: 'el',
    icon: 'ElementPlus',
    porps: [],
    package: '@vtj/icons'
  },
  Expand: {
    name: 'Expand',
    label: 'Expand',
    categoryId: 'el',
    icon: 'Expand',
    porps: [],
    package: '@vtj/icons'
  },
  Failed: {
    name: 'Failed',
    label: 'Failed',
    categoryId: 'el',
    icon: 'Failed',
    porps: [],
    package: '@vtj/icons'
  },
  Female: {
    name: 'Female',
    label: 'Female',
    categoryId: 'el',
    icon: 'Female',
    porps: [],
    package: '@vtj/icons'
  },
  Files: {
    name: 'Files',
    label: 'Files',
    categoryId: 'el',
    icon: 'Files',
    porps: [],
    package: '@vtj/icons'
  },
  Film: {
    name: 'Film',
    label: 'Film',
    categoryId: 'el',
    icon: 'Film',
    porps: [],
    package: '@vtj/icons'
  },
  Filter: {
    name: 'Filter',
    label: 'Filter',
    categoryId: 'el',
    icon: 'Filter',
    porps: [],
    package: '@vtj/icons'
  },
  Finished: {
    name: 'Finished',
    label: 'Finished',
    categoryId: 'el',
    icon: 'Finished',
    porps: [],
    package: '@vtj/icons'
  },
  FirstAidKit: {
    name: 'FirstAidKit',
    label: 'FirstAidKit',
    categoryId: 'el',
    icon: 'FirstAidKit',
    porps: [],
    package: '@vtj/icons'
  },
  Flag: {
    name: 'Flag',
    label: 'Flag',
    categoryId: 'el',
    icon: 'Flag',
    porps: [],
    package: '@vtj/icons'
  },
  Fold: {
    name: 'Fold',
    label: 'Fold',
    categoryId: 'el',
    icon: 'Fold',
    porps: [],
    package: '@vtj/icons'
  },
  FolderAdd: {
    name: 'FolderAdd',
    label: 'FolderAdd',
    categoryId: 'el',
    icon: 'FolderAdd',
    porps: [],
    package: '@vtj/icons'
  },
  FolderChecked: {
    name: 'FolderChecked',
    label: 'FolderChecked',
    categoryId: 'el',
    icon: 'FolderChecked',
    porps: [],
    package: '@vtj/icons'
  },
  FolderDelete: {
    name: 'FolderDelete',
    label: 'FolderDelete',
    categoryId: 'el',
    icon: 'FolderDelete',
    porps: [],
    package: '@vtj/icons'
  },
  FolderOpened: {
    name: 'FolderOpened',
    label: 'FolderOpened',
    categoryId: 'el',
    icon: 'FolderOpened',
    porps: [],
    package: '@vtj/icons'
  },
  FolderRemove: {
    name: 'FolderRemove',
    label: 'FolderRemove',
    categoryId: 'el',
    icon: 'FolderRemove',
    porps: [],
    package: '@vtj/icons'
  },
  Folder: {
    name: 'Folder',
    label: 'Folder',
    categoryId: 'el',
    icon: 'Folder',
    porps: [],
    package: '@vtj/icons'
  },
  Food: {
    name: 'Food',
    label: 'Food',
    categoryId: 'el',
    icon: 'Food',
    porps: [],
    package: '@vtj/icons'
  },
  Football: {
    name: 'Football',
    label: 'Football',
    categoryId: 'el',
    icon: 'Football',
    porps: [],
    package: '@vtj/icons'
  },
  ForkSpoon: {
    name: 'ForkSpoon',
    label: 'ForkSpoon',
    categoryId: 'el',
    icon: 'ForkSpoon',
    porps: [],
    package: '@vtj/icons'
  },
  Fries: {
    name: 'Fries',
    label: 'Fries',
    categoryId: 'el',
    icon: 'Fries',
    porps: [],
    package: '@vtj/icons'
  },
  FullScreen: {
    name: 'FullScreen',
    label: 'FullScreen',
    categoryId: 'el',
    icon: 'FullScreen',
    porps: [],
    package: '@vtj/icons'
  },
  GobletFull: {
    name: 'GobletFull',
    label: 'GobletFull',
    categoryId: 'el',
    icon: 'GobletFull',
    porps: [],
    package: '@vtj/icons'
  },
  GobletSquareFull: {
    name: 'GobletSquareFull',
    label: 'GobletSquareFull',
    categoryId: 'el',
    icon: 'GobletSquareFull',
    porps: [],
    package: '@vtj/icons'
  },
  GobletSquare: {
    name: 'GobletSquare',
    label: 'GobletSquare',
    categoryId: 'el',
    icon: 'GobletSquare',
    porps: [],
    package: '@vtj/icons'
  },
  Goblet: {
    name: 'Goblet',
    label: 'Goblet',
    categoryId: 'el',
    icon: 'Goblet',
    porps: [],
    package: '@vtj/icons'
  },
  GoldMedal: {
    name: 'GoldMedal',
    label: 'GoldMedal',
    categoryId: 'el',
    icon: 'GoldMedal',
    porps: [],
    package: '@vtj/icons'
  },
  GoodsFilled: {
    name: 'GoodsFilled',
    label: 'GoodsFilled',
    categoryId: 'el',
    icon: 'GoodsFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Goods: {
    name: 'Goods',
    label: 'Goods',
    categoryId: 'el',
    icon: 'Goods',
    porps: [],
    package: '@vtj/icons'
  },
  Grape: {
    name: 'Grape',
    label: 'Grape',
    categoryId: 'el',
    icon: 'Grape',
    porps: [],
    package: '@vtj/icons'
  },
  Grid: {
    name: 'Grid',
    label: 'Grid',
    categoryId: 'el',
    icon: 'Grid',
    porps: [],
    package: '@vtj/icons'
  },
  Guide: {
    name: 'Guide',
    label: 'Guide',
    categoryId: 'el',
    icon: 'Guide',
    porps: [],
    package: '@vtj/icons'
  },
  Handbag: {
    name: 'Handbag',
    label: 'Handbag',
    categoryId: 'el',
    icon: 'Handbag',
    porps: [],
    package: '@vtj/icons'
  },
  Headset: {
    name: 'Headset',
    label: 'Headset',
    categoryId: 'el',
    icon: 'Headset',
    porps: [],
    package: '@vtj/icons'
  },
  HelpFilled: {
    name: 'HelpFilled',
    label: 'HelpFilled',
    categoryId: 'el',
    icon: 'HelpFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Help: {
    name: 'Help',
    label: 'Help',
    categoryId: 'el',
    icon: 'Help',
    porps: [],
    package: '@vtj/icons'
  },
  Hide: {
    name: 'Hide',
    label: 'Hide',
    categoryId: 'el',
    icon: 'Hide',
    porps: [],
    package: '@vtj/icons'
  },
  Histogram: {
    name: 'Histogram',
    label: 'Histogram',
    categoryId: 'el',
    icon: 'Histogram',
    porps: [],
    package: '@vtj/icons'
  },
  HomeFilled: {
    name: 'HomeFilled',
    label: 'HomeFilled',
    categoryId: 'el',
    icon: 'HomeFilled',
    porps: [],
    package: '@vtj/icons'
  },
  HotWater: {
    name: 'HotWater',
    label: 'HotWater',
    categoryId: 'el',
    icon: 'HotWater',
    porps: [],
    package: '@vtj/icons'
  },
  House: {
    name: 'House',
    label: 'House',
    categoryId: 'el',
    icon: 'House',
    porps: [],
    package: '@vtj/icons'
  },
  IceCreamRound: {
    name: 'IceCreamRound',
    label: 'IceCreamRound',
    categoryId: 'el',
    icon: 'IceCreamRound',
    porps: [],
    package: '@vtj/icons'
  },
  IceCreamSquare: {
    name: 'IceCreamSquare',
    label: 'IceCreamSquare',
    categoryId: 'el',
    icon: 'IceCreamSquare',
    porps: [],
    package: '@vtj/icons'
  },
  IceCream: {
    name: 'IceCream',
    label: 'IceCream',
    categoryId: 'el',
    icon: 'IceCream',
    porps: [],
    package: '@vtj/icons'
  },
  IceDrink: {
    name: 'IceDrink',
    label: 'IceDrink',
    categoryId: 'el',
    icon: 'IceDrink',
    porps: [],
    package: '@vtj/icons'
  },
  IceTea: {
    name: 'IceTea',
    label: 'IceTea',
    categoryId: 'el',
    icon: 'IceTea',
    porps: [],
    package: '@vtj/icons'
  },
  InfoFilled: {
    name: 'InfoFilled',
    label: 'InfoFilled',
    categoryId: 'el',
    icon: 'InfoFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Iphone: {
    name: 'Iphone',
    label: 'Iphone',
    categoryId: 'el',
    icon: 'Iphone',
    porps: [],
    package: '@vtj/icons'
  },
  Key: {
    name: 'Key',
    label: 'Key',
    categoryId: 'el',
    icon: 'Key',
    porps: [],
    package: '@vtj/icons'
  },
  KnifeFork: {
    name: 'KnifeFork',
    label: 'KnifeFork',
    categoryId: 'el',
    icon: 'KnifeFork',
    porps: [],
    package: '@vtj/icons'
  },
  Lightning: {
    name: 'Lightning',
    label: 'Lightning',
    categoryId: 'el',
    icon: 'Lightning',
    porps: [],
    package: '@vtj/icons'
  },
  Link: {
    name: 'Link',
    label: 'Link',
    categoryId: 'el',
    icon: 'Link',
    porps: [],
    package: '@vtj/icons'
  },
  List: {
    name: 'List',
    label: 'List',
    categoryId: 'el',
    icon: 'List',
    porps: [],
    package: '@vtj/icons'
  },
  Loading: {
    name: 'Loading',
    label: 'Loading',
    categoryId: 'el',
    icon: 'Loading',
    porps: [],
    package: '@vtj/icons'
  },
  LocationFilled: {
    name: 'LocationFilled',
    label: 'LocationFilled',
    categoryId: 'el',
    icon: 'LocationFilled',
    porps: [],
    package: '@vtj/icons'
  },
  LocationInformation: {
    name: 'LocationInformation',
    label: 'LocationInformation',
    categoryId: 'el',
    icon: 'LocationInformation',
    porps: [],
    package: '@vtj/icons'
  },
  Location: {
    name: 'Location',
    label: 'Location',
    categoryId: 'el',
    icon: 'Location',
    porps: [],
    package: '@vtj/icons'
  },
  Lock: {
    name: 'Lock',
    label: 'Lock',
    categoryId: 'el',
    icon: 'Lock',
    porps: [],
    package: '@vtj/icons'
  },
  Lollipop: {
    name: 'Lollipop',
    label: 'Lollipop',
    categoryId: 'el',
    icon: 'Lollipop',
    porps: [],
    package: '@vtj/icons'
  },
  MagicStick: {
    name: 'MagicStick',
    label: 'MagicStick',
    categoryId: 'el',
    icon: 'MagicStick',
    porps: [],
    package: '@vtj/icons'
  },
  Magnet: {
    name: 'Magnet',
    label: 'Magnet',
    categoryId: 'el',
    icon: 'Magnet',
    porps: [],
    package: '@vtj/icons'
  },
  Male: {
    name: 'Male',
    label: 'Male',
    categoryId: 'el',
    icon: 'Male',
    porps: [],
    package: '@vtj/icons'
  },
  Management: {
    name: 'Management',
    label: 'Management',
    categoryId: 'el',
    icon: 'Management',
    porps: [],
    package: '@vtj/icons'
  },
  MapLocation: {
    name: 'MapLocation',
    label: 'MapLocation',
    categoryId: 'el',
    icon: 'MapLocation',
    porps: [],
    package: '@vtj/icons'
  },
  Medal: {
    name: 'Medal',
    label: 'Medal',
    categoryId: 'el',
    icon: 'Medal',
    porps: [],
    package: '@vtj/icons'
  },
  Memo: {
    name: 'Memo',
    label: 'Memo',
    categoryId: 'el',
    icon: 'Memo',
    porps: [],
    package: '@vtj/icons'
  },
  Menu: {
    name: 'Menu',
    label: 'Menu',
    categoryId: 'el',
    icon: 'Menu',
    porps: [],
    package: '@vtj/icons'
  },
  MessageBox: {
    name: 'MessageBox',
    label: 'MessageBox',
    categoryId: 'el',
    icon: 'MessageBox',
    porps: [],
    package: '@vtj/icons'
  },
  Message: {
    name: 'Message',
    label: 'Message',
    categoryId: 'el',
    icon: 'Message',
    porps: [],
    package: '@vtj/icons'
  },
  Mic: {
    name: 'Mic',
    label: 'Mic',
    categoryId: 'el',
    icon: 'Mic',
    porps: [],
    package: '@vtj/icons'
  },
  Microphone: {
    name: 'Microphone',
    label: 'Microphone',
    categoryId: 'el',
    icon: 'Microphone',
    porps: [],
    package: '@vtj/icons'
  },
  MilkTea: {
    name: 'MilkTea',
    label: 'MilkTea',
    categoryId: 'el',
    icon: 'MilkTea',
    porps: [],
    package: '@vtj/icons'
  },
  Minus: {
    name: 'Minus',
    label: 'Minus',
    categoryId: 'el',
    icon: 'Minus',
    porps: [],
    package: '@vtj/icons'
  },
  Money: {
    name: 'Money',
    label: 'Money',
    categoryId: 'el',
    icon: 'Money',
    porps: [],
    package: '@vtj/icons'
  },
  Monitor: {
    name: 'Monitor',
    label: 'Monitor',
    categoryId: 'el',
    icon: 'Monitor',
    porps: [],
    package: '@vtj/icons'
  },
  MoonNight: {
    name: 'MoonNight',
    label: 'MoonNight',
    categoryId: 'el',
    icon: 'MoonNight',
    porps: [],
    package: '@vtj/icons'
  },
  Moon: {
    name: 'Moon',
    label: 'Moon',
    categoryId: 'el',
    icon: 'Moon',
    porps: [],
    package: '@vtj/icons'
  },
  MoreFilled: {
    name: 'MoreFilled',
    label: 'MoreFilled',
    categoryId: 'el',
    icon: 'MoreFilled',
    porps: [],
    package: '@vtj/icons'
  },
  More: {
    name: 'More',
    label: 'More',
    categoryId: 'el',
    icon: 'More',
    porps: [],
    package: '@vtj/icons'
  },
  MostlyCloudy: {
    name: 'MostlyCloudy',
    label: 'MostlyCloudy',
    categoryId: 'el',
    icon: 'MostlyCloudy',
    porps: [],
    package: '@vtj/icons'
  },
  Mouse: {
    name: 'Mouse',
    label: 'Mouse',
    categoryId: 'el',
    icon: 'Mouse',
    porps: [],
    package: '@vtj/icons'
  },
  Mug: {
    name: 'Mug',
    label: 'Mug',
    categoryId: 'el',
    icon: 'Mug',
    porps: [],
    package: '@vtj/icons'
  },
  MuteNotification: {
    name: 'MuteNotification',
    label: 'MuteNotification',
    categoryId: 'el',
    icon: 'MuteNotification',
    porps: [],
    package: '@vtj/icons'
  },
  Mute: {
    name: 'Mute',
    label: 'Mute',
    categoryId: 'el',
    icon: 'Mute',
    porps: [],
    package: '@vtj/icons'
  },
  NoSmoking: {
    name: 'NoSmoking',
    label: 'NoSmoking',
    categoryId: 'el',
    icon: 'NoSmoking',
    porps: [],
    package: '@vtj/icons'
  },
  Notebook: {
    name: 'Notebook',
    label: 'Notebook',
    categoryId: 'el',
    icon: 'Notebook',
    porps: [],
    package: '@vtj/icons'
  },
  Notification: {
    name: 'Notification',
    label: 'Notification',
    categoryId: 'el',
    icon: 'Notification',
    porps: [],
    package: '@vtj/icons'
  },
  Odometer: {
    name: 'Odometer',
    label: 'Odometer',
    categoryId: 'el',
    icon: 'Odometer',
    porps: [],
    package: '@vtj/icons'
  },
  OfficeBuilding: {
    name: 'OfficeBuilding',
    label: 'OfficeBuilding',
    categoryId: 'el',
    icon: 'OfficeBuilding',
    porps: [],
    package: '@vtj/icons'
  },
  Open: {
    name: 'Open',
    label: 'Open',
    categoryId: 'el',
    icon: 'Open',
    porps: [],
    package: '@vtj/icons'
  },
  Operation: {
    name: 'Operation',
    label: 'Operation',
    categoryId: 'el',
    icon: 'Operation',
    porps: [],
    package: '@vtj/icons'
  },
  Opportunity: {
    name: 'Opportunity',
    label: 'Opportunity',
    categoryId: 'el',
    icon: 'Opportunity',
    porps: [],
    package: '@vtj/icons'
  },
  Orange: {
    name: 'Orange',
    label: 'Orange',
    categoryId: 'el',
    icon: 'Orange',
    porps: [],
    package: '@vtj/icons'
  },
  Paperclip: {
    name: 'Paperclip',
    label: 'Paperclip',
    categoryId: 'el',
    icon: 'Paperclip',
    porps: [],
    package: '@vtj/icons'
  },
  PartlyCloudy: {
    name: 'PartlyCloudy',
    label: 'PartlyCloudy',
    categoryId: 'el',
    icon: 'PartlyCloudy',
    porps: [],
    package: '@vtj/icons'
  },
  Pear: {
    name: 'Pear',
    label: 'Pear',
    categoryId: 'el',
    icon: 'Pear',
    porps: [],
    package: '@vtj/icons'
  },
  PhoneFilled: {
    name: 'PhoneFilled',
    label: 'PhoneFilled',
    categoryId: 'el',
    icon: 'PhoneFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Phone: {
    name: 'Phone',
    label: 'Phone',
    categoryId: 'el',
    icon: 'Phone',
    porps: [],
    package: '@vtj/icons'
  },
  PictureFilled: {
    name: 'PictureFilled',
    label: 'PictureFilled',
    categoryId: 'el',
    icon: 'PictureFilled',
    porps: [],
    package: '@vtj/icons'
  },
  PictureRounded: {
    name: 'PictureRounded',
    label: 'PictureRounded',
    categoryId: 'el',
    icon: 'PictureRounded',
    porps: [],
    package: '@vtj/icons'
  },
  Picture: {
    name: 'Picture',
    label: 'Picture',
    categoryId: 'el',
    icon: 'Picture',
    porps: [],
    package: '@vtj/icons'
  },
  PieChart: {
    name: 'PieChart',
    label: 'PieChart',
    categoryId: 'el',
    icon: 'PieChart',
    porps: [],
    package: '@vtj/icons'
  },
  Place: {
    name: 'Place',
    label: 'Place',
    categoryId: 'el',
    icon: 'Place',
    porps: [],
    package: '@vtj/icons'
  },
  Platform: {
    name: 'Platform',
    label: 'Platform',
    categoryId: 'el',
    icon: 'Platform',
    porps: [],
    package: '@vtj/icons'
  },
  Plus: {
    name: 'Plus',
    label: 'Plus',
    categoryId: 'el',
    icon: 'Plus',
    porps: [],
    package: '@vtj/icons'
  },
  Pointer: {
    name: 'Pointer',
    label: 'Pointer',
    categoryId: 'el',
    icon: 'Pointer',
    porps: [],
    package: '@vtj/icons'
  },
  Position: {
    name: 'Position',
    label: 'Position',
    categoryId: 'el',
    icon: 'Position',
    porps: [],
    package: '@vtj/icons'
  },
  Postcard: {
    name: 'Postcard',
    label: 'Postcard',
    categoryId: 'el',
    icon: 'Postcard',
    porps: [],
    package: '@vtj/icons'
  },
  Pouring: {
    name: 'Pouring',
    label: 'Pouring',
    categoryId: 'el',
    icon: 'Pouring',
    porps: [],
    package: '@vtj/icons'
  },
  Present: {
    name: 'Present',
    label: 'Present',
    categoryId: 'el',
    icon: 'Present',
    porps: [],
    package: '@vtj/icons'
  },
  PriceTag: {
    name: 'PriceTag',
    label: 'PriceTag',
    categoryId: 'el',
    icon: 'PriceTag',
    porps: [],
    package: '@vtj/icons'
  },
  Printer: {
    name: 'Printer',
    label: 'Printer',
    categoryId: 'el',
    icon: 'Printer',
    porps: [],
    package: '@vtj/icons'
  },
  Promotion: {
    name: 'Promotion',
    label: 'Promotion',
    categoryId: 'el',
    icon: 'Promotion',
    porps: [],
    package: '@vtj/icons'
  },
  QuartzWatch: {
    name: 'QuartzWatch',
    label: 'QuartzWatch',
    categoryId: 'el',
    icon: 'QuartzWatch',
    porps: [],
    package: '@vtj/icons'
  },
  QuestionFilled: {
    name: 'QuestionFilled',
    label: 'QuestionFilled',
    categoryId: 'el',
    icon: 'QuestionFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Rank: {
    name: 'Rank',
    label: 'Rank',
    categoryId: 'el',
    icon: 'Rank',
    porps: [],
    package: '@vtj/icons'
  },
  ReadingLamp: {
    name: 'ReadingLamp',
    label: 'ReadingLamp',
    categoryId: 'el',
    icon: 'ReadingLamp',
    porps: [],
    package: '@vtj/icons'
  },
  Reading: {
    name: 'Reading',
    label: 'Reading',
    categoryId: 'el',
    icon: 'Reading',
    porps: [],
    package: '@vtj/icons'
  },
  RefreshLeft: {
    name: 'RefreshLeft',
    label: 'RefreshLeft',
    categoryId: 'el',
    icon: 'RefreshLeft',
    porps: [],
    package: '@vtj/icons'
  },
  RefreshRight: {
    name: 'RefreshRight',
    label: 'RefreshRight',
    categoryId: 'el',
    icon: 'RefreshRight',
    porps: [],
    package: '@vtj/icons'
  },
  Refresh: {
    name: 'Refresh',
    label: 'Refresh',
    categoryId: 'el',
    icon: 'Refresh',
    porps: [],
    package: '@vtj/icons'
  },
  Refrigerator: {
    name: 'Refrigerator',
    label: 'Refrigerator',
    categoryId: 'el',
    icon: 'Refrigerator',
    porps: [],
    package: '@vtj/icons'
  },
  RemoveFilled: {
    name: 'RemoveFilled',
    label: 'RemoveFilled',
    categoryId: 'el',
    icon: 'RemoveFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Remove: {
    name: 'Remove',
    label: 'Remove',
    categoryId: 'el',
    icon: 'Remove',
    porps: [],
    package: '@vtj/icons'
  },
  Right: {
    name: 'Right',
    label: 'Right',
    categoryId: 'el',
    icon: 'Right',
    porps: [],
    package: '@vtj/icons'
  },
  ScaleToOriginal: {
    name: 'ScaleToOriginal',
    label: 'ScaleToOriginal',
    categoryId: 'el',
    icon: 'ScaleToOriginal',
    porps: [],
    package: '@vtj/icons'
  },
  School: {
    name: 'School',
    label: 'School',
    categoryId: 'el',
    icon: 'School',
    porps: [],
    package: '@vtj/icons'
  },
  Scissor: {
    name: 'Scissor',
    label: 'Scissor',
    categoryId: 'el',
    icon: 'Scissor',
    porps: [],
    package: '@vtj/icons'
  },
  Search: {
    name: 'Search',
    label: 'Search',
    categoryId: 'el',
    icon: 'Search',
    porps: [],
    package: '@vtj/icons'
  },
  Select: {
    name: 'Select',
    label: 'Select',
    categoryId: 'el',
    icon: 'Select',
    porps: [],
    package: '@vtj/icons'
  },
  Sell: {
    name: 'Sell',
    label: 'Sell',
    categoryId: 'el',
    icon: 'Sell',
    porps: [],
    package: '@vtj/icons'
  },
  SemiSelect: {
    name: 'SemiSelect',
    label: 'SemiSelect',
    categoryId: 'el',
    icon: 'SemiSelect',
    porps: [],
    package: '@vtj/icons'
  },
  Service: {
    name: 'Service',
    label: 'Service',
    categoryId: 'el',
    icon: 'Service',
    porps: [],
    package: '@vtj/icons'
  },
  SetUp: {
    name: 'SetUp',
    label: 'SetUp',
    categoryId: 'el',
    icon: 'SetUp',
    porps: [],
    package: '@vtj/icons'
  },
  Setting: {
    name: 'Setting',
    label: 'Setting',
    categoryId: 'el',
    icon: 'Setting',
    porps: [],
    package: '@vtj/icons'
  },
  Share: {
    name: 'Share',
    label: 'Share',
    categoryId: 'el',
    icon: 'Share',
    porps: [],
    package: '@vtj/icons'
  },
  Ship: {
    name: 'Ship',
    label: 'Ship',
    categoryId: 'el',
    icon: 'Ship',
    porps: [],
    package: '@vtj/icons'
  },
  Shop: {
    name: 'Shop',
    label: 'Shop',
    categoryId: 'el',
    icon: 'Shop',
    porps: [],
    package: '@vtj/icons'
  },
  ShoppingBag: {
    name: 'ShoppingBag',
    label: 'ShoppingBag',
    categoryId: 'el',
    icon: 'ShoppingBag',
    porps: [],
    package: '@vtj/icons'
  },
  ShoppingCartFull: {
    name: 'ShoppingCartFull',
    label: 'ShoppingCartFull',
    categoryId: 'el',
    icon: 'ShoppingCartFull',
    porps: [],
    package: '@vtj/icons'
  },
  ShoppingCart: {
    name: 'ShoppingCart',
    label: 'ShoppingCart',
    categoryId: 'el',
    icon: 'ShoppingCart',
    porps: [],
    package: '@vtj/icons'
  },
  ShoppingTrolley: {
    name: 'ShoppingTrolley',
    label: 'ShoppingTrolley',
    categoryId: 'el',
    icon: 'ShoppingTrolley',
    porps: [],
    package: '@vtj/icons'
  },
  Smoking: {
    name: 'Smoking',
    label: 'Smoking',
    categoryId: 'el',
    icon: 'Smoking',
    porps: [],
    package: '@vtj/icons'
  },
  Soccer: {
    name: 'Soccer',
    label: 'Soccer',
    categoryId: 'el',
    icon: 'Soccer',
    porps: [],
    package: '@vtj/icons'
  },
  SoldOut: {
    name: 'SoldOut',
    label: 'SoldOut',
    categoryId: 'el',
    icon: 'SoldOut',
    porps: [],
    package: '@vtj/icons'
  },
  SortDown: {
    name: 'SortDown',
    label: 'SortDown',
    categoryId: 'el',
    icon: 'SortDown',
    porps: [],
    package: '@vtj/icons'
  },
  SortUp: {
    name: 'SortUp',
    label: 'SortUp',
    categoryId: 'el',
    icon: 'SortUp',
    porps: [],
    package: '@vtj/icons'
  },
  Sort: {
    name: 'Sort',
    label: 'Sort',
    categoryId: 'el',
    icon: 'Sort',
    porps: [],
    package: '@vtj/icons'
  },
  Stamp: {
    name: 'Stamp',
    label: 'Stamp',
    categoryId: 'el',
    icon: 'Stamp',
    porps: [],
    package: '@vtj/icons'
  },
  StarFilled: {
    name: 'StarFilled',
    label: 'StarFilled',
    categoryId: 'el',
    icon: 'StarFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Star: {
    name: 'Star',
    label: 'Star',
    categoryId: 'el',
    icon: 'Star',
    porps: [],
    package: '@vtj/icons'
  },
  Stopwatch: {
    name: 'Stopwatch',
    label: 'Stopwatch',
    categoryId: 'el',
    icon: 'Stopwatch',
    porps: [],
    package: '@vtj/icons'
  },
  SuccessFilled: {
    name: 'SuccessFilled',
    label: 'SuccessFilled',
    categoryId: 'el',
    icon: 'SuccessFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Sugar: {
    name: 'Sugar',
    label: 'Sugar',
    categoryId: 'el',
    icon: 'Sugar',
    porps: [],
    package: '@vtj/icons'
  },
  SuitcaseLine: {
    name: 'SuitcaseLine',
    label: 'SuitcaseLine',
    categoryId: 'el',
    icon: 'SuitcaseLine',
    porps: [],
    package: '@vtj/icons'
  },
  Suitcase: {
    name: 'Suitcase',
    label: 'Suitcase',
    categoryId: 'el',
    icon: 'Suitcase',
    porps: [],
    package: '@vtj/icons'
  },
  Sunny: {
    name: 'Sunny',
    label: 'Sunny',
    categoryId: 'el',
    icon: 'Sunny',
    porps: [],
    package: '@vtj/icons'
  },
  Sunrise: {
    name: 'Sunrise',
    label: 'Sunrise',
    categoryId: 'el',
    icon: 'Sunrise',
    porps: [],
    package: '@vtj/icons'
  },
  Sunset: {
    name: 'Sunset',
    label: 'Sunset',
    categoryId: 'el',
    icon: 'Sunset',
    porps: [],
    package: '@vtj/icons'
  },
  SwitchButton: {
    name: 'SwitchButton',
    label: 'SwitchButton',
    categoryId: 'el',
    icon: 'SwitchButton',
    porps: [],
    package: '@vtj/icons'
  },
  SwitchFilled: {
    name: 'SwitchFilled',
    label: 'SwitchFilled',
    categoryId: 'el',
    icon: 'SwitchFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Switch: {
    name: 'Switch',
    label: 'Switch',
    categoryId: 'el',
    icon: 'Switch',
    porps: [],
    package: '@vtj/icons'
  },
  TakeawayBox: {
    name: 'TakeawayBox',
    label: 'TakeawayBox',
    categoryId: 'el',
    icon: 'TakeawayBox',
    porps: [],
    package: '@vtj/icons'
  },
  Ticket: {
    name: 'Ticket',
    label: 'Ticket',
    categoryId: 'el',
    icon: 'Ticket',
    porps: [],
    package: '@vtj/icons'
  },
  Tickets: {
    name: 'Tickets',
    label: 'Tickets',
    categoryId: 'el',
    icon: 'Tickets',
    porps: [],
    package: '@vtj/icons'
  },
  Timer: {
    name: 'Timer',
    label: 'Timer',
    categoryId: 'el',
    icon: 'Timer',
    porps: [],
    package: '@vtj/icons'
  },
  ToiletPaper: {
    name: 'ToiletPaper',
    label: 'ToiletPaper',
    categoryId: 'el',
    icon: 'ToiletPaper',
    porps: [],
    package: '@vtj/icons'
  },
  Tools: {
    name: 'Tools',
    label: 'Tools',
    categoryId: 'el',
    icon: 'Tools',
    porps: [],
    package: '@vtj/icons'
  },
  TopLeft: {
    name: 'TopLeft',
    label: 'TopLeft',
    categoryId: 'el',
    icon: 'TopLeft',
    porps: [],
    package: '@vtj/icons'
  },
  TopRight: {
    name: 'TopRight',
    label: 'TopRight',
    categoryId: 'el',
    icon: 'TopRight',
    porps: [],
    package: '@vtj/icons'
  },
  Top: {
    name: 'Top',
    label: 'Top',
    categoryId: 'el',
    icon: 'Top',
    porps: [],
    package: '@vtj/icons'
  },
  TrendCharts: {
    name: 'TrendCharts',
    label: 'TrendCharts',
    categoryId: 'el',
    icon: 'TrendCharts',
    porps: [],
    package: '@vtj/icons'
  },
  TrophyBase: {
    name: 'TrophyBase',
    label: 'TrophyBase',
    categoryId: 'el',
    icon: 'TrophyBase',
    porps: [],
    package: '@vtj/icons'
  },
  Trophy: {
    name: 'Trophy',
    label: 'Trophy',
    categoryId: 'el',
    icon: 'Trophy',
    porps: [],
    package: '@vtj/icons'
  },
  TurnOff: {
    name: 'TurnOff',
    label: 'TurnOff',
    categoryId: 'el',
    icon: 'TurnOff',
    porps: [],
    package: '@vtj/icons'
  },
  Umbrella: {
    name: 'Umbrella',
    label: 'Umbrella',
    categoryId: 'el',
    icon: 'Umbrella',
    porps: [],
    package: '@vtj/icons'
  },
  Unlock: {
    name: 'Unlock',
    label: 'Unlock',
    categoryId: 'el',
    icon: 'Unlock',
    porps: [],
    package: '@vtj/icons'
  },
  UploadFilled: {
    name: 'UploadFilled',
    label: 'UploadFilled',
    categoryId: 'el',
    icon: 'UploadFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Upload: {
    name: 'Upload',
    label: 'Upload',
    categoryId: 'el',
    icon: 'Upload',
    porps: [],
    package: '@vtj/icons'
  },
  UserFilled: {
    name: 'UserFilled',
    label: 'UserFilled',
    categoryId: 'el',
    icon: 'UserFilled',
    porps: [],
    package: '@vtj/icons'
  },
  User: {
    name: 'User',
    label: 'User',
    categoryId: 'el',
    icon: 'User',
    porps: [],
    package: '@vtj/icons'
  },
  Van: {
    name: 'Van',
    label: 'Van',
    categoryId: 'el',
    icon: 'Van',
    porps: [],
    package: '@vtj/icons'
  },
  VideoCameraFilled: {
    name: 'VideoCameraFilled',
    label: 'VideoCameraFilled',
    categoryId: 'el',
    icon: 'VideoCameraFilled',
    porps: [],
    package: '@vtj/icons'
  },
  VideoCamera: {
    name: 'VideoCamera',
    label: 'VideoCamera',
    categoryId: 'el',
    icon: 'VideoCamera',
    porps: [],
    package: '@vtj/icons'
  },
  VideoPause: {
    name: 'VideoPause',
    label: 'VideoPause',
    categoryId: 'el',
    icon: 'VideoPause',
    porps: [],
    package: '@vtj/icons'
  },
  VideoPlay: {
    name: 'VideoPlay',
    label: 'VideoPlay',
    categoryId: 'el',
    icon: 'VideoPlay',
    porps: [],
    package: '@vtj/icons'
  },
  View: {
    name: 'View',
    label: 'View',
    categoryId: 'el',
    icon: 'View',
    porps: [],
    package: '@vtj/icons'
  },
  WalletFilled: {
    name: 'WalletFilled',
    label: 'WalletFilled',
    categoryId: 'el',
    icon: 'WalletFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Wallet: {
    name: 'Wallet',
    label: 'Wallet',
    categoryId: 'el',
    icon: 'Wallet',
    porps: [],
    package: '@vtj/icons'
  },
  WarnTriangleFilled: {
    name: 'WarnTriangleFilled',
    label: 'WarnTriangleFilled',
    categoryId: 'el',
    icon: 'WarnTriangleFilled',
    porps: [],
    package: '@vtj/icons'
  },
  WarningFilled: {
    name: 'WarningFilled',
    label: 'WarningFilled',
    categoryId: 'el',
    icon: 'WarningFilled',
    porps: [],
    package: '@vtj/icons'
  },
  Warning: {
    name: 'Warning',
    label: 'Warning',
    categoryId: 'el',
    icon: 'Warning',
    porps: [],
    package: '@vtj/icons'
  },
  Watch: {
    name: 'Watch',
    label: 'Watch',
    categoryId: 'el',
    icon: 'Watch',
    porps: [],
    package: '@vtj/icons'
  },
  Watermelon: {
    name: 'Watermelon',
    label: 'Watermelon',
    categoryId: 'el',
    icon: 'Watermelon',
    porps: [],
    package: '@vtj/icons'
  },
  WindPower: {
    name: 'WindPower',
    label: 'WindPower',
    categoryId: 'el',
    icon: 'WindPower',
    porps: [],
    package: '@vtj/icons'
  },
  ZoomIn: {
    name: 'ZoomIn',
    label: 'ZoomIn',
    categoryId: 'el',
    icon: 'ZoomIn',
    porps: [],
    package: '@vtj/icons'
  },
  ZoomOut: {
    name: 'ZoomOut',
    label: 'ZoomOut',
    categoryId: 'el',
    icon: 'ZoomOut',
    porps: [],
    package: '@vtj/icons'
  },
  XChart: {
    name: 'XChart',
    label: '图表',
    categoryId: 'base',
    props: [
      {
        name: 'option',
        label: 'option',
        title: 'ECharts option',
        setters: 'ObjectSetter'
      },
      {
        name: 'width',
        label: 'width',
        setters: ['StringNumber']
      },
      {
        name: 'height',
        label: 'height',
        setters: ['StringNumber']
      }
    ],
    snippet: {
      props: {
        width: '100%',
        height: '400px',
        option: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            }
          ]
        }
      }
    },
    package: '@vtj/charts'
  }
};
