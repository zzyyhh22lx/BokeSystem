import { createRouter, createWebHistory } from 'vue-router';
import { staticRoutes, asyncRoutes } from './static';

// import { getAuthToken } from '@/utils/storage'

const router = createRouter({
  history: createWebHistory(),
  routes: [...staticRoutes, ...asyncRoutes],
})
// todo，加载路由后，根据用户role进行过滤

router.beforeEach((to, from, next) => {
  next()
})

// 路由加载后
router.afterEach(() => {});

export default router;
