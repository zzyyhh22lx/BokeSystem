import createAxios from '@/utils/request/axios';

const api = {
  userLogin: '/users/login',
  userLogout: '/users/logout',
  userRegister: '/users/register',
  userGetCapcha: '/users/getcaptcha',
  userVisit: '/users/visit'
}

export function userVisit() {
  return createAxios({
    url: api.userVisit,
    method: 'get'
  })
}

export function userlogin(email: string, password: string) {
  return createAxios({
    url: api.userLogin,
    method: 'post',
    data: {
      email,
      password
    }
  })
}

export function userlogout() {
  return createAxios({
    url: api.userLogout,
    method: 'post',
  })
}

export function userregister(email: string, password: string, captcha:string) {
  return createAxios({
    url: api.userRegister,
    method: 'post',
    data: {
      email,
      password,
      captcha
    }
  })
}

export function userGetCapcha(email: string) {
  return createAxios({
    url: api.userGetCapcha,
    method: 'post',
    data: {
      email
    }
  })
}