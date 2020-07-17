import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
// import Router from 'router/router'
import Store from 'store/store'
import qs from 'qs'
import CONFIG from 'config'
Vue.use(Vuex)

const store = Store()
// 添加请求拦截器

axios.interceptors.request.use((config) => {
  // 请求开始时 显示loading动画 dsafas
  return config
}, (error) => {
  return Promise.reject(error)
})


// 响应拦截器
axios.interceptors.response.use(res => {
  return res.data
}, error => {
  // 响应失败
  
  return Promise.reject(error.response)
})

// 封装post请求
export const httpPost = (params) => {
  return axios.post(CONFIG.wechat.apiUrl +  params.url, qs.stringify(params.data), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  })
}

// 文件上传
export const httpBinPost = (params) => {
  return axios.post(CONFIG.wechat.apiUrl +  params.url, params.data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
// get请求
export const httpGet = (params) => {
  return axios.get(CONFIG.wechat.apiUrl + params.url, {
    params: params.data
  })
}
