<script setup>
import { CaretRight } from '@element-plus/icons-vue'
import { ref } from 'vue'
const sliders = ref([
  {
    id: 1,
    imgUrl:
      'https://xycy-file.zhaopin.com/xyactivity/2023/9/1/17/42/cfe0c9707e0f402caa79103da0ef0b7b_.jpg?x-oss-process=image/resize,w_700/quality,q_80'
  },
  {
    id: 2,
    imgUrl:
      'https://xycy-file.zhaopin.com/xyactivity/2023/9/8/17/13/0c1815871599434eb95035617b11b59e_.jpg?x-oss-process=image/resize,w_700/quality,q_80'
  }
])
</script>
<template>
  <div class="home-main">
    <div class="job-menu">
      <el-menu
        :default-active="$route.path"
        mode="vertical"
        background-color="transparent"
        active-text-color="#ffd04b"
        text-color="#fff"
        :ellipsis="false"
        router
      >
        <el-menu-item index="/">
          <span>Java开发</span>
          <el-icon><CaretRight /></el-icon>
        </el-menu-item>
        <el-menu-item index="/">
          <span>Java开发</span>
          <el-icon><CaretRight /></el-icon>
        </el-menu-item>
        <el-menu-item index="/">
          <span>Java开发</span>
          <el-icon><CaretRight /></el-icon>
        </el-menu-item>
        <el-menu-item index="/">
          <span>Java开发</span>
          <el-icon><CaretRight /></el-icon>
        </el-menu-item>
        <el-menu-item index="/">
          <span>Java开发</span>
          <el-icon><CaretRight /></el-icon>
        </el-menu-item>
        <el-menu-item index="/">
          <span>Java开发</span>
          <el-icon><CaretRight /></el-icon>
        </el-menu-item>
        <el-menu-item index="/">
          <span>Java开发</span>
          <el-icon><CaretRight /></el-icon>
        </el-menu-item>
        <el-menu-item index="/">
          <span>Java开发</span>
          <el-icon><CaretRight /></el-icon>
        </el-menu-item>
        <el-menu-item index="/">
          <span>Java开发</span>
          <el-icon><CaretRight /></el-icon>
        </el-menu-item>
        <el-menu-item index="/">
          <span>Java开发</span>
          <el-icon><CaretRight /></el-icon>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="banner-main">
      <slideshow-component
        :sliders="sliders"
        :aotuplay="true"
        :time="2000"
      ></slideshow-component>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home-content {
  .home-main {
    background: linear-gradient(#f1f3f4, #cee9ff);
    padding: 10px;
    height: 424px;
    .job-menu {
      width: 20%;
      height: 100%;
      float: left;
      background: linear-gradient(#937b49, #e2d6da);
      .el-menu {
        .el-menu-item {
          height: 42px;
          justify-content: space-between;
        }
      }
    }
    .banner-main {
      width: 80%;
      height: 100%;
      background-color: #7cdcfe;
      float: left;
    }
  }
}
</style>
