<script setup>
import { Search } from '@element-plus/icons-vue'
import JobInfoItem from '@/views/recruit/components/JobInfoItem.vue'
import { onMounted, ref } from 'vue'
import { jobGetRecuitmentsService } from '@/api/job.js'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { ElMessageBox } from 'element-plus'
const params = ref({
  pageNum: 1,
  pageSize: 10,
  type: '0',
  state: '1',
  categoryId: '',
  otherParam: '',
  sortOrd: '0'
})
const total = ref(0)
const jobList = ref([])
const getJobList = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })

  try {
    const res = await jobGetRecuitmentsService(params.value)
    jobList.value = res.data.data.items
    total.value = res.data.data.total
  } catch (error) {
    console.error('Failed to get job list:', error)
  } finally {
    loading.close()
  }
}
onMounted(() => {
  getJobList()
})
const onSearch = () => {
  params.value.pageNum = 1
  getJobList()
}
const onReset = () => {
  params.value.pageNum = 1
  params.value.categoryId = ''
  params.value.otherParam = ''
  params.value.sortOrd = '0'
  getJobList()
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
const router = useRouter()
const userStore = useUserStore()
const checkAuth = async () => {
  if (!userStore.token) {
    await ElMessageBox.confirm('您还未登录，是否前往登录页？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    router.push('/login')
  } else {
    router.push('/user/recruit')
  }
}
</script>
<template>
  <div>
    <page-container title="招聘信息">
      <template #extra>
        <el-button type="primary" @click="checkAuth()">发布岗位信息</el-button>
      </template>
      <el-form inline>
        <el-form-item label="职业类别：">
          <category-select v-model="params.categoryId"></category-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="params.otherParam"
            :prefix-icon="Search"
            placeholder="请输入职位、公司等搜索"
          >
          </el-input>
        </el-form-item>
        <!-- 排序方式 -->
        <el-form-item label="排序方式">
          <el-select v-model="params.sortOrd" @change="onSearch">
            <el-option label="最新发布" value="0"></el-option>
            <el-option label="薪资最高" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSearch()" type="primary">搜索</el-button>
          <el-button @click="onReset()" type="info">重置</el-button>
        </el-form-item>
      </el-form>
      <ul class="page-list">
        <job-info-item
          v-for="item in jobList"
          :key="item.id"
          :jobs="item"
        ></job-info-item>
      </ul>
      <el-empty v-if="jobList.length === 0" description="暂无数据" />
      <!-- 分页 -->
      <el-pagination
        v-model:current-page="params.pageNum"
        v-model:page-size="params.pageSize"
        :page-sizes="[3, 5, 10, 20, 50]"
        :background="true"
        layout="jumper,total, sizes, prev, pager, next"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        style="margin-top: 20px; justify-content: flex-end"
      />
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
