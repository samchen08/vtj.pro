export const uniappPageJson: any = {
  name: 'LaunchPage',
  locked: false,
  inject: [],
  state: {
    countDown: {
      type: 'JSExpression',
      value: '3'
    }
  },
  lifeCycles: {},
  methods: {
    enterApp: {
      type: 'JSFunction',
      value:
        "() => {\n  this.$libs.UniH5.uni.showToast({ title: 'clicked!' })\n}"
    }
  },
  computed: {},
  watch: [],
  css: '.launch-page {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  background: linear-gradient(135deg, #6e8efb, #a777e3);\n}\n\n.logo-container {\n  margin-bottom: 40px;\n}\n\n.logo {\n  width: 150px;\n  height: 150px;\n  border-radius: 30px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n}\n\n.app-name {\n  font-size: 28px;\n  color: white;\n  font-weight: bold;\n  margin-bottom: 60px;\n  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);\n}\n\n.enter-btn {\n  padding: 12px 40px;\n  background-color: white;\n  color: #6e8efb;\n  border-radius: 25px;\n  font-weight: bold;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n}\n\n.enter-btn:active {\n  transform: scale(0.95);\n}',
  props: [],
  emits: [],
  slots: [],
  dataSources: {},
  __VTJ_BLOCK__: true,
  __VERSION__: '1754534945746',
  id: '18o4xz29',
  nodes: [
    {
      id: '18o4z7x6',
      name: 'View',
      from: '',
      invisible: false,
      locked: false,
      children: [
        {
          id: '28o4z7x6',
          name: 'View',
          from: '',
          invisible: false,
          locked: false,
          children: [
            {
              id: '38o4z7x6',
              name: 'Image',
              from: '',
              invisible: false,
              locked: false,
              children: [],
              props: {
                class: 'logo',
                src: 'https://picsum.photos/200/200?random=1',
                alt: 'App Logo'
              },
              directives: [],
              events: {}
            }
          ],
          props: {
            class: 'logo-container'
          },
          directives: [],
          events: {}
        },
        {
          id: '48o4z7x6',
          name: 'View',
          from: '',
          invisible: false,
          locked: false,
          children: '我的应用',
          props: {
            class: 'app-name'
          },
          directives: [],
          events: {}
        },
        {
          id: '58o4z7x6',
          name: 'View',
          from: '',
          invisible: false,
          locked: false,
          children: ' 立即体验 ',
          props: {
            class: 'enter-btn'
          },
          directives: [],
          events: {
            click: {
              name: 'click',
              handler: {
                type: 'JSFunction',
                value: 'this.enterApp'
              },
              modifiers: {}
            }
          }
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
