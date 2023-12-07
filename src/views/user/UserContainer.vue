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
  CaretBottom,
  Connection,
  Menu,
  HelpFilled,
  DocumentChecked
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/index.js'
import { onMounted } from 'vue'

const router = useRouter()

// 获取用户信息
const userStore = useUserStore()
onMounted(() => {
  if (userStore.token) {
    userStore.getUser()
  }
})

const handleCommand = async (command) => {
  switch (command) {
    case 'logout':
      await ElMessageBox.confirm('此操作将退出登录, 是否继续?', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      userStore.removeToken()
      userStore.setUser({})
      router.push('/login')
      break
    default:
      router.push(`/user/${command}`)
      break
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
        unique-opened
        active-text-color="#ffca28"
        background-color="#465d6b"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/user/category">
          <el-icon><Connection /></el-icon>
          <span>职位分类</span>
        </el-menu-item>
        <el-menu-item :disabled="userStore.user.role == 1" index="/user/job">
          <el-icon><Promotion /></el-icon>
          <span>求职管理</span>
        </el-menu-item>
        <el-menu-item
          :disabled="userStore.user.role == 2"
          index="/user/recruit"
        >
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
          <el-menu-item index="/user/member">
            <el-icon><HelpFilled /></el-icon>
            <span>成为会员</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/admin" v-if="userStore.user.role == 0">
          <template #title>
            <el-icon><Menu></Menu></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/user/list">
            <el-icon><User></User></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/user/audit">
            <el-icon><DocumentChecked /></el-icon>
            <span>审核管理</span>
          </el-menu-item>
          <el-menu-item index="/user/order">
            <el-icon><Document /></el-icon>
            <span>订单管理</span>
          </el-menu-item>
          <el-menu-item index="/user/picture">
            <el-icon><Crop></Crop></el-icon>
            <span>图片管理</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <span v-show="userStore.user.role === 0">管理员：</span>
          <span v-show="userStore.user.role === 1">大老板：</span>
          <span v-show="userStore.user.role === 2">打工人：</span>
          <strong>{{
            userStore.user.nickname || userStore.user.username
          }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.userPic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item command="password" :icon="EditPen"
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
      background: url('@/assets/sb.png') no-repeat center / 160px auto;
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
