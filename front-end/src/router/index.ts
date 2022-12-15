import { createRouter, createWebHistory, RouteRecordName } from 'vue-router'
import cookie from 'js-cookie'
import { staticRoutes, asyncRoutes } from './static'

const allowList:RouteRecordName[] = ['login']
const loginRoute = '/user/login'
const indexRoute = '/index'

const router = createRouter({
  history: createWebHistory(),
  routes: [...staticRoutes, ...asyncRoutes],
})
// todo，加载路由后，根据用户role进行过滤

router.beforeEach((to, from, next) => {
  const token = cookie.get('token');
  if (token && token !== 'undefined') {
    if (to.path === loginRoute) {
      next({ path: indexRoute });
    } else {
      // todo:获取存在cookie中的用户信息到store
      next()
    }
  } else {
    if (allowList.includes(to.name || '')) {
      next()
    } else {
      next({ path: loginRoute });
    }
  }
})

// 路由加载后
router.afterEach(() => {});

export default router;
