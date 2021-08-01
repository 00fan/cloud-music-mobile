import request from './request'
export const request_playlist=function(id,s){
    return request({
        url:'/playlist/detail',
        method:"get",
        params:{
            id,
            s:s||8
        }
    })
}