<template>
    <div class="anDonData-touchSpotCheck">
		<el-form ref="menuEdit" label-width="80px" :model="addData">
			<el-row :gutter="10">
				<el-col :span="20">
					<el-form-item label="设备" prop="deviceidValue" :rules="{required: true, message: '请选择设备'}" >
						<el-select v-model="addData.deviceidValue" multiple  filterable placeholder="" @change="choose">
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
			<el-form-item label="来源" prop="sourceValue" :rules="{required: true, message: '请选择来源'}">
				<el-select v-model="addData.sourceValue" filterable placeholder="" :disabled="isAbled">
					<el-option
					v-for="(item,index) in sourceList"
					:key="index"
					:label="item.name"
					:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="类型" prop="checktypeValue" :rules="{required: true, message: '类型不能为空'}">
				<el-select v-model="addData.checktypeValue" filterable placeholder=""  :disabled="isAbled">
					<el-option
					v-for="(item,index) in checktypeList"
					:key="index"
					:label="item.name"
					:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="选项类型" prop="selectValue" :rules="{required: true, message: '选项类型不能为空'}">
				<el-select v-model="addData.selectValue" filterable placeholder=""  :disabled="isAbled">
					<el-option
					v-for="(item,index) in selectList"
					:key="index"
					:label="item.name"
					:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="内容" prop="inputContent" :rules="{required: true, message: '内容不能为空'}">
				<el-input v-model="addData.inputContent" placeholder=""  :disabled="isAbled"></el-input>
			</el-form-item>
			<el-row v-for="(item,index) in domains" :key="item.index">
				<el-col :span="15">
					<el-form-item :label="'选项名称'" :prop=item.btn>
						<el-input v-model="item.btn" placeholder=""  :disabled="isAbled"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="2" style="margin-left: 10px;" v-if="index == domains.length - 1">
					<el-button  @click="addDomain"  :disabled="isAbled"><i class="el-icon-plus"></i></el-button>
				</el-col>
				<el-col :span="2" style="margin-left: 10px;" v-else>
					<el-button @click="removeDomain(index)"  :disabled="isAbled"><i class="el-icon-close"></i></el-button>
				</el-col>
			</el-row>
			<el-form-item>
				<el-button type="primary" @click="submitForm('menuEdit')">{{ btnMsg }}</el-button>
				<el-button  @click="$emit('editClose')">取消</el-button>
			</el-form-item>
		</el-form>
    </div>
</template>

