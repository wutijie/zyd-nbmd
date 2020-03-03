<template>
	<div class="deviceMenu-deviceMation">
		<el-row style="padding: 10px;padding-top: 0; text-align: right;">
			<el-button type="primary" plain @click="refresh">
				<i class="el-icon-refresh"></i>
			</el-button>
			<el-button type="primary" plain @click="outExcel">导出</el-button>
		</el-row>
		<el-table :data="deviceInfo" style="width: 100%" height="calc(100vh - 200px)"  id="out-table">
			<el-table-column fixed prop="deviceid" label="设备编号" width="150" align="center"></el-table-column>
			<el-table-column prop="deviceName" label="设备名称" width="200" align="center"></el-table-column>
			<el-table-column prop="Model" label="设备型号" width="200" align="center"></el-table-column>
			<el-table-column prop="devicesno" label="设备序列号" width="120" align="center"></el-table-column>
			<el-table-column prop="systemBrand" label="系统品牌" width="120" align="center"></el-table-column>
			<el-table-column prop="systemModel" label="系统型号" width="120" align="center"></el-table-column>
			<el-table-column prop="groupname" label="产线名称" width="200" align="center"></el-table-column>
			<el-table-column prop="Area" label="地域" width="120" align="center"></el-table-column>
			<el-table-column prop = "linestatus" label="设备状态" width="100" align="center">
				<template slot-scope="scope">
					<span class="deviceStatus" :class="scope.row.linestatus==0?'gray':'red'"></span>
					<span v-if="scope.row.linestatus==0" hidden="hidden">离线</span>
					<span v-if="scope.row.linestatus==1" hidden="hidden">在线</span>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
    import { getDeviceInfo } from '../../../../api/deviceMation.js';
	import { exportExcel } from '../../../../utils/publiFun.js';
	export default {
		data() {
			return {
				deviceInfo: []
			}
		},
		created() {
			getDeviceInfo().then(res => {
				let that = this;
				if(res.code == 200) {
					console.log(res);
					that.deviceInfo = res.data;
				}else{
					that.$message.error(res.msg)
				}
			}).catch(err => {
				this.$message.error(err.message)
			});
		},
		mounted() {},
		methods: {
			outExcel () {
				exportExcel("#out-table","设备数据-基础信息")
			},
			refresh:function(){
				window.location.reload();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.deviceMenu-deviceMation {margin: 0 auto;padding: 10px;}
	.deviceStatus{
		display: inline-block;
		width: 25px;
		height: 25px;
		border-radius: 50%;
	}
	.gray {
		background: #ccc;
	}
	.red{
		background: #13CE66; 
	}
</style>