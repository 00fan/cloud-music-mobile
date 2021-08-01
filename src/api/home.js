import request from './request'
export const request_banners=function(){
    return request({
        url:'/banner',
        method:"get",
        params:{
            type:1
        }
    })
}

export const request_music_list=function(limit){
    return request({
        url:'/personalized',
        method:"get",
        params:{
            limit:limit||6
        }
    })
}