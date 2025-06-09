<template>
  <div>
    <component :is="renderer"></component>
    <div v-pin:[arg].modifiers="true">abc</div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';

  import { createRenderer, type BlockSchema } from '@vtj/pro';
  import { XAction } from '@vtj/web';

  const vPin = {
    mounted(el: any, binding: any) {
      el.innerHTML = JSON.stringify(binding);
    },
    updated() {
      /* ... */
    }
  };

  const arg = ref('top');

  const dsl: BlockSchema = reactive({
    name: 'Gear',
    locked: false,
    inject: [],
    state: {},
    lifeCycles: {},
    methods: {},
    computed: {},
    watch: [],
    css: `

    @keyframes clockwise {
  0% {
    transform: rotate(0deg);
    /* 旋转角度从0度开始 */
  }

  100% {
    transform: rotate(360deg);
    /* 旋转角度到360度结束 */
  }
}

@keyframes counter-clockwise {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}

.gearbox {
  background: #111;
  /* 设置齿轮箱的背景颜色为深灰色 */
  height: 180px;
  /* 设置齿轮箱的高度 */
  width: 260px;
  /* 设置齿轮箱的宽度 */
  position: relative;
  /* 相对定位 */
  border: none;
  /* 去除边框 */
  overflow: hidden;
  /* 内容溢出隐藏 */
  border-radius: 6px;
  /* 设置圆角 */
  box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.1);
  /* 设置阴影效果 */
}

.gearbox .overlay {
  border-radius: 6px;
  /* 设置覆盖层的圆角 */
  content: '';
  /* 伪元素内容为空 */
  position: absolute;
  /* 绝对定位 */
  top: 0;
  /* 顶部对齐 */
  left: 0;
  /* 左侧对齐 */
  width: 100%;
  /* 宽度100% */
  height: 100%;
  /* 高度100% */
  z-index: 10;
  /* 设置层级 */
  box-shadow: inset 0px 0px 20px black;
  /* 设置内阴影效果 */
  transition: background 0.2s;
  /* 背景颜色过渡效果 */
}

.gearbox .overlay {
  background: transparent;
  /* 设置覆盖层背景为透明 */
}

.gear {
  position: absolute;
  /* 绝对定位 */
  height: 60px;
  /* 设置齿轮的高度 */
  width: 60px;
  /* 设置齿轮的宽度 */
  box-shadow:
    0px -1px 0px 0px #888888,
    0px 1px 0px 0px black;
  /* 设置齿轮的阴影效果 */
  border-radius: 30px;
  /* 设置齿轮的圆角 */
}

.gear.large {
  height: 120px;
  /* 设置大齿轮的高度 */
  width: 120px;
  /* 设置大齿轮的宽度 */
  border-radius: 60px;
  /* 设置大齿轮的圆角 */
}

.gear.large:after {
  height: 96px;
  /* 设置大齿轮内部圆的高度 */
  width: 96px;
  /* 设置大齿轮内部圆的宽度 */
  border-radius: 48px;
  /* 设置大齿轮内部圆的圆角 */
  margin-left: -48px;
  /* 左偏移 */
  margin-top: -48px;
  /* 上偏移 */
}

.gear.one {
  top: 12px;
  /* 位置调整 */
  left: 10px;
  /* 位置调整 */
}

.gear.two {
  top: 61px;
  /* 位置调整 */
  left: 60px;
  /* 位置调整 */
}

.gear.three {
  top: 110px;
  /* 位置调整 */
  left: 10px;
  /* 位置调整 */
}

.gear.four {
  top: 13px;
  /* 位置调整 */
  left: 128px;
  /* 位置调整 */
}

.gear:after {
  content: '';
  /* 伪元素内容为空 */
  position: absolute;
  /* 绝对定位 */
  height: 36px;
  /* 设置齿轮内部圆的高度 */
  width: 36px;
  /* 设置齿轮内部圆的宽度 */
  border-radius: 36px;
  /* 设置齿轮内部圆的圆角 */
  background: #111;
  /* 设置齿轮内部圆的背景颜色 */
  top: 50%;
  /* 垂直居中 */
  left: 50%;
  /* 水平居中 */
  margin-left: -18px;
  /* 左偏移 */
  margin-top: -18px;
  /* 上偏移 */
  z-index: 3;
  /* 设置层级 */
  box-shadow:
    0px 0px 10px rgba(255, 255, 255, 0.1),
    inset 0px 0px 10px rgba(0, 0, 0, 0.1),
    inset 0px 2px 0px 0px #090909,
    inset 0px -1px 0px 0px #888888;
  /* 设置阴影效果 */
}

.gear-inner {
  position: relative;
  /* 相对定位 */
  height: 100%;
  /* 设置齿轮内部的高度 */
  width: 100%;
  /* 设置齿轮内部的宽度 */
  background: #555;
  /* 设置齿轮内部的背景颜色 */
  border-radius: 30px;
  /* 设置齿轮内部的圆角 */
  border: 1px solid rgba(255, 255, 255, 0.1);
  /* 设置边框 */
}

.large .gear-inner {
  border-radius: 60px;
  /* 设置大齿轮内部的圆角 */
}

.gear.one .gear-inner {
  animation: counter-clockwise 3s infinite linear;
  /* 设置逆时针旋转动画 */
}

.gear.two .gear-inner {
  animation: clockwise 3s infinite linear;
  /* 设置顺时针旋转动画 */
}

.gear.three .gear-inner {
  animation: counter-clockwise 3s infinite linear;
  /* 设置逆时针旋转动画 */
}

.gear.four .gear-inner {
  animation: counter-clockwise 6s infinite linear;
  /* 设置逆时针旋转动画 */
}

.gear-inner .bar {
  background: #555;
  /* 设置齿轮内部条的背景颜色 */
  height: 16px;
  /* 设置齿轮内部条的高度 */
  width: 76px;
  /* 设置齿轮内部条的宽度 */
  position: absolute;
  /* 绝对定位 */
  left: 50%;
  /* 水平居中 */
  margin-left: -38px;
  /* 左偏移 */
  top: 50%;
  /* 垂直居中 */
  margin-top: -8px;
  /* 上偏移 */
  border-radius: 2px;
  /* 设置齿轮内部条的圆角 */
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  /* 设置左边框 */
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  /* 设置右边框 */
}

.large .gear-inner .bar {
  margin-left: -68px;
  /* 左偏移 */
  width: 136px;
  /* 设置大齿轮内部条的宽度 */
}

.gear-inner .bar:nth-child(2) {
  transform: rotate(60deg);
  /* 旋转角度为60度 */
}

.gear-inner .bar:nth-child(3) {
  transform: rotate(120deg);
  /* 旋转角度为120度 */
}

.gear-inner .bar:nth-child(4) {
  transform: rotate(90deg);
  /* 旋转角度为90度 */
}

.gear-inner .bar:nth-child(5) {
  transform: rotate(30deg);
  /* 旋转角度为30度 */
}

.gear-inner .bar:nth-child(6) {
  transform: rotate(150deg);
  /* 旋转角度为150度 */
}
    
    `,
    props: [],
    emits: [],
    slots: [],
    dataSources: {},
    __VTJ_BLOCK__: true,
    __VERSION__: '1747992708592',
    id: '1x5anad7w',
    nodes: [
      {
        id: '275anszbj',
        name: 'div',
        from: '',
        invisible: false,
        locked: false,
        children: [
          {
            id: 'cn5anbxvo',
            name: 'div',
            from: '',
            invisible: false,
            locked: false,
            children: [
              {
                id: 'cp5anbxvu',
                name: 'div',
                from: '',
                invisible: false,
                locked: false,
                children: [
                  {
                    id: 'cq5anbxvu',
                    name: 'div',
                    from: '',
                    invisible: false,
                    locked: false,
                    children: [
                      {
                        id: 'cr5anbxvu',
                        name: 'div',
                        from: '',
                        invisible: false,
                        locked: false,
                        children: [],
                        props: {
                          class: 'bar'
                        },
                        directives: [],
                        events: {}
                      },
                      {
                        id: 'cs5anbxvu',
                        name: 'div',
                        from: '',
                        invisible: false,
                        locked: false,
                        children: [],
                        props: {
                          class: 'bar'
                        },
                        directives: [],
                        events: {}
                      },
                      {
                        id: 'ct5anbxvu',
                        name: 'div',
                        from: '',
                        invisible: false,
                        locked: false,
                        children: [],
                        props: {
                          class: 'bar'
                        },
                        directives: [],
                        events: {}
                      }
                    ],
                    props: {
                      class: 'gear-inner'
                    },
                    directives: [],
                    events: {}
                  }
                ],
                props: {
                  class: 'gear one'
                },
                directives: [],
                events: {}
              },
              {
                id: 'cu5anbxvu',
                name: 'div',
                from: '',
                invisible: false,
                locked: false,
                children: [
                  {
                    id: 'cv5anbxvu',
                    name: 'div',
                    from: '',
                    invisible: false,
                    locked: false,
                    children: [
                      {
                        id: 'cw5anbxvu',
                        name: 'div',
                        from: '',
                        invisible: false,
                        locked: false,
                        children: [],
                        props: {
                          class: 'bar'
                        },
                        directives: [],
                        events: {}
                      },
                      {
                        id: 'cx5anbxvu',
                        name: 'div',
                        from: '',
                        invisible: false,
                        locked: false,
                        children: [],
                        props: {
                          class: 'bar'
                        },
                        directives: [],
                        events: {}
                      },
                      {
                        id: 'cy5anbxvu',
                        name: 'div',
                        from: '',
                        invisible: false,
                        locked: false,
                        children: [],
                        props: {
                          class: 'bar'
                        },
                        directives: [],
                        events: {}
                      }
                    ],
                    props: {
                      class: 'gear-inner'
                    },
                    directives: [],
                    events: {}
                  }
                ],
                props: {
                  class: 'gear two'
                },
                directives: [],
                events: {}
              },
              {
                id: 'cz5anbxvu',
                name: 'div',
                from: '',
                invisible: false,
                locked: false,
                children: [
                  {
                    id: 'd05anbxvu',
                    name: 'div',
                    from: '',
                    invisible: false,
                    locked: false,
                    children: [
                      {
                        id: 'd15anbxvu',
                        name: 'div',
                        from: '',
                        invisible: false,
                        locked: false,
                        children: [],
                        props: {
                          class: 'bar'
                        },
                        directives: [],
                        events: {}
                      },
                      {
                        id: 'd25anbxvu',
                        name: 'div',
                        from: '',
                        invisible: false,
                        locked: false,
                        children: [],
                        props: {
                          class: 'bar'
                        },
                        directives: [],
                        events: {}
                      },
                      {
                        id: 'd35anbxvu',
                        name: 'div',
                        from: '',
                        invisible: false,
                        locked: false,
                        children: [],
                        props: {
                          class: 'bar'
                        },
                        directives: [],
                        events: {}
                      }
                    ],
                    props: {
                      class: 'gear-inner'
                    },
                    directives: [],
                    events: {}
                  }
                ],
                props: {
                  class: 'gear three'
                },
                directives: [],
                events: {}
              },
              {
                id: 'd45anbxvu',
                name: 'div',
                from: '',
                invisible: false,
                locked: false,
                children: [
                  {
                    id: 'd55anbxvu',
                    name: 'div',
                    from: '',
                    invisible: false,
                    locked: false,
                    children: [
                      {
                        id: 'd65anbxvu',
                        name: 'div',
                        from: '',
                        invisible: false,
                        locked: false,
                        children: [],
                        props: {
                          class: 'bar'
                        },
                        directives: [],
                        events: {}
                      },
                      {
                        id: 'd75anbxvu',
                        name: 'div',
                        from: '',
                        invisible: false,
                        locked: false,
                        children: [],
                        props: {
                          class: 'bar'
                        },
                        directives: [],
                        events: {}
                      },
                      {
                        id: 'd85anbxvu',
                        name: 'div',
                        from: '',
                        invisible: false,
                        locked: false,
                        children: [],
                        props: {
                          class: 'bar'
                        },
                        directives: [],
                        events: {}
                      },
                      {
                        id: 'd95anbxvu',
                        name: 'div',
                        from: '',
                        invisible: false,
                        locked: false,
                        children: [],
                        props: {
                          class: 'bar'
                        },
                        directives: [],
                        events: {}
                      },
                      {
                        id: 'da5anbxvu',
                        name: 'div',
                        from: '',
                        invisible: false,
                        locked: false,
                        children: [],
                        props: {
                          class: 'bar'
                        },
                        directives: [],
                        events: {}
                      },
                      {
                        id: 'db5anbxvu',
                        name: 'div',
                        from: '',
                        invisible: false,
                        locked: false,
                        children: [],
                        props: {
                          class: 'bar'
                        },
                        directives: [],
                        events: {}
                      }
                    ],
                    props: {
                      class: 'gear-inner'
                    },
                    directives: [],
                    events: {}
                  }
                ],
                props: {
                  class: 'gear four large'
                },
                directives: [],
                events: {}
              }
            ],
            props: {
              class: 'gearbox'
            },
            directives: [],
            events: {}
          }
        ],
        props: {
          style: {
            height: '100%',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center'
          }
        },
        directives: [],
        events: {}
      }
    ]
  });

  const { renderer } = createRenderer({ dsl, components: { XAction } });

  console.log(renderer);

  setTimeout(() => {
    // dsl.nodes[0].children.value = '"abc"';
  }, 1000);
</script>
