<script setup>
import { onMounted, ref } from 'vue'
import {
  goodsGetList,
  goodsAddOrder,
  goodsGetOrder,
  goodsPay
} from '@/api/goods.js'
import { useUserStore } from '@/stores/index.js'
const userStore = useUserStore()
const radio = ref(2)
const goodsList = ref([])
const getGoodsList = async () => {
  const res = await goodsGetList()
  goodsList.value = res.data.data
}
const orderInfo = ref()
onMounted(() => {
  getGoodsList()
})

const dialogVisible = ref(false)

const onCreateOder = async () => {
  if (userStore.user.level !== 0) {
    ElMessage.warning('您已成为会员')
    return
  }
  if (!radio.value) {
    ElMessage.warning('请选择商品')
    return
  }
  const data = {
    goodsId: radio.value
  }
  const res = await goodsGetOrder({ goodsId: radio.value })
  if (res.data.data) {
    // 买过这个商品了，但是不确定是否已经支付
    orderInfo.value = res.data.data
  } else {
    // 没买过这个商品， 下单
    const res = await goodsAddOrder(data)
    orderInfo.value = res.data.data
  }
  console.log(orderInfo.value)
  dialogVisible.value = true
}
const onSubmit = async () => {
  const params = {
    traceNo: orderInfo.value.orderId,
    subject: orderInfo.value.name,
    totalAmount: orderInfo.value.total
  }
  const res = await goodsPay(params)
  console.log(res)
}
</script>

<template>
  <page-container title="成为会员">
    <div>
      <p style="color: red">劲爆消息！劲爆消息！劲爆消息！</p>
      <p>
        现在成为Yanqing招聘网会员可<strong>终身使用！！终身使用！！</strong>
      </p>
      <p>成为会员即可发布贵公司的岗位信息，招纳贤才！！</p>
      <p>成为会员即可发布自己的求职信息，找到自己的伯乐！！</p>
      <p>测试账号：krelpj1989@sandbox.com 密码6个1</p>
    </div>
    <el-form>
      <el-form-item>
        <el-radio-group v-model="radio">
          <el-radio v-for="item in goodsList" :key="item.id" :label="item.id">
            {{ item.name }}<strong>￥{{ item.price }}元</strong>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="userStore.user.level == 0"
          @click="onCreateOder()"
          type="primary"
          >立即开通</el-button
        >
        <h3 v-else style="color: red">您已成为会员</h3>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisible" title="支付订单" width="30%">
      <el-row>
        <el-col :span="12">商品名称</el-col>
        <el-col :span="12">{{ orderInfo.name }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">订单编号</el-col>
        <el-col :span="12">{{ orderInfo.orderId }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">支付状态</el-col>
        <el-col :span="12">{{ orderInfo.state }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">总价格</el-col>
        <el-col :span="12">￥{{ orderInfo.total }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">创建时间</el-col>
        <el-col :span="12">{{ orderInfo.createTime }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">支付时间</el-col>
        <el-col :span="12">{{ orderInfo.payTime }}</el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            v-if="orderInfo.state === '待支付'"
            type="primary"
            @click="onSubmit()"
            >立即支付</el-button
          >
          <el-button
            v-else-if="orderInfo.state === '已支付待审核'"
            type="primary"
            disabled
          >
            已付款等待管理员审核
          </el-button>

          <el-button
            v-else-if="orderInfo.state === '未通过'"
            type="primary"
            disabled
          >
            订单审核未通过，请联系管理员查明原因
          </el-button>
        </span>
      </template>
    </el-dialog>
  </page-container>
</template>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
