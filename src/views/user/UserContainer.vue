<script setup>
import {
  Grid,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  Document,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useRouter } from 'vue-router'
const router = useRouter()

const navigateTo = (path, param) => {
  if (param) {
    // 如果 param 存在，带参数跳转路由
    router.push({
      path: path,
      query: { isRegister: param }
    })
  } else {
    // 如果 param 不存在，直接跳转路由
    router.push(path)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <router-link to="/home">
        <div class="el-aside__logo"></div>
      </router-link>
      <el-menu
        active-text-color="#ffca28"
        background-color="#465d6b"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/user/job">
          <el-icon><Promotion /></el-icon>
          <span>应聘管理</span>
        </el-menu-item>
        <el-menu-item index="/user/recruit">
          <el-icon><Grid /></el-icon>
          <span>招聘管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon><User></User></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/resume">
            <el-icon><Document /></el-icon>
            <span>我的简历</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop></Crop></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen></EditPen></el-icon>
            <span>修改密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>打工人：<strong>小帅鹏</strong></div>
        <el-dropdown placement="bottom-end">
          <span class="el-dropdown__box">
            <el-avatar :src="avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                @click="navigateTo('/user/profile')"
                command="profile"
                :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item
                @click="navigateTo('/user/avatar')"
                command="avatar"
                :icon="Crop"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item
                @click="navigateTo('/user/password')"
                command="password"
                :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>yanqing招聘网 ©2023 Created by yanqing</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #465d6b;
    &__logo {
      height: 120px;
      background: url('@/assets/login01.png') no-repeat center / 160px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>