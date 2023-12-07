<script setup>
import { Search, Delete, Edit } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import {
  jobGetRecuitmentsService,
  jobDeleteRecuitmentService
} from '@/api/job.js'
import AuditEdit from './components/AuditEdit.vue'
const jobList = ref([])
const loading = ref(false)
const total = ref(0)
const dialog = ref()

// 定义请求参数
const params = ref({
  pageNum: 1,
  pageSize: 5,
  type: '0',
  state: '',
  otherParam: ''
})

const getJobList = async () => {
  loading.value = true
  const res = await jobGetRecuitmentsService(params.value)
  jobList.value = res.data.data.items
  total.value = res.data.data.total
  loading.value = false
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
  params.value.state = ''
  params.value.otherParam = ''
  getJobList()
}

// 编辑
const onEditJobList = (row) => {
  if (row) dialog.value.open(row)
  else dialog.value.open(slelectJobList.value)
}
// 删除
const onDeleteJobList = async (jobId) => {
  await ElMessageBox.confirm('此操作将永久删除所选列表, 是否继续?', '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  // 把slelectJobList.value里面的id取出来，存入数组
  const ids = []
  if (jobId) {
    ids.push(jobId)
  } else {
    slelectJobList.value.forEach((item) => {
      ids.push(item.id)
    })
  }
  if (ids.length === 0) {
    ElMessage.warning('请选择要删除的列表')
    return
  }
  await jobDeleteRecuitmentService(ids)
  ElMessage.success('删除成功')
  getJobList()
}

// 多选，把选中的存入数组
const slelectJobList = ref([])
const multipleTableRef = ref()
const onSelectionChange = (val) => {
  slelectJobList.value = val
}
// 反选
const toggleSelection = () => {
  jobList.value.forEach((row) => {
    multipleTableRef.value.toggleRowSelection(row)
  })
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

// open操作成功之后，刷新列表
const onSuccess = () => {
  params.value.pageNum = 1
  params.value.state = ''
  getJobList()
}
</script>

<template>
  <page-container title="审核管理">
    <!-- 表单 -->
    <el-form inline :model="params">
      <el-form-item>
        <el-button type="primary" @click="toggleSelection()">反选</el-button>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select
          @change="onSearch()"
          v-model="params.state"
          placeholder="请选择审核状态"
          style="width: 160px"
        >
          <!-- 设置待审核位黄色，审核通过绿色，未通过为红色 -->
          <el-option label="全部" value=""></el-option>
          <el-option label="待审核" value="0" style="color: orange"></el-option>
          <el-option label="已发布" value="1" style="color: green"></el-option>
          <el-option label="未通过" value="2" style="color: red"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="params.otherParam" placeholder="请输入关键字">
          <template #prepend>
            <el-select
              @change="onSearch()"
              v-model="params.type"
              placeholder="请选择审核类型"
              style="width: 160px"
            >
              <el-option label="岗位信息" value="0"></el-option>
              <el-option label="求职信息" value="1"></el-option>
            </el-select>
          </template>
          <template #append>
            <el-button @click="onSearch()" :icon="Search" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onReset()">重置</el-button>
        <el-button type="primary" @click="onEditJobList()">
          编辑所选项
        </el-button>
        <el-button type="danger" @click="onDeleteJobList()">
          删除所选项
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      ref="multipleTableRef"
      v-loading="loading"
      :data="jobList"
      @selection-change="onSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
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
      <el-table-column
        label="地址"
        prop="address"
        show-overflow-tooltip
      ></el-table-column>
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
      <el-table-column label="信息类别" prop="type" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.type === 0" type="warning" effect="dark">
            招聘信息
          </el-tag>
          <el-tag v-if="row.type === 1" type="success" effect="dark">
            求职信息
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="最近修改时间"
        prop="updateTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button-group>
            <!-- 根据row.createUser === userStore.user.id 是否禁用操作 -->
            <el-button
              @click="onEditJobList(row)"
              type="primary"
              :icon="Edit"
            />
            <el-button
              @click="onDeleteJobList(row.id)"
              type="danger"
              :icon="Delete"
            />
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
    <!-- 编辑对话框 -->
    <audit-edit ref="dialog" @success="onSuccess"></audit-edit>
  </page-container>
</template>
