<script setup>
import { onMounted, ref } from 'vue'
import { jobGetRecuitmentsService } from '@/api/job.js'

const hotJobList = ref([])
// 定义请求参数
const params = ref({
  pageNum: 1,
  pageSize: 9,
  type: '0', // 招聘信息
  state: '1' // 审核通过的
})
const getHotJobList = async () => {
  const res = await jobGetRecuitmentsService(params.value)
  hotJobList.value = res.data.data.items
}
onMounted(() => {
  getHotJobList()
})
</script>
<template>
  <section class="inner-item">
    <h3 class="section-wrap-title">热门岗位</h3>
    <ul>
      <li v-for="item in hotJobList" :key="item.id">
        <div class="home-card">
          <img :src="item.imgUrl" alt="" />
          <div class="home-card-info">
            <p>{{ item.title }}</p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
.home-content {
  .home-inner {
    .inner-item {
      position: relative;
      min-height: 160px;
      width: 1150px;
      border-radius: 12px 12px 0 0;
      background-size: 100% 160px;
      background-repeat: no-repeat;
      // background: linear-gradient(#cee9ff, #e2d6da);
      background: #cfe9fe;
      padding: 12px;
      margin: 0 auto 56px;
      box-sizing: border-box;
      .section-wrap-title {
        height: 81px;
        line-height: 81px;
        font-size: 24px;
        color: #222;
        font-weight: 500;
        text-align: center;
        font-family:
          PingFangSC-Medium,
          PingFang SC;
      }
      ul {
        // background-color: #222
        list-style-type: none;
        margin: 0;
        padding: 0;
        margin-top: -50px;
        display: table;
        li {
          float: left;
          margin: 0;
          margin-left: 36px;
          cursor: pointer;
          list-style-type: none;
          .home-card {
            background-color: #fff;
            width: 330px;
            height: 222px;
            position: relative;
            margin: 0;
            margin-top: 28px;
            padding: 0;
            border-radius: 8px;
            img {
              border-style: none;
              display: block;
              width: 330px;
              height: 182px;
              border-radius: 8px 8px 0 0;
              background: rgba(0, 0, 0, 0.05);
            }
            .home-card-info {
              padding: 0 12px;
              box-sizing: border-box;
              display: flex;
              -webkit-box-align: center;
              align-items: center;
              p {
                -webkit-box-flex: 1;
                flex: 1;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 16px;
                color: #222;
                line-height: 22px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
