<template>
  <div class="play-detail">
    <img class="bg" :src="playDetail.al.picUrl" />
    <div class="play-top">
      <svg class="icon" aria-hidden="true" @click="emit('back')">
        <use xlink:href="#icon-zuojiantou-copy"></use>
      </svg>
      <div>
        {{ playDetail.name }}
      </div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
    <div class="play-content" v-show="!isLyric"  @click="isLyric=!isLyric">
      <img
        class="header"
        :class="[!paused ? 'ro' : '']"
        :src="playDetail.al.picUrl"
      />
      <img
        class="needle"
        :class="[!paused ? 'playing' : '']"
        src="./../../assets/images/needle-ab.png"
      />
    </div>
    <div class="play-lyric" ref="wrapper" v-show="isLyric" @click="isLyric=!isLyric">
      <div class="content">
        <p
          :class="{ active: active(i) }"
          v-for="(item, i) in lyricArr"
          :key="item"
        >
          {{ item.lyric }}
        </p>
      </div>
    </div>
    <div class="play-footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="change(-1)">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>
      <svg class="icon play" v-if="!paused" aria-hidden="true" @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon play" v-else aria-hidden="true" @click="play">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true"  @click="change(1)">
        <use xlink:href="#icon-shangyishou1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
  </div>
</template>
<script>
import {
  toRefs,
  ref,
  computed,
  watch,
  onMounted,
  onUpdated,
  nextTick,
  toRef,
} from "vue";
import { useStore } from "vuex";
import BScroll from "@better-scroll/core";
export default {
  props: {
    playDetail: {},
    paused: Boolean,
    play: null,
    // paused:true,
    curTime: 0,
    show: Boolean,
  },
  setup(props, { emit }) {
    const store = useStore();
    const isLyric = ref(true);

    const lyricArr = computed(() => {
      return store.state.lyric.split(/\n/).map((item, i) => {
        let min = item.slice(1, 3);
        let sec = item.slice(4, 6);
        let mill = item.slice(7, 10);
        let lyric = item.slice(11);
        return {
          min,
          sec,
          mill,
          lyric,
          content: item,
          time:
            parseInt(mill) + parseInt(sec) * 1000 + parseInt(min) * 60 * 1000,
        };
      });
    });
    const active = function (i) {
      return (
        ++i ==
        lyricArr.value.findIndex((item) => {
          return item.time > props.curTime * 1000;
        })
      );
    };
    const wrapper = ref(null);
    let bs;
    onMounted(() => {
      bs = new BScroll(wrapper.value, {
        scrollY: true,
        click: true,
        probeType: 3,
      });
      // bs.on("scroll", (position) => {
      //   console.log(position.x, position.y);
      // });
    });
    const show = toRef(props, "show");
    watch(
      [lyricArr, show],
      () => {
        nextTick(() => {
          bs.refresh();
          try {
            bs.scrollToElement('.active', 3000, true, true, 'easing')
          } catch (error) {
            
          }
        });
      },
      {
        // immediate: true,
      }
    );
    const change=function(num){
      let i=store.state.playCurrentIndex+num;
      if(i<0){
        i=store.state.playlist.length-1;
      }else if(i>=store.state.playlist.length){
        i=0;
      }
      store.commit('setplayCurrentIndex',i)
    }
    return {
      ...toRefs(props),
      emit,

      //歌词
      isLyric,
      lyricArr,
      active,

      wrapper,
      change
    };
  },
};
</script>
<style lang="scss" scoped>
.play-detail {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 0;
  width: 7.5rem;
  height: 100vh;
  background: #000;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 7.5rem;
    height: 100vh;
    padding: 0;
    filter: blur(30px);
  }
  .play-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    height: 1rem;
    padding: 0 0.5rem;
    font-weight: 500;
  }
  .play-content {
    width: 7.5rem;
    height: 7rem;
    background: url("../../assets/images/playbg.png") no-repeat 50% 50%;
    position: relative;
    padding: 1rem 0;
    .header {
      width: 2.5rem;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .ro {
      animation: ro 10s linear infinite;
    }
    @keyframes ro {
      0% {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
    .needle {
      width: 2.5rem;
      position: relative;
      left: 50%;
      top: 30%;
      transform: translate(-40%, -50%) rotate(-40deg);
      transform-origin: 0 0;
      transition: all 0.5s linear;
    }
    .playing {
      transform: translate(-40%, -50%);
    }
  }
  .play-lyric {
    text-align: center;
    color: rgba(255, 255, 255, 0.795);
    overflow: scroll;
    height: calc(100vh - 3.5rem) ;
    width: 7.5rem;
    padding: 1rem 0;
    font-size: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    .content {
      padding: 25% 0;
      p {
        height: 0.25rem;
      }
      .active {
        color: rgb(238, 9, 9);
        font-weight: 800;
        font-size: 0.35rem;
        height: 0.35rem;
      }
    }
  }
  .play-footer {
    width: 7.5rem;
    height: 1.5rem;
    position: fixed;
    padding: 0.1rem 0;
    bottom: 0rem;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.4rem;
    .icon {
      fill: #fff;
      width: 0.4rem;
      height: 0.4rem;
    }
    .play {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
</style>