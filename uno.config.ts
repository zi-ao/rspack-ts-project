import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  content: {
    filesystem: ['**/*.{html,js,ts,jsx,tsx,vue}'],
  },
  presets: [presetUno()],
  shortcuts: {},
  rules: [
    ['w-8xl', { width: '90rem' }],
    ['w-9xl', { width: '100rem' }],
  ],
  theme: {
    breakpoints: {
      xs: '640px',
      sm: '768px',
      md: '1024px',
      lg: '1280px',
      xl: '1536px',
      xxl: '1920px',
    },
  },
});
