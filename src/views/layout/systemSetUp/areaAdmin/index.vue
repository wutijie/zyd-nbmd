<template>
    <div class="systemSetUp-areaAdmin h100p">
        <el-row class="h100p">
            <el-row class="handle-btn" :gutter="10">
                <el-col :span="18">
                    <el-button type="primary" size="small" @click="handleAddArea">添加区域</el-button>
                </el-col>
                <el-col :span="6"></el-col>
            </el-row>
            <el-row class="device-layout-tab-wrap h100p">
                <el-table
                    :data="tableData"
                    style="width: 100%;"
                    class="h100p"
                    border
                    >
                    <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" prop="daName" label="区域名称" width="200"></el-table-column>
                    <el-table-column align="center" prop="daRow" label="区域所在行" width="200"></el-table-column>
                    <el-table-column align="center" prop="daLine" label="区域所在列" width="200"></el-table-column>
                    <el-table-column align="center" label="操作" min-width="260">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            <el-button type="warning" size="mini" @click="handleDevice(scope.$index, scope.row)">设置设备</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <!-- <div class="area-warp">
                <div class="box" v-for="(item, index) in distributionData" :key="index">
                    <div class="item" v-for="(item2, index2) in item" :key="index2">
                        <p>{{ item2.name }}</p>
                        <div class="box" v-for="(item3, index3) in item2.children" :key="index3">
                            <div class="item" v-for="(item4, index4) in item3" :key="index4">{{ item4.value }}</div>
                        </div>
                    </div>
                </div>
            </div> -->
        </el-row>
        <!-- 添加、编辑区域 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogAreaVisible">
            <AreaEdit :editData="editDataArea"  @editClose="editCloseArea" @updateData="getInit"></AreaEdit>
        </el-dialog>
        <!-- 编辑区域设备 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogAreaDeviceVisible">
            <DeviceAreaEdit :editData="editDataAreaDevice"  @editClose="editCloseAreaDevice" @updateData="getInit"></DeviceAreaEdit>
        </el-dialog>
    </div>
</template>

<script>
    import { getDeviceArea, manageDeviceArea, getDeviceDistribution } from '../../../../api/deviceMenu.js'
    import { getCompanyData } from '../../../../api/spuerAdmin.js'
    import AreaEdit from './component/areaEdit.vue'
    import DeviceAreaEdit from './component/deviceAreaEdit.vue'
    export default {
        components: {
            AreaEdit, DeviceAreaEdit
        },
        data() {
            return {
                tableData: [],
                dialogAreaVisible: false,
                editDataArea: {},
                dialogAreaDeviceVisible: false,
                editDataAreaDevice: {},
                dialogTitle: '',
                deviceSelectData: [],
                distributionData: {}
            }
        },
        created () {
            this.getInit();
            this.getDeviceSelect();
            // this.getDeviceDistribution();
        },
        methods: {
            getInit() {
                getDeviceArea().then( res => {
                    console.log(res);
                    if(res.code == 200){
                        this.tableData = res.data.deviceAreaData;
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
                // this.getDeviceDistribution();
            },
            // 获取设备
            getDeviceSelect() {
                getCompanyData({type: 1}).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.deviceSelectData = res.data.deviceDatas;
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 添加区域
            handleAddArea() {
                this.dialogTitle = '添加区域';
                this.editDataArea = {
                    add: 1
                }
                this.dialogAreaVisible = true;
            },
            // 编辑区域
            handleEdit(index, row) {
                console.log(index, row);
                this.dialogTitle = '编辑区域';
                this.editDataArea = {
                    ...row
                }
                this.dialogAreaVisible = true;
            },
            // 删除区域
            handleDelete(index, row) {
                // console.log(index, row);
                this.$confirm('是否要删除该区域?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    manageDeviceArea({
                        type: 3,
                        daId: row.daId
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
            // 关闭区域弹窗
            editCloseArea() {
                this.dialogTitle = '';
                this.editDataArea = {};
                this.dialogAreaVisible = false;
            },
            // 设置设备
            handleDevice(index, row) {
                console.log(index, row);
                this.dialogTitle = '设置 ' + row.daName + ' 设备分布';
                let templateData;
                if(row.daContent && row.daContent.slice(0, 1) == "{"){
                    templateData = JSON.parse(row.daContent);
                }else{
                    templateData = {
                        0: [
                            { type: 'select', value: '' },
                            { type: 'select', value: '' },
                            { type: 'select', value: '' },
                            { type: 'select', value: '' }
                        ],
                        1: [
                            { type: 'select', value: '' },
                            { type: 'select', value: '' },
                            { type: 'select', value: '' },
                            { type: 'select', value: '' }
                        ]
                    }
                }
                this.editDataAreaDevice = {
                    deviceSelectData: this.deviceSelectData,
                    nowRow: row,
                    templateData
                };
                this.dialogAreaDeviceVisible = true;
            },
            // 关闭区域设备弹窗
            editCloseAreaDevice() {
                this.dialogTitle = '';
                this.editDataAreaDevice = {};
                this.dialogAreaDeviceVisible = false;
            },
            // 获取分布图数据
            getDeviceDistribution() {
                getDeviceDistribution().then( res => {
                    console.log(res);
                    if(res.code == 200){
                        this.distributionData = res.data;
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .systemSetUp-areaAdmin {
        padding-left: 0.3rem;
        .device-layout-tab-wrap {
            height: calc(100% - 60px);
        }
        .handle-btn {
            padding: 0.5rem;
            border: 1px solid #DCDFE6;
            border-bottom: none;
            margin: 0!important;
        }
        .area-warp {
            margin-top: 1rem;
            >.box {
                >.item {
                    border: 1px solid #d1d1d1;
                    padding: 1rem;
                    >p {
                        text-align: center;
                        padding: 0 0 1rem;
                    }
                    >.box {
                        >.item {
                            border: 1px solid #d1d1d1;
                            font-size: 0.8rem;
                            padding: 1rem 0.5rem;
                        }
                    }
                }
            }
        }
    }
</style>