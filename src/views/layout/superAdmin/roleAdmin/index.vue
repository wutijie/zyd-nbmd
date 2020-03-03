<template>
    <div class="superAdmin-roleAdmin h100p">
        <el-row class="h100p">
            <el-row class="handle-btn" :gutter="10">
                <el-col :span="18">
                    <el-button type="primary" size="small" @click="handleAddRole">添加角色</el-button>
                </el-col>
                <el-col :span="6"></el-col>
            </el-row>
            <el-row class="role-tab-wrap">
                <el-table
                    :data="tableData"
                    style="width: 100%;"
                    height="100%"
                    row-key="rorder"
                    border
                    default-expand-all
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    >
                    <el-table-column prop="rname" label="角色名称"></el-table-column>
                    <el-table-column label="权限" align="center" width="90">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini" @click="powerPower(scope.$index, scope.row)">授权</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="菜单栏" align="center" width="90">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini" @click="menuPower(scope.$index, scope.row)">授权</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-row>
        <!-- 角色添加、编辑 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
            <Wedit :editData="editData"  @editClose="editClose" @updateData="getInit"></Wedit>
        </el-dialog>
        <!-- 权限授权弹框 -->
        <el-dialog title="权限授权" :visible.sync="dialogPowerVisible">
            <PowerPower :editData="powerEditData" @editClose="powerEditClose" @updateData="getInit"></PowerPower>
        </el-dialog>
        <!-- 菜单栏授权弹框 -->
        <el-dialog title="菜单栏授权" :visible.sync="dialogMenuVisible">
            <MenuPower :editData="menuEditData" @editClose="menuEditClose" @updateData="getInit"></MenuPower>
        </el-dialog>
    </div>
</template>

<script>
    import { roleManage, powerManage, getDataByCompany, userGetMenubarRole, userGetRolePowers } from '../../../../api/spuerAdmin.js'
    import Wedit from './component/edit.vue'
    import PowerPower from './component/powerPower.vue'
    import MenuPower from './component/menuPower.vue'
    export default {
        components: {
            Wedit, PowerPower, MenuPower
        },
        data() {
            return {
                dialogFormVisible: false,
                tableData: [],
                powerList: [],
                editData: {},
                dialogTitle: '编辑',
                // 权限授权列表
                powerEditData: {},
                // 菜单栏授权列表
                menuEditData: {},
                // 权限弹窗
                dialogPowerVisible: false,
                // 菜单栏弹窗
                dialogMenuVisible: false,
            }
        },
        created () {
            this.getInit();
            this.getPower();
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
            // 获取角色列表
            getInit(){
                roleManage({
                    type: 1
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.tableData = res.data;
                        // let menuOne = [];
                        // let menuTwo = [];
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
            // 获取权限列表
            getPower(){
                powerManage({
                    type: 1
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.powerList = res.data;
                        // this.$store.commit('admin/SET_POWERLISTS', res.data);
                    }else{
                        // this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 关闭弹框
            editClose(){
                this.dialogTitle = '';
                this.dialogFormVisible = false;
                this.editData = {};
                // console.log(this.editData)
            },
            // 点击编辑
            handleEdit(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_role_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.dialogTitle = '编辑角色';
                this.dialogFormVisible = true;
                this.editData = row;
            },
            // 点击删除
            handleDelete(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_role_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.$confirm('是否要删除该角色?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    roleManage({
                        type: 4,
                        rId: row.rid
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
            // 添加角色
            handleAddRole(){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_role_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.dialogTitle = '添加角色';
                this.dialogFormVisible = true;
                this.editData = {
                    add: 1,
                    custId: '',
                    rid: '',
                    rlevel: 1001,
                    rname: '',
                    rorder: '',
                    rpater: 0
                }
            },
            // 权限授权
            powerPower(index, row){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_role_power';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.powerEditData = {};
                Promise.all([
                    getDataByCompany({
                        type: 6,
                        cId: this.$store.getters.cId
                    }),
                    userGetRolePowers({
                        rId: row.rid
                    })
                ]).then( res => {
                    // console.log(res);
                    if(res[0].code == 200 && res[1].code == 200){
                        this.powerEditData = {
                            allData: res[0].data.powers,
                            hasData: res[1].data.powers,
                            row
                        };
                        this.dialogPowerVisible = true;
                    }else{
                        if(res[0].code != 200){
                            this.$message.error(res[0].msg);
                        }
                        if(res[1].code != 200){
                            this.$message.error(res[1].msg);
                        }
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 菜单栏授权
            menuPower(index, row){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_role_menubar';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.menuEditData = {};
                Promise.all([
                    getDataByCompany({
                        type: 4,
                        cId: this.$store.getters.cId
                    }),
                    userGetMenubarRole({
                        rId: row.rid
                    })
                ]).then( res => {
                    // console.log(res);
                    if(res[0].code == 200 && res[1].code == 200){
                        this.menuEditData = {
                            allData: res[0].data.menubarData,
                            hasData: res[1].data,
                            row
                        };
                        this.dialogMenuVisible = true;
                    }else{
                        if(res[0].code != 200){
                            this.$message.error(res[0].msg);
                        }
                        if(res[1].code != 200){
                            this.$message.error(res[1].msg);
                        }
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 关闭权限弹窗
            powerEditClose(){
                this.dialogPowerVisible = false;
                this.powerEditData = {};
            },
            // 关闭菜单栏弹窗
            menuEditClose(){
                this.dialogMenuVisible = false;
                this.menuEditData = {};
            },
        }
    }
</script>

<style lang="scss" scoped>
    .superAdmin-roleAdmin {
        padding-left: 0.3rem;
        .role-tab-wrap {
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