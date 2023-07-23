import { RouteRecordRaw } from "vue-router"
export const constantRouters: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/view/login/index.vue'),
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true, // 控制该路由是否显示在菜单menu上
    }
  },
  {
    path: '/404',
    component: () => import('@/view/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: 'any',
      hidden: true,
    }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'Index',
    meta: {
      title: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/view/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          icon: 'home',
        }
      },
    ]
  },
  {
    path: '/screen',
    component: () => import('@/view/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏',
      icon: 'screen',
    }
  },
  {
    path: '/authority',
    component: () => import('@/layout/index.vue'),
    name: 'Authority',
    meta: {
      title: '权限管理',
      icon: 'limit'
    },
    redirect:'/authority/user',
    children: [
      {
        path: '/authority/user',
        component: () => import('@/view/authority/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'user',
        }
      },
      {
        path: '/authority/role',
        component: () => import('@/view/authority/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'role',
        }
      },
      {
        path: '/authority/menu',
        component: () => import('@/view/authority/menu/index.vue'),
        name: 'Menu',
        meta: {
          title: '菜单管理',
          icon: 'menu',
        }
      }
    ]
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'shop'
    },
    redirect:'/product/brand',
    children: [
      {
        path: '/product/brand',
        component: () => import('@/view/product/brand/index.vue'),
        name: 'Brand',
        meta: {
          title: '品牌管理管理',
          icon: 'brand',
        }
      },
      {
        path: '/product/attribute',
        component: () => import('@/view/product/attribute/index.vue'),
        name: 'Attribute',
        meta: {
          title: '属性管理',
          icon: 'attribute',
        }
      },
      {
        path: '/product/spu',
        component: () => import('@/view/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'spu',
        }
      },
      {
        path: '/product/sku',
        component: () => import('@/view/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'sku',
        }
      }
    ]
  }
]