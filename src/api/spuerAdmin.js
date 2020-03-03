// java
import { jGet, jPost } from '../utils/jServe.js'
// c#
import { cGet, cPost } from '../utils/cServe.js'
// 上传图片
export function uploadImage(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/upload/image', params, true, 'multipart/form-data').then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 获取企业下资源
export function getResource(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/getResource',{
            type: params
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 菜单栏管理
export function menubar(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/manage/menubar',{
            type: params.type,
            mId: params.mid ? params.mid : '',
            level: params.level,
            pater: params.pater == 0 || params.pater ? params.pater : '',
            path: params.path ? params.path : '',
            name: params.name ? params.name : '',
            title: params.title ? params.title : '',
            iconClass: params.iconClass ? params.iconClass : '',
            iframeSrc: params.iframeSrc ? params.iframeSrc : '',
            components: params.components ? params.components : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 企业组织结构管理
export function structure(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/manage/structure',{
            type: params.type,
            csId: params.csId == 0 || params.csId ? params.csId : '',
            csName: params.csName ? params.csName : '',
            csLevel: params.csLevel == 0 || params.csLevel ? params.csLevel : '',
            csPater: params.csPater == 0 || params.csPater ? params.csPater : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 用户管理
export function userManage(params = {}){
    return new Promise( (resolve, reject) => {
        let sendData = {
            type: params.type,
            uId: params.uId == 0 || params.uId ? params.uId : '',
            uUserName: params.uUserName ? params.uUserName : '',
            uPassword: params.uPassword ? params.uPassword : '',
            uName: params.uName ? params.uName : '',
            uSex: params.uSex == 0 || params.uSex ? params.uSex : '',
            uWorkId: params.uWorkId ? params.uWorkId : '',
            uDuty: params.uDuty ? params.uDuty : '',
            csId: params.csId == 0 || params.csId ? params.csId : '',
            cId: params.cId == 0 || params.cId ? params.cId : ''
        }
        let notDel = {
            page: params.page ? params.page : 1,
            pageSize: params.pageSize ? params.pageSize : 10
        }
        if(params.type && params.type != 4){
            sendData = {
                ...sendData,
                ...notDel
            }
        }
        jPost('/zhiyunduan/user/manage/user',sendData).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 角色管理
export function roleManage(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/manage/role',{
            type: params.type,
            rId: params.rId == 0 || params.rId ? params.rId : '',
            rName: params.rName ? params.rName : '',
            rLevel: params.rLevel == 0 || params.rLevel ? params.rLevel : '',
            rPater: params.rPater == 0 || params.rPater ? params.rPater : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 权限管理
export function powerManage(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/manage/power',{
            type: params.type,
            rId: params.rId == 0 || params.rId ? params.rId : '',
            pName: params.	pName ? params.	pName : '',
            pId: params.pId == 0 || params.pId ? params.pId : '',
            pPater: params.pPater == 0 || params.pPater ? params.pPater : '',
            pSign: params.pSign ? params.pSign : '',
            pLevel: params.pLevel == 0 || params.pLevel ? params.pLevel : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 分配角色---用户
export function allotRolesUser(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/allot/roles/user',{
            rIds: params.rIds == 0 || params.rIds ? params.rIds : '',
            uId: params.uId == 0 || params.uId ? params.uId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 分配权限---用户
export function allotPowersUser(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/allot/powers/user',{
            pIds: params.pIds == 0 || params.pIds ? params.pIds : '',
            uId: params.uId == 0 || params.uId ? params.uId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 分配菜单栏---用户
export function allotMenubarUser(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/allot/menubar/user',{
            mIds: params.mIds == 0 || params.mIds ? params.mIds : '',
            uId: params.uId == 0 || params.uId ? params.uId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 分配设备----用户
export function allotDeviceUser(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/allot/device/user',{
            dIds: params.dIds ? params.dIds : '',
            uId: params.uId == 0 || params.uId ? params.uId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 获取角色对应的权限
export function getRolePowers(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/getRolePowers',{
            rId: params.rId == 0 || params.rId ? params.rId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 分配角色权限
export function allotRolePowers(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/allot/role/powers',{
            rId: params.rId == 0 || params.rId ? params.rId : '',
            pIds: params.pIds ? params.pIds : []
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 查询企业
export function getCompanys(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/getCompanys',{
            page: params.page ? params.page : 1,
            pageSize: params.pageSize ? params.pageSize : 10
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 添加企业
export function addCompany(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/addCompany',{
            cName: params.cName ? params.cName : '',
            cShortName: params.cShortName ? params.cShortName : '',
            imageUrl: params.imageUrl ? params.imageUrl : '',
            username: params.username ? params.username : '',
            password: params.password ? params.password : '',
            name: params.name ? params.name : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 修改企业信息
export function updateCompany(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/updateCompany',{
            cId: params.cId == 0 || params.cId ? params.cId : '',
            cName: params.cName ? params.cName : '',
            cShortName: params.cShortName ? params.cShortName : '',
            imageUrl: params.imageUrl ? params.imageUrl : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 删除企业
export function deleteCompany(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/deleteCompany',{
            cIds: params.cIds == 0 || params.cIds ? params.cIds : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 获取企业数据(用户,设备,产线,菜单栏)
export function getDataByCompany(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/getData/byCompany',{
            type: params.type,
            cId: params.cId == 0 || params.cId ? params.cId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 获取用户可以查看的数据（菜单栏、设备、角色、权限）
export function getUserLookData(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/getUserLookData',{
            type: params.type,
            uId: params.uId == 0 || params.uId ? params.uId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 获取用户所属企业
export function getUserCompany(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/getUserCompany',{
            uId: params.uId == 0 || params.uId ? params.uId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 产线管理
export function setProductionLine(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/manage/productionLine',{
            type: params.type,
            cId: params.cId == 0 || params.cId ? params.cId : '',
            plId: params.plId == 0 || params.plId ? params.plId : '',
            plName: params.plName ? params.plName : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 分配产线---设备
export function allotProductionLine(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/allot/productionLine/device',{
            plId: params.plId == 0 || params.plId ? params.plId : '',
            dId: params.dId ? params.dId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 获取企业数据(设备, 产线, 班次)
export function getCompanyData(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/getCompanyData',{
            type: params.type
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 班次管理
export function manageClasses(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/manage/classes',{
            type: params.type,
            cid: params.cid == 0 || params.cid ? params.cid : '',
            csId: params.csId == 0 || params.csId ? params.csId : '',
            csName: params.csName ? params.csName : '',
            csIsDefault: params.csIsDefault == 0 || params.csIsDefault ? params.csIsDefault : '',
            classes: params.classes && params.classes.length > 0 ? params.classes : []
        },true, 'application/json;charsetset=UTF-8').then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 获取设备所属班次
export function getDeviceClasses(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/getDevice/classes',{
            dId: params.dId == 0 || params.dId ? params.dId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 获取设备所属产线
export function getDeviceLine(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/getDevice/productionLine',{
            dId: params.dId == 0 || params.dId ? params.dId : ''
            // dId: params.dId ? params.dId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 分配班次----设备
export function allotClassesDevice(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/allot/classes/device',{
            cId: params.cId == 0 || params.cId ? params.cId : '',
            dId: params.dId ? params.dId : '',
            csId: params.csId ? params.csId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 角色查询----获取角色对应的菜单栏
export function userGetMenubarRole(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/getMenubar/role',{
            rId: params.rId == 0 || params.rId ? params.rId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 分配菜单栏----分配角色菜单栏
export function userAllotMenubarRole(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/allot/menubar/role',{
            mIds: params.mIds == 0 || params.mIds ? params.mIds : '',
            rId: params.rId == 0 || params.rId ? params.rId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 角色查询----获取角色对应的权限
export function userGetRolePowers(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/getRolePowers',{
            rId: params.rId == 0 || params.rId ? params.rId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 企业设置管理员权限
export function getDataCompanySetUserManger(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/getData/byCompany/setUserManger',{
            cId: params.cId == 0 || params.cId ? params.cId : '',
            uId: params.uId == 0 || params.uId ? params.uId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}
// 企业添加用户并设置管理员权限
export function getDataCompanySetAdduser(params = {}){
    return new Promise( (resolve, reject) => {
        jPost('/zhiyunduan/user/getData/byCompany/adduser',{
            cId: params.cId == 0 || params.cId ? params.cId : '',
            uUserName: params.uUserName ? params.uUserName : '',
            uPassword: params.uPassword ? params.uPassword : '',
            uSex: params.uSex ? params.uSex : '',
            uWorkId: params.uWorkId ? params.uWorkId : ''
        }).then( res => {
            resolve(res);
        }).catch( err => {
            reject(err);
        })
    })
}