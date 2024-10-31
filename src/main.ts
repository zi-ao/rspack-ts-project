import { createApp } from 'vue';
import '@unocss/reset/tailwind.css';
import importLayoutPlugin from './import-layout-plugin';
import router from './router';
import './style.css';
import App from './App.vue';

createApp(App).use(router).use(importLayoutPlugin).mount('#app');
