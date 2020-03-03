<template>
    <div class="mould-handle-template-wrap">
        <!-- <el-row :gutter="10">
            <el-col :span="24">
                <el-input v-model="tempname" placeholder="">
                    <template slot="prepend">模板名称：</template>
                </el-input>
            </el-col>
        </el-row> -->
        <div id="templateWrap">
            <div class="box" v-for="(item, index) in tableData" :key="index">
                <div v-for="(item2, index2) in item" :key="index2" class="item">
                    <el-input :readonly="isAdd == 3 || nowRow.rr_status == '已完成'" v-if="item2.type == 'text'" v-model="item2.value" placeholder=""></el-input>
                    <el-select :disabled="isAdd == 3 || nowRow.rr_status == '已完成'" v-else-if="item2.type == 'select'" v-model="item2.value" placeholder="">
                        <el-option
                            v-for="item3 in item2.options"
                            :key="item3.value"
                            :label="item3.label"
                            :value="item3.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <el-row class="sub-handle">
            <el-button v-if="!((isAdd == 3) || (nowRow.rr_status == '已完成'))" type="primary" @click="handleSubmit">{{ btnMsg }}</el-button>
            <el-button v-if="isAdd != 3" type="danger" v-print="'#templateWrap'">打印</el-button>
            <el-button @click="$emit('editClose')">取消</el-button>
        </el-row>
    </div>
</template>

<script>
    import { getMouldRepairRecordEditContent } from '../../../../../api/mouldManage.js'
    export default {
        props: {
            editData: {
                type: Object
            }
        },
        data() {
            return {
                tempname: '',
                tableData: {},
                btnMsg: '',
                isAdd: '',
                nowRow: {}
            }
        },
        methods: {
            handleSubmit() {
                console.log(this.tableData);
                getMouldRepairRecordEditContent({
                    id: this.nowRow.rr_id,
                    content: JSON.stringify(this.tableData)
                }).then( res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.$message({type: 'success', message: this.btnMsg + '成功!'});
                        this.$emit('editClose');
                        this.$emit('updateData');
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( err => {
                    this.$message.error(err.message);
                })
            }
        },
        watch: {
            editData: {
                immediate: true,
                handler(newValue, oldValue) {
                    console.log(newValue);
                    this.tableData = { ...newValue.templateData };
                    this.isAdd = newValue.add;
                    if(newValue.nowRow){
                        this.nowRow = newValue.nowRow;
                    }
                    if(this.isAdd && this.isAdd == 1){
                        this.btnMsg = '提交';
                    }else{
                        this.btnMsg = '修改';
                    }
                    // console.log(this.deleteSelect)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mould-handle-template-wrap {
        .add-row {
            padding: 0.5rem 0;
        }
        .box {
            border-right: 1px solid #d1d1d1;
            border-bottom: 1px solid #d1d1d1;
            .item {
                border-left: 1px solid #d1d1d1;
                border-top: 1px solid #d1d1d1;
            }
            .flexnone {
                width: 2.8rem;
            }
        }
        .sub-handle {
            margin-top: 1rem;
        }
    }
</style>