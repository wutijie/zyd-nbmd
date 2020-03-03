<template>
    <div class="superAdmin-powerAdmin h100p">
        <el-row class="h100p">
            <el-row class="handle-btn" :gutter="10">
                <el-col :span="18">
                    <el-button type="primary" size="small" @click="handleAddPower">添加权限</el-button>
                </el-col>
                <el-col :span="6"></el-col>
            </el-row>
            <el-row class="power-tab-wrap">
                <el-table
                    :data="tableData"
                    style="width: 100%;"
                    height="100%"
                    row-key="porder"
                    border
                    default-expand-all
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    >
                    <el-table-column prop="pname" label="权限名称"></el-table-column>
                    <el-table-column align="center" label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button v-if="$store.getters.custId == 0" type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-row>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
            <Wedit :editData="editData" :roleList="roleList" @editClose="editClose" @updateData="getInit"></Wedit>
        </el-dialog>
    </div>
</template>

<script>
    import { powerManage, roleManage } from '../../../../api/spuerAdmin.js'
    import Wedit from './component/edit.vue'
    export default {
        components: {
            Wedit,
        },
        data() {
            return {
                dialogFormVisible: false,
                tableData: [],
                roleList: [],
                editData: {},
                dialogTitle: '编辑'
            }
        },
        created () {
            this.getInit();
            this.getRole();
        },
        methods: {
            handleChildren(children){
                if(children && children.length > 0){
                    children.forEach( (item, index) => {
                        if(item.children && item.children.length > 0){
                            this.handleChildren(item.children);
                        }else{
                            item.children = null;
                        }
                    })
                }else{
                    children = null;
                }
                return children;
            },
            // 获取权限列表
            getInit(){
                powerManage({
                    type: 1
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.tableData = res.data;
                        // console.log(this.tableData);
                        // let menuOne = [];
                        let menuOne = [ ...res.data ];
                        menuOne = this.handleChildren(menuOne);
                        this.$store.commit('admin/SET_MENULEVELONE', menuOne);
                        // this.$store.commit('admin/SET_MENULEVELTWO', menuTwo);
                        // console.log(menuOne);
                        // console.log(menuTwo);
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    // console.log(err);
                    this.$message.error(err.message);
                })
            },
            // 获取角色列表
            getRole(){
                roleManage({
                    type: 1
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.roleList = this.handleChildren(res.data);
                        // console.log(this.roleList)
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    // console.log(err);
                    this.$message.error(err.message);
                })
            },
            // 关闭弹框
            editClose(){
                this.dialogTitle = '';
                this.dialogFormVisible = false;
                this.editData = {};
                // console.log(this.editData);
            },
            // 点击编辑
            handleEdit(index, row){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_platform_manage_power_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.dialogTitle = '编辑权限';
                this.dialogFormVisible = true;
                this.editData = row;
            },
            // 点击删除
            handleDelete(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_platform_manage_power_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.$confirm('是否要删除该权限?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    powerManage({
                        type: 3,
                        pId: row.pid
                    }).then(res => {
                        // console.log(res);
                        if(res.code == 200){
                            this.getInit();
                            this.$message({type: 'success', message: '删除成功!'});
                        }
                    }).catch( err => {
                        // console.log(err);
                        this.$message.error(err.message);
                    })
                }).catch(err => {
                    this.$message({type: 'info', message: '已取消删除!'});
                })
            },
            // 添加权限
            handleAddPower(){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_platform_manage_power_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.dialogTitle = '添加权限';
                this.dialogFormVisible = true;
                this.editData = {
                    add: 1,
                    rid: '',
                    pname: '',
                    porder: '',
                    ppater: 0,
                    psign: '',
                    plevel: 1
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .superAdmin-powerAdmin {
        padding-left: 0.3rem;
        .power-tab-wrap {
            height: calc(100% - 60px);
        }
        .handle-btn {
            padding: 0.5rem;
            border: 1px solid #DCDFE6;
            border-bottom: none;
            margin: 0!important;
        }
    }
</style>