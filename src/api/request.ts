import Axios from 'axios'

// 创建 axios 实例
const Service = Axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '',
  timeout: 20000,
  withCredentials: true,
  maxContentLength: 2000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

Service.interceptors.request.use(
  requestObj => {
    return requestObj
  },
  error => {
    return Promise.reject(new Error(error))
  }
)

Service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (Axios.isCancel(error)) {
      // 本次请求已手动取消
      if (!error.message) {
        // 若没有传入取消 cancelReson，则使用默认
        error.message = 'REQUEST_MANUAL_CANCEL: This request has been manually cancelled'
      }
      // 使用 resolve 是因为此时为手动取消请求，而不是请求失败
      return Promise.resolve(error)
    }

    return Promise.reject(error)
  }
)

// export
export default Service
