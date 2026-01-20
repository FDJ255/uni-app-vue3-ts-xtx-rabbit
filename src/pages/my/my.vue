<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { request } from '@/utils/request'

const memberStore = useMemberStore()

const login = async () => {
  const res = await request({
    url: '/home/banner',
    method: 'GET',
    header: {},
  })
  console.log('请求回来的信息', res)
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="login" size="mini" plain type="warn">登录</button>
  </view>
</template>

<style lang="scss">
//
</style>
