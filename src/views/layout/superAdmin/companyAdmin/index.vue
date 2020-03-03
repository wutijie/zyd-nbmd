<template>
    <div class="superAdmin-companyAdmin h100p">
        <el-row class="h100p">
            <el-row class="handle-btn" :gutter="10">
                <el-col :span="18">
                    <el-button type="primary" size="small" @click="handleAddCompany">添加企业</el-button>
                </el-col>
                <el-col :span="6"></el-col>
            </el-row>
            <el-row class="company-tab-wrap">
                <el-table
                    :data="tableData"
                    style="width: 100%;"
                    height="100%"
                    border
                    >
                    <el-table-column align="center" type="index" sortable label="ID" width="70"></el-table-column>
                    <el-table-column prop="cname" label="企业名称" width="200"></el-table-column>
                    <el-table-column prop="cshortName" label="企业简称" width="200"></el-table-column>
                    <el-table-column prop="uname" label="联系人"></el-table-column>
                    <el-table-column prop="uuserName" label="联系电话" width="150"></el-table-column>
                    <el-table-column label="用户列表" align="center" width="100">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini" @click="seeUser(scope.$index, scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="设备列表" align="center" width="100">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini" @click="seeDevice(scope.$index, scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="产线列表" align="center" width="100">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini" @click="seeLine(scope.$index, scope.row)">查看</el-button>
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
        <!-- 添加、编辑企业弹框 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
            <Wedit :editData="editData"  @editClose="editClose" @updateData="getInit"></Wedit>
        </el-dialog>
        <el-dialog title="用户列表" width="80%" :visible.sync="dialogUserVisible">
            <UserTab :tabList="userTabList"></UserTab>
        </el-dialog>
        <el-dialog title="设备列表" width="80%" :visible.sync="dialogDeviceVisible">
            <DeviceTab :tabList="deviceTabList"></DeviceTab>
        </el-dialog>
        <el-dialog title="产线列表" :visible.sync="dialogLineVisible">
            <LineTab :tabList="lineTabList"></LineTab>
        </el-dialog>
    </div>
</template>

<script>
    import { getCompanys, deleteCompany, getDataByCompany } from '../../../../api/spuerAdmin.js'
    import Wedit from './component/edit.vue'
    import UserTab from './component/userTab.vue'
    import DeviceTab from './component/deviceTab.vue'
    import LineTab from './component/lineTab.vue'
    export default {
        components: {
            Wedit, UserTab, DeviceTab, LineTab
        },
        data() {
            return {
                dialogFormVisible: false,
                dialogUserVisible: false,
                dialogDeviceVisible: false,
                dialogLineVisible: false,
                tableData: [],
                userTabList: [],
                deviceTabList: [],
                lineTabList: [],
                editData: {},
                dialogTitle: '编辑'
            }
        },
        created () {
            this.getInit();
        },
        methods: {
            // 获取列表
            getInit(){
                getCompanys().then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.tableData = res.data.companysData;
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
                this.dialogFormVisible = false;
                this.editData = {};
                // console.log(this.editData)
            },
            // 点击编辑
            handleEdit(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_platform_manage_company_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.dialogTitle = '编辑企业';
                this.dialogFormVisible = true;
                this.editData = row;
            },
            // 点击删除
            handleDelete(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_platform_manage_company_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.$confirm('是否要删除该企业?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    deleteCompany({
                        cIds: row.cid
                    }).then(res => {
                        // console.log(res);
                        if(res.code == 200){
                            this.getInit();
                            this.$message({type: 'success', message: '删除成功!'});
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
            // 添加企业
            handleAddCompany(){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_platform_manage_company_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.dialogTitle = '添加企业';
                this.dialogFormVisible = true;
                this.editData = {
                    add: 1,
                    cimage: '',
                    cname: '',
                    cshortName: '',
                    custId: '',
                    uid: '',
                    uname: '',
                    uuserName: ''
                }
            },
            // 查看用户列表
            seeUser(index, row){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_platform_manage_company_user_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.userTabList = [];
                getDataByCompany({
                    type: 1,
                    cId: row.cid
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.userTabList = res.data.userData;
                        this.dialogUserVisible = true;
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 查看设备列表
            seeDevice(index, row){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_platform_manage_company_device_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.deviceTabList = [];
                getDataByCompany({
                    type: 2,
                    cId: row.cid
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.deviceTabList = res.data.deviceScript;
                        this.dialogDeviceVisible = true;
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 查看产线列表
            seeLine(index, row){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_platform_manage_company_production_line_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.lineTabList = [];
                getDataByCompany({
                    type: 3,
                    cId: row.cid
                }).then( res => {
                    console.log(res);
                    if(res.code == 200){
                        this.lineTabList = res.data.productionLineData;
                        this.dialogLineVisible = true;
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .superAdmin-companyAdmin {
        padding-left: 0.3rem;
        .company-tab-wrap {
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