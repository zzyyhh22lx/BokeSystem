import type { AxiosRequestConfig } from 'axios'
function requestInterceptor(config: AxiosRequestConfig) {
  // 需要和后端确认token配置方式。
  // 获取token后，根据接口格式，将用户token添加到报文中。
  // if(token){
  //   config.headers.auth = token
  // }

  return config;
};

export default requestInterceptor;