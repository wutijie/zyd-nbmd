<template>
    <div>
        <el-row>
            <el-row class="handle-btn" :gutter="10">
                <el-col :span="6">
                    <el-button type="danger" size="small" @click="handleAdd">新增</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table :data="nowEditData" 
                    style="width: 100%"
                    height="40vh"
                    border>
                    <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
                    <el-table-column align="center" prop="mt_name" label="模板名称" width=""></el-table-column>
                    <el-table-column align="center" prop="mt_genre" label="模板级别" width=""></el-table-column>
                    <el-table-column align="center" label="模板内容" width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleEditTemplate(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="handleDelTemplate(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
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
            </el-row>
        </el-row>
        <!-- 添加、编辑模板 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogHandleTemplateVisible" width="70%" append-to-body>
            <HandleTemplate :editData="editDataHandleTemplate"  @editClose="editCloseHandleTemplate" @updateData="$emit('updateData')"></HandleTemplate>
        </el-dialog>
    </div>
</template>

<script>
    import { getDeviceMaintainTemplateDelete } from '../../../../../api/deviceManage.js'
    import HandleTemplate from './handleTemplate.vue'
    export default {
        components: {
            HandleTemplate,
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
                dialogHandleTemplateVisible: false,
                editDataHandleTemplate: {},
                dialogTitle: ''
            }
        },
        methods: {
            // 分页切换
            handleCurrentChange(val) {
                // console.log(val);
                this.currentPage = val;
                this.$emit('updateData', this.currentPage, this.pageSize);
            },
            handleSizeChange(val) {
                this.currentPage = 1;
                this.pageSize = val;
                this.$emit('updateData', this.currentPage, this.pageSize);
            },
            // 编辑
            handleEditTemplate(index, row) {
                console.log(index, row);
                this.dialogTitle = '编辑模板';

                let templateData;
                if(row.mt_content && row.mt_content.slice(0, 1) == "{"){
                    templateData = JSON.parse(row.mt_content);
                }else{
                    templateData = {
                        0: [
                            { type: 'text', value: row.mt_content }
                        ]
                    }
                }

                this.editDataHandleTemplate = {
                    templateData,
                    nowRow: row
                };
                this.dialogHandleTemplateVisible = true;
            },
            // 删除
            handleDelTemplate(index, row) {
                console.log(index, row);
                this.$confirm('是否要删除该维修模板?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    getDeviceMaintainTemplateDelete({
                        id: row.mt_id
                    }).then(res => {
                        // console.log(res);
                        if(res.code == 200){
                            this.$emit('updateData');
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
            // 新增模板
            handleAdd() {
                this.dialogTitle = '添加模板';
                this.editDataHandleTemplate = {
                    add: 1,
                    templateData: {
                        0: [
                            { type: 'text', value: '' },
                            { type: 'text', value: '' },
                            { type: 'text', value: '' },
                            { type: 'text', value: '' }
                        ],
                        1: [
                            { type: 'text', value: '' },
                            { type: 'text', value: '' },
                            { type: 'text', value: '' },
                            { type: 'text', value: '' }
                        ]
                    }
                };
                this.dialogHandleTemplateVisible = true;
            },
            // 关闭弹窗
            editCloseHandleTemplate() {
                this.dialogTitle = '';
                this.dialogHandleTemplateVisible = false;
                this.editDataTemplate = {};
            }
        },
        watch: {
            editData: {
                immediate: true,
                handler(newValue, oldValue) {
                    // console.log(newValue);
                    this.nowEditData = [ ...newValue.listData ];
                    this.totalCount = newValue.count;
                    this.currentPage = newValue.page;
                    this.pageSize = newValue.pageSize;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .handle-btn {
        padding: 0.5rem;
        border: 1px solid #DCDFE6;
        border-bottom: none;
        margin: 0!important;
    }
</style>