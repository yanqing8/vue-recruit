<script setup>
import { Search } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { jobGetRecuitmentsService } from '@/api/job.js'
import { Delete, Edit } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const jobList = ref([])
const total = ref(0)
const loading = ref(false)

// 定义请求参数对象
const params = ref({
  pageNum: 1, // 当前页码
  pageSize: 5, // 每页显示的数量
  type: 0, // 招聘类型
  userId: userStore.user.id, // 用户ID
  categoryId: '', // 职位分类ID
  state: '' // 审核状态
})

const getJobList = async () => {
  loading.value = true
  const res = await jobGetRecuitmentsService(params.value)
  jobList.value = res.data.data.items // 职位列表数据
  total.value = res.data.data.total // 职位总数
  loading.value = false
}
onMounted(() => {
  getJobList()
})

const drawerRef = ref()
// 添加
const router = useRouter()
const onAddJob = () => {
  if (userStore.user.level === 0) {
    ElMessage.warning('请先成为会员')
    router.push('/user/member')
    return
  }
  drawerRef.value.open({})
}

// 编辑
const onEditJob = (row) => {
  drawerRef.value.open(row)
}
// 删除
const onDeleteJob = async (row) => {
  console.log(row)
}

// 分页
const onSizeChange = (val) => {
  params.value.pageNum = 1
  params.value.pageSize = val
  getJobList()
}
const onCurrentChange = (val) => {
  params.value.pageNum = val
  getJobList()
}

// 搜索
const onSearch = () => {
  params.value.pageNum = 1
  getJobList()
}
// 重置
const onReset = () => {
  params.value.pageNum = 1
  params.value.categoryId = ''
  params.value.state = ''
  getJobList()
}

// 添加或者编辑成功后刷新列表
const onSuccess = (type) => {
  // if (type === 'add') {
  //   // 渲染到第一页
  //   params.value.pageNum = 1
  // }
  console.log(type)
  params.value.pageNum = 1
  getJobList()
}
</script>

<template>
  <page-container title="招聘信息">
    <template #extra>
      <el-button type="primary" @click="onAddJob()">发布岗位信息</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline :model="params">
      <el-form-item label="职位分类：">
        <category-select v-model="params.categoryId"></category-select>
      </el-form-item>
      <el-form-item label="审核状态：">
        <el-select v-model="params.state">
          <!-- 设置待审核位黄色，审核通过绿色，未通过为红色 -->
          <el-option label="待审核" value="0" style="color: orange"></el-option>
          <el-option label="已发布" value="1" style="color: green"></el-option>
          <el-option label="未通过" value="2" style="color: red"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch()" type="primary" :icon="Search"
          >搜索</el-button
        >
        <el-button @click="onReset()">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table v-loading="loading" :data="jobList">
      <el-table-column label="职位标题" prop="title">
        <template #default="{ row }">
          <el-link
            :href="'/recruit/' + row.id"
            type="primary"
            :underline="false"
            target="_blank"
          >
            {{ row.title }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="categoryName"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="薪资" prop="payMax">
        <template #default="{ row }">
          {{ row.payMin }}k-{{ row.payMax }}k
        </template>
      </el-table-column>
      <el-table-column label="公司" prop="company"></el-table-column>
      <el-table-column label="状态" prop="state" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.state === 0" type="warning" effect="dark">
            待审核
          </el-tag>
          <el-tag v-if="row.state === 1" type="success" effect="dark">
            已发布
          </el-tag>
          <el-tag v-if="row.state === 2" type="danger" effect="dark">
            未通过
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="最近修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button-group>
            <!-- 根据row.createUser === userStore.user.id 是否禁用操作 -->
            <el-button @click="onEditJob(row)" type="primary" :icon="Edit" />
            <el-button @click="onDeleteJob(row)" type="danger" :icon="Delete" />
          </el-button-group>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pageNum"
      v-model:page-size="params.pageSize"
      :page-sizes="[3, 5, 10, 20, 50]"
      small
      :background="true"
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <!-- 抽屉 -->
    <job-edit
      ref="drawerRef"
      @success="onSuccess"
      :type="params.type"
    ></job-edit>
  </page-container>
</template>
