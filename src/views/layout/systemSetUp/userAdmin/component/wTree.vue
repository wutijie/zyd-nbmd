<template>
    <div class="useradmin-wtree bsbb">
        <el-table
            ref="userTree"
            :data="tableData"
            style="width: 100%;"
            row-key="csId"
            border
            default-expand-all
            highlight-current-row
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            @row-click="handleRowClick"
            @header-click="handleHeaderClick"
            >
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="csName" :label="title"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { getResource } from '../../../../../api/spuerAdmin.js'
    export default {
        data() {
            return {
                // 表头
                title: '',
                // 组织树状表格
                tableData: [],
                // 当前点击组织数据
                nowClickTree: {}
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
            // 获取所有组织结构
            getInit() {
                getResource(2).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        // 
                        // this.title = res.data.custName;
                        this.tableData = res.data;
                        let organOne = [ ...res.data ];
                        organOne = this.handleChildren(organOne);
                        this.$store.commit('admin/SET_ORGANLEVELONE', organOne);
                        // this.$store.commit('admin/SET_ORGANLEVELTWO', organTwo);
                        // console.log(organOne)
                        // console.log(organTwo)
                        this.$refs.userTree.setCurrentRow();
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 点击当前行
            handleRowClick(row, column, event){
                // console.log(row)
                // if(row.children.length == 0){
                    this.nowClickTree = row;
                    this.$emit('setNowClick', this.nowClickTree);
                // }
                // console.log(this.nowClickTree)
            },
            // 点击表头
            handleHeaderClick(column, event){
                // console.log(column, event);
                this.$refs.userTree.setCurrentRow();
                this.nowClickTree = {};
                this.$emit('setNowClick', this.nowClickTree);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .useradmin-wtree {
        
    }
</style>