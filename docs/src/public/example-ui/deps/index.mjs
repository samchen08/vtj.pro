import { defineComponent as s, openBlock as a, createElementBlock as c, toDisplayString as r } from "vue";
const _ = { class: "v-example" }, l = /* @__PURE__ */ s({
  __name: "Example",
  props: {
    title: {}
  },
  setup(e) {
    return (t, o) => (a(), c("div", _, "Example: " + r(t.title), 1));
  }
}), m = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [p, n] of t)
    o[p] = n;
  return o;
}, x = /* @__PURE__ */ m(l, [["__scopeId", "data-v-9519d24b"]]);
export {
  x as VExample
};
