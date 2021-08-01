import request from './request'
export const login=function(phone,password){
    return request({
        url:'/login/cellphone',
        method:"post",
        data:{
            phone,
            password
        }
    })
}