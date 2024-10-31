import type { Component, Plugin } from 'vue';

const layoutContext = import.meta.webpackContext('./layouts', {
  mode: 'lazy',
  recursive: false,
  regExp: /(Layout|-layout)\.vue$/,
});
const layoutComponents: Record<string, Component> = {};

for (const path of layoutContext.keys()) {
  const matchPath = path.match(/\/([^.]+)\.vue$/);
  if (matchPath?.[1]) {
    layoutComponents[matchPath[1]] = defineAsyncComponent(() =>
      layoutContext(path),
    );
  }
}

export const isLayoutComponent = (name: string) => !!layoutComponents[name];

const plugin: Plugin = {
  install(app) {
    for (const name in layoutComponents) {
      app.component(name, layoutComponents[name]);
    }
  },
};

export default plugin;
