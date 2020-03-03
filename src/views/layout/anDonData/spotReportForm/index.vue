<template>
	<div class="anDonData-spotReportForm">
		<el-row type="flex" class="row-bg" justify="space-around" style="padding: 10px;">
			<div class="searchs">
				<span>设备编号：</span>
				<el-select v-model="value" filterable placeholder="请输入设备编号"  @change="chooseDevice()">
					<el-option
						v-for="(item, index) in devicesnoSelect"
						:key="index"
						:label="item.deviceid + ' ' + item.deviceName + ' ' + item.Model"
						:value="item.deviceid + '--' + item.deviceName + '--' + item.Model + '--' +item.olddeviceid"
					></el-option>
				</el-select>
			</div>
			<div class="searchs">
				<span>时间：</span>
				<el-date-picker 
					v-model="timedate"
					type="month"
					value-format="yyyy-MM"
					@change="chooseData"
					placeholder="选择月">
				</el-date-picker>
			</div>
			<div class="searchs">
				<span>来源：</span>
				<el-select v-model="sourceValue" filterable placeholder=""  @change="chooseData(value)">
					<el-option v-for="(item, index) in sourceList" :key="index" :label="item.name" :value="item.value" ></el-option>
				</el-select>
			</div>
			<div>
				<el-button type="primary" plain @click="refresh"><i class="el-icon-refresh"></i></el-button>
				<el-button type="primary" plain @click="outExcel">导出</el-button>
			</div>
		</el-row>
		<el-table style="width: 101%" class="hiddenTable" border>
			<el-table-column label="设备编号" align="center"></el-table-column>
			<el-table-column :label="device.deviceid" align="center"></el-table-column>
			<el-table-column label="设备名称" align="center"></el-table-column>
			<el-table-column :label="device.deviceName" align="center"></el-table-column>
			<el-table-column label="设备型号" align="center"></el-table-column>
			<el-table-column :label="device.Model" align="center"></el-table-column>
			<el-table-column label="月份" align="center"></el-table-column>
			<el-table-column :label="timedate" align="center"></el-table-column>
		</el-table>
		<el-table style="width: 100%" :data="deviceInfo" >
				<el-table-column label="No" type="index" align="center"></el-table-column>
				<el-table-column prop="content" label="点检内容"  align="center"></el-table-column>
				<el-table-column label="日检情况报表:良好(√)、有问题可用(Δ)、故障不可用(╳)、计划维修(Ο)  " align="center">
					<el-table-column v-for="item in lists"  :label="item"  :key="item" align="center" :prop="'d'+item" ></el-table-column>
				</el-table-column>
		</el-table>
		<!-- <el-table style="width: 100%" :data='antableData'  :span-method="objectSpanMethod" border :show-header="false">
				<el-table-column lable prop="date"  width="40px" align="center"></el-table-column>
				<el-table-column lable prop="name" width="95px" align="center"></el-table-column>
				<el-table-column lable prop="id"  width="95px" align="center"></el-table-column>
				<el-table-column lable prop="address" width="40px" align="center"></el-table-column>
				<el-table-column lable prop="people" width="40px" align="center"></el-table-column>
				<el-table-column  v-for="item in lists"  :label="item"  :key="item" align="center" :prop="'d'+item"></el-table-column>
		</el-table> -->
	</div>
</template>

<script>
import { SpotCheckReport } from '../../../../api/deviceMation.js';
export default {
	data() {   
		return {
			sourceList: [
				{ value: 1, name: '触屏' },
				{ value: 2, name: '盒子box' },
				{ value: 3, name: 'web' },
				{ value: 4, name: 'app' },
				{ value: 5, name: 'api' },
				{ value: 6, name: 'sdk' }
			],
			// antableData: [{
			//   id: '有问题可用',
			//   date: '点检标识',
			//   name: '良好',
			//   address: '签名',
			//   people:'点检人'
			// }, {
			//   id: '△',
			//   date: '',
			//   name: '√',
			//   address: '',
			//   people:''
			// }, {
			//   id: '计划维修',
			//   date: '',
			//   name: '故障不可用',
			//   address: '',
			//   people:''
			// }, {
			//   id: '○',
			//   date: '',
			//   name: '×',
			//   address: '',
			//   people:''
			// }],
			sourceValue: 1,
			value:'',
			devicesnoSelect: [],
			deviceInfo: [],
			tableData:[],
			device:{
				deviceid:'',
				deviceName:'',
				Model:''
			},
			custid:'',
			timedate:'',
			timedates:this.timedate,
			lists:['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
		};
	},
	created() {
		this.getNowDate();
		SpotCheckReport('', '', this.sourceValue, this.timedate)
			.then(res => {
				let that = this;
				if (res.code == 200) {
					that.devicesnoSelect = res.data.DeviceSelect;
					that.deviceInfo = res.data.SpotCheckReport;
					if(res.data.DeviceSelect.length>0){
						that.value = res.data.DeviceSelect[0].deviceid + '--' + res.data.DeviceSelect[0].deviceName + '--' + res.data.DeviceSelect[0].Model + '--' +res.data.DeviceSelect[0].olddeviceid;
						that.custid = res.data.DeviceSelect[0].custid;
						that.device =  res.data.DeviceSelect[0];
					}
				} else {
					that.$message.error(res.msg);
				}
			})
			.catch(err => {
				this.$message.error(err.message);
			});
	},
	methods: {
		getNowDate: function() {
			this.timedate = new Date().getFullYear() + '-' + this.addZero(new Date().getMonth() + 1) ;
		},
		addZero: function(num) {
			if (num < 10) return '0' + num;
			else return num;
		},
		refresh:function(){
			window.location.reload();
		},
		outExcel () {
			// exportExcel("#out-table","安灯数据-周期检查")
		},
		chooseDevice(){
			console.log(this.value)
			let devicel = this.value.split('--');
			this.device = {
				deviceid:devicel[0],
				deviceName:devicel[1],
				Model:devicel[2]
			}
			this.newDeviceInfo()
		},
		newDeviceInfo(){
			let devicel = this.value.split('--');
			SpotCheckReport( this.custid,devicel[3], this.sourceValue, this.timedate)
				.then(res => {
					let that = this;
					if (res.code == 200) {
						that.deviceInfo = res.data.SpotCheckReport;
					} else {
						that.$message.error(res.msg);
					}
				})
				.catch(err => {
					this.$message.error(err.message);
				});
		},
		chooseData(){
			console.log(this.timedate)
			this.newDeviceInfo();
		},
		// objectSpanMethod({ row, column, rowIndex, columnIndex }){
		// 	if ((columnIndex === 0) || (columnIndex === 3) ||(columnIndex === 4)) {
		// 	  if (rowIndex % 4 === 0) {
		// 		return {
		// 		  rowspan:4,
		// 		  colspan: 1
		// 		};
		// 	  } else {
		// 		return {
		// 		  rowspan: 0,
		// 		  colspan: 0
		// 		};
		// 	  }
		// 	}
		// }
	}
};
</script>

<style lang="scss" scoped>
.anDonData-spotReportForm {
	.searchs{
			span{font-size: 14px;}
	}
}
</style>
<style>
	.hiddenTable .el-table__body-wrapper.is-scrolling-none{display: none !important;}
	.hiddenTable .el-table__body-wrapper.is-scrolling-left{display: none !important;}
</style>
