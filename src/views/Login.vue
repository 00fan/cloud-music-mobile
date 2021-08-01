<template>
  <div class="login">
    <div class="top">
      <svg class="icon" aria-hidden="true" @click="$router.push('/')">
        <use xlink:href="#icon-zuojiantou-copy"></use>
      </svg>
    </div>
    <h1>欢迎登录</h1>
    <van-form ref="form" @submit="onSubmit">
      <van-field
        colon
        v-model="phone"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[
          {
            required: true,
            message: '请填写手机号!!!',
          },
          {
            pattern:
              /^1(?:70\d|(?:9[89]|8[0-24-9]|7[135-8]|66|5[0-35-9])\d|3(?:4[0-8]|[0-35-9]\d))\d{7}$/,
            message: '请填写正确手机号!!!',
          },
        ]"
      />
      <van-field
        colon
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码!!!' }]"
      />
      <div style="margin: 0.2rem 1rem">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { ref } from "vue";
import { login } from "@/api/login.js";
import { Notify } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const phone = ref("");
    const password = ref("");
    const form = ref(null);
    const router = useRouter();
    const store = useStore();
    const onSubmit = async function () {
      login(phone.value, password.value)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            Notify({ type: "success", message: "登录成功" });
            store.commit("setIsLogin", true);
            store.commit("setUserInfo", res.data);
            router.push("/me");
          } else {
            if (res.data.msg) {
              Notify({ type: "danger", message: res.data.msg });
            } else {
              Notify({ type: "danger", message: "登录失败" });
            }
          }
        })
        .catch((err) => {
          Notify({ type: "danger", message: "登录失败" });
        });
    };
    return {
      phone,
      password,
      onSubmit,
      form,
    };
  },
};
</script>
<style lang="scss" >
.login {
  text-align: center;
  position: relative;
  background: rgb(219, 67, 7);
  z-index: 999;
  width: 7.5rem;
  height: 100vh;
  overflow: hidden;
  padding: 2rem 1rem 0 1rem;
  .top {
    width: 7.5rem;
    position: fixed;
    left: 1rem;
    top: 1rem;
    text-align: left;
    color: #fff;
    .icon {
      width: 0.4rem;
      height: 0.4rem;
    }
  }
  h1 {
    text-align: center;
    color: #fff;
    font-weight: 800;
    font-size: 0.8rem;
    text-shadow: #fff 2px -2px 2px;
  }
  .van-form {
    /* background: #fff; */
    /* box-shadow: rgb(105, 19, 19) 0 0 10px; */
    /* border: 1px solid #000; */
    .van-field {
      background: transparent;
      color: #fff !important;

      .van-field__error-message {
        color: rgb(153, 122, 19) !important;
      }
      .van-cell__title {
        color: #000;
      }
    }

    .van-button {
      color: #000;
      font-weight: 400;
    }
  }
}
</style>