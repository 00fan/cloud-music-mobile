<template>
  <div class="play">
    <div class="left">
      <img
        :src="
          playlist[playCurrentIndex] && playlist[playCurrentIndex].al.picUrl
        "
      />
      <div class="content" @click="show = !show">
        <div class="title">
          {{ playlist[playCurrentIndex] && playlist[playCurrentIndex].al.name }}
        </div>
        <div class="tips">横滑可以切上下首歌曲</div>
      </div>
    </div>
    <div class="right">
      <svg v-if="!paused" class="icon" aria-hidden="true" @click="playClick">
        <use xlink:href="#icon-pause"></use>
      </svg>
      <svg v-else class="icon" aria-hidden="true" @click="playClick">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <play-detail
      :paused="paused"
      :play="playClick"
      v-show="show"
      @back="show = !show"
      :playDetail="playlist[playCurrentIndex]"
      :curTime="curTime"
      :show="show"
    ></play-detail>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${
            playlist[playCurrentIndex].id
          }.mp3`"></audio>
  </div>
</template>
<script>
import PlayDetail from "./PlayCmps/PlayDetail";
import { computed, nextTick, onMounted, onUpdated, watch } from "vue";
import { requst_music, check_music } from "@/api/play.js";
import { ref, toRef } from "@vue/reactivity";
import { useStore, mapState, mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  setup(props) {
    const store = useStore();
    const playlist = computed(() => {
      return store.state.playlist;
    });
    const playCurrentIndex = computed(() => {
      return store.state.playCurrentIndex;
    });

    //音乐控制
    const audio = ref(null);
    const paused = ref(true);

    const playClick = function () {
      if (audio.value.paused) {
        audio.value.play();
        paused.value = false;
      } else {
        audio.value.pause();
        paused.value = true;
      }
    };
    watch(
      playCurrentIndex,
      (now, pre) => {
        nextTick(() => {
          playClick();
        });
      },
      {
        deep: true,
      }
    );

    //check music
    const audioSrc = ref("");

    // const check = function () {
    //   check_music(playlist.value[playCurrentIndex.value].id).then((res) => {
    //     if (res.data.success) {

    //       audioSrc.value = `https://music.163.com/song/media/outer/url?id=${ playlist.value[playCurrentIndex.value].id}.mp3`;
    //       console.log(audioSrc.value)
    //     } else {
    //       Toast.fail(res.data.message);
    //     }
    //   }).catch((err)=>{
    //     console.log(err)
    //     Toast.fail(res.data.message);
    //   });
    // };
    //展现详情
    const show = ref(false);

    //获取歌词
    let curName=playlist.value[playCurrentIndex.value].name
    watch(
      [playlist, playCurrentIndex],
      (cur,pre) => {
        if(pre[1]<10){
          paused.value=true;
          if(curName==cur[0][cur[1]].name){
            paused.value=false;

          }
        }
        curName=playlist.value[playCurrentIndex.value].name
        if (playlist.value[playCurrentIndex.value]) {
          store.dispatch("reqLyric", {
            id: playlist.value[playCurrentIndex.value].id,
          });
          audioSrc.value = `https://music.163.com/song/media/outer/url?id=${
            playlist.value[playCurrentIndex.value].id
          }.mp3`;
        }
      },
      {
        // immediate: true,
        deep:true
      }
    );

    //播放时间
    const curTime = ref(0);
    nextTick(() => {
      audio.value.addEventListener("timeupdate", (event) => {
        curTime.value = audio.value.currentTime;
      });
    });
    return {
      playlist,
      playCurrentIndex,
      playClick,
      audio,
      paused,
      show,
      curTime,
      audioSrc,
    };
  },
  // computed:{
  //     ...mapState({
  //         playlist:'playlist',
  //         playCurrentIndex:'playCurrentIndex'
  //     })
  // }
  components: {
    PlayDetail,
  },
};
</script>
<style lang="scss" scoped>
.play {
  width: 7.5rem;
  height: 1rem;
  padding: 0.1rem 0 0 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 999;
  bottom: 0;
  background: #fff;
  border-top: 1px solid rgb(156, 152, 152);
  .left {
    display: flex;
    align-items: center;
    width: 4.5rem;
    padding: 0 0.4rem 0 0;
    overflow: hidden;
    img {
      width: 1rem;
    }
    .tips {
      font-size: 0.2rem;
      height: 0.2rem;
    }
    .title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .right {
    width: 2.5rem;
    padding: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>