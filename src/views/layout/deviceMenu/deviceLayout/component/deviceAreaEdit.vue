<template>
    <div class="area-handle-template-wrap">
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
                <el-select v-else-if="item2.type == 'select'" v-model="item2.value" clearable placeholder="">
                    <el-option
                        v-for="item3 in deviceSelectData"
                        :key="item3.value"
                        :label="item3.d_number + '-' + item3.d_name"
                        :value="item3.d_number + '-' + item3.d_name">
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
    import { deviceChangeDeviceArea } from '../../../../../api/deviceMenu.js'
    export default {
        props: {
            editData: {
                type: Object
            }
        },
        data() {
            return {
                tableData: {},
                deleteSelect: [],
                rowIndex: 2,
                btnMsg: '',
                isAdd: '',
                nowRow: {},
                deviceSelectData: []
            }
        },
        methods: {
            handleAddRow() {
                let addData = [];
                this.deleteSelect.forEach( (item, index) => {
                    addData.push({ type: 'select', value: '' })
                })
                console.log(this.rowIndex);
                this.rowIndex++;
                this.$set(this.tableData, this.rowIndex, addData);
            },
            handleAddCol() {
                Object.keys(this.tableData).forEach( (item, index) => {
                    this.tableData[item].push({ type: 'select', value: '' })
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
                console.log(this.tableData);
                deviceChangeDeviceArea({
                    daId: this.nowRow.daId,
                    daContent: JSON.stringify(this.tableData)
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
                    if(newValue.templateData){
                        this.tableData = { ...newValue.templateData };
                        this.deleteSelect = this.tableData[Object.keys(this.tableData)[0]];
                        this.isAdd = newValue.add;
                        this.deviceSelectData = [ ...newValue.deviceSelectData ];
                    }
                    if(newValue.nowRow){
                        this.nowRow = newValue.nowRow;
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
    .area-handle-template-wrap {
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