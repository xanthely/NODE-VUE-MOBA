import axios from 'axios'
import Vue from 'vue'
import router from './router/index'

const http = axios.create({
  baseURL:'http://localhost:3000/admin/api'
})

// 在请求头加上token验证
http.interceptors.request.use(function (config) {
    // 如果有token才在请求头增加Authorization
    if(localStorage.token)
    {
      config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 通用错误处理
// 给http请求响应加一个拦截器
http.interceptors.response.use(res => {
  return res
},err => {
  if(err.response.data.message)
  {
    Vue.prototype.$message({
      type:'error',
      message:err.response.data.message
    })

    // 跳回登录页
    if(err.response.status === 401){
      router.push('/login')
    }
  }

  return Promise.reject(err)
})

export default http