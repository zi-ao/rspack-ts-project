<template>
  <div class="min-h-100vh">
    <component :is="layoutName">
      <router-view />
    </component>
  </div>
</template>

<script setup lang="ts">
import { isLayoutComponent } from './import-layout-plugin';

const route = useRoute();
const layoutName = ref('DefaultLayout');

watch(
  () => route.path,
  () => {
    const name = route.meta.layout || 'DefaultLayout';
    if (name !== layoutName.value && isLayoutComponent(name)) {
      layoutName.value = name;
    }
  },
  { immediate: true },
);
</script>
