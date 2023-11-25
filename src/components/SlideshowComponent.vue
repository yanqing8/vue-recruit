<script setup>
import { ArrowRightBold, ArrowLeftBold } from '@element-plus/icons-vue'
import { ref, watch, onUnmounted } from 'vue'

// 定义组件的 props
const props = defineProps(['sliders', 'autoplay', 'time'])

// 当前选中值
const idx = ref(0)
// 定时器id
let timer = null

// 自动播放函数
const doAotuplay = () => {
  timer = setInterval(() => {
    idx.value++
    if (idx.value >= props.sliders.length) {
      idx.value = 0
    }
  }, props.time)
}

// 监听图片数据的变化
watch(
  () => props.sliders,
  (newValue) => {
    if (newValue.length && props.autoplay) {
      idx.value = 0
      doAotuplay()
    }
  },
  { immediate: true }
)

// 组件销毁后 关闭定时器
onUnmounted(() => {
  clearInterval(timer)
})

// 鼠标进入关闭定时器
const enter = () => {
  clearInterval(timer)
}

// 鼠标离开后开启定时器
const leave = () => {
  doAotuplay()
}

// 上一页下一页
const toggle = (i) => {
  idx.value += i
  // 如果索引大于长度就从0开始
  if (idx.value >= props.sliders.length) {
    idx.value = 0
  }
  // 如果索引小于0就从长度-1开始 因为是按照索引排的要减一
  if (idx.value < 0) {
    idx.value = props.sliders.length - 1
  }
}
</script>
<template>
  <div class="xtx-carousel" @mouseenter="enter" @mouseleave="leave">
    <ul class="carousel-body">
      <li
        class="carousel-item"
        v-for="(item, i) in sliders"
        :class="{ fade: i === idx }"
        :key="item.id"
      >
        <RouterLink to="/">
          <img :src="item.imgUrl" />
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)">
      <el-icon><ArrowLeftBold /></el-icon>
    </a>
    <a href="javascript:;" class="carousel-btn next" @click="toggle(1)">
      <el-icon><ArrowRightBold /></el-icon>
    </a>
    <div class="carousel-indicator">
      <span
        v-for="(item, i) in sliders.length"
        @click="idx = i"
        :class="{ active: idx === i }"
        :key="i"
      ></span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      list-style-type: none;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
