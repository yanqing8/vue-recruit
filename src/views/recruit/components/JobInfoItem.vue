<script setup>
defineProps({
  jobs: {
    type: Object
  }
})
</script>
<template>
  <li>
    <el-row>
      <el-col :span="12">
        <div class="item-left">
          <h3>{{ jobs.title }}</h3>
          <p>
            <span>{{ jobs.address }}</span>
            <span style="color: #ff5959"
              >{{ jobs.payMin }}k-{{ jobs.payMax }}k</span
            >
            <!-- 判断jobs.condition数组长度，如果为0，显示“不限”，否则for遍历出来 -->
            <span
              v-if="jobs.condition.length === 1 && jobs.condition[0] === ''"
            >
              不限
            </span>
            <span v-else v-for="(item, index) in jobs.condition" :key="index">
              {{ item }}
            </span>
          </p>
          <el-tag v-if="jobs.tag.length === 1 && jobs.tag[0] === ''">无</el-tag>
          <el-tag v-else v-for="(item, index) in jobs.tag" :key="index">
            {{ item }}
          </el-tag>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item-right">
          <!-- 公司、招聘人数、发布时间 -->
          <p>{{ jobs.company }}</p>
          <p style="font-size: 12px; color: #bfbfbf">
            发布时间：{{ jobs.createTime }}
          </p>
        </div>
      </el-col>
      <el-divider></el-divider>
    </el-row>
  </li>
</template>

<style lang="scss" scoped>
.page-list {
  li {
    :hover {
      background-color: #f4f6f9;
    }
    list-style: none;
    border-radius: 10px;
    padding: 0;
    margin: 0;
  }
}
.el-col {
  .item-left {
    text-align: left;
  }
  .item-right {
    text-align: right;
  }
  span {
    margin-right: 10px;
  }
}
</style>
