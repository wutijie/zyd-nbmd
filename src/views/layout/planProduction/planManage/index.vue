<template>
    <div class="planProduction-planManage">
        <el-row type="flex" class="row-bg" justify="space-between" style="padding: 10px;">
			<div>
				<el-button type="danger"  size="small"  @click="add()">新增</el-button>
				<el-button type="primary" size="small"  @click="refresh">
					<i class="el-icon-refresh"></i>
				</el-button>
				<el-button type="primary" size="small" @click="outExcel">导出</el-button>
			</div>
			<div class="searchs">
				<el-col :span="12">
					<span>搜索条件：</span>
					<el-date-picker
						v-model="timedate"
						type="daterange"
						size="small"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						@change="chooseData">
					</el-date-picker>
				</el-col>
				<el-col :span="4">
					<el-select v-model="searchValue" placeholder="请选择类型" style="margin: 0 10px;" size="small" @change="searchChange">
						<el-option
							v-for="item in searchslist"
							:key="item.value"
							:label="item.name"
							:value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="4">
					<el-input v-model="inputValue" placeholder="请输入内容" v-if="isShowSelect" size="small"></el-input>
					<el-select v-model="planValue" v-else placeholder="请选择计划状态" size="small">
						<el-option
							v-for="item in planStatus"
							:key="item.value"
							size="small"
							:label="item.name"
							:value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<el-button type="primary" size="small" style="margin-left: 10px;" @click="askInfo">查询</el-button>
			</div>
		</el-row>
		<el-table style="width: 100%" :data="deviceInfo" class="el-table"  height="calc(100vh - 260px)" id="out-table"  :cell-class-name="tableRowClassName">
			<el-table-column label="序号" type="index" align="center" fixed>
			</el-table-column>
			<el-table-column label="计划编号" prop="planno" align="center" width="200" fixed> 
			</el-table-column>
			<el-table-column label="产品"  align="center">
				<el-table-column label="产品型号" prop="promodel" align="center" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column label="产品名称" prop="proname" align="center"  width="150" show-overflow-tooltip></el-table-column>
			</el-table-column>
			<el-table-column label="计划"  align="center">
				<el-table-column label="计划产量" prop="plannum" align="center" width="120"></el-table-column>
				<el-table-column label="计划日期" prop="addtime" align="center"  width="180" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="开始时间" prop="planbegintime" align="center"  width="180" show-overflow-tooltip></el-table-column>
				<el-table-column label="完成时间" prop="planendtime" align="center"  width="180" show-overflow-tooltip></el-table-column>
			</el-table-column>
			<el-table-column label="实际"  align="center">
				<el-table-column label="开始时间" prop="actualbegintime" align="center"  width="180" show-overflow-tooltip></el-table-column>
				<el-table-column label="完成时间" prop="actualendtime" align="center"  width="180" show-overflow-tooltip></el-table-column>
				<el-table-column label="逾期时间" prop="overtime" align="center"  width="180" show-overflow-tooltip></el-table-column>
			</el-table-column>
			<el-table-column label="报工产量" prop="worknum" align="center" width="100">
				<template  slot-scope="scope">
					<el-button type="text" class="w100p" size="small" @click="lookReported(scope.row)" >{{scope.row.worknum}}</el-button>
				</template>
			</el-table-column>
			<el-table-column label="计划完成率"  align="center">
				<template  slot-scope="scope">
					{{scope.row.planrate}}%
				</template>
			</el-table-column>
			<el-table-column label="不合格数" prop="notpassnum" align="center"></el-table-column>
			<el-table-column label="合格率" prop="passrate" align="center">
				<template  slot-scope="scope">
					{{scope.row.passrate}}%
				</template>
			</el-table-column>
			<el-table-column label="状态" prop="status" align="center"></el-table-column>
			<el-table-column label="二维码" align="center" width="100">
				<template slot-scope="scope">
					<div size="mini" class="iconfont icon-erweima-copy" @click="showCode(scope.$index, scope.row)"> </div>
				</template>
			</el-table-column>
			
			<el-table-column label="进度" prop="planrate" align="center" width="150">
				<template slot-scope="scope" >
					<el-progress :text-inside="true" :stroke-width="24" :percentage="scope.row.rateP"></el-progress>
				</template>
			</el-table-column>
			<el-table-column label="备注" prop="remark" align="center" width="150px"></el-table-column>
			<el-table-column align="center" label="操作" width="180">
				<template  slot-scope="scope" >
					<el-button type="text" size="small" v-if="scope.row.status!='已完成'"  @click="editList(scope.row)">编辑</el-button>
					<el-button type="text" size="small"  @click="gongdan(scope.row)">工单</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-row class="tal" justify="space-around">
			<el-col :span="14">
				<el-pagination background layout="total, sizes, prev, pager, next, jumper"
					:total="totalCount"
					:current-page="currentPage"
					:page-size="pageSize"
					:pager-count="5"
					@size-change="handleSizeChange"
					:page-sizes="[2, 5, 10, 20, 30]"
					@current-change="pageChange"></el-pagination>
			</el-col>
			<el-col :span="10">
				<el-button-group>
					<el-button class="noStart" type="primary" size="mini">未开始</el-button>
					<el-button class="runing" type="primary" size="mini">执行中</el-button>
					<el-button class="finished" type="primary" size="mini">已完成</el-button>
					<el-button class="invalid" type="primary" size="mini">作废</el-button>
					<el-button class="overdue" type="primary" size="mini">逾期</el-button>
				</el-button-group>
			</el-col>
		</el-row>
		<el-dialog title="添加计划单" :visible.sync="addAlert" width="55%">
			<AddEdit :editData="editData"  @editClose="editClose" @updateData='init'  ref="childone" ></AddEdit>
		</el-dialog>
		<el-dialog title="编辑计划单" :visible.sync="editAlert">
			<Edit :editData="editData"  @editClose="editClose" @updateData='init'></Edit>
		</el-dialog>
		<el-dialog title="报工产量列表" :visible.sync="lookReport" >
			<el-table :data="ReportOut"  show-summary height="400">
				<el-table-column type="index" label="序号"></el-table-column>
				<el-table-column property="orderno" label="工单编号"></el-table-column>
				<el-table-column property="actualbegintime" label="时间"></el-table-column>
				<el-table-column property="worknum" label="报工产量"></el-table-column>
				<el-table-column property="notpassnum" label="不合格数"></el-table-column>
				<el-table-column property="status" label="状态"></el-table-column>
				<el-table-column property="checkuser" label="审核人"></el-table-column>
			</el-table>
		</el-dialog>
    </div>
