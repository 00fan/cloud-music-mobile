<template>
  <router-view />
  <play></play>
</template>
<script setup>
import { onMounted,watch } from "vue";
import store from "./store/index.js";
import Play from "./views/Play";
onMounted(() => {
  if( JSON.parse(localStorage.getItem('user'))){
      store.commit("setUser", JSON.parse(localStorage.getItem('user')));
  }
});
watch(store.state.user,()=>{
  console.log('wa')
  localStorage.setItem('user',JSON.stringify(store.state.user))
})
</script>
<style lang="scss">
</style>
