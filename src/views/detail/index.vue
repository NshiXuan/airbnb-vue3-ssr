
<template>
  <Detail />
</template>

<script lang="ts">
import Detail from './components/detail.vue'
import { defineComponent } from 'vue'
import { IRoomDetailParams } from '@/api/interface'

export default defineComponent({
  components: {
    Detail
  },
  setup() {

  },
  asyncData({ store, route }: any) {
    console.log('详情页', store, route.value)
    const { roomID } = store.state
    const { id } = route.value.params
    return store.dispatch('getRoomDetail', { id: roomID || id } as IRoomDetailParams)
  }
})
</script>

<style lang="scss" scoped>

</style>
