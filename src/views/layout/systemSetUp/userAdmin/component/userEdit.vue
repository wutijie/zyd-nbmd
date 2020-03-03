<template>
    <div class="useradmin-useredit">
        <el-form ref="userEdit" label-width="80px" :model="nowEditData">
            <el-form-item label="姓名">
                <el-input v-model="nowEditData.uname"></el-input>
            </el-form-item>
            <el-form-item label="组织">
                <el-cascader
                    v-model="nowEditData.csId"
                    ref="sysUserEdit"
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
            <el-form-item label="性别">
                <el-select v-model="nowEditData.usex" placeholder="请选择">
                    <el-option label="男" :value="0"></el-option>
                    <el-option label="女" :value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="nowEditData.uuserName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="nowEditData.upassword"></el-input>
            </el-form-item>
            <el-form-item label="工号">
                <el-input v-model="nowEditData.uworkId"></el-input>
            </el-form-item>
            <el-form-item label="职位">
                <el-input v-model="nowEditData.uduty"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('userEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
   import { userManage } from '../../../../../api/spuerAdmin.js'
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
                btnMsg: ''
            }
        },
        methods: {
            handleChange(val){
                console.log(val);
                // console.log(this.$refs.sysUserEdit.getCheckedNodes())
                this.nowEditData.csLevel = this.$refs.sysUserEdit.getCheckedNodes()[0].level;
            },
            submitForm(formName, add) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_user_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.nowEditData);
                        // return;
                        userManage({
                            type: add == 1 ? 2 : 3,
                            csId: this.nowEditData.csId,
                            uId: this.nowEditData.uid,
                            uName: this.nowEditData.uname,
                            uSex: this.nowEditData.usex,
                            uUserName: this.nowEditData.uuserName,
                            uPassword: this.nowEditData.upassword,
                            uWorkId: this.nowEditData.uworkId,
                            uDuty: this.nowEditData.uduty,
                            cId: this.$store.getters.cId
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