<script setup lang="ts">
const { data: content } = await useAsyncData(() => queryCollection('content').all())

console.log(content)

useSeoMeta({
  title: 'Главная страница',
  description: 'Список доступного контента'
})
</script>

<template>
  <div>
    <h1>Список контента</h1>
    <ul>
      <li v-for="item in content" :key="item.path">
        <NuxtLink :to="item.path">{{ item.title || item.path }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
