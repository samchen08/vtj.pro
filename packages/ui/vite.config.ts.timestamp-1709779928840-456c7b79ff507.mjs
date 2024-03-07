// vite.config.ts
import { createViteConfig } from "file:///D:/vtj/vtj-next/vtj/packages/cli/dist/index.mjs";
var isUmd = !!process.env.UMD;
var vite_config_default = createViteConfig({
  lib: true,
  dts: isUmd ? false : true,
  entry: isUmd ? "src/install.ts" : "src/index.ts",
  version: true,
  library: "VtjUI",
  emptyOutDir: isUmd ? false : true,
  external: isUmd ? [
    "vue",
    "vue-router",
    "element-plus",
    "@element-plus/icons-vue",
    "@vtj/utils",
    "@vtj/icons",
    "echarts"
  ] : [
    "vue",
    "vue-router",
    "element-plus",
    "@element-plus/icons-vue",
    "@vueuse/core",
    "@vtj/utils",
    "@vtj/icons",
    "echarts"
  ],
  externalGlobals: isUmd ? {
    vue: "Vue",
    "vue-router": "VueRouter",
    "element-plus": "ElementPlus",
    "@element-plus/icons-vue": "VtjIcons",
    "@vtj/utils": "VtjUtils",
    "@vtj/icons": "VtjIcons",
    echarts: "echarts"
  } : void 0,
  formats: isUmd ? ["umd", "iife"] : ["es", "cjs"]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2dGpcXFxcdnRqLW5leHRcXFxcdnRqXFxcXHBhY2thZ2VzXFxcXHVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx2dGpcXFxcdnRqLW5leHRcXFxcdnRqXFxcXHBhY2thZ2VzXFxcXHVpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi92dGovdnRqLW5leHQvdnRqL3BhY2thZ2VzL3VpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgY3JlYXRlVml0ZUNvbmZpZyB9IGZyb20gJ0B2dGovY2xpJztcbmNvbnN0IGlzVW1kID0gISFwcm9jZXNzLmVudi5VTUQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVZpdGVDb25maWcoe1xuICBsaWI6IHRydWUsXG4gIGR0czogaXNVbWQgPyBmYWxzZSA6IHRydWUsXG4gIGVudHJ5OiBpc1VtZCA/ICdzcmMvaW5zdGFsbC50cycgOiAnc3JjL2luZGV4LnRzJyxcbiAgdmVyc2lvbjogdHJ1ZSxcbiAgbGlicmFyeTogJ1Z0alVJJyxcbiAgZW1wdHlPdXREaXI6IGlzVW1kID8gZmFsc2UgOiB0cnVlLFxuICBleHRlcm5hbDogaXNVbWRcbiAgICA/IFtcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cycsXG4gICAgICAgICdAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZScsIFxuICAgICAgICAnQHZ0ai91dGlscycsXG4gICAgICAgICdAdnRqL2ljb25zJyxcbiAgICAgICAgJ2VjaGFydHMnXG4gICAgICBdXG4gICAgOiBbXG4gICAgICAgICd2dWUnLFxuICAgICAgICAndnVlLXJvdXRlcicsXG4gICAgICAgICdlbGVtZW50LXBsdXMnLFxuICAgICAgICAnQGVsZW1lbnQtcGx1cy9pY29ucy12dWUnLFxuICAgICAgICAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAgICAgJ0B2dGovdXRpbHMnLFxuICAgICAgICAnQHZ0ai9pY29ucycsXG4gICAgICAgICdlY2hhcnRzJ1xuICAgICAgXSxcbiAgZXh0ZXJuYWxHbG9iYWxzOiBpc1VtZFxuICAgID8ge1xuICAgICAgICB2dWU6ICdWdWUnLFxuICAgICAgICAndnVlLXJvdXRlcic6ICdWdWVSb3V0ZXInLFxuICAgICAgICAnZWxlbWVudC1wbHVzJzogJ0VsZW1lbnRQbHVzJyxcbiAgICAgICAgJ0BlbGVtZW50LXBsdXMvaWNvbnMtdnVlJzogJ1Z0akljb25zJyxcbiAgICAgICAgJ0B2dGovdXRpbHMnOiAnVnRqVXRpbHMnLFxuICAgICAgICAnQHZ0ai9pY29ucyc6ICdWdGpJY29ucycsXG4gICAgICAgIGVjaGFydHM6ICdlY2hhcnRzJ1xuICAgICAgfVxuICAgIDogdW5kZWZpbmVkLFxuICBmb3JtYXRzOiBpc1VtZCA/IFsndW1kJywgJ2lpZmUnXSA6IFsnZXMnLCAnY2pzJ11cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUixTQUFTLHdCQUF3QjtBQUM1VCxJQUFNLFFBQVEsQ0FBQyxDQUFDLFFBQVEsSUFBSTtBQUU1QixJQUFPLHNCQUFRLGlCQUFpQjtBQUFBLEVBQzlCLEtBQUs7QUFBQSxFQUNMLEtBQUssUUFBUSxRQUFRO0FBQUEsRUFDckIsT0FBTyxRQUFRLG1CQUFtQjtBQUFBLEVBQ2xDLFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULGFBQWEsUUFBUSxRQUFRO0FBQUEsRUFDN0IsVUFBVSxRQUNOO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFDQTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0osaUJBQWlCLFFBQ2I7QUFBQSxJQUNFLEtBQUs7QUFBQSxJQUNMLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLDJCQUEyQjtBQUFBLElBQzNCLGNBQWM7QUFBQSxJQUNkLGNBQWM7QUFBQSxJQUNkLFNBQVM7QUFBQSxFQUNYLElBQ0E7QUFBQSxFQUNKLFNBQVMsUUFBUSxDQUFDLE9BQU8sTUFBTSxJQUFJLENBQUMsTUFBTSxLQUFLO0FBQ2pELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
