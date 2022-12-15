import { reactive } from 'vue'
import { defineStore } from 'pinia'

import { UserInfo } from './interface/index'
import { userlogin } from '@/api/user/index'

export const useUserInfo = defineStore('user', () => {
  const userInfo: UserInfo = reactive({
    // 暂定一些基本的用户信息
    loginId:'',
    token: '',
    username: '',
    role: '',
  })

  const resetUserInfo = () => {
    userInfo.loginId = ''
    userInfo.token = ''
    userInfo.username = ''
    userInfo.role = ''
  }

  const userLogin = (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      userlogin(username, password)
        .then((res) => {
          // 登陆成功后，需要在cookie和storage中保存用户信息。
          userInfo.token = res.headers.token
          userInfo.username = res.data.data.username
          userInfo.role = res.data.data.role
          userInfo.loginId = res.data.data.id
          // 存储token到cookie中，待实现
          // 存储用户信息到cookie中，待实现
          resolve(res)
        }).catch(error => {
          reject(error)
        })
    })
  }

  return { userInfo, userLogin, resetUserInfo }
})