<script>
	import {SpotCheckManage,SpotCheckManage_Add,SpotCheckManage_Edit} from '../../../../../api/deviceMation.js';
    export default {
		props:{
			editData:{
				type:Object,
			}
		},
        data(){
			return{
				nowEditData:this.editData,
				sourceList:[
					// {value:1,name:"触屏"},
					// {value:2,name:"盒子box"},
					{value:3,name:"web"},
					// {value:4,name:"app"},
					// {value:5,name:"api"},
					// {value:6,name:"sdk"}
				],
				checktypeList:[
					{value:1,name:"周期"},
					{value:2,name:"例行"}
				],
				selectList:[
					{value:'radio',name:'单选'},
					{value:'checkbox',name:'多选'},
				],
				
				devicesnoSelect:[],
				tables:[],
				btnMsg:'确认',
				custid:'',
				id:'',
				did:'',
				domains: [{
					btn:''
				}],
				addData:{
					sourceValue:3,
				},
				isAbled:false
			}
		},
		created() {
			SpotCheckManage(this.did,1,1).then(res => {
				let that = this;
				if(res.code == 200) {
					that.devicesnoSelect=res.data.DeviceSelect;
					that.tables = res.data.SpotCheck;
				}else{
					that.$message.error(res.msg)
				}
			}).catch(err => {
				this.$message.error(err.message)
			});
		},
		methods:{
			choose(){
				console.log(this.addData.deviceidValue);
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let arr = [];
						if(!this.domains[0].btn){
							this.$message.error('请填写选项');
							return false;
						}
						if(this.addData.selectValue=='radio'){
							for (var i = 0; i < this.domains.length; i++) {
								arr.push({'radio':this.domains[i].btn});
							}
						}
						if(this.addData.selectValue=='checkbox'){
							for (var j = 0; j <this.domains.length; j++) {
								arr.push({'checkbox':this.domains[j].btn});
							}
						}
						let dids = this.addData.deviceidValue.join(',');
						if(this.nowEditData.add && this.nowEditData.add == 1){ //添加
							SpotCheckManage_Add(
							dids,
							this.addData.sourceValue,
							this.addData.checktypeValue,
							this.addData.inputContent,
							JSON.stringify(arr)
							).then(res => {
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
						}else{   //编辑
							SpotCheckManage_Edit(
							dids,
							this.addData.sourceValue,
							this.addData.checktypeValue,
							this.addData.inputContent,
							JSON.stringify(arr),
							this.id
							).then(res => {
								let that = this;
								if(res.code == 200) {
									this.$message({
										message: '修改成功！',
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
					} else {
						console.log('error submit!!');
						return false;
					}
				})
				
			},
			foo2(str) {
				var str1 = str.replace(/[\uff0c]/g, ",");
				let strs = str1.split(',');
				return strs;
			},
			addDomain(){
				this.domains.push({
					btn: '',
				});
			},
			removeDomain(index) {
				this.domains.splice(index, 1);
			},
		},
		watch: {
			editData: {
				immediate: true,
				handler(newValue, oldValue) {
					this.nowEditData = { ...newValue };
					if(this.nowEditData.add && this.nowEditData.add == 1){
						this.btnMsg='添加';
						this.domains=[{
								btn:''
							}];
						this.addData = {};
						let newSelect = [
							{value:3,name:"web"},
						];
						this.sourceList = newSelect;
					}else{
						this.btnMsg='修改';
						let newa = [];
						let arr = [];
						if(this.nowEditData.dids){
							newa = this.nowEditData.dids.split(',');
							for(let i in newa){
								arr.push(Number(newa[i]));
							}
						}
						this.id = this.nowEditData.id;
						this.$set(this.addData,'deviceidValue',arr);   //设备
						// this.$set(this.addData,'sourceValue',this.nowEditData.source);   //来源
						if(this.nowEditData.source=="触屏"){
							this.isAbled = true;
							this.$set(this.addData,'sourceValue',1);  
						}else{
							this.isAbled = false;
						}
						if(this.nowEditData.checktype=='周期'){
							this.$set(this.addData,'checktypeValue',1);   //类型
							this.addData.checktypeValue=1;
						}
						if(this.nowEditData.checktype=='例行'){
							this.$set(this.addData,'checktypeValue',2);   //类型
						}
						this.$set(this.addData,'inputContent',this.nowEditData.content);   //内容
						if(this.nowEditData.source=='盒子box'){
							this.$set(this.addData,'sourceValue',2);   //内容
						}
						if(this.nowEditData.source=='WEB'){
							this.$set(this.addData,'sourceValue',3);   //内容
						}
						if(this.nowEditData.source=='app'){
							this.$set(this.addData,'sourceValue',4);   //内容
						}
						if(this.nowEditData.source=='api'){
							this.$set(this.addData,'sourceValue',5);   //内容
						}
						if(this.nowEditData.source=='sdk'){
							this.$set(this.addData,'sourceValue',6);   //内容
						}
						let selects = [];
						this.domains = [];
						if(this.nowEditData.checkbtn){
							for (var i = 0; i < this.nowEditData.checkbtn.length; i++) {
								if(this.nowEditData.checkbtn[i].radio){
									selects.push({'btn':this.nowEditData.checkbtn[i].radio});
									this.$set(this.addData,'selectValue','radio');   //内容
								}
								if(this.nowEditData.checkbtn[i].checkbox){
									selects.push({'btn':this.nowEditData.checkbtn[i].checkbox});
									this.$set(this.addData,'inputContent','checkbox');   //内容
								}
							}
						}
						this.domains = selects;
						let newSelect = [
							{value:1,name:"触屏"},
							{value:2,name:"盒子box"},
							{value:3,name:"web"},
							{value:4,name:"app"},
							{value:5,name:"api"},
							{value:6,name:"sdk"}
						];
						this.sourceList = newSelect;
					}
				}
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