<script setup>
import { useUserStore } from '@/stores'

const userStore = useUserStore()
</script>

<template>
  <div>
    我是APP
    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('sdsaddsdsdsdsadsadsasfdsfdf')">
      登录
    </el-button>
    <el-button @click="userStore.removeToken()"> 退出 </el-button>
  </div>
</template>

<style scoped></style>
