import { ref, onMounted, onUnmounted } from 'vue'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useMousePosition () {
  const clientX = ref(0)
  const clientY = ref(0)
  const mouseClick = (e: MouseEvent) => {
    clientX.value = e.clientX
    clientY.value = e.clientY
  }
  onMounted(() => {
    document.addEventListener('click', mouseClick)
  })
  onUnmounted(() => {
    document.removeEventListener('click', mouseClick)
  })
  return {
    clientX,
    clientY
  }
}
