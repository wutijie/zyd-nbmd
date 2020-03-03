<template>
    <div>
        <el-form ref="repairEdit" :rules="rules" label-width="80px" :model="nowEditData">
            <el-form-item label="类型名称" prop="ft_name">
                <el-input v-model="nowEditData.ft_name"></el-input>
            </el-form-item>
            <el-form-item label="来源" prop="source">
                <el-select v-model="nowEditData.source" placeholder="请选择">
                    <el-option label="触屏" :value="1"></el-option>
                    <el-option label="BOX" :value="2"></el-option>
                    <el-option label="WEB" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('repairEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { getMouldFaultTypeAdd, getMouldFaultTypeEdit } from '../../../../../api/mouldManage.js'
    export default {
        props: {
            editData: {
                type: Object
            }
        },
        data() {
            return {
                nowEditData: {},
                rules: {
                    ft_name: [
                        { required: true, message: '请输入类型名称', trigger: 'blur' }
                    ],
                    source: [
                        { required: true, message: '请选择来源', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName, add) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.nowEditData);
                        if(this.nowEditData.add && this.nowEditData.add == 1) {
                            getMouldFaultTypeAdd({
                                typename: this.nowEditData.ft_name,
                                source: this.nowEditData.source
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
                            getMouldFaultTypeEdit({
                                typename: this.nowEditData.ft_name,
                                source: this.nowEditData.source,
                                id: this.nowEditData.ft_id
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
                    this.nowEditData = { ...newValue.editData };
                    if(this.nowEditData.add && this.nowEditData.add == 1){
                        this.btnMsg = '添加';
                    }else{
                        this.btnMsg = '修改';
                        if(this.nowEditData.source == '触屏'){
                            this.nowEditData.source = 1;
                        }else if(this.nowEditData.source == 'BOX'){
                            this.nowEditData.source = 2;
                        }else if(this.nowEditData.source == 'WEB'){
                            this.nowEditData.source = 3;
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>