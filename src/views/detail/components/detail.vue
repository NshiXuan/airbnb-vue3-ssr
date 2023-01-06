<template>
  <!-- 照片墙 -->
  <el-carousel trigger="click" height="380px" :interval="3000" indicator-position="none" type="card">
    <el-carousel-item v-for="(item, index) in roomDetail?.imgs" :key="index">
      <img :src="item" :alt="item + ''">
    </el-carousel-item>
  </el-carousel>

  <!-- 房屋详情信息 -->
  <div class="room-detail">
    <div class="detail-part">
      <h2>{{ roomDetail?.title }}</h2>
      <!-- 房屋信息 -->
      <div class="info">
        <span class="room">{{ roomDetail?.info?.room }}个房间</span>
        <span class="bed">{{ roomDetail?.info?.bed }}张床</span>
        <span class="toilet">{{ roomDetail?.info?.toilet }}个房间</span>
        <span class="live-number">{{ roomDetail?.info?.liveNumber }}个房间</span>
      </div>
      <div class="tags">
        <el-tag type="small">{{ roomDetail?.info?.remarks }}评论</el-tag>
        <el-tag type="danger" v-if="roomDetail?.info?.metro">靠近地铁</el-tag>
        <el-tag type="warning" v-if="roomDetail?.info?.parking">免费停车</el-tag>
        <el-tag type="success" v-if="roomDetail?.info?.luggage">可存放行李</el-tag>
      </div>
      <!-- 房东信息 -->
      <div class="owner">
        <img :src="roomDetail?.owner?.avatar" alt="房东">
        <div class="info">
          <p>房东：{{ roomDetail?.owner?.name }}</p>
          <p>
            <span v-if="roomDetail?.owner?.certify">已验证身份</span>
            <span v-if="roomDetail?.info?.goodOwner">超赞房东</span>
          </p>
        </div>
      </div>
      <!-- 基本介绍 -->
      <div class="introduce">{{ roomDetail?.owner?.introduce }}</div>
    </div>

    <div class="form-part">
      <div>￥380/晚</div>
      <el-form ref="orderForm" :model="orderForm">
        <el-form-item prop="personNumber" label="人数">
          <select v-model="orderForm.personNumber">
            <option v-for="item in 3" :value="item" :key="item">{{ item }}</option>
          </select>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm">预定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const roomDetail = computed(() => store.state.roomDetail)
const orderForm = reactive({
  personNumber: 1
})

function submitForm() {
  if (store.state.userStatus) {
    console.log('预定')
  } else {
    // const { pathname }: any = route
    const { pathname }: any = window.location
    console.log(pathname, router)
    router.replace({
      path: '/login',
      query: {
        redirect: pathname
      }
    })
  }
}

</script>

<style lang="scss" scoped>
.el-carousel {
  background-color: red;

  .el-carousel-item {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
}

.room-detail {
  @include main-wrapper;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .detail-part {
    margin-right: 20px;

    .info span,
    .el-tag {
      margin-right: 20px;
      margin-top: 20px;
    }

    .owner {
      display: flex;
      margin-top: 20px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin-right: 20px;
      }

      .info p {
        margin-bottom: 5px;
      }
    }
  }

  .form-part {
    padding: 20px;
    width: 300px;
    height: 200px;
    border-radius: 10px;
    border: 1px solid #777;

    .el-form {
      margin-top: 10px;

      select {
        width: 200px;
        height: 20px;
      }
    }
  }

  .introduce {
    margin: 20px 0;
    padding: 20px;
    background-color: #eee;
    border-radius: 10px;
  }
}
</style>
