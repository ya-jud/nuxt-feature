import { ref, computed, onMounted, onUnmounted } from 'vue'
export function useScreen() {
	// Начальное значение берем из payload, если есть, иначе 0
	const initialWidth: number = ((import.meta.client ? 0 : (useNuxtApp().payload.screenInitWidth || 0)) as number)
	const width = ref<number>(initialWidth)

	function updateWidth() {
		width.value = window.innerWidth
	}

	onMounted(() => {
		updateWidth()
		window.addEventListener('resize', updateWidth)
	})
	onUnmounted(() => {
		window.removeEventListener('resize', updateWidth)
	})

	const isMobile = computed(() => width.value > 0 && width.value < 768)
	const isTablet = computed(() => width.value >= 768 && width.value < 1024)
	const isDesktop = computed(() => width.value >= 1024)

	return {
		width,
		isMobile,
		isTablet,
		isDesktop
	}
}