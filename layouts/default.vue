<script setup>
import DefaultHeader from "~/components/navigation/DefaultHeader.vue";

const baseNavigation = [
  {
    label: 'Home',
    to: '/',
    icon: 'jam:home',
  },
  {
    label: 'About',
    to: '/about',
    icon: 'jam:help',
  },
  {
    label: 'Contact',
    to: '/contact',
    icon: 'jam:phone',
  },
]
</script>

<template>
  <div class="default">
    <DefaultHeader :data="baseNavigation"/>

    <div class="default__grid">
      <slot />
    </div>
  </div>
</template>

<style>
.default {
  .default__grid {
    height: 2000px;
    margin: 20px;
  }
}
</style>