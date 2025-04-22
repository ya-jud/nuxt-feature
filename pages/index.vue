<script setup lang="ts">
const { data: content } = await useAsyncData(() => queryCollection('content').all())
const selectedContent = ref<any>(null)

console.log(content)

// Функция для выбора файла
const selectContent = (item: any) => {
  selectedContent.value = item
}

useSeoMeta({
  title: 'Главная страница',
  description: 'Список доступного контента'
})
</script>

<template>
  <div>
    <h1>Список контента</h1>
    <ul>
      <li style="margin-bottom: 5px" v-for="item in content" :key="item.path">
        <button v-if="item.type === 'folder'" @click="selectContent(item)">
          📁 {{ item.title || item.path }}
        </button>
        <button v-else @click="selectContent(item)">
          📄 {{ item.title || item.path }}
        </button>
      </li>
    </ul>

    <div v-if="selectedContent" class="content-item">
      <h2>{{ selectedContent.title || selectedContent.path }}</h2>
      <ContentRenderer v-if="selectedContent.body" :value="selectedContent.body" />
      <ul v-else>
        <li v-for="subItem in queryCollectionNavigation(selectedContent.path)" :key="subItem.path">
          <button @click="selectContent(subItem)">
            {{ subItem.title || subItem.path }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
