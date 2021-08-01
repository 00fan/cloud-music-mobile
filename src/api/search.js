import request from './request'
export const requst_search_music=function(keywords){
    return request({
        url:'search',
        method:"get",
        params:{
            keywords
        }
    })
}
export const requst_search_music_hot=function(){
    return request({
        url:'search/hot',
        method:"get",
    })
}

export const requst_detail=function(ids){
    return request({
        url:'song/detail',
        method:"get",
        params:{
            ids
        }
    })
}