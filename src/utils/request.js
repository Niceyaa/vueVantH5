import axios from 'axios'
// import store from '@/store'
import qs from 'qs'

const service = axios.create({
  // baseURL: 'http://192.168.2.31:35001',
  baseURL: '/jiekou_api',
  timeout: 15000
})

service.interceptors.request.use(
  config => {
    return config
  }, error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response
  }
)

export default service
