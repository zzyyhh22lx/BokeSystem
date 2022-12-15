import type { AxiosRequestConfig } from 'axios'
import cookie from 'js-cookie'

function requestInterceptor(config: AxiosRequestConfig) {
  // 需要和后端确认token配置方式。
  // 获取token后，根据接口格式，将用户token添加到报文中。
  const token = cookie.get('token');
  if(token && typeof config.headers !== 'undefined'){
    config.headers.auth = token
    config.headers['Access-Control-Allow-Origin'] = '*'
  }

  return config;
};

export default requestInterceptor;