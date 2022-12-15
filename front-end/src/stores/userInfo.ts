import { reactive } from 'vue'
import { defineStore } from 'pinia'
import cookie from 'js-cookie'

import { UserInfo } from './interface'
import { userlogin, userlogout } from '@/api/user'

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

export const useUserInfo = defineStore('user', () => {
  const userLogin = (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      userlogin(username, password)
        .then((res) => {
          // 登陆成功后，需要在cookie和storage中保存用户信息。
          userInfo.token = res.headers.token
          userInfo.username = res.data.username
          userInfo.role = res.data.role
          userInfo.loginId = res.data.id
          // 存储token到cookie中
          const in30Minutes = 1 / 48
          cookie.set('token', res.data.token, {
            expires: in30Minutes
          })
          // 存储用户信息到cookie中
          cookie.set('user_name', res.data.username, {
            expires: in30Minutes
          });
          resolve(res)
        }).catch(error => {
          reject(error)
        })
    })
  }

  const userLogout = () => {
    return new Promise((resolve, reject) => {
      userlogout().then((res) => {
        resetUserInfo()
        cookie.remove('token')
        cookie.remove('user_name')
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }

  return { userInfo, userLogin, userLogout, resetUserInfo }
})