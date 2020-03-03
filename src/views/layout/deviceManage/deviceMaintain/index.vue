<template>
    <div class="deviceManage-deviceMaintain h100p">
        <el-row class="h100p">
            <el-row class="handle-btn" :gutter="10">
                <el-col :span="6">
                    <el-button type="danger" size="small" @click="handleAdd">新增</el-button>
                    <!-- <el-button type="primary" size="small" icon="el-icon-refresh-left" @click="getInit"></el-button> -->
                    <el-button type="primary" size="small" @click="handleExport">导出</el-button>
                </el-col>
                <!-- <el-col :span="3">
                    <el-select v-model="maintainType" size="small" @change="handletype" class="w100p">
                        <el-option label="保养列表" :value="1"></el-option>
                        <el-option label="指定保养" :value="2"></el-option>
                        <el-option label="周期保养" :value="3"></el-option>
                    </el-select>
                </el-col> -->
                <el-col :span="8">
                    <el-date-picker
                        v-model="searchData.time"
                        type="daterange"
                        size="small"
                        style="width: 100%;"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="searchData.searchtype" size="small" placeholder="工单状态" @change="handleSearchType" class="w100p">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="保养状态" value="mr_status"></el-option>
                        <el-option label="保养工单号" value="mr_maintain_planOrder"></el-option>
                        <el-option label="保养计划号" value="mr_planno"></el-option>
                        <el-option label="设备编号" value="d_number"></el-option>
                        <el-option label="设备名称" value="d_name"></el-option>
                        <el-option label="保养级别" value="mr_genre"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-if="searchData.searchtype == 'mr_status'" v-model="searchData.searchvalue" size="small" placeholder="工单状态" class="w100p">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="未开始" value="1"></el-option>
                        <el-option label="执行中" value="2"></el-option>
                        <el-option label="已完成" value="3"></el-option>
                        <el-option label="保养提醒" value="4"></el-option>
                    </el-select>
                    <el-select v-else-if="searchData.searchtype == 'mr_genre'" v-model="searchData.searchvalue" size="small" placeholder="工单状态" class="w100p">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="周期保养" value="1"></el-option>
                        <el-option label="指定保养" value="2"></el-option>
                    </el-select>
                    <el-input v-else v-model="searchData.searchvalue" size="small" placeholder="请输入关键词"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
                </el-col>
            </el-row>
            <el-row class="device-maintain-tab-wrap">
                <!-- 保养列表 -->
                <el-table id="out-device-maintain" v-show="maintainType == 1" :data="tableData" style="width: 100%;" height="100%" border :cell-class-name="tableRowClassName">
                    <el-table-column fixed="left" align="center" type="index" label="序号" width="60"></el-table-column>
                    <el-table-column fixed="left" align="center" prop="mr_status" label="状态" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="mr_maintain_planOrder" label="保养工单号" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" label="保养计划号" width="220" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button size="mini" v-if="scope.row.mr_genre == '指定保养'" class="w100p" type="" @click="handleEdit(scope.$index, scope.row, 2)">{{ scope.row.mr_planno }}</el-button>
                            <el-button size="mini" v-else class="w100p" type="" @click="handleEdit(scope.$index, scope.row, 3)">{{ scope.row.mr_planno }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="d_number" label="设备编号" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="d_name" label="设备名称" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="mr_genre" label="保养级别" width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="mr_planBeginTime" label="计划保养时间" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="mr_planEndTime" label="计划结束时间" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="mr_beginTime" label="保养开始时间" width="200" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.mr_beginTime == '' || scope.row.mr_beginTime == null" @click="handleMaintainTime(scope.$index, scope.row, 1)" size="mini" type="warning">开始</el-button>
                            <span v-else>{{ scope.row.mr_beginTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="mr_beginSource" label="开始来源" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="mr_endTime" label="保养结束时间" width="200" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.mr_endTime == '' || scope.row.mr_endTime == null" @click="handleMaintainTime(scope.$index, scope.row, 2)" size="mini" type="warning">结束</el-button>
                            <span v-else>{{ scope.row.mr_endTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="mr_endSource" label="结束来源" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" label="操作" min-width="200">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.mr_status != '已完成'" type="primary" size="mini" @click="handleEditMaintain(scope.$index, scope.row, 2)">编辑</el-button>
                            <el-button type="warning" size="mini" @click="handleSeeMaintain(scope.$index, scope.row, 2)">详细</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 指定保养 -->
                <el-table v-show="maintainType == 2" :data="tableDataAssgin" style="width: 100%;" height="100%" border :cell-class-name="tableRowClassName">
                    <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
                    <el-table-column align="center" prop="ma_mamaintain_planName" label="保养编号" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="ma_assgindate" label="计划时间" min-width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row, 2)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 周期保养 -->
                <el-table v-show="maintainType == 3" :data="tableDataCycle" style="width: 100%;" height="100%" border :cell-class-name="tableRowClassName">
                    <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
                    <el-table-column align="center" prop="mp_maintain_planName" label="保养编号" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="mp_interval" label="间隔" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="mp_unit" label="单位" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="mp_definite" label="周期" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="mp_count" label="次数" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" label="操作" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row, 3)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-row class="tal">
                    <el-col :span="14">
                        <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                            :total="totalCount" 
                            :current-page="currentPage"
                            :page-size="pageSize"
                            :page-sizes="[2, 5, 10, 20, 30]"
                            :pager-count="5"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"></el-pagination>
                    </el-col>
                    <el-col :span="10">
                        <el-button-group>
                            <el-button class="no-start-btn" type="primary" size="mini">未开始</el-button>
                            <el-button class="runing-btn" type="primary" size="mini">执行中</el-button>
                            <el-button class="finished-btn" type="primary" size="mini">已完成</el-button>
                            <el-button class="overdue-btn" type="primary" size="mini">保养提醒</el-button>
                        </el-button-group>
                    </el-col>
                </el-row>
            </el-row>
        </el-row>
        <!-- 添加、编辑保养 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogAddVisible" width="60%">
            <MaintainEdit :editData="editDataAdd"  @editClose="editCloseAdd" @updateData="getInit"></MaintainEdit>
        </el-dialog>
        <!-- 编辑、查看默认保养 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogNormalVisible" width="60%">
            <NormalMaintainEdit :editData="editDataNormal"  @editClose="editCloseNormal" @updateData="getInit"></NormalMaintainEdit>
        </el-dialog>
    </div>
</template>

<script>
    import { getDeviceMaintainRecord, getDeviceMaintainRecordStartEnd, getDeviceCycleMaintain, getDeviceAssginMaintain } from '../../../../api/deviceManage.js'
    import MaintainEdit from './component/maintainEdit.vue'
    import NormalMaintainEdit from './component/normalMaintainEdit.vue'
    export default {
        components: {
            MaintainEdit, NormalMaintainEdit
        },
        data() {
            return {
                maintainType: 1,
                // 搜索
                searchData: {
                    time: [],
                    searchvalue: '',
                    searchtype: ''
                },
                // 列表
                tableData: [],
                tableDataAssgin: [],
                tableDataCycle: [],
                // 总条数
                totalCount: 0,
                // 当前页
                currentPage: 1,
                // 每页页数
                pageSize: 10,
                dialogTitle: '',
                dialogAddVisible: false,
                dialogContentVisible: false,
                dialogNormalVisible: false,
                editDataAdd: {},
                editDataContent: {},
                editDataNormal: {},
                selectData: {},
                clickPlanno: ''
            }
        },
        created () {
            this.getInit();
        },
        methods: {
            getInit(type) {
                getDeviceMaintainRecord({
                    page: this.currentPage,
                    row: this.pageSize,
                    begintime: this.searchData.time && this.searchData.time[0] ? this.searchData.time[0] : '',
                    endtime: this.searchData.time && this.searchData.time[1] ? this.searchData.time[1] : '',
                    searchtype: this.searchData.searchtype,
                    searchvalue: this.searchData.searchvalue
                }).then( res => {
                    console.log(res);
                    if(res.code == 200){
                        res.data.MaintainRecord.forEach( (item, index) => {
                            item.mr_beginTime = item.mr_beginTime ? this.$handleTime(item.mr_beginTime) : item.mr_beginTime;
                            item.mr_endTime = item.mr_endTime ? this.$handleTime(item.mr_endTime) : item.mr_endTime;
                            item.mr_planBeginTime = item.mr_planBeginTime ? this.$handleTime(item.mr_planBeginTime) : item.mr_planBeginTime;
                            item.mr_planEndTime = item.mr_planEndTime ? this.$handleTime(item.mr_planEndTime) : item.mr_planEndTime;
                        })
                        this.tableData = res.data.MaintainRecord;
                        this.totalCount = res.count;
                        this.selectData = {
                            deviceSelect: res.data.DeviceSelect,
                            assginTemplateSelect: res.data.AssginTemplateSelect,
                            cycleTemplateSelect: res.data.CycleTemplateSelect
                        };
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
                if(type == 2){
                    this.getAssginMaintain();
                }else if(type == 3){
                    this.getCycleMaintain();
                }
            },
            // 新增
            handleAdd() {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_device_manage_maintain_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.dialogTitle = '添加保养';
                this.editDataAdd = {
                    hasSelect: this.selectData,
                    editData: {
                        add: 1,
                        dids: []
                    }
                };
                this.dialogAddVisible = true;
            },
            // 编辑
            handleEdit(index, row, type) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_device_manage_maintain_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                console.log(index, row, type);
                // console.log(this.selectData);
                if(type == 2){
                    getDeviceAssginMaintain({
                        planno: row.mr_planno
                    }).then( res => {
                        console.log(res);
                        let nowRow = {};
                        if(res.code == 200){
                            nowRow = res.data[0];
                        }
                        this.dialogTitle = '指定保养';
                        this.editDataAdd = {
                            hasSelect: this.selectData,
                            type,
                            editData: {
                                add: 4,
                                ...nowRow
                            }
                        };
                        this.dialogAddVisible = true;
                    }).catch( err => {
                        this.$message.error(err.message);
                    })
                }else{
                    getDeviceCycleMaintain({
                        planno: row.mr_planno
                    }).then( res => {
                        console.log(res);
                        let nowRow = {};
                        if(res.code == 200){
                            nowRow = res.data[0];
                        }
                        this.dialogTitle = '周期保养';
                        this.editDataAdd = {
                            hasSelect: this.selectData,
                            type,
                            editData: {
                                add: 4,
                                ...nowRow
                            }
                        };
                        this.dialogAddVisible = true;
                    }).catch( err => {
                        this.$message.error(err.message);
                    })
                }
            },
            // 编辑默认列表
            handleEditMaintain(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_device_manage_maintain_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.dialogTitle = '编辑保养';
                let templateData;
                if(row.mr_content && row.mr_content.slice(0, 1) == "{"){
                    templateData = JSON.parse(row.mr_content);
                }else{
                    templateData = {
                        0: [
                            { type: 'text', value: row.mr_content }
                        ]
                    }
                }
                this.editDataNormal = {
                    add: 1,
                    templateData,
                    nowRow: row
                };
                this.dialogNormalVisible = true;
            },
            // 查看默认列表
            handleSeeMaintain(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_device_manage_maintain_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.dialogTitle = '查看保养';
                let templateData;
                if(row.mr_content && row.mr_content.slice(0, 1) == "{"){
                    templateData = JSON.parse(row.mr_content);
                }else{
                    templateData = {
                        0: [
                            { type: 'text', value: row.mr_content }
                        ]
                    }
                }
                this.editDataNormal = {
                    add: 4,
                    templateData,
                    nowRow: row
                };
                this.dialogNormalVisible = true;
            },
            // 关闭添加弹窗
            editCloseAdd() {
                this.dialogAddVisible = false;
                this.dialogTitle = '';
                // this.editDataAdd = {};
            },
            // 关闭默认保养弹窗
            editCloseNormal() {
                this.dialogTitle = '';
                this.editDataNormal = {
                    editData: {}
                };
                this.dialogNormalVisible = false;
            },
            // 保养开始、结束
            handleMaintainTime(index, row, type) {
                console.log(index, row);
                let showMsg = '';
                if(type == 1){
                    showMsg = '开始';
                }else{
                    showMsg = '结束';
                    if(!row.mr_beginTime){
                        this.$message.warning('还未开始');
                        return;
                    }
                }
                this.$confirm('是否要' + showMsg + '该设备保养?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    getDeviceMaintainRecordStartEnd({
                        type,
                        genre: row.mr_genre == '指定保养' ? 2 : 3,
                        did: row.d_id,
                        id: row.mr_id
                    }).then(res => {
                        // console.log(res);
                        if(res.code == 200){
                            this.getInit();
                            this.$message({type: 'success', message: showMsg + '成功!'});
                        }else{
                            this.$message.error(res.msg);
                        }
                    }).catch( err => {
                        // console.log(err);
                        this.$message.error(err.message);
                    })
                }).catch(err => {
                    this.$message({type: 'info', message: '已取消!'});
                })
            },
            // 指定保养列表
            getAssginMaintain() {
                getDeviceAssginMaintain({
                    planno: this.clickPlanno,
                    page: this.currentPage,
                    row: this.pageSize
                }).then( res => {
                    console.log(res);
                    if(res.code == 200){
                        this.tableDataAssgin = res.data;
                        this.totalCount = res.count;
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 周期保养列表
            getCycleMaintain() {
                getDeviceCycleMaintain({
                    planno: this.clickPlanno,
                    page: this.currentPage,
                    row: this.pageSize
                }).then( res => {
                    console.log(res);
                    if(res.code == 200){
                        this.tableDataCycle = res.data;
                        this.totalCount = res.count;
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 保养列表切换
            handletype(val) {
                console.log(val);
                this.tableData = [];
                if(val == 2){
                    this.getAssginMaintain();
                }else if(val == 3){
                    this.getCycleMaintain();
                }else if(val == 1){
                    this.getInit();
                }
            },
            // 导出
            handleExport() {
                this.$exportExcel('#out-device-maintain','设备管理-设备保养');
            },
            // 搜索
            handleSearch(){
                // console.log(this.searchData);
                this.currentPage = 1;
                this.getInit();
            },
            // 分页切换
            handleCurrentChange(val){
                // console.log(val);
                this.currentPage = val;
                this.getInit();
            },
            handleSizeChange(val){
                this.currentPage = 1;
                this.pageSize = val;
                this.getInit();
            },
            // 类型切换
            handleSearchType(val){
                // console.log(val);
                this.searchData.searchvalue = '';
            },
            // 变颜色
            tableRowClassName({ row, column,rowIndex,columnIndex }) {
				if(columnIndex === 1 || columnIndex === 0){
					if(row.mr_status == "已完成"){
						return 'finished';
					}
					if(row.mr_status == "执行中"){
						return 'runing';
					}
					if(row.mr_status == "未开始"){
						return 'noStart';
                    }
                    if(row.mr_status == "保养提醒"){
						return 'overdue';
					}
				}
				return '';
			}
        },
    }
</script>

<style lang="scss" scoped>
    .deviceManage-deviceMaintain {
        padding-left: 0.3rem;
        .device-maintain-tab-wrap {
            height: calc(100% - 120px);
        }
        .handle-btn {
            padding: 0.5rem;
            border: 1px solid #DCDFE6;
            border-bottom: none;
            margin: 0!important;
        }
        .tal {
            margin-top: 0.5rem;
            button {
                width: 4rem;
                border: none;
            }
        }
    }
</style>