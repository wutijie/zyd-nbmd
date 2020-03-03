<template>
    <div class="deviceManage-deviceRepair h100p">
        <el-row class="h100p">
            <el-row class="handle-btn" :gutter="10">
                <el-col :span="6">
                    <el-button type="danger" size="small" @click="handleAdd">新增</el-button>
                    <!-- <el-button type="primary" size="small" icon="el-icon-refresh-left" @click="getInit"></el-button> -->
                    <el-button type="primary" size="small" @click="handleExport">导出</el-button>
                </el-col>
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
                        <el-option label="维修状态" value="rr_status"></el-option>
                        <el-option label="维修编号" value="rr_repair_planorder"></el-option>
                        <el-option label="设备编号" value="d_number"></el-option>
                        <el-option label="设备名称" value="d_name"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-if="searchData.searchtype == 'rr_status'" v-model="searchData.searchvalue" size="small" placeholder="工单状态" class="w100p">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="未开始" value="1"></el-option>
                        <el-option label="执行中" value="2"></el-option>
                        <el-option label="已完成" value="3"></el-option>
                    </el-select>
                    <el-input v-else v-model="searchData.searchvalue" size="small" placeholder="请输入关键词"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
                </el-col>
            </el-row>
            <el-row class="mould-repair-tab-wrap">
                <el-table id="out-device-repair" :data="tableData" style="width: 100%;" height="100%" border :cell-class-name="tableRowClassName">
                    <el-table-column fixed="left" align="center" type="index" label="序号" width="60"></el-table-column>
                    <el-table-column fixed="left" align="center" prop="rr_status" label="状态" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="rr_repair_planorder" label="维修编号" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="d_number" label="设备编号" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="d_name" label="设备名称" width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="rr_begintime" label="维修开始时间" width="200" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button v-if="!scope.row.rr_begintime" @click="handleRepairTime(scope.$index, scope.row, 1)" size="mini" type="warning">开始</el-button>
                            <span v-else>{{ scope.row.rr_begintime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="rr_endtime" label="维修结束时间" width="200" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button v-if="!scope.row.rr_endtime" @click="handleRepairTime(scope.$index, scope.row, 2)" size="mini" type="warning">结束</el-button>
                            <span v-else>{{ scope.row.rr_endtime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="rr_repairUser" label="申请人" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="rr_affirmUser" label="审核人" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" label="操作" min-width="250">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.rr_status != '已完成'" type="primary" size="mini" @click="handleEdit(scope.$index, scope.row, 2)">编辑</el-button>
                            <el-button type="warning" size="mini" @click="handleEdit(scope.$index, scope.row, 3)">查看</el-button>
                            <el-button type="danger" size="mini" @click="handleRepairContent(scope.$index, scope.row)">内容</el-button>
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
                        </el-button-group>
                    </el-col>
                </el-row>
            </el-row>
        </el-row>
        <!-- 添加、编辑维修 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogAddVisible" width="60%">
            <RepairEdit :editData="editDataAdd"  @editClose="editCloseAdd" @updateData="getInit"></RepairEdit>
        </el-dialog>
        <!-- 维修内容 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogContentVisible" width="60%">
            <HandleTemplateEdit :editData="editDataContent"  @editClose="editCloseContent" @updateData="getInit"></HandleTemplateEdit>
        </el-dialog>
    </div>
</template>

<script>
    import { getDeviceRepairRecord, getDeviceRepairRecordStartEnd } from '../../../../api/deviceManage.js'
    import RepairEdit from './component/repairEdit.vue'
    import HandleTemplateEdit from './component/handleTemplateEdit.vue'
    export default {
        components: {
            RepairEdit, HandleTemplateEdit
        },
        data() {
            return {
                // 搜索
                searchData: {
                    time: [],
                    searchvalue: '',
                    searchtype: ''
                },
                // 列表
                tableData: [],
                // 总条数
                totalCount: 0,
                // 当前页
                currentPage: 1,
                // 每页页数
                pageSize: 10,
                dialogTitle: '',
                dialogAddVisible: false,
                dialogContentVisible: false,
                editDataAdd: {},
                editDataContent: {},
                selectData: {}
            }
        },
        created () {
            this.getInit();
        },
        methods: {
            getInit() {
                getDeviceRepairRecord({
                    page: this.currentPage,
                    row: this.pageSize,
                    begintime: this.searchData.time && this.searchData.time[0] ? this.searchData.time[0] : '',
                    endtime: this.searchData.time && this.searchData.time[1] ? this.searchData.time[1] : '',
                    searchtype: this.searchData.searchtype,
                    searchvalue: this.searchData.searchvalue
                }).then( res => {
                    console.log(res);
                    if(res.code == 200){
                        res.data.RepairRecord.forEach( (item, index) => {
                            item.rr_begintime = item.rr_begintime ? this.$handleTime(item.rr_begintime) : item.rr_begintime;
                            item.rr_endtime = item.rr_endtime ? this.$handleTime(item.rr_endtime) : item.rr_endtime;
                        })
                        this.tableData = res.data.RepairRecord;
                        this.totalCount = res.count;
                        this.selectData = {
                            deviceSelect: res.data.DeviceSelect,
                            repairTemplateSelect: res.data.RepairTemplateSelect
                        };
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 新增
            handleAdd() {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_device_manage_repair_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.dialogTitle = '添加维修';
                this.editDataAdd = {
                    hasSelect: this.selectData,
                    editData: {
                        add: 1,
                    }
                };
                this.dialogAddVisible = true;
            },
            // 关闭添加弹窗
            editCloseAdd() {
                this.dialogAddVisible = false;
                this.dialogTitle = '';
                this.editDataAdd = {};
            },
            // 编辑
            handleEdit(index, row, type) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_device_manage_repair_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.dialogTitle = type == 2 ? '编辑维修' : '查看维修';
                this.editDataAdd = {
                    hasSelect: this.selectData,
                    editData: {
                        add: type,
                        ...row
                    }
                };
                this.dialogAddVisible = true;
            },
            // 内容
            handleRepairContent(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_device_manage_repair_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(row)
                this.dialogTitle = '维修内容';
                let templateData;
                if(row.rr_content && row.rr_content.slice(0, 1) == "{"){
                    templateData = JSON.parse(row.rr_content);
                }else{
                    templateData = {
                        0: [
                            { type: 'text', value: row.rr_content }
                        ]
                    }
                }
                this.editDataContent = {
                    add: 1,
                    templateData,
                    nowRow: row
                };
                this.dialogContentVisible = true;
            },
            // 关闭内容弹窗
            editCloseContent() {
                this.dialogContentVisible = false;
                this.dialogTitle = '';
                this.editDataContent = {};
            },
            // 维修开始、结束
            handleRepairTime(index, row, type) {
                // console.log(index, row);
                let showMsg = '';
                if(type == 1){
                    showMsg = '开始';
                }else{
                    showMsg = '结束';
                    if(!row.rr_begintime){
                        this.$message.warning('还未开始');
                        return;
                    }
                }
                this.$confirm('是否要' + showMsg + '该设备维修?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    getDeviceRepairRecordStartEnd({
                        type,
                        did: row.d_id,
                        id: row.rr_id
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
            // 导出
            handleExport() {
                this.$exportExcel('#out-device-repair','设备管理-设备维修');
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
					if(row.rr_status == "已完成"){
						return 'finished';
					}
					if(row.rr_status == "执行中"){
						return 'runing';
					}
					if(row.rr_status == "未开始"){
						return 'noStart';
					}
				}
				return '';
			}
        },
    }
</script>

<style lang="scss" scoped>
    .deviceManage-deviceRepair {
        padding-left: 0.3rem;
        .mould-repair-tab-wrap {
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