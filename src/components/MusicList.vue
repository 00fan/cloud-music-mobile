<template>
  <div class="music-list">
    <div class="music-top">
      <div class="title">发现好歌单</div>
      <div class="more">更多></div>
    </div>
    <div class="wrapper" ref="wrapperRef">
      <div class="content">
        <div class="flex-content">
          <router-link :to="{path:'/listview',query:{id:item.id}}" class="music-item"  v-for="item in musicList" :key="item.id">
          <div class="count">
            <svg class="icon" aria-hidden="true">
              <use
                xlink:href="#icon-iconset0429"
              ></use>
            </svg>
            {{ changeValue(item.playCount) }}
          </div>
          <div>
            <img :src="item.picUrl" />
          </div>
          <p>{{ item.name }}</p>
        </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {changeValue} from '@/utils/util.js'
import { request_music_list } from "@/api/home.js";
import { reactive } from "@vue/reactivity";
const musicList = reactive([]);
request_music_list().then((res) => {
  Object.assign(musicList, res.data.result);
});



//配置滚动
import BScroll from "@better-scroll/core";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
const wrapperRef = ref(null);

onMounted(() => {
  let bs = new BScroll(wrapperRef.value, {
    scrollX:true,
    click:true
  });
});
</script>
<style lang="scss" scoped>
.music-list {
  width: 7.5rem;
  .music-top {
    width: 100%;
    padding: 0.2rem 0.2rem;
    display: flex;
    justify-content: space-between;

    .title {
      font-weight: 900;
    }
    .more {
      padding: 0.05rem 0.2rem;
      height: 100%;
      border-radius: 0.2rem;
      border: #f0e5e5 1px solid;
      font-size: 0.2rem;
    }
  }
  .wrapper {
    width: 7.5rem;
    height: 6rem;
    white-space: nowrap;
    /* overflow: hidden; */
    .content{
      display: inline-block;
      width: 15rem;
    }
    .flex-content {
      width: 7.5rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      a{
        text-decoration: none;
        color: #000;
      }
      .music-item {
        width: 2.5rem;
        padding: 0 0.1rem;
        height: 3rem;
        position: relative;
        img {
          width: 2.3rem;
          height: 2.3rem;
        }

        p {
          font-size: 0.2rem;
          margin-top: 0;
          white-space: normal;
          /* height: 0.5rem; */
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
        }

        .count {
          position: absolute;
          right: 0.2rem;
          top: 0.05rem;
          color: #fff;
          background: rgba($color: #3d3636, $alpha: 0.5);
          border-radius: 0.2rem;
          font-size: 0.2rem;
          font-weight: 300;
          padding: 0.05rem;
        }
      }
    }
  }
}
</style>