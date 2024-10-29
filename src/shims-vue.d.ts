declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // biome-ignore lint/complexity/noBannedTypes lint/suspicious/noExplicitAny: .vue 文件 TS 支持
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
