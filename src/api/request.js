import axios from 'axios'
const instance=axios.create({
    baseURL:'http://121.4.252.64:3000/'
})
const request=function(config){
    return instance(config)
}
export default request;