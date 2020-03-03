<template>
    <div>
        <el-form ref="faultEdit" :rules="rules" label-width="110px" :model="nowEditData">
            <el-form-item label="故障编号" prop="fr_number">
                <el-row :gutter="10">
                    <el-col :span="17">
                        <el-input v-model="nowEditData.fr_number" :readonly="nowEditData.add != 1"></el-input>
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
                    <el-form-item label="故障开始时间">
                        <el-date-picker :disabled="nowEditData.add == 3" style="width: 100%;" v-model="nowEditData.fr_begintime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <!-- <el-form-item label="故障结束时间">
                        <el-date-picker style="width: 100%;" v-model="nowEditData.fr_endtime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期时间"></el-date-picker>
                    </el-form-item> -->
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="17">
                    <el-form-item label="故障类型">
                        <el-select :disabled="nowEditData.add == 3" v-model="nowEditData.ft_id" placeholder="请选择" @change="handleTemplateSelect" class="w100p">
                            <el-option
                                v-for="(item, index) in hasSelect.faultTypeSelectByAdd"
                                :key="index"
                                :label="item.ft_name"
                                :value="item.ft_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button :disabled="nowEditData.add == 3" type="primary" @click="handleType(1, 10)">类型</el-button>
                </el-col>
            </el-row>
            <el-form-item label="故障内容">
                <el-input :readonly="nowEditData.add == 3" type="textarea" :rows="2" v-model="nowEditData.fr_content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button v-if="nowEditData.add != 3" type="primary" @click="submitForm('faultEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
        <!-- 类型模板 -->
        <el-dialog title="类型模板" :visible.sync="dialogTypeVisible" width="60%" append-to-body>
            <TypeEdit :editData="editDataType"  @editClose="editCloseType" @updateData="handleType"></TypeEdit>
        </el-dialog>
    </div>
</template>

<script>
    import { getDeviceInfoGetNumber, getDeviceFaultRecordAdd, getDeviceFaultRecordEdit, getDeviceFaultType } from '../../../../../api/deviceManage.js'
    import TypeEdit from './typeEdit.vue'
    export default {
        components: {
            TypeEdit,
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
                    fr_number: [
                        { required: true, message: '请输入故障编号', trigger: 'change' }
                    ],
                    d_id: [
                        { required: true, message: '请选择设备编号', trigger: 'change' }
                    ]
                },
                hasSelect: {},
                dialogTypeVisible: false,
                editDataType: {}
            }
        },
        methods: {
            // 自动生成设备编号
            createOrderNumber(){
                getDeviceInfoGetNumber({
                    type: 6
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.$set(this.nowEditData, 'fr_number', res.data);
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 设备选择
            handleDeviceChange(val){
                console.log(val);
                let nowSelect = this.hasSelect.deviceSelect.find( result => {
                    return result.d_id == val;
                })
                console.log(nowSelect);
                this.$set(this.nowEditData, 'd_name', nowSelect.d_name);
            },
            // 模板选择
            handleTemplateSelect() {},
            // 查看模板
            handleType(page, pageSize){
                // console.log(page, pageSize)
                page = page ? page : 1;
                pageSize = pageSize ? pageSize : 10;
                getDeviceFaultType({
                    page: page,
                    row: pageSize
                }).then( res => {
                    console.log(res);
                    if(res.code == 200){
                        // 
                        this.hasSelect.faultTypeSelectByAdd = [ ...res.data ];
                        this.editDataType = {
                            listData: res.data,
                            count: res.count,
                            page, 
                            pageSize
                        };
                    }else{
                        this.hasSelect.faultTypeSelectByAdd = [];
                        this.editDataType = {
                            listData: [],
                            count: res.count,
                            page, 
                            pageSize
                        };
                    }
                    this.dialogTypeVisible = true;
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 关闭模板弹窗
            editCloseType() {
                this.dialogTypeVisible = false;
                this.editDataType = {};
            },
            submitForm(formName, add) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_device_manage_mafault_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.nowEditData);
                        if(this.nowEditData.add && this.nowEditData.add == 1){
                            getDeviceFaultRecordAdd({
                                did: this.nowEditData.d_id,
                                typeid: this.nowEditData.ft_id,
                                source: this.nowEditData.fr_source,
                                content: this.nowEditData.fr_content,
                                begintime: this.nowEditData.fr_begintime,
                                endtime: this.nowEditData.fr_endtime,
                                faultno: this.nowEditData.fr_number
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
                            getDeviceFaultRecordEdit({
                                did: this.nowEditData.d_id,
                                typeid: this.nowEditData.ft_id,
                                content: this.nowEditData.fr_content,
                                begintime: this.nowEditData.fr_begintime,
                                endtime: this.nowEditData.fr_endtime,
                                id: this.nowEditData.fr_id
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
                    console.log(newValue);
                    setTimeout( () => {
                        this.$refs.faultEdit.clearValidate();
                    }, 0)
                    this.nowEditData = { ...newValue.editData };
                    this.hasSelect = { ...newValue.hasSelect };
                    if(this.nowEditData.add && this.nowEditData.add == 1){
                        this.btnMsg = '添加';
                    }else{
                        this.btnMsg = '修改';
                        if(this.nowEditData.add && this.nowEditData.add == 3){
                            this.nowEditData.d_id = this.nowEditData.fr_number;
                            this.nowEditData.ft_id = this.nowEditData.ft_name;
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>