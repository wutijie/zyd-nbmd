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
          components: ['home']
        }
      }
    ]
  },
  {
    path: '/addFiles',
    name: 'AddFiles',
    component: () => import('@/views/layout/superAdmin/addFiles'),
  }
];

export const superAdmin = [
  {
    path: '/superAdmin',
    name: 'SuperAdmin',
    component: () => import('@/views/layout'),
    meta: {
      title: '超级管理',
      iconClass: 'icon-superadmin',
    },
    // redirect: "/superAdmin/persettings",
    children: [
      {
        path: '/superAdmin/addFiles',
        name: 'AddFiles',
        meta: {
          title: '添加文件',
          parentName: 'SuperAdmin',
          iframeSrc: '',
          components: ['superadmin-addfiles']
        }
      },
      // {
      //   path: '/superAdmin/createPage',
      //   name: 'CreatePage',
      //   meta: {
      //     title: '创建网页',
      //     parentName: 'SuperAdmin',
      //     iframeSrc: '',
      //     components: ['superadmin-createpage']
      //   }
      // }
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
