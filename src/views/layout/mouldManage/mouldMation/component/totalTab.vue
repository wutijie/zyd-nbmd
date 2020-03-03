<template>
    <div class="mould-mation-totle-wrap">
        <el-table :data="nowEditData" 
            style="width: 100%"
            height="50vh"
            border>
            <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
            <el-table-column align="center" v-for="(item, index) in nowHead" :key="index" :prop="item.value" :label="item.key" :min-width="item.width"></el-table-column>
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
    </div>
</template>

<script>
    export default {
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
        },
        watch: {
            editData: {
                immediate: true,
                handler(newValue, oldValue) {
                    // console.log(newValue)
                    this.nowEditData = [ ...newValue.totalData ];
                    this.nowHead = [ ...newValue.totalHead ];
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
    .mould-mation-totle-wrap {
        .tac {
            margin-top: 1rem;
        }
    }
</style>