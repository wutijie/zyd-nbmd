<template>
	<div>
		<el-form ref="menuEdit" label-width="80px" :model="nowEditData" :rules="rules">
			<el-row :gutter="10">
				<el-col :span="12">
				<el-form-item label="产品名称" prop="proname">
					<el-select v-model="nowEditData.proname" placeholder="请选择类型" >
						<el-option
							v-for="item in searchslist"
							:key="item.id"
							:label="item.proname"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				</el-col>
				<el-col :span="2">
					<el-button size="medium" class="el-icon-edit automatic" @click="dialogVisible = true" style="font-size: 18px;"></el-button>
				</el-col>
			</el-row >
			<el-row :gutter="10">
				<el-form-item label="计划产量" prop="plannum">
						<el-col :span="17">
							<el-input v-model="nowEditData.plannum" placeholder="请输入计划产量"></el-input>
						</el-col>
						<el-col :span="6">
						</el-col>
				</el-form-item>
			</el-row>
			<el-row :gutter="10" width="100%">
				<el-col :span="15">
					<el-form-item label="计划开始" prop="planbegintime" width="100%">
						<el-date-picker
						v-model="nowEditData.planbegintime"
						type="date"
						value-format="yyyy-MM-dd"
						placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="15">
					<el-form-item label="计划结束" prop="planendtime" width="100%">
						<el-date-picker
							v-model="nowEditData.planendtime"
							type="date"
							value-format="yyyy-MM-dd"
							placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="备注" prop="remark">
					<el-col :span="17">
						<el-input v-model="nowEditData.remark" placeholder="备注"></el-input>
					</el-col>
					<el-col :span="6">
					</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('menuEdit')">立即修改</el-button>
				<el-button  @click="$emit('editClose')">取消</el-button>
			</el-form-item>
			<el-dialog class="alertList"
				title="产品管理列表"
				:visible.sync="dialogVisible"
				width="600"
				height="300"
				append-to-body
				:before-close="handleClose">
				<el-button type="primary" size="small" style="margin:15px;" @click="Showopen">新增</el-button>
				<el-table :data="searchslist">
					<el-table-column type="index" label="序号"></el-table-column>
					<el-table-column property="promodel" label="产品编号"></el-table-column>
					<el-table-column property="proname" label="产品名称"></el-table-column>
					<el-table-column property="addtime" label="添加时间"></el-table-column>
					<el-table-column property="adduser" label="添加人"></el-table-column>
					<el-table-column fixed="right" label="操作" width="150">
						<template  slot-scope="scope" >
							<el-button type="text" size="small" @click="editPro(scope.row)">编辑</el-button>
							<el-button type="text" size="small"  @click="deletePro(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
				</span>
			</el-dialog>
			<el-dialog
				title="编辑"
				:visible.sync="open"
				width="500"
				append-to-body
				:before-close="handleCloseOpen">
				<div class="list">
					<span>产品型号</span>
					<el-input v-model="chanpinxinghao" placeholder="请输入产品型号" class="mustInput"></el-input>
				</div>
				<div class="list">
					<span>产品名称</span>
					<el-input v-model="chanpinName" placeholder="请输入产品名称" class="mustInput"></el-input>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancelAdd()">取 消</el-button>
					<el-button type="primary" @click="savePro">{{btn}}</el-button>
				</span>
			</el-dialog>
		</el-form>
	</div>
