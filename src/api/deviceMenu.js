// java
import { jGet, jPost } from '../utils/jServe.js'
// c#
import { cGet, cPost } from '../utils/cServe.js'
// 区域----获取区域列表
export function getDeviceArea(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/device/getDeviceArea',{
            page: params.page ? params.page : 1,
            pageSize: params.pageSize ? params.pageSize : 10
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 区域----区域管理
export function manageDeviceArea(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/device/manage/deviceArea',{
            type: params.type ? params.type : '',
            daId: params.daId == 0 || params.daId ? params.daId : '',
            daName: params.daName ? params.daName : '',
            daRow: params.daRow == 0 || params.daRow ? params.daRow : '',
            daLine: params.daLine == 0 || params.daLine ? params.daLine : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 区域----更改设备区域信息
export function deviceChangeDeviceArea(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/device/change/deviceAre',{
            daId: params.daId == 0 || params.daId ? params.daId : '',
            daContent: params.daContent ? params.daContent : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 区域----获取设备区分布图数据
export function getDeviceDistribution(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/device/getDevice/distribution',{}).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}