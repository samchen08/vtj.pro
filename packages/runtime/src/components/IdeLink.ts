import { defineComponent, h, ref } from 'vue';
import { useDraggable } from '@vueuse/core';
import { EditPen } from '@element-plus/icons-vue';
const CSS_TEXT = `
.vtj-ide-link {
    position: absolute;
    z-index: 99999;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    color: #409eff;
    font-size: 18px;
    font-weight: bold;
    border: 1px solid #eeeff1;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    &:hover {
      opacity: 0.6;
    }
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }
  .vtj-ide-link span {
    width:30px;
    height:50px;
    display:block;
    text-align: center;
    margin:auto;
    padding-top:7px;
  }
`;

export const IDELink = defineComponent({
  name: 'VtjIdeLink',
  props: {
    path: {
      type: String,
      default: '/ide/'
    },
    text: {
      type: String,
      default: 'IDE'
    }
  },
  data() {
    return {
      el: null as HTMLStyleElement | null,
      dragging: false
    };
  },
  setup() {
    const divRef = ref();
    const dragging = ref(false);
    const { innerWidth, innerHeight } = window;
    const { style } = useDraggable(divRef, {
      capture: false,
      initialValue: { x: innerWidth - 100, y: innerHeight - 100 },
      onMove() {
        dragging.value = true;
      },
      onEnd() {
        setTimeout(() => {
          dragging.value = false;
        }, 20);
      }
    });
    return {
      divRef,
      style,
      dragging
    };
  },
  render() {
    return h(
      'div',
      {
        ref: 'divRef',
        class: 'vtj-ide-link',
        style: this.style,
        onClick: this.onClick
      },
      [h('span', h(EditPen))]
    );
  },
  methods: {
    onClick(e: MouseEvent) {
      e.stopPropagation();
      if (this.dragging) return;
      const url = this.path + '#/?startup';
      location.href = url;
    }
  },
  created() {
    this.el = document.createElement('style');
    this.el.innerText = CSS_TEXT;
    document.head.appendChild(this.el);
  },
  mounted() {},
  beforeUnmount() {
    if (this.el) {
      this.el.parentNode?.removeChild(this.el);
      this.el = null;
    }
  }
});
