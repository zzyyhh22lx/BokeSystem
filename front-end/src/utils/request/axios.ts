import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import requestInterceptor from './handlers/requestInterceptor'
import responseInterceptor from './handlers/responseInterceptor'
import errorHandler from './handlers/errorHandler'

function createAxios(axiosConfig: AxiosRequestConfig){
  const request = axios.create({
    // process.env.APP_API_BASE_URL, 在环境变量中可以配置不同请求地址
    baseURL: '/api',
    timeout: 10000
  })

  // 请求拦截器
  request.interceptors.request.use(requestInterceptor, errorHandler)
  // 响应拦截器
  request.interceptors.response.use(responseInterceptor, errorHandler)

  return request(axiosConfig)
}

export default createAxios