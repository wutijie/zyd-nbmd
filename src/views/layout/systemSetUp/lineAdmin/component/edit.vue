<template>
    <div>
        <el-form ref="menuEdit" label-width="80px" :model="nowEditData">
            <el-form-item label="产线名称">
                <el-input v-model="nowEditData.plName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('menuEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { setProductionLine } from '../../../../../api/spuerAdmin.js'
    export default {
        props: {
            editData: {
                type: Object,
            }
        },
        data() {
            return {
                nowEditData: this.editData,
                btnMsg: ''
            }
        },
        methods: {
            submitForm(formName, add) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'power_fun_production_line_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log(this.nowEditData);return;
                        setProductionLine({
                            type: add == 1 ? 1 : 2,
                            cId: this.nowEditData.cid,
                            plId: this.nowEditData.plId,
                            plName: this.nowEditData.plName
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
                            // console.log(err);
                            this.$message.error(err.message);
                        })
                        
                        // this.$emit('editClose');

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