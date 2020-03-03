<template>
    <div class="anDonData-webSpotCheck"><!-- 点检记录 -->
		<el-form>		
			<el-row class="handle-btn" :gutter="10" >
				<el-col :span="6">
					<el-button type="danger" size="small" @click="showAdd">新增</el-button>
					<el-button type="primary" size="small" icon="el-icon-refresh-left" @click="refresh"></el-button>
					<el-button type="primary" size="small" @click="outExcel">导出</el-button>
				</el-col>
				<el-col :span="10">
					<el-form-item label="时间">
						<el-date-picker
							v-model="timedate"
							type="daterange"
							size="small"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							@change="chooseData">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="设备">
						<el-select v-model="did" placeholder="请选择设备" @change="selectInit">
							<el-option value="" lable="">全部</el-option>
							<el-option
								v-for="(item,index) in devicesnoSelect"
								:key="index"
								:label="item.deviceid+' '+item.devicename+' '+item.model"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		
		<el-table :data="tables" style="width: 100%" height="calc(100vh - 300px)" id="out-table">
			<el-table-column fixed type="index" label="序号" align="center"></el-table-column>
			<el-table-column prop="status" label="状态" align="center"></el-table-column>
			<!-- <el-table-column prop="checktime" label="点检时间" align="center" min-width="180px"></el-table-column> -->
			<el-table-column prop="scno" label="编号" align="center"  min-width="200px"></el-table-column>
			<el-table-column prop="source" label="来源" align="center"></el-table-column>
			<el-table-column prop="devicenum" label="设备数量" align="center" width="120px"></el-table-column>
			<el-table-column prop="checkperson" label="点检人"  align="center"></el-table-column>
			<el-table-column prop="checktime" label="点检时间"  align="center" min-width="180px">
				<template slot-scope="scope">
					<div v-if="scope.row.checktime">
						{{$handleTime(scope.row.checktime)}}
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="confirmperson" label="确认人"  align="center"></el-table-column>
			<el-table-column prop="confirmTime" label="确认时间"  align="center" width="120px">
				<template slot-scope="scope">
					<div v-if="scope.row.confirmTime">
						{{$handleTime(scope.row.confirmTime)}}
					</div>
				</template>
			</el-table-column>
			<el-table-column
			label="操作"
			width="200"
			align="center">
			<template slot-scope="scope">
				<el-button type="text" size="small" @click="lookinfo(scope.row)">查看</el-button>
				<!-- <el-button type="text" size="small" v-if="scope.row.status=='已确认'">----</el-button> -->
				<el-button type="text" size="small"  v-if="scope.row.status=='未确认'" @click="handleClick(scope.row)">确认</el-button>
				<el-button type="text" size="small" @click="Delete(scope.row)">删除</el-button>
			</template>
			</el-table-column>
		</el-table>
		<el-col :span="12">
			<el-pagination background layout="total, sizes, prev, pager, next, jumper"
				:total="totalCount"
				:current-page="currentPage"
				:page-size="pageSize"
				@size-change="handleSizeChange"
				:page-sizes="[2, 5, 10, 20, 30]"
				@current-change="pageChange"></el-pagination>
		</el-col>
		<el-dialog title="新增点检报表" :visible.sync="editAlert">
			<AddEdit :editData="editData"  @editClose="editClose" @updateData='init'></AddEdit>
		</el-dialog>
		<el-dialog title="编辑" :visible.sync="infoEdit">
			<InfoEdit :infoData="infoData" @editClose="editClose" @updateData='init'></InfoEdit>
		</el-dialog>
    </div>
</template>

<script>
	import {SpotCheckRecord,SpotCheckRecord_Delete,SpotCheckRecord_Confirm} from '../../../../api/deviceMation.js';
	import { exportExcel } from '../../../../utils/publiFun.js';
	import AddEdit from './component/newDevice.vue';
	import InfoEdit from './component/info.vue';
    export default {
		components: {
			AddEdit,
			InfoEdit
		},
        data(){
			return{
				devicesnoSelect:[],
				tables:[],
				custid:'',
				sourceList:[
					{value:1,name:"触屏"},
					{value:2,name:"盒子box"},
					{value:3,name:"web"},
					{value:4,name:"app"},
					{value:5,name:"api"},
					{value:6,name:"sdk"}
				],
				sourceValue:1,
				deviceidValue:'',
				editAlert:false,
				infoEdit:false,
				editData:{},
				infoData:{},
				deviceinfo:{},
				did:'',
				totalCount: 0,
				currentPage: 1,
				pageSize: 10,
				begintime:'',
				endtime:'',
				timedate:[],
				StartTime:'',
				EndTime:''
				
			}
		},
		created() {
			this.init();
		},
		methods:{
			init(){
				SpotCheckRecord(this.did,this.begintime,this.endtime,this.currentPage,this.pageSize).then(res => {
					let that = this;
					if(res.code == 200) {
						that.devicesnoSelect=res.data.DeviceSelect;
						that.tables = res.data.SpotCheckRecord;
						that.totalCount = res.count;
					}else{
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
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
				this.init();
			},
			selectInit(value){
				this.init();
			},
			lookinfo(row){
				this.infoEdit = true;
				this.infoData = row;
				console.log(row);
			},
			showAdd:function(){
				this.editAlert = true;
				this.editData = {
					add:1,
					custid: this.custid,
					deviceid: "",
					source: "",
					checktype: "",
					content: "",
					checkbtn: "",
				}
			},
			handleClick(scope){
					this.$confirm('是否继续确认?', '提示', { type: 'warning' })
						.then(() => {
							SpotCheckRecord_Confirm(scope.scno).then(res => {
								let that = this;
								if(res.code == 200) {
									this.$message({
										message: res.msg,
										type: 'success'
									});
									this.init()
								}else{
									that.$message.error(res.msg)
								}
							}).catch(err => {
								this.$message.error(err.message)
							});
						}) .catch(() => {
						this.$message.info('已取消操作!');
					});
				
				
			},
			handleSizeChange(val){
				this.currentPage = 1;
				this.pageSize = val;
				this.init();
			},
			pageChange(pagenum){
				this.currentPage = pagenum;
				this.init();
			},
			Delete(scope){
				this.$confirm('此操作将永久删除, 是否继续?', '提示', { type: 'warning' })
					.then(() => {
						SpotCheckRecord_Delete(scope.scno).then(res => {
							let that = this;
							if(res.code == 200) {
								this.$message.success('成功删除');
								this.init()
							}else{
								that.$message.error(res.msg)
							}
						}).catch(err => {
							this.$message.error(err.message)
						});
					}) .catch(() => {
					this.$message.info('已取消操作!');
				});
			},
			refresh:function(){
				window.location.reload();
			},
			outExcel () {
				// exportExcel("#out-table","安灯数据-点检管理")
			},
			editClose(){
				this.editAlert = false;
				this.editData = {};
				this.infoEdit = false;
				this.infoData = {};
			},
		}
    }
</script>

<style lang="scss" scoped>
    .anDonData-webSpotCheck {
		padding: 0 10px;
    }
</style>