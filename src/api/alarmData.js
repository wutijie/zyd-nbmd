// java
import { jGet, jPost } from '../utils/jServe.js'
// c#
import { cGet, cPost } from '../utils/cServe.js'
// 获取所有报警类别
export function alarmGetAlarmType(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/alarm/getAlarmType',{}).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 管理----管理报警类型
export function alarmManageAlarmType(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/alarm/manage/alarmType',{}).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 查询报警数据记录列表
export function alarmgetAlarmRecord(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/alarm/getAlarmRecord',{
            type: params.type == 0 || params.type ? params.type : '',
            page: params.page == 0 || params.page ? params.page : '',
            pageSize: params.pageSize == 0 || params.pageSize ? params.pageSize : '',
            arNumber: params.arNumber ? params.arNumber : '',
            atId: params.atId == 0 || params.atId ? params.atId : '',
            beginTime: params.beginTime ? params.beginTime : '',
            endTime: params.endTime ? params.endTime : '',
            dId: params.dId == 0 || params.dId ? params.dId : '',
            dName: params.dName ? params.dName : '',
            dNumber: params.dNumber ? params.dNumber : '',
            mId: params.mId == 0 || params.mId ? params.mId : '',
            mName: params.mName ? params.mName : '',
            mNumber: params.mNumber ? params.mNumber : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}