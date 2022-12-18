<template>
  <!-- 城市筛选 -->
  <el-tabs v-model="cityCode" @tab-click="cityClick" type="card">
    <el-tab-pane v-for="(item, index) in cities" :key="index" :label="t(item.name)" :name="item.code"></el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useStore()
const cityCode = ref(store.state.cityCode)
const cities = [
  {
    name: 'home.city.hz',
    code: 'hz'
  },
  {
    name: 'home.city.sh',
    code: 'sh'
  },
  {
    name: 'home.city.nj',
    code: 'nj'
  },
  {
    name: 'home.city.cd',
    code: 'cd'
  },
  {
    name: 'home.city.cq',
    code: 'cq'
  },
  {
    name: 'home.city.bj',
    code: 'bj'
  },
  {
    name: 'home.city.sz',
    code: 'sz'
  },
  {
    name: 'home.city.gz',
    code: 'gz'
  }
]

function cityClick(tab: any) {
  console.log(tab)
  const { name } = tab.props
  cityCode.value = name
  store.dispatch('getRoomList', { pageNo: 1, cityCode: name })
}
</script>

<style lang="less" scoped>

</style>
