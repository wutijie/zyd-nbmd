<template>
    <div class="anDonData-weekCheck">
        <el-row type="flex" class="row-bg" justify="space-around" style="padding: 10px;">
			<div class="searchs">
				<span>设备编号：</span>
				<el-select v-model="value" filterable placeholder="请输入设备编号" @change="searchNumber()">
					<el-option
					v-for="(item,index) in devicesnoSelect"
					:key="index"
					:label="item.deviceid+' '+item.deviceName+' '+item.Model"
					:value="item.deviceid+'--'+item.custid">
					</el-option>
				</el-select>
			</div>
			<div class="searchs">
				<span>时间：</span>
				<el-date-picker 
					v-model="timedate"
					type="date"
					value-format="yyyy-MM-dd"
					@change="searchNumber"
					placeholder="选择日期">
				</el-date-picker>
			</div>
			<div>
				<el-button type="primary" plain @click="refresh">
					<i class="el-icon-refresh"></i>
				</el-button>
				<el-button type="primary" plain @click="outExcel">导出</el-button>
			</div>
        </el-row>
		<el-table :data="deviceInfo" style="width: 100%" height="calc(100vh - 240px)" id="out-table">
			<el-table-column fixed prop="devicesno" label="序号" align="center"></el-table-column>
			<el-table-column prop="deviceid" label="设备比编号" align="center"></el-table-column>
			<el-table-column prop="devicename" label="设备名称"  align="center"></el-table-column>
			<el-table-column prop="appearancesize" label="类型" align="center"></el-table-column>
			<el-table-column prop="param1" label="不合格数" align="center"></el-table-column>
			<el-table-column prop="param1" label="不合格原因" align="center"></el-table-column>
			<!-- <el-table-column
			fixed="right"
			label="操作"
			width="100">
			<template slot-scope="scope">
				<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
				<el-button type="text" size="small" @click="Delete(scope.row)">删除</el-button>
			</template>
			</el-table-column> -->
		</el-table>
    </div>
</template>

<script>
	import { CycleCheck } from '../../../../api/deviceMation.js';
	import { exportExcel } from '../../../../utils/publiFun.js';
    export default {
        data(){
			return{
				devicesnoSelect:[],
				value:'',
				deviceInfo:[],
				timedate:''
			}
		},
		created() {
			this.getNowDate();
			CycleCheck('','',this.timedate).then(res => {
				let that = this;
				if(res.code == 200) {
					console.log(res);
					that.devicesnoSelect = res.data.DeviceSelect;
					that.deviceInfo = res.data.CycleCheck;
					if(res.data.DeviceSelect.length>0){
						that.value = res.data.DeviceSelect[0].deviceid+"--"+res.data.DeviceSelect[0].custid;
					}
				}else{
					that.$message.error(res.msg)
				}
			}).catch(err => {
				this.$message.error(err.message)
			});
		},
		methods:{
			getNowDate:function(){
				this.timedate = new Date().getFullYear() + "-"+this.addZero(new Date().getMonth()+1)+"-"+this.addZero(new Date().getDate());
			},
			addZero:function(num){
				if(num<10) return "0"+num;else return num;
			},
			refresh:function(){
				window.location.reload();
			},
			outExcel () {
				exportExcel("#out-table","安灯数据-周期检查")
			},
			searchNumber(){
				let items = this.value.split("--");
				let custid = items[1];
				let deid = items[0];
				CycleCheck(deid,custid,this.timedate).then(res => {
					let that = this;
					if(res.code == 200) {
						console.log(res);
						that.deviceInfo = res.data.CycleCheck;
					}else{
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			}
		}
    }
</script>

<style lang="scss" scoped>
    .anDonData-weekCheck {
        .searchs{
				span{font-size: 14px;}
		}
    }
</style>