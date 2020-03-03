<template>
    <div class="superAdmin-classesAdmin h100p">
        <el-row class="class-tab-wrap">
            <el-table
                :data="tableData"
                style="width: 100%;"
                height="100%"
                row-key="id"
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                >
                <el-table-column prop="name" label="班次"></el-table-column>
                <el-table-column prop="clBeginTime" label="开始时间"></el-table-column>
                <el-table-column prop="clEndTime" label="结束时间"></el-table-column>
                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.level == 1"  type="warning" size="mini" @click="handleAddProject(scope.$index, scope.row)">添加班次方案</el-button>
                        <el-button v-if="scope.row.level == 2" type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button v-if="scope.row.level == 2" type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
            <Wedit :editData="editData"  @editClose="editClose" @updateData="getInit"></Wedit>
        </el-dialog>
    </div>
</template>

<script>
    import { getCompanyData, manageClasses } from '../../../../api/spuerAdmin.js'
    import Wedit from './component/edit.vue'
    export default {
        components: {
            Wedit,
        },
        data() {
            return {
                dialogFormVisible: false,
                tableData: [],
                editData: {},
                dialogTitle: '编辑'
            }
        },
        created () {
            this.getInit();
        },
        methods: {
            getInit() {
                getCompanyData({
                    type: 3
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        if(Object.prototype.toString.call(res.data) == '[object Array]'){
                            res.data.forEach( (item, index) => {
                                item.children = [...item.classes];
                                item.level = 1;
                                item.children.forEach( (item2, index) => {
                                    item2.name = item2.csIsDefault == 1 ? item2.csName + '（ 默认方案 ）' : item2.csName;
                                    item2.children = [...item2.classes];
                                    item2.level = 2;
                                    item2.children.forEach( (item3, index3) => {
                                        item3.name = item3.clName;
                                        item3.level = 3;
                                    })
                                })
                            });
                            this.tableData = res.data;
                        }else{
                            res.data.children = [...res.data.classes];
                            res.data.level = 1;
                            res.data.children.forEach( (item, index) => {
                                item.children = [...item.classes];
                                item.name = item.csIsDefault == 1 ? item.csName + '（ 默认方案 ）' : item.csName;
                                item.level = 2;
                                item.children.forEach( (item2, index2) => {
                                    item2.name = item2.clName;
                                    item2.level = 3;
                                })
                            })
                            this.tableData = [{...res.data}];
                            // console.log([{...res.data}])
                        }
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 添加班次方案
            handleAddProject(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'power_fun_production_line_class_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.dialogTitle = '添加班次方案';
                this.dialogFormVisible = true;
                this.editData = {
                    add: 1,
                    cid: row.cid,
                    csId: '',
                    csIsDefault: false,
                    classes: [],
                    csName: '',
                }
            },
            // 编辑
            handleEdit(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'power_fun_production_line_class_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.dialogTitle = '编辑班次方案';
                this.dialogFormVisible = true;
                // console.log(row);
                this.editData = row;
            },
            // 删除
            handleDelete(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'power_fun_production_line_class_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                console.log(index, row);
                this.$confirm('是否要删除该班次方案?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    manageClasses({
                        type: 3,
                        cid: row.cid,
                        csId: row.csId
                    }).then(res => {
                        // console.log(res);
                        if(res.code == 200){
                            this.getInit();
                            this.$message({type: 'success', message: '删除成功!'});
                        }
                    }).catch( err => {
                        // console.log(err);
                        this.$message.error(err.message);
                    })
                }).catch(err => {
                    this.$message({type: 'info', message: '已取消删除!'});
                })
            },
            // 关闭弹窗
            editClose(){
                this.dialogTitle = '';
                this.dialogFormVisible = false;
                this.editData = {};
            }
        },
    }
</script>

<style lang="scss" scoped>
    .superAdmin-classesAdmin {
        padding-left: 0.3rem;
        .class-tab-wrap {
            height: calc(100% - 0.3rem);
        }
    }
</style>