</template>

<script>
	import { WorkPlanManage,WorkPlanManage_GetWorkReport } from '../../../../api/deviceMation.js';
	import AddEdit from './component/add.vue'
	import Edit from './component/edit.vue'
	import { exportExcel } from '../../../../utils/publiFun.js';
	import QRCode  from "qrcodejs2"
    export default {
		components: {
			AddEdit,
			Edit
		},
        data(){
			return {
				value:'',
				timedate:[],
				searchslist:[
					{name:"全部",value:""},
					{name:"计划编号",value:"planno"},
					{name:"产品名称",value:"proname"},
					{name:"产品型号",value:"promodel"},
					{name:"计划状态",value:"status"}
				],
				planStatus:[
					{name:"全部",value:""},
					{name:'未开始',value:0},
					{name:'执行中',value:1},
					{name:'已完成',value:2},
					{name:'作废',value:3},
					{name:'预期',value:4},
				],
				searchValue:'',
				planValue:'',
				inputValue:'',
				isShowSelect:true,
				deviceInfo:[],
				StartTime:'',
				EndTime:'',
				addAlert:false,
				editAlert:false,
				editData:{},
				lookReport:false,
				ReportOut:[],   //报工产量列表
				addData:{},
				totalCount: 0,
				currentPage: 1,
				row:10,
				pageSize: 10,
			}
		},
		created() {
			this.init();
		},
		methods:{
			getLists(inputSelect){
				WorkPlanManage(this.StartTime,this.EndTime,this.searchValue,inputSelect,this.currentPage,this.pageSize).then(res => {
					let that = this;
					if(res.code == 200) {
						// console.log(res);
						this.deviceInfo = res.data;
						this.totalCount = res.count;
						res.data.forEach((item,index)=>{
							let time = ['addtime','planbegintime','planendtime','actualbegintime','actualendtime'];
							time.forEach((item2,index2)=>{
								item[item2] = this.$handleTime(item[item2]);
							})
							item.overtime = this.formatDuring(item.overtime);
							item.rateP = item.planrate;
							if(item.rateP>=100){
								item.rateP  = 100;
							}
						})
					}else{
						if(res.code==201){
							this.deviceInfo = [];
						}
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			init(){
				WorkPlanManage('','','','',1,10).then(res => {
					let that = this;
					if(res.code == 200) {
						// console.log(res);
						this.deviceInfo = res.data;
						this.totalCount = res.count;
						res.data.forEach((item,index)=>{
							let time = ['addtime','planbegintime','planendtime','actualbegintime','actualendtime'];
							time.forEach((item2,index2)=>{
								item[item2] = item[item2] ? this.$handleTime(item[item2]):item[item2];
							})
							item.overtime = this.formatDuring(item.overtime);
							let str = String(item.planrate);
							item.rateP = item.planrate;
							if(item.rateP>=100){
								item.rateP  = 100;
							}
						})
					}else{
						if(res.code==201){
							this.deviceInfo = [];
						}
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			lookReported(row){   //查看报工产量
				this.lookReport = true;
				WorkPlanManage_GetWorkReport(row.planno).then(res => {
					let that = this;
					if(res.code == 200) {
						// console.log(res);
						this.ReportOut = res.data;
					}else{
						if(res.code==201){
							this.ReportOut = res.data;
						}
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			editList(row){
				this.editAlert = true;
				this.editData = row;
			},
			gongdan(row){
				this.$router.push({
					name:'OrderManage',
					query:{searchtype:'orderno','searchvalue':row.planno}
				})
			},
			pageChange(pagenum){
				this.currentPage = pagenum;
				if(this.searchValue=='status'){
					this.getLists(this.planValue);
				}else{
					this.getLists(this.inputValue);
				}
			},
			handleSizeChange(val){
				this.currentPage = 1;
				this.pageSize = val;
				if(this.searchValue=='status'){
					this.getLists(this.planValue);
				}else{
					this.getLists(this.inputValue);
				}
			},
			refresh:function(){
				window.location.reload();
			},
			outExcel () {
				exportExcel("#out-table","计划排产-计划管理")
			},
			showCode(index, row){
				this.$alert('<div id="' + row.planno + '" class="tac"></div>', '', {
					dangerouslyUseHTMLString: true,
					center: true
				}).then( res => {
					// console.log(res);
				}).catch( err => {
					// console.log(err);
				});
				this.$nextTick( () => {
					let dv = document.getElementById(row.planno).innerHTML = '';
					let qrcode = new QRCode(row.planno, {
						width: 200,
						height: 200,
						text: row.planno
					})
				})
			},
			chooseData(){
				let times = this.timedate;
				if(times){
					this.StartTime = times[0].getFullYear()+'-'+this.addZero(times[0].getMonth()+1)+'-'+this.addZero(times[0].getDate());
					this.EndTime  = times[1].getFullYear()+'-'+this.addZero(times[1].getMonth()+1)+'-'+this.addZero(times[1].getDate());
				}else{
					this.StartTime='';
					this.EndTime = '';
				}
			},
			askInfo(){
				this.totalCount = 1;
				this.currentPage = 1;
				if(this.searchValue=='status'){
					this.getLists(this.planValue);
				}else{
					this.getLists(this.inputValue);
				}
			},
			addZero:function(num){
				if(num<10) return "0"+num;else return num;
			},
			add(){
				this.addAlert = true;
				this.$refs.childone.clearInput();
			},
			searchChange(){
				if(this.searchValue=='status'){
					this.isShowSelect = false;
				}else{
					this.isShowSelect = true;
				}
			},
			// 关闭弹框
			editClose(){
				this.addAlert = false;
				this.editAlert = false;
				this.editData = {};
				
			},
			getTenString(str){
				return str = str.substring(0,10)
			},
			formatDuring(mss) {
				var days = parseInt(mss / (60 * 60 * 24));
				var hours = parseInt((mss % ( 60 * 60 * 24)) / (60 * 60));
				var minutes = parseInt((mss % (60 * 60)) / ( 60));
				var seconds = (mss % ( 60));
				return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
			},
			tableRowClassName({row, column,rowIndex,columnIndex}) {
				if(columnIndex===1||columnIndex===0){
					if(row.status=="未开始" ){
						return 'noStart';
					}
					if(row.status=="执行中" ){
						return 'runing';
					}
					if(row.status=="已完成" ){
						return 'finished';
					}
					if(row.status=="作废" ){
						return 'invalid';
					}
					if(row.status=="逾期" ){
						return 'overdue';
					}
				}
				
				return '';
			}
	
		}
    }
</script>

<style lang="scss" scoped>
    .planProduction-planManage {
		min-width: 1279px;
        .searchs{
			span{font-size: 14px;}
        }
		.tal {
            margin-top: 0.5rem;
            button {
                width: 4rem;
                border: none;
            }
        }
    }

</style>
<style lang="scss">
	// .hover-row .noStart{
	// 	color: #333;
	// }
	// .hover-row .runing{
	// 	color: #333;
	// }
	// .hover-row .finished{
	// 	color: #333;
	// }
	// .hover-row .invalid{
	// 	color: #333;
	// }
	// .hover-row .overdue{
	// 	color: #333;
	// }
	.el-table .hover-row{
		color: #333333;
	}
	.el-table .el-button--text{
		color: #fff;
		background: #179397;
		padding: 5px 10px;
	}
	.el-table .el-progress-bar__outer,
	.el-table .el-progress-bar__outer div {
		border-radius: 0;
		color: #333;
	}
	.el-table td{
		overflow: hidden;
	}
	.noStart {
		background: #69706a!important;
		color: #fff;
		&:hover, &:focus {
			background: #69706a;
		}
	}
	.runing {
		background: #208c35!important;
		color: #fff;
		&:hover, &:focus {
			background: #208c35;
		}
	}
	.finished {
		background: #011ab5!important;
		color: #fff;
		&:hover, &:focus {
			background: #011ab5;
		}
	}
	.invalid {
		background: #9b0d17!important;
		color: #fff;
		&:hover, &:focus {
			background: #9b0d17;
		}
	}
	.overdue {
		background: #a9a11c!important;
		color: #fff;
		&:hover, &:focus {
			background: #a9a11c;
		}
	}
</style>