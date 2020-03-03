<template>
    <div>
        <el-form ref="repairEdit" :rules="rules" label-width="110px" :model="nowEditData">
            <el-form-item label="维修编号" prop="rr_repair_planorder">
                <el-row :gutter="10">
                    <el-col :span="17">
                        <el-input v-model="nowEditData.rr_repair_planorder" :readonly="nowEditData.add != 1"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" size="mini" @click="createOrderNumber" :disabled="nowEditData.add != 1">自动生成</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="设备编号" prop="d_id">
                        <el-select :disabled="nowEditData.add == 3" v-model="nowEditData.d_id" placeholder="请选择" @change="handleDeviceChange" class="w100p">
                            <el-option
                                v-for="(item, index) in hasSelect.deviceSelect"
                                :key="index"
                                :label="item.d_number"
                                :value="item.d_id">{{ item.d_number + '-' + item.d_name }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="设备名称">
                        <el-input v-model="nowEditData.d_name" :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="计划维修时间">
                        <el-date-picker :disabled="nowEditData.add == 3" style="width: 100%;" v-model="nowEditData.rr_planBeginTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="计划完成时间">
                        <el-date-picker :disabled="nowEditData.add == 3" style="width: 100%;" v-model="nowEditData.rr_planEndTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="维修原因">
                <el-input :readonly="nowEditData.add == 3" type="textarea" :rows="2" v-model="nowEditData.rr_repairreason"></el-input>
            </el-form-item>
            <el-row :gutter="10">
                <el-col :span="17">
                    <el-form-item label="维修模板">
                        <el-select :disabled="nowEditData.add == 3" v-model="nowEditData.rt_id" placeholder="请选择" @change="handleTemplateSelect" class="w100p">
                            <el-option
                                v-for="(item, index) in hasSelect.repairTemplateSelect"
                                :key="index"
                                :label="item.rt_name"
                                :value="item.rt_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="handleTemplate(1, 10)">模板</el-button>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button v-if="nowEditData.add != 3" type="primary" @click="submitForm('repairEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
        <!-- 维修模板 -->
        <el-dialog title="维修模板" :visible.sync="dialogTemplateVisible" width="60%" append-to-body>
            <TemplateEdit :editData="editDataTemplate"  @editClose="editCloseTemplate" @updateData="handleTemplate"></TemplateEdit>
        </el-dialog>
    </div>
</template>

<script>
    import { getDeviceInfoGetNumber, getDeviceRepairRecordAdd, getDeviceRepairRecordEdit, getDeviceRepairTemplate } from '../../../../../api/deviceManage.js'
    import TemplateEdit from './templateEdit.vue'
    export default {
        components: {
            TemplateEdit,
        },
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
                    rr_repair_planorder: [
                        { required: true, message: '请输入维修编号', trigger: 'change' }
                    ],
                    d_id: [
                        { required: true, message: '请选择设备编号', trigger: 'change' }
                    ]
                },
                hasSelect: {},
                dialogTemplateVisible: false,
                editDataTemplate: {},
                nowContent: '',
                oldContentId: '',
                oldContent: ''
            }
        },
        methods: {
            // 自动生成设备编号
            createOrderNumber(){
                getDeviceInfoGetNumber({
                    type: 5
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.$set(this.nowEditData, 'rr_repair_planorder', res.data);
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 设备选择
            handleDeviceChange(val){
                // console.log(val);
                let nowSelect = this.hasSelect.deviceSelect.find( result => {
                    return result.d_id == val;
                })
                // console.log(nowSelect);
                this.$set(this.nowEditData, 'd_name', nowSelect.d_name);
            },
            // 模板选择
            handleTemplateSelect(val) {
                // console.log(val);
                let nowSelect = this.hasSelect.repairTemplateSelect.find( result => {
                    return result.rt_id == val;
                })
                // console.log(nowSelect);
                this.nowContent = nowSelect.rt_content;
            },
            // 查看模板
            handleTemplate(page, pageSize){
                // console.log(page, pageSize)
                page = page ? page : 1;
                pageSize = pageSize ? pageSize : 10;
                getDeviceRepairTemplate({
                    page: page,
                    row: pageSize
                }).then( res => {
                    console.log(res);
                    if(res.code == 200){
                        // 
                        this.hasSelect.repairTemplateSelect = [ ...res.data ];
                        console.log(this.hasSelect.repairTemplateSelect)
                        this.editDataTemplate = {
                            listData: res.data,
                            count: res.count,
                            page, 
                            pageSize
                        };
                    }else{
                        this.hasSelect.repairTemplateSelect = [];
                        this.editDataTemplate = {
                            listData: [],
                            count: res.count,
                            page, 
                            pageSize
                        };
                    }
                    this.dialogTemplateVisible = true;
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 关闭模板弹窗
            editCloseTemplate() {
                this.dialogTemplateVisible = false;
                this.editDataTemplate = {};
            },
            submitForm(formName, add) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_device_manage_repair_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log(this.nowEditData);
                        if(this.nowEditData.add && this.nowEditData.add == 1){
                            getDeviceRepairRecordAdd({
                                repairno: this.nowEditData.rr_repair_planorder,
                                did: this.nowEditData.d_id,
                                planbegintime: this.nowEditData.rr_planBeginTime,
                                planendtime: this.nowEditData.rr_planEndTime,
                                reason: this.nowEditData.rr_repairreason,
                                tempid: this.nowEditData.rt_id,
                                content: this.nowContent
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
                            if(this.nowEditData.rt_id == this.oldContentId){
                                this.nowContent = this.oldContent;
                            }
                            // console.log(this.nowContent);
                            // return;
                            getDeviceRepairRecordEdit({
                                did: this.nowEditData.d_id,
                                planbegintime: this.nowEditData.rr_planBeginTime,
                                planendtime: this.nowEditData.rr_planEndTime,
                                reason: this.nowEditData.rr_repairreason,
                                tempid: this.nowEditData.rt_id,
                                id: this.nowEditData.rr_id,
                                content: this.nowContent
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
                        this.$refs.repairEdit.clearValidate();
                    }, 0)
                    this.nowEditData = { ...newValue.editData };
                    this.hasSelect = { ...newValue.hasSelect };
                    if(this.nowEditData.add && this.nowEditData.add == 1){
                        this.btnMsg = '添加';
                    }else{
                        this.btnMsg = '修改';
                        this.oldContentId = this.nowEditData.rt_id;
                        this.oldContent = this.nowEditData.rr_content;
                        this.nowContent = this.nowEditData.rr_content;
                        // console.log(this.oldContentId)
                        // console.log(this.oldContent)
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>