<template>
  <li>
    <el-row>
      <el-col :span="12">
        <div class="item-left">
          <h3>Java高级开发工程师</h3>
          <p>
            <span>北京市朝阳区</span>
            <span style="color: #ff5959">10-15k</span>
            <span>本科</span>
            <span>3-5年</span>
          </p>
          <el-tag>全栈开发</el-tag>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item-right">
          <!-- 公司、招聘人数、发布时间 -->
          <p>阿里巴巴</p>
          <p>招聘人数：10人</p>
          <p style="font-size: 12px; color: #bfbfbf">发布时间：2021-01-01</p>
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
