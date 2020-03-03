<template>
    <div class="useradmin-wtable bsbb">
        <!-- 搜索 -->
        <el-row class="search-wrap" :gutter="10">
            <el-divider content-position="left">搜索信息</el-divider>
            <el-col :span="6">
                <el-input size="small" placeholder="请输入内容" v-model="serachData.uname">
                    <template slot="prepend">姓名</template>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-input size="small" placeholder="请输入内容" v-model="serachData.uuserName">
                    <template slot="prepend">账号</template>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </el-col>
        </el-row>
        <el-row class="h100p table-parent-wrap">
            <!-- 操作按钮 -->
            <el-row class="handle-btn" :gutter="10">
                <el-col :span="18">
                    <el-button type="primary" size="small" @click="handleAddOrgan">添加组织</el-button>
                    <el-button type="primary" size="small" @click="handleEditOrgan">编辑组织</el-button>
                    <el-button type="danger" size="small" @click="handleDelOrgan">删除组织</el-button>
                    <el-button type="primary" size="small" @click="handleAddUser">添加用户</el-button>
                    <el-button type="danger" size="small" @click="handleDelMoreUser">删除用户</el-button>
                </el-col>
                <el-col :span="6"></el-col>
            </el-row>
            <el-row class="table-wrap">
                <!-- 用户表格 -->
                <el-table border :data="tableData" height="100%" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column align="center" type="selection" width="50"></el-table-column>
                    <el-table-column align="center" type="index" sortable label="ID" width="60"></el-table-column>
                    <el-table-column prop="uname" label="姓名" show-overflow-tooltip width="100"></el-table-column>
                    <el-table-column prop="uuserName" label="账号" show-overflow-tooltip></el-table-column>
                    <!-- <el-table-column prop="upassword" label="密码" show-overflow-tooltip></el-table-column> -->
                    <el-table-column label="角色" align="center" width="90">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini" @click="rolePower(scope.$index, scope.row)">授权</el-button>
                        </template>
                    </el-table-column>
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
                    <el-table-column label="设备" align="center" width="90">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini" @click="devicePower(scope.$index, scope.row)">授权</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="160">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleEditUser(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="handleDelUser(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination class="tac" background layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount" 
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :page-sizes="[2, 5, 10, 20, 30]"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"></el-pagination>
            </el-row>
        </el-row>
        <!-- 组织弹框 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogOrganVisible">
            <OrganEdit :editData="organEditData" @editClose="organEditClose" @updateData="getOrganInit"></OrganEdit>
        </el-dialog>
        <!-- 用户弹框 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogUserVisible">
            <UserEdit :editData="userEditData" @editClose="userEditClose" @updateData="getUserInit"></UserEdit>
        </el-dialog>
        <!-- 角色授权弹框 -->
        <el-dialog title="角色授权" :visible.sync="dialogRoleVisible">
            <RolePower :editData="roleEditData" @editClose="roleEditClose" @updateData="getUserInit"></RolePower>
        </el-dialog>
        <!-- 权限授权弹框 -->
        <el-dialog title="权限授权" :visible.sync="dialogPowerVisible">
            <PowerPower :editData="powerEditData" @editClose="powerEditClose" @updateData="getUserInit"></PowerPower>
        </el-dialog>
        <!-- 菜单栏授权弹框 -->
        <el-dialog title="菜单栏授权" :visible.sync="dialogMenuVisible">
            <MenuPower :editData="menuEditData" @editClose="menuEditClose" @updateData="getUserInit"></MenuPower>
        </el-dialog>
        <!-- 设备授权弹框 -->
        <el-dialog title="设备授权" :visible.sync="dialogDeviceVisible">
            <DevicePower :editData="deviceEditData" @editClose="deviceEditClose" @updateData="getUserInit"></DevicePower>
        </el-dialog>
    </div>
</template>

<script>
    import OrganEdit from './organEdit.vue'
    import UserEdit from './userEdit.vue'
    import RolePower from './rolePower.vue'
    import PowerPower from './powerPower.vue'
    import MenuPower from './menuPower.vue'
    import DevicePower from './devicePower.vue'
    import { structure, userManage, getDataByCompany, getUserLookData, getUserCompany } from '../../../../../api/spuerAdmin.js'
    export default {
        components: {
            OrganEdit, UserEdit, RolePower, PowerPower, MenuPower, DevicePower
        },
        props:{
            nowClick: {
                type: Object
            }
        },
        data() {
            return {
                // 搜索
                serachData: {},
                // 组织的添加、编辑
                organEditData: {},
                // 用户的添加、编辑
                userEditData: {},
                // 角色授权列表
                roleEditData: {},
                // 权限授权列表
                powerEditData: {},
                // 菜单栏授权列表
                menuEditData: {},
                // 设备授权列表
                deviceEditData: {},
                // 组织弹窗
                dialogOrganVisible: false,
                // 用户弹窗
                dialogUserVisible: false,
                // 角色弹窗
                dialogRoleVisible: false,
                // 权限弹窗
                dialogPowerVisible: false,
                // 菜单栏弹窗
                dialogMenuVisible: false,
                // 设备弹窗
                dialogDeviceVisible: false,
                // 用户表格
                tableData: [],
                // 总条数
                totalCount: 0,
                // 当前页
                currentPage: 1,
                // 每页页数
                pageSize: 10,
                // 多选用户
                deleteMoreUser: [],
                // 弹框标题
                dialogTitle: '编辑'
            }
        },
        created () {
            this.getInit(1);
        },
        watch: {
            nowClick: {
                // immediate: true,
                handler(newValue, oldValue) {
                    this.currentPage = 1;
                    this.serachData = {};
                    // console.log(newValue)
                    this.getInit(1, {
                        csId: newValue.csId
                    })
                }
            }
        },
        methods: {
            // 获取用户
            getInit(type, params = {}) {
                // this.dialogOrganVisible = false;
                userManage({
                    type: type,
                    csId: params.csId ,
                    uId: params.uId,
                    uName: params.uname,
                    uUserName: params.uuserName,
                    page: this.currentPage,
                    pageSize: this.pageSize
                }).then( res => {
                    if(res.code == 200){
                        this.tableData = res.data.userData;
                        this.totalCount = res.data.count;
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 搜索
            handleSearch(){
                // console.log(this.serachData);
                this.currentPage = 1;
                this.getInit(5, this.serachData);
            },
            // 分页切换
            handleCurrentChange(val){
                // console.log(val);
                this.currentPage = val;
                this.getUserInit();
            },
            handleSizeChange(val){
                this.currentPage = 1;
                this.pageSize = val;
                this.getUserInit();
            },
            // 更新组织
            getOrganInit(){
                this.$emit('updateOrgan');
            },
            // 更新用户
            getUserInit(){
                // console.log(this.nowClick);
                this.getInit(1, {
                    csId: this.nowClick.csId
                })
            },
            // 关闭组织弹窗
            organEditClose() {
                this.dialogOrganVisible = false;
                this.organEditData = {};
            },
            // 关闭用户弹窗
            userEditClose() {
                this.dialogUserVisible = false;
                this.userEditData = {};
            },
            // 添加组织
            handleAddOrgan(){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_organize';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.dialogTitle = '添加组织';
                this.dialogOrganVisible = true;
                this.organEditData = {
                    add: 1,
                    csId: '',
                    csName: '',
                    csLevel: '',
                    csPater: ''
                };
            },
            // 编辑组织
            handleEditOrgan(){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_organize';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(this.nowClick);
                if(!this.nowClick.csId){
                    this.$message.info('请选择组织');
                    return;
                }
                this.dialogTitle = '编辑组织';
                this.dialogOrganVisible = true;
                this.organEditData = this.nowClick;
            },
            // 删除组织
            handleDelOrgan(){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_organize';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(this.nowClick);
                if(!this.nowClick.csId){
                    this.$message.info('请选择要删除的项');
                    return;
                }
                this.$confirm('是否要删除【' + this.nowClick.csName + '】吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    structure({
                        type: 3,
                        csId: this.nowClick.csId
                    }).then(res => {
                        // console.log(res);
                        if(res.code == 200){
                            this.getOrganInit();
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
            // 添加用户
            handleAddUser(){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_user_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(this.nowClick);
                // if(!this.nowClick.csId){
                //     this.$message.info('请选择组织');
                //     return;
                // }
                this.dialogTitle = '添加用户';
                this.dialogUserVisible = true;
                this.userEditData = {
                    add: 1,
                    csId: '',
                    uname: '',
                    usex: '',
                    uuserName: '',
                    upassword: '',
                    uworkId: '',
                    usection: '',
                    uduty: '',
                    custId: ''
                };
            },
            // 编辑用户
            handleEditUser(index, row){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_user_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(row)
                this.dialogTitle = '编辑用户';
                this.dialogUserVisible = true;
                this.userEditData = row;
            },
            // 删除用户
            handleDelUser(index, row){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_user_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.delMoreUser(row.uid);
            },
            // 删除多个用户
            delMoreUser(uid){
                this.$confirm('是否要删除用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    userManage({
                        type: 4,
                        uId: uid
                    }).then(res => {
                        // console.log(res);
                        if(res.code == 200){
                            this.currentPage = 1;
                            this.getUserInit();
                            this.$message({type: 'success', message: '删除成功!'});
                            this.deleteMoreUser = [];
                        }else{
                            this.$message.error(res.msg);
                        }
                    }).catch( err => {
                        // console.log(err);
                        this.$message.error(err.message);
                    })
                }).catch(err => {
                    this.$message({type: 'info', message: '已取消删除!'});
                })
            },
            handleDelMoreUser(){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_user_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                if(this.deleteMoreUser.length == 0){
                    this.$message.info('请选择用户');
                    return;
                }
                this.delMoreUser(this.deleteMoreUser.join(','));
            },
            // 用户多选
            handleSelectionChange(val){
                // console.log(val);
                this.deleteMoreUser = [];
                [...val].forEach( (item, index) => {
                    this.deleteMoreUser.push(item.uid);
                });
                // console.log(this.deleteMoreUser.join(','));
            },
            // 角色授权
            rolePower(index, row){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_user_role';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.roleEditData = {};
                Promise.all([
                    getDataByCompany({
                        type: 5,
                        cId: this.$store.getters.cId
                    }),
                    getUserLookData({
                        type: 3,
                        uId: row.uid
                    })
                ]).then( res => {
                    // console.log(res);
                    if(res[0].code == 200 && res[1].code == 200){
                        this.roleEditData = {
                            allData: res[0].data.roles,
                            hasData: res[1].data.role,
                            row
                        };
                        this.dialogRoleVisible = true;
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
            // 权限授权
            powerPower(index, row){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_user_power';
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
                    getUserLookData({
                        type: 4,
                        uId: row.uid
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
                    return result == 'fun_menubar_manage_user_menubar';
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
                    getUserLookData({
                        type: 1,
                        uId: row.uid
                    })
                ]).then( res => {
                    // console.log(res);
                    if(res[0].code == 200 && res[1].code == 200){
                        this.menuEditData = {
                            allData: res[0].data.menubarData,
                            hasData: res[1].data.menubarData,
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
            // 设备授权
            devicePower(index, row){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_user_device';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                // console.log(this.nowClick);
                this.deviceEditData = {};
                Promise.all([
                    getDataByCompany({
                        type: 2,
                        cId: this.$store.getters.cId
                    }),
                    getUserLookData({
                        type: 2,
                        uId: row.uid
                    })
                ]).then( res => {
                    // console.log(res);
                    if(res[0].code == 200 && res[1].code == 200){
                        this.deviceEditData = {
                            allData: res[0].data.deviceScript,
                            hasData: res[1].data.deviceScript,
                            row
                        };
                        this.dialogDeviceVisible = true;
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
            // 关闭角色弹窗
            roleEditClose(){
                this.dialogRoleVisible = false;
                this.roleEditData = {};
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
            // 关闭设备弹窗
            deviceEditClose(){
                this.dialogDeviceVisible = false;
                this.deviceEditData = {};
            },
        },
    }
</script>

<style lang="scss" scoped>
    .useradmin-wtable {
        height: calc(100% - 10px);
        .search-wrap {
            border: 1px solid #DCDFE6;
            border-top: none;
            padding: 1rem 0;
            margin: 1rem 0!important;
            .el-divider--horizontal {
                margin-top: -1rem;
            }
        }
        .handle-btn {
            padding: 0.5rem;
            border: 1px solid #DCDFE6;
            border-bottom: none;
            margin: 0!important;
        }
        .table-parent-wrap {
            height: calc(100% - 170px);
            .table-wrap {
                height: calc(100% - 60px);
            }
            .tac {
                padding: 10px 0;
            }
        }
    }
</style>