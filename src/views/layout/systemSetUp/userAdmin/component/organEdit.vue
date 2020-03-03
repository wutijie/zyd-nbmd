<template>
    <div class="useeradmin-organEdit">
        <el-form ref="organEdit" label-width="80px" :model="nowEditData">
            <el-form-item label="上级组织">
                <el-cascader
                    v-model="nowEditData.csPater"
                    ref="sysUserOrgan"
                    :options="levelOneOrgan"
                    :props="{
                        emitPath: false,
                        checkStrictly: true,
                        expandTrigger: 'hover',
                        value: 'csId',
                        label: 'csName'
                    }"
                    style="width: 100%;"
                    @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="组织名称">
                <el-input v-model="nowEditData.csName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('organEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { structure } from '../../../../../api/spuerAdmin.js'
    export default {
        props: {
            editData: {
                type: Object
            }
        },
        data() {
            return {
                nowEditData: this.editData,
                levelOneOrgan: this.$store.getters.organLevelOne,
                levelTwoOrgan: this.$store.getters.organLevelTwo,
                btnMsg: ''
            }
        },
        methods: {
            handleChange(val){
                // console.log(val);
                // console.log(this.$refs.sysUserOrgan.getCheckedNodes())
                this.nowEditData.csLevel = val ? this.$refs.sysUserOrgan.getCheckedNodes()[0].level : '';
            },
            submitForm(formName, add) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_organize';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.nowEditData);
                        // return;
                        structure({
                            type: add == 1 ? 1 : 2,
                            csId: this.nowEditData.csId,
                            csName: this.nowEditData.csName,
                            csLevel: this.nowEditData.csLevel,
                            csPater: this.nowEditData.csPater
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
                    this.levelOneOrgan = this.$store.getters.organLevelOne;
                    // console.log(this.levelOneOrgan);
                    // console.log(this.nowEditData);
                    this.nowEditData.csLevel = this.nowEditData.csPater;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>