import router, { notFound } from './router'
import store from './store'
import { getToken } from "@/utils/auth.js"
import { Message } from 'element-ui'

router.num = 0;
// 定义白名单
const whiteList = ['/login'];
router.beforeEach(async (to, from, next) => {
    router.num++;
    if(router.num > 20){
        next();
        return;
    }

    const w_token = getToken();
    // console.log('w_token:' + w_token)
    if(w_token){
        // token存在
        if(to.path === '/login'){
            next({ path: '/' })
        }else{
            try {
                next();
                const w_routes = await store.dispatch('user/getInfo');
                if(w_routes && w_routes.length > 0){
                    router.addRoutes(w_routes);
                }else{
                    Message.error('暂无权限');
                    next('/login');
                }
                // next();
                // next({ replace: true });
                // next({ ...to, replace: true });
            } catch (error) {
                Message.error('登录失败');
                next('/login');
            }
        }
    }else{
        // token不存在
        if(whiteList.indexOf(to.path) !== -1){
            next();
        }else{
            // Message.error('登录失败');
            next('/login');
        }
    }

})


    // return;

    // // console.log(store.state.user.isLogin,store.state.user.addRouters);
    // if(store.state.user.isLogin){
    //     next();
    //     // 用户已登录
    //     // console.log("用户已登录");
    //     resetRouter();
    //     router.addRoutes([
    //         {
    //             path: "/",
    //             name: "Home",
    //             component: Layout,
    //             redirect: "/first",
    //             children: [
    //                 {
    //                     path: "/first",
    //                     name: "First",
    //                     component: LayMain,
    //                     meta: {
    //                         parentName: '1',
    //                         iframeSrc: '',
    //                         components: ['w-table']
    //                     }
    //                 },
    //                 {
    //                     path: "/two",
    //                     name: "Two",
    //                     component: LayMain,
    //                     meta: {
    //                         parentName: '1',
    //                         iframeSrc: 'http://47.103.127.101/huaheWeb/#/login',
    //                         components: []
    //                     }
    //                 }
    //             ]
    //         },
    //         {
    //             path: "*",
    //             component: NotFound
    //         }
    //     ]);
    //     // console.log(to)
    //     // next({ ...to, replace: true });
        
        
    //     // store.dispatch("user/getUserInfo").then(() => {
    //     //     console.log(router);
    //     //     console.log(to);
            
    //     //     // next({ ...to, replace: true });
    //     // })
    // }else{
    //     // 用户未登录
    //     // console.log("用户未登录");
    //     if(to.path === "/login"){
    //         // 用户未登录 并且去了登录页
    //         // console.log("用户未登录 并且去了登录页");
    //         next();
    //     }else{
    //         // // 用户未登录 去的不是登录页
    //         // console.log("用户未登录 去的不是登录页");
    //         next("/login");
    //     }
        
    // }
    // if (store.state.user.isLogin) {
    //     if (to.path === "/login") {
    //         next('/');
    //     } else {
    //         console.log(store);
    //         router.addRoutes(store.state.user.addRouters);
    //         next({ ...to, replace: true });
    //     }
    // } else {
    //     if (to.path === "/login") {
    //         next();
    //     } else {
    //         next('/login?redirect=' + to.fullPath);
    //     }

    // }
