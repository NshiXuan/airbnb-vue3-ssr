<template>
  <!-- <div class="mask" @click="maskClickHandler"></div> -->
  <ul>
    <li v-for="i in 6" :key="i">
      <img src="@/assets/img/layout/pinia.png" alt="">
      <div class="mess">
        <div class="title">北京四合院</div>
        <div class="info">234/晚 * 1个人</div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
// import { useStore } from '@/store'
import { ref } from 'vue'

// const store = useStore()
const count = ref(0)
function fetchApi() {
  return new Promise((resolve, reject) => {
    count.value = 6
    resolve(true)
  })
}
await fetchApi()

// function maskClickHandler() {
//   store.commit('setOrderVisible', false)
// }
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  width: 100%;
  background-color: transparent;
  z-index: 10;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}

ul {
  position: absolute;
  top: 80px;
  background-color: #fff;
  padding: 0px 10px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  right: 0px;
  max-height: 145px;
  overflow-y: auto;
  z-index: 15;
  width: 180px;
  border-radius: 5px;
}

ul::-webkit-scrollbar {
  // 滚动条的宽度
  width: 10px;
  height: 1px;
}

ul::-webkit-scrollbar-thumb {
  // 滚动条里的小方块
  border-radius: 10px;
  background: #E5E5E5;
}

ul::-webkit-scrollbar-track {
  // 滚动条轨道(背景颜色) 原本为白色可以不要
  border-radius: 10px;
  background: #fff;
}

li {
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 10px 0;

  &:last-child {
    border-bottom: none;
  }

  img {
    width: 65px;
    height: 45px;
    border-radius: 4px;
    margin-right: 5px;
    object-fit: cover;
  }

  .mess {
    flex: 1;
    margin-left: 5px;
    /* width: 100px;
    overflow: hidden; */
    height: 40px;

    div {
      line-height: 16px;
      font-weight: normal;
      margin: 5px 0;
      max-width: 100px;
    }

    .title {
      font-weight: bold;
      color: #333;
      font-size: 14px;
      @include line-text-overflow;
    }

    .info {
      color: #666;
      font-size: 12px;
    }
  }
}
</style>
