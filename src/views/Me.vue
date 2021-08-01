<template>
  <div class="me">
    <img class="bg" :src="userInfo.profile.backgroundUrl">
    <div class="top">
      <div class="top-left">
        <svg class="icon" aria-hidden="true" @click="$router.push('/')">
          <use xlink:href="#icon-zuojiantou-copy"></use>
        </svg>
      </div>
      <div class="top-center">{{ userInfo.profile.nickname }}</div>
      <div class="top-right" @click="$router.push('/search')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-dian"></use>
        </svg>
      </div>
    </div>
    <div class="header">
      <img :src="userInfo.profile.avatarUrl" />
      <div class="info">
        <div class="followeds">
          <div>{{ userInfo.profile.followeds }}</div>
          <div class="tit">粉丝</div>
        </div>
        <div class="follows">
          <div>{{ userInfo.profile.follows }}</div>
          <div class="tit">关注</div>
        </div>
      </div>
    </div>
    <div class="per-info">
      <div class="header">基本信息</div>
      <div class="item"><span>村龄</span>
      {{new Date().getYear()-new Date(userInfo.account.createTime).getYear()}}年
      {{new Date(userInfo.account.createTime).toLocaleDateString()}}</div>
      <div class="item"><span>性别</span>{{userInfo.profile.gender==1?'男':'女'}}</div>
      <div class="item"><span>地区</span>中国</div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();
    const userInfo = computed(() => {
      return store.state.user.userInfo;
    });

    return {
      userInfo,
    };
  },
};
</script>
<style lang="scss" scoped>
.me {
  width: 7.5rem;
  color: #fff;
  overflow: hidden;
  height: 100vh;
  .bg{
    width: 7.5rem;
    position: fixed;
    left: 0;
    top:0;
    z-index: -1;
    padding: 0;
    height: 100vh;
  }
  .top {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    .top-left {
      padding: 0 0.2rem;
    }
    .top-center {
      flex: 1;
    }
    .top-right {
      padding: 0 0.2rem;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    img {
      width: 1.5rem;
      border-radius: 50%;
      margin: 0 0.5rem;
    }
    .info {
      display: flex;
      justify-content: space-between;
      text-align: center;
      align-items: center;
      flex: 1;
      padding: 0 1rem;
      .followeds , .follows {
        .tit{
          font-size: 0.2rem;
        }
      }
    }
  }
  .per-info{
    background: #fff;
    
    color: #000;
    height: calc(100vh - .5rem);
    padding: .5rem 0 0 0.5rem;
    .header{
      font-size: 0.3rem;
    }
    .item{
      padding: 0.1rem 0;
      font-size: 0.2rem;
      span{
        padding: 0 0.2rem;
      }
    }
  }
}
</style>
