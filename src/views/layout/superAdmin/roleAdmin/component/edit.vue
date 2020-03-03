<template>
    <div>
        <el-form ref="roleEdit" label-width="80px" :model="nowEditData">
            <!-- <el-form-item label="角色等级">
                <el-select v-model="nowEditData.rlevel" @change="handleChange" :disabled="!nowEditData.add && nowEditData.level == 0" placeholder="请选择">
                    <el-option label="一级角色" :value="1000"></el-option>
                    <el-option label="二级角色" :value="1001"></el-option>
                    <el-option label="三级角色" :value="1002"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="nowEditData.rlevel == 1001" label="父级菜单">
                <el-select v-model="nowEditData.rpater" placeholder="请选择">
                    <el-option v-for="(item, index) in levelOneMenu" :key="index" :label="item.rname" :value="item.rid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else-if="nowEditData.rlevel == 1002" label="父级菜单">
                <el-select v-model="nowEditData.rpater" placeholder="请选择">
                    <el-option v-for="(item, index) in levelTwoMenu" :key="index" :label="item.rname" :value="item.rid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="角色名称">
                <el-input v-model="nowEditData.rname"></el-input>
            </el-form-item>
            <el-form-item label="上级角色">
                <el-cascader
                        v-model="nowEditData.rpater"
                        ref="sysMenu"
                        :options="levelOneMenu"
                        :clearable="true"
                        :props="{
                            emitPath: false,
                            checkStrictly: true,
                            expandTrigger: 'hover',
                            value: 'rid',
                            label: 'rname'
                        }"
                        placeholder="添加一级角色时不选"
                        style="width: 100%;"
                        @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('roleEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { roleManage } from '../../../../../api/spuerAdmin.js'
    export default {
        props: {
            editData: {
                type: Object,
            }
        },
        data() {
            return {
                nowEditData: this.editData,
                levelOneMenu: this.$store.getters.menuLevelOne,
                levelTwoMenu: this.$store.getters.menuLevelTwo,
                btnMsg: ''
            }
        },
        methods: {
            // handleChange(){
            //     // this.nowEditData.rpater = '';
            //     // console.log(this.nowEditData)
            //     this.$set(this.nowEditData, 'rpater', '');
            // },
            handleChange(val){
                // console.log(val);
                // console.log(this.$refs.sysUserOrgan.getCheckedNodes())
                this.nowEditData.rlevel = val ? ( +this.$refs.sysMenu.getCheckedNodes()[0].level + 1001) : 1001;
                // console.log(this.nowEditData.rlevel)
            },
            submitForm(formName, add) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_role_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.nowEditData);
                        // return;
                        // this.nowEditData.rname = this.nowEditData.rname.split('(')[0];
                        roleManage({
                            type: add == 1 ? 2 : 3,
                            rId: this.nowEditData.rid,
                            rName: this.nowEditData.rname,
                            rLevel: this.nowEditData.rlevel,
                            rPater: this.nowEditData.rlevel == 1001 ? 0 : this.nowEditData.rpater
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
                    this.levelOneMenu = this.$store.getters.menuLevelOne;
                    // console.log(this.levelOneMenu)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>