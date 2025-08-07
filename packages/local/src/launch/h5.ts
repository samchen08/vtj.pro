export const h5PageJson: any = {
  name: 'LaunchPage',
  locked: false,
  inject: [],
  state: {},
  lifeCycles: {},
  methods: {
    enterApp: {
      type: 'JSFunction',
      value: "() => {\n  this.$libs.vant.showToast({ message: 'click' })\n}"
    }
  },
  computed: {},
  watch: [],
  css: '.launch-page {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  text-align: center;\n  padding: 0 20px;\n}\n.logo-container {\n  margin-bottom: 30px;\n}\n.logo {\n  width: 150px;\n  height: 150px;\n  border-radius: 30px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n}\n.app-name {\n  font-size: 28px;\n  font-weight: bold;\n  margin-bottom: 10px;\n}\n.app-slogan {\n  font-size: 16px;\n  margin-bottom: 40px;\n  opacity: 0.8;\n}\n.enter-btn {\n  width: 200px;\n  height: 50px;\n  font-size: 16px;\n  font-weight: bold;\n}',
  props: [],
  emits: [],
  slots: [],
  dataSources: {},
  __VTJ_BLOCK__: true,
  __VERSION__: '1754534257948',
  id: '18o4l37b',
  nodes: [
    {
      id: '18o4mfc2',
      name: 'div',
      from: '',
      invisible: false,
      locked: false,
      children: [
        {
          id: '28o4mfc2',
          name: 'div',
          from: '',
          invisible: false,
          locked: false,
          children: [
            {
              id: '38o4mfc3',
              name: 'img',
              from: '',
              invisible: false,
              locked: false,
              children: [],
              props: {
                src: 'https://picsum.photos/150/150?random=1',
                alt: 'App Logo',
                class: 'logo'
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
          id: '48o4mfc3',
          name: 'h1',
          from: '',
          invisible: false,
          locked: false,
          children: '欢迎使用',
          props: {
            class: 'app-name'
          },
          directives: [],
          events: {}
        },
        {
          id: '58o4mfc3',
          name: 'p',
          from: '',
          invisible: false,
          locked: false,
          children: '开启您的全新体验',
          props: {
            class: 'app-slogan'
          },
          directives: [],
          events: {}
        },
        {
          id: '68o4mfc3',
          name: 'VanButton',
          from: '',
          invisible: false,
          locked: false,
          children: ' 立即体验 ',
          props: {
            type: 'primary',
            round: '',
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
