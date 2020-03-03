<template>
	<div>
		<el-row type="flex" class="row-bg" justify="space-around" style="padding: 10px;">
			<div class="searchs">
				<span>设备：</span>
				<el-select v-model="deviceidValue" filterable placeholder="请输入设备编号" @change="defaultAdd">
					<el-option
					v-for="(item,index) in devicesnoSelect"
					:key="index"
					:label="item.deviceid+' '+item.deviceName+' '+item.Model"
					:value="item.olddeviceid">
					</el-option>
				</el-select>
			</div>
			<div class="searchs">
				<span>来源：</span>
				<el-select v-model="sourceValue" filterable placeholder="" >
					<el-option
					v-for="(item,index) in sourceList"
					:key="index"
					:label="item.name"
					:value="item.value">
					</el-option>
				</el-select>
			</div>
		</el-row>
		<el-table :data="tables" style="width: 100%" height="300px" id="out-table" >
			<el-table-column prop="content" label="点检内容" align="center"></el-table-column>
			<el-table-column prop="checkbtn" label="内容" align="center" >
				<template slot-scope="scope" style="display: flex;justify-content: space-around;" >
					<el-checkbox-group v-model="scope.row.checkboxGroup" v-if="JSON.parse(scope.row.checkbtn)[0].checkbox" >
						<el-checkbox  v-for="value in JSON.parse(scope.row.checkbtn)" :key="value.checkbox" :label="value.checkbox"  v-model="value.checked">{{value.checkbox}}</el-checkbox>
					</el-checkbox-group>
					<div  v-for="value in JSON.parse(scope.row.checkbtn)" :key="value.radio">
						<el-radio v-model="scope.row.radioGroup" :label="value.radio" v-if="value.radio" >{{value.radio}}</el-radio>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<el-row class="device-power-handle" style="text-align: right;margin-top: 10px;">
			<el-button type="primary" @click="submitForm('menuEdit')">{{ btnMsg }}</el-button>
			<el-button  @click="$emit('editClose')">取消</el-button>
		</el-row>
	</div>
</template>

<script>
	import {SpotCheckRecord,SpotCheckRecord_GetContent,SpotCheckRecord_Add} from '../../../../../api/deviceMation.js';
	export default {
		props:{
			editData:{
				type:Object,
			}
		},
		data(){
			return{
				devicesnoSelect:[],
				sourceList:[
					// {value:1,name:"触屏"},
					// {value:2,name:"盒子box"},
					{value:3,name:"web"},
					// {value:4,name:"app"},
					// {value:5,name:"api"},
					// {value:6,name:"sdk"}
				],
				sourceValue:3,
				deviceidValue:'',
				custid:'',
				tables:[],
				checkedContent:'',
				checkBoxData:[],
				checkmodel:[],
			}
		},
		created() {
			
		},
		methods:{
			init(){
				SpotCheckRecord(this.custid,this.deviceidValue,this.sourceValue).then(res => {
					let that = this;
					if(res.code == 200) {
						that.devicesnoSelect=res.data.DeviceSelect;
						if(res.data.DeviceSelect.length>0){
							that.custid = res.data.DeviceSelect[0].custid;
							that.deviceidValue = res.data.DeviceSelect[0].olddeviceid;
						}
						that.defaultAdd();
						
					}else{
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			changeFun(){},
			defaultAdd(){
				SpotCheckRecord_GetContent(this.custid,this.deviceidValue,this.sourceValue,'').then(res => {
					let that = this;
					if(res.code == 200) {
						console.log(res);
						that.tables = res.data;
						this.tables.map(item => {
							//item.checked = false
							this.$set(item, 'checkboxGroup', []) // 这里，给对象添加属性，用$set方法。
							this.$set(item,'radioGroup','')
							return item;
						})
					}else{
						that.tables=[];
						that.$message.error(res.msg)
					}
				}).catch(err => {
					this.$message.error(err.message)
				});
			},
			submitForm(){
				let arr = [];
				let list = [];
				for (var i = 0; i < this.tables.length; i++) {
					if(this.tables[i].radioGroup){
						arr.push({'checkno':this.tables[i].checkno,'checkvalue':this.tables[i].radioGroup})
					}
					if(this.tables[i].checkboxGroup.length>0){
						arr.push({'checkno':this.tables[i].checkno,'checkvalue':this.tables[i].checkboxGroup.join(',')})
					}
				}
				if(arr.length==this.tables.length){
					SpotCheckRecord_Add(this.custid,this.deviceidValue,this.sourceValue,JSON.stringify(arr)).then(res => {
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
				}else{
					this.$message.error("请检查选项是否选择完全！")
				}
			},
		},
		watch:{
			editData: {
				immediate: true,
				handler(newValue, oldValue) {
					this.nowEditData = { ...newValue };
					console.log(this.nowEditData);
					this.init();
					if(this.nowEditData.add && this.nowEditData.add == 1){
						this.btnMsg='提交'
					}else{
						this.btnMsg='修改';
					}
				}
			}
			
		}
	}
</script>

<style>
</style>
