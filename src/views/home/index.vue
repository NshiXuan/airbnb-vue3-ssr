<template>
  <div class="home">
    <!-- <h2>{{ t('message.home') }}</h2> -->
    <div class="text">哈哈哈哈哈哈哈</div>
    <el-date-picker type="date" placeholder="Pick a day" />
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'
// import { fetchRoomList } from '../../api'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { proxy }: any = getCurrentInstance()
proxy.$message({
  type: 'error',
  message: '消息提示'
})

// fetchRoomList().then(res => {
//   console.log(res)
// })

</script>

<style lang="scss" scoped>
@import "@/assets/scss/home/index.scss";
</style>
