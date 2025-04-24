<script setup lang="ts">
import { ref, onMounted } from 'vue';

const themeName = ref<'light' | 'dark'>('light');

onMounted(() => {
  const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
  themeName.value = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
});
</script>

<template>
  <NuxtLayout :data-theme="themeName">
    <NuxtPage />
  </NuxtLayout>
</template>
