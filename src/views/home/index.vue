<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="banner"></div>

    <!-- 房屋列表 -->
    <div class="main-wrapper">
      <h2 class="title">主标题</h2>
      <p class="sub-title">副标题</p>
      <!-- 首页列表 -->
      <HomeList />
    </div>

  </div>
</template>

<script lang="ts">
import { IRoomListParams } from '@/api/interface'
import { defineComponent } from 'vue'
import HomeList from './componets/homeList.vue'

// import

export default defineComponent({
  components: {
    HomeList
  },
  setup() {
  },
  asyncData({ store, route }: any) {
    const { pageNo } = store.state
    return store.dispatch('getRoomList', { pageNo } as IRoomListParams)
  }
})
</script>

<style lang="scss" >
@import "@/assets/scss/home/index.scss";
</style>
