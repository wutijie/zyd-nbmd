<template>
    <div class="device-handle-template-wrap">
        <el-form ref="deviceHandleTem" :model="nowEditData" :rules="rules" label-width="80px">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="模板名称" prop="mt_name">
                        <el-input v-model="nowEditData.mt_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="模板级别" prop="mt_genre">
                        <el-select class="w100p item" v-model="nowEditData.mt_genre" placeholder="请选择">
                            <el-option label="指定保养" :value="2"></el-option>
                            <el-option label="周期保养" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="template-wrap">
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
            </div>
            <!-- <el-row class="sub-handle">
            </el-row> -->
            <el-form-item class="sub-handle">
                <el-button type="primary" @click="handleSubmit('deviceHandleTem', isAdd)">{{ btnMsg }}</el-button>
                <el-button @click="$emit('editClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { getDeviceMaintainTemplateAdd, getDeviceMaintainTemplateEdit } from '../../../../../api/deviceManage.js'
    export default {
        props: {
            editData: {
                type: Object
            }
        },
        data() {
            return {
                mt_name: '',
                mt_genre: '',
                nowEditData: {},
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
                nowRow: {},
                rules: {
                    mt_name: [
                        { required: true, message: '请输入模板名称', trigger: 'change' }
                    ],
                    mt_genre: [
                        { required: true, message: '请选择模板级别', trigger: 'change' }
                    ]
                }
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
            handleSubmit(formName, add) {
                console.log(this.tableData);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.isAdd && this.isAdd == 1){
                            getDeviceMaintainTemplateAdd({
                                tempname: this.nowEditData.mt_name,
                                temptype: this.nowEditData.mt_genre,
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
                            getDeviceMaintainTemplateEdit({
                                tempname: this.nowEditData.mt_name,
                                temptype: this.nowEditData.mt_genre,
                                content: JSON.stringify(this.tableData),
                                id: this.nowEditData.mt_id
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
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                })
            }
        },
        watch: {
            editData: {
                immediate: true,
                handler(newValue, oldValue) {
                    setTimeout( () => {
                        this.$refs.deviceHandleTem.clearValidate();
                    }, 0)
                    console.log(newValue);
                    this.tableData = { ...newValue.templateData };
                    this.deleteSelect = this.tableData[Object.keys(this.tableData)[0]];
                    this.isAdd = newValue.add;
                    // this.nowRow = '';
                    // this.mt_name = '';
                    // this.mt_genre = '';
                    this.nowEditData = {};
                    if(newValue.nowRow){
                        this.nowEditData = { ...newValue.nowRow }
                        this.nowRow = newValue.nowRow;
                        // this.nowEditData.mt_name = this.nowRow.mt_name;
                        // this.nowEditData.mt_genre = this.nowRow.mt_genre == "指定保养" ? 4 : 3;
                        this.$set(this.nowEditData, 'mt_genre', this.nowEditData.mt_genre == "指定保养" ? 2 : 1);
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
    .device-handle-template-wrap {
        .template-wrap {
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
        }
        .sub-handle {
            margin-top: 1rem;
        }
    }
</style>