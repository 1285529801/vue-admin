export const constantRouters = [
  {
    path: '/',
    // component: () => import('@/view/login/index.vue'),
    redirect: '/login',
    name: 'index',
  },
  {
    path: '/home',
    component: () => import('@/view/home/index.vue'),
    name: 'home'
  },
  {
    path: '/login',
    component: () => import('@/view/login/index.vue'),
    name: 'login'
  },
  {
    path: '/404',
    component: () => import('@/view/404/index.vue'),
    name: '404'
  }
]