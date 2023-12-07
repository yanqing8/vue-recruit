<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id
// TODO 详情页
</script>

<template>
  <div style="width: 65%">
    <page-container title="求职信息">
      <template #extra>
        <el-button type="primary">联系TA{{ id }}</el-button>
      </template>
    </page-container>
  </div>
</template>
