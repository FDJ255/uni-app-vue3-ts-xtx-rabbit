import { useMemberStore } from '@/stores'
// 基础接口地址
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加请求拦截器
const requestInterceptors = {
  // 拦截前触发 - 不像Axios那样封装后可以不用直接添加拼接操作
  invoke(config: UniApp.RequestOptions) {
    // 1、非HTTP开头的url，需要拼接基础接口地址
    if (!config.url.startsWith('http')) {
      config.url = baseURL + config.url
    }
    // 2、请求超时，默认60s
    config.timeout = 10000

    // 3、添加请求头
    config.header = {
      ...config.header,
      'source-client': 'miniapp',
    }

    // 4、添加token请求标识
    const MemberStore = useMemberStore()
    const token = MemberStore.profile?.token
    if (token) {
      config.header.Authorization = token
    }
    console.log('请求对象:', config)
  },
}

// 将请求拦截器 挂载到 uni 上 - 并命名为 request
uni.addInterceptor('request', requestInterceptors)
// 将请求拦截器 挂载到 uni 上 - 并命名为 uploadFile
uni.addInterceptor('uploadFile', requestInterceptors)

interface Data<T> {
  code: string
  msg: string
  result: T
}

// 封装发送请求方法 - 类似Axios封装
export const request = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 请求成功 - 业务成功
      success(res) {
        if (res.statusCode <= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 401 未登录
          const MemberStore = useMemberStore()
          // 清除用户信息
          MemberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/index' })
          reject((res.data as Data<T>).msg)
        } else {
          uni.showToast({
            title: (res.data as Data<T>).msg || '请求失败',
            icon: 'none',
          })
          reject((res.data as Data<T>).msg)
        }
      },

      // 请求失败 - 网络等原因
      fail(err) {
        uni.showToast({
          title: '网络错误',
          icon: 'none',
        })
        reject(err)
      },
    })
  })
}
