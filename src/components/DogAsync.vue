<template>
  <img src="result.message" alt="" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Axios from 'axios'
export default defineComponent({
  name: 'DogAsync',
  async setup (props) {
    const res = await Axios.get('https://dog.ceo/api/breeds/image/random')
    return { result: res.data }
  }
})
</script>
