import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  content: {
    filesystem: ['**/*.{html,js,ts,jsx,tsx,vue}'],
  },
  presets: [presetUno()],
});
