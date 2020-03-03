<template>
    <div class="deviceMenu-lineMation">
		<el-row type="flex" class="row-bg ul-search" justify="space-between">
			<el-select v-model="value" placeholder="请选择产线" @change="chooseLine()" class="selectValue">
				<el-option value="">全部产线</el-option>
				<el-option v-for="item in options" :label="item.groupid + item.groupname" :key="item.groupid" :value="item.groupid" ></el-option>
			</el-select>
			<div>
				<el-button type="primary" plain @click="refresh">
					<i class="el-icon-refresh"></i>
				</el-button>
				<el-button type="primary" plain @click="outExcel">导出</el-button>
			</div>
		</el-row>
		<el-table :data="linesList.ProLine" style="width: 100%" max-height="300px" id="out-table">
			<!-- <el-table-column  type="index" label="序号" width="150" align="center"></el-table-column> -->
			<el-table-column fixed prop="groupid" label="序号" width="150" align="center"></el-table-column>
			<el-table-column prop="groupname" label="产线名称" width="200" align="center"></el-table-column>
			<el-table-column prop="count" label="设备数量" width="200" align="center"></el-table-column>
			<el-table-column prop="linestatus" label="产线状态" width="120" align="center"></el-table-column>
			<el-table-column prop="UPH" label="产线产量" width="120" align="center"></el-table-column>
			<el-table-column prop="opentime" label="开机时间" width="120" align="center"></el-table-column>
			<el-table-column prop="worktime" label="工作时间" width="200" align="center"></el-table-column>
			<el-table-column prop="alarmcount" label="报警次数" width="120" align="center"></el-table-column>
			<el-table-column label="产线详情" width="100" align="center">
				<template >
					<span class="lineInfo" >详情</span>
				</template>
			</el-table-column>
		</el-table>
		<div>
			<el-row type="flex" class="row-bg" justify="space-around">
				<div class="linecharts">
					<div class="linechart-left">
						<p><span>设备运行时间</span></p>
						<div id="lineChart" class="linechart"></div>
					</div>
					<div class="linechart-right">
						<p><span>UPH每小时产量</span></p>
						<div id="columnChart" class="linechart"></div>
					</div>
				</div>
			</el-row>
		</div>
    </div>
</template>

<script>
	import { getLine } from '../../../../api/deviceMation.js';
	import { exportExcel } from '../../../../utils/publiFun.js';
    export default {
        data(){
			return {
				options:[],
				value:'',
				linesList:[],
				deviceTime:[],
				UPH:[]
			}
		},
		created() {
			getLine('').then(res => {
				let that = this;
				if(res.code == 200) {
					that.linesList = res.data;
					that.options = res.data.ProLine;
					that.deviceTime = res.data.runtime;
					that.UPH = res.data.UPH;
					that.getChart();
				}else{
					that.$message.error(res.msg)
				}
			}).catch(err => {
				this.$message.error(err.message)
			});
			
		},
		methods:{
			chooseLine(){
				var that = this;
				console.log(that.value);
				getLine(that.value).then(res => {
					let that = this;
					if(res.code == 200) {
						console.log(res);
						that.linesList = res.data;
					}else{
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			outExcel:function(){
				exportExcel("#out-table","设备数据-产线信息")	
			},
			refresh:function(){
				window.location.reload();
			},
			getChart(){
				let that = this;
				let myChart4 = that.$echarts.init(document.getElementById('lineChart'));
				let myChart5 = that.$echarts.init(document.getElementById('columnChart'));
				let option4 = {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['开机', '工作', '空闲'],
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: that.deviceTime.weekDate
					},
					yAxis: {
						type: 'value'
					},
					color: ['#28a745','#ffc107','#6c757d'],
					series: [
						{
							name: '开机',
							type: 'line',
							data: that.deviceTime.opentime
						},
						{
							name: '工作',
							type: 'line',
							data: that.deviceTime.worktime
						},
						{
							name: '空闲',
							type: 'line',
							data: that.deviceTime.resttime
						}
					]
				};
				let option5 = {
					color: ['#3398DB'],
					xAxis: {
						name: '时',
						data: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
						axisLine: {
							show: true
						},
						type: 'category',
						axisTick: {
							alignWithLabel: true
						}
					},
					yAxis: {
						name: '件',
						type: 'value',
						splitLine: {
							show: true,
							lineStyle: {
								width: 1,
								type: 'solid'
							}
						}
					},
					series: {
						type: 'bar',
						barWidth: '60%',
						data: that.UPH
					}
				};
				myChart4.setOption(option4);
				myChart5.setOption(option5);
			}
		}
			
    }
</script>

<style lang="scss" scoped>
    .deviceMenu-lineMation {
        .ul-search{
			padding: 10px;
		}
		.lineInfo{
			display: inline-block;
			color: #fff;
			padding: 5px 10px;
			background: #50a9b5;
		}
		.linecharts {
			margin-top: 20px;
			padding: 10px;
			width: 100%;
			display: flex;
			justify-content: space-around;
			>div{
				width: 48%;
				height: 360px;
				/*margin-left: 10px;*/
				border: 1px solid #eaeaea;
				padding-top: 20px;
				text-align: center;
				position: relative;
				p{
					position: absolute;
					width: 100%;
					text-align: center;
					top: -15px;
					left: 0;
					span{
						background: #fff;
					}
				}
				.linechart{
					width: 100%;
					height: 100%;
				}
			}
		}
    }
</style>