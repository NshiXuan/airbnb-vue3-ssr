<template>
  <el-pagination :current-page="pageNo" :page-size="pageSize" :total="total" @current-change="changePage" background
    layout="prev,pager,next">

  </el-pagination>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()
const pageNo = computed(() => store.state.pageNo)
const pageSize = computed(() => store.state.pageSize)
const total = computed(() => store.state.total)

const emit = defineEmits<{
  (e: 'changePage', pageNo: number): void
}>()

function changePage(pageNo: number) {
  console.log(pageNo)
  emit('changePage', pageNo)
}
</script>

<style lang="scss" scoped>

</style>
