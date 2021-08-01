<template>
  <div class="icon-list">
    <div class="wrapper" ref="wrapperRef">
      <div class="content">
        <div class="flex-content">
          <div class="icon-item">
            <div class="background">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-meirituijian"></use>
              </svg>
            </div>
            <span>每日推荐</span>
          </div>
          <div class="icon-item">
            <div class="background">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-FM"></use>
              </svg>
            </div>
            <span>私人FM</span>
          </div>
          <div class="icon-item">
            <div class="background">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
              </svg>
            </div>
            <span>歌单</span>
          </div>
          <div class="icon-item">
            <div class="background">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang1"></use>
              </svg>
            </div>
            <span>排行榜</span>
          </div>
          <div class="icon-item">
            <div class="background">
              <svg class="icon" aria-hidden="true">
                <use
                  xlink:href="#icon-zhibobofangshexiangjiguankanmianxing"
                ></use>
              </svg>
            </div>
            <span>直播</span>
          </div>
          <div class="icon-item">
            <div class="background">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhuanji"></use>
              </svg>
            </div>
            <span>数字专辑</span>
          </div>
          <div class="icon-item">
            <div class="background">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-faxian_zhuanzhumingxiang"></use>
              </svg>
            </div>
            <span>专注冥想</span>
          </div>
          <div class="icon-item">
            <div class="background">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-faxian_gefang"></use>
              </svg>
            </div>
            <span>歌房</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="box"></div> -->
  </div>
</template>
<script setup>
import BScroll from "@better-scroll/core";
import { ref } from "@vue/reactivity";
import { nextTick, onMounted } from "@vue/runtime-core";
const wrapperRef = ref(null);

onMounted(() => {
  let bs = new BScroll(wrapperRef.value, {
    scrollX:true
  });
});
</script>
<style lang="scss" scoped>
.icon-list {
  width: 7.5rem;
  height: 1.5rem;
  padding: 0.2rem 0;
  overflow-x: auto;
  .wrapper {
    white-space: nowrap;
    overflow: hidden;
    .content {
      display: inline-block;
      width: 15rem; 
      .flex-content {
        width: 15rem; 
        display: flex;
        justify-content: space-around;
      }
    }
  }

  .icon-item {
    width: 1rem;
    font-size: 0.2rem;
    text-align: center;
    vertical-align: middle;
    .background {
      margin: 0 auto;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      background: rgba(255, 0, 0, 0.1);
    }
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      transform: translate(0, 0.15rem);
    }
  }
}
</style>