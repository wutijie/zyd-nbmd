import { get, post } from '../utils/serve.js'
// 获取token
export function handleLogin(params){
    return new Promise( (resolve, reject) => {
        if(params.username == '123' && params.pass == 'asd'){
            resolve('ok');
        }else{
            reject('err');
        }
    })
}
// 获取用户信息
export function getInfo(params){
    return new Promise( (resolve, reject) => {
        const w_data = {
            compony: '某公司',
            userName: '某总',
            custId: '000051',
            routes: [
                {
                    path: '/deviceMenu',
                    name: 'DeviceMenu',
                    title: '设备数据',
                    children: [
                        {
                            path: '/deviceMenu/devicemation',
                            name: 'Devicemation',
                            iframeSrc: '',
                            title: '基础信息',
                            components: ['layout-devicemenu-devicemation']
                        },
                        {
                            path: '/deviceMenu/devicerunning',
                            name: 'Devicerunning',
                            iframeSrc: '',
                            title: '设备运行',
                            components: ['layout-devicemenu-devicerunning']
                        }
                    ]
                    
                }
            ]
        }
        resolve(w_data);
    })
}
