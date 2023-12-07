<script setup>
import { onMounted, ref } from 'vue'
import { goodsGetOrderList } from '@/api/goods.js'
import { Search, Edit } from '@element-plus/icons-vue'
import OrderEdit from './components/OrderEdit.vue'
const orderList = ref([])
const loading = ref(false)
const total = ref(0)

// 定义请求参数
const params = ref({
  pageNum: 1,
  pageSize: 5,
  state: '',
  orderId: ''
})
const getOrderList = async () => {
  loading.value = true
  const res = await goodsGetOrderList(params.value)
  orderList.value = res.data.data.items
  total.value = res.data.data.total
  loading.value = false
}
onMounted(() => {
  getOrderList()
})
const onSearch = () => {
  params.value.pageNum = 1
  getOrderList()
}
const onReset = () => {
  params.value.pageNum = 1
  params.value.state = ''
  params.value.orderId = ''
  getOrderList()
}
// 编辑
const dialog = ref()
const onEditOrderList = (row) => {
  if (row) dialog.value.open(row)
  else dialog.value.open(slelectJobList.value)
}

// 分页
const onSizeChange = (val) => {
  params.value.pageNum = 1
  params.value.pageSize = val
  getOrderList()
}
const onCurrentChange = (val) => {
  params.value.pageNum = val
  getOrderList()
}

// 多选
const multipleTableRef = ref()
const slelectJobList = ref([])
const onSelectionChange = (val) => {
  slelectJobList.value = val
}
const toggleSelection = () => {
  orderList.value.forEach((row) => {
    multipleTableRef.value.toggleRowSelection(row)
  })
}

// 子传父，通知父组件刷新列表
const onSuccess = () => {
  params.value.pageNum = 1
  params.value.state = ''
  getOrderList()
}
const stateTagMap = {
  待支付: { type: 'warning', text: '待支付' },
  已支付待审核: { type: 'warning', text: '已支付待审核' },
  未支付: { type: 'danger', text: '未支付' },
  已通过: { type: 'success', text: '已通过' },
  未通过: { type: 'danger', text: '未通过' }
}
</script>

<template>
  <page-container title="订单管理">
    <!-- 表单 -->
    <el-form inline :model="params">
      <el-form-item>
        <el-button type="primary" @click="toggleSelection()">反选</el-button>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="params.state">
          <el-option label="全部" value=""></el-option>
          <el-option
            label="待支付"
            value="待支付"
            style="color: rgb(198, 129, 0)"
          ></el-option>
          <el-option
            label="已支付待审核"
            value="已支付待审核"
            style="color: rgb(2, 89, 2)"
          ></el-option>
          <el-option
            label="未支付"
            value="未支付"
            style="color: rgb(151, 2, 2)"
          ></el-option>
          <el-option
            label="已通过"
            value="已通过"
            style="color: green"
          ></el-option>
          <el-option
            label="未通过"
            value="未通过"
            style="color: red"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="params.orderId" placeholder="请输入订单号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="onSearch()"
          >查询</el-button
        >
        <el-button @click="onReset()">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onEditOrderList()">
          编辑所选项
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      ref="multipleTableRef"
      @selection-change="onSelectionChange"
      v-model="loading"
      :data="orderList"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="66"></el-table-column>
      <el-table-column
        label="订单编号"
        prop="orderId"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="支付单号"
        prop="alipayNo"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="状态" prop="state">
        <template #default="{ row }">
          <el-tag :type="stateTagMap[row.state].type">
            {{ row.state }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="总价" prop="total"></el-table-column>
      <el-table-column label="订单创建时间" prop="createTime"></el-table-column>
      <el-table-column label="支付时间" prop="payTime"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button
            type="primary"
            @click="onEditOrderList(row)"
            :icon="Edit"
          ></el-button>
        </template>
      </el-table-column>
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
    <order-edit ref="dialog" @success="onSuccess"></order-edit>
  </page-container>
</template>
