<template>
    <div class="planProduction-orderManage h100p">
        <el-row class="h100p">
            <el-row class="handle-btn" :gutter="10">
                <el-col :span="6">
                    <el-button type="danger" size="small" @click="handleAdd">新增</el-button>
                    <!-- <el-button type="primary" size="small" icon="el-icon-refresh-left" @click="getInit"></el-button> -->
                    <el-button type="primary" size="small" @click="handleScan">扫一扫</el-button>
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
                        <el-option label="工单编号" value="orderno"></el-option>
                        <el-option label="产品名称" value="proname"></el-option>
                        <el-option label="产品型号" value="promodel"></el-option>
                        <el-option label="计划状态" value="status"></el-option>
                        <el-option label="计划号" value="planno"></el-option>
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
            <el-row class="order-tab-wrap">
                <el-table id="out-plan-order" :data="tableData" style="width: 100%;" height="100%" border :cell-class-name="tableRowClassName" @row-dblclick="handleRowDblClick">
                    <el-table-column align="center" type="index" label="序号" fixed="left" width="60"></el-table-column>
                    <el-table-column align="center" prop="orderno" label="工单编号" fixed="left" width="200"></el-table-column>
                    <el-table-column align="center" prop="planno" label="计划号" width="180"></el-table-column>
                    <el-table-column align="center" label="工单">
                        <el-table-column align="center" prop="promodel" label="产品型号" width="150" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="proname" label="产品名称" width="150" show-overflow-tooltip></el-table-column>
                    </el-table-column>
                    <el-table-column align="center" label="生产">
                        <el-table-column align="center" prop="deviceid" label="设备编号" width="100"></el-table-column>
                        <el-table-column align="center" prop="modelnumber" label="模具编号" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="workno" label="工序" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="groupname" label="产线" width="150" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="usermation" label="员工" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="classname" label="班次" width="150" show-overflow-tooltip></el-table-column>
                    </el-table-column>
                    <el-table-column align="center" label="计划">
                        <el-table-column align="center" prop="plannum" label="计划产量" width="100"></el-table-column>
                        <el-table-column align="center" prop="addtime" label="工单日期" width="180" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="planbegintime" label="计划开始时间" width="180" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="planendtime" label="计划完成时间" width="180" show-overflow-tooltip></el-table-column>
                    </el-table-column>
                    <el-table-column align="center" label="实际">
                        <el-table-column align="center" prop="actualbegintime" label="实际开始时间" width="180" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="actualendtime" label="实际完成时间" width="180" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="overtime" label="逾期时间" width="160"></el-table-column>
                    </el-table-column>
                    <el-table-column align="center" label="报工产量" width="100">
                        <template slot-scope="scope">
                            <el-button class="w100p" type="primary" size="mini" @click="getWorkReport(scope.$index, scope.row)">{{ scope.row.worknum }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="报工开始" width="100">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.status == '未开始'" type="primary" size="mini" @click="handleOrderStart(scope.$index, scope.row)">开始</el-button>
                            <el-button v-else-if="scope.row.status == '执行中'" type="primary" size="mini" @click="handleWorkReouse(scope.$index, scope.row)">报工</el-button>
                            <el-button v-else-if="scope.row.status == '逾期' && !scope.row.actualbegintime" type="primary" size="mini" @click="handleOrderStart(scope.$index, scope.row)">开始</el-button>
                            <el-button v-else-if="scope.row.status == '逾期' && !scope.row.actualendtime" type="primary" size="mini" @click="handleWorkReouse(scope.$index, scope.row)">报工</el-button>
                            <el-button v-else type="primary" size="mini">----</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="planrate" label="计划完成率" width="120"></el-table-column>
                    <el-table-column align="center" prop="passrate" label="合格率" width="100"></el-table-column>
                    <el-table-column align="center" prop="notpassnum" label="不合格数" width="100"></el-table-column>
                    <el-table-column align="center" prop="status" label="状态" width="100"></el-table-column>
                    <el-table-column align="center" prop="" label="二维码" width="100">
                        <template slot-scope="scope">
                            <el-button type="" size="mini" class="iconfont icon-erweima-copy" @click="handleCode(scope.$index, scope.row)"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button type="primary" v-if="!(scope.row.status == '执行中' || scope.row.status == '已完成' || scope.row.status == '作废')" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                            <el-button type="danger" v-if="!(scope.row.status == '已完成' || scope.row.status == '作废')" size="mini" @click="handleDelete(scope.$index, scope.row)">作废</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="" label="进度" width="200">
                        <template slot-scope="scope">
                            <el-progress stroke-linecap="butt" :text-inside="true" :stroke-width="24" :percentage="scope.row.planratedu > 100 ? 100 : scope.row.planratedu" status="success"></el-progress>
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
                            <el-button class="invalid-btn" type="primary" size="mini">作废</el-button>
                            <el-button class="overdue-btn" type="primary" size="mini">逾期</el-button>
                        </el-button-group>
                    </el-col>
                </el-row>
            </el-row>
        </el-row>
        <!-- 添加、编辑工单弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogOrderVisible">
            <OrderEdit :editData="editDataOrder"  @editClose="editCloseOrder" @updateData="getInit"></OrderEdit>
        </el-dialog>
        <!-- 报工弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogWorkReportVisible" width="70%">
            <WorkReportEdit :editData="editDataWorkReport"  @editClose="editCloseWorkReport" @updateData="getInit" @changeSources="getSource"></WorkReportEdit>
        </el-dialog>
        <!-- 计划弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogPlanMationVisible" width="50%">
            <PlanMation :editData="editDataPlanMation"  @editClose="editClosePlanMation" @updateData="getInit"></PlanMation>
        </el-dialog>
    </div>
</template>

<script>
    import { workOrderManage, workOrderManageDestroy, workReport, workOrderManageStart, workReportGetPlanInfo } from '../../../../api/orderManage.js'
    import OrderEdit from './component/orderEdit.vue'
    import WorkReportEdit from './component/workReportEdit.vue'
    import PlanMation from './component/planMation.vue'
    import QRCode  from "qrcodejs2"
    export default {
        components: {
            OrderEdit, WorkReportEdit, PlanMation
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
                dialogOrderVisible: false,
                dialogWorkReportVisible: false,
                dialogPlanMationVisible: false,
                // 弹窗标题
                dialogTitle: '',
                // 工单数据
                editDataOrder: {},
                // 报工数据
                editDataWorkReport: {},
                // 计划数据
                editDataPlanMation: {},
                orderData: {},
                planPlanno: ''
            }
        },
        created () {
            // console.log(this.$route)
            this.planPlanno = this.$route.query.searchvalue ? this.$route.query.searchvalue : '';
            this.getInit();
        },
        watch: {
            '$route': {
                immediate: false,
                handler(newValue, oldValue) {
                    // console.log(newValue);
                    this.planPlanno = this.$route.query.searchvalue ? this.$route.query.searchvalue : '';
                    this.getInit();
                }
            }
        },
        methods: {
            getInit(){
                workOrderManage({
                    planno: this.planPlanno,
                    begintime: this.searchData.time && this.searchData.time[0] ? this.searchData.time[0] : '',
                    endtime: this.searchData.time && this.searchData.time[1] ? this.searchData.time[1] : '',
                    searchtype: this.searchData.searchtype,
                    searchvalue: this.searchData.searchvalue,
                    page: this.currentPage,
                    row: this.pageSize
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.orderData = {};
                        res.data.WorkOrderManage.forEach( (item, index) => {
                            let time = ['addtime', 'planbegintime', 'planendtime', 'actualbegintime', 'actualendtime'];
                            time.forEach( (item2, index2) => {
                                item[item2] = item[item2] ? this.$handleTime(item[item2]) : item[item2];
                            })
                            item.usermation = (item.userwokrno ? item.userwokrno : '') + ' - ' + (item.username ? item.username : '');
                            item.oknumber = item.worknum - item.notpassnum;
                            // item.notok = (100 - item.passrate).toFixed(2) + '%';
                            item.planratedu = item.planrate;
                            item.planrate = item.planrate + '%';
                            item.passrate = item.passrate + '%';
                            item.overtime = this.formatDuring(item.overtime);
                        })
                        this.tableData = res.data.WorkOrderManage;
                        this.totalCount = res.count;
                        this.orderData.DeviceSelect = res.data.DeviceSelect;
                        this.orderData.MouldSelect = res.data.MouldSelect;
                        this.orderData.UserSelect = res.data.UserSelect;
                        this.orderData.WorkPlanSelect = res.data.WorkPlanSelect;
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 双击
            handleRowDblClick(row, column, event){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_work_manage_work_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(row, column, event);
                this.editDataPlanMation = {  ...row  };
                this.dialogTitle = '计划信息';
                this.dialogPlanMationVisible = true;
                // workReportGetPlanInfo({
                //     planno: row.planno
                // }).then( res => {
                //     console.log(res);
                //     if(res.code == 200){
                //         this.editDataPlanMation = res.data;
                //         this.dialogTitle = '计划信息';
                //         this.dialogPlanMationVisible = true;
                //     }
                // }).catch( err => {
                //     this.$message.error(err.msg);
                // })
            },
            // 搜索
            handleSearch(){
                // console.log(this.searchData);
                this.currentPage = 1;
                this.getInit();
            },
            // 类型切换
            handleSearchType(val){
                // console.log(val);
                this.searchData.searchvalue = '';
            },
            // 生成二维码
            handleCode(index, row){
                this.$alert('<div id="' + row.orderno + '" class="tac"></div>', '', {
                    dangerouslyUseHTMLString: true,
                    center: true
                }).then( res => {
                    // console.log(res);
                }).catch( err => {
                    // this.$message.error(err);
                });
                this.$nextTick( () => {
                    let dv = document.getElementById(row.orderno).innerHTML = '';
                    let qrcode = new QRCode(row.orderno, {
                        width: 200,
                        height: 200,
                        text: row.orderno
                    })
                })
            },
            // 关闭添加，编辑工单弹窗
            editCloseOrder(){
                this.dialogOrderVisible = false;
                this.dialogTitle = '';
                this.editDataOrder = {};
            },
            // 关闭报工弹窗
            editCloseWorkReport(){
                this.dialogWorkReportVisible = false;
                this.dialogTitle = '';
                this.editDataWorkReport = {};
            },
            // 关闭计划弹窗
            editClosePlanMation(){
                this.dialogPlanMationVisible = false;
                this.dialogTitle = '';
                this.editDataPlanMation = {};
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
            // 新增
            handleAdd() {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_work_manage_work_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.dialogTitle = '添加工单';
                this.editDataOrder = {
                    ...this.orderData,
                    editData: {
                        add: 1,
                        planno: '',
                        orderno: '',
                        did: '',
                        mouldid: '',
                        workno: '',
                        userid: '',
                        classid: '',
                        json: ''
                    }
                };
                this.dialogOrderVisible = true;
            },
            // 修改
            handleEdit(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_work_manage_work_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(row);
                this.dialogTitle = '编辑工单';
                this.editDataOrder = {};
                this.editDataOrder = {
                    ...this.orderData,
                    editData: { ...row }
                };
                this.dialogOrderVisible = true;
            },
            // 作废
            handleDelete(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_work_manage_work_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.$confirm('是否要作废改工单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    workOrderManageDestroy({
                        id: row.id,
                        orderno: row.orderno,
                        planno: row.planno
                    }).then(res => {
                        // console.log(res);
                        if(res.code == 200){
                            this.getInit();
                            this.$message({type: 'success', message: '作废成功!'});
                        }else{
                            this.$message.error(res.msg);
                        }
                    }).catch( err => {
                        // console.log(err);
                        this.$message.error(err.message);
                    })
                }).catch(err => {
                    this.$message({type: 'info', message: '已取消作废!'});
                })
            },
            // 
            getSource(orderno, sources, type, row, isWork) {
                return new Promise( (resolve, reject) => {
                    workReport({
                        orderno,
                        sources
                    }).then( res => {
                        // console.log(res);
                        if(type == 1){
                            if(res.code == 200){
                                this.editDataWorkReport = {
                                    hasData: res.data,
                                    row,
                                    isWork,
                                    nowSourse: sources
                                };
                            }else{
                                this.editDataWorkReport = {
                                    hasData: [],
                                    row,
                                    isWork,
                                    nowSourse: sources
                                };
                            }
                        }else{
                            if(res.code == 200){
                                resolve(res.data);
                            }else{
                                resolve([]);
                            }
                        }
                    }).catch( err => {
                        reject('err');
                        this.$message.error(err.message);
                    })
                })
            },
            // 获取报工列表
            getWorkReport(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_work_manage_work_report';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.getSource(row.orderno, '1').then(res => {
                    this.editDataWorkReport = {
                        hasData: res,
                        row,
                        isWork: 1,
                        nowSourse: '1'
                    };
                    this.dialogTitle = '报工';
                    this.dialogWorkReportVisible = true;
                }).catch( err => {
                    this.$message.error(err);
                })
            },
            // 报工开始
            handleOrderStart(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_work_manage_work_report';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.$confirm('工单编号 '+ row.orderno +' 开始', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    workOrderManageStart({
                        id: row.id,
                        planno: row.planno,
                        mouldid: row.mouldid
                    }).then(res => {
                        // console.log(res);
                        if(res.code == 200){
                            this.getInit();
                            this.$message({type: 'success', message: '工单已开始!'});
                        }else{
                            this.$message.error(res.msg);
                        }
                    }).catch( err => {
                        // console.log(err);
                        this.$message.error(err.message);
                    })
                }).catch(err => {
                    this.$message({type: 'info', message: '已取消开始!'});
                })
            },
            // 报工开始
            handleWorkReouse(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_work_manage_work_report';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.getSource(row.orderno, '1').then(res => {
                    this.editDataWorkReport = {
                        hasData: res,
                        row,
                        isWork: 2,
                        nowSourse: '1'
                    };
                    this.dialogTitle = '报工';
                    this.dialogWorkReportVisible = true;
                }).catch( err => {
                    this.$message.error(err);
                })
            },
            // 扫一扫
            handleScan() {},
            // 导出
            handleExport() {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_work_manage_work_toexcel';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.$exportExcel('#out-plan-order','计划排产-工单管理');
            },
            // 变颜色
            tableRowClassName({ row, column,rowIndex,columnIndex }) {
				if(columnIndex === 1 || columnIndex === 0){
					if(row.status == "未开始"){
						return 'noStart';
					}
					if(row.status == "执行中"){
						return 'runing';
					}
					if(row.status == "已完成"){
						return 'finished';
					}
					if(row.status == "作废"){
						return 'invalid';
					}
					if(row.status == "逾期"){
						return 'overdue';
					}
				}
				return '';
            },
            formatDuring(mss) {
                mss = mss * 1000;
                let days = Math.floor(mss / (1000 * 60 * 60 * 24));
                let hours = Math.floor((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.round((mss % (1000 * 60)) / 1000);
                // return days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
                return days + "天" + hours + "小时" + minutes + "分钟";
            }
        },
    }
</script>

<style lang="scss" scoped>
    .planProduction-orderManage {
        padding-left: 0.3rem;
        .order-tab-wrap {
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
<style lang="scss">
    .el-table td,
    .el-table th {
        padding: 5px;
    }
    .el-message-box__message img {
        margin: 1rem auto;
    }
    .order-tab-wrap .el-progress-bar__outer,
    .order-tab-wrap .el-progress-bar__outer div {
        border-radius: 0;
        color: #333;
    }
    .no-start-btn {
        background: #69706a;
        &:hover, &:focus {
            background: #69706a;
        }
    }
    .runing-btn {
        background: #208c35;
        &:hover, &:focus {
            background: #208c35;
        }
    }
    .finished-btn {
        background: #011ab5;
        &:hover, &:focus {
            background: #011ab5;
        }
    }
    .invalid-btn {
        background: #9b0d17;
        &:hover, &:focus {
            background: #9b0d17;
        }
    }
    .overdue-btn {
        background: #a9a11c;
        &:hover, &:focus {
            background: #a9a11c;
        }
    }
</style>