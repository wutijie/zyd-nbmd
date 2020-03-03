<template>
	<div class="deviceMenu-deviceMation">
		<el-row style="padding: 10px; padding-top: 0;" justify="space-between">
			<el-col :span="12">
				<el-button type="danger"  size="small" @click="showAdd">添加</el-button>
				<el-button type="primary" size="small" @click="refresh">
					<i class="el-icon-refresh"></i>
				</el-button>
				<el-button type="primary" size="small" @click="outExcel">导出</el-button>
			</el-col>
			<div class="searchs">
				<!-- <el-col :span="12">
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
				</el-col> -->
				
				<el-col :span="8">
					<el-input v-model="inputValue" placeholder="请输入设备名称" size="small" @change="changeIn"></el-input>
				</el-col>
				<el-button type="primary" size="small" style="margin-left: 10px;" @click="askInfo">查询</el-button>
			</div>
		</el-row>
		<el-table :data="deviceInfo" style="width: 100%" height="calc(100vh - 260px)" id="out-table" :cell-class-name="tableRowClassName">
			<el-table-column fixed type="index" label="序号" align="center"></el-table-column>
			<!-- <el-table-column fixed prop="dstatus" label="设备状态" align="center" min-width="120"></el-table-column> -->
			<el-table-column fixed prop="dnumber" label="设备编号" align="center" min-width="180"></el-table-column>
			<el-table-column prop="dname" label="设备名称" align="center" min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="dassetNumber" label="资产编号" align="center" min-width="180"></el-table-column>
			<el-table-column prop="" label="设备" align="center" >
				<!-- <el-table-column prop="" label="厂家名称" align="center"></el-table-column> -->
				<el-table-column prop="dmodel" label="型号" width="100" align="center"></el-table-column>
				<el-table-column prop="deviceId" label="序列号" align="center"></el-table-column>
				<!-- <el-table-column prop="deviceId" label="重量" align="center"></el-table-column> -->
				<el-table-column prop="dmeasure" label="外形尺寸" width="150" align="center"></el-table-column>
				<el-table-column prop="ddeviceBrand" label="品牌" align="center"></el-table-column>
				<el-table-column prop="dterritory" label="产地" align="center"></el-table-column>
			</el-table-column>
			<el-table-column prop="plName" label="产线" align="center" ></el-table-column>
			<el-table-column prop="csName" label="班次" align="center" min-width="125"></el-table-column>
			<el-table-column prop="dcycleMaintainNum" label="周期保养" min-width="100" align="center" ></el-table-column>
			<el-table-column prop="dsecondMaintainNum" label="二次保养" align="center" min-width="100"></el-table-column>
			<el-table-column prop="dparameters" label="设备参数" align="center" width="120">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="lookPar(scope.row)">查看参数</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="ddescriptions" label="设备描述" align="center" width="120">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="lookDes(scope.row)">查看描述</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="drepairNum" label="设备维修" align="center"  min-width="100"></el-table-column>
			<el-table-column prop="dfaultNum" label="设备故障" align="center"  min-width="100"></el-table-column>
			<el-table-column
			label="操作"
			align="center"
			width="150">
			<template slot-scope="scope">
				<el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
				<el-button type="text" size="small" @click="Delete(scope.row)">删除</el-button>
			</template>
			</el-table-column>
		</el-table>
		<el-row class="tal" style="margin-top: 10px;">
			<el-col :span="12">
				<el-pagination background layout="total, sizes, prev, pager, next, jumper"
					:total="totalCount"
					:current-page="currentPage"
					:page-size="pageSize"
					@size-change="handleSizeChange"
					:page-sizes="[2, 5, 10, 20, 30]"
					@current-change="pageChange"></el-pagination>
			</el-col>
			<el-col :span="12">
				<el-button-group>
					<el-button class="overdue" type="primary" size="mini">维修</el-button>
					<el-button class="runing" type="primary" size="mini">保养</el-button>
					<el-button class="invalid" type="primary" size="mini">故障</el-button>
				</el-button-group>
			</el-col>
		</el-row>		
		<el-dialog title="编辑" :visible.sync="editAlert">
			<AddEdit :editData="editData"  @editClose="editClose" @updateData='init'></AddEdit>
		</el-dialog>
		
	</div>
