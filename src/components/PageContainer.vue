<script setup>
// const pageNum = ref(4)

defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span
          ><strong>{{ title }}</strong></span
        >
        <div class="extra">
          <slot name="extra"></slot>
        </div>
      </div>
    </template>

    <slot></slot>
    <!-- <div class="demo-pagination-block">
      <div class="demonstration">All combined</div>
      <el-pagination
        v-model:current-page="pageNum"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div> -->
  </el-card>
</template>
<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  // background-color: #dddae2;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
