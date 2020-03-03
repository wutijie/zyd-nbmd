import { cGet, cPost } from '../utils/cServe.js'
import { jGet, jPost } from '../utils/jServe.js'
export function getDeviceInfo(params){  
	return new Promise( (resolve, reject) => {
		cPost('DeviceData.asmx/DeviceInfo',{
				// userTelNumber:'13806665159',
			}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function getLine(groupid){  //获取产线
	return new Promise( (resolve, reject) => {
		cPost('DeviceData.asmx/ProductLine',{
				// userTelNumber:'13806665159',
				custid:'000057',
				groupid:groupid
			}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function getDeviceRun(deviceid,begintime,endtime,recievetime){  //设备运行
	return new Promise( (resolve, reject) => {
		cPost('DeviceData.asmx/DeviceRun',{
				deviceid:deviceid,
				begintime:begintime,
				endtime:endtime,
				recievetime:recievetime
			}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
// /DeviceManage.asmx/BasicInfo
export function getDeviceBaseInfo(){  //获取设备信息
	return new Promise( (resolve, reject) => {
		cPost('DeviceManage.asmx/BasicInfo',{
			}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function getDeviceDeviceMaintain(deviceid,model,status,plandate){  //获取设备保养
	return new Promise( (resolve, reject) => {
		cPost('DeviceManage.asmx/DeviceMaintain',{
			deviceid:deviceid,
			model:model,
			status:status,
			plandate:plandate,
			}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function getDeviceRepair(deviceid,model,status,plandate){  //获取设备维修
	return new Promise( (resolve, reject) => {
		cPost('DeviceManage.asmx/DeviceRepair',{
			deviceid:deviceid,
			model:model,
			status:status,
			plandate:plandate,
			}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function getDeviceWarning(deviceId,beginTime){  //设备运行--报警数据
	return new Promise( (resolve, reject) => {
		jPost('/zhiyunduan/device/getWaringData',{
			custId:'000057',
			deviceId:deviceId,
			beginTime:beginTime,
			}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function BasicInfo_Add(custId,devicesno,devieid,devicename,model,appearancesize,param1,param2,param3,param4,param5){  //设备添加
	return new Promise( (resolve, reject) => {
		cPost('DeviceManage.asmx/BasicInfo_Add',{
			custId:custId,
			devicesno:devicesno,
			devieid:devieid,
			devicename:devicename,
			model:model,
			appearancesize:appearancesize,
			param1:param1,
			param2:param2,
			param3:param3,
			param4:param4,
			param5:param5
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function BasicInfo_Delete(id){  //设备删除
	return new Promise( (resolve, reject) => {
		cPost('DeviceManage.asmx/BasicInfo_Delete',{
			id:id
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function DeviceMaintain_Delete(id){  //设备保养--删除
	return new Promise( (resolve, reject) => {
		cPost('DeviceManage.asmx/DeviceMaintain_Delete',{
			id:id
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}

export function DeviceRepair_Delete(id){  //设备维修--删除
	return new Promise( (resolve, reject) => {
		cPost('DeviceManage.asmx/DeviceRepair_Delete',{
			id:id
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function BasicInfo_Edit(id,custId,devicesno,devieid,devicename,model,appearancesize,param1,param2,param3,param4,param5){  //设备管理--基础信息--编辑
	return new Promise( (resolve, reject) => {
		cPost('DeviceManage.asmx/BasicInfo_Edit',{
			id:id,
			custId:custId,
			devicesno:devicesno,
			devieid:devieid,
			devicename:devicename,
			model:model,
			appearancesize:appearancesize,
			param1:param1,
			param2:param2,
			param3:param3,
			param4:param4,
			param5:param5
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
// DeviceRepair_Add
export function DeviceRepair_Add(deviceid,devicename,model,startplantime,endplantime,remark){  //设备维修--增加
	return new Promise( (resolve, reject) => {
		cPost('DeviceManage.asmx/DeviceRepair_Add',{
			deviceid:deviceid,
			devicename:devicename,
			model:model,
			startplantime:startplantime,
			endplantime:endplantime,
			remark:remark
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
// DeviceRepair_Edit
export function DeviceRepair_Edit(id,deviceid,devicename,model,startplantime,endplantime,remark){  //设备维修--增加
	return new Promise( (resolve, reject) => {
		cPost('DeviceManage.asmx/DeviceRepair_Edit',{
			id:id,
			deviceid:deviceid,
			devicename:devicename,
			model:model,
			startplantime:startplantime,
			endplantime:endplantime,
			remark:remark
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function TouchpadData(custid,deviceid,searchdate){  //触屏数据
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/TouchpadData',{
			custid:custid,
			deviceid:deviceid,
			searchdate:searchdate,
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function CycleCheck(custid,deviceid,searchdate){  //周期检查
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/CycleCheck',{
			custid:custid,
			deviceid:deviceid,
			searchdate:searchdate,
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function DeviceRun_DeviceInfo(deviceid){  //设备运行--设备信息
	return new Promise( (resolve, reject) => {
		cPost('DeviceData.asmx/DeviceRun_DeviceInfo',{
			deviceid:deviceid,
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
// DeviceData.asmx/DeviceRun_UPH
export function DeviceRun_UPH(devicesno,begintime,endtime){  //设备运行--UPH
	return new Promise( (resolve, reject) => {
		cPost('DeviceData.asmx/DeviceRun_UPH',{
			custid:'000057',
			devicesno:devicesno,
			begintime:begintime,
			endtime:endtime
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}

export function DeviceRun_RunTime(devicesno,begintime,endtime){  //设备运行--运行时间
	return new Promise( (resolve, reject) => {
		cPost('DeviceData.asmx/DeviceRun_RunTime',{
			custid:'000057',
			devicesno:devicesno,
			begintime:begintime,
			endtime:endtime
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
// DeviceRun_ReceiveInfo
export function DeviceRun_ReceiveInfo(devicesno,recievetime){  //设备运行--接收信息
	return new Promise( (resolve, reject) => {
		cPost('DeviceData.asmx/DeviceRun_ReceiveInfo',{
			custid:'000057',
			devicesno:devicesno,
			recievetime:recievetime
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function SpotCheckManage(did,page,row){  //按灯数据--点检管理
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheckManage',{
			did:did,
			page:page,
			row:row
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function SpotCheckManage_Add(dids,source,checktype,content,checkbtn){  //按灯数据--点检管理--添加
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheckManage_Add',{
			dids:dids,
			source:source,
			checktype:checktype,
			content:content,
			checkbtn:checkbtn
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}

export function SpotCheckManage_Edit(dids,source,checktype,content,checkbtn,id){  //按灯数据--点检管理--编辑
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheckManage_Edit',{
			dids:dids,
			source:source,
			checktype:checktype,
			content:content,
			checkbtn:checkbtn,
			id:id
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function SpotCheckManage_Delete(id){  //按灯数据--点检管理--删除
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheckManage_Delete',{
			id:id
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
// /AndonData.asmx/SpotCheckRecord
export function SpotCheckRecord(did,begintime,endtime,page,row){  //按灯数据--点检记录
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheckRecord',{
			did:did,
			begintime:begintime,
			endtime:endtime,
			page:page,
			row:row
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function SpotCheckRecord_GetContent(did,scno){  //按灯数据--获取点检内容
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheckRecord_GetContent',{
			did:did,
			scno:scno
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
// SpotCheckRecord_AddContent
export function SpotCheckRecord_AddContent(did,scno,ids,checktime){  //按灯数据--获取记录
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheckRecord_AddContent',{
			did:did,
			scno:scno,
			ids:ids,
			checktime:checktime
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function SpotCheckRecord_Delete(scno){  //按灯数据--获取记录--删除
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheckRecord_Delete',{
			scno:scno
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}

export function SpotCheckRecord_Submit(json,scno){  //按灯数据--获取记录--提交
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheckRecord_Submit',{
			json:json,
			scno:scno
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
// 
export function SpotCheckRecord_GetNewContent(did,scno,source){  //按灯数据--获取记录--获取新内容
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheckRecord_GetNewContent',{
			did:did,
			scno:scno,
			source:source
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function SpotCheck_GetNo(){  //按灯数据--获取记录--获取编号
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheck_GetNo',{}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function SpotCheckRecord_Confirm(scno){  //按灯数据--获取记录--确认
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheckRecord_Confirm',{
			scno:scno
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}

export function SpotCheckRecord_Add(dids,source,checktime,scno){  //按灯数据--获取记录--添加
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheckRecord_Add',{
			dids:dids,
			source:source,
			checktime:checktime,
			scno:scno
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function SpotCheckRecord_GetDeviceInfo(scno){  //按灯数据--获取记录--获取设备信息
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheckRecord_GetDeviceInfo',{
			scno:scno
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function SpotCheckRecord_ContentEdit(checkvalue,id){  //按灯数据--获取记录--内容编辑
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheckRecord_ContentEdit',{
			checkvalue:checkvalue,
			id:id
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function SpotCheckReport(custid,deviceid,source,searchdate){  //按灯数据--点检报表
	return new Promise( (resolve, reject) => {
		cPost('AndonData.asmx/SpotCheckReport',{
			custid:custid,
			deviceid:deviceid,
			source:source,
			searchdate:searchdate
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function WorkPlanManage(begintime,endtime,searchtype,searchvalue,page,row){  //计划排产--计划管理
	return new Promise( (resolve, reject) => {
		cPost('PlanProduction.asmx/WorkPlanManage',{
			begintime:begintime,
			endtime:endtime,
			searchtype:searchtype,
			searchvalue:searchvalue,
			page:page,
			row:row
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
// /PlanProduction.asmx/PlanProduction_GetNewNumber
export function PlanProduction_GetNewNumber(){  //计划排产--获取计划编号
	return new Promise( (resolve, reject) => {
		cPost('PlanProduction.asmx/PlanProduction_GetNewNumber',{
			type:1,
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function ProductInfo(){  //计划排产--获取计划编号
	return new Promise( (resolve, reject) => {
		cPost('PlanProduction.asmx/ProductInfo',{}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function ProductInfo_Add(promodel,proname){  //计划排产--产品信息--添加
	return new Promise( (resolve, reject) => {
		cPost('PlanProduction.asmx/ProductInfo_Add',{
			promodel:promodel,
			proname:proname
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function ProductInfo_Edit(promodel,proname,id){  //计划排产--产品信息--编辑
	return new Promise( (resolve, reject) => {
		cPost('PlanProduction.asmx/ProductInfo_Edit',{
			promodel:promodel,
			proname:proname,
			id:id
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function ProductInfo_Delete(id){  //计划排产--产品信息--删除
	return new Promise( (resolve, reject) => {
		cPost('PlanProduction.asmx/ProductInfo_Delete',{
			id:id
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function WorkPlanManage_Add(planno,proid,plannum,planbegintime,planendtime,remark){  //计划排产--添加管理
	return new Promise( (resolve, reject) => {
		cPost('PlanProduction.asmx/WorkPlanManage_Add',{
			planno:planno,
			proid:proid,
			plannum:plannum,
			planbegintime:planbegintime,
			planendtime:planendtime,
			remark:remark
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function WorkPlanManage_Edit(proid,plannum,planbegintime,planendtime,remark,id){  //计划排产--编辑管理
	return new Promise( (resolve, reject) => {
		cPost('PlanProduction.asmx/WorkPlanManage_Edit',{
			proid:proid,
			plannum:plannum,
			planbegintime:planbegintime,
			planendtime:planendtime,
			remark:remark,
			id:id
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function WorkPlanManage_GetWorkReport(planno){  //计划排产--查看报工信息
	return new Promise( (resolve, reject) => {
		cPost('PlanProduction.asmx/WorkPlanManage_GetWorkReport',{
			planno:planno,
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
// 设备getDeviceData
export function getDeviceData(type,page,pageSize,dName){  //查询设备
	return new Promise( (resolve, reject) => {
		jPost('/zhiyunduan/device/getDeviceData',{
			type:type,
			page:page,
			pageSize:pageSize,
			dName:dName
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function device(type,dId,dNumber,dModel,dName,dImage,dDeviceBrand,dassetNumber,dDescriptions,dParameters,dMeasure,dTerritory){  //查询设备
	return new Promise( (resolve, reject) => {
		jPost('/zhiyunduan/device/manage/device',{
			type:type,
			dId:dId,
			dNumber:dNumber,
			dModel:dModel,
			dName:dName,
			dImage:dImage,
			dDeviceBrand:dDeviceBrand,
			dAssetNumber:dassetNumber,
			dDescriptions:dDescriptions,
			dParameters	:dParameters,
			dMeasure:dMeasure,
			dTerritory:dTerritory
		}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function getdeviceId(){  //自动生成设备序列号
	return new Promise( (resolve, reject) => {
		jPost('/zhiyunduan/device/selfCreate/deviceId',{}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}
export function assetNumber(){  //自动生成资产编号
	return new Promise( (resolve, reject) => {
		jPost('/zhiyunduan/device/selefCreate/assetNumber',{}).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	})
}