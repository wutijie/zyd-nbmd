// java
import { jGet, jPost } from '../utils/jServe.js'
// c#
import { cGet, cPost } from '../utils/cServe.js'
// test c#
// export function getHome(params){
//     return new Promise( (resolve, reject) => {
//         cPost(
//             '/Index',
//             {
//                 userTelNumber: '13806665159',
//                 custid: '000057'
//             },
//             false
//         ).then( res => {
//             resolve(res);
//         }).catch( err => {
//             reject(err);
//         })
//     })
// }

// 获取token
export function handleLogin(params){
    return new Promise( (resolve, reject) => {
        jPost(
            '/zhiyunduan/user/login',
            {
                userName: params.login_username,
                password: params.login_password
            },
            false
        ).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 获取用户信息
export function getInfo(params){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/getIndexData').then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
        /*
        const w_data = {
            compony: '某公司',
            userName: '某总',
            custId: '000051',
            routes: [
                {
                    path: '/deviceMenu',//一级路径
                    name: 'DeviceMenu',//一级路径别名name
                    title: '设备数据',//一级标题
                    mark: '0',//一级标记提示
                    iconClass: 'el-icon-location',//图标样式
                    children: [
                        {
                            path: '/deviceMenu/devicemation',//二级路径
                            name: 'Devicemation',//二级路径别名name
                            iframeSrc: '',//自定义网页
                            title: '基础信息',//二级标题
                            mark: '0',//二级标记提示
                            components: ['devicemenu-devicemation']//二级页面显示组件数组
                        },
                        {
                            path: '/deviceMenu/lineMation',
                            name: 'LineMation',
                            iframeSrc: '',
                            title: '产线信息',
                            mark: '0',
                            components: ['devicemenu-linemation']
                        },
                        {
                            path: '/deviceMenu/devicerunning',
                            name: 'Devicerunning',
                            iframeSrc: '',
                            title: '设备运行',
                            mark: '0',
                            components: ['devicemenu-devicerunning']
                        },
                        {
                            path: '/deviceMenu/devicelayout',
                            name: 'DeviceLayout',
                            iframeSrc: '',
                            title: '设备分布',
                            mark: '0',
                            components: ['devicemenu-devicelayout']
                        }
                    ]
                    
                }
            ]
        }
        resolve(w_data);
        */
    })
}
