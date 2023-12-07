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
