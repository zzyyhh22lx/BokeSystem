import createAxios from '@/utils/request/axios';

const api = {
  userLogin: '/test/login/',
  userLogout: '/test/logout'
}

export function userlogin(username: string, password: string) {
  return createAxios({
    url: api.userLogin,
    method: 'post',
    data: {
      username,
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
