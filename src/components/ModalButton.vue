<template>
  <button @click="modalOpen">开启</button>
  <teleport to='#modal'>
    <div id="center" v-if="isOpen">
      <header>
        <slot name="header">header</slot>
      </header>
      {{ content }}
      <footer>
        <slot name="footer">footer</slot>
      </footer>
      <button @click="modalClose">关闭</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'ModalButton',
  props: {
    content: {
      type: String
    }
  },
  emits: {
    submit: (payload: any) => {
      console.log('子组件触发', payload)
      return true
    }
  },
  setup (props, context) {
    const isOpen = ref(false)
    const modalOpen = () => {
      isOpen.value = true
    }
    const modalClose = () => {
      isOpen.value = false
      context.emit('submit', 'submit')
    }
    return {
      isOpen,
      modalOpen,
      modalClose
    }
  }
})
</script>

<style lang="stylus" scoped>
#center
  position fixed
  left 50%
  top 50%
  transform translate(-50%, -50%)
  border 2px solid red
  background #fff
</style>
