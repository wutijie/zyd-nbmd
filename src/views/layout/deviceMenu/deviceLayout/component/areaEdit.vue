<template>
    <div>
        <el-form ref="areaEdit" label-width="100px" :rules="rules" :model="nowEditData">
            <el-form-item label="区域名称" prop="daName">
                <el-input v-model="nowEditData.daName"></el-input>
            </el-form-item>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="区域所在行" prop="daRow">
                        <el-select v-model="nowEditData.daRow" placeholder="请选择">
                            <el-option
                                v-for="item in selectNum"
                                style="width: 100%;"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="区域所在列" prop="daLine">
                        <el-select v-model="nowEditData.daLine" placeholder="请选择">
                            <el-option
                                v-for="item in selectNum"
                                style="width: 100%;"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="submitForm('areaEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { manageDeviceArea } from '../../../../../api/deviceMenu.js'
    export default {
        props: {
            editData: {
                type: Object,
            }
        },
        data() {
            return {
                nowEditData: this.editData,
                btnMsg: '',
                rules: {
                    daName: [
                        { required: true, message: '请输入区域名称', trigger: 'blur' },
                    ],
                    daRow: [
                        { required: true, message: '请选择区域所在行', trigger: 'blur' },
                    ],
                    daLine: [
                        { required: true, message: '请选择区域所在列', trigger: 'blur' },
                    ],
                },
                selectNum: 3
            }
        },
        methods: {
            submitForm(formName, add) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log(this.nowEditData);
                        // return;
                        manageDeviceArea({
                            type: add == 1 ? 1 : 2,
                            daId: this.nowEditData.daId,
                            daName: this.nowEditData.daName,
                            daRow: this.nowEditData.daRow,
                            daLine: this.nowEditData.daLine
                        }).then( res => {
                            // console.log(res);
                            if(res.code == 200){
                                this.$message({type: 'success', message: this.btnMsg + '成功!'});
                                this.$emit('editClose');
                                this.$emit('updateData');
                                this.$store.dispatch('user/getInfo');
                            }else{
                                this.$message.error(res.msg);
                            }
                        }).catch( err => {
                            // console.log(err);
                            this.$message.error(err.message);
                        })
                        

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
                    this.nowEditData = { ...newValue };
                    this.btnMsg = this.nowEditData.add && this.nowEditData.add == 1 ? '添加' : '修改';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>