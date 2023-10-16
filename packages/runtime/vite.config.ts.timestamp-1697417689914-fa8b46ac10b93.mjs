// vite.config.ts
import { createViteConfig } from "file:///D:/vtj/vtj/packages/cli/lib/index.mjs";
import { resolve } from "path";
var vite_config_default = createViteConfig({
  debug: false,
  lib: true,
  cdn: false,
  elementPlus: false,
  libraryName: "VtjRuntime",
  external: [
    "$vtj",
    "vue",
    "vue-router",
    "prettier",
    "prettier/parser-html",
    "prettier/parser-babel",
    "prettier/parser-postcss",
    "@vtj/ui",
    "@vtj/icons",
    "@vtj/utils",
    "element-plus",
    "element-plus/lib/locale/lang/zh-CN",
    "@element-plus/icons-vue",
    "mitt",
    "zen-logger",
    "@vueuse/core",
    "monaco-editor",
    "monaco-editor/esm/vs/editor/editor.worker?worker",
    "monaco-editor/esm/vs/language/json/json.worker?worker",
    "monaco-editor/esm/vs/language/css/css.worker?worker",
    "monaco-editor/esm/vs/language/html/html.worker?worker",
    "monaco-editor/esm/vs/language/typescript/ts.worker?worker",
    "jsoneditor"
  ],
  alias: {
    $vtj: resolve("src/.vtj.ts")
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2dGpcXFxcdnRqXFxcXHBhY2thZ2VzXFxcXHJ1bnRpbWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHZ0alxcXFx2dGpcXFxccGFja2FnZXNcXFxccnVudGltZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdnRqL3Z0ai9wYWNrYWdlcy9ydW50aW1lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgY3JlYXRlVml0ZUNvbmZpZyB9IGZyb20gJ0B2dGovY2xpJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVZpdGVDb25maWcoe1xuICBkZWJ1ZzogZmFsc2UsXG4gIGxpYjogdHJ1ZSxcbiAgY2RuOiBmYWxzZSxcbiAgZWxlbWVudFBsdXM6IGZhbHNlLFxuICBsaWJyYXJ5TmFtZTogJ1Z0alJ1bnRpbWUnLFxuICBleHRlcm5hbDogW1xuICAgICckdnRqJyxcbiAgICAndnVlJyxcbiAgICAndnVlLXJvdXRlcicsXG4gICAgJ3ByZXR0aWVyJyxcbiAgICAncHJldHRpZXIvcGFyc2VyLWh0bWwnLFxuICAgICdwcmV0dGllci9wYXJzZXItYmFiZWwnLFxuICAgICdwcmV0dGllci9wYXJzZXItcG9zdGNzcycsXG4gICAgJ0B2dGovdWknLFxuICAgICdAdnRqL2ljb25zJyxcbiAgICAnQHZ0ai91dGlscycsXG4gICAgJ2VsZW1lbnQtcGx1cycsXG4gICAgJ2VsZW1lbnQtcGx1cy9saWIvbG9jYWxlL2xhbmcvemgtQ04nLFxuICAgICdAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZScsXG4gICAgJ21pdHQnLFxuICAgICd6ZW4tbG9nZ2VyJyxcbiAgICAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAnbW9uYWNvLWVkaXRvcicsXG4gICAgJ21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9lZGl0b3Iud29ya2VyP3dvcmtlcicsXG4gICAgJ21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2pzb24vanNvbi53b3JrZXI/d29ya2VyJyxcbiAgICAnbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvY3NzL2Nzcy53b3JrZXI/d29ya2VyJyxcbiAgICAnbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvaHRtbC9odG1sLndvcmtlcj93b3JrZXInLFxuICAgICdtb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS90eXBlc2NyaXB0L3RzLndvcmtlcj93b3JrZXInLFxuICAgICdqc29uZWRpdG9yJ1xuICBdLFxuICBhbGlhczoge1xuICAgICR2dGo6IHJlc29sdmUoJ3NyYy8udnRqLnRzJylcbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZRLFNBQVMsd0JBQXdCO0FBQzlTLFNBQVMsZUFBZTtBQUN4QixJQUFPLHNCQUFRLGlCQUFpQjtBQUFBLEVBQzlCLE9BQU87QUFBQSxFQUNQLEtBQUs7QUFBQSxFQUNMLEtBQUs7QUFBQSxFQUNMLGFBQWE7QUFBQSxFQUNiLGFBQWE7QUFBQSxFQUNiLFVBQVU7QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLE1BQU0sUUFBUSxhQUFhO0FBQUEsRUFDN0I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
