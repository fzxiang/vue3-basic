<template>
  <div class="about">
    <h1>{{ count }}</h1>
    <button @click="increase">This is +1</button>
    <h1>{{ greetings }}</h1>
    <modal-button content="文本主体内容" @submit="onSubmit">
      <template v-slot:header>
        <h2>header</h2>
        <h2>这个是modal</h2>
      </template>
      <template v-slot:footer>
        <h2>footer</h2>
        <h2>这个是modal</h2>
      </template>
    </modal-button>
    <h1 v-if="loading">加载中。。。</h1>
    <div v-if="loaded"><img :src="result.message" /></div>
    <Suspense>
      <template #default> <dog-async /></template>
      <template #fallback>
        <div>正在加载中。。。</div>
      </template>
    </Suspense>
    <h1>鼠标点击坐标： X:{{ clientX }}, Y:{{ clientY }}</h1>
    <button @click="updateGeetings">标题更新</button>
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs, watch, defineComponent } from 'vue'
import { useMousePosition } from '@/hooks/useMousePosition'
import useURLLoader from '@/hooks/useURLLoader'
import ModalButton from '@/components/ModalButton.vue'
import DogAsync from '@/components/DogAsync.vue'

interface resultProps {
  message: string;
  status: string;
}

interface DataProps {
  count: number;
  increase: () => void;
}

export default defineComponent({
  name: 'About',
  components: {
    ModalButton,
    DogAsync
  },
  setup (props, context) {
    const data: DataProps = reactive({
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
    const { loading, result, loaded } = useURLLoader<resultProps>(
      'https://dog.ceo/api/breeds/image/random'
    )
    const { clientX, clientY } = useMousePosition()
    watch([greetings, () => data.count, result], (newVal) => {
      document.title = newVal[0]
    })
    const onSubmit = (data: any) => {
      console.log('触发了父级', data)
    }
    return {
      ...toRefs(data),
      greetings,
      updateGeetings,
      clientX,
      clientY,
      loading,
      loaded,
      result,
      onSubmit
    }
  }
})
</script>
