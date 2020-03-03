<template>
	<div>
		<el-form ref="menuEdit" label-width="80px" >
			<el-form-item label="设备">
				<el-select v-model="deviceidValue"   filterable placeholder="" width="100%" @change="chooseD" >
					<el-option
					v-for="(item,index) in devicesnoSelect"
					:key="index"
					:label="item.d_number+' '+item.d_name+' '+item.d_model"
					:value="item.d_id">
					</el-option>
				</el-select>
			</el-form-item>
		<el-table :data="tables" style="width: 100%" max-height="300px" id="out-table">
			<el-table-column prop="content" label="点检内容" align="center"></el-table-column>
			<el-table-column prop="checkvalue" label="结果" align="center">
				<template slot-scope="scope" >
					<div v-if="scope.row.status=='未提交'">
						<div v-if="scope.row.checkbtn">
							<el-checkbox-group v-model="scope.row.checkboxGroup" v-if="JSON.parse(scope.row.checkbtn)[0].checkbox" >
								<el-checkbox  v-for="(value,index) in JSON.parse(scope.row.checkbtn)" :key="index" :label="value.checkbox"  v-model="value.checked">{{value.checkbox}}</el-checkbox>
							</el-checkbox-group>
							<div  v-for="(value,index) in JSON.parse(scope.row.checkbtn)" :key="index">
								<el-radio v-model="scope.row.radioGroup" :label="value.radio" v-if="value.radio" >{{value.radio}}</el-radio>
							</div>
						</div>
					</div>
					<div v-if="scope.row.status=='已提交'">
						<div v-if="!scope.row.isChange">
							{{scope.row.checkvalue}}
						</div>
						<div v-else>
							<div v-if="scope.row.checkbtn">
								<el-checkbox-group v-model="scope.row.checkboxGroup" v-if="JSON.parse(scope.row.checkbtn)[0].checkbox" >
									<el-checkbox  v-for="(value,index) in JSON.parse(scope.row.checkbtn)" :key="index" :label="value.checkbox"  v-model="value.checked">{{value.checkbox}}</el-checkbox>
								</el-checkbox-group>
								<div  v-for="(value,index) in JSON.parse(scope.row.checkbtn)" :key="index">
									<el-radio v-model="scope.row.radioGroup" :label="value.radio" v-if="value.radio" >{{value.radio}}</el-radio>
								</div>
							</div>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="" label="操作" align="center">
				<template slot-scope="scope" >
					<el-button type="text" size="small"  v-if="scope.row.status=='已提交'" :disabled="isShow">
						<span v-if="!scope.row.isChange"  @click="handleClickO(scope)">修改</span>
						<span v-else @click="cancel(scope)">取消</span>
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-form-item style="margin-top: 10px;">
			<el-button type="danger" @click="newAdd" :disabled="isShow">新增</el-button>
			<el-button type="primary" @click="moreIn" :disabled="isShow">提交</el-button>
			<el-button  @click="$emit('editClose')">取消</el-button>
		</el-form-item>
		<el-dialog class="alertList"
			title="新增点检表"
			:visible.sync="dialogVisible"
			width="600"
			append-to-body
			:before-close="handleClose">
			<el-form style="padding: 20px 0;">
			<el-table :data="searchslist" max-height="300" ref="multipleTable" >
				<el-table-column
				type="selection"
				width="55">
				</el-table-column>
				<el-table-column type="index" label="序号"></el-table-column>
				<el-table-column property="checkno" label="设备编号"></el-table-column>
				<el-table-column property="content" label="内容"></el-table-column>
				<el-table-column label="结果">
					<template slot-scope="scope" >
						<div  v-for="(value,index) in scope.row.checkbtn" :key="index">
							<el-radio v-model="scope.row.rg" :label="value.radio" v-if="value.radio" >{{value.radio}}</el-radio>
						</div>
						<div  v-for="value in scope.row.checkbtn" :key="value">
							<el-checkbox :label="value.checkbox" v-if="value.checkbox" >{{value.checkbox}}</el-checkbox>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<el-form-item style="margin-top: 10px;">
				<el-button type="primary" @click="save">保存</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</el-form-item>
		</el-form>
		</el-dialog>
		</el-form>
	</div>
</template>

