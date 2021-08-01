<template>
  <div class="home">
    <top-nav></top-nav>
    <swiper-com></swiper-com>
    <icon-list></icon-list>
    <music-list></music-list>
    <div class="footer-wrap">
      <span class="load">
        <a
          href="#"
          download="https://d1.music.126.net/dmusic/NeteaseCloudMusic_Music_official_8.2.60.210720173014.apk"
          >打开</a
        >
      </span>
      <span class="load">
        <a
          href="#"
          download="https://d1.music.126.net/dmusic/NeteaseCloudMusic_Music_official_8.2.60.210720173014.apk"
          >下载</a
        >
      </span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from "@/components/TopNav.vue";
import SwiperCom from "@/components/SwiperCom.vue";
import IconList from "@/components/IconList.vue";
import MusicList from "@/components/MusicList";

export default {
  name: "Home",
  components: {
    TopNav,
    SwiperCom,
    IconList,
    MusicList,
  },
};
</script>
<style lang='scss' scoped>
.home {
  height: calc(100vh - 1rem);
  position: relative;
  overflow: hidden;
}
.footer-wrap {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  width: 7.5rem;
  padding: 0.1rem 0;
  background: #fff;
}
.load {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: 1px solid rgb(255, 58, 58);
  border-radius: 40px;
  font-size: 18px;
  text-align: center;
  background: transparent;
  color: rgb(255, 58, 58);
  a{
    color: rgb(255, 58, 58);
  }
}
</style>
