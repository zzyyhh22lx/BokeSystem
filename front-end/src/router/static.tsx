import { RouteRecordRaw } from 'vue-router'

// import RouteView from '@/components/layout/route-view.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

const RouteView = {
  render() {
    return (<router-view></router-view>)
  }
}

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'indexLayout',
    redirect: '/index',
    component: () => import('@/components/layout/basic-layout.vue'),
    children: [
      /*
       * todo: 待确定布局方案。
       * 第一级对应菜单第一级目录
       * 第一级目录可能出现的情况：1.点击后直接进入对应页面；2.点击后展开，不会打开对应的页面。通过children属性长度>1判断。
       * 第二级有两种情况：1.对应菜单的第二级目录，点击后进入对应页面；2.路径匹配相应的页面但是不在菜单中展示（配置hidden属性）。
       * 但是页面应至少匹配一个二级路径？
       * 第三极及更深层的child，均不在菜单中展示。
       */
      {
        path: '/index',
        name: '/index',
        component: () => import('@/views/template-page.vue'),
        meta: {
          title: 'index'
        }
      },
      {
        path: '/solutionBaseline',
        name: 'index',
        component: RouteView,
        meta: {
          title: 'solutionBaseline'
        },
        children: [
          {
            path: '/solutionBaseline/bigData',
            name: 'bigData',
            component: () => import('@/views/template-page.vue'),
            meta: {
              title: 'bigData'
            }
          }
        ]
      },
      {
        path: 'normalBaseline',
        name: 'normalBaseline',
        component: () => import('@/views/template-page.vue'),
        meta: {
          title: 'normalBaseline'
        }
      },
      {
        path: '/userCenter',
        name: 'userCenter',
        component: RouteView,
        meta: {
          title: 'userCenter'
        },
        children: [
          {
            path: '/userCenter/application/applicationList',
            name: 'applicationList',
            component: () => import('@/views/user-center/list/user-list.vue'),
            meta: {
              title: 'applicationList'
            }
          },
          {
            path: '/userCenter/application/applicationProgress',
            name: 'applicationProgress',
            component: () => import('@/views/user-center/progress/user-progress.vue'),
            meta: {
              title: 'applicationProgress'
            }
          },
          {
            path: '/userCenter/approval/approveList',
            name: 'approveList',
            component: () => import('@/views/user-center/list/user-list.vue'),
            meta: {
              title: 'approveList'
            }
          },
          {
            path: '/userCenter/approval/approvalprogress',
            name: 'approvalprogress',
            component: () => import('@/views/user-center/progress/user-progress.vue'),
            meta: {
              title: 'approvalprogress'
            }
          },
        ]
      },
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
