<template>
    <div class="company-line-tab">
        <el-table
            :data="tableData"
            style="width: 100%;"
            height="100%"
            border
            >
            <el-table-column prop="plId" label="产线编号" width="100"></el-table-column>
            <el-table-column prop="plName" label="产线名称"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        props: {
            tabList: {
                type: Array
            }
        },
        data() {
            return {
                tableData: this.tabList
            }
        },
        watch: {
            tabList: {
                immediate: true,
                handler(newValue, oldValue) {
                    // console.log(newValue)
                    this.tableData = [...newValue];
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .company-line-tab {
        height: 50vh;
    }
</style>