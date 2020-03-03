<template>
    <div class="mouldManage-mouldMation h100p">
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
                        <el-option label="模具状态" value="m_status"></el-option>
                        <el-option label="模具编号" value="m_number"></el-option>
                        <el-option label="模具名称" value="m_name"></el-option>
                        <el-option label="产品型号" value="promodel"></el-option>
                        <el-option label="产品名称" value="proname"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-if="searchData.searchtype == 'm_status'" v-model="searchData.searchvalue" size="small" placeholder="工单状态" class="w100p">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="待用" value="0"></el-option>
                        <el-option label="工作" value="1"></el-option>
                        <el-option label="故障" value="2"></el-option>
                        <el-option label="保养" value="3"></el-option>
                        <el-option label="维修" value="4"></el-option>
                    </el-select>
                    <el-input v-else v-model="searchData.searchvalue" size="small" placeholder="请输入关键词"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
                </el-col>
            </el-row>
            <el-row class="mould-tab-wrap">
                <el-table id="out-mould-mation" :data="tableData" style="width: 100%;" height="100%" border :cell-class-name="tableRowClassName">
                    <el-table-column fixed="left" align="center" type="index" label="序号" width="60"></el-table-column>
                    <el-table-column fixed="left" align="center" prop="m_status" label="状态" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" label="模具编号" width="200">
                        <template slot-scope="scope">
                            <p @click="handleMouldImg(scope.$index, scope.row)">{{ scope.row.m_number }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="m_name" label="模具名称" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="m_assetNo" label="资产编号" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" label="产品">
                        <el-table-column align="center" prop="proname" label="产品名称" width="150" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="promodel" label="产品型号" width="150" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="m_CavityNum" label="模腔数" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="m_weight" label="重量" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="m_measure" label="外观尺寸" width="150" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="m_ejectionStructure" label="顶出结构" width="150" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="m_cylinderNum" label="油缸数" width="80" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="m_startTime" label="开始使用时间" width="200" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="m_acceptanceTime" label="验收日期" width="200" show-overflow-tooltip></el-table-column>
                    </el-table-column>
                    <el-table-column align="center" label="使用次数合计" width="100">
                        <template slot-scope="scope">
                            <el-button class="w100p" type="primary" size="mini" @click="useNumTimeTotal(scope.$index, scope.row, 1)">{{ scope.row.m_useNum }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="m_useTime" label="使用时间合计" width="100">
                        <template slot-scope="scope">
                            <el-button class="w100p" type="primary" size="mini" @click="useNumTimeTotal(scope.$index, scope.row, 2)">{{ scope.row.m_useTime }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="" label="周期保养" width="100">
                        <template slot-scope="scope">
                            <el-button class="w100p" type="success" size="mini" @click="handleMouldChangle(scope.$index, scope.row, 4)">{{ scope.row.m_cycleMaintainNum }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="" label="二级保养" width="100">
                        <template slot-scope="scope">
                            <el-button class="w100p" type="success" size="mini" @click="handleMouldChangle(scope.$index, scope.row, 5)">{{ scope.row.m_secondMaintainNum }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="" label="模具维修" width="100">
                        <template slot-scope="scope">
                            <el-button class="w100p" type="warning" size="mini" @click="handleMouldChangle(scope.$index, scope.row, 1)">{{ scope.row.m_repairNum }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="" label="模具故障" width="100">
                        <template slot-scope="scope">
                            <el-button class="w100p" type="danger" size="mini" @click="handleMouldChangle(scope.$index, scope.row, 2)">{{ scope.row.m_faultNum }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="" label="模具变更" width="100">
                        <template slot-scope="scope">
                            <el-button class="w100p" type="primary" size="mini" @click="handleMouldChangle(scope.$index, scope.row, 3)">{{ scope.row.m_changeNum }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="m_life" label="寿命值" width="120">
                        <template slot-scope="scope">
                            <el-tooltip class="" effect="dark" :content="'次数：' + scope.row.m_life" placement="left">
                                <el-button size="mini" class="w100p">{{ scope.row.liferate + '%' }}</el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
                            <el-button class="no-start-btn" type="primary" size="mini">待用</el-button>
                            <el-button class="runing-btn" type="primary" size="mini">工作</el-button>
                            <el-button class="finished-btn" type="primary" size="mini">维修</el-button>
                            <el-button class="invalid-btn" type="primary" size="mini">故障</el-button>
                            <el-button class="overdue-btn" type="primary" size="mini">保养</el-button>
                        </el-button-group>
                    </el-col>
                </el-row>
            </el-row>
        </el-row>
        <!-- 添加、编辑模具弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogMouldVisible">
            <MouldEdit :editData="editDataMould"  @editClose="editCloseMould" @updateData="getInit"></MouldEdit>
        </el-dialog>
        <!-- 使用次数、使用时间 合计弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogNumTotalVisible" width="60%">
            <TotalTab :editData="editDataNumTotal"  @editClose="editCloseNumTotal" @updateData="useNumTimeTotal"></TotalTab>
        </el-dialog>
        <!-- 变更弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogSeeVisible" width="60%">
            <SeeTab :editData="editDataSee"  @editClose="editCloseSee" @updateData="handleMouldChangle"></SeeTab>
        </el-dialog>
    </div>
</template>

<script>
    import { getMouldInfo, getMouldInfoUseCountInfo, getMouldRepairRecord, getMouldFaultRecord, getMouldChangeRecord, getMouldMaintainRecord } from '../../../../api/mouldManage.js'
    import MouldEdit from './component/mouldEdit.vue'
    import TotalTab from './component/totalTab.vue'
    import SeeTab from './component/seeTab.vue'
    export default {
        components: {
            MouldEdit, TotalTab, SeeTab
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
                dialogMouldVisible: false,
                dialogNumTotalVisible: false,
                dialogSeeVisible: false,
                editDataMould: {},
                editDataNumTotal: {},
                editDataSee: {},
                dialogTitle: '',
                mouldData: {}
            }
        },
        created () {
            this.getInit();
        },
        methods: {
            getInit(){
                getMouldInfo({
                    page: this.currentPage,
                    row: this.pageSize,
                    begintime: this.searchData.time && this.searchData.time[0] ? this.searchData.time[0] : '',
                    endtime: this.searchData.time && this.searchData.time[1] ? this.searchData.time[1] : '',
                    searchtype: this.searchData.searchtype,
                    searchvalue: this.searchData.searchvalue
                }).then( res => {
                    console.log(res);
                    if(res.code == 200){
                        res.data.MouldInfo.forEach( (item, index) => {
                            let time = ['m_startTime', 'm_acceptanceTime'];
                            time.forEach( (item2, index2) => {
                                item[item2] = item[item2] ? this.$handleTime(item[item2]) : item[item2];
                            })
                        })
                        this.tableData = res.data.MouldInfo;
                        this.totalCount = res.count;
                        this.mouldData.ProSelect = res.data.ProSelect;
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
                    return result == 'fun_mould_manage_mould_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.dialogTitle = '添加模具';
                this.editDataMould = {
                    ...this.mouldData,
                    editData: {
                        add: 1,
                        m_number: '',
                        m_name: '',
                        m_assetNo: '',
                        proid: '',
                        m_CavityNum: '',
                        m_weight: '',
                        m_measure: '',
                        m_ejectionstructure: '',
                        m_cylindernum: '',
                        m_life: '',
                        m_acceptanceTime: '',
                        m_imgpath: '',
                        m_param: ''
                    }
                };
                this.dialogMouldVisible = true;
            },
            // 编辑
            handleEdit(index, row){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_mould_manage_mould_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.dialogTitle = '编辑模具';
                this.editDataMould = {
                    ...this.mouldData,
                    editData: row
                };
                this.dialogMouldVisible = true;
            },
            // 关闭添加，编辑工单弹窗
            editCloseMould(){
                this.dialogMouldVisible = false;
                this.dialogTitle = '';
                this.editDataMould = {};
            },
            // 关闭使用次数、使用时间 合计弹窗
            editCloseNumTotal(){
                this.dialogNumTotalVisible = false;
                this.dialogTitle = '';
                this.editDataNumTotal = {};
            },
            // 导出
            handleExport() {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_mould_manage_mould_toexcel';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.$exportExcel('#out-mould-mation','模具管理-基础信息');
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
            // 查看图片
            handleMouldImg(index, row) {
                console.log(index, row);
                // m_imgPath
                this.$alert('<img class="w100p" src="'+ row.m_imgPath +'" alt="暂无图片" />', '', {
                    dangerouslyUseHTMLString: true,
                    center: true
                }).then( res => {
                    // console.log(res);
                    return;
                }).catch( err => {
                    // this.$message.error(err);
                });
            },
            // 使用次数合计、使用时间合计
            useNumTimeTotal(index, row, type, page, pageSize){
                // console.log(index, row, type);
                if(type == 1){
                    this.dialogTitle = '使用次数合计';
                }else{
                    this.dialogTitle = '使用时间合计';
                }
                page = page ? page : 1;
                pageSize = pageSize ? pageSize : 10;
                // console.log(page, pageSize)
                getMouldInfoUseCountInfo({
                    mid: row.m_id,
                    page: page,
                    row: pageSize
                }).then( res => {
                    console.log(res);
                    // this.editDataNumTotal = {};
                    let totalHead = [];
                    if(type == 1){
                        totalHead = [
                            { key: '工单编号', value: 'orderno', width: '200' },
                            { key: '模具编号', value: 'm_number', width: '150' },
                            { key: '开始时间', value: 'actualbegintime', width: '180' },
                            { key: '结束时间', value: 'actualendtime', width: '180' },
                            { key: '使用次数', value: 'worknum', width: '100' }
                        ]
                    }else if(type == 2){
                        totalHead = [
                            { key: '工单编号', value: 'orderno', width: '200' },
                            { key: '模具编号', value: 'm_number', width: '150' },
                            { key: '开始时间', value: 'actualbegintime', width: '180' },
                            { key: '结束时间', value: 'actualendtime', width: '180' },
                            { key: '合计时间', value: 'worktime', width: '100' }
                        ]
                    }
                    if(res.code == 200){
                        res.data.forEach( (item, index) => {
                            item.actualbegintime = item.actualbegintime ? this.$handleTime(item.actualbegintime) : item.actualbegintime;
                            item.actualendtime = item.actualendtime ? this.$handleTime(item.actualendtime) : item.actualendtime;
                        })
                    }else{
                        res.data = [];
                    }
                    this.editDataNumTotal = {
                        totalHead,
                        totalData: res.data,
                        rowData: {
                            index, row, type, page, pageSize, count: res.count
                        }
                    };
                    this.dialogNumTotalVisible = true;
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 维修、故障、变更、保养
            handleMouldChangle(index, row, type, page, pageSize) {
                console.log(index, row);
                let showHead = [];
                page = page ? page : 1;
                pageSize = pageSize ? pageSize : 10;
                if(type == 1){
                    let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                        return result == 'fun_mould_manage_mould_repair';
                    }) : null;
                    if(!isCouldHandle) {
                        this.$message.warning('暂无权限');
                        return;
                    }
                    showHead = [
                        { key: '模具编号', value: 'm_number', width: '200' },
                        { key: '维修编号', value: 'rr_repair_planorder', width: '180' },
                        { key: '开始时间', value: 'rr_begintime', width: '180' },
                        { key: '结束时间', value: 'rr_endtime', width: '200' },
                        { key: '状态', value: 'rr_status', width: '90' }
                    ]
                    getMouldRepairRecord({
                        mid: row.m_id,
                        page: page ? page : 1,
                        row: pageSize ? pageSize : 10
                    }).then( res => {
                        // console.log(res);
                        if(res.code == 200){
                            res.data.RepairRecord.forEach( (item, index) => {
                                item.rr_begintime = item.rr_begintime ? this.$handleTime(item.rr_begintime) : item.rr_begintime;
                                item.rr_endtime = item.rr_endtime ? this.$handleTime(item.rr_endtime) : item.rr_endtime;
                                item.m_number = row.m_number;
                            })
                            this.editDataSee = {
                                showHead,
                                showData: res.data.RepairRecord,
                                rowData: {
                                    index, row, type, page, pageSize, count: res.count
                                }
                            };
                        }else{
                            this.$message.error(res.msg);
                        }
                        this.dialogTitle = '模具维修';
                        this.dialogSeeVisible = true;
                    }).catch( err => {
                        this.$message.error(err.message);
                    })
                }else if(type == 2){
                    let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                        return result == 'fun_mould_manage_mould_fault';
                    }) : null;
                    if(!isCouldHandle) {
                        this.$message.warning('暂无权限');
                        return;
                    }
                    showHead = [
                        { key: '模具编号', value: 'm_number', width: '200' },
                        { key: '故障编号', value: 'fr_number', width: '180' },
                        { key: '来源', value: 'fr_source', width: '100' },
                        { key: '类型', value: 'ft_name', width: '200' },
                        { key: '状态', value: 'fr_status', width: '90' }
                    ]
                    getMouldFaultRecord({
                        mid: row.m_id,
                        source: 3,
                        page: page ? page : 1,
                        row: pageSize ? pageSize : 10
                    }).then( res => {
                        // console.log(res);
                        if(res.code == 200){
                            res.data.FaultRecord.forEach( (item, index) => {
                                item.fr_begintime = item.fr_begintime ? this.$handleTime(item.fr_begintime) : item.fr_begintime;
                                item.m_number = row.m_number;
                            })
                            this.editDataSee = {
                                showHead,
                                showData: res.data.FaultRecord,
                                rowData: {
                                    index, row, type, page, pageSize, count: res.count
                                }
                            };
                        }else{
                            this.$message.error(res.msg);
                        }
                        this.dialogTitle = '模具故障';
                        this.dialogSeeVisible = true;
                    }).catch( err => {
                        this.$message.error(err.message);
                    })
                }else if(type == 3){
                    let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                        return result == 'fun_mould_manage_mould_modify';
                    }) : null;
                    if(!isCouldHandle) {
                        this.$message.warning('暂无权限');
                        return;
                    }
                    showHead = [
                        { key: '原模具编号', value: 'cr_number', width: '200' },
                        { key: '变更后模具编号', value: 'cr_newnumber', width: '200' }
                    ]
                    getMouldChangeRecord({
                        mid: row.m_id,
                        page: page ? page : 1,
                        row: pageSize ? pageSize : 10
                    }).then( res => {
                        // console.log(res);
                        if(res.code == 200){
                            res.data.ChangeRecord.forEach( (item, index) => {
                                item.cr_createtime = item.cr_createtime ? this.$handleTime(item.cr_createtime) : item.cr_createtime;
                                item.m_number = row.m_number;
                            })
                            this.editDataSee = {
                                showHead,
                                showData: res.data.ChangeRecord,
                                rowData: {
                                    index, row, type, page, pageSize, count: res.count
                                }
                            };
                        }else{
                            this.$message.error(res.msg);
                        }
                        this.dialogTitle = '模具变更';
                        this.dialogSeeVisible = true;
                    }).catch( err => {
                        this.$message.error(err.message);
                    })
                }else if(type == 4 || type == 5){
                    let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                        return result == 'fun_mould_manage_mould_maintain';
                    }) : null;
                    if(!isCouldHandle) {
                        this.$message.warning('暂无权限');
                        return;
                    }
                    showHead = [
                        { key: '保养工单号', value: 'mr_maintain_planOrder', width: '200' },
                        { key: '保养计划号', value: 'mr_planno', width: '200' },
                        { key: '模具编号', value: 'm_number', width: '200' },
                        { key: '保养开始时间', value: 'mr_beginTime', width: '180' },
                        { key: '保养结束时间', value: 'mr_endTime', width: '200' },
                        { key: '状态', value: 'mr_status', width: '100' }
                    ]
                    getMouldMaintainRecord({
                        mid: row.m_id,
                        type: type - 1,
                        page: page ? page : 1,
                        row: pageSize ? pageSize : 10
                    }).then( res => {
                        console.log(res);
                        if(res.code == 200){
                            res.data.MaintainRecord.forEach( (item, index) => {
                                item.mr_beginTime = item.mr_beginTime ? this.$handleTime(item.mr_beginTime) : item.mr_beginTime;
                                item.mr_endTime = item.mr_endTime ? this.$handleTime(item.mr_endTime) : item.mr_endTime;
                                item.m_number = row.m_number;
                            })
                            this.editDataSee = {
                                showHead,
                                showData: res.data.MaintainRecord,
                                rowData: {
                                    index, row, type, page, pageSize, count: res.count
                                }
                            };
                        }else{
                            this.$message.error(res.msg);
                        }
                        this.dialogTitle = type == 4 ? '周期保养' : '二级保养';
                        this.dialogSeeVisible = true;
                    }).catch( err => {
                        this.$message.error(err.message);
                    })
                }
            },
            // 保养
            handleMouldMaintain(index, row){},
            // 关闭变更弹窗
            editCloseSee(){
                this.dialogSeeVisible = false;
                this.dialogTitle = '';
                this.editDataSee = {};
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
                    if(row.m_status == "维修"){
						return 'finished';
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
    .mouldManage-mouldMation {
        padding-left: 0.3rem;
        .mould-tab-wrap {
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