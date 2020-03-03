// java
import { jGet, jPost } from '../utils/jServe.js'
// c#
import { cGet, cPost } from '../utils/cServe.js'
// 工单管理
export function workOrderManage(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/PlanProduction.asmx/WorkOrderManage',{
            planno: params.planno ? params.planno : '',
            begintime: params.begintime ? params.begintime : '',
            endtime: params.endtime ? params.endtime : '',
            searchtype: params.searchtype ? params.searchtype : '',
            searchvalue: params.searchvalue == 0 || params.searchvalue ? params.searchvalue : '',
            page: params.page ? params.page : 1,
            row: params.row ? params.row : 10
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 计划排产—获取新编号
export function planProductionGetNewNumber(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/PlanProduction.asmx/PlanProduction_GetNewNumber',{
            type: params.type
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 工单管理—添加
export function workOrderManageAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/PlanProduction.asmx/WorkOrderManage_Add',{
            planno: params.planno ? params.planno : '',
            orderno: params.orderno ? params.orderno : '',
            did: params.did == 0 || params.did ? params.did : '',
            mouldid: params.mouldid == 0 || params.mouldid ? params.mouldid : '',
            workno: params.workno ? params.workno : '',
            userid: params.userid == 0 || params.userid ? params.userid : '',
            // classid: params.classid == 0 || params.classid ? params.classid : '',
            json: params.json ? params.json : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 工单管理—获取设备班次
export function planGetClassByDevice(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/PlanProduction.asmx/WorkOrderManage_GetClassByDevice',{
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 工单管理—编辑
export function workOrderManageEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/PlanProduction.asmx/WorkOrderManage_Edit',{
            did: params.did == 0 || params.did ? params.did : '',
            mouldid: params.mouldid == 0 || params.mouldid ? params.mouldid : '',
            workno: params.workno ? params.workno : '',
            userid: params.userid == 0 || params.userid ? params.userid : '',
            // classid: params.classid == 0 || params.classid ? params.classid : '',
            json: params.json ? params.json : '',
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 工单管理—作废
export function workOrderManageDestroy(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/PlanProduction.asmx/WorkOrderManage_Destroy',{
            id: params.id == 0 || params.id ? params.id : '',
            orderno: params.orderno ? params.orderno : '',
            planno: params.planno ? params.planno : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 工单管理—开始
export function workOrderManageStart(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/PlanProduction.asmx/WorkOrderManage_Start',{
            id: params.id == 0 || params.id ? params.id : '',
            planno: params.planno ? params.planno : '',
            mouldid: params.mouldid == 0 || params.mouldid ? params.mouldid : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 报工信息
export function workReport(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/PlanProduction.asmx/WorkReport',{
            orderno: params.orderno ? params.orderno : '',
            sources: params.sources ? params.sources : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 报工信息—添加
export function workReportAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/PlanProduction.asmx/WorkReport_Add',{
            planno: params.planno ? params.planno : '',
            orderno: params.orderno ? params.orderno : '',
            did: params.did == 0 || params.did ? params.did : '',
            source: params.source == 0 || params.source ? params.source : '',
            worknum: params.worknum == 0 || params.worknum ? params.worknum : '',
            notpassnum: params.notpassnum == 0 || params.notpassnum ? params.notpassnum : '',
            notpassreason: params.notpassreason ? params.notpassreason : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 报工信息—审核
export function workReportCheck(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/PlanProduction.asmx/WorkReport_Check',{
            planno: params.planno ? params.planno : '',
            orderno: params.orderno ? params.orderno : '',
            worknum: params.worknum == 0 || params.worknum ? params.worknum : '',
            notpassnum: params.notpassnum == 0 || params.notpassnum ? params.notpassnum : '',
            mouldid: params.mouldid == 0 || params.mouldid ? params.mouldid : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 工单管理—获取计划信息
export function workReportGetPlanInfo(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/PlanProduction.asmx/WorkOrderManage_GetPlanInfo',{
            planno: params.planno ? params.planno : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 报工信息—获取合计数量
export function workReportGetSum(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/PlanProduction.asmx/WorkReport_GetSum',{
            orderno: params.orderno ? params.orderno : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}