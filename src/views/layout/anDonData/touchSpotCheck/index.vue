<template>
    <div class="anDonData-touchSpotCheck" style="padding: 10px;">
		<!-- 点检管理 -->
		<el-row class="handle-btn" :gutter="10" justify="space-around" style="margin-bottom: 10px;">
			<el-col :span="6">
				<el-button type="danger" size="small" @click="showAdd">新增</el-button>
				<el-button type="primary" size="small" icon="el-icon-refresh-left" @click="refresh"></el-button>
				<el-button type="primary" size="small" @click="outExcel">导出</el-button>
			</el-col>
			<el-col :span="8">
				<span style="font-size: 14px;margin-right: 10px;">设备:</span>
				<!-- <el-form-item label="设备"> -->
					<el-select v-model="did" placeholder="请选择设备" @change="chooseDevice">
						<el-option value="" lable="">全部</el-option>
						<el-option
							v-for="(item,index) in devicesnoSelect"
							:key="index"
							:label="item.deviceid+' '+item.devicename+' '+item.model"
							:value="item.id">
						</el-option>
					</el-select>
				<!-- </el-form-item> -->
			</el-col>
		</el-row>
		<el-table :data="tables" style="width: 100%" height="calc(100vh - 300px)" id="out-table">
			<el-table-column fixed type="index" label="序号" align="center"></el-table-column>
			<el-table-column prop="checkno" label="点检编号" align="center" width="200"></el-table-column>
			<el-table-column prop="checktype" label="类型" align="center"></el-table-column>
			<el-table-column prop="source" label="来源" align="center"></el-table-column>
			<el-table-column prop="content" label="内容"  align="center" min-width="200"></el-table-column>
			<el-table-column prop="checkbtn" label="选项" align="center" min-width="100">
				<template slot-scope="scope" >
					<div v-for="value in scope.row.checkbtn" :key="value.checkbox">
						<el-checkbox  :label="value.checkbox" v-if="value.checkbox"  style="margin-right: 10px;">{{value.checkbox}}</el-checkbox>
					</div>
					<div  v-for="value in scope.row.checkbtn" :key="value.radio">
						<el-radio v-model="scope.row.newradio" :label="value.radio" v-if="value.radio" style="margin-right: 10px;" >{{value.radio}}</el-radio>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="adduser" label="添加人"  align="center"></el-table-column>
			<el-table-column
			label="操作"
			width="150"
			align="center">
			<template slot-scope="scope">
				<el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
				<el-button type="text" size="small" @click="Delete(scope.row)">删除</el-button>
			</template>
			</el-table-column>
		</el-table>
		<el-col :span="12">
			<el-pagination background layout="total, sizes, prev, pager, next, jumper"
				:total="totalCount" 
				:current-page="currentPage"
				:page-size="pageSize"
				:page-sizes="[2, 5, 10, 20, 30]"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"></el-pagination>
		</el-col>
		<el-dialog title="编辑" :visible.sync="editAlert" :before-close="handleCloseOpen">
			<AddEdit :editData="editData"  @editClose="editClose" @updateData='init'></AddEdit>
		</el-dialog>
    </div>
</template>

<script>
	import {SpotCheckManage,SpotCheckManage_Delete} from '../../../../api/deviceMation.js';
	import { exportExcel } from '../../../../utils/publiFun.js';
	import AddEdit from './component/add.vue';
    export default {
		components: {
			AddEdit
		},
        data(){
			return{
				deviceidValue:'',
				sourceValue:1,
				checktypeValue:'',
				did:'',
				totalCount: 0,
				currentPage: 1,
				pageSize: 10,
				sourceList:[
					{value:1,name:"触屏"},
					{value:2,name:"盒子box"},
					{value:3,name:"web"},
					{value:4,name:"app"},
					{value:5,name:"api"},
					{value:6,name:"sdk"}
				],
				checktypeList:[
					{value:'',name:"全部"},
					{value:1,name:"周期"},
					{value:2,name:"例行"}
				],
				devicesnoSelect:[],
				tables:[],
				editAlert:false,
				editData:{},
				custid:''
			}
		},
		created() {
			this.init();
		},
		methods:{
			refresh:function(){
				window.location.reload();
			},
			showAdd:function(){
				this.editAlert = true;
				this.editData = {
					add:1,
					addData:{}
				}
			},
			init(){
				SpotCheckManage(this.did,this.currentPage,this.pageSize).then(res => {
					let that = this;
					if(res.code == 200) {
						that.devicesnoSelect=res.data.DeviceSelect;
						that.totalCount = res.count;
						that.tables = res.data.SpotCheck;
						res.data.SpotCheck.forEach( (item, index) => {
							item.checkbtn = JSON.parse(item.checkbtn);
						})
					}else{
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			chooseDevice(){
				console.log(this.did);
				this.init();
			},
			handleCloseOpen(){
				this.editAlert = false;
				this.editData = {};
				this.addData = {};
			},
			handleSizeChange(val){
				this.currentPage = 1;
				this.pageSize = val;
				this.init();
			},
			handleCurrentChange(val){
				this.currentPage = val;
				this.init();
			},
			outExcel () {
				// exportExcel("#out-table","安灯数据-点检管理")
			},
			editClose(){
				this.editAlert = false;
				this.editData = {};
				this.addData = {};
			},
			handleClick:function(row){
				this.editAlert = true;
				this.editData = row;
				this.addData = row;
			},
			Delete(scope){
				this.$confirm('此操作将永久删除, 是否继续?', '提示', { type: 'warning' })
					.then(() => { // 向服务端请求删除
						SpotCheckManage_Delete(scope.id).then(res => {
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
			}
		}
    }
</script>

<style lang="scss" scoped>
    .anDonData-touchSpotCheck {
        .searchs{
			span{font-size: 14px;}
        }
    }
</style>