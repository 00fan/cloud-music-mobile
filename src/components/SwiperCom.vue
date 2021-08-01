<template>
  <div class="swiper-com">
    <!-- <el-carousel height="150px" arrow="never">
      <el-carousel-item v-for="item in banner" :key="item">
        <img :src="item.pic"/>
      </el-carousel-item>
    </el-carousel> -->
    <van-swipe class="my-swipe"  :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banner" :key="item">
        <img  lazy-load :src="item.pic"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script setup>
import { reactive } from "@vue/reactivity";
import { request_banners } from "../api/home.js";

const banner = reactive([]);
request_banners().then((res) => {
  Object.assign(banner, res.data.banners);
});
</script>
<style lang='scss' scope>
.swiper-com {
  width: 7.5rem;
}
.my-swipe{
  height: 3rem;
}

img {
  width: 100%;
  padding: 0 0.1rem;
  border-radius: 0.2rem;
}
</style>