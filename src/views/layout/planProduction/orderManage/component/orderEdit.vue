<template>
    <div class="plan-order-manage">
        <el-form ref="planOrderEdit" :rules="rules" label-width="80px" :model="nowEditData">
            <el-form-item label="工单编号" prop="orderno">
                <el-row :gutter="10">
                    <el-col :span="17">
                        <el-input v-model="nowEditData.orderno" :disabled="nowEditData.add != 1"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" size="mini" @click="createOrderNumber" :disabled="nowEditData.add != 1">自动生成</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="计划编号" prop="planno">
                        <el-select v-model="nowEditData.planno" placeholder="请选择" @change="handlePlanChange" :disabled="nowEditData.add != 1" class="w100p">
                            <el-option
                                v-for="(item, index) in hasSelectData.WorkPlanSelect"
                                :key="index"
                                :label="item.planno"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="计划产量">
                        <el-input v-model="nowEditData.plannum" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="计划开始">
                        <el-input v-model="nowEditData.planbegintime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="计划结束">
                        <el-input v-model="nowEditData.planendtime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="产品名称">
                        <el-input v-model="nowEditData.proname" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="产品型号">
                        <el-input v-model="nowEditData.promodel" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="设备" prop="did">
                        <el-select v-model="nowEditData.did" placeholder="请选择" @change="handleDeviceChange" class="w100p">
                            <el-option
                                v-for="(item, index) in hasSelectData.DeviceSelect"
                                :key="index"
                                :label="item.devciename"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="班次">
                        <!-- <el-input v-model="nowEditData.classname" :disabled="true"></el-input> -->
                        <el-select v-model="nowEditData.classname" placeholder="请选择" class="w100p">
                            <el-option
                                v-for="(item, index) in classesSelect"
                                :key="index"
                                :label="item.classname + '-' + item.beginTime + '-' + item.endTime"
                                :disabled="true"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <!-- <el-select v-model="nowEditData.classname" placeholder="请选择" class="w100p">
                            <el-option
                                v-for="(item, index) in classesSelect"
                                :key="index"
                                :label="item.beginTime + '-' + item.endTime"
                                @change="handleClassesSelect"
                                :value="item.id">
                            </el-option>
                        </el-select> -->
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="产线">
                        <el-input v-model="nowEditData.groupname" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="模具" prop="mouldid">
                        <el-select v-model="nowEditData.mouldid" placeholder="请选择" class="w100p">
                            <el-option
                                v-for="(item, index) in hasSelectData.MouldSelect"
                                :key="index"
                                :label="item.modelnumber"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="员工" prop="userid">
                        <el-select v-model="nowEditData.userid" placeholder="请选择" class="w100p">
                            <el-option
                                v-for="(item, index) in hasSelectData.UserSelect"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="工序">
                        <el-input v-model="nowEditData.workno"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10" v-for="(item, index) in customContent" :key="index">
                <el-col :span="11">
                    <el-form-item label="参数名称">
                        <el-input v-model="item.param"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="参数值">
                        <el-input v-model="item.value"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2" v-if="index == customContent.length - 1">
                    <el-button size="mini" icon="el-icon-plus" @click="handleAddCustom"></el-button>
                </el-col>
                <el-col :span="2" v-else>
                    <el-button size="mini" icon="el-icon-close" @click="handleDelCustom(index)"></el-button>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="submitForm('planOrderEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { planProductionGetNewNumber, planGetClassByDevice, workOrderManageAdd, workOrderManageEdit } from '../../../../../api/orderManage.js'
    export default {
        props: {
            editData: {
                type: Object
            }
        },
        data() {
            return {
                nowEditData: {},
                btnMsg: '',
                rules: {
                    orderno: [
                        { required: true, message: '请输入工单编号', trigger: 'change' }
                    ],
                    planno: [
                        { required: true, message: '请选择计划编号', trigger: 'change' }
                    ],
                    mouldid: [
                        { required: true, message: '请选择模具', trigger: 'change' }
                    ],
                    did: [
                        { required: true, message: '请选择设备', trigger: 'change' }
                    ],
                    userid: [
                        { required: true, message: '请选择员工', trigger: 'change' }
                    ],
                },
                hasSelectData: {},
                classesSelect: [],
                customContent: [
                    {
                        param: '',
                        value: ''
                    }
                ]
            }
        },
        methods: {
            // 自动生成工单编号
            createOrderNumber(){
                // if(!this.nowEditData.planno){
                //     this.$message.warning('请先选择计划编号!');
                //     return;
                // }
                planProductionGetNewNumber({
                    type: 2
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.$set(this.nowEditData, 'orderno', res.data);
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 选择计划编号
            handlePlanChange(val){
                // console.log(val);
                // console.log(this.nowEditData);
                val.planbegintime = this.$handleTime(val.planbegintime);
                val.planendtime = this.$handleTime(val.planendtime);
                val.planbegintime = this.$handleTime(val.planbegintime);
                Object.keys(val).forEach( (item, index) => {
                    this.$set(this.nowEditData, item, val[item]);
                })
            },
            // 选择设备
            handleDeviceChange(val){
                // this.$set(this.nowEditData, 'did', val.deviceid);
                let nowSelect = this.hasSelectData.DeviceSelect.find( result => {
                    return result.id == val;
                })
                this.$set(this.nowEditData, 'groupname', nowSelect.groupname);
                this.$set(this.nowEditData, 'classname', nowSelect.classname);
                planGetClassByDevice({
                    id: val
                }).then( res => {
                    console.log(res);
                    if(res.code == 200){
                        this.classesSelect = res.data;
                        // this.$set(this.nowEditData, 'classid', '');
                    }else{
                        this.classesSelect = [];
                        // this.$set(this.nowEditData, 'classid', '0');
                    }
                    // let nowSelect = this.hasSelectData.DeviceSelect.find( result => {
                    //     return result.id == val;
                    // })
                    // this.$set(this.nowEditData, 'groupname', nowSelect.groupname);
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 选择班次
            handleClassesSelect(){
                if(this.classesSelect && this.classesSelect.length == 0){
                    this.$message.info("请先选择设备");
                }
            },
            // 添加用户自定义
            handleAddCustom(){
                this.customContent.push(
                    {
                        param: '',
                        value: ''
                    }
                )
            },
            // 删除用户自定义
            handleDelCustom(index){
                this.customContent.splice(index, 1);
            },
            submitForm(formName, add) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_work_manage_work_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log(this.nowEditData);
                        if(add == 1){
                            workOrderManageAdd({
                                planno: this.nowEditData.planno,
                                orderno: this.nowEditData.orderno,
                                did: this.nowEditData.did,
                                mouldid: this.nowEditData.mouldid,
                                workno: this.nowEditData.workno,
                                userid: this.nowEditData.userid,
                                // classid: this.nowEditData.classid == 0 || this.nowEditData.classid ? this.nowEditData.classid : '',
                                json: JSON.stringify(this.customContent)
                            }).then( res => {
                                // console.log(res);
                                if(res.code == 200){
                                    this.$message({type: 'success', message: this.btnMsg + '成功!'});
                                    this.$emit('editClose');
                                    this.$emit('updateData');
                                }else{
                                    this.$message.error(res.msg);
                                }
                            }).catch( err => {
                                this.$message.error(err.message);
                            })
                        }else{
                            workOrderManageEdit({
                                did: this.nowEditData.did,
                                mouldid: this.nowEditData.mouldid,
                                workno: this.nowEditData.workno,
                                userid: this.nowEditData.userid,
                                // classid: this.nowEditData.classid == 0 || this.nowEditData.classid ? this.nowEditData.classid : 0,
                                json: JSON.stringify(this.customContent),
                                id: this.nowEditData.id == 0 || this.nowEditData.id ? this.nowEditData.id : ''
                            }).then( res => {
                                // console.log(res);
                                if(res.code == 200){
                                    this.$message({type: 'success', message: this.btnMsg + '成功!'});
                                    this.$emit('editClose');
                                    this.$emit('updateData');
                                }else{
                                    this.$message.error(res.msg);
                                }
                            }).catch( err => {
                                this.$message.error(err.message);
                            })
                        }
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        watch: {
            editData: {
                immediate: true,
                handler(newValue, oldValue) {
                    // console.log(newValue);
                    setTimeout( () => {
                        this.$refs.planOrderEdit.clearValidate();
                    }, 0)
                    this.classesSelect = [];
                    this.nowEditData = { ...newValue.editData };
                    this.hasSelectData = { ...newValue };
                    this.btnMsg = this.nowEditData.add && this.nowEditData.add == 1 ? '添加' : '修改';
                    this.customContent = this.nowEditData.json ? JSON.parse(this.nowEditData.json) : [{param: '', value: ''}]
                    // console.log(this.nowEditData.json)
                    // console.log(this.customContent)
                    // console.log(this.nowEditData);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>