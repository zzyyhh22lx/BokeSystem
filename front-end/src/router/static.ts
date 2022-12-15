import { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'indexLayout',
    redirect: '/index',
    component: () => import('@/components/layout/basic-layout.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/template-page.vue'),
        meta: {
          title: 'index'
        }
      }
    ]
  },
  {
    path: '/:path(.*)*',
    redirect: '/404',
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/common/error/404.vue'),
    meta: {
      title: '404'
    },
  }
]

const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/user/login',
    name: 'login',
    component: () => import('@/views/user/login-page.vue'),
    meta: {
      title: 'login'
    }
  }
]

export { staticRoutes, asyncRoutes }
