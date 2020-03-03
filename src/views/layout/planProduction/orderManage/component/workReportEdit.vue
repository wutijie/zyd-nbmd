<template>
    <div class="plan-order-work">
        <el-table :data="nowEditData" 
            style="width: 100%"
            height="50vh"
            :summary-method="getSummaries"
            show-summary
            border>
            <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="orderno" label="工单编号"></el-table-column>
            <el-table-column prop="addtime" label="时间"></el-table-column>
            <el-table-column prop="worknum" label="报工产量" width="100"></el-table-column>
            <el-table-column prop="notpassnum" label="不合格数" width="150"></el-table-column>
            <el-table-column prop="notpassreason" label="不合格原因" width="150"></el-table-column>
            <el-table-column prop="source" label="来源" width="100"></el-table-column>
            <el-table-column prop="adduser" label="报工人" width="120"></el-table-column>
        </el-table>
        <el-row :gutter="10" class="plan-order-row">
            <el-col :span="12" v-if="isWork == 2">
                <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
                <el-button type="primary" size="small" @click="handleExamine">审核</el-button>
            </el-col>
            <el-col :span="isWork == 1 ? 24 : 12" class="tar">
                数据来源：
                <el-radio-group v-model="sourcesVal" @change="handleChange">
                    <!-- <el-radio label="3">WEB</el-radio> -->
                    <el-radio label="1">安灯</el-radio>
                    <el-radio label="2">数采</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>
        <el-dialog title="添加报工" :visible.sync="dialogAddVisible" append-to-body>
            <ReportAdd :editData="editDataAdd"  @editClose="editCloseAdd" @updateData="handleChange(sourcesVal)"></ReportAdd>
        </el-dialog>
    </div>
</template>

<script>
    import { workReportCheck, workReportGetSum } from '../../../../../api/orderManage.js'
    import ReportAdd from './reportAdd.vue'
    export default {
        components: {
            ReportAdd,
        },
        props: {
            editData: {
                type: Object
            }
        },
        data() {
            return {
                nowEditData: [],
                sourcesVal: '',
                isWork: '',
                nowRow: {},
                dialogAddVisible: false,
                editDataAdd: {},
                sumsData: []
            }
        },
        methods: {
            // 自定义合计
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总数';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                        }, 0);
                        sums[index] += '';
                    } else {
                        sums[index] = '-';
                    }
                });
                // console.log(sums);
                // console.log(this.nowRow);
                // console.log(this.nowRow.worknum);
                // console.log(this.nowRow.notpassnum);

                // if(this.nowRow.status == "已完成"){
                //     sums[3] = this.nowRow.worknum;
                //     sums[4] = this.nowRow.notpassnum;
                // }
                this.sumsData = [ ...sums ];
                return sums;
            },
            // 新增
            handleAdd() {
                // console.log(this.sourcesVal)
                this.dialogAddVisible = true;
                this.editDataAdd = {
                    nowRow: this.nowRow,
                    source: 3
                };
            },
            // 审核
            async handleExamine(){
                let isCouldHandle = this.$store.getters.custPowers ? this.$store.getters.custPowers.find( result => {
                    return result == 'fun_work_manage_work_approve';
                }) : null;
                if(!isCouldHandle) {
                    this.$message.warning('暂无权限');
                    return;
                }
                let total = {};
                await workReportGetSum({
                    orderno: this.nowRow.orderno
                }).then( res => {
                    console.log(res);
                    if(res.code == 200){
                        total = res.data;
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
                // console.log(1)
                let numInp = document.getElementsByClassName("alet-inp");
                // console.log(numInp);
                if(numInp && numInp.length > 0){
                    numInp[0].value = total.worknum;
                    numInp[1].value = total.notpassnum;
                }
                this.$alert(`
                    <p>是否确定该工单已完成，请检查报工信息</p>
                    <p>
                        报工产量：<input class="alet-inp" value="${total.worknum}" />
                    </p>
                    <p>
                        不合格数：<input class="alet-inp" value="${total.notpassnum}" />
                    </p>
                    `, '提示', {
                    dangerouslyUseHTMLString: true,
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    // console.log(numInp[0].value, numInp[1].value);
                    // console.log(this.sumsData[3], this.sumsData[4]);
                    // return;
                    workReportCheck({
                        planno: this.nowRow.planno,
                        orderno: this.nowRow.orderno,
                        worknum: numInp[0].value,
                        notpassnum: numInp[1].value,
                        mouldid: this.nowRow.mouldid
                    }).then(res => {
                        // console.log(res);
                        if(res.code == 200){
                            this.$emit('editClose');
                            this.$emit('updateData');
                            this.$message({type: 'success', message: '审核已发送!'});
                        }else{
                            this.$message.error(res.msg);
                        }
                    }).catch( err => {
                        // console.log(err);
                        this.$message.error(err.message);
                    })
                }).catch(err => {
                    this.$message({type: 'info', message: '已取消审核!'});
                })
            },
            // 改变来源
            handleChange(val) {
                // console.log(val);
                this.$emit('changeSources', this.nowRow.orderno, val, 1, this.nowRow, this.isWork);
                this.$emit('updateData');
            },
            // 关闭添加报工弹窗
            editCloseAdd() {
                this.dialogAddVisible = false;
                this.editDataAdd = {};
            }
        },
        watch: {
            editData: {
                immediate: true,
                handler(newValue, oldValue) {
                    if(newValue.isWork){
                        this.nowEditData = [ ...newValue.hasData ];
                        this.isWork = newValue.isWork;
                        this.nowRow = { ...newValue.row };
                        this.nowEditData.forEach( (item, index) => {
                            item.addtime = this.$handleTime(item.addtime);
                        })
                        this.btnMsg = this.nowEditData.add && this.nowEditData.add == 1 ? '添加' : '修改';
                        this.sourcesVal = newValue.nowSourse;
                    }
                    // console.log(this.nowEditData);
                    console.log(this.nowRow);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .plan-order-work {
        .plan-order-row {
            margin-top: 1rem;
        }
    }
</style>
<style lang="scss">
    .alet-inp {
        border: 1px solid #C0C4CC;
        border-radius: 4px;
        padding: 0.2rem;
        & {
            margin: 0.3rem 0;
        }
    }
</style>