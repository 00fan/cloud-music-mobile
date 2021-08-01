<template>
  <div class="list-view-top">
    <img class="bg" :src="props.playlist.coverImgUrl" />
    <div class="list-view-top-nav">
      <div class="back">
        <svg class="icon" aria-hidden="true" @click="route.back">
          <use xlink:href="#icon-zuojiantou-copy"></use>
        </svg>
        <div class="title">歌单</div>
      </div>
      <div class="right">
        <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-dian"></use>
        </svg>
      </div>
    </div>
    <div class="content">
      <div class="content-left">
        <div class="count">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-iconset0429"></use>
          </svg>
          {{ changeValue(playlist.playCount) }}
        </div>
        <van-image   class="pic" :src="props.playlist.coverImgUrl" ></van-image>
      </div>
      <div class="content-right">
        <h3 class="title">{{ playlist.name }}</h3>
        <div class="author">
          <van-image
            class="header"
            :src="playlist.creator && playlist.creator.avatarUrl"
          >
          </van-image>
          <span>{{ playlist.creator && playlist.creator.nickname }}</span>
        </div>
        <div class="desc">
          {{ playlist.description }}
        </div>
      </div>
    </div>
    <div class="icon-list">
      <div class="icon-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liaotian"></use>
        </svg>
        <div>{{playlist.commentCount}}</div>
      </div>
      <div class="icon-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <div>{{playlist.shareCount}}</div>
      </div>
      <div class="icon-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <div>下载</div>
      </div>
      <div class="icon-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-chenggong"></use>
        </svg>
        <div>多选</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { changeValue } from "@/utils/util.js";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  playlist: {},
});

const route = useRouter();

</script>

<style lang="scss" scoped>
.list-view-top {
  height:4.9rem;
  .bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 7.5rem;
    filter: blur(20px);
    z-index: -1;
  }
  .list-view-top-nav {
    width: 7.5rem;
    padding: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    height: 0.8rem;
    align-items: center;
    color: #fff;
    .back {
      display: flex;
      justify-content: space-between;
      width: 1.5rem;
    }
    .right {
      display: flex;
      justify-content: space-between;
      width: 1rem;
    }
  }

  .content {
    height:3rem;
    display: flex;
    justify-content: space-between;
    .content-left {
      position: relative;
      margin: 0.3rem 0 0rem .5rem;
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
      .pic {
        width: 2.5rem;
        height: 2.5rem;
      }
    }
    .content-right {
      width: 4rem;
      padding: .3rem 0.2rem  0 0;
      .title{
        margin: 0;
        color: #fff;
        font-family:'Times New Roman', Times, serif
     }
      .author {
        height: 0.85rem;
        display: flex;
        align-items: center;
        font-size: 0.3rem;
        text-overflow: ellipsis;
        padding: 0.25rem 0;
        .header {
          width: 0.6rem;
          height: 0.6rem;
        }
      }
      .desc {
        /* padding: 0.5rem 0rem 0rem; */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }

  .icon-list{
    width: 7.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #FFF;
    font-size: 0.2rem;
    text-align: center;
    .icon-item{
      width: 25%;
      .icon{
        width: 0.5rem;
        height: 0.5rem;
        padding: 0.1rem 0;
      }
    }
  }
}
</style>