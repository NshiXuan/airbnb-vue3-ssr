<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="banner"></div>

    <!-- 房屋列表 -->
    <div class="main-wrapper">
      <h2 class="title">主标题</h2>
      <p class="sub-title">副标题</p>
      <div class="home-list">
        <div class="item" @click="clickItem(item)" v-for="(item, index) in store.state.roomList" :key="index">
          <img :src="item.pictureUrl" alt="">
          <p class="title">{{ item.title }}</p>
          <p class="price">￥{{ item.price }}元</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const store = useStore()

    function clickItem(item: any) {
      console.log(item)
    }

    return { store, clickItem }
  },
  asyncData({ store, route }: any) {
    return store.dispatch('getRoomList')
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/home/index.scss";
</style>
