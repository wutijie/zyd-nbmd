<template>
	<div>
		<el-form ref="menuEdit" label-width="80px" :model="addData" :rules="rules">
			<el-row :gutter="10">
				<el-col :span="17">
					<el-form-item label="工单编号" prop="workOrder">
						<el-input v-model="addData.workOrder" placeholder="请输入工单编号" :disabled="isAbled"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-button type="primary" size="mini" @click="getCode" :disabled="isAbled">自动生成</el-button>
				</el-col>
			</el-row>
			<el-form-item label="设备编号" prop="deviceidValue">
				<el-select v-model="addData.deviceidValue" multiple  filterable placeholder="" width="100%">
					<el-option
					v-for="(item,index) in devicesnoSelect"
					:key="index"
					:label="item.deviceid+' '+item.devicename+' '+item.model"
					:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="点检时间" prop="ddtime" style="width:100%">
				<el-date-picker
				v-model="addData.ddtime"
				type="date"
				value-format="yyyy-MM-dd"
				placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('menuEdit')">保存</el-button>
				<el-button  @click="$emit('editClose')">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {SpotCheck_GetNo,SpotCheckRecord,SpotCheckRecord_GetContent,SpotCheckRecord_Add} from '../../../../../api/deviceMation.js';
	export default {
		props:{
			editData:{
				type:Object,
			}
		},
		data(){
			return{
				rules:{
					workOrder: [
						{ required: true, message: '请输入工单编号'}
					],
					deviceidValue:[
						{required: true, message: '请选择设备' }
					],
					ddtime:[
						{required: true, message: '请输入点检时间'}
					],
				},
				isAbled:false,
				addData:{
					domains: [{
						btn:''
					}],
				},
				devicesnoSelect:[],
			}
		},
		created() {
			this.init();
		},
		methods:{
			init(){
				SpotCheckRecord('','','',1,10).then(res => {
					let that = this;
					if(res.code == 200) {
						that.devicesnoSelect=res.data.DeviceSelect;
					}else{
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			getCode(){
				SpotCheck_GetNo().then(res => {
					let that = this;
					if(res.code == 200) {
						this.addData.workOrder = res.data;
						this.isAbled = true;
					}else{
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var dids = this.addData.deviceidValue.join(',');
						SpotCheckRecord_Add(dids,3,this.addData.ddtime,this.addData.workOrder).then(res => {
							let that = this;
							if(res.code == 200) {
								this.$message({
									message: '添加成功！',
									type: 'success'
								});
								this.$emit('editClose');
								this.$emit('updateData');
							}else{
								that.$message.error(res.msg)
							}
						}).catch(err => {
							this.$message.error(err.message)
						});
					}
				})
			},
		},
	}
</script>

<style>
</style>
