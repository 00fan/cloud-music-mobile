import { createStore } from 'vuex'
import { requst_lyric } from '@/api/play.js'

export default createStore({
  state: {
    playlist: [{ "name": "Black Suit", "id": 1336871640, "pst": 0, "t": 0, "ar": [{ "id": 31354187, "name": "KVPV", "tns": [], "alias": [] }], "alia": [], "pop": 100, "st": 0, "rt": null, "fee": 0, "v": 4, "crbt": null, "cf": "", "al": { "id": 75017011, "name": "Black Suit", "picUrl": "http://p4.music.126.net/ZlVTirHPO2pueRbd_tviGw==/109951163818964377.jpg", "tns": [], "pic_str": "109951163818964377", "pic": 109951163818964380 }, "dt": 205139, "h": { "br": 320000, "fid": 0, "size": 8207717, "vd": 0 }, "m": { "br": 192000, "fid": 0, "size": 4924648, "vd": 0 }, "l": { "br": 128000, "fid": 0, "size": 3283113, "vd": 0 }, "a": null, "cd": "1", "no": 1, "rtUrl": null, "ftype": 0, "rtUrls": [], "djId": 0, "copyright": 2, "s_id": 0, "mark": 0, "originCoverType": 0, "originSongSimpleData": null, "single": 0, "noCopyrightRcmd": null, "rtype": 0, "rurl": null, "mst": 9, "cp": 0, "mv": 0, "publishTime": 1515859200007 }],
    playCurrentIndex: 0,
    lyric: "",
    user:{
      isLogin:false,
      userInfo:{}
    }
  },
  mutations: {
    setPlayList(state, value) {
      Object.assign(state.playlist,value)
    },
    pushPlayList(state, value) {
      state.playlist.push(value);
      // if(state.playlist.length>11){
      //   state.playlist.shift()
      // }
      // console.log(state.playlist)
    },
    setplayCurrentIndex(state, i) {
      state.playCurrentIndex = i;
    },
    setLyric(state, lyric) {
      state.lyric = lyric
    },

    setIsLogin(state,value){
      state.user.isLogin=value;

    },
    setUserInfo(state,playload){
      state.user.userInfo=playload;
    },
    setUser(state,playload){
      state.user=playload;
    }
  },
  actions: {
    async reqLyric(context, playload) {
      let res = await requst_lyric(playload.id)
      if (res.data.lrc) {
        context.commit('setLyric', res.data.lrc.lyric)
      } else {
        console.log('无歌词')
        context.commit('setLyric', "无歌词")
      }

    }
  },
  modules: {
  }
})
