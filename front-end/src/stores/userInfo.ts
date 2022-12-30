import { reactive } from 'vue'
import { defineStore } from 'pinia'
import cookie from 'js-cookie'

import { UserInfo } from './interface'
import { userlogin, userlogout } from '@/api/user'

const userInfo: UserInfo = reactive({
  // 暂定一些基本的用户信息
  id: 0,
  token: '',
  username: ''
})

const resetUserInfo = () => {
  userInfo.id = 0
  userInfo.token = ''
  userInfo.username = ''
}

export const useUserInfo = defineStore('user', () => {
  const userLogin = (email:string, password:string) => {
    return new Promise((resolve, reject) => {
      userlogin(email, password)
        .then((res) => {
          if(res.data.code !== 200) reject(res.data.data.msg)
          // 登陆成功后，需要在cookie和storage中保存用户信息。
          const { data } = res.data
          userInfo.token = data.token
          userInfo.username = data.username
          userInfo.id = data.id
          // 存储token到cookie中
          const in30Minutes = 1 / 48
          cookie.set('token', data.token, {
            expires: in30Minutes
          })
          // 存储用户信息到cookie中
          cookie.set('user_name', data.username, {
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