<template>
    <div class="dataManage-alarmData h100p">
        <el-row class="h100p">
            <el-row class="handle-btn" :gutter="10">
                <el-col :span="6">
                    <!-- <el-button type="danger" size="small" @click="handleAdd">新增</el-button> -->
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
                        <el-option v-for="(item, index) in searchTypeData" :key="index" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-cascader
                        v-if="searchData.searchtype == 'atId'" v-model="searchData.searchvalue"
                        size="small"
                        class="w100p"
                        :options="alarmType"
                        :props="{
                            emitPath: false,
                            checkStrictly: true,
                            expandTrigger: 'hover',
                            value: 'atId',
                            label: 'atName'
                        }"
                        clearable></el-cascader>
                    <!-- <el-select v-if="searchData.searchtype == 'atId'" v-model="searchData.searchvalue" size="small" placeholder="工单状态" class="w100p">
                        <el-option label="全部" value=""></el-option>
                    </el-select> -->
                    <el-input v-else v-model="searchData.searchvalue" size="small" placeholder="请输入关键词"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
                </el-col>
            </el-row>
            <el-row class="data-alarm-tab-wrap">
                <el-table :data="tableData" style="width: 100%;" height="100%" border :cell-class-name="tableRowClassName">
                    <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
                    <el-table-column align="center" prop="arNumber" label="报警编号" min-width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="arType" label="类型" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="arStartTime" label="记录时间" min-width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="arSource" label="数据来源" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="atName" label="报警类型" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" label="操作" min-width="180">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleSee(scope.$index, scope.row)">查看</el-button>
                            <el-button type="warning" size="mini" @click="handleData(scope.$index, scope.row)">数据</el-button>
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
                        <!-- <el-button-group>
                            <el-button class="overdue-btn" type="primary" size="mini">未开始</el-button>
                            <el-button class="runing-btn" type="primary" size="mini">执行中</el-button>
                            <el-button class="no-start-btn" type="primary" size="mini">已完成</el-button>
                        </el-button-group> -->
                    </el-col>
                </el-row>
            </el-row>
        </el-row>
        <!-- 查看数据 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogDataVisible" width="60%">
            <HandleSeeData :editData="editDataData"  @editClose="editCloseData" @updateData="getInit"></HandleSeeData>
        </el-dialog>
    </div>
</template>

<script>
    import { alarmgetAlarmRecord, alarmGetAlarmType } from '../../../../api/alarmData.js'
    import HandleSeeData from './component/handleSeeData.vue'
    export default {
        components: {
            HandleSeeData,
        },
        data() {
            return {
                // 搜索
                searchData: {
                    time: [],
                    searchvalue: '',
                    searchtype: ''
                },
                searchTypeData: [
                    { name: '报警记录编号', value: 'arNumber' },
                    { name: '报警类型', value: 'atId' },
                    { name: '设备ID', value: 'dId' },
                    { name: '设备名称', value: 'dName' },
                    { name: '设备编号', value: 'dNumber' },
                    { name: '模具ID', value: 'mId' },
                    { name: '模具名称', value: 'mName' },
                    { name: '模具编号', value: '	mNumbe' }
                ],
                // 列表
                tableData: [],
                // 总条数
                totalCount: 0,
                // 当前页
                currentPage: 1,
                // 每页页数
                pageSize: 10,
                dialogTitle: '',
                dialogDataVisible: false,
                editDataData: {},
                selectData: {},
                alarmType: [],
                getInitType: 1,
            }
        },
        created () {
            this.getInit();
            this.getAlarmType();
        },
        methods: {
            getInit() {
                alarmgetAlarmRecord({
                    type: this.getInitType,
                    page: this.currentPage,
                    pageSize: this.pageSize,
                    atId: this.searchData.searchtype == 'atId' ? this.searchData.searchvalue : '',
                    beginTime: this.searchData.time[0] ? this.searchData.time[0] : '',
                    endTime: this.searchData.time[1] == '' ? this.searchData.time[2] : '',
                    dId: this.searchData.searchtype == 'dId' ? this.searchData.searchvalue : '',
                    dName: this.searchData.searchtype == 'dName' ? this.searchData.searchvalue : '',
                    dNumber: this.searchData.searchtype == 'arNumber' ? this.searchData.searchvalue : '',
                    mId: this.searchData.searchtype == 'mId' ? this.searchData.searchvalue : '',
                    mName: this.searchData.searchtype == 'mName' ? this.searchData.searchvalue : '',
                    mNumber: this.searchData.searchtype == 'mNumber' ? this.searchData.searchvalue : ''
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        res.data.alarmRecordData.forEach( (item, index) => {
                            item.arStartTime = item.arStartTime ? this.$handleTime(item.arStartTime) : item.arStartTime;
                            item.arType = item.arType == 1 ? '设备' : '模具';
                            item.arSource == 1 && (item.arSource = '触屏');
                            item.arSource == 2 && (item.arSource = 'BOX');
                            item.arSource == 3 && (item.arSource = 'WEB');
                            item.arSource == 4 && (item.arSource = 'API');
                        })
                        this.tableData = res.data.alarmRecordData;
                        this.totalCount = res.data.count;
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 数据类型
            getAlarmType() {
                alarmGetAlarmType().then( res => {
                    console.log(res);
                    if(res.code == 200){
                        this.alarmType = res.data;
                    }
                }).catch( err => {
                    // this.$message.error(err.message);
                })
            },
            // 导出
            handleExport() {},
            // 搜索
            handleSearch(){
                console.log(this.searchData);
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
                this.getInitType = this.searchData.searchtype ? 5 : 1;
            },
            handleSee(index, row) {
                // console.log(index, row);
                this.dialogTitle = '查看';
                this.editDataData = {
                    add: 5,
                    ...row,
                };
                this.dialogDataVisible = true;
            },
            handleData(index, row) {
                // console.log(index, row);
                this.dialogTitle = '数据';
                this.editDataData = {
                    add: 6,
                    ...row
                };
                this.dialogDataVisible = true;
            },
            editCloseData() {
                this.dialogDataVisible = false;
                this.dialogTitle = '';
                this.editDataData = {};
            },
            // 变颜色
            tableRowClassName({ row, column,rowIndex,columnIndex }) {
				if(columnIndex === 1 || columnIndex === 0){
					if(row.fr_status == "已完成"){
						return 'noStart';
					}
					if(row.fr_status == "执行中"){
						return 'runing';
					}
					if(row.fr_status == "未开始"){
						return 'overdue';
					}
				}
				return '';
			}
        },
    }
</script>

<style lang="scss" scoped>
    .dataManage-alarmData {
        padding-left: 0.3rem;
        .data-alarm-tab-wrap {
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