import request from './request'
export const requst_music=function(id){
    return request({
        url:'song/url',
        method:"get",
        params:{
            id
        }
    })
}

export const requst_lyric=function(id){
    return request({
        url:'/lyric',
        method:"get",
        params:{
            id
        }
    })
}

export const check_music=function(id){
    return request({
        url:'/check/music',
        method:"get",
        params:{
            id
        }
    })
}