<template>
  <div class="top-nav">
    <div class="top">
      <div class="top-left">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou-copy"></use>
        </svg>
      </div>
      <div class="top-right">
        <input
          placeholder="陈奕迅"
          v-model="curKeyword"
          @keydown.enter="saveKeyword"
        />
      </div>
    </div>
    <div class="history">
      <div class="history-left">历史</div>
      <div class="history-right">
        <span
          @click="historyClick(item)"
          v-for="(item, i) in keywordList"
          :key="item"
          >{{ item }}</span
        >
      </div>
    </div>
    <div class="hots" v-show="show">
      <div
        @click="historyClick(item.first)"
        class="hots-item"
        v-for="(item, i) in musicListHots"
        :key="item.name"
      >
        <span>{{ i + 1 }}</span
        >{{ item.first }}
      </div>
    </div>
    <div class="search-list" v-show="!show">
      <div class="scroll-wrapper" ref="wrapper">
        <div class="content">
          <div class="play-item" v-for="(item, i) in musicList" :key="item.id">
            <div class="ind">{{ i + 1 }}</div>
            <div class="desc">
              <div class="title">{{ item.name }}</div>
              <div class="author">
                <span v-for="i in item.artists" :key="i.id">{{ i.name }}</span>
              </div>
            </div>

            <div class="icons">
              <svg class="icon" aria-hidden="true" @click="playClick(item)">
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
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import { ref, reactive, toRef } from "@vue/reactivity";
import {
  requst_search_music,
  requst_search_music_hot,
  requst_detail,
} from "@/api/search.js";
import { onMounted, onUpdated } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const keywordList = ref(JSON.parse(localStorage.getItem("keyword")) || []);
    const curKeyword = ref("");
    const saveKeyword = function () {
      if (curKeyword.value) {
        show.value = false;
        searchMusic();
        //存储local
        keywordList.value.push(curKeyword.value);
        if (keywordList.value.length >= 10) {
          keywordList.value.shift();
        }
        // curKeyword.value = "";

        localStorage.setItem(
          "keyword",
          JSON.stringify([...new Set(keywordList.value)])
        );
        keywordList.value = JSON.parse(localStorage.getItem("keyword"));
      }
    };
    const historyClick = function (item) {
      curKeyword.value = item;
      saveKeyword();
    };
    //scroll
    const wrapper = ref(null);
    let bs;
    onMounted(() => {
      bs = new BScroll(wrapper.value, {
        click: true,
      });
    });
    onUpdated(() => {
      bs.refresh();
    });
    const musicListHots = reactive([]);
    const show = ref(true);
    requst_search_music_hot().then((res) => {
      Object.assign(musicListHots, res.data.result.hots);
    });
    const musicList = reactive([]);
    const searchMusic = function () {
      requst_search_music(curKeyword.value).then((res) => {
        Object.assign(musicList, res.data.result.songs);
      });
    };

    //播放
    const store = useStore();
    const playClick = function (item) {
      requst_detail(item.id).then((res) => {
        item.al = res.data.songs[0].al;
        store.commit("pushPlayList", item);
        store.commit("setplayCurrentIndex", store.state.playlist.length - 1);
      });
    };
    return {
      curKeyword,
      saveKeyword,
      keywordList,
      musicList,
      musicListHots,
      show,
      wrapper,
      playClick,
      historyClick,
    };
  },
};
</script>
<style lang='scss'  scoped>
.top-nav {
  width: 7.5rem;
  height: 1rem;
  padding: 0 0.2rem;
  .top {
    display: flex;
    height: 1.2rem;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      color: rgb(60, 61, 59);
    }

    .top-right {
      width: 6rem;
      overflow: hidden;
      padding: 0 0.4rem;
      input {
        width: 100%;
        border: none;
        outline: none;
        border-bottom: 1px solid #000;
      }
    }
  }

  .history {
    display: flex;
    justify-content: flex-start;
    padding: 0 0 0.1rem 0;
    .history-left {
      flex: none;
      text-align: center;
      width: 0.8rem;
      height: 0.8rem;
      font-weight: 900;
    }
    .history-right {
      /* width: 5.7rem; */
      color: #666;
      overflow: hidden;
      /* text-overflow: ellipsis; */
      max-height: 2rem;
      word-wrap: break-word;
      span {
        background: #eee;
        height: 0.5rem;
        font-size: 0.3rem;
        padding: 0.1rem 0.2rem;
        display: inline-block;
        border-radius: 0.2rem;
        margin: 0 0.01rem;
      }
    }
  }
  .hots {
    /* width: 7.5rem; */
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;
    .hots-item {
      text-align: center;
      width: 50%;
      height: 0.6rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgb(194, 23, 23);
      font-weight: 900;
      padding: 0.1rem 0.2rem;
      span {
        float: left;
      }
    }
  }
  .scroll-wrapper {
    height: calc(100vh - 2.5rem);

    color: brown;

    /* height: rem; */
    overflow: hidden;

    .content {
      padding: 0.3rem 0;
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