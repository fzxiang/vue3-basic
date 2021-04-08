import { reactive, toRefs, onMounted, onUnmounted } from 'vue'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useMousePosition () {
  const data = reactive({
    clientX: 0,
    clientY: 0
  })
  const mouseClick = (e: MouseEvent) => {
    data.clientX = e.clientX
    data.clientY = e.clientY
  }
  onMounted(() => {
    document.addEventListener('click', mouseClick)
  })
  onUnmounted(() => {
    document.removeEventListener('click', mouseClick)
  })
  return {
    ...toRefs(data)
  }
}
