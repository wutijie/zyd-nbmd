<template>
    <div>
        <el-form ref="powerEdit" label-width="80px" :model="nowEditData">
            <!-- <el-form-item label="权限等级">
                <el-select v-model="nowEditData.plevel" @change="handleChange" :disabled="!nowEditData.add && nowEditData.level == 0" placeholder="请选择">
                    <el-option label="一级权限" :value="1"></el-option>
                    <el-option label="二级权限" :value="2"></el-option>
                    <el-option label="三级权限" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="nowEditData.plevel == 2" label="父级权限" prop="oneTitle">
                <el-select v-model="nowEditData.ppater" placeholder="请选择">
                    <el-option v-for="(item, index) in levelOnePower" :key="index" :label="item.pname" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else-if="nowEditData.plevel == 3" label="父级权限" prop="twoTitle">
                <el-select v-model="nowEditData.ppater" placeholder="请选择">
                    <el-option v-for="(item, index) in levelTwoPower" :key="index" :label="item.pname" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="权限名称">
                <el-input v-model="nowEditData.pname"></el-input>
            </el-form-item>
            <el-form-item label="上级权限">
                <el-cascader
                    v-model="nowEditData.ppater"
                    ref="sysPower"
                    :options="levelOnePower"
                    :clearable="true"
                    :props="{
                        emitPath: false,
                        checkStrictly: true,
                        expandTrigger: 'hover',
                        value: 'pid',
                        label: 'pname'
                    }"
                    placeholder="添加一级权限时不选"
                    style="width: 100%;"
                    @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="权限标识">
                <el-input v-model="nowEditData.psign"></el-input>
            </el-form-item>
            <!-- <el-form-item label="角色名称">
                <el-cascader
                    v-model="nowEditData.rid"
                    :options="roleList"
                    :clearable="true"
                    :props="{
                        emitPath: false,
                        checkStrictly: true,
                        expandTrigger: 'hover',
                        value: 'rid',
                        label: 'rname'
                    }"
                    placeholder="请选择"
                    style="width: 100%;"></el-cascader>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="submitForm('powerEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { powerManage } from '../../../../../api/spuerAdmin.js'
    export default {
        props: {
            editData: {
                type: Object,
            },
            roleList: {
                type: Array
            }
        },
        data() {
            return {
                nowEditData: this.editData,
                levelOnePower: this.$store.getters.menuLevelOne,
                levelTwoPower: this.$store.getters.menuLevelTwo,
                btnMsg: ''
            }
        },
        methods: {
            handleChange(val){
                console.log(val);
                // console.log(this.$refs.sysUserOrgan.getCheckedNodes())
                this.nowEditData.plevel = val ? ( +this.$refs.sysPower.getCheckedNodes()[0].level + 1) : 1;
            },
            // handleChange(){
            //     this.$set(this.nowEditData, 'ppater', '');
            // },
            submitForm(formName, add) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_platform_manage_power_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log(this.nowEditData);
                        // return;
                        powerManage({
                            type: add == 1 ? 2 : 4,
                            // rId: this.nowEditData.rid,
                            pName: this.nowEditData.pname,
                            pId: this.nowEditData.pid,
                            pPater: this.nowEditData.ppater,
                            pSign: this.nowEditData.psign,
                            pLevel: this.nowEditData.plevel
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
                    this.levelOnePower = this.$store.getters.menuLevelOne;
                    // console.log(this.levelOnePower)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>