<template>
  <div class="play-list">
    <div class="play-list-top">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <div>
          播放全部<span
            >共({{ playlist.tracks && playlist.tracks.length }})</span
          >
        </div>
      </div>
      <div class="btn">+收藏({{ playlist.subscribedCount }})</div>
    </div>
    <div class="scroll-wrapper" ref="scrollWrapper">
      <div class="play-list-body">
        <div
          class="play-item"
          v-for="(item, i) in playlist.tracks"
          :key="item.id"
        >
          <div class="ind">{{ i + 1 }}</div>
          <div class="desc">
            <div class="title">{{ item.name }}</div>
            <div class="author">
              <span v-for="i in item.ar" :key="i.id">{{ i.name }}</span>
            </div>
          </div>

          <div class="icons">
            <svg class="icon" aria-hidden="true" @click="playClick(i)">
              <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-liebiao-dian"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BScroll from "@better-scroll/core";
import { defineProps, onMounted, watchEffect, ref, nextTick, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  playlist: {},
});
const scrollWrapper = ref(null);
watch(props, () => {
  nextTick(()=>{
    bs.refresh()
  })
}, {
  deep: true,
  immediate: true,
});
let bs;
onMounted(() => {
  bs = new BScroll(scrollWrapper.value, {
    click: true,
  });
});

const playClick=function(i){
  store.commit('setplayCurrentIndex',i)
}
</script>
<style lang="scss" scoped>
.play-list {
  padding: 0.5rem 0 0 0;
  position: relative;
  top: -0.4rem;
  width: 7.5rem;
  background: #fff;

  .play-list-top {
    display: flex;
    padding: 0.15rem 0.1rem;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 0.2rem;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        color: rgb(255, 42, 57);
        width: 0.6rem;
        height: 0.6rem;
      }
      span {
        font-size: 0.24rem;
        color: rgb(56, 51, 51);
        font-weight: 400rem;
        padding: 0 0.05rem;
      }
    }
    .btn {
      background: rgb(241, 5, 5);
      padding: 0.2rem 0.3rem;
      border-radius: 0.3rem;
      color: #fff;
      font-size: 0.2rem;
    }
  }

  .scroll-wrapper {
    height:  calc(100vh - 7.5rem);
    
    /* height: rem; */
    overflow: hidden;

    .play-list-body {
      width: 7.5rem;
      .play-item {
        width: 7.5rem;
        height: 0.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .ind {
          width: 1rem;
          text-align: center;
        }
        .desc {
          width: 4.5rem;
          .title {
            width: 4.5rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            text-align: left;
          }
          .author {
            width: 4.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            line-clamp: 1;
            font-size: 0.22rem;
            color: rgb(197, 186, 186);
          }
        }
        .icons {
          width: 2rem;
          padding: 0 0.2rem;
          display: flex;
          justify-content: space-around;
          .icon {
            width: 0.4rem;
            height: 0.4rem;
          }
        }
      }
    }
  }
}
</style>