<script>
	import {SpotCheckRecord_AddContent,SpotCheckRecord_GetNewContent,SpotCheckRecord_Submit,SpotCheckRecord_GetDeviceInfo,SpotCheckRecord_ContentEdit,SpotCheckRecord_GetContent} from '../../../../../api/deviceMation.js';
	export default {
		props:{
			infoData:{
				type:Object,
			}
		},
		data(){
			return{
				showCheck:false,
				nowEditData:'',
				devicecode:'',
				devicename:'',
				devicetype:'',
				deviceSorce:'',
				devicestate:'',
				scno:this.infoData.scon,
				tables:[],
				checkvalue:'',
				deviceidValue:'',
				devicesnoSelect:[],
				did:'',
				dialogVisible:false,
				searchslist:[],
				ddtime:'',
				isShow:false,
			}
		},
		created() {
			this.defaultInit();
		},
		mounted() {
			// this.defaultAdd();
		},
		methods:{
			defaultInit(){
				SpotCheckRecord_GetDeviceInfo(this.scno).then(res=>{   //获取设备列表
					// console.log(res);
					if(res.code==200){
						this.devicesnoSelect = res.data;
						if(res.data.length>0){
							this.deviceidValue = res.data[0].d_id;
						}
					}
				}).catch(err => {
						this.$message.error(err.message)
				});
			},
			defaultAdd(){    //获取表格
				SpotCheckRecord_GetContent(this.deviceidValue,this.scno).then(res => {
					let that = this;
					if(res.code == 200) {
						console.log(res);
						that.tables=res.data.SpotCheckContent;
						this.tables.map(item => {
							this.$set(item, 'isChange', false) // 这里，给对象添加属性，用$set方法。
							this.$set(item, 'checkboxGroup', []) // 这里，给对象添加属性，用$set方法。
							this.$set(item,'radioGroup','')
							return item;
						})
						
					}else{
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			chooseD(){
				this.defaultAdd();
			},
			chooseCheckbox(value,scope){
				console.log(value);
				console.log(scope.row)
			},
			chooseRadio(value){
				console.log(value);
			},
			handleClickO(scope){
				scope.row.isChange = true;
			},
			cancel(scope){
				scope.row.isChange = false;
			},
			handleClickT(scope){ //保存
				console.log(scope.row);
				if(scope.row.radioGroup){
					this.checkvalue = scope.row.radioGroup;
				}
				if(scope.row.checkboxGroup.length>0){
					this.checkvalue = scope.row.checkboxGroup.join(',');
				}
				if(!this.checkvalue){
					this.$message.error('请选择选项！');
					return false;
				}
				SpotCheckRecord_ContentEdit(this.checkvalue,scope.row.id).then(res => {
					let that = this;
					if(res.code == 200) {
						console.log(res);
						if(res.code == 200) {
							this.$message({
								message: '修改成功！',
								type: 'success'
							});
							this.defaultAdd();
						}else{
							that.$message.error(res.msg)
						}
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
				scope.row.isChange = false;
			},
			moreIn(){
				let arr = [];
				for (var i = 0; i < this.tables.length; i++) {
					if(this.tables[i].checkvalue){
						if(this.tables[i].isChange==true){
							if(this.tables[i].radioGroup){
								arr.push({id:this.tables[i].id,checkvalue:this.tables[i].radioGroup});
							}
							if(this.tables[i].checkboxGroup.length>0){
								arr.push({id:this.tables[i].id,checkvalue:this.tables[i].checkboxGroup.join(',')});
							}
						}else{
							arr.push({id:this.tables[i].id,checkvalue:this.tables[i].checkvalue});
						}
					}else{
						if(this.tables[i].radioGroup){
							arr.push({id:this.tables[i].id,checkvalue:this.tables[i].radioGroup});
						}
						if(this.tables[i].checkboxGroup.length>0){
							arr.push({id:this.tables[i].id,checkvalue:this.tables[i].checkboxGroup.join(',')});
						}
					}
				}
				if(arr.length<=0){
					this.$message.error("请选择选项")
					return false;
				}
				SpotCheckRecord_Submit(JSON.stringify(arr),this.scno).then(res => {
					let that = this;
					if(res.code == 200) {
						if(res.code == 200) {
							this.$message({
								message: '提交成功！',
								type: 'success'
							});
							this.$emit('editClose');
							this.$emit('updateData');
						}else{
							that.$message.error(res.msg)
						}
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
				
			},
			handleClose(done) {
				done();
			},
			newAdd(){
				this.searchslist=[];
				this.dialogVisible = true;
				SpotCheckRecord_GetNewContent(this.deviceidValue,this.scno,3).then(res => {
					let that = this;
					if(res.code == 200) {
						if(res.code == 200) {
							this.searchslist = res.data;
							res.data.forEach((item,index)=>{
								item.checkbtn = JSON.parse(item.checkbtn);
							console.log(item.checkbtn)
							})
						}else{
							that.$message.error(res.msg)
						}
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			save(){
				if(this.$refs.multipleTable.selection.length>0){
					let arr = [];
					this.$refs.multipleTable.selection.forEach((item,index)=>{
						arr.push(item.id);
					})
					SpotCheckRecord_AddContent(this.deviceidValue,this.scno,arr.join(","),this.ddtime).then(res => {
						let that = this;
						if(res.code == 200) {
							this.$message({
								message: '提交成功！',
								type: 'success'
							});
							this.defaultAdd();
							this.dialogVisible = false;
						}else{
							this.$message.error(res.msg)
						}
					}).catch(err => {
						this.$message.error(err.message)
					});
				}else{
					this.$message.error("请选择选项");
					return false;
				}
			},
		},
		watch:{
			infoData: {
				immediate: true,
				handler(newValue, oldValue) {
					this.nowEditData = { ...newValue };
					console.log(this.nowEditData);
					this.scno=this.nowEditData.scno;
					if(this.nowEditData.checktime){
						this.ddtime = this.nowEditData.checktime;
					}
					if(this.scno){
						this.defaultAdd();
						this.defaultInit();
					}
					if(this.nowEditData.source=="触屏" || this.nowEditData.status=="已确认"){
						this.isShow = true;
					}else{
						this.isShow = false;
					}
				}
			}
			
		}
	}
</script>
<style>
	.row-bg div{font-size: 14px;}
</style>


