import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const constRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login")
  },
  {
    path: "/",
    name: "First",
    component: () => import('@/views/layout'),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          parentName: 'First',
          iframeSrc: '',
          components: ['layout-home']
        }
      }
    ]
  }
];

export const superAdmin = [
  {
    path: '/superAdmin',
    name: 'SuperAdmin',
    component: () => import('@/views/layout'),
    meta: {
      title: '超级管理'
    },
    // redirect: "/superAdmin/persettings",
    children: [
      {
        path: '/superAdmin/persettings',
        name: 'Persettings',
        meta: {
          title: '权限管理',
          parentName: 'SuperAdmin',
          iframeSrc: '',
          components: ['layout-superadmin-permissionsettings']
        }
      },
      {
        path: '/superAdmin/addFiles',
        name: 'AddFiles',
        meta: {
          title: '添加文件',
          parentName: 'SuperAdmin',
          iframeSrc: '',
          components: ['layout-superadmin-addfiles']
        }
      }
    ]
  }
]

export const notFound = [
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/notFound')
  }
]

const createRouter = () => new VueRouter({
  mode: 'hash',
  routes: constRoutes
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
