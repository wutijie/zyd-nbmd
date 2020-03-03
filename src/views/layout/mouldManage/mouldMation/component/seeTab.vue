<template>
    <div class="mould-mation-see-wrap">
        <el-table :data="nowEditData" 
            style="width: 100%"
            height="50vh"
            border>
            <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
            <el-table-column align="center" v-for="(item, index) in nowHead" :key="index" :prop="item.value" :label="item.key" :width="item.width"></el-table-column>
            <el-table-column align="center" label="操作" min-width="100">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleSee(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row class="tac" :gutter="10">
            <el-col :span="24">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount" 
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :page-sizes="[1, 2, 5, 10, 20, 30]"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"></el-pagination>
            </el-col>
        </el-row>
        <!-- 查看变更 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogChangeVisible" width="60%" append-to-body>
            <ChangeEdit :editData="editDataChange"  @editClose="editCloseChange"></ChangeEdit>
        </el-dialog>
        <!-- 查看故障 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFaultVisible" width="60%" append-to-body>
            <FaultEdit :editData="editDataFault"  @editClose="editCloseChange"></FaultEdit>
        </el-dialog>
        <!-- 维修内容 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogContentVisible" width="60%" append-to-body>
            <HandleTemplateEdit :editData="editDataContent"  @editClose="editCloseChange"></HandleTemplateEdit>
        </el-dialog>
    </div>
</template>

<script>
    import ChangeEdit from '../../mouldChange/component/changeEdit.vue'
    import FaultEdit from '../../mouldFault/component/faultEdit.vue'
    import HandleTemplateEdit from '../../mouldRepair/component/handleTemplateEdit.vue'
    export default {
        components: {
            ChangeEdit, FaultEdit, HandleTemplateEdit
        },
        props: {
            editData: {
                type: Object
            }
        },
        data() {
            return {
                nowEditData: [],
                nowHead: [],
                nwoRow: {},
                // 总条数
                totalCount: 0,
                // 当前页
                currentPage: 1,
                // 每页页数
                pageSize: 10,
                dialogTitle: '',
                // 变更
                dialogChangeVisible: false,
                editDataChange: {},
                // 故障
                dialogFaultVisible: false,
                editDataFault: {},
                // 维修
                dialogContentVisible: false,
                editDataContent: {},
            }
        },
        methods: {
            // 分页切换
            handleCurrentChange(val){
                // console.log(val);
                this.currentPage = val;
                this.$emit('updateData', this.nwoRow.index, this.nwoRow.row, this.nwoRow.type, this.currentPage, this.pageSize);
            },
            handleSizeChange(val){
                this.currentPage = 1;
                this.pageSize = val;
                this.$emit('updateData', this.nwoRow.index, this.nwoRow.row, this.nwoRow.type, this.currentPage, this.pageSize);
            },
            handleSee(index, row){
                console.log(this.nwoRow.type);
                if(this.nwoRow.type == 1){
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
                        add: 3,
                        templateData,
                        nowRow: row
                    };
                    this.dialogContentVisible = true;
                }
                if(this.nwoRow.type == 2){
                    this.dialogTitle = '查看故障';
                    this.editDataFault = {
                        editData: {
                            add: 3,
                            ...row
                        }
                    };
                    this.dialogFaultVisible = true;
                }
                if(this.nwoRow.type == 3){
                    this.dialogTitle = '查看变更';
                    this.editDataChange = {
                        editData: {
                            add: 3,
                            ...row
                        }
                    };
                    this.dialogChangeVisible = true;
                }
                if(this.nwoRow.type == 4 || this.nwoRow.type == 5){
                    this.dialogTitle = '保养内容';
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
                    this.editDataContent = {
                        add: 3,
                        templateData,
                        nowRow: row
                    };
                    this.dialogContentVisible = true;
                }
            },
            // 关闭弹窗
            editCloseChange() {
                if(this.nwoRow.type == 1 || this.nwoRow.type == 4 || this.nwoRow.type == 5){
                    this.dialogTitle = '';
                    this.editDataContent = {};
                    this.dialogContentVisible = false;
                }
                if(this.nwoRow.type == 2){
                    this.dialogTitle = '';
                    this.editDataFault = {};
                    this.dialogFaultVisible = false;
                }
                if(this.nwoRow.type == 3){
                    this.dialogTitle = '';
                    this.editDataChange = {};
                    this.dialogChangeVisible = false;
                }
            },
        },
        watch: {
            editData: {
                immediate: true,
                handler(newValue, oldValue) {
                    console.log(newValue)
                    this.nowEditData = [ ...newValue.showData ];
                    this.nowHead = [ ...newValue.showHead ];
                    this.nwoRow = { ...newValue.rowData };
                    this.totalCount = this.nwoRow.count;
                    this.currentPage = this.nwoRow.page;
                    this.pageSize = this.nwoRow.pageSize;
                    // console.log(this.nowEditData);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mould-mation-see-wrap {
        .tac {
            margin-top: 1rem;
        }
    }
</style>