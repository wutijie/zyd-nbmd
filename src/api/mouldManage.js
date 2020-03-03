// java
import { jGet, jPost } from '../utils/jServe.js'
// c#
import { cGet, cPost } from '../utils/cServe.js'
// 模具信息
export function getMouldInfo(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/MouldInfo',{
            page: params.page ? params.page : 1,
            row: params.row ? params.row : 10,
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
// 模具管理—获取编号
export function getMouldInfoGetNumber(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/MouldManage_GetNumber',{
            type: params.type ? params.type : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 模具信息—添加
export function mouldInfoAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/MouldInfo_Add',{
            mouldno: params.mouldno ? params.mouldno : '',
            mouldname: params.mouldname ? params.mouldname : '',
            assetno: params.assetno ? params.assetno : '',
            proid: params.proid == 0 || params.proid ? params.proid : '',
            cavitynum: params.cavitynum == 0 || params.cavitynum ? params.cavitynum : '',
            weight: params.weight ? params.weight : '',
            measure: params.measure ? params.measure : '',
            ejectionstructure: params.ejectionstructure ? params.ejectionstructure : '',
            cylindernum: params.cylindernum == 0 || params.cylindernum ? params.cylindernum : '',
            life: params.life == 0 || params.life ? params.life : '',
            acceptanceTime: params.acceptanceTime ? params.acceptanceTime : '',
            imgpath: params.imgpath ? params.imgpath : '',
            param: params.param ? params.param : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 模具信息—编辑
export function mouldInfoEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/MouldInfo_Edit',{
            mouldname: params.mouldname ? params.mouldname : '',
            assetno: params.assetno ? params.assetno : '',
            proid: params.proid == 0 || params.proid ? params.proid : '',
            cavitynum: params.cavitynum == 0 || params.cavitynum ? params.cavitynum : '',
            weight: params.weight ? params.weight : '',
            measure: params.measure ? params.measure : '',
            ejectionstructure: params.ejectionstructure ? params.ejectionstructure : '',
            cylindernum: params.cylindernum == 0 || params.cylindernum ? params.cylindernum : '',
            life: params.life == 0 || params.life ? params.life : '',
            acceptanceTime: params.acceptanceTime ? params.acceptanceTime : '',
            imgpath: params.imgpath ? params.imgpath : '',
            param: params.param ? params.param : '',
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 模具信息—使用合计信息
export function getMouldInfoUseCountInfo(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/MouldInfo_UseCountInfo',{
            mid: params.mid == 0 || params.mid ? params.mid : '',
            page: params.page == 0 || params.page ? params.page : 1,
            row: params.row == 0 || params.row ? params.row : 10
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 维修记录
export function getMouldRepairRecord(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/RepairRecord',{
            mid: params.mid == 0 || params.mid ? params.mid : '',
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
export function getMouldRepairRecordAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/RepairRecord_Add',{
            repairno: params.repairno == 0 || params.repairno ? params.repairno : '',
            mid: params.mid == 0 || params.mid ? params.mid : '',
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
export function getMouldRepairRecordEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/RepairRecord_Edit',{
            mid: params.mid == 0 || params.mid ? params.mid : '',
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
export function getMouldRepairRecordEditContent(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/RepairRecord_EditContent',{
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
export function getMouldRepairRecordStartEnd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/RepairRecord_StartEnd',{
            type: params.type == 0 || params.type ? params.type : '',
            source: params.source == 0 || params.source ? params.source : 3,
            mid: params.mid == 0 || params.mid ? params.mid : '',
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 维修模板
export function getMouldRepairTemplate(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/RepairTemplate',{
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
export function getMouldRepairTemplateAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/RepairTemplate_Add',{
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
export function getMouldRepairTemplateEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/RepairTemplate_Edit',{
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
export function getMouldRepairTemplateDelete(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/RepairTemplate_Delete',{
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 故障记录
export function getMouldFaultRecord(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/FaultRecord',{
            mid: params.mid == 0 || params.mid ? params.mid : '',
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
export function getMouldFaultRecordAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/FaultRecord_Add',{
            mid: params.mid == 0 || params.mid ? params.mid : '',
            typeid: params.typeid == 0 || params.typeid ? params.typeid : 0,
            source: params.source == 0 || params.source ? params.source : 3,
            content: params.content ? params.content : '',
            begintime: params.begintime ? params.begintime : '',
            endtime: params.endtime ? params.endtime : '',
            faultno: params.faultno ? params.faultno : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 故障记录—编辑
export function getMouldFaultRecordEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/FaultRecord_Edit',{
            mid: params.mid == 0 || params.mid ? params.mid : '',
            typeid: params.typeid == 0 || params.typeid ? params.typeid : 0,
            content: params.content ? params.content : '',
            begintime: params.begintime ? params.begintime : '',
            endtime: params.endtime ? params.endtime : '',
            id: params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 故障记录—开始结束
export function getMouldRepairFaultRecordStartEnd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/FaultRecord_StartEnd',{
            type: params.type == 0 || params.type ? params.type : '',
            mid: params.mid == 0 || params.mid ? params.mid : '',
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 故障类型
export function getMouldFaultType(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/FaultType',{
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
export function getMouldFaultTypeAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/FaultType_Add',{
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
export function getMouldFaultTypeEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/FaultType_Edit',{
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
export function getMouldFaultTypeDelete(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/FaultType_Delete',{
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 变更记录
export function getMouldChangeRecord(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/ChangeRecord',{
            mid: params.mid == 0 || params.mid ? params.mid : '',
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
// 变更记录—添加
export function getMouldChangeRecordAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/ChangeRecord_Add',{
            mid: params.mid == 0 || params.mid ? params.mid : '',
            changetime: params.changetime ? params.changetime : '',
            newnumber: params.newnumber ? params.newnumber : '',
            newimgpath: params.newimgpath ? params.newimgpath : '',
            content: params.content ? params.content : '',
            changeuser: params.changeuser == 0 || params.changeuser ? params.changeuser : '',
            // checkuser: params.checkuser == 0 || params.checkuser ? params.checkuser : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 变更记录—审核
export function getMouldChangeRecordCheck(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/ChangeRecord_Check',{
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 保养记录
export function getMouldMaintainRecord(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/MaintainRecord',{
            mid: params.mid == 0 || params.mid ? params.mid : '',
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
export function getMouldMaintainRecordEditContent(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/MaintainRecord_Edit',{
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
export function getMouldMaintainRecordStartEnd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/MaintainRecord_StartEnd',{
            type: params.type == 0 || params.type ? params.type : '',
            genre: params.genre == 0 || params.genre ? params.genre : '',
            source: params.source == 0 || params.source ? params.source : 3,
            mid: params.mid == 0 || params.mid ? params.mid : '',
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 周期保养
export function getMouldCycleMaintain(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/CycleMaintain',{
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
export function getMouldMaintainCycleMaintainAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/CycleMaintain_Add',{
            mids: params.mids ? params.mids : '',
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
export function getMouldMaintainCycleMaintainEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/CycleMaintain_Edit',{
            mids: params.mids ? params.mids : '',
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
// 二级保养
export function getMouldSecondMaintain(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/SecondMaintain',{
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
// 二级保养—添加
export function getMouldMaintainSecondMaintainAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/SecondMaintain_Add',{
            mids: params.mids ? params.mids : '',
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
// 二级保养—编辑
export function getMouldMaintainSecondMaintainEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/SecondMaintain_Edit',{
            mids: params.mids ? params.mids : '',
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
export function getMouldMaintainTemplate(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/MaintainTemplate',{
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
export function getMouldMaintainTemplateAdd(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/MaintainTemplate_Add',{
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
export function getMouldMaintainTemplateEdit(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/MaintainTemplate_Edit',{
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
export function getMouldMaintainTemplateDelete(params = {}){
    return new Promise( (resolve, reject) => {
        cPost('/MouldManage.asmx/MaintainTemplate_Delete',{
            id: params.id == 0 || params.id ? params.id : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}