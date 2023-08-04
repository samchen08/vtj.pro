import { ComponentDescription, AssetsCategory } from './types';

export const builtInCategories: AssetsCategory[] = [
  {
    id: 'elements',
    category: '特殊元素'
  },
  {
    id: 'components',
    category: '内置组件'
  }
];

export const builtInElements: ComponentDescription[] = [
  {
    name: 'component',
    title: '动态组件',
    categoryId: 'elements',
    doc: 'https://cn.vuejs.org/api/built-in-special-elements.html#component',
    props: [
      {
        name: 'is',
        label: '组件名',
        defaultValue: 'div',
        setters: 'InputSetter'
      }
    ],
    snippet: {
      children: '组件文本内容示例'
    }
  },
  {
    name: 'slot',
    title: '插槽',
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
      children: '插槽默认内容'
    }
  }
];

export const builtInComponents: ComponentDescription[] = [
  ...builtInElements,
  {
    name: 'Transition',
    title: '过渡效果',
    categoryId: 'components',
    package: 'vue',
    doc: 'https://cn.vuejs.org/api/built-in-components.html#transition',
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
        defaultValue: undefined,
        title:
          '指定要等待的过渡事件类型来确定过渡结束的时间，默认情况下会自动检测持续时间较长的类型',
        setters: 'SelectSetter',
        options: ['transition', 'animation']
      },
      {
        name: 'duration',
        label: '持续时间',
        defaultValue: undefined,
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
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'enterActiveClass',
        label: 'enterActiveClass',
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'enterToClass',
        label: 'enterToClass',
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'appearFromClass',
        label: 'appearFromClass',
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'appearActiveClass',
        label: 'appearActiveClass',
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'appearToClass',
        label: 'appearToClass',
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'leaveFromClass',
        label: 'leaveFromClass',
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'leaveActiveClass',
        label: 'leaveActiveClass',
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'leaveToClass',
        label: 'leaveToClass',
        defaultValue: undefined,
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
  {
    name: 'TransitionGroup',
    title: '过渡效果组',
    package: 'vue',
    categoryId: 'components',
    doc: 'https://cn.vuejs.org/api/built-in-components.html#transitiongroup',
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
        defaultValue: undefined,
        title: '如果未定义，则渲染为片段 (fragment)',
        setters: 'InputSetter'
      },
      {
        name: 'moveClass',
        label: 'moveClass',
        defaultValue: undefined,
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
        defaultValue: undefined,
        title:
          '指定要等待的过渡事件类型来确定过渡结束的时间，默认情况下会自动检测持续时间较长的类型',
        setters: 'SelectSetter',
        options: ['transition', 'animation']
      },
      {
        name: 'duration',
        label: '持续时间',
        defaultValue: undefined,
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
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'enterActiveClass',
        label: 'enterActiveClass',
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'enterToClass',
        label: 'enterToClass',
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'appearFromClass',
        label: 'appearFromClass',
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'appearActiveClass',
        label: 'appearActiveClass',
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'appearToClass',
        label: 'appearToClass',
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'leaveFromClass',
        label: 'leaveFromClass',
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'leaveActiveClass',
        label: 'leaveActiveClass',
        defaultValue: undefined,
        setters: 'InputSetter'
      },
      {
        name: 'leaveToClass',
        label: 'leaveToClass',
        defaultValue: undefined,
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
  {
    name: 'KeepAlive',
    title: '缓存切换组件',
    package: 'vue',
    categoryId: 'components',
    doc: 'https://cn.vuejs.org/api/built-in-components.html#keepalive',
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
  {
    name: 'Teleport',
    title: '传送组件',
    package: 'vue',
    categoryId: 'components',
    doc: 'https://cn.vuejs.org/api/built-in-components.html#teleport',
    props: [
      {
        name: 'to',
        label: '目标容器',
        title: '指定目标容器,可以是选择器或实际元素',
        setters: ['InputSetter']
      },
      {
        name: 'disabled',
        label: '目标容器',
        title:
          '当值为 `true` 时，内容将保留在其原始位置, 而不是移动到目标容器中, 可以动态更改',
        setters: ['BooleanSetter']
      }
    ]
  },
  {
    name: 'Suspense',
    title: '异步依赖',
    package: 'vue',
    categoryId: 'components',
    doc: 'https://cn.vuejs.org/api/built-in-components.html#suspense',
    props: [
      {
        name: 'timeout',
        label: 'timeout',
        setters: ['InputSetter']
      }
    ]
  }
];
