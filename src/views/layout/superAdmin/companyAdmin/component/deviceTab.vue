<template>
    <div class="company-device-tab">
        <el-table
            :data="tableData"
            style="width: 100%;"
            height="100%"
            border
            >
            <el-table-column prop="deviceId" label="设备序列号"></el-table-column>
            <el-table-column prop="d_name" label="设备名称"></el-table-column>
            <el-table-column prop="d_number" label="设备编号"></el-table-column>
            <el-table-column prop="d_model" label="设备型号"></el-table-column>
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
    .company-device-tab {
        height: 50vh;
    }
</style>