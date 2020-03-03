// java
import { jGet, jPost } from '../utils/jServe.js'
// c#
import { cGet, cPost } from '../utils/cServe.js'
// 设备管理—获取编号
export function getDeviceInfoGetNumber(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/DeviceManage_GetNumber',{
            type: params.type ? params.type : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 维修记录
export function getDeviceRepairRecord(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/RepairRecord',{
            did: params.did == 0 || params.did ? params.did : '',
            page: params.page == 0 || params.page ? params.page : 1,
            row: params.row == 0 || params.row ? params.row : 10,
            begintime: params.begintime ? params.begintime : '',
            endtime: params.endtime ? params.endtime : '',
            searchtype: params.searchtype ? params.searchtype : '',
            searchvalue: params.searchvalue == 0 || params.searchvalue ? params.searchvalue : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 维修记录—添加
export function getDeviceRepairRecordAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/RepairRecord_Add',{
            repairno: params.repairno == 0 || params.repairno ? params.repairno : '',
            did: params.did == 0 || params.did ? params.did : '',
            planbegintime: params.planbegintime ? params.planbegintime : '',
            planendtime: params.planendtime ? params.planendtime : '',
            reason: params.reason ? params.reason : '',
            tempid: params.tempid == 0 || params.tempid ? params.tempid : 1,
            content: params.content ? params.content : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 维修记录—编辑
export function getDeviceRepairRecordEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/RepairRecord_Edit',{
            did: params.did == 0 || params.did ? params.did : '',
            planbegintime: params.planbegintime ? params.planbegintime : '',
            planendtime: params.planendtime ? params.planendtime : '',
            reason: params.reason ? params.reason : '',
            tempid: params.tempid == 0 || params.tempid ? params.tempid : 1,
            content: params.content ? params.content : '',
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 维修记录—编辑内容
export function getDeviceRepairRecordEditContent(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/RepairRecord_EditContent',{
            content: params.content ? params.content : '',
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 维修记录—开始结束
export function getDeviceRepairRecordStartEnd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/RepairRecord_StartEnd',{
            type: params.type == 0 || params.type ? params.type : '',
            source: params.source == 0 || params.source ? params.source : 3,
            did: params.did == 0 || params.did ? params.did : '',
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 维修模板
export function getDeviceRepairTemplate(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/RepairTemplate',{
            page: params.page == 0 || params.page ? params.page : 1,
            row: params.row == 0 || params.row ? params.row : 10
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 维修模板—添加
export function getDeviceRepairTemplateAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/RepairTemplate_Add',{
            tempname: params.tempname ? params.tempname : '',
            content: params.content ? params.content : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 维修模板—编辑
export function getDeviceRepairTemplateEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/RepairTemplate_Edit',{
            tempname: params.tempname ? params.tempname : '',
            content: params.content ? params.content : '',
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 维修模板—删除
export function getDeviceRepairTemplateDelete(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/RepairTemplate_Delete',{
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 故障记录
export function getDeviceFaultRecord(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/FaultRecord',{
            did: params.did == 0 || params.did ? params.did : '',
            source: params.source == 0 || params.source ? params.source : 3,
            page: params.page == 0 || params.page ? params.page : 1,
            row: params.row == 0 || params.row ? params.row : 10,
            begintime: params.begintime ? params.begintime : '',
            endtime: params.endtime ? params.endtime : '',
            searchtype: params.searchtype ? params.searchtype : '',
            searchvalue: params.searchvalue == 0 || params.searchvalue ? params.searchvalue : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 故障记录—添加
export function getDeviceFaultRecordAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/FaultRecord_Add',{
            did: params.did == 0 || params.did ? params.did : '',
            typeid: params.typeid == 0 || params.typeid ? params.typeid : 0,
            source: params.source == 0 || params.source ? params.source : 3,
            content: params.content ? params.content : '',
            begintime: params.begintime ? params.begintime : '',
            faultno: params.faultno ? params.faultno : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 故障记录—编辑
export function getDeviceFaultRecordEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/FaultRecord_Edit',{
            did: params.did == 0 || params.did ? params.did : '',
            typeid: params.typeid == 0 || params.typeid ? params.typeid : 0,
            content: params.content ? params.content : '',
            begintime: params.begintime ? params.begintime : '',
            id: params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 故障记录—开始结束
export function getDeviceRepairFaultRecordStartEnd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/FaultRecord_StartEnd',{
            type: params.type == 0 || params.type ? params.type : '',
            did: params.did == 0 || params.did ? params.did : '',
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 故障类型
export function getDeviceFaultType(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/FaultType',{
            page: params.page == 0 || params.page ? params.page : 1,
            row: params.row == 0 || params.row ? params.row : 10
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 故障类型—添加
export function getDeviceFaultTypeAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/FaultType_Add',{
            typename: params.typename ? params.typename : '',
            source: params.source ? params.source : 3
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 故障类型—编辑
export function getDeviceFaultTypeEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/FaultType_Edit',{
            typename: params.typename ? params.typename : '',
            source: params.source ? params.source : 3,
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 故障类型—删除
export function getDeviceFaultTypeDelete(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/FaultType_Delete',{
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 保养记录
export function getDeviceMaintainRecord(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/MaintainRecord',{
            did: params.did == 0 || params.did ? params.did : '',
            type: params.type == 0 || params.type ? params.type : '',
            page: params.page == 0 || params.page ? params.page : 1,
            row: params.row == 0 || params.row ? params.row : 10,
            begintime: params.begintime ? params.begintime : '',
            endtime: params.endtime ? params.endtime : '',
            searchtype: params.searchtype ? params.searchtype : '',
            searchvalue: params.searchvalue == 0 || params.searchvalue ? params.searchvalue : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 保养记录—编辑
export function getDeviceMaintainRecordEditContent(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/MaintainRecord_Edit',{
            content: params.content ? params.content : '',
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 保养记录—开始结束
export function getDeviceMaintainRecordStartEnd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/MaintainRecord_StartEnd',{
            type: params.type == 0 || params.type ? params.type : '',
            genre: params.genre == 0 || params.genre ? params.genre : '',
            source: params.source == 0 || params.source ? params.source : 3,
            did: params.did == 0 || params.did ? params.did : '',
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 周期保养
export function getDeviceCycleMaintain(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/CycleMaintain',{
            planno: params.planno ? params.planno : '',
            page: params.page == 0 || params.page ? params.page : 1,
            row: params.row == 0 || params.row ? params.row : 10
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 周期保养—添加
export function getDeviceMaintainCycleMaintainAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/CycleMaintain_Add',{
            dids: params.dids ? params.dids : '',
            tempid: params.tempid == 0 || params.tempid ? params.tempid : '',
            planname: params.planname ? params.planname : '',
            interval: params.interval == 0 || params.interval ? params.interval : '',
            unit: params.unit == 0 || params.unit ? params.unit : '',
            definite: params.definite == 0 || params.definite ? params.definite : '',
            count: params.count == 0 || params.count ? params.count : '',
            planno: params.planno ? params.planno : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 周期保养—编辑
export function getDeviceMaintainCycleMaintainEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/CycleMaintain_Edit',{
            dids: params.dids ? params.dids : '',
            tempid: params.tempid == 0 || params.tempid ? params.tempid : '',
            planname: params.planname ? params.planname : '',
            interval: params.interval == 0 || params.interval ? params.interval : '',
            unit: params.unit == 0 || params.unit ? params.unit : '',
            definite: params.definite == 0 || params.definite ? params.definite : '',
            count: params.count == 0 || params.count ? params.count : '',
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 指定保养
export function getDeviceAssginMaintain(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/AssginMaintain',{
            planno: params.planno ? params.planno : '',
            page: params.page == 0 || params.page ? params.page : 1,
            row: params.row == 0 || params.row ? params.row : 10
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 指定保养—添加
export function getDeviceMaintainAssginMaintainAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/AssginMaintain_Add',{
            dids: params.dids ? params.dids : '',
            tempid: params.tempid == 0 || params.tempid ? params.tempid : '',
            planname: params.planname ? params.planname : '',
            assgindate: params.assgindate ? params.assgindate : '',
            planno: params.planno ? params.planno : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 指定保养—编辑
export function getDeviceMaintainAssginMaintainEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/AssginMaintain_Edit',{
            dids: params.dids ? params.dids : '',
            tempid: params.tempid == 0 || params.tempid ? params.tempid : '',
            planname: params.planname ? params.planname : '',
            assgindate: params.assgindate ? params.assgindate : '',
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 保养模板
export function getDeviceMaintainTemplate(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/MaintainTemplate',{
            page: params.page == 0 || params.page ? params.page : 1,
            row: params.row == 0 || params.row ? params.row : 10
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 保养模板—添加
export function getDeviceMaintainTemplateAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/MaintainTemplate_Add',{
            tempname: params.tempname ? params.tempname : '',
            temptype: params.temptype == 0 || params.temptype ? params.temptype : '',
            content: params.content ? params.content : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 保养模板—编辑
export function getDeviceMaintainTemplateEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/MaintainTemplate_Edit',{
            tempname: params.tempname ? params.tempname : '',
            temptype: params.temptype == 0 || params.temptype ? params.temptype : '',
            content: params.content ? params.content : '',
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 保养模板—删除
export function getDeviceMaintainTemplateDelete(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/DeviceManage.asmx/MaintainTemplate_Delete',{
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}