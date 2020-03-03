import { handleLogin, getInfo } from '@/api/user.js'
import { getToken, setToken, removeToken } from '@/utils/auth.js'
import { resetRouter, constRoutes, superAdmin, notFound } from '@/router'
import { resetAddRoutes } from '@/utils/resetAddRoutes.js'
import { Message } from 'element-ui'

export default {
    namespaced: true,
    state: {
        // token
        token: getToken(),
        // 公司名称
        company: '',
        // 用户名
        userName: '',
        // 姓名
        custName: '',
        // 客户号
        custId: '',
        // 公司id
        cId: '',
        // 客户权限
        custPowers: [],
        // 所有路由
        routes: [],
        // 添加路由
        addRoutes: [],
        // 菜单路由,
        sidebarRoutes: [],
        // 点击路由
        clickRoutes: [],
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_COMPANENT(state, company) {
            state.company = company;
        },
        SET_USERNAME(state, userName) {
            state.userName = userName;
        },
        SET_CUSTNAME(state, custName) {
            state.custName = custName;
        },
        SET_CUSTID(state, custId) {
            state.custId = custId;
        },
        SET_CID(state, cId) {
            state.cId = cId;
        },
        SET_CUSTPOWERS(state, custPowers) {
            state.custPowers = custPowers;
        },
        SET_ROUTES(state, routes) {
            state.addRoutes = routes;
            state.routes = constRoutes.concat(routes);
            state.sidebarRoutes = routes.slice(1);
        },
        SET_CLICKROUTES(state, routes) {
            state.clickRoutes.push(routes);
        }
    },
    actions: {
        // 登录获取token
        handleLogin({ commit }, userInfo) {
            return new Promise( (resolve, reject) => {
                handleLogin(userInfo).then( res => {
                    if(res.code == 200){
                        const w_token = res.data;
                        commit('SET_TOKEN', w_token);
                        setToken(w_token);
                        resolve();
                    }else{
                        Message.error(res.msg);
                    }
                }).catch( err => {
                    Message.error(err.message);
                    reject(err);
                })
            })
        },
        // 获取用户信息
        getInfo({ commit, state }) {
            return new Promise( (resolve, reject) => {
                getInfo({
                    token: state.token
                }).then( res => {
                    if(res.code == 200){
                        let w_addroutes = [];
                        resetRouter();
                        if(res.data.menubars && res.data.menubars.length > 0){
                            commit('SET_COMPANENT', res.data.companys.c_name);
                            commit('SET_CID', res.data.companys.cId);
                            commit('SET_CUSTPOWERS', res.data.powers);
                            commit('SET_USERNAME', res.data.userName);
                            commit('SET_CUSTID', res.data.companys.custId);
                            commit('SET_CUSTNAME', res.data.name);
                            w_addroutes = w_addroutes.concat(notFound);
                            w_addroutes = w_addroutes.concat(resetAddRoutes(res.data.menubars));
                            // if(res.data.userName == '13501747179'){
                            //     // superAdmin
                            //     w_addroutes = w_addroutes.concat(superAdmin);
                            // }
                            commit('SET_ROUTES', w_addroutes);
                            resolve(w_addroutes);
                        }else{
                            removeToken();
                            resolve(w_addroutes);
                        }
                    }
                }).catch( err => {
                    removeToken();
                    reject(err);
                })
            })
        },
        // 退出
        handleLogout({ commit }) {
            return new Promise( (resolve, reject) => {
                removeToken();
                resetRouter();
                commit('SET_COMPANENT', '');
                commit('SET_USERNAME', '');
                commit('SET_CUSTNAME', '');
                commit('SET_CUSTID', '');
                commit('SET_ROUTES', []);
                resolve();
            })
        }
    }
}