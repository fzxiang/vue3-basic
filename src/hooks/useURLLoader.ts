import { ref, reactive, toRefs } from 'vue'
import Axios from 'axios'

function useURLLoader<T> (url: string) {
  const result = ref<T | null>(null)
  const res = reactive({
    loading: true,
    loaded: false,
    error: null
  })
  Axios.get(url).then((response) => {
    res.loading = false
    res.loaded = true
    result.value = response.data
  }).catch(e => {
    res.error = e
    res.loading = false
  })
  return {
    result,
    ...toRefs(res)
  }
}

export default useURLLoader