</template>
<script>
    import { ProductInfo,ProductInfo_Add,ProductInfo_Edit,ProductInfo_Delete,WorkPlanManage_Edit} from '../../../../../api/deviceMation.js';
	export default {
		props:{
			editData:{
				type:Object,
			}
		},
		data() {
			return {
				nowEditData:this.editData,
				proName:'',
				searchslist:[],
				dialogVisible: false,
				open:false,
				chanpinxinghao:'',
				chanpinName:'',
				editId:'',
				btn:"",
				type:1,
				rules: {
					proname:[
						{required: true, message: '请选择类型' }
					],
					plannum:[
						{required: true, message: '请输入计划产量'}
					],
					planbegintime:[
						{required: true, message: '请输入计划开始时间'}
					],
					planendtime:[
						{required: true, message: '请输入计划结束时间'}
					],
					remark:[
						{required: true, message: '请输入备注'}
					]
				},
			}
		},
		created() {
			this.chooseSelect();
		},
		mounted() {},
		methods: {
			chooseSelect:function(){
				ProductInfo().then(res => {
					let that = this;
					if(res.code == 200) {
						this.searchslist = res.data;
						if(this.nowEditData.proname){
							for (var i = 0; i < res.data.length; i++) {
								if(res.data[i].proname==this. nowEditData.proname){
									this.nowEditData.proname = res.data[i].id;
									
								}
							}
						}
					}else{
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			handleClose(done) {
				done();
			},
			handleCloseOpen(done) {
					this.chanpinxinghao = '';
					this.chanpinName = '';
					done();
			},
			cancelAdd(){
				this.open = false;
				this.chanpinxinghao = '';
				this.chanpinName = '';
			},
			Showopen(){
				this.open = true;
				this.btn = "保 存";
				this.type=1;
			},
			savePro(){
				if(!this.chanpinxinghao || !this.chanpinName){
					this.$message.error("请检查信息是否填写完整！");
					return false;
				}
				if(this.type==1){
					ProductInfo_Add(this.chanpinxinghao,this.chanpinName).then(res => {
						if(res.code == 200) {
							this.$message({type: 'success', message: '添加成功'});
							this.chooseSelect();
							this.chanpinxinghao = '';
							this.chanpinName = '';
							this.open = false;
						}else{
							this.$message.error(res.msg)
						}
					}).catch(err => {
						this.$message.error(err.message)
					});
					
				}else{
					ProductInfo_Edit(this.chanpinxinghao,this.chanpinName,this.editId).then(res => {
						if(res.code == 200) {
							this.$message({type: 'success', message: '编辑成功！'});
							this.chooseSelect();
							this.chanpinxinghao = '';
							this.chanpinName = '';
							this.open = false;
						}else{
							this.$message.error(res.msg)
						}
					}).catch(err => {
						this.$message.error(err.message)
					});
				}
			},
			editPro(row){
				this.open = true;
				this.btn = "修 改";
				this.type=2;
				this.chanpinxinghao = row.promodel;
				this.chanpinName = row.proname;
				this.editId = row.id;
			},
			deletePro(row){
				this.$confirm('确定删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					ProductInfo_Delete(row.id).then(res => {
						if(res.code == 200) {
							this.chooseSelect();
							this.$message({type: 'success', message: '删除成功!'});
						}else{
							this.$message.error(res.msg)
						}
					}).catch(err => {
						this.$message.error(err.message)
					});
				}).catch(err => {
					this.$message({type: 'info', message: '已取消删除!'});
				})
				
			},
			submitForm(formName) {
				let that = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						WorkPlanManage_Edit(this.nowEditData.proname,this.nowEditData.plannum,this.nowEditData.planbegintime,this.nowEditData.planendtime,this.nowEditData.remark,this.nowEditData.id).then(res => {
							if(res.code == 200) {
								this.$message({type: 'success', message: '更改成功！'});
								this.$emit('editClose');
								this.$emit('updateData');
							}else{
								this.$message.error(res.msg)
							}
						}).catch(err => {
							this.$message.error(err.message)
						});
					}else{
						console.log("err");
					}
				})
				
			},
		},
		watch: {
			editData: {
				immediate: true,
				handler(newValue, oldValue) {
					this.nowEditData = { ...newValue };
					console.log(this.nowEditData )
					this.chooseSelect();
					// this.btnMsg = this.nowEditData.add && this.nowEditData.add == 1 ? '添加' : '修改';
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	sup{
		color: red;
	}
	.list{
		display: flex;
		align-items: center;
		margin: 10px;
		span{
			font-size: 14px;
			width: 100px;
			display: inline-block;
		}
		.automatic{
			font-size: 12px;
			color:rgb(155,23,13);
			margin-left: 15px;
			cursor: pointer;
		}
		.el-icon-edit{
			font-size: 20px;
		}
	}
	el-row{
		.list{
			width: 50%;
		}
	}
	
</style>
<style>
	.alertList .el-dialog__body{
		padding: 0 20px;
	}
</style>