</template>

<script>
    import { getDeviceData,device } from '../../../../api/deviceMation.js';
    import { exportExcel } from '../../../../utils/publiFun.js';
	import AddEdit from './component/addedit.vue'
	export default {
		components: {
			AddEdit
		},
		data() {
			return {
				deviceInfo: [],
				timedate:[],
				editAlert:false,
				editData:{},
				type: 1,
				totalCount: 0,
				currentPage: 1,
				row:10,
				pageSize: 10,
				dName:'',
				StartTime:'',
				EndTime:'',
				inputValue:''
			}
		},
		created() {
			this.init();
		},
		mounted() {},
		methods: {
			handleClick:function(row){
				console.log(row);
				this.editAlert = true;
				this.editData = row;
			},
			init:function () {
				if(this.inputValue){
					this.type=2
				}else{
					this.type=1
				}
				getDeviceData(this.type,this.currentPage,this.pageSize,this.inputValue).then(res => {
					let that = this;
					if(res.code == 200) {
						that.deviceInfo = res.data.deviceData;
						this.totalCount = res.data.count;
						res.data.deviceData.forEach((item,index)=>{
							if(item.dstatus==0){
								item.dstatus = "正常"
							}
							if(item.dstatus==1){
								item.dstatus = "故障"
							}
							if(item.dstatus==2){
								item.dstatus = "保养"
							}
							if(item.dstatus==3){
								item.dstatus = "维修"
							}
						})
					}else{
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			changeIn(){
				if(this.inputValue){
					this.type=2
				}else{
					this.type=1
				}
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
			pageChange(pagenum){
				this.currentPage = pagenum;
				this.init();
				
			},
			handleSizeChange(val){
				this.currentPage = 1;
				this.pageSize = val;
				this.init();
			},
			askInfo(){
				this.totalCount = 1;
				this.currentPage = 1;
				this.init();
			},
			outExcel () {
				exportExcel("#out-table","设备管理-设备信息")
			},
			lookDes(row){
				let html = '';
				let newO = JSON.parse(row.ddescriptions);
				if(newO[0].name){
					for (var i = 0; i < newO.length; i++) {
						html+="<div><span>"+newO[i].name+" : </span><span>"+newO[i].value+"</span></div>"
					}
					this.$alert(html, '查看描述', {
						dangerouslyUseHTMLString: true
					});
				}else{
					this.$message.error("暂无描述")
				}
			},
			lookPar(row){
				let html = '';
				let newO = JSON.parse(row.dparameters);
				if(newO[0].name){
					for (var i = 0; i < newO.length; i++) {
						html+="<div><span>"+newO[i].name+" : </span><span>"+newO[i].value+"</span></div>"
					}
					this.$alert(html, '查看参数', {
						dangerouslyUseHTMLString: true
					});
				}else{
					this.$message.error("暂无参数")
				}
			},
			refresh:function(){
				window.location.reload();
			},
			showAdd:function(){
				this.editAlert = true;
				this.editData = {
					add:1
				}
			},
			Delete:function(scope){
				console.log(scope.id)
				this.$confirm('此操作将永久删除, 是否继续?', '提示', { type: 'warning' })
					.then(() => { // 向服务端请求删除
						
							console.log("edit");
								device(3,scope.did,'','','','','','','','','','','','').then(res => {
									if(res.code == 200) {
										console.log(res);
										this.$message({
											message: '删除成功！',
											type: 'success'
										});
										this.init();
									}else{
										this.$message.error(res.msg);
									}
								}).catch(err => {
									this.$message.error(err.message)
								});
						
					}) .catch(() => {
					this.$message.info('已取消操作!');
				});
			},
			// 关闭弹框
			editClose(){
				this.editAlert = false;
				// this.editData = {};
			},
			tableRowClassName({row, column,rowIndex,columnIndex}) {
				if(columnIndex===1||columnIndex===0){
					if(row.status==3 ){
						return 'overdue';
					}
					if(row.status==2 ){
						return 'runing';
					}
					if(row.status=="1" ){
						return 'invalid';
					}
				}
				
				return '';
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.deviceMenu-deviceMation {margin: 0 auto;padding: 10px;}
</style>