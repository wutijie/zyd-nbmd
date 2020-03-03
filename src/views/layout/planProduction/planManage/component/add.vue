<template>
	<div>
		<el-form  ref="addData" label-width="80px" :rules="rules" :model="newData">
				<el-row :gutter="10">
					<el-col :span="17">
						<el-form-item label="计划编号" prop="planNumbering">
							<el-input v-model="newData.planNumbering" placeholder="请输入计划编号" :disabled="isAbled"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-button type="primary" size="mini" @click="getCode" :disabled="isAbled">自动生成</el-button>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="8">
						<el-form-item label="产品名称" prop="proName">
							<el-select v-model="newData.proName" placeholder="请选择类型" >
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
				</el-row>
				<el-row :gutter="10">
			<el-form-item label="计划产量" prop="planYield">
					<el-col :span="17">
						<el-input v-model="newData.planYield" placeholder="请输入计划产量"></el-input>
					</el-col>
					<el-col :span="6">
					</el-col>
			</el-form-item>
				</el-row>
				<el-row :gutter="10" width="100%">
					<el-col :span="15">
						<el-form-item label="计划开始" prop="planStart" style="width:100%">
							<el-date-picker
							v-model="newData.planStart"
							type="date"
							value-format="yyyy-MM-dd"
							placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="15">
						<el-form-item label="计划结束" prop="planEnd" style="width:100%">
							<el-date-picker
								v-model="newData.planEnd"
								type="date"
								value-format="yyyy-MM-dd"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
					<el-row :gutter="10">
				<el-form-item label="备注" prop="note">
				<!-- <el-form-item label="备注" > -->
						<el-col :span="17">
							<el-input v-model="newData.note" placeholder="备注"></el-input>
						</el-col>
						<el-col :span="6">
						</el-col>
				</el-form-item>
					</el-row>
				<el-form-item>
					<el-button type="primary" @click="submitForm('addData')">立即提交</el-button>
					<el-button @click="$emit('editClose')">取消</el-button>
				</el-form-item>
			</el-form>
			<el-dialog class="alertList"
				title="产品管理列表"
				:visible.sync="dialogVisible"
				width="600"
				append-to-body
				:before-close="handleClose">
				<el-button type="primary" size="small" style="margin:15px;" @click="showOpen">新增</el-button>
				<el-table :data="searchslist" height="300">
					<el-table-column type="index" label="序号"></el-table-column>
					<el-table-column property="promodel" label="产品编号"></el-table-column>
					<el-table-column property="proname" label="产品名称"></el-table-column>
					<el-table-column property="addtime" label="添加时间"></el-table-column>
					<el-table-column property="adduser" label="添加人"></el-table-column>
					<el-table-column fixed="right" label="操作" width="150">
						<template  slot-scope="scope">
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
					<el-button @click="cancelAdd">取 消</el-button>
					<el-button type="primary" @click="editSave">{{btn}}</el-button>
				</span>
			</el-dialog>
		
	</div>
</template>
<script>
    import { PlanProduction_GetNewNumber,ProductInfo,ProductInfo_Add,ProductInfo_Edit,ProductInfo_Delete,WorkPlanManage_Add} from '../../../../../api/deviceMation.js';
	export default {
		data() {
			return {
				newData:{},
				isAbled:false,
				searchslist:[],
				dialogVisible: false,
				open:false,
				chanpinxinghao:'',
				chanpinName:'',
				editId:'',
				btn:'',
				type:1,
				rules: {
					planNumbering: [
						{ required: true, message: '请输入计划编号',trigger: 'blur'}
					],
					proName:[
						{required: true, message: '请选择类型' }
					],
					planYield:[
						{required: true, message: '请输入计划产量'}
					],
					planStart:[
						{required: true, message: '请输入计划开始时间'}
					],
					planEnd:[
						{required: true, message: '请输入计划结束时间'}
					],
					note:[
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
			showOpen(){
				this.open=true;
				this.btn="保 存";
				this.type = 1;
			},
			getCode(){
				PlanProduction_GetNewNumber().then(res => {
					let that = this;
					if(res.code == 200) {
						this.newData.planNumbering = res.data;
						this.isAbled = true;
					}else{
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			editPro(row){
				this.open = true;
				this.btn = "修 改";
				this.type = 2;
				this.chanpinxinghao = row.promodel;
				this.chanpinName = row.proname;
				this.editId = row.id;
			},
			deletePro(row){
				this.$confirm('确定要删除?', '提示', {
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
			editSave(){
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
			cancelAdd(){
				this.open = false;
				this.chanpinxinghao = '';
				this.chanpinName = '';
			},
			clearInput(){
				this.newData = {};
				this.isAbled = false;
			},
			submitForm(formName) {
				let that = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						WorkPlanManage_Add(this.newData.planNumbering,
						this.newData.proName,
						this.newData.planYield,
						this.newData.planStart,
						this.newData.planEnd,
						this.newData.note).then(res => {
							if(res.code == 200) {
								this.clearInput();
								this.$message({type: 'success', message: '提交成功！'});
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
		
		.el-icon-edit{
			font-size: 20px;
		}
	}
	el-row{
		.list{
			width: 50%;
		}
	}
	.automatic{
		font-size: 12px;
		color:rgb(155,23,13);
		margin-left: 15px;
		cursor: pointer;
	}
</style>
<style>
	.alertList .el-dialog__body{
		padding: 0 20px;
	}
</style>