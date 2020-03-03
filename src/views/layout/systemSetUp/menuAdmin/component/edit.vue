<template>
    <div>
        <el-form ref="menuEdit" label-width="80px" :model="nowEditData">
            <!-- <el-form-item label="菜单等级">
                <el-select v-model="nowEditData.level" @change="handleChange" :disabled="!nowEditData.add && nowEditData.level == 0" placeholder="请选择">
                    <el-option label="一级菜单" :value="0"></el-option>
                    <el-option label="二级菜单" :value="1"></el-option>
                    <el-option label="三级菜单" :value="2"></el-option>
                </el-select>
            </el-form-item> -->
            <!-- <el-form-item v-if="nowEditData.level == 1" label="父级菜单" prop="oneTitle">
                <el-select v-model="nowEditData.pater" placeholder="请选择">
                    <el-option v-for="(item, index) in levelOneMenu" :key="index" :label="item.title" :value="item.mid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else-if="nowEditData.level == 2" label="父级菜单" prop="twoTitle">
                <el-select v-model="nowEditData.pater" placeholder="请选择">
                    <el-option v-for="(item, index) in levelTwoMenu" :key="index" :label="item.title" :value="item.mid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="菜单名称">
                <el-input v-model="nowEditData.title"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单">
                <!-- <el-input v-if="levelOneMenu.length == 0" v-model="nowEditData.level" :disabled="true"></el-input> -->
                <el-cascader
                    v-model="nowEditData.pater"
                    ref="sysMenu"
                    :options="levelOneMenu"
                    :clearable="true"
                    :props="{
                        emitPath: false,
                        checkStrictly: true,
                        expandTrigger: 'hover',
                        value: 'mid',
                        label: 'title'
                    }"
                    placeholder="添加一级菜单时不选"
                    style="width: 100%;"
                    @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="菜单标识">
                <el-input v-model="nowEditData.name"></el-input>
            </el-form-item>
            <el-form-item label="组件名称">
                <el-input v-model="nowEditData.components"></el-input>
            </el-form-item>
            <el-form-item label="路径">
                <el-input v-model="nowEditData.path"></el-input>
            </el-form-item>
            <el-form-item label="链接">
                <el-input v-model="nowEditData.iframeSrc"></el-input>
            </el-form-item>
            <el-form-item v-if="!nowEditData.level || nowEditData.level == 0" label="图标">
                <el-input v-model="nowEditData.iconClass"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('menuEdit', nowEditData.add)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { menubar } from '../../../../../api/spuerAdmin.js'
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
            handleChange(val){
                // console.log(val);
                // console.log(this.$refs.sysUserOrgan.getCheckedNodes())
                this.nowEditData.level = val ? this.$refs.sysMenu.getCheckedNodes()[0].level : 0;
                this.$set(this.nowEditData, 'iconClass', '');
            },
            // handleChange(){
            //     // this.nowEditData.pater = '';
            //     this.$set(this.nowEditData, 'pater', '');
            // },
            submitForm(formName, add) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_menubar_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log(this.nowEditData);
                        // return;
                        menubar({
                            type: add == 1 ? 1 : 2,
                            mid: this.nowEditData.mid,
                            level: this.nowEditData.level,
                            pater: this.nowEditData.level == 0 ? 0 : this.nowEditData.pater,
                            path: this.nowEditData.path,
                            name: this.nowEditData.name,
                            title: this.nowEditData.title,
                            iframeSrc: this.nowEditData.iframeSrc,
                            iconClass: this.nowEditData.iconClass,
                            components: this.nowEditData.components
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
                    this.levelTwoMenu = this.$store.getters.menuLevelTwo;
                    
                    this.levelOneMenu = this.$store.getters.menuLevelOne;
                    // console.log(this.nowEditData)
                    // console.log(this.levelOneMenu)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>