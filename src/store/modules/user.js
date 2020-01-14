import { handleLogin, getInfo } from '@/api/user.js'
import { getToken, setToken, removeToken } from '@/utils/auth.js'
import { resetRouter, constRoutes, superAdmin, notFound } from '@/router'
import { resetAddRoutes } from '@/utils/resetAddRoutes.js'

export default {
    namespaced: true,
    state: {
        // token
        token: getToken(),
        // 公司名称
        compony: '',
        // 用户名
        userName: '',
        // 客户号
        custId: '',
        // 所有路由
        routes: [],
        // 添加路由
        addRoutes: [],
        // 菜单路由,
        sidebarRoutes: []
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_COMPONENT(state, token) {
            state.token = token;
        },
        SET_USERNAME(state, token) {
            state.token = token;
        },
        SET_CUSTID(state, token) {
            state.token = token;
        },
        SET_ROUTES(state, routes) {
            state.addRoutes = routes;
            state.routes = constRoutes.concat(routes);
            state.sidebarRoutes = routes.slice(1);
        }
    },
    getters: {
        
    },
    actions: {
        // 登录获取token
        handleLogin({ commit }, userInfo) {
            return new Promise( (resolve, reject) => {
                handleLogin(userInfo).then( res => {
                    if(res == 'ok'){
                        const w_token = 'sacmoasm1631535ascsac';
                        commit('SET_TOKEN', w_token)
                        setToken(w_token);
                        resolve();
                    }
                }).catch( err => {
                    reject(err);
                })
            })
        },
        // 获取用户信息
        getInfo({ commit, state }) {
            return new Promise( (resolve, reject) => {
                getInfo(state.token).then( res => {
                    resetRouter();
                    commit('SET_COMPONENT', res.compony);
                    commit('SET_USERNAME', res.userName);
                    commit('SET_CUSTID', res.custId);
                    let w_addroutes = [];
                    w_addroutes = w_addroutes.concat(notFound);
                    w_addroutes = w_addroutes.concat(resetAddRoutes(res.routes));
                    if(res.custId == "000051"){
                        // superAdmin
                        w_addroutes = w_addroutes.concat(superAdmin);
                    }
                    commit('SET_ROUTES', w_addroutes);
                    resolve(w_addroutes);
                }).catch( err => {
                    reject(err);
                })
            })
        },
        // 退出
        handleLogout({ commit }) {
            return new Promise( (resolve, reject) => {
                removeToken();
                resetRouter();
                commit('SET_COMPONENT', '');
                commit('SET_USERNAME', '');
                commit('SET_CUSTID', '');
                commit('SET_ROUTES', []);
                resolve();
            })
        }
    }
}