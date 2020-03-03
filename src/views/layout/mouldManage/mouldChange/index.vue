<template>
    <div class="mouldManage-mouldChange h100p">
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
                        <el-option label="模具编号" value="m_number"></el-option>
                        <el-option label="模具名称" value="m_name"></el-option>
                        <el-option label="变更人" value="cr_changeuser"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-if="searchData.searchtype == 'status'" v-model="searchData.searchvalue" size="small" placeholder="工单状态" class="w100p">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="未开始" value="0"></el-option>
                        <el-option label="执行中" value="1"></el-option>
                        <el-option label="已完成" value="2"></el-option>
                        <el-option label="作废" value="3"></el-option>
                        <el-option label="逾期" value="4"></el-option>
                    </el-select>
                    <el-input v-else v-model="searchData.searchvalue" size="small" placeholder="请输入关键词"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
                </el-col>
            </el-row>
            <el-row class="mould-change-tab-wrap">
                <el-table id="out-mould-change" :data="tableData" style="width: 100%;" height="100%" border :cell-class-name="tableRowClassName">
                    <el-table-column fixed="left" align="center" type="index" label="序号" width="60"></el-table-column>
                    <el-table-column fixed="left" align="center" prop="cr_number" label="变更编号" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="m_number" label="模具编号" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="m_name" label="模具名称" width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="cr_newnumber" label="变更后的模具编号" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="cr_changetime" label="变更时间" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="cr_changeuser" label="变更人" width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="cr_checkuser" label="变更审核人" width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" label="变更内容" min-width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleChangeContent(scope.$index, scope.row)">详细</el-button>
                            <!-- <el-button type="warning" size="mini" @click="handleChangeCheck(scope.$index, scope.row)">审核</el-button> -->
                        </template>
                    </el-table-column>
                    <!-- <el-table-column align="center" label="操作" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        </template>
                    </el-table-column> -->
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
                        <!-- <el-button-group>
                            <el-button class="no-start-btn" type="primary" size="mini">待用</el-button>
                            <el-button class="runing-btn" type="primary" size="mini">工作</el-button>
                            <el-button class="invalid-btn" type="primary" size="mini">故障</el-button>
                            <el-button class="overdue-btn" type="primary" size="mini">保养</el-button>
                        </el-button-group> -->
                    </el-col>
                </el-row>
            </el-row>
        </el-row>
        <!-- 添加、编辑变更 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogAddVisible" width="60%">
            <ChangeEdit :editData="editDataAdd"  @editClose="editCloseAdd" @updateData="getInit"></ChangeEdit>
        </el-dialog>
    </div>
</template>

<script>
    import { getMouldChangeRecord, getMouldChangeRecordCheck } from '../../../../api/mouldManage.js'
    import ChangeEdit from './component/changeEdit.vue'
    export default {
        components: {
            ChangeEdit,
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
                editDataAdd: {},
                hasSelect: []
            }
        },
        created () {
            this.getInit();
        },
        methods: {
            getInit() {
                getMouldChangeRecord({
                    page: this.currentPage,
                    row: this.pageSize,
                    begintime: this.searchData.time && this.searchData.time[0] ? this.searchData.time[0] : '',
                    endtime: this.searchData.time && this.searchData.time[1] ? this.searchData.time[1] : '',
                    searchtype: this.searchData.searchtype,
                    searchvalue: this.searchData.searchvalue
                }).then( res => {
                    console.log(res);
                    if(res.code == 200){
                        res.data.ChangeRecord.forEach( (item, index) => {
                            item.cr_changetime = item.cr_changetime ? this.$handleTime(item.cr_changetime) : item.cr_changetime;
                        })
                        this.tableData = res.data.ChangeRecord;
                        this.totalCount = res.count;
                        this.hasSelect = {
                            mouldSelect: res.data.MouldSelect,
                            userSelect: res.data.UserSelect
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
                    return result == 'fun_mould_manage_modify_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.dialogTitle = '添加变更';
                this.editDataAdd = {
                    hasSelect: this.hasSelect,
                    editData: {
                        add: 1,
                        mid: '',
                        changetime: '',
                        newnumber: '',
                        content: '',
                        newimgpath: '',
                        changeuser: '',
                        checkuser: ''
                    }
                };
                this.dialogAddVisible = true;
            },
            // 关闭新增变更弹窗
            editCloseAdd() {
                this.dialogAddVisible = false;
                this.dialogTitle = '';
                this.editDataAdd = {};
            },
            // 变更内容
            handleChangeContent(index, row) {
                this.dialogTitle = '查看变更';
                this.editDataAdd = {
                    hasSelect: this.hasSelect,
                    editData: {
                        add: 3,
                        ...row
                    }
                };
                this.dialogAddVisible = true;
            },
            // 审核
            handleChangeCheck(index, row) {
                this.$confirm('是否确认审核?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    getMouldChangeRecordCheck({
                        id: row.cr_id
                    }).then(res => {
                        // console.log(res);
                        if(res.code == 200){
                            this.getInit();
                            this.$message({type: 'success', message: '审核成功!'});
                        }else{
                            this.$message.error(res.msg);
                        }
                    }).catch( err => {
                        // console.log(err);
                        this.$message.error(err.message);
                    })
                }).catch(err => {
                    this.$message({type: 'info', message: '已取消审核!'});
                })
            },
            handleEdit(index, row) {},
            // 导出
            handleExport() {
                this.$exportExcel('#out-mould-change','模具管理-模具变更');
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
                console.log(val);
                this.searchData.searchvalue = '';
            },
            // 变颜色
            tableRowClassName({ row, column,rowIndex,columnIndex }) {
				if(columnIndex === 1 || columnIndex === 0){
					if(row.m_status == "待用"){
						return 'noStart';
					}
					if(row.m_status == "工作"){
						return 'runing';
					}
					if(row.m_status == "故障"){
						return 'invalid';
					}
					if(row.m_status == "保养"){
						return 'overdue';
					}
				}
				return '';
			}
        },
    }
</script>

<style lang="scss" scoped>
    .mouldManage-mouldChange {
        padding-left: 0.3rem;
        .mould-change-tab-wrap {
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