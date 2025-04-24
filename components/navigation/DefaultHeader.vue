<script setup lang="ts">
import ThemeSwitcher from "~/components/shared/ThemeSwitcher.vue";
import { useScreen } from '~/composables/useScreen'

const { isMobile } = useScreen()

const props = defineProps({
  data: {
    default: () => [],
    type: Array,
  }
})

const isShowMenu = ref<boolean>(true)

// Плавная анимация: height > opacity
function menuBeforeEnter(el: HTMLElement) {
  el.style.height = '0';
  el.style.opacity = '0';
  el.style.overflow = 'hidden';
}
function menuEnter(el: HTMLElement, done: () => void) {
  const height = el.scrollHeight;
  el.style.transition = 'height 250ms cubic-bezier(.25,.8,.25,1)';
  el.style.height = height + 'px';
  // ждем окончания height, потом плавно показываем opacity
  setTimeout(() => {
    el.style.transition = 'opacity 200ms';
    el.style.opacity = '1';
    setTimeout(done, 200);
  }, 250);
}
function menuAfterEnter(el: HTMLElement) {
  el.style.height = '';
  el.style.opacity = '';
  el.style.transition = '';
  el.style.overflow = '';
}
function menuBeforeLeave(el: HTMLElement) {
  el.style.height = el.scrollHeight + 'px';
  el.style.opacity = '1';
  el.style.overflow = 'hidden';
  el.style.transition = '';
}
function menuLeave(el: HTMLElement, done: () => void) {
  el.style.transition = 'opacity 150ms';
  el.style.opacity = '0';
  setTimeout(() => {
    el.style.transition = 'height 200ms cubic-bezier(.25,.8,.25,1)';
    el.style.height = '0';
    setTimeout(done, 200);
  }, 150);
}
function menuAfterLeave(el: HTMLElement) {
  el.style.height = '';
  el.style.opacity = '';
  el.style.transition = '';
  el.style.overflow = '';
}
</script>

<template>
  <ClientOnly>
    <header class="default-header">
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
</template>

<style>
.default-header {
  position: sticky;
  top: 20px;

  .default-header__container {
    position: relative;
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
    position: fixed;
    top: unset;
    bottom: 20px;

    .default-header__container {
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