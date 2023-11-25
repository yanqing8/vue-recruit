<script setup>
import { Search } from '@element-plus/icons-vue'
import JobInfoItem from '@/views/recruit/components/JobInfoItem.vue'
</script>
<template>
  <div>
    <page-container title="求职信息">
      <template #extra>
        <el-button type="primary">发布求职信息</el-button>
      </template>
      <el-form inline>
        <el-form-item label="职业类别：">
          <el-select>
            <el-option label="Java" value="101"></el-option>
            <el-option label="Python" value="102"></el-option>
            <el-option label="C++" value="103"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="Search" placeholder="请输入职位、学历等搜索">
          </el-input>
        </el-form-item>
        <!-- 排序方式 -->
        <el-form-item label="排序方式">
          <el-select>
            <el-option label="最新发布" value="101"></el-option>
            <el-option label="学历最高" value="102"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
      <ul class="page-list">
        <job-info-item></job-info-item>
        <job-info-item></job-info-item>
        <job-info-item></job-info-item>
        <job-info-item></job-info-item>
        <job-info-item></job-info-item>
        <job-info-item></job-info-item>
      </ul>
    </page-container>
  </div>
</template>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 8px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 140px;
  // background-color: #8c97a2;
}
.el-row:last-child {
  margin-bottom: 0;
}
.page-list {
  padding: 0;
  margin: 0;
}
</style>
