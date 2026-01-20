<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { getHomeBannerAPI } from '@/apis/home'
import { ref } from 'vue'
const bannerList = ref([])

const getHomeBannerData = async () => {
  // 这里可以添加获取首页轮播图数据的逻辑
  const res = await getHomeBannerAPI()
}

onLoad(() => {
  getHomeBannerData()
})
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />

  <!-- 自定义轮播图 -->
  <XtxSwiper />
  <view class="index"> </view>
</template>

<style lang="scss">
//
</style>
