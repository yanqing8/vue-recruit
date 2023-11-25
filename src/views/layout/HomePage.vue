<script setup>
import HomeMain from '@/views/layout/components/HomeMain.vue'
import HomeInner from '@/views/layout/components/HomeInner.vue'
</script>
<template>
  <div class="home-content">
    <home-main></home-main>
    <div class="home-inner">
      <home-inner></home-inner>
      <home-inner></home-inner>
      <home-inner></home-inner>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home-content {
  // width: 1147.31px;
  // padding: 12px;
  box-shadow: 0 0 20px #655757;
  .home-inner {
    margin-top: 36px;
    padding-top: 1px;
  }
}
</style>
