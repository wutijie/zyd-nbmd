<template>
    <div class="superAdmin-menuAdmin h100p">
        <el-row class="h100p">
            <el-row class="handle-btn" :gutter="10">
                <el-col :span="18">
                    <el-button type="primary" size="small" @click="handleAddMenu">添加菜单</el-button>
                </el-col>
                <el-col :span="6"></el-col>
            </el-row>
            <el-row class="mune-tab-wrap">
                <el-table
                    :data="tableData"
                    style="width: 100%;"
                    height="100%"
                    row-key="orderId"
                    border
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    >
                    <el-table-column prop="title" label="菜单名称" width="200"></el-table-column>
                    <el-table-column prop="path" label="路径"></el-table-column>
                    <el-table-column prop="iframeSrc" label="链接" show-overflow-tooltip></el-table-column>
                    <!-- <el-table-column label="移动" width="180">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">上移</el-button>
                            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">下移</el-button>
                        </template>
                    </el-table-column> -->
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-row>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
            <Wedit :editData="editData"  @editClose="editClose" @updateData="getInit"></Wedit>
        </el-dialog>
    </div>
</template>

<script>
    import { getResource, menubar } from '../../../../api/spuerAdmin.js'
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
            handleChildren(children){
                if(children && children.length > 0){
                    children.forEach( (item, index) => {
                        if(item.children && item.children.length > 0){
                            this.handleChildren(item.children);
                        }else{
                            item.children = null;
                        }
                    })
                }else{
                    children = null;
                }
                return children;
            },
            // 获取列表
            getInit(){
                getResource(1).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.tableData = res.data;
                        let menuOne = [ ...res.data ];
                        menuOne = this.handleChildren(menuOne);
                        // let menuTwo = [];
                        // this.tableData.forEach( (item, index) => {
                        //     menuOne.push({
                        //         title: item.title,
                        //         mid: item.mid,
                        //         path: item.path,
                        //         pater: item.pater
                        //     })
                        //     if(item.children.length > 0){
                        //         item.children.forEach( (item2, index2) => {
                        //             menuTwo.push({
                        //                 title: item.title + '-' + item2.title,
                        //                 mid: item2.mid,
                        //                 path: item2.path,
                        //                 pater: item2.pater
                        //             })
                        //         })
                        //     }
                        // })
                        this.$store.commit('admin/SET_MENULEVELONE', menuOne);
                        // this.$store.commit('admin/SET_MENULEVELTWO', menuTwo);
                        console.log(menuOne)
                        // console.log(menuTwo)
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    // console.log(err);
                    this.$message.error(err.message);
                })
            },
            // 关闭弹框
            editClose(){
                this.dialogTitle = '';
                this.dialogFormVisible = false;
                this.editData = {};
                // console.log(this.editData)
            },
            // 点击编辑
            handleEdit(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_menubar_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.dialogTitle = '编辑菜单';
                this.dialogFormVisible = true;
                this.editData = row;
            },
            // 点击删除
            handleDelete(index, row) {
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_menubar_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                // console.log(index, row);
                this.$confirm('是否要删除该菜单栏?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    menubar({
                        type: 3,
                        mid: row.mid
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
            // 添加菜单
            handleAddMenu(){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_menubar_manage_menubar_edit';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                this.dialogTitle = '添加菜单';
                this.dialogFormVisible = true;
                this.editData = {
                    add: 1,
                    mid: '',
                    title: '',
                    path: '',
                    name: '',
                    iframeSrc: '',
                    iconClass: '',
                    components: '',
                    level: 0
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .superAdmin-menuAdmin {
        padding-left: 0.3rem;
        .mune-tab-wrap {
            height: calc(100% - 60px);
        }
        .handle-btn {
            padding: 0.5rem;
            border: 1px solid #DCDFE6;
            border-bottom: none;
            margin: 0!important;
        }
    }
</style>