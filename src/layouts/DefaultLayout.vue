<template>
  <div class="flex flex-col min-h-100vh bg-slate-50 text-gray-900 dark:bg-slate-600 dark:text-gray-200">
    <header class="h-13 border-b bg-white dark:text-white dark:border-gray-500 dark:bg-slate-700">
      <nav class="px-3 mx-auto w-full sm:w-3xl md:w-5xl lg:w-7xl xxl:w-9xl sm:flex sm:justify-between">
        <router-link to="/" class="flex items-center justify-center h-13 w-full sm:w-auto">
          LOGO
        </router-link>
      </nav>
    </header>
    <div class="flex-auto">
      <div class="px-3 mx-auto w-full sm:w-3xl md:w-5xl lg:w-7xl xxl:w-9xl">
        <slot />
      </div>
    </div>
    <footer class="h-13 text-center bg-gray-400 text-white dark:bg-gray-700">
      <div class="px-3 mx-auto w-full sm:w-3xl md:w-5xl lg:w-7xl xxl:w-9xl">
        <span class="leading-13">
          Footer
        </span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">

</script>
