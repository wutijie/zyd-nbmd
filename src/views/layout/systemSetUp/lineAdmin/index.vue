<template>
    <div class="superAdmin-lineAdmin h100p">
        <el-row class="line-tab-wrap">
            <el-table
                :data="tableData"
                style="width: 100%;"
                height="100%"
                row-key="id"
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                >
                <el-table-column prop="name" label="产线名称"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.plId"  type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button v-else  type="primary" size="mini" @click="handleAdd(scope.$index, scope.row)">添加产线</el-button>
                        <el-button v-if="scope.row.plId" type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    import { getCompanyData, setProductionLine } from '../../../../api/spuerAdmin.js'
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
                    type: 2
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        if(Object.prototype.toString.call(res.data) == '[object Array]'){
                            res.data.forEach( (item, index) => {
                                item.children.forEach( (item2, index2) => {
                                    item2.name = item2.plName;
                                })
                            })
                            this.tableData = res.data;
                        }else{
                            res.data.children.forEach( (item, index) => {
                                item.name = item.plName;
                            })
                            this.tableData = [{...res.data}];
                        }
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 添加产线
            handleAdd(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'power_fun_production_line_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.dialogTitle = '添加产线';
                this.dialogFormVisible = true;
                this.editData = {
                    add: 1,
                    cid: row.cid,
                    custId: row.custId,
                    deviceDatas: row.deviceDatas,
                    id: row.id,
                    name: ''
                }
            },
            // 编辑产线
            handleEdit(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'power_fun_production_line_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.dialogTitle = '编辑产线';
                this.dialogFormVisible = true;
                this.editData = row;
            },
            // 删除产线
            handleDelete(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'power_fun_production_line_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.$confirm('是否要删除该产线?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    setProductionLine({
                        type: 3,
                        plId: row.plId,
                        cId: row.cid
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
    .superAdmin-lineAdmin {
        padding-left: 0.3rem;
        .line-tab-wrap {
            height: calc(100% - 0.3rem);
        }
    }
</style>