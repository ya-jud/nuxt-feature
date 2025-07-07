<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { onMounted, ref } from 'vue';
import ThemeSwitcher from "~/components/shared/ThemeSwitcher.vue";
import { useScreen } from '~/composables/useScreen';

const { isMobile } = useScreen()

const props = withDefaults(defineProps<{
  data?: NavigationMenuItem[]
}>(), {
  data: () => []
});

const isShowMenu = ref<boolean>(false)

// Для скелетона
const isHeaderReady = ref(false)
onMounted(() => {
  isHeaderReady.value = true
})

// Плавная анимация: height > opacity
function menuBeforeEnter(el: Element) {
  (el as HTMLElement).style.height = '0';
  (el as HTMLElement).style.opacity = '0';
  (el as HTMLElement).style.overflow = 'hidden';
}
function menuEnter(el: Element, done: () => void) {
  const height = (el as HTMLElement).scrollHeight;
  (el as HTMLElement).style.transition = 'height 250ms cubic-bezier(.25,.8,.25,1)';
  (el as HTMLElement).style.height = height + 'px';
  // ждем окончания height, потом плавно показываем opacity
  setTimeout(() => {
    (el as HTMLElement).style.transition = 'opacity 200ms';
    (el as HTMLElement).style.opacity = '1';
    setTimeout(done, 200);
  }, 250);
}
function menuAfterEnter(el: Element) {
  (el as HTMLElement).style.height = '';
  (el as HTMLElement).style.opacity = '';
  (el as HTMLElement).style.transition = '';
  (el as HTMLElement).style.overflow = '';
}
function menuBeforeLeave(el: Element) {
  (el as HTMLElement).style.height = (el as HTMLElement).scrollHeight + 'px';
  (el as HTMLElement).style.opacity = '1';
  (el as HTMLElement).style.overflow = 'hidden';
  (el as HTMLElement).style.transition = '';
}
function menuLeave(el: Element, done: () => void) {
  (el as HTMLElement).style.transition = 'opacity 150ms';
  (el as HTMLElement).style.opacity = '0';
  setTimeout(() => {
    (el as HTMLElement).style.transition = 'height 200ms cubic-bezier(.25,.8,.25,1)';
    (el as HTMLElement).style.height = '0';
    setTimeout(done, 200);
  }, 150);
}
function menuAfterLeave(el: Element) {
  (el as HTMLElement).style.height = '';
  (el as HTMLElement).style.opacity = '';
  (el as HTMLElement).style.transition = '';
  (el as HTMLElement).style.overflow = '';
}
</script>

<template>
  <div class="default-header">
    <div v-if="!isHeaderReady">
      <header class="default-header animate-pulse">
        <div class="default-header__container flex items-center pl-5 pr-5 h-12">
          <div class="rounded-full bg-gray-200 h-8 w-8 mr-4" />
          <div class="flex-1 h-8 bg-gray-200 rounded mx-4" />
          <div class="rounded-full bg-gray-200 h-8 w-8 ml-4" />
        </div>
      </header>
    </div>
    <ClientOnly>
      <header v-if="isHeaderReady" class="default-header">
        <div
          v-if="!isMobile"
          class="default-header__container flex items-center pl-5 pr-5"
        >
          <ThemeSwitcher />

          <UNavigationMenu
            class="default-header__navigation w-full justify-center"
            orientation="horizontal"
            :items="props.data"
          />

          <UAvatar
              class="h-auto"
              src="https://avatars.githubusercontent.com/u/101886905?v=4"
          />
        </div>

        <div
          v-else
          class="default-header__container"
        >
          <div class="flex justify-between items-center p-2 h-20">
            <UAvatar
              class="h-auto w-15"
              src="https://avatars.githubusercontent.com/u/101886905?v=4"
            />

            <div class="flex items-center gap-2">
              <ThemeSwitcher size="xl" />

              <UButton
                  color="secondary"
                  variant="ghost"
                  @click="isShowMenu = !isShowMenu"
              >
                <template #leading>
                  <UIcon name="jam:align-justify" size="40" />
                </template>
              </UButton>
            </div>
          </div>

          <transition
            @before-enter="menuBeforeEnter"
            @enter="menuEnter"
            @after-enter="menuAfterEnter"
            @before-leave="menuBeforeLeave"
            @leave="menuLeave"
            @after-leave="menuAfterLeave"
          >
            <div v-show="isShowMenu">
              <UNavigationMenu
                  class="default-header__navigation w-full justify-center"
                  orientation="vertical"
                  :items="props.data"
                  :ui="{
                content: 'h-200'
              }"
              >
                <template #item="{ item }">
                  <UButton
                      variant="ghost"
                      size="xl"
                      color="neutral"
                  >
                    {{ item.label }}
                  </UButton>
                </template>
              </UNavigationMenu>
            </div>
          </transition>
        </div>
      </header>
    </ClientOnly>
  </div>
</template>

<style>
.default-header {
  position: sticky;
  top: 20px;

  .default-header__container {
    width: calc(100% - 40px);
    margin: 20px;
    background-color: rgba(189, 189, 189, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
  }

  .default-header__navigation {
    > li > a {
      background-color: var(--color-neutral-200);
    }
  }

  @media screen and (max-width: 768px) {
    .default-header__container {
      position: fixed;
      top: unset;
      bottom: 20px;
      width: calc(100vw - 40px);
    }
  }
}

.menu-transition {
  transition: height 200ms cubic-bezier(.25,.8,.25,1), opacity 150ms;
  opacity: 0;
  height: 0;
  overflow: hidden;
}
.menu-visible {
  opacity: 1;
}

.menu-anim {
  overflow: hidden;
}
</style>