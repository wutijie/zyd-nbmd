<template>
    <div class="superAdmin-deviceAdmin h100p">
        <el-row class="device-tab-wrap">
            <el-table
                :data="tableData"
                style="width: 100%;"
                height="100%"
                row-key="id"
                border
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                default-expand-all
                >
                <el-table-column prop="name" label="设备名称"></el-table-column>
                <el-table-column align="center" label="产线" width="180">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.level == 2" type="warning" size="mini" @click="handleLine(scope.$index, scope.row)">分配产线</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="班次" width="180">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.level == 2" type="warning" size="mini" @click="handleClasses(scope.$index, scope.row)">分配班次</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 分配产线弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogLineVisible">
            <LineSet :editData="lineEditData"  @editClose="editCloseLine" @updateData="getInit"></LineSet>
        </el-dialog>
        <!-- 分配班次弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogClassesVisible">
            <ClassesSet :editData="editData"  @editClose="editCloseClasses" @updateData="getInit"></ClassesSet>
        </el-dialog>
    </div>
</template>

<script>
    import { getCompanyData, getDataByCompany, getDeviceClasses, getDeviceLine } from '../../../../api/spuerAdmin.js'
    import LineSet from './component/lineSet.vue'
    import ClassesSet from './component/classesSet.vue'
    export default {
        components: {
            LineSet, ClassesSet
        },
        data() {
            return {
                dialogLineVisible: false,
                dialogClassesVisible: false,
                tableData: [],
                editData: {},
                lineEditData: {},
                dialogTitle: '编辑'
            }
        },
        created () {
            this.getInit();
        },
        methods: {
            getInit(){
                getCompanyData({
                    type: 1
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        if(Object.prototype.toString.call(res.data) == '[object Array]'){
                            res.data.forEach( (item, index) => {
                                item.children = item.deviceDatas.length > 0 ? item.deviceDatas : [];
                                item.level = 1;
                                if(item.children){
                                    item.children.forEach( (item2, index2) => {
                                        item2.name = item2.d_name;
                                        item2.children = [];
                                        item2.level = 2;
                                    })
                                }
                            })
                            this.tableData = res.data;
                        }else{
                            res.data.deviceDatas.forEach( (item, index) => {
                                item.name = item.d_name;
                                item.level = 2;
                            })
                            this.tableData = res.data.deviceDatas;
                        }
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 分配产线
            handleLine(index, row){
                // console.log(index, row);
                this.lineEditData = {};
                Promise.all([
                    getDataByCompany({
                        type: 3,
                        cId: row.cid
                    }),
                    getDeviceLine({
                        dId: row.deviceId
                    })
                ]).then( res => {
                    // console.log(res);
                    if(res[0].code == 200 && res[1].code == 200){
                        this.dialogTitle = '分配产线';
                        this.lineEditData = {
                            allData: res[0].data.productionLineData,
                            hasData: res[1].data,
                            row
                        };
                        this.dialogLineVisible = true;
                    }else{
                        if(res[0].code != 200){
                            this.$message.error(res[0].msg);
                        }
                        if(res[1].code != 200){
                            this.$message.error(res[1].msg);
                        }
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 分配班次
            handleClasses(index, row){
                // console.log(index, row);
                Promise.all([
                    getDataByCompany({
                        type: 7,
                        cId: row.cid
                    }),
                    getDeviceClasses({
                        dId: row.deviceId
                    })
                ]).then( res => {
                    // console.log(res);
                    if(res[0].code == 200 && res[1].code == 200){
                        this.editData = {
                            allData: res[0].data.classes,
                            hasData: res[1].data,
                            row
                        };
                        this.dialogTitle = '分配班次';
                        this.dialogClassesVisible = true;
                    }else{
                        if(res[0].code != 200){
                            this.$message.error(res[0].msg);
                        }
                        if(res[1].code != 200){
                            this.$message.error(res[1].msg);
                        }
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            // 关闭分配产线弹窗
            editCloseLine(){
                this.dialogLineVisible = false;
                this.lineEditData = {};
                this.dialogTitle = '';
            },
            // 关闭分配班次弹窗
            editCloseClasses(){
                this.dialogClassesVisible = false;
                this.editData = {};
                this.dialogTitle = '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .superAdmin-deviceAdmin {
        padding-left: 0.3rem;
        .device-tab-wrap {
            height: calc(100% - 0.3rem);
        }
    }
</style>