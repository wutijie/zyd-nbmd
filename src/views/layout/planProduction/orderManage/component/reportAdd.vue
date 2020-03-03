<template>
    <div>
        <el-form ref="planAddEdit" :rules="rules" label-width="100px" :model="nowEditData">
            <el-form-item label="报工数量" prop="worknum">
                <el-input v-model.number="nowEditData.worknum"></el-input>
            </el-form-item>
            <el-form-item label="不合格数量" prop="notpassnum">
                <el-input v-model.number="nowEditData.notpassnum"></el-input>
            </el-form-item>
            <el-form-item label="不合格原因">
                <el-input v-model="nowEditData.notpassreason"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('planAddEdit')">添加</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { workReportAdd } from '../../../../../api/orderManage.js'
    export default {
        props: {
            editData: {
                type: Object
            }
        },
        data() {
            let checkNum = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 0) {
                            callback(new Error('不能小于0'));
                        } else {
                            callback();
                        }
                    }
                }, 100);
            };
            return {
                nowEditData: {},
                rules: {
                    worknum: [
                        { validator: checkNum, required: true, trigger: 'change' }
                    ],
                    notpassnum: [
                        { validator: checkNum, required: true, trigger: 'change' }
                    ],
                }
            }
        },
        methods: {
            submitForm(formName, add) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log(this.nowEditData);
                        workReportAdd({
                            planno: this.nowEditData.nowRow.planno,
                            orderno: this.nowEditData.nowRow.orderno,
                            did: this.nowEditData.nowRow.did,
                            source: this.nowEditData.source,
                            worknum: this.nowEditData.worknum,
                            notpassnum: this.nowEditData.notpassnum,
                            notpassreason: this.nowEditData.notpassreason
                        }).then( res => {
                            // console.log(res);
                            if(res.code == 200){
                                this.$message({type: 'success', message: '添加成功!'});
                                this.$emit('editClose');
                                this.$emit('updateData');
                            }else{
                                this.$message.error(res.msg);
                            }
                        }).catch( err => {
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
                    // console.log(newValue);
                    setTimeout( () => {
                        this.$refs.planAddEdit.clearValidate();
                    }, 0)
                    this.nowEditData = { ...newValue };
                    // console.log(this.nowEditData);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>