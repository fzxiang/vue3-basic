<template>
  <div class="about">
    <h1>{{ count }}</h1>
    <button @click="increase">This is +1 </button>
    <h1> {{ greetings }}</h1>
    <h1 v-if="loading">加载中。。。</h1>
    <div v-if="loaded"><img :src="result.message"></div>
    <h1>鼠标点击坐标： X:{{clientX}}, Y:{{clientY}}</h1>
    <button @click="updateGeetings">标题更新 </button>
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs, watch } from 'vue'
import { useMousePosition } from '@/hooks/useMousePosition'
import useURLLoader from '@/hooks/useURLLoader'

interface resultProps {
  message: string,
  status: string
}
interface DataProps {
  count: number,
  increase: () => void
}

export default {
  name: 'About',
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup () {
    const data:DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++
      }
    })
    const greetings = ref('这个默认标题')
    const updateGeetings = () => {
      data.count++
      greetings.value = '标题更改' + data.count
    }
    const { loading, result, loaded } = useURLLoader<resultProps>('https://dog.ceo/api/breeds/image/random')
    watch([greetings, () => data.count], (newVal) => {
      document.title = newVal[0]
    })
    const { clientX, clientY } = useMousePosition()
    return {
      ...toRefs(data),
      greetings,
      updateGeetings,
      clientX,
      clientY,
      loading,
      loaded,
      result
    }
  }
}
</script>
