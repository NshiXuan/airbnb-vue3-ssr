<template>
  <!-- 城市筛选 -->
  <HomeTabs />

  <div class="home-list">
    <div class="item" @click="clickItem(item)" v-for="(item, index) in store.state.roomList" :key="index">
      <img :src="item.pictureUrl" alt="">
      <p class="title">{{ item.title }}</p>
      <p class="price">￥{{ item.price }}元</p>
    </div>
  </div>

  <!-- 分页 -->
  <pagination @changePage="changePage" />
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import pagination from '@/components/common/pagination.vue'
import HomeTabs from './homeTabs.vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

function clickItem(item: any) {
  router.push(`/roomDetail/${item.id}`)
  store.commit('setRoomID', item.id)
  console.log(item)
}

function changePage(pageNo: number) {
  console.log(pageNo)
  store.dispatch('getRoomList', { pageNo })
}
</script>

<style lang="scss" scoped>

</style>
