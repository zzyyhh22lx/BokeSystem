import type { AxiosRequestConfig } from 'axios'

function responseInterceptor(config: AxiosRequestConfig) {
  // 需要和后端确认是否使用data中的code来表示错误。
  const responseCode = config.data.code
  if (responseCode) {
    switch (responseCode) {
    case 401:
      throw {
        type: 'error',
        message: config.data.message || '认证错误'
      }
    }
  }
  return config
}

export default responseInterceptor
