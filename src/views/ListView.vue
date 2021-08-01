<template>
    <div class="listview">
        <list-view-top :playlist="list.playlist"></list-view-top>

        <a-d></a-d>
        <play-list :playlist="list.playlist"></play-list>
    </div>
</template>
<script setup>
import ListViewTop from './ListViewCmps/ListViewTop'
import PlayList from './ListViewCmps/PlayList'
import AD from '@/components/cmps/AD.vue'

import {request_playlist} from '@/api/listview'
import {useRoute} from 'vue-router'
import { reactive } from '@vue/reactivity'
import {useStore} from 'vuex'


const route=useRoute()
const store=useStore()
const list=reactive({
    playlist:{},
    privileges:[]
})
request_playlist(route.query.id).then(res=>{
    list.playlist=res.data.playlist;
    list.privileges=res.data.privileges;
    store.commit('setPlayList',res.data.playlist.tracks)

})

</script>
<style lang="scss" scoped>
.listview{
    width: 7.5rem;
}
</style>