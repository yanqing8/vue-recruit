<script setup>
import {
  HomeFilled,
  Management,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import logo from '@/assets/logo.png'
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
    <el-header>
      <div>
        <router-link to="/home">
          <div>
            <img :src="logo" height="40" alt="" />
            <span style="color: cornsilk; font-size: 35px; font-weight: bolder"
              >招聘网</span
            >
          </div>
        </router-link>
        <div style="margin-left: 20px">
          <el-button @click="navigateTo('/login', 'false')" type="primary" plain
            >登录</el-button
          >
          <el-button @click="navigateTo('/login', 'true')" type="success" plain
            >注册</el-button
          >
          <span style="font-weight: normal; font-size: 20px; color: #fc5531">
            您好！
            <strong style="color: black"> 檐晴 </strong>
          </span>
        </div>
      </div>
      <el-menu
        :default-active="$route.path"
        mode="horizontal"
        background-color="transparent"
        active-text-color="#fff"
        :ellipsis="false"
        router
      >
        <el-menu-item index="/home">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/recruit/info">
          <el-icon>
            <Management />
          </el-icon>
          <span>招聘信息</span>
        </el-menu-item>
        <el-menu-item index="/job/info">
          <el-icon>
            <Management />
          </el-icon>
          <span>求职信息</span>
        </el-menu-item>
      </el-menu>
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
      <el-footer>yanqing招聘网 ©2023 Created by yanqing</el-footer>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-menu--horizontal > .el-menu-item.is-active,
  .el-menu--horizontal > .el-menu-item {
    border-bottom: none;
  }
  .el-header {
    height: 40px;
    background: linear-gradient(to right, #909399, #cfe9fe);
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
    // 让el-menu中的el-menu-item两端对齐
    .el-menu {
      height: 100%;
      .el-menu-item {
        font-size: 15px;
        flex: 1;
        text-align: center;
        margin: 0 20px; /* 调整每个 el-menu-item 之间的左右间距 */
      }
    }
    .el-dropdown {
      margin-right: 20px;
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
  }
  .el-main {
    background-color: #fff;
    display: flex;
    // justify-content: center; /* 将子元素水平居中 */
    align-items: center; /* 将子元素垂直居中 */
    flex-direction: column; /* 子元素纵向排列，如果希望横向排列可以不设置这个属性 */
    padding: 0;
    background: linear-gradient(#cee9ff, #e2d6da);
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
