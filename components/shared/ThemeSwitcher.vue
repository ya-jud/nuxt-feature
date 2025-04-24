<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const theme = ref(false) // false = light, true = dark
const themeName = ref<'light' | 'dark'>('light')

// Загрузка темы при монтировании (client-side)
onMounted(() => {
  const saved = localStorage.getItem('theme') as 'light' | 'dark' | null

  if (saved === 'light' || saved === 'dark') {
    themeName.value = saved
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    themeName.value = prefersDark ? 'dark' : 'light'
  }

  theme.value = themeName.value === 'dark'
  updateDOM()
})

// Слежение за переключателем
watch(theme, (isDark) => {
  themeName.value = isDark ? 'dark' : 'light'
  localStorage.setItem('theme', themeName.value)
  updateDOM()
})

function updateDOM() {
  document.documentElement.setAttribute('data-theme', themeName.value)
}
</script>

<template>
  <USwitch v-model="theme" />
</template>