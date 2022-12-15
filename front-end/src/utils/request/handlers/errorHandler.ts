function errorHandler(error:any) {
  // 需要后端确认接口的报错方式。
  if (error.response) {
    // 处理状态码类报错
    // 统一处理状态码 403、500这类的
    switch (error.response.status) {
    default:
      error.message = error.response.data.message
    }
  } else {
    // 返回无返回体时(如请求超时),补全数据格式
    error.message = '请求错误'
  }
  return Promise.reject(error)
}

export default errorHandler;