<template>
    <div class="company-user-tab">
        <el-table
            :data="tableData"
            style="width: 100%;"
            height="100%"
            border
            >
            <el-table-column prop="uname" label="姓名"></el-table-column>
            <el-table-column label="性别">
                <template slot-scope="scope">{{ scope.row.usex | setSex }}</template>
            </el-table-column>
            <el-table-column prop="uuserName" label="账号"></el-table-column>
            <el-table-column prop="uworkId" label="工号"></el-table-column>
            <el-table-column prop="usection" label="部门"></el-table-column>
            <el-table-column prop="uduty" label="职位"></el-table-column>
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
        filters: {
            setSex(val) {
                val = val ? (val == 0 ? '男' : '女') : '';
                return val;
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
    .company-user-tab {
        height: 50vh;
    }
</style>