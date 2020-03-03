<template>
    <div class="mould-handle-template-wrap">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-input v-model="tempname" placeholder="">
                    <template slot="prepend">模板名称：</template>
                </el-input>
            </el-col>
        </el-row>
        <el-row class="add-row" :gutter="10">
            <el-col :span="12">
                <el-button size="mini" type="primary" @click="handleAddRow">增加一行</el-button>
            </el-col>
            <el-col :span="12">
                <el-button size="mini" type="primary" @click="handleAddCol">增加一列</el-button>
            </el-col>
        </el-row>
        <div class="box tac">
            <div v-for="(item, index) in deleteSelect" :key="index" class="item">
                <el-button size="" type="" icon="el-icon-circle-close" @click="handleDelCol(index, item)"></el-button>
            </div>
            <div class="item flexnone"></div>
        </div>
        <div class="box" v-for="(item, index) in tableData" :key="index">
            <div v-for="(item2, index2) in item" :key="index2" class="item">
                <el-input v-if="item2.type == 'text'" v-model="item2.value" placeholder=""></el-input>
                <el-select v-else-if="item2.type == 'select'" v-model="item2.value" placeholder="">
                    <el-option
                        v-for="item3 in item2.options"
                        :key="item3.value"
                        :label="item3.label"
                        :value="item3.value">
                    </el-option>
                </el-select>
            </div>
            <div class="item flexnone">
                <el-button type="" icon="el-icon-circle-close" @click="handleDelRow(index, item)"></el-button>
            </div>
        </div>
        <el-row class="sub-handle">
            <el-button type="primary" @click="handleSubmit">{{ btnMsg }}</el-button>
            <el-button @click="$emit('editClose')">取消</el-button>
        </el-row>
    </div>
</template>

<script>
    import { getMouldRepairTemplateAdd, getMouldRepairTemplateEdit } from '../../../../../api/mouldManage.js'
    export default {
        props: {
            editData: {
                type: Object
            }
        },
        data() {
            return {
                tempname: '',
                tableData: {
                    // 0: [
                    //     { type: 'text', value: '1' },
                    //     { type: 'text', value: '2' },
                    //     { type: 'select', value: '0', options: [
                    //         { label: '男', value: '1' },
                    //         { label: '女', value: '0' }
                    //     ] }
                    // ],
                },
                deleteSelect: [],
                rowIndex: 2,
                btnMsg: '',
                isAdd: '',
                nowRow: {}
            }
        },
        methods: {
            handleAddRow() {
                let addData = [];
                this.deleteSelect.forEach( (item, index) => {
                    addData.push({ type: 'text', value: '' })
                })
                console.log(this.rowIndex);
                this.rowIndex++;
                this.$set(this.tableData, this.rowIndex, addData);
            },
            handleAddCol() {
                Object.keys(this.tableData).forEach( (item, index) => {
                    this.tableData[item].push({ type: 'text', value: '' })
                })
            },
            handleDelRow(index, row) {
                // console.log(index, row);
                if(Object.keys(this.tableData).length == 1){
                    return;
                }
                this.$delete(this.tableData, index);
                this.deleteSelect = this.tableData[Object.keys(this.tableData)[0]];
            },
            handleDelCol(index, col) {
                // console.log(index, col);
                if(this.deleteSelect.length == 1){
                    return;
                }
                Object.keys(this.tableData).forEach( item => {
                    this.tableData[item].splice(index, 1);
                })
            },
            handleSubmit() {
                // console.log(this.tableData);
                if(!this.tempname) {
                    this.$message.warning('请输入模板名称');
                    return;
                }
                if(this.isAdd && this.isAdd == 1){
                    getMouldRepairTemplateAdd({
                        tempname: this.tempname,
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
                }else{
                    getMouldRepairTemplateEdit({
                        tempname: this.tempname,
                        content: JSON.stringify(this.tableData),
                        id: this.nowRow.rt_id
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
            }
        },
        watch: {
            editData: {
                immediate: true,
                handler(newValue, oldValue) {
                    console.log(newValue);
                    this.tableData = { ...newValue.templateData };
                    this.deleteSelect = this.tableData[Object.keys(this.tableData)[0]];
                    this.isAdd = newValue.add;
                    this.nowRow = '';
                    this.tempname = '';
                    if(newValue.nowRow){
                        this.nowRow = newValue.nowRow;
                        this.tempname = this.nowRow.rt_name;
                    }
                    if(this.isAdd && this.isAdd == 1){
                        this.btnMsg = '添加';
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