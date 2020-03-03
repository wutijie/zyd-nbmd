<template>
	<div>
		<el-form ref="menuEdit" :rules="rules" label-width="100px" :model="newData">
			<el-row :gutter="10">
				<el-col :span="17">
					<el-form-item label="设备编号" prop="dNumber" >
						<el-input v-model="newData.dNumber" :disabled="isAbled"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-button type="primary" size="mini" @click="getCode" :disabled="isAbled">自动生成</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="17">
					<el-form-item label="设备名称" prop="dName" >
						<el-input v-model="newData.dName"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="17">
					<el-form-item label="资产编号" prop="assetsNumber" >
						<el-input v-model="newData.assetsNumber" :disabled="isAbledNumber"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-button type="primary" size="mini" @click="getNumber" :disabled="isAbledNumber">自动生成</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="17">
					<el-form-item label="设备图片">
						<el-upload
							action=""
							:before-upload="handleBeforeUpload"
							:on-success="handleSuccess"
							:on-error="handleError"
							:file-list="fileList"
							:limit="1"
							:http-request="handleUploadImage"
							list-type="picture">
							<el-button size="small" type="primary">点击上传</el-button>
							<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
						<el-avatar shape="square" :size="100" fit="contain" :src="url1" v-if="imgIsShow1"></el-avatar>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="10">
					<el-form-item label="设备品牌">
						<el-input v-model="dDeviceBrand" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="设备型号">
						<el-input v-model="dModel" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				
			</el-row>
			<el-row :gutter="10">
				<el-col :span="10">
					<el-form-item label="设备产地">
						<el-input v-model="dTerritory" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="尺寸">
						<el-input v-model="dMeasure" placeholder=""></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="10" v-for="(item,index) in domains" :key="item.index">
				<el-col :span="10" >
					<el-form-item  label="参数名称">
						<el-input v-model="item.name" placeholder="" ></el-input>
					</el-form-item>
				</el-col>
				<el-col  :span="10" >
					<el-form-item  label="参数值" >
						<el-input v-model="item.value" placeholder="" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="2" style="margin-left: 10px;" v-if="index == domains.length - 1">
					<el-button  @click="addDomain" ><i class="el-icon-plus"></i></el-button>
				</el-col>
				<el-col :span="2" style="margin-left: 10px;" v-else>
					<el-button @click="removeDomain(index)" ><i class="el-icon-close"></i></el-button>
				</el-col>
			</el-row>
			<el-row :gutter="10" v-for="(item,index) in domainsDesc" :key="item.index">
				<el-col :span="10" >
					<el-form-item  label="描述名称">
						<el-input v-model="item.name" placeholder="" ></el-input>
					</el-form-item>
				</el-col>
				<el-col  :span="10" >
					<el-form-item  label="描述值" >
						<el-input v-model="item.value" placeholder="" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="2" style="margin-left: 10px;" v-if="index == domainsDesc.length - 1">
					<el-button  @click="addDomainDesc" ><i class="el-icon-plus"></i></el-button>
				</el-col>
				<el-col :span="2" style="margin-left: 10px;" v-else>
					<el-button @click="removeDomainDesc(index)" ><i class="el-icon-close"></i></el-button>
				</el-col>
			</el-row>
			<el-form-item >
				<el-button type="primary" @click="submitForm('menuEdit')">{{ btnMsg }}</el-button>
				<el-button  @click="$emit('editClose')">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
    import {device,getdeviceId,assetNumber} from '../../../../../api/deviceMation.js';
	import { uploadImage } from '../../../../../api/spuerAdmin.js'
	export default {
		props:{
			editData:{
				type:Object,
			}
		},
		data() {
			return {
				newData:{},
				isAbled:false,
				isAbledNumber:false,
				imgIsShow1:false,
				nowEditData:this.editData,
				btnMsg:'',
				rules: {
					assetsNumber: [
						{ required: true, message: '请输入资产编号', trigger: 'blur' }
					],
					dNumber: [
						{ required: true, message: '请输入设备编号', trigger: 'blur'}
					],
					dName: [
						{ required: true, message: '请选择设备名称' }
					]
				},
				dModel:'',
				dFrontImage:'',
				dBackImage:'',
				dSystemModel:'',
				dDeviceBrand:'',
				dDescriptions:'',
				dParameters:'',
				dMeasure:'',
				dTerritory:'',
				updateFile:null,
				updateFileBack:null,
				fileList: [],
				domains: [{
					name:'',
					value:''
				}],
				domainsDesc:[{
					name:'',
					value:''
				}],
				did:'',
				url1:'',
			}
		},
		created() {
			
		},
		mounted() {},
		methods: {
			handleBeforeUpload(file){
				let uploadData = new FormData();
				uploadData.set('file', file);
				console.log(uploadData.get("file"))
				this.updateFile = uploadData;
				console.log(typeof(this.updateFile))
			},
			handleSuccess(response, file, fileList){
				// console.log(response, file, fileList)
			},
			handleError(err, file, fileList){
				// console.log(err, file, fileList)
			},
			handleUploadImage(){
				uploadImage(this.updateFile).then( res => {
					console.log(res)
					if(res.code==200){
						this.updateFile = '';
						this.dFrontImage = res.data.path;
						this.imgIsShow1=false;
					}
				}).catch( err => {
					this.$message.error(err.message);
					
				})
			},
			getCode:function(){
				getdeviceId().then(res => {
					let that = this;
					if(res.code == 200) {
						this.newData.dNumber = res.data;
						this.isAbled = true;
					}else{
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			getNumber:function(){
				assetNumber().then(res => {
					let that = this;
					if(res.code == 200) {
						this.newData.assetsNumber = res.data;
						this.isAbledNumber = true;
					}else{
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			addDomain(){
				this.domains.push({
					name: '',
					value:''
				});
			},
			addDomainDesc(){
				this.domainsDesc.push({
					name: '',
					value:''
				});
			},
			removeDomain(index) {
				this.domains.splice(index, 1);
			},
			removeDomainDesc(index) {
				this.domainsDesc.splice(index, 1);
			},
			submitForm(formName) {
				let that = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if(this.nowEditData.add && this.nowEditData.add == 1){   //添加
							device(
							1,
							'',
							this.newData.dNumber,
							this.dModel,
							this.newData.dName,
							this.dFrontImage,
							this.dDeviceBrand,
							this.newData.assetsNumber,
							JSON.stringify(this.domainsDesc),
							JSON.stringify(this.domains),
							this.dMeasure,
							this.dTerritory
							).then(res => {
								if(res.code == 200) {
									console.log(res);
									this.$message({
										message: '添加成功！',
										type: 'success'
									});
									this.$emit('editClose');
									this.$emit('updateData');
								}else{
									that.$message.error(res.msg);
								}
							}).catch(err => {
								this.$message.error(err.message)
							});
						}else{
							if(this.imgIsShow1){
								this.dFrontImage = this.url1;
							}
							device(
							2,
							this.did,
							this.newData.dNumber,
							this.dModel,
							this.newData.dName,
							this.dFrontImage,
							this.dDeviceBrand,
							this.newData.assetsNumber,
							JSON.stringify(this.domainsDesc),
							JSON.stringify(this.domains),
							this.dMeasure,
							this.dTerritory
							).then(res => {
								if(res.code == 200) {
									console.log(res);
									this.$message({
										message: '修改成功！',
										type: 'success'
									});
									this.$emit('editClose');
									this.$emit('updateData');
								}else{
									that.$message.error(res.msg);
								}
							}).catch(err => {
								this.$message.error(err.message)
							});
						}
					}
				})
			}
		},
		watch: {
			editData: {
				immediate: true,
				handler(newValue, oldValue) {
					this.nowEditData = { ...newValue };
					this.btnMsg = this.nowEditData.add && this.nowEditData.add == 1 ? '添加' : '修改';
					if(this.nowEditData.add && this.nowEditData.add == 1){
						this.btnMsg = '添加';
						this.fileList = [];
						this.newData = {};
						this.isAbled = false;
						this.isAbledNumber = false;
						this.dModel = '';
						this.dFrontImage = '';
						this.dMeasure = '';
						this.dTerritory = '';
						this.did = '';
						this.imgIsShow1=false;
						this.domains= [{
							name:'',
							value:''
						}];
						this.domainsDesc=[{
							name:'',
							value:''
						}]
						this.dDeviceBrand='';
					}else{
						this.btnMsg = '修改';
						this.isAbled = true;
						this.isAbledNumber = true;
						this.fileList = [];
						console.log(this.nowEditData);
						this.$set(this.newData,'dNumber',this.nowEditData.dnumber);   //内容
						this.$set(this.newData,'dName',this.nowEditData.dname);
						this.$set(this.newData,'assetsNumber',this.nowEditData.dassetNumber);
						this.dModel = this.nowEditData.dmodel;
						this.url1 = this.nowEditData.dImage;
						console.log(this.url1);
						this.dMeasure = this.nowEditData.dmeasure;
						this.dTerritory = this.nowEditData.dterritory;
						this.did = this.nowEditData.did;
						this.imgIsShow1=true;
						this.dDeviceBrand = this.nowEditData.ddeviceBrand;
						this.domains = JSON.parse(this.nowEditData.ddescriptions);
						this.domainsDesc =JSON.parse(this.nowEditData.dparameters);
					}
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
		span{
			font-size: 14px;
			width: 100px;
			display: inline-block;
		}
	}
</style>